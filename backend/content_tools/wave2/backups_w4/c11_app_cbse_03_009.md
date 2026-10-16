## ELI5
Imagine a metro train route between Station A and Station B. A **closed interval [A, B]** is like a train that stops at *both* stations — you can board at A and alight at B. An **open interval (A, B)** is like an express train that passes through A and B without stopping — you can only board/alight strictly *between* them. A **semi-open interval [A, B) or (A, B]** is a train that stops at exactly *one* station. The most common mix-up? Students think square brackets `[ ]` mean "strictly between" because they look like "walls," but actually `[ ]` means the endpoint is **included** (the wall stops there), while `( )` means **excluded** (the wall has a gap).

## DEFINITION
An interval is a subset of the set of real numbers $\mathbb{R}$ consisting of all real numbers lying between two given real numbers $a$ and $b$ ($a < b$), where the endpoints $a$ and $b$ may be included or excluded based on the interval type. There are four fundamental types: closed $[a, b]$, open $(a, b)$, and two semi-open/closed $[a, b)$ and $(a, b]$, along with infinite intervals extending to $\pm\infty$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Convert fluently between interval notation, set-builder notation, and graphical representation on the real number line for all six interval types (four finite, two infinite with one finite bound, and the whole real line). (2) Correctly determine whether a specific real number belongs to a given interval by analyzing the inequality symbols and bracket types.

## SCOPE_BOUNDARY
This node covers the classification, notation, set-builder form, graphical representation, and length calculation of intervals as subsets of $\mathbb{R}$ strictly as per NCERT Class 11 Chapter 3 (Section 3.8). It does NOT cover operations on intervals (union, intersection, complement) which are addressed in later nodes on set operations (c11_app_cbse_03_010 onwards), nor does it cover intervals in the context of domain/range of functions (Calculus).

## WALKTHROUGH
You're designing a temperature control system for a vaccine storage unit. The vaccine is safe only if the temperature $T$ satisfies $2^\circ\text{C} \le T \le 8^\circ\text{C}$. How do you write this "safe zone" mathematically so a computer can check it? You start by identifying the endpoints: $a=2$, $b=8$. Since the vaccine is safe *at* $2$ and *at* $8$, both endpoints are **included**. This gives the closed interval $[2, 8]$. Now, what if the sensor fails exactly at $8^\circ$? The condition becomes $2 \le T < 8$ — a semi-open interval $[2, 8)$. The key insight: **brackets are boundary decisions**. Square bracket = "endpoint allowed" ($\le$ or $\ge$); round bracket = "endpoint forbidden" ($<$ or $>$). Always translate the inequality symbols *first*, then write the brackets.

Takeaway: mastery means translating a safety sentence into bracket notation and reading brackets as boundary decisions. Exam moves: write-the-interval questions on the vaccine scene. Check yourself: safe at both ends means closed - from 2 to 8 with square brackets; failing at 8 but surviving at 2 means semi-open. Students miss it because intervals look like punctuation, when the vaccine's survival range shows the design: each bracket is an engineering decision about an endpoint, and the same two numbers produce four different intervals depending only on who is allowed in.

## DIAGNOSTIC_QUESTION_1
Write the set-builder form of the interval $[-5, 3)$ and state whether the number $-5$ belongs to this interval.

## DIAGNOSTIC_ANSWER_1
The set-builder form is $\{x : x \in \mathbb{R}, -5 \le x < 3\}$. Yes, $-5$ belongs to the interval because the square bracket at $-5$ indicates inclusion ($-5 \le x$). A wrong answer (e.g., writing $-5 < x < 3$ or saying $-5$ does not belong) reveals the student confuses square brackets with exclusion or misreads the mixed bracket notation.

## DIAGNOSTIC_QUESTION_2
A student writes the interval for $\{x : x \in \mathbb{R}, -2 < x \le 5\}$ as $[-2, 5]$. Explain why this is incorrect and provide the correct interval notation.

## DIAGNOSTIC_ANSWER_2
The student incorrectly used a square bracket at $-2$, which implies $-2 \le x$ (inclusion), but the set-builder form has a strict inequality $-2 < x$ (exclusion). The correct notation is $(-2, 5]$. A wrong explanation (e.g., "brackets don't matter" or "both brackets should be same") reveals a fundamental misunderstanding that bracket *type* encodes the inequality *direction* at each endpoint independently.

## DIAGNOSTIC_QUESTION_3
Represent the solution set of the inequality $|x - 1| < 3$ as an interval and find its length.

