## ELI5
Imagine you are watching a YouTube video where the view count doubles every day: 100 views on Day 1, 200 on Day 2, 400 on Day 3. The *list* of daily views [100, 200, 400...] is a **Sequence**. If you add them up to find total views after a week (100+200+400...), that sum is a **Series**. The most common mix-up: students think a "Series" is just another name for a "Sequence", but a Series is strictly the *sum* of the terms of a Sequence.

## DEFINITION
A **Sequence** is a function whose domain is the set of natural numbers (or a subset thereof) and whose range is a set of real numbers, typically denoted as $a_1, a_2, a_3, \dots, a_n, \dots$ where $a_n$ represents the $n^{th}$ term (general term). A **Series** is the expression formed by adding the terms of a sequence, denoted as $\sum_{k=1}^{n} a_k$ or $a_1 + a_2 + \dots + a_n$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to distinguish between a sequence (list) and a series (sum), write the first $n$ terms given the general term $a_n$ (algebraic or recursive), and express a given sum using sigma notation $\sum$. They must correctly identify if a sequence is finite or infinite based on the domain context.

## SCOPE_BOUNDARY
This node covers the definition of sequences (finite/infinite), the concept of the general term $a_n$, the definition of a series associated with a sequence, and sigma notation basics. It does **NOT** cover Arithmetic Progression (A.P.) or Geometric Progression (G.P.) specific formulas (sum, $n^{th}$ term, means), which are handled in subsequent nodes (c11_app_cbse_05_003 onwards).

## WALKTHROUGH
Start by asking: "If a startup gains users in a pattern: 50, 100, 200, 400... how would you mathematically describe the *list* of daily users vs the *total* users after 5 days?" Guide the student to see the list as a sequence (function $f(n)$) and the total as a series (summation). Show how to generate terms by plugging $n=1,2,3$ into $a_n = 50 \times 2^{n-1}$. Then demonstrate writing the total as $S_5 = \sum_{n=1}^{5} 50 \times 2^{n-1}$. The key insight: **A sequence is the "what" (the terms); a series is the "how much altogether" (the sum).**

Takeaway: mastery means naming the sequence as a function on natural numbers and the series as its running total. Exam moves: sequence-or-series questions on the startup scene. Check yourself: the doubling user counts - 50, 100, 200, 400 - are the what; the total after 5 days is the how much altogether, written with a summation sign. Students miss it because the two words feel interchangeable, when the founder's dashboard shows the design: one is the list, one is the addition of the list, and the general term is the recipe that generates the list without counting.

Write one sequence, its general term and its summation side by side until the three notations feel like one object in three costumes.

## DIAGNOSTIC_QUESTION_1
Write the first four terms of the sequence defined by the general term $a_n = \frac{n^2 + 1}{n + 1}$ for $n \in \mathbb{N}$.

## DIAGNOSTIC_ANSWER_1
The terms are $a_1 = 1$, $a_2 = \frac{5}{3}$, $a_3 = \frac{5}{2}$, $a_4 = \frac{17}{5}$. A wrong answer (e.g., $a_1=1, a_2=2, a_3=3...$) reveals the student is treating $n$ as the term value rather than the index/position, or they are incorrectly simplifying the algebraic fraction (e.g., cancelling $n$ incorrectly). This indicates a gap in algebraic manipulation of rational functions with index variables.

## DIAGNOSTIC_QUESTION_2
A sequence is defined recursively by $a_1 = 3$ and $a_{k+1} = 2a_k + 1$ for $k \ge 1$. A student claims the general term is $a_n = 2^n + 1$. Is the student correct? Explain why or why not by testing the first three terms.

## DIAGNOSTIC_ANSWER_2
The student is **incorrect**. Recursive calculation: $a_1=3$, $a_2=2(3)+1=7$, $a_3=2(7)+1=15$. Proposed formula: $a_1=2^1+1=3$ (matches), $a_2=2^2+1=5$ (mismatch, should be 7), $a_3=2^3+1=9$ (mismatch, should be 15). The correct closed form is $a_n = 2^{n+1} - 1$. A wrong answer reveals the student confuses the recursive pattern (multiply by 2, add 1) with a simple exponential shift, failing to account for the accumulating "+1" at each step.

## DIAGNOSTIC_QUESTION_3
The sum of the first $n$ terms of a sequence is given by $S_n = n^2 + 2n$. Find the $10^{th}$ term of the sequence ($a_{10}$) without listing all terms.

