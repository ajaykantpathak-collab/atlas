## ELI5
Deposit 1000 rupees today, 1100 next month, 1210 the month after - an ordered list of balances: a sequence. Ask for the total savings after 12 months and you are adding the list: a series. Order matters in the queue; the series carries the sum. And when the list follows a specific mathematical pattern - adding a fixed number, as in the AP you know, or multiplying by a fixed ratio like 1.1 here - the sequence earns the name progression. List, sum, pattern: three words, three concepts.

## DEFINITION
A **sequence** is an ordered arrangement of numbers (or objects) according to a definite rule, where each element has a specific position (first, second, third...). A **series** is the expression formed by adding the terms of a sequence, denoted as $S_n = a_1 + a_2 + a_3 + \dots + a_n$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to distinguish between a sequence and a series, identify the $n^{th}$ term ($a_n$) of a sequence given its algebraic rule or pattern, and write the associated series notation $\sum a_k$ for a given sequence.

## SCOPE_BOUNDARY
This node covers the fundamental definitions of sequence, finite/infinite sequence, series, and progression (AP/GP introduction). It does **not** cover formulas for $n^{th}$ term or sum of AP/GP — those are covered in subsequent nodes (c11_app_cbse_05_003 onwards).

## WALKTHROUGH
Start by asking: "If I deposit ₹1000 today, ₹1100 next month, ₹1210 the month after... is this a sequence? Yes — it's an ordered list of balances. Now, if I ask 'What is my total savings after 12 months?', I am asking for a **series** (the sum)." Connect this to Class 10 AP knowledge: "You already know AP where we *add* a fixed number. Here, we *multiply* by a fixed ratio (1.1) — that's a Geometric Progression, the new concept for Class 11." The key insight: **Sequence = List with order; Series = Sum of that list; Progression = Sequence with a specific mathematical pattern.**

Takeaway: mastery means labelling a given list as sequence, series or progression and justifying the label. Exam moves: distinguish-the-terms questions and write-the-notation items on the savings scene. Check yourself: the sequence is the list, the series is the plus-sign version, and neither needs a pattern - only a progression promises one, which is why AP and GP are progressions while a random list of balances is merely a sequence. Students miss it because the three words trade as synonyms, when the monthly-deposit story shows the design: order creates the sequence, addition creates the series, and the fixed ratio is what upgrades the pattern into a geometric progression.

## DIAGNOSTIC_QUESTION_1
**REMEMBER:** Define a finite sequence and give an example different from the textbook. How does it differ from an infinite sequence?

## DIAGNOSTIC_ANSWER_1
A finite sequence has a countable number of terms (e.g., marks of 5 students: 85, 90, 78, 92, 88). An infinite sequence has uncountable terms (e.g., 1, 1/2, 1/3, 1/4, ...). A wrong answer (e.g., "finite sequence stops at 100") reveals the student confuses *value* of terms with *count* of terms — they think the sequence ends because terms become small, not because the index $n$ stops.

## DIAGNOSTIC_QUESTION_2
**UNDERSTAND:** The $n^{th}$ term of a sequence is given by $a_n = n^2 - 1$. Write the first 4 terms and the associated series up to 4 terms. Is this sequence an AP? Justify.

## DIAGNOSTIC_ANSWER_2
Terms: $a_1=0, a_2=3, a_3=8, a_4=15$. Series: $S_4 = 0 + 3 + 8 + 15 = 26$. Differences: $3-0=3, 8-3=5, 15-8=7$ — not constant, so **not an AP**. A wrong answer (e.g., "it is AP because formula has $n^2$") reveals the student thinks any algebraic formula makes an AP, missing that AP requires *linear* expression in $n$ ($An+B$), not quadratic.

## DIAGNOSTIC_QUESTION_3
**APPLY:** A bacteria culture doubles every hour. If initial count is 500, write the sequence for the first 5 hours. Express the total bacteria count after 5 hours as a series (do not evaluate). Identify $a$ and $r$ if this is a GP.