## DIAGNOSTIC_ANSWER_3
$|x - 1| < 3 \implies -3 < x - 1 < 3 \implies -2 < x < 4$. The interval is $(-2, 4)$. Length $= 4 - (-2) = 6$. A wrong answer (e.g., $[-2, 4]$ or length $= 2$) reveals the student either converts absolute value inequalities incorrectly (forgetting strict inequality remains strict) or calculates length as $b - a$ without handling negative $a$ correctly.

## DIAGNOSTIC_QUESTION_4
Compare the intervals $I_1 = (0, 1)$ and $I_2 = [0, 1]$. Are they equal sets? Justify your answer by identifying a specific element that distinguishes them.

## DIAGNOSTIC_ANSWER_4
No, they are not equal. $0 \in I_2$ but $0 \notin I_1$ (similarly for $1$). The open interval excludes endpoints; the closed interval includes them. A wrong answer claiming they are equal because "both have infinite elements between 0 and 1" reveals the student confuses cardinality (size) with set equality (exact same elements).

## DIAGNOSTIC_QUESTION_5
A weather app defines "Comfortable Temperature" as $T \in [18, 25]$ and "Ideal Temperature" as $T \in (18, 25)$. Evaluate: Is "Ideal" a subset of "Comfortable"? Is "Comfortable" a subset of "Ideal"? Defend your answer.

## DIAGNOSTIC_ANSWER_5
"Ideal" $(18, 25)$ **is** a subset of "Comfortable" $[18, 25]$ because every $x$ satisfying $18 < x < 25$ also satisfies $18 \le x \le 25$. "Comfortable" is **not** a subset of "Ideal" because $18 \in [18, 25]$ but $18 \notin (18, 25)$. A wrong evaluation (e.g., "neither is a subset because endpoints differ") reveals the student doesn't apply the subset definition $A \subseteq B \iff (\forall x, x \in A \implies x \in B)$ to boundary elements.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) that is naturally modeled by a semi-open interval $[a, b)$ where $a$ and $b$ are specific numbers. Write the scenario, the interval, and its set-builder form.

## DIAGNOSTIC_ANSWER_6
**Scenario:** An Indian Railways "Tatkal" ticket booking window opens at 10:00 AM sharp and closes at 11:00 AM sharp (booking allowed *at* 10:00 but *not* at 11:00). Let $t$ = minutes past 10:00 AM. Interval: $[0, 60)$. Set-builder: $\{t : t \in \mathbb{R}, 0 \le t < 60\}$. A poor answer (e.g., using closed interval $[0, 60]$ or open interval $(0, 60)$) reveals the student cannot map "inclusive start, exclusive end" real-world constraints to bracket notation.

## COMMON_MISCONCEPTION
Students consistently believe that **round brackets `( )` mean "including the endpoint" because parentheses "hug" the number**, while square brackets `[ ]` "push away" — the exact opposite of the mathematical convention. For example, given $x \in [2, 5)$, they claim $2$ is excluded ("square brackets are strict") and $5$ is included ("round brackets are soft"). This stems from overgeneralizing the use of parentheses in coordinate geometry $(x, y)$ or function notation $f(x)$ where parentheses group inputs, not denote exclusion.

## ON_FAILURE
1. **Anchor with a physical gesture**: Hold up your hand with fingers together — "This is a square bracket `[ ]`, a solid wall. The number *hits* the wall and stays *inside*." Then make a circle with thumb/index finger — "This is a round bracket `( )`, a hoop. The number *passes through* the hoop and stays *outside*." 
2. **Drill the translation table**: Make a 3-column cheat sheet: Inequality ($\le$ / $<$) $\leftrightarrow$ Bracket (`[` / `(`) $\leftrightarrow$ Number line dot (Filled / Hollow). Practice 5 rapid conversions daily until automatic.
3. **Boundary testing habit**: For *any* interval, force the student to explicitly test the two endpoints by plugging them into the set-builder inequality. "Does $x=a$ satisfy $a \le x \le b$? Yes $\to$ `[`. Does $x=b$ satisfy $a < x < b$? No $\to$ `)`."

## PREREQUISITE_NODE_IDS
c11_app_cbse_03_001, c11_app_cbse_03_002, c11_app_cbse_03_003, c11_app_cbse_03_004, c11_app_cbse_03_005, c11_app_cbse_03_007, c11_app_cbse_03_008