## DIAGNOSTIC_ANSWER_3
$a_{10} = S_{10} - S_9 = (100+20) - (81+18) = 120 - 99 = 21$. Steps: 1. Recall relation $a_n = S_n - S_{n-1}$ for $n>1$. 2. Compute $S_{10}$ and $S_9$. 3. Subtract. A wrong answer (e.g., plugging $n=10$ into $S_n$ to get 120) reveals the student confuses the *sum of first 10 terms* ($S_{10}$) with the *10th term itself* ($a_{10}$). This is the classic Sequence vs. Series confusion.

## DIAGNOSTIC_QUESTION_4
Consider the sequence defined by $a_n = \frac{(-1)^n n}{n+1}$. Analyze the behaviour of the terms as $n$ increases. Does the sequence converge to a single limit? Justify your answer by examining the even and odd sub-sequences.

## DIAGNOSTIC_ANSWER_4
The sequence **does not converge** (diverges by oscillation). For even $n=2k$: $a_{2k} = \frac{2k}{2k+1} \to 1$ as $k \to \infty$. For odd $n=2k-1$: $a_{2k-1} = \frac{-(2k-1)}{2k} \to -1$ as $k \to \infty$. Since the even and odd sub-sequences tend to different limits (1 and -1), the main sequence has no unique limit. A wrong answer claiming convergence to 0 or 1 reveals the student ignores the alternating sign $(-1)^n$ or incorrectly applies limit laws to oscillating sequences without separating cases.

## DIAGNOSTIC_QUESTION_5
Evaluate the claim: "The series $\sum_{k=1}^{\infty} \frac{1}{k}$ (Harmonic Series) converges because the terms $\frac{1}{k}$ tend to zero as $k \to \infty$." Is this reasoning valid? Provide a counter-argument or proof.

## DIAGNOSTIC_ANSWER_5
The reasoning is **invalid**. While the *necessary* condition for convergence ($a_n \to 0$) is met, it is not *sufficient*. The Harmonic Series diverges (sum grows without bound, albeit slowly). Proof sketch: Group terms $1 + 1/2 + (1/3+1/4) + (1/5+1/6+1/7+1/8) + \dots > 1 + 1/2 + 1/2 + 1/2 + \dots \to \infty$. A student agreeing with the claim holds the dangerous misconception that "terms tending to zero implies series converges," confusing the Divergence Test (contrapositive) with a convergence test.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) that generates a **finite sequence** and its associated **series**. Define the general term $a_n$ explicitly. Then, write the series for the total accumulation using sigma notation. Explain why the sequence must be finite in your scenario.

## DIAGNOSTIC_ANSWER_6
*Example:* "A metro train starts with 300 passengers at Station 1. At each subsequent station, 20 passengers alight and no one boards. The train terminates at Station 10."
Sequence (Passengers on board leaving station $n$): $a_n = 300 - 20(n-1)$ for $n=1$ to $10$. Terms: 300, 280, ..., 120.
Series (Total "passenger-stations" travelled or total alighting count): $\sum_{n=1}^{10} (320 - 20n)$.
Why finite: The train journey ends at Station 10 (domain $n \in \{1, \dots, 10\}$). A poor answer uses an infinite domain (e.g., "bacteria dividing forever") or fails to define $a_n$ explicitly as a function of $n$, showing inability to model discrete processes with explicit formulas.

## COMMON_MISCONCEPTION
**Misconception:** "The $n^{th}$ term of a sequence ($a_n$) and the Sum of the first $n$ terms ($S_n$) are interchangeable notations for the same thing."
**Why it happens:** In textbooks, both are functions of $n$. Students see $a_n = 2n+1$ and $S_n = n^2+2n$ and treat $n$ as a generic input without distinguishing "value at position $n$" vs "cumulative sum up to position $n$".
**Concrete Error:** Given $S_n = 3n^2 + 5n$, a student finds the $5^{th}$ term by calculating $S_5 = 100$ instead of $a_5 = S_5 - S_4 = 100 - 68 = 32$. They fundamentally miss that a Series is a *derived* sequence of partial sums.

## ON_FAILURE
1. **Visual Distinction:** Draw a number line. Mark points $a_1, a_2, a_3, a_4$ as "Sequence terms" (dots). Draw brackets grouping them: $[a_1]$, $[a_1+a_2]$, $[a_1+a_2+a_3]$ and label these $S_1, S_2, S_3$ (Series terms).
2. **Notation Drill:** Force the student to write the definition: "$a_n$ = value of the $n^{th}$ object. $S_n$ = value of the *pile* of first $n$ objects." Repeat for 5 different explicit formulas ($a_n = n^2$, $a_n = 2^n$, etc.) calculating both $a_4$ and $S_4$ side-by-side.
3. **Recursive Bridge:** Show $S_n = S_{n-1} + a_n$. Make them compute $S_3$ using this recursion given $a_n$, proving $S_n$ depends on $a_n$, not equals it.

