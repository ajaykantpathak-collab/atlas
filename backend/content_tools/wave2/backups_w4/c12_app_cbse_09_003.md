## ELI5
A grandmother endows a village scholarship forever. The mathematics is an endless geometric series whose sum collapses, by the standard formula, to payment divided by rate — provided the rate's period matches the payment's. Payments at the beginning of each year add one immediate payment to the price. And a perpetuity has no future value to speak of: time never ends, so only today's price exists.

## DEFINITION
A perpetuity is an annuity in which equal periodic payments continue indefinitely. The present value of a perpetuity is the finite lump sum required today to generate those endless payments at a given interest rate per period.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must correctly identify whether payments occur at the end (ordinary perpetuity) or beginning (perpetuity due) of each period, select the appropriate formula ($P = R/i$ or $P = R + R/i$), convert the annual nominal rate to the periodic rate matching the payment frequency, and compute the present value accurately for board and competitive exam problems.

## SCOPE_BOUNDARY
This node covers the definition, derivation, and calculation of Present Value for Ordinary Perpetuity (end-of-period payments) and Perpetuity Due (beginning-of-period payments), including finding the payment $R$ or rate $i$ given the present value. It does NOT cover Sinking Funds, Bond Valuation, EMI, or Depreciation — those are separate nodes.

## WALKTHROUGH
Start with a relatable scenario: "Your grandmother wants to set up a scholarship of ₹5,000 per year forever for students in your village school. The bank offers 5% p.a. compounded annually. How much must she deposit today?" Guide the student to recognize this as an infinite series of payments. Show that the present value is the sum of an infinite geometric progression: $P = \frac{R}{1+i} + \frac{R}{(1+i)^2} + \dots$ Derive $P = R/i$ step-by-step using the GP sum formula $S_\infty = a/(1-r)$. Then contrast with payments at the *beginning* of each year (Perpetuity Due), where the first payment happens immediately, leading to $P = R + R/i$. Emphasize the critical step: **match the interest rate period to the payment period** (e.g., semi-annual payments $\rightarrow$ semi-annual rate). The key insight: perpetuities have no future value, only present value, because time is infinite.

Takeaway: mastery means the series derived, the due-case adjusted, and the period matching never skipped. Exam moves: derivation questions run the geometric progression to payment-over-rate step by step; adjustment questions add the immediate payment for due variants; conversion questions halve the rate for half-yearly payments before dividing. Method: derive once, then trust the collapse — but only after the periods agree. Drill: one grandmother, one derived sum, one semi-annual variant. A perpetuity's future value is a philosophical question; its present value is a division.

## DIAGNOSTIC_QUESTION_1
What is the formula for the present value of an ordinary perpetuity (payments at the end of each period) with periodic payment $R$ and interest rate per period $i$? State the formula and the condition for its validity.

## DIAGNOSTIC_ANSWER_1
The formula is $P = \frac{R}{i}$, valid only when $|1+i| > 1$ (i.e., $i > 0$), ensuring the infinite geometric series converges. A wrong answer like $P = R \times i$ or $P = \frac{R}{1+i}$ reveals the student has memorized the formula without understanding the GP derivation or the convergence condition. They may also confuse it with the present value of an annuity due or a finite annuity.

## DIAGNOSTIC_QUESTION_2
A perpetuity pays ₹1,000 at the end of every 6 months. The annual nominal interest rate is 8% compounded semi-annually. A student calculates the present value as $P = \frac{1000}{0.08} = 12,500$. Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student's answer is **incorrect**. The payment is semi-annual, so the interest rate per period must be the semi-annual rate: $i = \frac{8\%}{2} = 4\% = 0.04$. The correct present value is $P = \frac{1000}{0.04} = 25,000$. Using the annual rate 0.08 instead of the periodic rate 0.04 is the most frequent error in board exams. It reveals the student does not consistently match the compounding period to the payment period — a critical skill for JEE/NEET financial mathematics.

## DIAGNOSTIC_QUESTION_3
Find the present value of a perpetuity of ₹2,000 payable at the **beginning** of each year, if money is worth 6% per annum compounded annually.