## PREREQUISITE_REASONS
c11_app_cbse_03_001: Introduction establishes the context of collections and well-definedness needed to define intervals as specific collections of real numbers.
c11_app_cbse_03_002: What is a Set? provides the foundational definition of a set, elements, and membership ($\in$/$\notin$) used to define intervals as sets.
c11_app_cbse_03_003: Representation of Sets teaches set-builder form $\{x : P(x)\}$ which is the primary alternative notation for intervals.
c11_app_cbse_03_004: Types of Sets introduces finite/infinite distinction; intervals are infinite subsets of $\mathbb{R}$ (except degenerate cases).
c11_app_cbse_03_005: Subsets establishes $A \subseteq B$ logic used to compare intervals (e.g., $(a,b) \subset [a,b]$).
c11_app_cbse_03_007: Universal Set defines $\mathbb{R}$ as the universal set for intervals, making intervals subsets of $\mathbb{R}$.
c11_app_cbse_03_008: Intervals as Subset of R introduces the concept of intervals as segments on the real line; this node classifies them.

## FORWARD_NODE_IDS
c11_app_cbse_03_010

## FORWARD_REASONS
c11_app_cbse_03_010: Venn Diagrams will visually represent intervals as subsets of $\mathbb{R}$ and illustrate relationships (overlap, containment) between different interval types, building directly on the interval classification learned here.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_03_008 -> c11_app_cbse_03_009 -> c11_app_cbse_03_010

## THIS_FORMULA
Length of interval = $b - a$ (for all types: $(a,b), [a,b], [a,b), (a,b]$ where $a,b \in \mathbb{R}, a < b$)

## FORMULA_VARIABLES
$a$: left endpoint (real number); $b$: right endpoint (real number); condition: $a < b$

## FORMULA_UNITS
Unitless (difference of two real numbers on the number line)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_cbse_02_001 | In Physics (Units & Measurements), error analysis uses intervals: a measurement $x \pm \Delta x$ corresponds to the closed interval $[x - \Delta x, x + \Delta x]$ representing the range of true values.
c11_che_cbse_01_003 | In Chemistry (Some Basic Concepts), concentration ranges for titration endpoints (e.g., pH range of an indicator) are modeled as intervals, e.g., phenolphthalein changes in pH $[8.2, 10.0]$.

## PREREQ_CONCEPT
The student must understand that $\mathbb{R}$ (real numbers) is dense — between any two distinct reals there are infinitely many reals — which is why intervals cannot be listed in roster form and require interval/set-builder notation.

## PREREQ_BEFORE
The student must be fluent in solving linear inequalities (e.g., $2x - 3 < 7$) and absolute value inequalities (e.g., $|x - 1| < 3$) to convert them into interval notation.

## PREREQ_STUCK
If stuck, review solving linear and absolute value inequalities (Class 11 Algebra/NCERT Ch. 6) and the meaning of $\le$ vs $<$ on the number line (filled vs hollow dots).

## WORKED_EXAMPLE_1
PROBLEM: The Delhi Metro Blue Line operates from 5:30 AM to 11:30 PM. Let $t$ represent the time in hours on a 24-hour clock (e.g., 5:30 AM = 5.5, 11:30 PM = 23.5). Write the operating hours as an interval in three forms: (i) interval notation, (ii) set-builder notation, (iii) graphical representation on a number line. Also, find the length of this interval.
STEPS:
- Step 1: Identify the endpoints from the real-world context. Start time = 5:30 AM = 5.5 hours. End time = 11:30 PM = 23.5 hours.
- Step 2: Determine inclusion/exclusion. The metro operates *at* 5:30 AM (first train departs) and *at* 11:30 PM (last train departs). So both endpoints are **included**.
- Step 3: Write the interval notation. Since both endpoints are included, use square brackets: $[5.5, 23.5]$.
- Step 4: Write the set-builder notation. Translate inclusion to $\le$: $\{t : t \in \mathbb{R}, 5.5 \le t \le 23.5\}$.
- Step 5: Graphical representation. Draw a number line. Mark 5.5 and 23.5. Place **filled (solid) dots** at both points (inclusion). Shade the line segment between them.
- Step 6: Calculate length. Length $= b - a = 23.5 - 5.5 = 18$ hours.
REASONING: The problem maps a real-world schedule (inclusive boundaries) to mathematical notation. The key is recognizing "operates from X to Y" in transport contexts usually includes both the first and last service times, corresponding to $\le$ and square brackets. Length is invariant to endpoint inclusion.
ANSWER: (i) $[5.5, 23.5]$ (ii) $\{t : t \in \mathbb{R}, 5.5 \le t \le 23.5\}$ (iii) Number line with solid dots at 5.5 and 23.5, shaded between. Length = 18 hours.