## PREREQUISITE_NODE_IDS
c11_app_cbse_05_001

## PREREQUISITE_REASONS
c11_app_cbse_05_001: The Introduction node establishes the context of progressions (AP/GP) and the basic terminology of "terms" and "patterns" which this node formalizes into the function definition of a sequence.

## FORWARD_NODE_IDS
c11_app_cbse_05_003, c11_app_cbse_05_008

## FORWARD_REASONS
c11_app_cbse_05_003: Arithmetic Progression is a specific *type* of sequence where $a_{n+1} - a_n = d$; understanding the general sequence definition ($a_n$ as function of $n$) is prerequisite to imposing the linear constraint $a_n = a + (n-1)d$.
c11_app_cbse_05_008: Geometric Progression is a specific *type* of sequence where $a_{n+1}/a_n = r$; the concept of a general term $a_n$ and recursive definition $a_{k+1} = r a_k$ builds directly on the sequence definition established here.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_05_001 -> c11_app_cbse_05_002 -> c11_app_cbse_05_003

## THIS_FORMULA
General Term of a Sequence: $a_n = f(n)$, where $n \in \mathbb{N}$ (or subset). Series (Sum of first $n$ terms): $S_n = \sum_{k=1}^{n} a_k$. Relation: $a_n = S_n - S_{n-1}$ (for $n > 1$), $a_1 = S_1$.

## FORMULA_VARIABLES
$a_n$: $n^{th}$ term (general term) of the sequence. $S_n$: Sum of the first $n$ terms (partial sum). $n$: Index/Position (natural number). $f(n)$: Explicit algebraic rule defining the sequence. $k$: Dummy index variable for summation.

## FORMULA_UNITS
Dimensionless (pure numbers/indices). If applied (e.g., money, population), units match the quantity measured (Rupees, Persons).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_eco_consumer_equilibrium | In Economics, a consumption path over time $C_1, C_2, \dots, C_T$ is a sequence; the lifetime utility $\sum \beta^t u(C_t)$ is a series (discounted sum).
c11_phy_kinematics | In Physics, positions at discrete time intervals $x_1, x_2, \dots$ form a sequence; total displacement $\sum \Delta x_i$ is a series.

## PREREQ_CONCEPT
Function notation $f(x)$ and domain/range concepts (Class 11 Sets/Relations & Functions), specifically understanding that the independent variable $n$ represents discrete position, not continuous time.

## PREREQ_BEFORE
Student must comfortably evaluate algebraic expressions for specific integer inputs (e.g., find $f(5)$ if $f(x)=x^2+3x$) and understand sigma notation $\sum$ as a shorthand for repeated addition.

## PREREQ_STUCK
Review "Relations and Functions" (Class 11 Maths Ch 2) focusing on domain restricted to Natural Numbers and evaluating $f(n)$ for $n=1,2,3...$.

## WORKED_EXAMPLE_1
PROBLEM: A digital marketing agency tracks the reach of a viral campaign. On Day 1, the post reaches 500 people. The reach triples every subsequent day. The campaign runs for 7 days. (a) Write the sequence of daily reach as an explicit formula $a_n$. (b) Find the reach on Day 5. (c) Write the series representing the *total cumulative reach* (sum of daily reaches) over the 7 days using sigma notation. (d) Calculate this total cumulative reach.
STEPS:
- Step 1: Identify the pattern. Day 1: 500. Day 2: $500 \times 3$. Day 3: $500 \times 3^2$. This is geometric growth. The first term $a = 500$, common ratio $r = 3$.
- Step 2: Formulate the general term (explicit formula). Since Day 1 corresponds to $n=1$, the exponent is $n-1$. Formula: $a_n = 500 \times 3^{n-1}$.
- Step 3: Find Day 5 reach ($a_5$). Substitute $n=5$: $a_5 = 500 \times 3^{4} = 500 \times 81 = 40,500$ people.
- Step 4: Write the Series (Total Cumulative Reach) in Sigma Notation. Sum from Day 1 ($n=1$) to Day 7 ($n=7$): $S_7 = \sum_{n=1}^{7} 500 \times 3^{n-1}$.
- Step 5: Calculate the Sum $S_7$. Use GP Sum formula (preview of next nodes): $S_n = a \frac{r^n - 1}{r - 1}$. $S_7 = 500 \times \frac{3^7 - 1}{3 - 1} = 500 \times \frac{2187 - 1}{2} = 500 \times 1093 = 546,500$.
REASONING: This problem connects the abstract definition of sequence ($a_n$ as function of $n$) and series ($\sum a_n$) to a tangible growth model. It forces the distinction between the *instantaneous* value on a specific day ($a_5$) and the *aggregate* value over the period ($S_7$).
ANSWER: (a) $a_n = 500(3)^{n-1}$ (b) 40,500 people (c) $S_7 = \sum_{n=1}^{7} 500(3)^{n-1}$ (d) 546,500 people.

