## ELI5
A farmer with 100 metres of fencing wants the biggest rectangle: x + y = 50 is fixed, so which xy is largest? The AM-GM inequality answers: (x + y)/2 ≥ sqrt(xy), hence 25 ≥ sqrt(xy) and xy ≤ 625, with the maximum exactly when x = y = 25 - a square. Equality is the whole prize: AM beats GM except when every number is equal, and the proof starts from the obvious (sqrt(a) - sqrt(b))^2 ≥ 0.

## DEFINITION
For any set of n positive real numbers \(a_1, a_2, \dots, a_n\), the Arithmetic Mean (AM) is greater than or equal to the Geometric Mean (GM), i.e., \(\frac{a_1 + a_2 + \dots + a_n}{n} \ge \sqrt[n]{a_1 a_2 \dots a_n}\), with equality holding if and only if all the numbers are equal. For two positive numbers \(a\) and \(b\), this reduces to \(\frac{a+b}{2} \ge \sqrt{ab}\), equality iff \(a = b\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can state and prove the AM-GM inequality for two positive numbers, apply it to solve optimization problems (e.g., find minimum value of a sum given a constant product, or maximum product given a constant sum), and extend the reasoning to n numbers using the given statement.

## SCOPE_BOUNDARY
This node covers the AM-GM inequality for two positive numbers (with algebraic proof) and its statement for n positive numbers. It does not cover the proof for n numbers (which uses induction and is beyond Class 11 scope) or the weighted AM-GM inequality.

## WALKTHROUGH
Imagine a farmer has 100 metres of fencing wire and wants to make a rectangular enclosure with the maximum possible area. If the sides are \(x\) and \(y\), then \(2(x+y)=100\) so \(x+y=50\). The area is \(A=xy\). To maximise \(A\) with a fixed sum, we need a relationship between sum and product. This is exactly what the AM-GM inequality provides: for positive \(x,y\), \(\frac{x+y}{2} \ge \sqrt{xy}\). Since \(x+y=50\), we get \(25 \ge \sqrt{xy} \Rightarrow xy \le 625\). The maximum area 625 m² occurs when \(x=y=25\) (a square). This real-world problem motivates the inequality. We then prove it by starting from the obvious truth \((\sqrt{a} - \sqrt{b})^2 \ge 0\), expanding to get \(a+b-2\sqrt{ab} \ge 0\), and rearranging to \(\frac{a+b}{2} \ge \sqrt{ab}\). Connect this to the definitions of AM and GM learned in nodes c11_math_cbse_09_004 and c11_math_cbse_09_008.

Takeaway: mastery means stating the inequality for two and n numbers, proving it from the non-negative square, and switching between sum-fixed and product-fixed optimisation. Exam moves: prove-AM-GM questions and minimum-sum or maximum-product items. Check yourself: equality holds iff all the numbers are equal - an optimum claimed without checking equality is half done. Students miss it because they treat the inequality as a formula to plug, when the definition pairs it with its equality condition: the fence problem is solvable only because x = y = 25 is allowed to happen.

## DIAGNOSTIC_QUESTION_1
State the AM-GM inequality for two positive numbers \(a\) and \(b\). When does equality hold?

## DIAGNOSTIC_ANSWER_1
For two positive numbers \(a\) and \(b\), AM = \(\frac{a+b}{2}\), GM = \(\sqrt{ab}\). The inequality is \(\frac{a+b}{2} \ge \sqrt{ab}\). Equality holds if and only if \(a = b\).  
A wrong answer (e.g., reversing the inequality or missing the equality condition) reveals that the student has not memorised the precise statement or the condition for equality.

## DIAGNOSTIC_QUESTION_2
Explain why the inequality \(\frac{a+b}{2} \ge \sqrt{ab}\) is true for all positive \(a, b\) by using the fact that the square of a real number is non-negative.

## DIAGNOSTIC_ANSWER_2
Since \((\sqrt{a} - \sqrt{b})^2 \ge 0\) for all real \(\sqrt{a}, \sqrt{b}\), expanding gives \(a + b - 2\sqrt{ab} \ge 0\), so \(a+b \ge 2\sqrt{ab}\). Dividing by 2 yields \(\frac{a+b}{2} \ge \sqrt{ab}\). Equality occurs when \(\sqrt{a} = \sqrt{b}\), i.e., \(a = b\).  
A wrong answer (e.g., starting from the inequality and manipulating without justification, or using an incorrect algebraic step) reveals the student does not understand the logical derivation from a known true statement.

## DIAGNOSTIC_QUESTION_3
Find the minimum value of \(x + \frac{9}{x}\) for \(x > 0\) using the AM-GM inequality. Also state the value of \(x\) at which the minimum occurs.

## DIAGNOSTIC_ANSWER_3
Let the two numbers be \(x\) and \(\frac{9}{x}\) (both positive for \(x>0\)). Their product is \(x \cdot \frac{9}{x} = 9\). By AM-GM: \(\frac{x + \frac{9}{x}}{2} \ge \sqrt{9} = 3\). Hence \(x + \frac{9}{x} \ge 6\). Equality when \(x = \frac{9}{x} \Rightarrow x^2 = 9 \Rightarrow x = 3\) (since \(x>0\)). Minimum value is 6 at \(x=3\).  
A wrong answer (e.g., getting minimum 3, or \(x=9\)) reveals a computational error in identifying the two numbers whose product is constant, or forgetting the factor of 2 in AM.

## DIAGNOSTIC_QUESTION_4
Compare the following two problems:  
(i) Find the maximum value of \(xy\) given \(x+y=10, x,y>0\).  
(ii) Find the minimum value of \(x+y\) given \(xy=10, x,y>0\).  
Explain how AM-GM is used in each and why the equality condition gives the answer.

## DIAGNOSTIC_ANSWER_4
In (i), the sum is fixed. AM-GM gives \(\frac{x+y}{2} \ge \sqrt{xy} \Rightarrow 5 \ge \sqrt{xy} \Rightarrow xy \le 25\). Maximum product 25 occurs when \(x=y=5\).  
In (ii), the product is fixed. AM-GM gives \(\frac{x+y}{2} \ge \sqrt{xy} = \sqrt{10} \Rightarrow x+y \ge 2\sqrt{10}\). Minimum sum \(2\sqrt{10}\) occurs when \(x=y=\sqrt{10}\).  
Both use the same inequality but with different fixed quantities. The equality condition \(a=b\) gives the optimal values.  
A wrong answer (e.g., confusing max/min, or not recognising which quantity is fixed) reveals the student cannot analyse the structure of the problem to decide which side of the inequality is constant.

## DIAGNOSTIC_QUESTION_5
A student claims that for any two positive numbers, the arithmetic mean is always *strictly* greater than the geometric mean. Is this claim correct? Justify your answer.

## DIAGNOSTIC_ANSWER_5
The claim is incorrect. The AM-GM inequality states AM \(\ge\) GM, with equality when the two numbers are equal. For example, if \(a=b=4\), AM = 4, GM = 4, so AM = GM, not strictly greater.  
A wrong answer (e.g., agreeing with the student) reveals the student overlooks the equality condition and thinks the inequality is always strict.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (with numbers) that can be solved using the AM-GM inequality for two numbers. Provide the problem statement and a brief solution outline.

## DIAGNOSTIC_ANSWER_6
Example problem: "A rectangular garden has a fixed perimeter of 40 m. Find the dimensions that maximise the area."  
Solution: Let sides be \(x\) and \(y\). Perimeter \(2(x+y)=40 \Rightarrow x+y=20\). Area \(A=xy\). By AM-GM, \(\frac{x+y}{2} \ge \sqrt{xy} \Rightarrow 10 \ge \sqrt{A} \Rightarrow A \le 100\). Equality when \(x=y=10\). So maximum area 100 m² for a square of side 10 m.  
A poor answer (e.g., a problem that doesn't fit AM-GM, or incorrect application) reveals the student cannot construct a scenario where a sum is fixed and product is to be maximised (or vice versa).

## COMMON_MISCONCEPTION
Students often forget that AM-GM applies **only to positive numbers**. They may apply it to negative numbers or zero without checking the condition. For example, they might try to find the minimum of \(x + \frac{1}{x}\) for all real \(x \ne 0\), and incorrectly use AM-GM to get 2, but the function actually has no minimum (it goes to \(-\infty\)). The error is not verifying the positivity condition before applying the inequality.

## ON_FAILURE
If a student applies AM-GM without checking positivity, guide them to test with a negative number: e.g., \(a = -1, b = -4\). AM = -2.5, GM = 2. The inequality \(-2.5 \ge 2\) is false. Emphasise that the proof uses \(\sqrt{a}\) and \(\sqrt{b}\), which require non-negative numbers, and the inequality is for positive numbers (or non-negative with equality at zero). Have them re-read the theorem statement and highlight "positive numbers". Then practice identifying the domain of variables in problems before applying AM-GM.

## PREREQUISITE_NODE_IDS
c11_math_cbse_09_004, c11_math_cbse_09_008, c11_math_cbse_09_010

## PREREQUISITE_REASONS
c11_math_cbse_09_004: Defines Arithmetic Mean and its formula for two numbers, which is the left side of the inequality.  
c11_math_cbse_09_008: Defines Geometric Mean and its formula for two numbers, which is the right side of the inequality.
c11_math_cbse_09_010: c11_math_cbse_09_004 -> c11_math_cbse_09_008 -> c11_math_cbse_09_009 -> c11_math_cbse_09_010  

## FORWARD_NODE_IDS


## FORWARD_REASONS


## CROSS_SUBJECT_PREREQS
c9_math_ch8_4, c9_math_ch8_8
## CROSS_SUBJECT_REASONS
c9_math_ch8_4: Arithmetic Progression nth term formula is used in problems where terms are in AP and AM-GM is applied.  
c9_math_ch8_8: Geometric Progression definition and nth term formula are used in problems where terms are in GP and AM-GM is applied.

## CHAIN_DESCRIPTION
c11_math_cbse_09_004 -> c11_math_cbse_09_008 -> c11_math_cbse_09_009 -> c11_math_cbse_09_010

## THIS_FORMULA
For two positive numbers \(a\) and \(b\): \(\frac{a+b}{2} \ge \sqrt{ab}\), with equality iff \(a = b\).  
For \(n\) positive numbers \(a_1, a_2, \dots, a_n\): \(\frac{a_1+a_2+\dots+a_n}{n} \ge \sqrt[n]{a_1 a_2 \dots a_n}\), with equality iff \(a_1 = a_2 = \dots = a_n\).

## FORMULA_VARIABLES
\(a, b\) = positive real numbers; \(n\) = number of positive real numbers; \(a_1, a_2, \dots, a_n\) = positive real numbers.

## FORMULA_UNITS
dimensionless (since it's a pure number inequality)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | The concept of optimization (maxima/minima) using AM-GM is similar to finding maximum range or minimum energy in physics problems, e.g., for a given sum of two quantities, their product is maximised when they are equal.  
c11_economics_ch2_1 | In economics, the AM-GM inequality is used to derive the relationship between arithmetic mean and geometric mean of returns, and in utility maximisation problems where a fixed budget (sum) allocates to goods to maximise utility (product-like function).

## PREREQ_CONCEPT
Understanding of arithmetic mean and geometric mean definitions for two positive numbers, and basic algebraic manipulation including squares and square roots.

## PREREQ_BEFORE
The student must be able to compute AM and GM for given positive numbers and simplify expressions involving squares and square roots.

## PREREQ_STUCK
Revisit the definitions of AM and GM in nodes c11_math_cbse_09_004 and c11_math_cbse_09_008, and practice simplifying \((\sqrt{a} - \sqrt{b})^2\).

## WORKED_EXAMPLE_1
PROBLEM: A farmer has 100 metres of fencing wire to make a rectangular enclosure. What should be the dimensions of the rectangle to maximise the enclosed area? Use AM-GM inequality.  
STEPS:
- Step 1: Let the length and breadth of the rectangle be \(x\) and \(y\) metres. Perimeter = \(2(x+y) = 100 \Rightarrow x+y = 50\). Area \(A = x \cdot y\).
- Step 2: We want to maximise \(A = xy\) given \(x+y = 50\), with \(x>0, y>0\). By AM-GM inequality for two positive numbers: \(\frac{x+y}{2} \ge \sqrt{xy}\).
- Step 3: Substitute \(x+y = 50\): \(\frac{50}{2} \ge \sqrt{xy} \Rightarrow 25 \ge \sqrt{xy} \Rightarrow xy \le 625\). So maximum area is 625 m².
- Step 4: Equality holds when \(x = y\). Since \(x+y=50\), we get \(x=y=25\). So the rectangle should be a square of side 25 m.
- Step 5: Verify: Perimeter = \(2(25+25)=100\) m, Area = \(25 \times 25 = 625\) m². Any other dimensions, e.g., 20 and 30, give area 600 < 625.  
REASONING: The AM-GM inequality directly relates the sum (which is fixed) to the product (which we want to maximise). Since the inequality gives an upper bound for the product in terms of the sum, and equality is achievable when the numbers are equal, we get the maximum product and the condition for it.  
ANSWER: Dimensions: 25 m by 25 m (square). Maximum area: 625 m².

## WORKED_EXAMPLE_2
PROBLEM: Find the minimum value of the expression \(4x + \frac{9}{x}\) for \(x > 0\), and the value of \(x\) at which it occurs.  
STEPS:
- Step 1: Identify the two positive numbers: \(a = 4x\), \(b = \frac{9}{x}\). Their product is constant: \(a \cdot b = 4x \cdot \frac{9}{x} = 36\).
- Step 2: We want to minimise the sum \(a + b = 4x + \frac{9}{x}\). By AM-GM: \(\frac{a+b}{2} \ge \sqrt{ab} \Rightarrow \frac{4x + \frac{9}{x}}{2} \ge \sqrt{36} = 6\).
- Step 3: Multiply by 2: \(4x + \frac{9}{x} \ge 12\). So the minimum value is 12.
- Step 4: Equality holds when \(a = b \Rightarrow 4x = \frac{9}{x} \Rightarrow 4x^2 = 9 \Rightarrow x^2 = \frac{9}{4} \Rightarrow x = \frac{3}{2}\) (since \(x>0\)).
- Step 5: Check: At \(x=1.5\), \(4(1.5) + \frac{9}{1.5} = 6 + 6 = 12\). For \(x=1\), value = \(4+9=13 > 12\); for \(x=2\), value = \(8+4.5=12.5 > 12\).  
REASONING: We rewrote the expression as the sum of two positive terms whose product is constant. AM-GM then gives a lower bound for the sum, with equality when the terms are equal.  
ANSWER: Minimum value = 12 at \(x = \frac{3}{2}\).

## WORKED_EXAMPLE_3
PROBLEM: If \(a, b, c\) are positive real numbers such that \(a+b+c = 1\), prove that \(\frac{1}{a} + \frac{1}{b} + \frac{1}{c} \ge 9\).  
STEPS:
- Step 1: We know \(a+b+c = 1\), \(a,b,c > 0\). We want to prove sum of reciprocals \(\ge 9\).
- Step 2: Apply AM-GM to the three numbers \(a, b, c\): \(\frac{a+b+c}{3} \ge \sqrt[3]{abc} \Rightarrow \frac{1}{3} \ge \sqrt[3]{abc} \Rightarrow abc \le \frac{1}{27}\).
- Step 3: Apply AM-GM to the three numbers \(\frac{1}{a}, \frac{1}{b}, \frac{1}{c}\): \(\frac{\frac{1}{a} + \frac{1}{b} + \frac{1}{c}}{3} \ge \sqrt[3]{\frac{1}{abc}}\).
- Step 4: Since \(abc \le \frac{1}{27}\), we have \(\frac{1}{abc} \ge 27\), so \(\sqrt[3]{\frac{1}{abc}} \ge 3\).
- Step 5: Therefore \(\frac{\frac{1}{a} + \frac{1}{b} + \frac{1}{c}}{3} \ge 3 \Rightarrow \frac{1}{a} + \frac{1}{b} + \frac{1}{c} \ge 9\).
- Step 6: Equality holds when \(a = b = c = \frac{1}{3}\).  
REASONING: This example combines the AM-GM inequality for three numbers (stated without proof in Class 11) with algebraic manipulation. It shows how to chain inequalities and use the given condition to bound the product, then apply AM-GM again to the reciprocals.  
ANSWER: Proved. Minimum value is 9 when \(a = b = c = \frac{1}{3}\).

## COMPETENCY_QUESTION_1
QUESTION: A company produces two products A and B. The total production capacity is 100 units per day (i.e., \(x + y = 100\)). The profit per unit of A is ₹\(x\) and per unit of B is ₹\(y\) (so profit depends on production quantity). The total daily profit is \(P = x \cdot y\). The manager claims that to maximise profit, they should produce 50 units of each. Is the manager correct? Use AM-GM inequality to justify your answer.  
COMPETENCY: Translating real-world situations to mathematical expressions and justifying using inequalities.  
STEPS:
- Step 1: Identify variables: \(x\) = units of A, \(y\) = units of B. Constraint: \(x+y=100, x>0, y>0\). Profit \(P = xy\).
- Step 2: Apply AM-GM: \(\frac{x+y}{2} \ge \sqrt{xy} \Rightarrow 50 \ge \sqrt{P} \Rightarrow P \le 2500\).
- Step 3: Equality when \(x=y=50\). So maximum profit ₹2500 at \(x=y=50\).
- Step 4: Conclude manager is correct.  
ANSWER: Yes, the manager is correct. Maximum profit ₹2500 occurs when \(x=y=50\).  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: For positive real numbers \(x, y, z\), prove that \((x+y)(y+z)(z+x) \ge 8xyz\). Hence or otherwise, find the minimum value of \(\frac{(x+y)(y+z)(z+x)}{xyz}\) for \(x,y,z > 0\).  
COMPETENCY: Comparing and justifying algebraic inequalities using AM-GM.  
STEPS:
- Step 1: Apply AM-GM to each pair: \(x+y \ge 2\sqrt{xy}\), \(y+z \ge 2\sqrt{yz}\), \(z+x \ge 2\sqrt{zx}\).
- Step 2: Multiply the three inequalities (all sides positive): \((x+y)(y+z)(z+x) \ge 8 \sqrt{x^2 y^2 z^2} = 8xyz\).
- Step 3: Therefore \(\frac{(x+y)(y+z)(z+x)}{xyz} \ge 8\).
- Step 4: Equality holds when \(x=y\), \(y=z\), \(z=x\), i.e., \(x=y=z\).
- Step 5: Minimum value is 8, achieved when \(x=y=z\).  
ANSWER: Proved. Minimum value = 8 when \(x = y = z\).  
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a farmer has 100 metres of fencing wire and wants to make a ______ enclosure with the maximum possible area.

## DIAGNOSTIC_ANSWER_7
rectangular

**A wrong answer ("square" or "circular") reveals the student has swapped the walkthrough's adjective - the farmer wants a rectangular enclosure with the maximum possible area.** Rectangular is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the fencing wire before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a farmer has ______ metres of fencing wire and wants to make a rectangular enclosure with the maximum possible area.

## DIAGNOSTIC_ANSWER_8
100

**A wrong answer (50 or 25) reveals the student has drifted from the walkthrough - the farmer has 100 metres of fencing wire, which is what makes x + y = 50 after halving.** The 100 is the walkthrough's own wire length. Recall the maximum-area goal before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can state and prove the AM-GM inequality for two positive numbers, apply it to solve optimization problems (e.g., find minimum value of a sum given a constant product, or maximum product given a constant sum), and extend the reasoning to n numbers using the given statement.