## WORKED_EXAMPLE_2
PROBLEM: A pharmaceutical company stores a vaccine at a temperature $T$ (in $^\circ$C) such that $|T - 5| \le 3$. The storage unit has a safety alarm that triggers if $T$ goes outside the *open* interval $(1, 9)$. Determine: (a) The safe storage interval from the inequality. (b) Does the alarm interval match the safe interval? (c) If not, at which specific temperatures will the alarm fail to trigger despite the vaccine being unsafe?
STEPS:
- Step 1: Solve the absolute value inequality for the safe interval. $|T - 5| \le 3 \implies -3 \le T - 5 \le 3 \implies 2 \le T \le 8$. Safe interval = $[2, 8]$.
- Step 2: Note the alarm interval is given as open: $(1, 9) = \{T : 1 < T < 9\}$.
- Step 3: Compare the two intervals. Safe = $[2, 8]$. Alarm = $(1, 9)$. They are **not equal**.
- Step 4: Find temperatures where vaccine is unsafe but alarm is silent. Unsafe means $T \notin [2, 8]$, i.e., $T < 2$ or $T > 8$. Alarm silent means $T \notin (1, 9)$, i.e., $T \le 1$ or $T \ge 9$. Intersection (unsafe AND alarm silent): $(T < 2 \text{ and } T \le 1) \text{ or } (T > 8 \text{ and } T \ge 9) \implies T \le 1 \text{ or } T \ge 9$.
- Step 5: Identify specific boundary failures. At $T = 1$: Vaccine unsafe ($1 < 2$), Alarm silent ($1 \notin (1,9)$). At $T = 9$: Vaccine unsafe ($9 > 8$), Alarm silent ($9 \notin (1,9)$). At $T = 2$: Vaccine safe, Alarm triggers ($2 \in (1,9)$) — false alarm, but not dangerous.
REASONING: This applies interval comparison to a safety-critical scenario. The mismatch arises because the safe interval is *closed* (manufacturer spec includes boundaries) while the alarm uses an *open* interval (sensor tolerance excludes exact boundaries). The dangerous failures occur exactly at the endpoints where the alarm's exclusion ($<$) differs from the spec's inclusion ($\le$).
ANSWER: (a) Safe interval = $[2, 8]$. (b) No, alarm interval $(1, 9) \neq [2, 8]$. (c) Alarm fails to trigger at $T \le 1$ and $T \ge 9$; critically at $T = 1$ and $T = 9$.

## WORKED_EXAMPLE_3
PROBLEM: In a JEE Advanced mock test, a question asks: "Let $A = \{x \in \mathbb{R} : x^2 - 5x + 6 < 0\}$ and $B = \{x \in \mathbb{R} : x^2 - 5x + 6 \le 0\}$. Find $A \cap B$, $A \cup B$, and $B \setminus A$ (set difference). Express all answers in interval notation."
STEPS:
- Step 1: Solve the quadratic inequality for set $A$ (strict). $x^2 - 5x + 6 < 0 \implies (x-2)(x-3) < 0$. Roots: 2, 3. Parabola opens upward. Solution: $2 < x < 3$. So $A = (2, 3)$.
- Step 2: Solve for set $B$ (non-strict). $x^2 - 5x + 6 \le 0 \implies (x-2)(x-3) \le 0$. Solution: $2 \le x \le 3$. So $B = [2, 3]$.
- Step 3: Find $A \cap B$. $A = (2,3)$, $B = [2,3]$. Intersection = elements in *both*. Since $(2,3) \subset [2,3]$, $A \cap B = A = (2, 3)$.
- Step 4: Find $A \cup B$. Union = elements in *either*. Since $A \subset B$, $A \cup B = B = [2, 3]$.
- Step 5: Find $B \setminus A$. Elements in $B$ but not in $A$. $B = [2,3]$, $A = (2,3)$. The only elements in $B$ not in $A$ are the endpoints $2$ and $3$. So $B \setminus A = \{2, 3\}$.
- Step 6: Express $\{2, 3\}$ in interval notation? **Cannot**. A finite set of discrete points is not an interval. Answer as roster form $\{2, 3\}$ or set-builder $\{x : x=2 \text{ or } x=3\}$.
REASONING: This combines quadratic inequalities (Class 11 Algebra) with interval types and set operations. The critical insight: the strict vs non-strict inequality changes the interval type from open to closed, making one a proper subset of the other. The set difference $B \setminus A$ isolates exactly the boundary points, demonstrating that endpoints are the *only* difference between $(a,b)$ and $[a,b]$.
ANSWER: $A \cap B = (2, 3)$; $A \cup B = [2, 3]$; $B \setminus A = \{2, 3\}$ (not an interval).