## WORKED_EXAMPLE_2
PROBLEM: The sum of the first $n$ terms of a sequence is given by $S_n = 2n^3 - 3n^2 + 4n$. Find the general term $a_n$ of the sequence. Hence, find $a_1$ and $a_5$ explicitly. Verify that $a_1 = S_1$.
STEPS:
- Step 1: Recall the fundamental relationship between sequence and series: For $n > 1$, $a_n = S_n - S_{n-1}$. For $n=1$, $a_1 = S_1$.
- Step 2: Compute $S_{n-1}$ by substituting $(n-1)$ into the given $S_n$ expression. $S_{n-1} = 2(n-1)^3 - 3(n-1)^2 + 4(n-1)$.
- Step 3: Expand $S_{n-1}$ carefully. $(n-1)^3 = n^3 - 3n^2 + 3n - 1$. $(n-1)^2 = n^2 - 2n + 1$. Substitute: $S_{n-1} = 2(n^3 - 3n^2 + 3n - 1) - 3(n^2 - 2n + 1) + 4n - 4 = 2n^3 - 6n^2 + 6n - 2 - 3n^2 + 6n - 3 + 4n - 4 = 2n^3 - 9n^2 + 16n - 9$.
- Step 4: Find $a_n = S_n - S_{n-1}$. $a_n = (2n^3 - 3n^2 + 4n) - (2n^3 - 9n^2 + 16n - 9) = 6n^2 - 12n + 9$. This is the general term (valid for $n>1$).
- Step 5: Check base case $n=1$. $a_1 = S_1 = 2(1)^3 - 3(1)^2 + 4(1) = 3$. Check formula at $n=1$: $6(1)^2 - 12(1) + 9 = 3$. Formula holds for all $n \in \mathbb{N}$.
- Step 6: Find specific terms. $a_5 = 6(25) - 12(5) + 9 = 150 - 60 + 9 = 99$.
REASONING: This is a classic "inverse" problem: given the Series (Sum), find the Sequence (Term). It tests deep understanding that $S_n$ is the anti-difference of $a_n$, analogous to integral/derivative but discrete. The algebra requires careful polynomial expansion.
ANSWER: General term $a_n = 6n^2 - 12n + 9$. $a_1 = 3$, $a_5 = 99$. Verified $a_1 = S_1 = 3$.

## WORKED_EXAMPLE_3
PROBLEM: A construction company penalizes a contractor for delay. The penalty for Day 1 is ₹2000. For each succeeding day, the penalty increases by ₹500 more than the increase of the previous day. (i.e., Increase on Day 2 = ₹500, Increase on Day 3 = ₹1000, Increase on Day 4 = ₹1500...). The project is delayed by 30 days. (a) Show that the sequence of *daily penalties* forms a sequence where the *differences* are in AP. (b) Derive the general term $a_n$ for the penalty on the $n^{th}$ day. (c) Calculate the total penalty (Series) for 30 days.
STEPS:
- Step 1: Analyze the pattern. Penalty Day 1 ($a_1$) = 2000. Day 2 ($a_2$) = 2000 + 500 = 2500. Day 3 ($a_3$) = 2500 + 1000 = 3500. Day 4 ($a_4$) = 3500 + 1500 = 5000.
- Step 2: Observe the first differences: $\Delta a_1 = a_2 - a_1 = 500$, $\Delta a_2 = 1000$, $\Delta a_3 = 1500$. These differences form an AP with first term 500 and common difference 500. So $\Delta a_n = 500n$.
- Step 3: Derive $a_n$ using summation of differences (Telescoping/Recursive build). $a_n = a_1 + \sum_{k=1}^{n-1} \Delta a_k = 2000 + \sum_{k=1}^{n-1} 500k$.
- Step 4: Evaluate the sum. $\sum_{k=1}^{n-1} k = \frac{(n-1)n}{2}$. So $a_n = 2000 + 500 \times \frac{n(n-1)}{2} = 2000 + 250n(n-1) = 250n^2 - 250n + 2000$.
- Step 5: Verify: $n=1 \to 250-250+2000=2000$. $n=2 \to 1000-500+2000=2500$. Correct.
- Step 6: Calculate Total Penalty $S_{30} = \sum_{n=1}^{30} (250n^2 - 250n + 2000)$. Use summation formulas: $\sum n^2 = \frac{n(n+1)(2n+1)}{6}$, $\sum n = \frac{n(n+1)}{2}$, $\sum 1 = n$.
- Step 7: Compute for $n=30$. $\sum n^2 = 9455$, $\sum n = 465$. $S_{30} = 250(9455) - 250(465) + 2000(30) = 2,363,750 - 116,250 + 60,000 = 23,07,500$.
REASONING: This combines Sequence definition (quadratic general term derived from AP differences) with Series summation (using power sum formulas). It models a real-world "accelerating penalty" clause common in Indian infrastructure contracts (CPWD/PWD norms), moving beyond simple AP/GP.
ANSWER: (a) Differences: 500, 1000, 1500... form AP. (b) $a_n = 250n^2 - 250n + 2000$. (c) Total Penalty = ₹23,07,500.

