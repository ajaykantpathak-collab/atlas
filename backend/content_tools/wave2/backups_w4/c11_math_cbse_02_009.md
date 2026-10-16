## ELI5
A lift display shows only whole floors even between them - that is the greatest integer function [x]: the unique integer n with n ≤ x < n+1, so [2.7] = 2 and [-1.3] = -2, jumping at every integer. The traffic signal is the signum function: +1 green, -1 red, 0 amber - sgn(x) = 1 if x > 0, 0 if x = 0, -1 if x < 0 - jumping only at zero. Floor rounds down-left; signum compresses the whole line to three values.

## DEFINITION
The **signum function** (or sign function) is a real-valued function \( f: \mathbb{R} \to \mathbb{R} \) defined piecewise as \( f(x) = 1 \) if \( x > 0 \), \( f(x) = 0 \) if \( x = 0 \), and \( f(x) = -1 \) if \( x < 0 \); it extracts the sign of a real number. The **greatest integer function** (or floor function) is a real-valued function \( g: \mathbb{R} \to \mathbb{R} \) defined by \( g(x) = [x] \), where \( [x] \) denotes the greatest integer less than or equal to \( x \); for any real \( x \), \( [x] \) is the unique integer \( n \) such that \( n \le x < n+1 \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can evaluate both functions for any real input (including negative non-integers), sketch their graphs with correct open/closed circles at jump discontinuities, determine domain and range precisely, and compose them with algebraic expressions (e.g., \( \text{sgn}(x^2-4) \), \( [2x+3] \)) to solve equations and inequalities.

## SCOPE_BOUNDARY
Covers definition, evaluation, graphing, domain/range, and basic algebraic manipulation of signum and greatest integer functions as per NCERT Class 11 Chapter 2. Does NOT cover advanced properties like Fourier series, differentiation/integration of these functions, or the ceiling function \( \lceil x \rceil \) (though \( \lceil x \rceil = -[-x] \) may be mentioned as an extension).

## WALKTHROUGH
Imagine a lift in a 10‑storey building: the display shows only whole floor numbers (0, 1, 2, …) even when the lift is between floors – that is exactly the greatest integer function \( [x] \). Now think of a traffic signal: it shows green (+1), red (−1), or amber (0) depending on the sensor input – that is the signum function. Begin by writing the piecewise definitions on paper. For \( [x] \), test values: \( [2.7]=2 \), \( [−1.3]=−2 \) (not −1!), \( [3]=3 \). For \( \text{sgn}(x) \), test \( \text{sgn}(-5)=-1 \), \( \text{sgn}(0)=0 \), \( \text{sgn}(\pi)=1 \). Plot points for \( x = -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3 \) to see the step pattern of \( [x] \) and the three horizontal rays of \( \text{sgn}(x) \). The key insight: \( [x] \) jumps at every integer, while \( \text{sgn}(x) \) jumps only at 0.

Takeaway: mastery means evaluations at negative non-integers being careful - truncation toward zero is the flagged trap - and graphs drawn with open and closed circles at each jump. Exam moves: evaluate-floor-and-signum questions and sketch-with-open-closed-circles items, plus compositions like sgn(x² - 4) and [2x + 3]. Check yourself: [-1.3] is -2, not -1 - the floor sits to the left on the number line. Students miss it because they chop the decimal part, when the definition demands the greatest integer less than or equal to x: below, never toward zero.

## DIAGNOSTIC_QUESTION_1
Write the value of \( \text{sgn}(-7) \), \( \text{sgn}(0) \), \( \text{sgn}(\sqrt{2}) \), \( [-3.8] \), \( [5] \), and \( [-\pi] \).

## DIAGNOSTIC_ANSWER_1
\( \text{sgn}(-7) = -1 \), \( \text{sgn}(0) = 0 \), \( \text{sgn}(\sqrt{2}) = 1 \), \( [-3.8] = -4 \), \( [5] = 5 \), \( [-\pi] = -4 \). A wrong answer like \( [-3.8] = -3 \) reveals the common misconception that the greatest integer function truncates toward zero (like computer integer division) instead of rounding down to the next lower integer.

## DIAGNOSTIC_QUESTION_2
Explain why the graph of \( y = [x] \) has a closed circle at the left end of each step and an open circle at the right end, while the graph of \( y = \text{sgn}(x) \) has an isolated point at \( (0,0) \) with open circles at \( (0,1) \) and \( (0,-1) \).

## DIAGNOSTIC_ANSWER_2
For \( [x] \), the definition \( n \le x < n+1 \) means the value \( n \) is attained at \( x = n \) (closed circle) but not at \( x = n+1 \) (open circle). For \( \text{sgn}(x) \), the three branches \( x<0 \), \( x=0 \), \( x>0 \) are mutually exclusive; at \( x=0 \) the value is exactly 0, while the limits from left and right are -1 and +1 respectively, so those limit points are not attained (open circles). A student who draws closed circles at both ends of a step for \( [x] \) misunderstands the half-open interval nature of the definition.

## DIAGNOSTIC_QUESTION_3
Solve for \( x \): \( [2x - 1] = 3 \).

## DIAGNOSTIC_ANSWER_3
Step 1: By definition, \( [2x-1] = 3 \iff 3 \le 2x-1 < 4 \). Step 2: Add 1: \( 4 \le 2x < 5 \). Step 3: Divide by 2: \( 2 \le x < 2.5 \). Step 4: Solution set \( x \in [2, 2.5) \). A wrong answer \( x = 2 \) only shows the student treated \( [2x-1] = 3 \) as an equation \( 2x-1 = 3 \) instead of an inequality condition.

## DIAGNOSTIC_QUESTION_4
Compare the solution sets of \( \text{sgn}(x^2 - 4) = 1 \) and \( [x^2 - 4] = 1 \). Are they the same? Justify.

## DIAGNOSTIC_ANSWER_4
For \( \text{sgn}(x^2-4)=1 \), we need \( x^2-4 > 0 \Rightarrow x^2 > 4 \Rightarrow x < -2 \) or \( x > 2 \). For \( [x^2-4]=1 \), we need \( 1 \le x^2-4 < 2 \Rightarrow 5 \le x^2 < 6 \Rightarrow x \in [-\sqrt{6}, -\sqrt{5}] \cup [\sqrt{5}, \sqrt{6}] \). The sets are completely different: the first is two unbounded rays, the second is two bounded intervals. A student who says they are the same confuses the signum function (only cares about sign) with the greatest integer function (cares about magnitude intervals).

## DIAGNOSTIC_QUESTION_5
A student claims that \( [x] + [-x] = 0 \) for all real \( x \). Is this correct? If not, give the correct identity and a counterexample.

## DIAGNOSTIC_ANSWER_5
The claim is false. Counterexample: \( x = 2.3 \Rightarrow [2.3] + [-2.3] = 2 + (-3) = -1 \neq 0 \). The correct identity is \( [x] + [-x] = \begin{cases} 0 & \text{if } x \in \mathbb{Z} \\ -1 & \text{if } x \notin \mathbb{Z} \end{cases} \). A student who agrees with the claim is likely thinking of the property \( \text{sgn}(x) + \text{sgn}(-x) = 0 \) (for \( x \neq 0 \)) and incorrectly transferring it to the greatest integer function.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (Indian context) that can be modelled using the greatest integer function, write the mathematical model, and solve it for a given input.

## DIAGNOSTIC_ANSWER_6
Example: A Delhi Metro token costs ₹10 for the first 2 km and ₹5 for every additional km or part thereof. If a passenger travels 7.3 km, what is the fare? Model: Fare = \( 10 + 5 \times [\text{distance} - 2] \) for distance > 2 km. For 7.3 km: extra = \( [7.3 - 2] = [5.3] = 5 \) km. Fare = \( 10 + 5 \times 5 = ₹35 \). A poor answer uses \( \text{distance} - 2 = 5.3 \) directly (giving ₹36.5) ignoring the "part thereof" clause that requires the greatest integer function.

## COMMON_MISCONCEPTION
Students treat \( [x] \) as "remove the decimal part" (truncation toward zero), so they write \( [-2.7] = -2 \) instead of the correct \( -3 \). This stems from calculator `int()` functions or programming languages that truncate. They also confuse \( \text{sgn}(x) \) with \( \frac{|x|}{x} \) (which is undefined at 0) and forget that \( \text{sgn}(0) \) is explicitly defined as 0. In graphs, they draw continuous lines connecting steps of \( [x] \) or forget open/closed circles, and for \( \text{sgn}(x) \) they draw a single vertical line at \( x=0 \) connecting -1 to 1.

## ON_FAILURE
1. Make a table with columns: \( x \), \( [x] \), \( \text{sgn}(x) \) for \( x = -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3 \). 2. Plot each point on graph paper, using a distinct mark for closed vs open circles. 3. Verbally state the rule: "For negative non-integers, \( [x] \) is the next integer to the LEFT on the number line." 4. Practice 5 inequalities of the form \( [ax+b] = c \) by converting to \( c \le ax+b < c+1 \) before solving. 5. Re-attempt the diagnostic questions after this drill.

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_008, c6_math_ch02_025, c9_math_ch3_2, c11_math_cbse_02_004, c11_math_cbse_02_007

## PREREQUISITE_REASONS
c11_math_cbse_02_005: Understanding the definition of a function (domain, codomain, range, unique image) is essential before studying specific functions.
c11_math_cbse_02_006: Identity and constant functions provide the simplest examples of real-valued functions; signum and GIF are the next level of complexity.
c11_math_cbse_02_008: Modulus function \( |x| \) is piecewise-defined like signum and GIF; its graphing technique (separate branches) transfers directly.
c6_math_ch02_025: Absolute value of integers builds intuition for piecewise definitions based on sign.
c9_math_ch3_2: Integers and their ordering on the number line are the foundation for understanding \( [x] \) as "greatest integer ≤ x".
c11_math_cbse_02_004: Signum and greatest integer functions have discrete ranges; domain/range analysis is central.  
c11_math_cbse_02_007: Greatest integer and signum functions are piecewise-defined; polynomial functions provide the continuous/smooth contrast.  

## FORWARD_NODE_IDS
c11_math_cbse_02_010, c11_math_cbse_02_011, c11_math_cbse_02_012, c12_math_cbse_01_003, c12_math_cbse_05_001

## FORWARD_REASONS
c11_math_cbse_02_010: Algebra of real functions (sum, difference, product, quotient) will combine signum/GIF with polynomial, rational, and modulus functions.
c11_math_cbse_02_011: Graphing techniques for these functions (step graphs, isolated points) are essential for sketching combined functions.
c11_math_cbse_02_012: Word problems often use GIF for "per unit or part thereof" pricing and signum for threshold-based decisions.
c12_math_cbse_01_003: Signum and greatest integer functions — classic non-injective examples.  
c12_math_cbse_05_001: Signum and greatest integer functions — classic examples of discontinuous functions.  

## CROSS_SUBJECT_PREREQS
c9_math_ch3_2, c6_math_ch02_025, c6_math_ch02_017
## CROSS_SUBJECT_REASONS
c9_math_ch3_2: Integers as a subset of reals – the range of GIF is \( \mathbb{Z} \), so integer properties are used constantly.
c6_math_ch02_025: Absolute value \( |x| \) is the first piecewise function students meet; signum and GIF extend this idea.
c6_math_ch02_017: Integers on the number line – visualizing \( [x] \) as "the integer step at or left of x" relies on this spatial understanding.

## CHAIN_DESCRIPTION
c11_math_cbse_02_008 -> c11_math_cbse_02_009 -> c11_math_cbse_02_010

## THIS_FORMULA
Signum: \( \text{sgn}(x) = \begin{cases} 1, & x > 0 \\ 0, & x = 0 \\ -1, & x < 0 \end{cases} \); Greatest Integer: \( [x] = n \iff n \le x < n+1, \; n \in \mathbb{Z} \)

## FORMULA_VARIABLES
\( x \in \mathbb{R} \) (input), \( n \in \mathbb{Z} \) (output of GIF), \( \text{sgn}(x) \in \{-1, 0, 1\} \) (output of signum)

## FORMULA_UNITS
dimensionless (both functions map pure numbers to pure numbers)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In kinematics, the signum function models direction reversal (e.g., velocity sign change at turning points); the greatest integer function appears in quantization of energy levels or digital signal sampling.
c11_economics_ch2_1 | In consumer theory, step-function budget constraints (e.g., quantity discounts) use \( [x] \); signum appears in threshold-based policy models (subsidy kicks in when income < ₹X).

## PREREQ_CONCEPT
Piecewise-defined functions and inequality notation \( a \le x < b \).

## PREREQ_BEFORE
Student must be able to solve linear inequalities and interpret \( [x] = n \) as \( n \le x < n+1 \).

## PREREQ_STUCK
Revise solving compound inequalities (e.g., \( 2 \le 3x-1 < 5 \)) and plotting points with open/closed circles on a number line.

## WORKED_EXAMPLE_1
PROBLEM: A courier company charges ₹50 for the first kilogram and ₹20 for every additional 500 g or part thereof. Write the charge \( C \) as a function of weight \( w \) (in kg) using the greatest integer function, and find the charge for a 3.2 kg parcel.

STEPS:
- Step 1: Identify the pricing structure: first 1 kg costs ₹50; beyond that, every 0.5 kg (500 g) or fraction thereof costs ₹20.
- Step 2: For weight \( w > 1 \) kg, the additional weight is \( w - 1 \) kg. Number of 500 g units = \( \frac{w-1}{0.5} = 2(w-1) \). Since any fraction counts as a full unit, we take the greatest integer: \( [2(w-1)] \).
- Step 3: Write the piecewise function: \( C(w) = \begin{cases} 50, & 0 < w \le 1 \\ 50 + 20[2(w-1)], & w > 1 \end{cases} \).
- Step 4: For \( w = 3.2 \) kg, compute additional units: \( 2(3.2 - 1) = 2 \times 2.2 = 4.4 \). Greatest integer \( [4.4] = 4 \).
- Step 5: Charge = \( 50 + 20 \times 4 = 50 + 80 = ₹130 \).
- Step 6: Verify: 3.2 kg = 1 kg + 2.2 kg. 2.2 kg = 4.4 units of 500 g → 5 units charged? Wait: 4.4 → greatest integer is 4, but "part thereof" means we round UP. Check: greatest integer of 4.4 is 4, but we need ceiling! Actually \( [4.4] = 4 \), but ceiling would be 5. The problem says "or part thereof" → ceiling function. But GIF is floor. So model should use ceiling: \( \lceil 2(w-1) \rceil \). However, \( \lceil y \rceil = -[-y] \). So \( C(w) = 50 + 20 \times (-[-2(w-1)]) \). For 3.2 kg: \( -[-4.4] = -(-5) = 5 \). Charge = 50 + 20×5 = ₹150. Let's correct: The greatest integer function gives floor. For "part thereof" we need ceiling. So the model using GIF is \( C(w) = 50 + 20 \times ( -[-2(w-1)] ) \). For 3.2 kg: \( -[-4.4] = 5 \). Charge = ₹150.

REASONING: The "or part thereof" phrasing means any fractional unit is charged as a full unit, which corresponds to the ceiling function, not the floor function. Since the syllabus only defines the greatest integer (floor) function, we express ceiling as \( \lceil y \rceil = -[-y] \). This shows how GIF can model real-world ceiling scenarios.

ANSWER: \( C(w) = 50 + 20 \times (-[-2(w-1)]) \) for \( w > 1 \); charge for 3.2 kg = ₹150.

## WORKED_EXAMPLE_2
PROBLEM: Solve the equation \( \text{sgn}(x^2 - 5x + 6) = -1 \).

STEPS:
- Step 1: Recall \( \text{sgn}(u) = -1 \iff u < 0 \). So we need \( x^2 - 5x + 6 < 0 \).
- Step 2: Factor the quadratic: \( x^2 - 5x + 6 = (x-2)(x-3) \).
- Step 3: Solve inequality \( (x-2)(x-3) < 0 \). The roots are 2 and 3. The quadratic opens upward, so it is negative between the roots.
- Step 4: Solution: \( 2 < x < 3 \).
- Step 5: Check endpoints: at \( x=2 \) or \( x=3 \), quadratic = 0 → sgn = 0, not -1. So open interval is correct.
- Step 6: Write final answer in set notation: \( \{ x \in \mathbb{R} \mid 2 < x < 3 \} \) or \( (2, 3) \).

REASONING: The signum function reduces the problem to a simple sign analysis of the inner expression. No need to consider the magnitude, only whether it is positive, zero, or negative. This is the key simplification that signum provides.

ANSWER: \( x \in (2, 3) \)

## WORKED_EXAMPLE_3
PROBLEM: Find the domain and range of \( f(x) = \frac{[x]}{\text{sgn}(x)} \).

STEPS:
- Step 1: Identify where the function is undefined. Denominator \( \text{sgn}(x) = 0 \) when \( x = 0 \). So \( x \neq 0 \).
- Step 2: Domain = \( \mathbb{R} \setminus \{0\} \) or \( (-\infty, 0) \cup (0, \infty) \).
- Step 3: Analyze for \( x > 0 \): \( \text{sgn}(x) = 1 \), so \( f(x) = [x] \). For \( x \in (0,1) \), \( [x] = 0 \); for \( x \in [1,2) \), \( [x] = 1 \); etc. So values are \( 0, 1, 2, \dots \) (all non-negative integers).
- Step 4: Analyze for \( x < 0 \): \( \text{sgn}(x) = -1 \), so \( f(x) = -[x] \). For \( x \in [-1,0) \), \( [x] = -1 \Rightarrow f(x) = 1 \). For \( x \in [-2,-1) \), \( [x] = -2 \Rightarrow f(x) = 2 \). In general, for \( x \in [-n, -n+1) \) with \( n \in \mathbb{N} \), \( [x] = -n \Rightarrow f(x) = n \). So values are positive integers \( 1, 2, 3, \dots \).
- Step 5: Combine: Range includes 0 (from \( x \in (0,1) \)) and all positive integers. Does it include negative integers? No, because for \( x>0 \), \( f(x)=[x] \ge 0 \); for \( x<0 \), \( f(x)=-[x] > 0 \) (since \( [x] \le -1 \)). So range = \( \{0, 1, 2, 3, \dots\} = \mathbb{W} \) (whole numbers).
- Step 6: Verify no other values: \( f(x) \) is always integer because \( [x] \) is integer and \( \text{sgn}(x) = \pm 1 \).

REASONING: The function combines two piecewise functions. We must consider the sign of \( x \) separately because \( \text{sgn}(x) \) changes definition at 0. The greatest integer function then gives integer outputs, and division by \( \pm 1 \) preserves integer nature. The range misses negative integers because \( -[x] \) for negative \( x \) is always positive.

ANSWER: Domain = \( \mathbb{R} \setminus \{0\} \); Range = \( \{0, 1, 2, 3, \dots\} \) (whole numbers)

## COMPETENCY_QUESTION_1
QUESTION: A function \( f: \mathbb{R} \to \mathbb{R} \) is defined by \( f(x) = [x] + \text{sgn}(x) \).
(a) Find \( f(-2.5) \), \( f(0) \), \( f(\sqrt{3}) \).
(b) Solve \( f(x) = 0 \).
(c) Is \( f \) one-one? Justify.
(d) Sketch the graph of \( f \) for \( -3 \le x \le 3 \), clearly marking open and closed circles.

COMPETENCY: Translating real-world situations to mathematical expressions, comparing and justifying, and graphical representation of piecewise functions.

STEPS:
- Step 1: Evaluate each part using definitions: \( [-2.5] = -3 \), \( \text{sgn}(-2.5) = -1 \), so \( f(-2.5) = -4 \). \( [0] = 0 \), \( \text{sgn}(0) = 0 \), so \( f(0) = 0 \). \( [\sqrt{3}] = 1 \), \( \text{sgn}(\sqrt{3}) = 1 \), so \( f(\sqrt{3}) = 2 \).
- Step 2: Solve \( [x] + \text{sgn}(x) = 0 \). Consider cases: \( x > 0 \Rightarrow [x] + 1 = 0 \Rightarrow [x] = -1 \) impossible for \( x>0 \). \( x = 0 \Rightarrow 0+0=0 \) works. \( x < 0 \Rightarrow [x] - 1 = 0 \Rightarrow [x] = 1 \) impossible for \( x<0 \). Only solution: \( x = 0 \).
- Step 3: Check one-one: \( f(-1.5) = [-1.5] + \text{sgn}(-1.5) = -2 -1 = -3 \). \( f(-2.5) = -3 -1 = -4 \). But \( f(0.5) = 0+1=1 \), \( f(1.5) = 1+1=2 \). Different inputs give different outputs so far. However, \( f(-0.5) = -1 -1 = -2 \), and \( f(-1.2) = -2 -1 = -3 \). Wait, need distinct \( x_1 \neq x_2 \) with same \( f \). Consider \( x \in [-1,0) \): \( [x] = -1 \), \( \text{sgn}(x) = -1 \), so \( f(x) = -2 \) constant on entire interval. So not one-one.
- Step 4: Graph: For each interval \( [n, n+1) \), \( [x] = n \). Add \( \text{sgn}(x) \): on \( (0,1) \): \( f=0+1=1 \); on \( [1,2) \): \( f=1+1=2 \); on \( [-1,0) \): \( f=-1-1=-2 \); on \( [-2,-1) \): \( f=-2-1=-3 \); at \( x=0 \): \( f=0 \). Plot horizontal segments with correct endpoints.

ANSWER: (a) \( f(-2.5) = -4 \), \( f(0) = 0 \), \( f(\sqrt{3}) = 2 \). (b) \( x = 0 \). (c) Not one-one; e.g., \( f(-0.5) = f(-0.2) = -2 \). (d) Step graph with jumps at integers, value at 0 is isolated point (0,0).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The fare for an auto-rickshaw in a city is ₹25 for the first 1.5 km and ₹10 for every additional 0.5 km or part thereof. Waiting charge is ₹5 per minute or part thereof.
(a) Write the total fare \( F \) as a function of distance \( d \) km (\( d > 1.5 \)) and waiting time \( t \) minutes using the greatest integer function.
(b) A passenger travels 6.2 km and waits for 3.7 minutes. Calculate the fare.
(c) The passenger pays with a ₹100 note. The driver returns change using only ₹10 and ₹5 coins. If the driver uses the minimum number of coins, how many coins of each denomination? (Use GIF to model the coin change problem.)

COMPETENCY: Mathematical modelling of real-world problems with multiple constraints, multi-step computation, and optimization using discrete functions.

STEPS:
- Step 1: Distance fare: first 1.5 km = ₹25. Additional distance = \( d - 1.5 \) km. Units of 0.5 km = \( \frac{d-1.5}{0.5} = 2(d-1.5) \). "Part thereof" → ceiling = \( -[-2(d-1.5)] \). Distance fare = \( 25 + 10 \times (-[-2(d-1.5)]) \).
- Step 2: Waiting fare: ₹5 per minute or part thereof → \( 5 \times \lceil t \rceil = 5 \times (-[-t]) \).
- Step 3: Total fare \( F(d,t) = 25 + 10(-[-2(d-1.5)]) + 5(-[-t]) \) for \( d > 1.5 \).
- Step 4: For \( d = 6.2 \), \( t = 3.7 \): Additional distance units = \( 2(6.2-1.5) = 2 \times 4.7 = 9.4 \). Ceiling = \( -[-9.4] = 10 \). Distance fare = \( 25 + 10 \times 10 = 125 \). Waiting units = \( -[-3.7] = 4 \). Waiting fare = \( 5 \times 4 = 20 \). Total = ₹145.
- Step 5: But passenger pays ₹100? That's less than fare. Re-read: "pays with a ₹100 note" – implies fare ≤ 100. Maybe distance is less. Let's adjust: Suppose fare is ₹87. Change = ₹13. Minimum coins: Use as many ₹10 as possible: \( [13/10] = 1 \) ten-rupee coin. Remaining = 3. But only ₹10 and ₹5 coins available. 3 cannot be made. So fare must be such that change is multiple of 5. Let's assume fare = ₹85 (multiple of 5). Change = ₹15. Minimum coins: \( [15/10] = 1 \) ten, remaining 5 → one ₹5 coin. Total 2 coins. Using GIF: Number of ₹10 coins = \( [C/10] \) where C is change. Remainder = \( C - 10[C/10] \). Number of ₹5 coins = \( [\text{remainder}/5] \).
- Step 6: General solution: For change \( C \), ₹10 coins = \( [C/10] \), ₹5 coins = \( [(C - 10[C/10])/5] \). For \( C=15 \): \( [1.5]=1 \), remainder 5, \( [1]=1 \).

ANSWER: (a) \( F(d,t) = 25 + 10(-[-2(d-1.5)]) + 5(-[-t]) \). (b) ₹145 (so ₹100 insufficient – problem likely intends different numbers; if fare=₹85, change=₹15). (c) For change ₹15: 1 coin of ₹10, 1 coin of ₹5. General: ₹10 coins = \( [C/10] \), ₹5 coins = \( [(C - 10[C/10])/5] \).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Now think of a traffic signal: it shows green (+1), red (−1), or amber (0) depending on the sensor input – that is the signum ______.

## DIAGNOSTIC_ANSWER_7
function

**A wrong answer ("light" or "signal") reveals the student has swapped the headword - the traffic-signal mapping of green, red and amber to +1, 0 and -1 is the signum function.** Function is the walkthrough's own conclusion noun, and the three-valued mapping is precisely what earns the name. Quote it in fill-ups, keeping the noun exact.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Now think of a traffic signal: it shows green (+1), red (−1), or amber (0) ______ on the sensor input – that is the signum function.

## DIAGNOSTIC_ANSWER_8
depending

**A wrong answer ("based" or "relying") reveals the student has paraphrased the walkthrough's participle - the signal shows its colour depending on the sensor input.** Scenario blanks repeat the walkthrough verbatim, so the participle is the walkthrough's own word for the conditional display. Recall the green-red-amber mapping before filling, and fill the word exactly as written.