## DIAGNOSTIC_ANSWER_3
Sequence: $500, 1000, 2000, 4000, 8000$. Series: $S_5 = 500 + 1000 + 2000 + 4000 + 8000 = \sum_{k=1}^{5} 500(2)^{k-1}$. Here $a=500, r=2$. A wrong answer (e.g., writing $500, 1000, 1500...$ or $r=500$) reveals the student confuses "doubling" (multiplicative) with "increasing by 500" (additive) — a classic AP vs GP confusion.

## DIAGNOSTIC_QUESTION_4
**ANALYZE:** Compare the sequences: (i) $2, 4, 6, 8, ...$ (ii) $2, 4, 8, 16, ...$ (iii) $1, -1, 1, -1, ...$. For each, state if it is an AP, GP, both, or neither. Explain the condition for a sequence to be both AP and GP.

## DIAGNOSTIC_ANSWER_4
(i) AP only ($d=2, r \neq \text{const}$). (ii) GP only ($r=2, d \neq \text{const}$). (iii) **Both AP and GP** ($d=0, r=-1$). Condition: A sequence is both AP and GP iff it is a **constant sequence** ($a, a, a, ...$) OR alternating constant ($a, -a, a, -a...$ with $r=-1, d=-2a$). Actually, only constant sequence satisfies both definitions strictly ($d=0, r=1$). The alternating case has $d=-2a$ (not constant if $a \neq 0$? Wait: $a, -a, a, -a$: differences are $-2a, 2a, -2a$ — not constant! So **only constant sequences** are both AP and GP. A wrong answer (e.g., "alternating is both") reveals the student doesn't verify *constant difference* for AP — they only check ratio.

## DIAGNOSTIC_QUESTION_5
**EVALUATE:** A student claims: "The series $1 + 2 + 4 + 8 + ...$ to infinity has a finite sum because terms grow slowly." Critique this statement using the concept of convergent/divergent infinite series.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. The series is a GP with $a=1, r=2$. Since $|r| = 2 > 1$, the series **diverges** — the sum grows without bound ($S_n = 2^n - 1 \to \infty$). A finite sum for infinite GP exists **only if $|r| < 1$**. A wrong answer (e.g., "sum is -1 using formula $\frac{a}{1-r}$") reveals the student blindly applies the infinite sum formula without checking the condition $|r|<1$ — a critical board exam error.

## DIAGNOSTIC_QUESTION_6
**CREATE:** Design a real-life scenario (Indian context) that generates a sequence which is **neither AP nor GP**. Write the first 5 terms, the $n^{th}$ term rule, and the series up to $n=5$. Explain why it fits neither progression.

## DIAGNOSTIC_ANSWER_6
**Scenario:** Daily temperature (in °C) in Delhi for a week: $22, 25, 21, 24, 20, ...$ (fluctuating). Rule: $a_n = 23 + (-1)^n \cdot 2 + \text{random variation}$ (no fixed algebraic rule). Series $S_5 = 22+25+21+24+20 = 112$. It is neither AP (differences: $3, -4, 3, -4$ not constant) nor GP (ratios not constant). A poor answer (e.g., "prime numbers: 2,3,5,7,11") might still have a pattern — the student must create a *genuinely irregular* sequence to show understanding that sequences need not follow progressions.

## COMMON_MISCONCEPTION
**Misconception:** "Every sequence has a general term formula like $an+b$ or $ar^{n-1}$."  
**Why it happens:** Class 10 focuses heavily on AP ($a_n = a + (n-1)d$). Students generalize that *all* sequences must follow a neat algebraic pattern.  
**Concrete error:** Given sequence $1, 4, 9, 16, ...$, a student forces $a_n = 3n - 2$ (which gives $1, 4, 7, 10...$) instead of recognizing $a_n = n^2$. They try to fit AP/GP templates onto non-progression sequences.

## ON_FAILURE
1. **Show counter-examples:** List sequences with no algebraic rule: "Digits of π: 3, 1, 4, 1, 5, 9..." or "Number of letters in months: 7, 8, 5, 5, 3, 4..." — these are valid sequences.  
2. **Re-define sequence:** "A sequence is a *function* $f: \mathbb{N} \to \mathbb{R}$. The 'rule' can be a table, a graph, or an algorithm — not just a formula."  
3. **Practice:** Give 5 sequences (2 AP, 1 GP, 1 quadratic, 1 random) and ask: "Which are progressions? For non-progressions, can you still write $a_5$?" This builds the distinction: *all progressions are sequences, not all sequences are progressions.*

## PREREQUISITE_NODE_IDS
N/A

## PREREQUISITE_REASONS
none: This is the first node of Chapter 5 (Sequences & Series). It builds only on basic algebra (functions, notation) and number patterns from Classes 9-10, not on specific prior nodes in this curriculum.

## FORWARD_NODE_IDS
c11_app_cbse_05_002, c11_app_cbse_05_003, c11_app_cbse_05_008

## FORWARD_REASONS
c11_app_cbse_05_002: This node defines "Sequence" and "Series"; the next node (Sequences) deepens into types of sequences, sigma notation, and $n^{th}$ term patterns.  
c11_app_cbse_05_003: This node introduces "Progression" concept; the AP node formalizes Arithmetic Progression with $a_n$ and $S_n$ formulas.  
c11_app_cbse_05_008: This node mentions GP as "multiplying by fixed ratio"; the GP node formalizes Geometric Progression with $a_n = ar^{n-1}$ and sum formulas.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none: No prior class nodes are available for cross-subject linking in this curriculum data.

## CHAIN_DESCRIPTION
none -> c11_app_cbse_05_001 -> c11_app_cbse_05_002, c11_app_cbse_05_003, c11_app_cbse_05_008

## THIS_FORMULA
N/A - conceptual (definitions of sequence, series, progression)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
N/A

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_physics_kinematics | Displacement/time data forms sequences; velocity is difference of position sequence (like AP if uniform acceleration).  
c11_economics_consumer_equilibrium | Utility from successive units of a good forms a sequence; total utility is the series (sum). Marginal utility is the "difference" (like common difference).

## PREREQ_CONCEPT
Function notation $f: \mathbb{N} \to \mathbb{R}$ and basic algebraic patterns (linear vs quadratic vs exponential) from Class 9-10.

## PREREQ_BEFORE
Student must be comfortable with: (1) Subscript notation $a_1, a_2, a_n$, (2) Difference between "adding a fixed number" (AP) and "multiplying by fixed number" (GP), (3) Sigma notation $\sum$ basics.

## PREREQ_STUCK
If stuck, review **Class 10 Chapter 5 (Arithmetic Progressions)** — specifically the definition of AP, $n^{th}$ term formula, and sum formula. That is the only progression covered before Class 11.

## WORKED_EXAMPLE_1
**PROBLEM:** A startup's user base grows as follows: Month 1: 100 users. Month 2: 150 users. Month 3: 225 users. Month 4: 337.5 users (round to 338). Is this a sequence? Is it a progression? If yes, which type? Write the series for total users acquired in 4 months.

**STEPS:**
- Step 1: Identify the list of numbers: $100, 150, 225, 338$. This is an ordered list indexed by month → **Yes, it is a sequence** (finite, 4 terms).
- Step 2: Check for Arithmetic Progression: Differences: $150-100=50$, $225-150=75$, $338-225=113$. Not constant → **Not an AP**.
- Step 3: Check for Geometric Progression: Ratios: $150/100 = 1.5$, $225/150 = 1.5$, $338/225 \approx 1.502 \approx 1.5$. Constant ratio ($r=1.5$) → **It is a GP** (approximately, due to rounding).
- Step 4: Write the series (sum of terms): $S_4 = 100 + 150 + 225 + 338 = 813$ total users acquired in 4 months.
- Step 5: Interpret: The sequence models *growth by percentage* (50% monthly), characteristic of GP. The series gives *cumulative acquisition*.

**REASONING:** This example distinguishes sequence (any ordered list) from progression (specific pattern). The near-constant ratio identifies GP — a key Class 11 concept beyond Class 10 AP. Rounding in real data is addressed by "approximately GP".

**ANSWER:** Sequence: Yes. Progression: Yes, GP with $a=100, r=1.5$. Series: $S_4 = 813$.

## WORKED_EXAMPLE_2
**PROBLEM:** The $n^{th}$ term of a sequence is defined as $a_n = \frac{n(n+1)}{2}$. (a) Write the first 5 terms. (b) Is this an AP or GP? (c) Find $S_5$ (series sum). (d) What famous number pattern does this sequence represent?

**STEPS:**
- Step 1: Compute terms by substituting $n=1,2,3,4,5$:  
  $a_1 = \frac{1(2)}{2} = 1$  
  $a_2 = \frac{2(3)}{2} = 3$  
  $a_3 = \frac{3(4)}{2} = 6$  
  $a_4 = \frac{4(5)}{2} = 10$  
  $a_5 = \frac{5(6)}{2} = 15$  
  Sequence: $1, 3, 6, 10, 15$.
- Step 2: Test AP: Differences: $3-1=2$, $6-3=3$, $10-6=4$, $15-10=5$ → Not constant. **Not AP**.
- Step 3: Test GP: Ratios: $3/1=3$, $6/3=2$, $10/6=1.67$ → Not constant. **Not GP**.
- Step 4: Compute series $S_5 = 1+3+6+10+15 = 35$.
- Step 5: Recognize pattern: $1, 3, 6, 10, 15$ are **Triangular Numbers** — sums of first $n$ natural numbers: $a_n = \sum_{k=1}^n k = \frac{n(n+1)}{2}$.

**REASONING:** This shows a sequence defined by a quadratic formula ($n^2/2 + n/2$) which is neither AP (linear) nor GP (exponential). It connects to the concept that $a_n$ itself can be a *sum* (series of another sequence), foreshadowing "sum of series" topics.

**ANSWER:** (a) $1, 3, 6, 10, 15$ (b) Neither AP nor GP (c) $S_5 = 35$ (d) Triangular numbers.

## WORKED_EXAMPLE_3
**PROBLEM:** A ball is dropped from a height of 10 meters. On each bounce, it rebounds to 60% of its previous height. (a) Write the sequence of maximum heights after each bounce (starting from drop as "bounce 0"). (b) Is this a progression? (c) Write the series representing total vertical distance traveled by the ball until it comes to rest (theoretically infinite bounces). (d) Why can we assign a finite value to this infinite series?

**STEPS:**
- Step 1: Define heights: Initial drop height $h_0 = 10$ m. After 1st bounce: $h_1 = 10 \times 0.6 = 6$ m. After 2nd: $h_2 = 6 \times 0.6 = 3.6$ m. After 3rd: $h_3 = 3.6 \times 0.6 = 2.16$ m. Sequence: $10, 6, 3.6, 2.16, ...$
- Step 2: Check progression: Ratios: $6/10 = 0.6$, $3.6/6 = 0.6$, $2.16/3.6 = 0.6$ → Constant ratio $r=0.6$. **It is a GP** with $a=10, r=0.6$.
- Step 3: Total distance = Down + Up + Down + Up + ...  
  $= 10 + 2(6) + 2(3.6) + 2(2.16) + ...$  
  $= 10 + 2 \times [6 + 3.6 + 2.16 + ...]$  
  The bracket is an infinite GP with $a'=6, r=0.6$.
- Step 4: Since $|r| = 0.6 < 1$, the infinite GP converges. Sum of bracket $= \frac{6}{1-0.6} = \frac{6}{0.4} = 15$.  
  Total distance $= 10 + 2 \times 15 = 40$ meters.
- Step 5: The infinite series has a finite sum **because $|r| < 1$** (terms decay geometrically). This is the condition for convergence of infinite GP — a core Class 11 concept.

**REASONING:** This classic physics problem combines sequence (heights), progression (GP), series (distance sum), and infinite series convergence ($|r|<1$). It previews the "Infinite GP" application (Illustration 35-38 in NCERT).

**ANSWER:** (a) $10, 6, 3.6, 2.16, ...$ (b) GP with $a=10, r=0.6$ (c) $S = 10 + 2\sum_{k=1}^\infty 10(0.6)^k$ (d) Finite sum because $|r|=0.6 < 1$; total distance = 40 m.

## COMPETENCY_QUESTION_1
**QUESTION:** A sequence is defined recursively: $a_1 = 2$, $a_{n+1} = 2a_n + 1$ for $n \geq 1$. (a) Write the first 4 terms. (b) Is this an AP or GP? (c) Guess the explicit formula for $a_n$ by observing the pattern. (d) Verify your guess for $n=5$ using the recursive definition.

**COMPETENCY:** Pattern recognition and translation between recursive and explicit definitions (Understanding + Apply)

**STEPS:**
- Step 1: Compute recursively: $a_1=2$; $a_2=2(2)+1=5$; $a_3=2(5)+1=11$; $a_4=2(11)+1=23$. Terms: $2, 5, 11, 23$.
- Step 2: Differences: $3, 6, 12$ (not constant) → Not AP. Ratios: $2.5, 2.2, 2.09$ (not constant) → Not GP.
- Step 3: Observe pattern: $2 = 3-1$, $5 = 6-1$, $11 = 12-1$, $23 = 24-1$ → Each term is one less than a multiple of 3: $3 \times 1 -1, 3 \times 2 -1, 3 \times 4 -1, 3 \times 8 -1$ → $a_n = 3 \cdot 2^{n-1} - 1$.
- Step 4: Verify for $n=5$: Recursive: $a_5 = 2(23)+1 = 47$. Explicit: $3 \cdot 2^{4} - 1 = 48-1 = 47$. Matches.

**ANSWER:** (a) $2, 5, 11, 23$ (b) Neither AP nor GP (c) $a_n = 3 \cdot 2^{n-1} - 1$ (d) Verified: both give 47.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** The sum of the first $n$ terms of a sequence is given by $S_n = 2n^2 + 3n$. (a) Find the first term $a_1$. (b) Find the $n^{th}$ term $a_n$ in terms of $n$. (c) Determine if the sequence is an AP. If yes, find $a$ and $d$. (d) Find $\sum_{k=1}^{10} a_k$.

**COMPETENCY:** Relating sequence ($a_n$) and series ($S_n$), identifying progression from sum formula (Analyze + Apply)

**STEPS:**
- Step 1: $a_1 = S_1 = 2(1)^2 + 3(1) = 5$.
- Step 2: For $n \geq 2$, $a_n = S_n - S_{n-1} = (2n^2+3n) - [2(n-1)^2 + 3(n-1)]$  
  $= 2n^2+3n - [2(n^2-2n+1) + 3n-3]$  
  $= 2n^2+3n - [2n^2-4n+2+3n-3]$  
  $= 2n^2+3n - 2n^2 + 4n - 3n + 1$  
  $= 4n + 1$.  
  Check $n=1$: $4(1)+1=5 = a_1$. So $a_n = 4n+1$ for all $n \in \mathbb{N}$.
- Step 3: $a_n = 4n+1$ is linear in $n$ → **It is an AP**.  
  First term $a = a_1 = 5$. Common difference $d = a_2 - a_1 = (9) - (5) = 4$ (or coefficient of $n$).
- Step 4: $\sum_{k=1}^{10} a_k = S_{10} = 2(10)^2 + 3(10) = 200 + 30 = 230$.

**ANSWER:** (a) $a_1 = 5$ (b) $a_n = 4n + 1$ (c) Yes, AP with $a=5, d=4$ (d) $230$.

**DIFFICULTY:** hard