## COMPETENCY_QUESTION_1
QUESTION: A sequence $\{a_n\}$ is defined by $a_1 = 1$ and $a_{n+1} = a_n + 2n$ for $n \ge 1$. A student claims the general term is $a_n = n^2$. Critically evaluate this claim. If true, prove it using the definition of the series $S_n$. If false, find the correct general term and the sum of the first 20 terms $S_{20}$.
COMPETENCY: Analytical Reasoning / Proof Construction
STEPS:
- Step 1: Test the claim for small $n$. $a_1=1 (1^2=1)$. $a_2 = a_1 + 2(1) = 3$. Claim $a_2 = 2^2 = 4$. Mismatch! Claim is FALSE.
- Step 2: Find correct general term. $a_n = a_1 + \sum_{k=1}^{n-1} 2k = 1 + 2 \frac{(n-1)n}{2} = 1 + n(n-1) = n^2 - n + 1$.
- Step 3: Verify recursion: $a_{n+1} = (n+1)^2 - (n+1) + 1 = n^2 + n + 1$. $a_n + 2n = (n^2 - n + 1) + 2n = n^2 + n + 1$. Matches.
- Step 4: Compute $S_{20} = \sum_{n=1}^{20} (n^2 - n + 1) = \sum n^2 - \sum n + \sum 1$.
- Step 5: Apply formulas ($n=20$): $\sum n^2 = 2870$, $\sum n = 210$, $\sum 1 = 20$. $S_{20} = 2870 - 210 + 20 = 2680$.
ANSWER: Claim is False. Correct general term: $a_n = n^2 - n + 1$. $S_{20} = 2680$.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the infinite sequence defined by $a_n = \frac{n}{n^2 + 1}$. Define the sequence of partial sums $S_n = \sum_{k=1}^{n} a_k$. Prove that the sequence $\{S_n\}$ is strictly increasing and bounded above by $1 + \frac{1}{2}\ln(n)$. Hence, argue whether the infinite series $\sum_{k=1}^{\infty} a_k$ converges or diverges. (Hint: Compare $a_k$ with $\int \frac{x}{x^2+1} dx$ or use inequality $\frac{k}{k^2+1} > \frac{1}{k+1}$).
COMPETENCY: Mathematical Modelling / Limit Analysis (Bridge to Calculus)
STEPS:
- Step 1: Show Strictly Increasing. Since $a_n = \frac{n}{n^2+1} > 0$ for all $n \in \mathbb{N}$, $S_{n+1} = S_n + a_{n+1} > S_n$.
- Step 2: Establish Lower Bound for Divergence Proof. Note $k^2 + 1 < k^2 + k = k(k+1)$ for $k \ge 1$. Thus $\frac{k}{k^2+1} > \frac{k}{k(k+1)} = \frac{1}{k+1}$.
- Step 3: Compare Series. $S_n = \sum_{k=1}^{n} \frac{k}{k^2+1} > \sum_{k=1}^{n} \frac{1}{k+1} = (\sum_{k=2}^{n+1} \frac{1}{k}) = H_{n+1} - 1$, where $H_m$ is the $m^{th}$ Harmonic number.
- Step 4: Use Harmonic Series Divergence. Since $H_m \sim \ln m \to \infty$ as $m \to \infty$, the lower bound $H_{n+1} - 1 \to \infty$.
- Step 5: Conclusion. Since partial sums $S_n$ are increasing and unbounded above (diverge to infinity), the infinite series **diverges**.
ANSWER: $\{S_n\}$ is strictly increasing. Using comparison test with Harmonic series ($\frac{k}{k^2+1} > \frac{1}{k+1}$), $S_n > H_{n+1} - 1 \to \infty$. The infinite series **diverges**.
DIFFICULTY: hard