## COMPETENCY_QUESTION_1
QUESTION: A startup offers a subscription plan: "Pay ₹500/month for the first year, then ₹600/month thereafter." A user joins on 15th March 2024. Let $t$ be the number of months since joining (real-valued, $t=0$ at joining instant). The monthly fee $f(t)$ is constant on intervals. Write the intervals (in interval notation) for: (i) $f(t) = 500$, (ii) $f(t) = 600$. Assume the fee changes *exactly* at the 1-year mark. Justify your bracket choices at the boundary $t=12$.
COMPETENCY: Mathematical Modeling & Translation (Real-world to Interval Notation)
STEPS:
- Step 1: Identify the boundary. 1 year = 12 months. Fee changes *at* $t=12$.
- Step 2: Interpret "first year". Does it include month 12? "First year" typically means $0 \le t < 12$ (up to but not including the 12th month mark). At $t=12$, the "thereafter" rate applies.
- Step 3: Write interval for ₹500. $0 \le t < 12 \implies [0, 12)$. Square bracket at 0 (joining instant included), round at 12 (excluded).
- Step 4: Write interval for ₹600. $t \ge 12 \implies [12, \infty)$. Square bracket at 12 (included, new rate starts exactly at 12 months).
- Step 5: Verify coverage and disjointness. $[0, 12) \cup [12, \infty) = [0, \infty)$ (all $t \ge 0$ covered). Intersection = $\emptyset$ (no overlap).
ANSWER: (i) $f(t)=500$ for $t \in [0, 12)$. (ii) $f(t)=600$ for $t \in [12, \infty)$. At $t=12$, the fee is ₹600 (square bracket in second interval).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let $I_1 = [a, b]$, $I_2 = (a, b)$, $I_3 = [a, b)$, $I_4 = (a, b]$ where $a, b \in \mathbb{R}, a < b$. Consider the statement: "For any real number $x$, if $x \in I_1$ and $x \notin I_2$, then $x \in I_3 \cap I_4$." Is this statement **True** or **False**? Prove your answer by analyzing the logical structure and the endpoints.
COMPETENCY: Logical Reasoning & Set Theory (Analyzing Quantified Statements over Intervals)
STEPS:
- Step 1: Understand the hypothesis: $x \in I_1 = [a,b]$ AND $x \notin I_2 = (a,b)$.
- Step 2: $x \in [a,b] \implies a \le x \le b$. $x \notin (a,b) \implies \text{NOT}(a < x < b) \implies x \le a \text{ OR } x \ge b$.
- Step 3: Combine (AND): $(a \le x \le b) \text{ AND } (x \le a \text{ OR } x \ge b)$.
- Step 4: Distribute: $(a \le x \le b \text{ AND } x \le a) \text{ OR } (a \le x \le b \text{ AND } x \ge b)$.
- Step 5: Simplify each part. First part: $x \le a$ and $x \ge a \implies x = a$. Second part: $x \ge b$ and $x \le b \implies x = b$.
- Step 6: Conclusion: The hypothesis is true **only for** $x = a$ or $x = b$.
- Step 7: Check the conclusion: $x \in I_3 \cap I_4$. $I_3 = [a,b) = \{x : a \le x < b\}$. $I_4 = (a,b] = \{x : a < x \le b\}$. Intersection $I_3 \cap I_4 = \{x : a \le x < b \text{ AND } a < x \le b\} = \{x : a < x < b\} = (a, b)$.
- Step 8: Test endpoints. For $x=a$: $a \in I_3$? Yes ($a \le a < b$). $a \in I_4$? No ($a < a$ is false). So $a \notin I_3 \cap I_4$. Similarly $b \notin I_3 \cap I_4$.
- Step 9: The hypothesis holds for $x=a,b$, but the conclusion $x \in (a,b)$ is **false** for $x=a,b$.
ANSWER: **False**. Counterexample: $x = a$ (or $x = b$). Then $x \in I_1$, $x \notin I_2$, but $x \notin I_3 \cap I_4$ (since $I_3 \cap I_4 = (a,b)$ excludes endpoints).
DIFFICULTY: hard