## DIAGNOSTIC_ANSWER_3
This is a **Perpetuity Due**. The first payment of ₹2,000 is made immediately (present value = ₹2,000), followed by an ordinary perpetuity of ₹2,000 at the end of each year.
$P = R + \frac{R}{i} = 2000 + \frac{2000}{0.06} = 2000 + 33,333.33 = \textbf{₹35,333.33}$.
A wrong answer of ₹33,333.33 (using $P = R/i$) shows the student treats it as an ordinary perpetuity, ignoring the "beginning of period" wording. This distinction is explicitly tested in CBSE board papers (e.g., Exercise 7.1, Q4).

## DIAGNOSTIC_QUESTION_4
The present value of a perpetuity immediate (payments at end of period) is ₹50,000. The periodic payment is ₹2,500. The student claims the interest rate per period is 20% because $50,000 \times 0.20 = 10,000 \neq 2,500$. Analyze the student's error and find the correct rate.

## DIAGNOSTIC_ANSWER_4
The student incorrectly multiplied $P \times i$ instead of using the relationship $R = P \times i$ (rearranged from $P = R/i$). The correct formula gives $i = \frac{R}{P} = \frac{2500}{50000} = 0.05 = \textbf{5\%}$. The error reveals a fundamental algebraic manipulation weakness: the student cannot rearrange $P = R/i$ to solve for $i$. In competitive exams, this appears as "Find the yield rate" questions (NCERT Example 3, Exercise 7.1 Q3). Mastery requires fluency in solving for any of the three variables ($P, R, i$).

## DIAGNOSTIC_QUESTION_5
Evaluate this statement: "The future value (amount) of a perpetuity can be calculated using the formula $A = P(1+i)^n$ by letting $n \to \infty$." Justify your answer.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. As $n \to \infty$, $(1+i)^n \to \infty$ for any $i > 0$, so the future value grows without bound (is undefined/infinite). The NCERT explicitly states: "Amount of a perpetuity is undefined since it increases beyond all bounds as time goes on." A student who agrees with the statement confuses the *limit of a formula* with a *meaningful financial quantity*. This misconception leads to attempting to calculate "maturity value" of perpetuities in exams — a guaranteed zero-mark error.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where a Perpetuity Due (payments at beginning of period) is more appropriate than an Ordinary Perpetuity. Define all variables ($R, i, P$) and compute $P$.

## DIAGNOSTIC_ANSWER_6
**Scenario**: A trust wants to fund an annual poetry festival. The first festival happens **today** (inauguration), and subsequent festivals occur at the start of every year forever. Each festival costs ₹1,00,000. The trust earns 7% p.a. on its corpus.
- $R = 1,00,000$ (payment at beginning of each year)
- $i = 0.07$ (annual effective rate)
- $P = R + \frac{R}{i} = 1,00,000 + \frac{1,00,000}{0.07} = 1,00,000 + 14,28,571.43 = \textbf{₹15,28,571.43}$
A poor answer uses $P = R/i$ (ordinary perpetuity), giving ₹14,28,571.43, which would fall short by ₹1,00,000 for the immediate first festival. This tests whether the student can *model* the timing of cash flows, not just plug into a formula.

## COMMON_MISCONCEPTION
**"The formula $P = R/i$ works for all perpetuities regardless of when the first payment is made."** Students see $P = R/i$ in the textbook and apply it blindly. They miss that NCERT derives this for payments *at the end* of the period (Example 1, 2, 3, 5). When the first payment is *at the beginning* (Example 4, Exercise 7.1 Q4), the present value is $R + R/i$. The error stems from not visualizing the timeline: "End of period 1" vs "Time 0 (beginning of period 1)". In board exams, this confusion costs 2-3 marks per question. In JEE, it appears as a trap option in MCQs.

## ON_FAILURE
If the student confuses Ordinary Perpetuity vs Perpetuity Due:
1. **Draw a timeline**: Mark "Time 0" (today), "End of Year 1", "End of Year 2", ... Place the first payment at the correct point.
2. **Re-derive**: For Ordinary: $P = \frac{R}{1+i} + \frac{R}{(1+i)^2} + \dots = \frac{R}{i}$. For Due: $P = R + \frac{R}{1+i} + \frac{R}{(1+i)^2} + \dots = R + \frac{R}{i}$.
3. **Re-do NCERT Examples 1 & 4 side-by-side**: Example 1 (end) → $P = 3000$; Example 4 (beginning) → $P = 85,833.33$. Note the extra $R$ in Example 4.
4. **Diagnostic re-check**: Ask the student to solve Exercise 7.1 Q4 (beginning) and Q1 (end) without looking at formulas. If they get both right, the misconception is resolved.

## PREREQUISITE_NODE_IDS
c11_app_cbse_05_008, c11_app_cbse_05_009, c11_app_cbse_05_010, c11_app_cbse_01_007, c11_app_cbse_01_008

## PREREQUISITE_REASONS
c11_app_cbse_05_008: Geometric Progression (GP) definition and general term — required to recognize the perpetuity present value as an infinite GP.
c11_app_cbse_05_009: General term of a GP — needed to identify first term $a = R(1+i)^{-1}$ and common ratio $r = (1+i)^{-1}$.
c11_app_cbse_05_010: Sum of infinite GP $S_\infty = a/(1-r)$ for $|r|<1$ — the core derivation of $P = R/i$.
c11_app_cbse_01_007: Logarithms — used when solving for $n$ in related compound interest problems (though not directly in perpetuity, it's a Class 11 financial math tool).
c11_app_cbse_01_008: Laws of Logarithms — supports solving exponential equations in advanced perpetuity variants (e.g., finding time to reach a certain PV threshold).

## FORWARD_NODE_IDS
c12_app_cbse_09_004, c12_app_cbse_09_009

## FORWARD_REASONS
c12_app_cbse_09_004: Sinking Fund — uses the *future value of annuity* concept, which is the dual of present value of perpetuity; both rely on GP sums and periodic rate conversion.
c12_app_cbse_09_009: Stock, shares and Debentures — bond valuation (node 09_009) discounts coupon payments (an annuity) and redemption value; perpetuity is the limiting case of an annuity as $n \to \infty$, used in consol bond valuation.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_006, c11_app_cbse_08_007

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_006: Limit of a function — the infinite GP sum $S_\infty = \lim_{n \to \infty} S_n$ is a direct application of limits; understanding convergence ($|r|<1$) requires the limit concept.
c11_app_cbse_08_007: Continuity of a function — the present value function $P(i) = R/i$ is continuous for $i>0$; this underpins sensitivity analysis (duration/convexity) in higher finance.

## CHAIN_DESCRIPTION
c11_app_cbse_05_010 -> c12_app_cbse_09_003 -> c12_app_cbse_09_004

## THIS_FORMULA
Present Value of Ordinary Perpetuity: $P = \frac{R}{i}$; Present Value of Perpetuity Due: $P = R + \frac{R}{i} = R\left(1 + \frac{1}{i}\right)$

## FORMULA_VARIABLES
- $P$: Present Value (lump sum needed today)
- $R$: Periodic payment (constant amount per period)
- $i$: Interest rate **per period** (decimal form, e.g., 6% = 0.06)
- **Condition**: $i > 0$ (ensures convergence of infinite GP)

## FORMULA_UNITS
- $P, R$: Currency units (₹, $, etc.)
- $i$: Dimensionless (rate per period, e.g., 0.04 per quarter)
- Time unit: Implicit in $i$ and payment frequency (must match)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_08_006 | The infinite sum of a GP is defined as the limit of partial sums: $\lim_{n \to \infty} \frac{a(1-r^n)}{1-r} = \frac{a}{1-r}$ for $|r|<1$. This limit concept from Class 11 Calculus is the rigorous foundation of the perpetuity formula.
c11_app_cbse_08_008 | Instantaneous rate of change (derivative) — In advanced finance (beyond Class 12), the derivative of bond price w.r.t. yield (duration) uses the perpetuity formula as a building block. The Class 11 derivative concept prepares for this sensitivity analysis.

## PREREQ_CONCEPT
Sum of an infinite geometric progression (GP) with $|r| < 1$.

## PREREQ_BEFORE
The student must be able to: (1) Identify a GP and write its first term $a$ and common ratio $r$; (2) State the convergence condition $|r| < 1$; (3) Apply $S_\infty = a/(1-r)$; (4) Convert annual nominal rate to periodic rate (e.g., 8% p.a. compounded quarterly → $i = 0.02$ per quarter).

## PREREQ_STUCK
If stuck, review **Class 11 Geometric Progression (c11_app_cbse_05_008, 05_009, 05_010)** — specifically the derivation of $S_\infty = a/(1-r)$ and practice identifying $a$ and $r$ in financial series like $R(1+i)^{-1} + R(1+i)^{-2} + \dots$

## WORKED_EXAMPLE_1
PROBLEM: A charitable trust wants to award a scholarship of ₹12,000 at the end of every year forever. The bank offers 5% p.a. compounded annually. How much must the trust deposit today?
STEPS:
- Step 1: Identify given: $R = 12,000$ (end of year), $i = 5\% = 0.05$ per year. Payment frequency = compounding frequency = annual → rates match.
- Step 2: Recognize this as an **Ordinary Perpetuity** (first payment at end of year 1). Formula: $P = \frac{R}{i}$.
- Step 3: Substitute values: $P = \frac{12000}{0.05}$.
- Step 4: Compute: $P = 2,40,000$.
- Step 5: Verify: Interest earned in year 1 = $2,40,000 \times 0.05 = 12,000$ = scholarship amount. Corpus remains intact. Repeats forever.
REASONING: The deposited principal generates exactly enough interest each period to fund the payment, leaving the principal untouched. This is the essence of a perpetuity — the present value is the capital that yields $R$ as interest every period at rate $i$.
ANSWER: ₹2,40,000 must be deposited today.

## WORKED_EXAMPLE_2
PROBLEM: Find the present value of a perpetuity of ₹500 payable at the **beginning** of each quarter, if money is worth 8% p.a. compounded quarterly.
STEPS:
- Step 1: Identify given: $R = 500$, payments at **beginning** of quarter → Perpetuity Due. Annual nominal rate = 8%, compounded quarterly.
- Step 2: Convert to periodic rate: $i = \frac{8\%}{4} = 2\% = 0.02$ per quarter. (Critical step: match period!)
- Step 3: Use Perpetuity Due formula: $P = R + \frac{R}{i}$.
- Step 4: Substitute: $P = 500 + \frac{500}{0.02} = 500 + 25,000 = 25,500$.
- Step 5: Interpret: ₹500 paid immediately, then ₹25,000 funds the ordinary perpetuity of ₹500/quarter starting end of quarter 1. Total corpus = ₹25,500.
REASONING: The first payment occurs at time 0 (present), so its present value is exactly $R$. The remaining payments form an ordinary perpetuity starting one period later, with PV $R/i$. The sum is $R + R/i$. Using $i=0.08$ (annual) instead of $0.02$ (quarterly) would give a wildly wrong answer (₹6,750).
ANSWER: ₹25,500

## WORKED_EXAMPLE_3
PROBLEM: The present value of a perpetuity immediate is ₹1,80,000. The annual payment is ₹9,000, made at the end of each year. Find the annual effective interest rate. If the same perpetuity were payable at the beginning of each year, what would be its present value at this rate?
STEPS:
- Step 1: Ordinary perpetuity given: $P = 1,80,000$, $R = 9,000$, find $i$. Formula: $P = \frac{R}{i} \implies i = \frac{R}{P}$.
- Step 2: Compute $i = \frac{9000}{180000} = 0.05 = 5\%$ p.a. effective.
- Step 3: Now for Perpetuity Due at same rate: $R = 9,000$, $i = 0.05$. Formula: $P_{\text{due}} = R + \frac{R}{i}$.
- Step 4: Compute $P_{\text{due}} = 9000 + \frac{9000}{0.05} = 9000 + 1,80,000 = 1,89,000$.
- Step 5: Compare: $P_{\text{due}} = P_{\text{immediate}} + R = 1,80,000 + 9,000 = 1,89,000$. The difference is exactly the immediate first payment.
- Step 6: Check consistency: At 5%, ₹1,89,000 earns ₹9,450 interest in year 1. Pay ₹9,000 at time 0, leaving ₹1,80,000. Next year interest = ₹9,000, pays ₹9,000 at beginning of year 2, etc. Works perfectly.
REASONING: This problem tests bidirectional fluency: (a) solving for $i$ given $P$ and $R$ (common in "find the yield" questions), and (b) switching between ordinary and due perpetuities at the same rate. The relationship $P_{\text{due}} = P_{\text{immediate}}(1+i) = P_{\text{immediate}} + R$ is a powerful shortcut.
ANSWER: Annual effective rate = 5%; PV of Perpetuity Due = ₹1,89,000.

## COMPETENCY_QUESTION_1
QUESTION: A university wants to establish a permanent research chair. The annual cost is ₹15,00,000, payable at the beginning of each year. The university's endowment fund earns 6% p.a. compounded annually. However, the first payment will be made **3 years from today** (i.e., the perpetuity is deferred by 2 years). Calculate the amount the university must deposit today.
COMPETENCY: Problem Solving & Modeling (deferred perpetuity due)
STEPS:
- Step 1: Recognize this as a **Deferred Perpetuity Due**. Payments of ₹15,00,000 start at beginning of year 3 (i.e., time $t=2$ years from now).
- Step 2: First, find the present value of the perpetuity due **at the time the payments begin** (time $t=2$). $P_2 = R + \frac{R}{i} = 15,00,000 + \frac{15,00,000}{0.06} = 15,00,000 + 2,50,00,000 = 2,65,00,000$.
- Step 3: Now discount $P_2$ back to today ($t=0$) for 2 years at 6%: $P_0 = \frac{P_2}{(1+i)^2} = \frac{2,65,00,000}{(1.06)^2}$.
- Step 4: Compute $(1.06)^2 = 1.1236$. $P_0 = \frac{2,65,00,000}{1.1236} \approx 2,35,84,907.44$.
- Step 5: Verify: Deposit ₹2,35,84,907.44 today. After 2 years: $2,35,84,907.44 \times (1.06)^2 = 2,65,00,000$. At $t=2$, pay ₹15,00,000 immediately → balance ₹2,50,00,000. Year 3 interest = ₹15,00,000, pays at beginning of year 4, etc. Sustainable forever.
ANSWER: ₹2,35,84,907.44 (approx ₹2.36 crore)
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A company issues a **consol bond** (perpetual bond) with a face value of ₹1,000 and a coupon rate of 8% p.a., payable semi-annually. The current market yield for similar risk bonds is 10% p.a. compounded semi-annually. What is the fair market price of this bond today? (This is a JEE-style application of perpetuity in bond valuation.)
COMPETENCY: Application to Financial Markets (Bond Valuation - Consol/Perpetual Bond)
STEPS:
- Step 1: Identify cash flows: Coupon payment $R = \text{Face Value} \times \text{Coupon Rate per Period}$. Face Value $F = 1,000$. Annual coupon rate = 8%, paid semi-annually → periodic coupon rate = 4%. $R = 1000 \times 0.04 = ₹40$ per half-year.
- Step 2: Payments are at end of each half-year (standard bond convention) → **Ordinary Perpetuity**.
- Step 3: Market yield = 10% p.a. compounded semi-annually → periodic discount rate $i = \frac{10\%}{2} = 5\% = 0.05$ per half-year.
- Step 4: Price of consol bond = Present Value of perpetual coupons = $\frac{R}{i} = \frac{40}{0.05} = ₹800$.
- Step 5: Interpret: Since coupon rate (8%) < market yield (10%), bond sells at a **discount** (₹800 < ₹1,000 face value). This matches the bond pricing principle: $YTM > \text{Coupon Rate} \implies \text{Price} < \text{Face Value}$.
ANSWER: ₹800
DIFFICULTY: hard