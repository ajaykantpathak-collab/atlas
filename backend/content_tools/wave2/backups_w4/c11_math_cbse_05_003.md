## ELI5
A Delhi shopkeeper's stock ledger: notebooks the real part, pens the imaginary. Monday holds 3 + 4i; Tuesday's shipment adds 2 - 5i. Total stock: notebooks with notebooks, pens with pens - (3+2) + i(4-5) = 5 - i. Addition and subtraction of complex numbers work coordinate-wise: z₁ ± z₂ = (a ± c) + i(b ± d), real with real, imaginary with imaginary, the two dimensions never mixing until multiplication invites them. On the Argand plane, these are vector moves.

## DEFINITION
Addition and subtraction of complex numbers are performed by separately adding or subtracting their real parts and imaginary parts. If \(z_1 = a + ib\) and \(z_2 = c + id\) where \(a, b, c, d \in \mathbb{R}\), then \(z_1 + z_2 = (a + c) + i(b + d)\) and \(z_1 - z_2 = (a - c) + i(b - d)\). The result is always a complex number in standard form.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly add and subtract any two complex numbers given in standard form, express the result in standard form, and solve for unknown real coefficients in equations involving sums/differences of complex numbers. They can also interpret addition/subtraction geometrically as vector operations on the Argand plane.

## SCOPE_BOUNDARY
This node covers addition and subtraction of two complex numbers in standard form \(a+ib\), including finding unknown coefficients, verifying closure, commutativity, and associativity properties. It does NOT cover multiplication, division, powers of \(i\), modulus, conjugate, polar form, or geometric representation on the Argand plane (those are subsequent nodes).

## WALKTHROUGH
Imagine you are a shopkeeper in Delhi tracking inventory of two items: notebooks (real part) and pens (imaginary part). On Monday you have \(3 + 4i\) units (3 notebooks, 4 pens), and on Tuesday you receive a shipment of \(2 - 5i\) units (2 notebooks, 5 pens returned). To find total stock, you simply add notebooks to notebooks and pens to pens: \( (3+2) + i(4-5) = 5 - i \). This is exactly how complex addition works: treat the real and imaginary parts as separate "dimensions" that never mix. Start by writing both numbers in standard form \(a+ib\), group real parts together and imaginary parts together, then add/subtract coefficients. The key insight: \(i\) is just a label for the second dimension; it does not participate in arithmetic until multiplication.

Takeaway: mastery means standard form first, then grouping like parts, and unknowns recovered by equating real and imaginary separately. Exam moves: add-and-express-in-standard-form questions and solve-for-unknown-coefficients items from complex equations. Check yourself: the sum's imaginary part must keep its i - writing (a+c) + (b+d) without it merges the ledgers. Students miss it because they add everything in sight, when the definition's contract is separation: two ledgers, one number, no cross-talk until multiplication allows it.

## DIAGNOSTIC_QUESTION_1
State the rule for adding two complex numbers \(z_1 = a+ib\) and \(z_2 = c+id\) in standard form. Write the formula for \(z_1 + z_2\) and \(z_1 - z_2\).

## DIAGNOSTIC_ANSWER_1
Correct answer: \(z_1 + z_2 = (a+c) + i(b+d)\) and \(z_1 - z_2 = (a-c) + i(b-d)\). A wrong answer like \((a+c) + (b+d)i\) (missing parentheses) or \((a+c) + i(b-d)\) for addition reveals the student treats \(i\) as a variable that can be factored incorrectly or confuses the sign for the imaginary part. It shows they haven't internalized that addition is component-wise and the imaginary unit \(i\) is attached only to the coefficient \(b\) or \(d\).

## DIAGNOSTIC_QUESTION_2
Explain why \((3+2i) + (1-4i)\) simplifies to \(4 - 2i\) and not \(4 + 6i\) or \(4 - 6i\). What does the negative sign in front of \(4i\) actually mean?

## DIAGNOSTIC_ANSWER_2
Correct explanation: The negative sign in \(-4i\) means the imaginary part of the second number is \(-4\). Adding imaginary parts: \(2 + (-4) = -2\). A student answering \(4+6i\) incorrectly adds absolute values (ignoring sign) or treats \(-4i\) as "subtract 4i" but then adds 4 to 2. A student answering \(4-6i\) incorrectly subtracts the imaginary parts as \(2 - 4 = -6\) (sign error). This reveals confusion between the sign of the imaginary coefficient and the operation of addition/subtraction.

## DIAGNOSTIC_QUESTION_3
If \(z_1 = 5 - 3i\) and \(z_2 = -2 + 7i\), compute \(z_1 - z_2\) and express the result in standard form \(a+ib\). Show all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Write \(z_1 - z_2 = (5 - 3i) - (-2 + 7i)\).  
Step 2: Distribute the minus sign: \(5 - 3i + 2 - 7i\).  
Step 3: Group real parts: \(5 + 2 = 7\). Group imaginary parts: \(-3i - 7i = -10i\).  
Step 4: Result: \(7 - 10i\).  
A wrong answer like \(3 + 4i\) (subtracting real parts incorrectly: \(5 - (-2) = 3\)) or \(7 + 4i\) (sign error on imaginary part: \(-3 - 7 = 4\)) reveals the student struggles with integer sign rules when distributing the minus sign across the second complex number.

## DIAGNOSTIC_QUESTION_4
Given \(z_1 = x + iy\) and \(z_2 = 3 - 2i\), if \(z_1 + z_2 = 7 + 4i\), find the real values of \(x\) and \(y\). How does this problem differ from simply adding two known complex numbers?

## DIAGNOSTIC_ANSWER_4
Step 1: \(z_1 + z_2 = (x+3) + i(y-2) = 7 + 4i\).  
Step 2: Equate real parts: \(x+3 = 7 \Rightarrow x = 4\).  
Step 3: Equate imaginary parts: \(y-2 = 4 \Rightarrow y = 6\).  
This requires solving for unknown coefficients by equating real and imaginary parts separately, using the fact that two complex numbers are equal iff their real parts are equal AND their imaginary parts are equal. A student who adds \(x+3\) and \(y-2\) without equating to 7 and 4, or who sets \(x+3 = 4\) and \(y-2 = 7\) (swapping), reveals they don't understand the definition of equality of complex numbers as a system of two real equations.

## DIAGNOSTIC_QUESTION_5
A student claims that for any complex numbers \(z_1\) and \(z_2\), \(z_1 - z_2 = z_2 - z_1\). Is this statement true or false? Justify your answer with a counterexample or proof.

## DIAGNOSTIC_ANSWER_5
False. Subtraction of complex numbers is not commutative. Counterexample: Let \(z_1 = 1+2i\), \(z_2 = 3+4i\). Then \(z_1 - z_2 = (1-3) + i(2-4) = -2 -2i\), but \(z_2 - z_1 = (3-1) + i(4-2) = 2+2i\). They are not equal (they are additive inverses). A student answering "true" because "addition is commutative" confuses addition with subtraction. A student giving a proof using variables but missing that \(a-c \neq c-a\) in general shows they don't connect the property to real number subtraction.

## DIAGNOSTIC_QUESTION_6
Create a word problem in an Indian context (e.g., shopping, travel, finance) that requires adding or subtracting two complex numbers to solve. Define what the real and imaginary parts represent in your problem.

## DIAGNOSTIC_ANSWER_6
Good answer example: "Rahul has a wallet with ₹500 cash and 3 UPI coupons. His friend Priya gives him ₹200 cash but takes back 2 UPI coupons. Represent Rahul's initial holdings as \(500 + 3i\) and the transaction as \(200 - 2i\). Find his final holdings." (Answer: \(700 + i\)). A poor answer uses complex numbers for quantities that don't have two independent dimensions (e.g., "5 apples and 3 oranges" but then adds them as if they were same unit) or creates a problem where multiplication is needed. This reveals whether the student understands that complex numbers model two-component quantities that add component-wise.

## COMMON_MISCONCEPTION
Students often write \((a+ib) + (c+id) = (a+c) + (b+d)i\) without parentheses around the imaginary coefficient, then later misinterpret \((b+d)i\) as \(b+di\) when substituting values. For example, with \(z_1 = 2+3i, z_2 = 4-5i\), they write sum as \(6 + -2i\) and then incorrectly simplify to \(6 - 2i\) (correct by accident) but if \(b+d\) is negative they might write \(6 + -2i\) and think the imaginary part is \(-2\) instead of \(-2\). The deeper error: treating \(i\) as a factor that distributes over addition of coefficients, i.e., writing \((a+ib)+(c+id) = (a+c) + i(b+d)\) correctly but then when \(b+d = -2\) writing \(i(-2) = -2i\) correctly, but if they write \((a+c) + (b+d)i\) and then substitute \(b+d=-2\) they get \((a+c) + (-2)i\) which is fine. The real danger is when they later multiply: they think \((a+ib)(c+id) = ac + i(bd)\) by false analogy. For addition, the specific error is forgetting to keep the imaginary part as a single coefficient: writing \(3i + (-5i) = -2\) (dropping \(i\)) or \(3i + (-5i) = -2i^2\).

## ON_FAILURE
If a student drops \(i\) or misplaces signs: 1) Have them rewrite each complex number as an ordered pair \((a, b)\) and \((c, d)\). 2) Perform addition as \((a+c, b+d)\). 3) Convert back to \(a+ib\) format, emphasizing that the second component is the coefficient of \(i\). 4) Practice with integer arithmetic drills: \(-3 + (-5) = -8\), so \(-3i + (-5i) = -8i\). 5) Use color coding: red for real parts, blue for imaginary parts, to visually prevent mixing.

## PREREQUISITE_NODE_IDS
c11_math_cbse_05_001, c11_math_cbse_05_002, c8_math_ch13_7, c9_math_ch3_6, c6_math_ch05_055
## PREREQUISITE_REASONS
c11_math_cbse_05_001: Provides motivation for why complex numbers exist (solving \(x^2+1=0\)).
c11_math_cbse_05_002: Defines complex number, standard form \(a+ib\), real/imaginary parts, equality condition.
c8_math_ch13_7: Teaches adding/subtracting algebraic expressions by combining like terms (treating \(i\) as a "like term" label).
c9_math_ch3_6: Establishes real numbers as union of rational/irrational, so \(a,b,c,d\) are real coefficients.
c6_math_ch05_055: Simplifying algebraic expressions with variables; builds habit of grouping like terms.

## FORWARD_NODE_IDS
c11_math_cbse_05_004, c11_math_cbse_05_005, c11_math_cbse_05_006, c11_math_cbse_05_007, c11_math_cbse_05_008, c11_math_cbse_05_012, c12_eco_cbse_10_008, c12_math_cbse_04_001

## FORWARD_REASONS
c11_math_cbse_05_004: Multiplication uses distributive law which relies on addition/subtraction of terms.
c11_math_cbse_05_005: Division requires multiplying by conjugate, then adding/subtracting real/imaginary parts.
c11_math_cbse_05_006: Powers of \(i\) simplify using \(i^2=-1\); addition/subtraction combines resulting terms.
c11_math_cbse_05_007: Modulus uses sum of squares; conjugate changes sign of imaginary part (subtraction).
c11_math_cbse_05_008: Argand plane represents addition as vector addition; subtraction as vector difference.
c11_math_cbse_05_012: Geometric interpretation of addition/subtraction as translations in the plane.
c12_eco_cbse_10_008: Linear equation solving (nth term, sum of AP) — needed for solving S = I algebraically and multiplier calculations.  
c12_math_cbse_04_001: Determinants can have complex entries; algebra of complex numbers is needed for JEE-level problems.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_1, c9_math_ch1_2, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_1: Cartesian coordinate system provides the geometric model (Argand plane) where complex addition is vector addition.
c9_math_ch1_2: Plotting points \((a,b)\) corresponds to representing \(a+ib\); addition translates points.
c10_math_cbse_07_001: Distance formula derives from Pythagoras; later used for modulus \(|z_1 - z_2|\) which is distance between complex numbers.

## CHAIN_DESCRIPTION
c11_math_cbse_05_002 -> c11_math_cbse_05_003 -> c11_math_cbse_05_004

## THIS_FORMULA
\(z_1 + z_2 = (a+c) + i(b+d)\); \(z_1 - z_2 = (a-c) + i(b-d)\)

## FORMULA_VARIABLES
\(a, b, c, d \in \mathbb{R}\); \(z_1 = a+ib\), \(z_2 = c+id\); \(i = \sqrt{-1}\)

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch04_01 | Vector addition in physics (displacement, velocity) mirrors complex addition: components add independently.
c11_economics_ch02_03 | In economics, complex numbers can model two-dimensional quantities (e.g., price and quantity indices) where aggregate changes add component-wise.

## PREREQ_CONCEPT
Equality of complex numbers: \(a+ib = c+id \iff a=c \text{ and } b=d\), and combining like terms in algebraic expressions.

## PREREQ_BEFORE
Student must be able to identify real and imaginary parts of a complex number in standard form and perform integer arithmetic (including negative numbers) fluently.

## PREREQ_STUCK
If stuck, revisit "Complex Numbers: Definition and Standard Form" (c11_math_cbse_05_002) to practice identifying \(a\) and \(b\) in \(a+ib\), and "Adding and Subtracting Algebraic Expressions" (c8_math_ch13_7) to practice grouping like terms.

## WORKED_EXAMPLE_1
PROBLEM: A circuit in a physics lab has two impedance components: \(Z_1 = 4 + 3j\) ohms and \(Z_2 = 2 - 5j\) ohms (engineering uses \(j\) for \(\sqrt{-1}\)). Find the total impedance when they are connected in series. Express answer in standard form.

STEPS:
- Step 1: Identify that series connection means impedances add: \(Z_{\text{total}} = Z_1 + Z_2\).
- Step 2: Write both in standard form: \(Z_1 = 4 + 3j\), \(Z_2 = 2 - 5j\).
- Step 3: Add real parts: \(4 + 2 = 6\). Add imaginary parts: \(3j + (-5j) = -2j\).
- Step 4: Combine: \(Z_{\text{total}} = 6 - 2j\) ohms.
- Step 5: Interpret: The resistive part is 6 ohms, reactive part is -2j ohms (capacitive).

REASONING: Impedance in AC circuits is modeled as complex numbers where real part is resistance and imaginary part is reactance. Series connection adds impedances component-wise, exactly like complex addition. The negative imaginary part indicates capacitive reactance.

ANSWER: \(6 - 2j\) ohms

## WORKED_EXAMPLE_2
PROBLEM: If \(z_1 = 3x + 2iy\) and \(z_2 = 5 - 7i\) and \(z_1 - z_2 = 1 + 9i\), find the real values of \(x\) and \(y\).

STEPS:
- Step 1: Write subtraction: \(z_1 - z_2 = (3x + 2iy) - (5 - 7i) = (3x - 5) + i(2y + 7)\).
- Step 2: Equate to given result: \((3x - 5) + i(2y + 7) = 1 + 9i\).
- Step 3: Equate real parts: \(3x - 5 = 1 \Rightarrow 3x = 6 \Rightarrow x = 2\).
- Step 4: Equate imaginary parts: \(2y + 7 = 9 \Rightarrow 2y = 2 \Rightarrow y = 1\).
- Step 5: Verify: \(z_1 = 3(2) + 2i(1) = 6 + 2i\); \(z_1 - z_2 = (6+2i) - (5-7i) = 1 + 9i\). Matches.

REASONING: This uses the definition of equality of complex numbers (real parts equal, imaginary parts equal) to convert a single complex equation into two real linear equations. The key is correctly distributing the minus sign to both real and imaginary parts of \(z_2\).

ANSWER: \(x = 2, y = 1\)

## WORKED_EXAMPLE_3
PROBLEM: In a coordinate geometry problem, point A represents \(z_A = -2 + 4i\) and point B represents \(z_B = 3 - i\). Find the complex number representing the vector \(\overrightarrow{AB}\) and the midpoint M of segment AB.

STEPS:
- Step 1: Vector \(\overrightarrow{AB} = z_B - z_A = (3 - i) - (-2 + 4i)\).
- Step 2: Distribute minus: \(3 - i + 2 - 4i\).
- Step 3: Group real: \(3 + 2 = 5\). Group imaginary: \(-i - 4i = -5i\).
- Step 4: So \(\overrightarrow{AB} = 5 - 5i\).
- Step 5: Midpoint M = \(\frac{z_A + z_B}{2} = \frac{(-2+4i) + (3-i)}{2}\).
- Step 6: Add: \((-2+3) + i(4-1) = 1 + 3i\). Divide by 2: \(M = \frac{1}{2} + \frac{3}{2}i\).

REASONING: This combines complex addition/subtraction with coordinate geometry concepts. The vector from A to B is \(z_B - z_A\) (subtraction). The midpoint uses addition and scalar division (which distributes over real and imaginary parts). This previews the Argand plane geometric interpretation.

ANSWER: \(\overrightarrow{AB} = 5 - 5i\); Midpoint \(M = 0.5 + 1.5i\)

## COMPETENCY_QUESTION_1
QUESTION: The sum of two complex numbers is \(10 + 6i\). If one number is \(4 - 2i\), find the other number. Then, verify that the difference (first minus second) is purely imaginary. Explain what "purely imaginary" means in this context.

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting results.

STEPS:
- Step 1: Let the unknown be \(z\). Then \(z + (4 - 2i) = 10 + 6i\).
- Step 2: Solve for \(z\): \(z = (10 + 6i) - (4 - 2i) = (10-4) + i(6 - (-2)) = 6 + 8i\).
- Step 3: Compute difference (first minus second): \((10+6i) - (6+8i) = 4 - 2i\).
- Step 4: Check if purely imaginary: A purely imaginary number has real part = 0. Here real part is 4, so NOT purely imaginary.
- Step 5: Wait, re-read: "difference (first minus second)" — first is sum? Or first given? The problem says: "If one number is \(4-2i\)" (call it \(z_1\)), the other is \(z_2 = 6+8i\). Difference \(z_1 - z_2 = (4-2i) - (6+8i) = -2 -10i\) (not purely imaginary). Difference \(z_2 - z_1 = 2+10i\) (not purely imaginary). The sum minus one number gives the other. The statement "verify that the difference (first minus second) is purely imaginary" is false for this data. The student must identify this.

ANSWER: The other number is \(6 + 8i\). The difference (given first minus found) is \((4-2i) - (6+8i) = -2 -10i\), which has non-zero real part (-2), so it is NOT purely imaginary. "Purely imaginary" means real part = 0 (e.g., \(0 + bi\)).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A quadratic equation \(z^2 + pz + q = 0\) has complex coefficients \(p = 3 - 4i\) and \(q = -5 + 12i\). One root is \(z_1 = 2 + i\). Use the fact that sum of roots = \(-p\) to find the other root \(z_2\). Then verify that product \(z_1 z_2 = q\) (you may use multiplication rules from next topic). Show all steps.

COMPETENCY: Applying algebraic relationships (sum/product of roots) with complex numbers, combining multiple concepts.

STEPS:
- Step 1: Sum of roots \(z_1 + z_2 = -p = -(3 - 4i) = -3 + 4i\).
- Step 2: Given \(z_1 = 2 + i\), so \(z_2 = (-3 + 4i) - (2 + i) = (-3-2) + i(4-1) = -5 + 3i\).
- Step 3: Verify product: \(z_1 z_2 = (2+i)(-5+3i)\). Use FOIL: \(2(-5) + 2(3i) + i(-5) + i(3i) = -10 + 6i -5i + 3i^2\).
- Step 4: Simplify using \(i^2 = -1\): \(-10 + i + 3(-1) = -13 + i\).
- Step 5: But \(q = -5 + 12i\). They are not equal! This means either the given root is wrong, or the coefficients don't match. The problem statement might have a typo, or the student must notice inconsistency.
- Step 6: Actually, if \(z_1 = 2+i\) is a root, then plugging in: \((2+i)^2 + (3-4i)(2+i) + (-5+12i) = (4+4i-1) + (6+3i-8i-4i^2) -5+12i = (3+4i) + (6-5i+4) -5+12i = 3+4i+10-5i-5+12i = 8+11i \neq 0\). So \(2+i\) is NOT a root. The student should detect this.

ANSWER: Using sum of roots, \(z_2 = -5 + 3i\). However, verification shows product \(z_1 z_2 = -13 + i \neq q = -5 + 12i\), and \(z_1\) does not satisfy the equation. Thus the premise is inconsistent; \(2+i\) cannot be a root of that equation.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Addition and ______ of complex numbers are performed by separately adding or subtracting their real parts and imaginary parts.

## DIAGNOSTIC_ANSWER_7
subtraction

**A wrong answer ("multiplication" or "division") reveals the student has swapped the operation pair - the coordinate-wise rule covers addition and subtraction of complex numbers, real parts and imaginary parts handled separately.** Subtraction is the definition's own second operation, named beside addition in the opening phrase. Quote the pair in fill-ups, keeping both words.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a shopkeeper in Delhi tracking inventory of two items: ______ (real part) and pens (imaginary part).

## DIAGNOSTIC_ANSWER_8
notebooks

**A wrong answer ("pencils" or "erasers") reveals the student has swapped the walkthrough's real-part item - the shopkeeper's inventory tracks notebooks as the real part and pens as the imaginary.** Scenario blanks repeat the walkthrough verbatim, so the item noun is the walkthrough's own choice. Recall the Monday stock 3 + 4i before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What is Addition and subtraction of complex numbers? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Addition and subtraction of complex numbers are performed by separately adding or subtracting their real parts and imaginary parts.

**A wrong answer (a loose "combine the numbers") reveals the student has paraphrased where the definition is asked - addition and subtraction are performed by separately handling real parts and imaginary parts.** Name both operations and the separate-handling rule.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can correctly add and subtract any two complex numbers given in standard form, express the result in standard form, and solve for unknown real coefficients in equations involving sums/differences of complex numbers.

**A wrong answer (only computing one example) reveals the student has under-answered the mastery criterion.** Full mastery is threefold: add and subtract any two complex numbers in standard form, express the result in standard form, and solve for unknown real coefficients in such equations - plus the geometric reading as vector operations on the Argand plane.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine you are a ______ in Delhi tracking inventory of two items: notebooks (real part) and pens (imaginary part).

## DIAGNOSTIC_ANSWER_11
shopkeeper

**A wrong answer ("student" or "clerk") reveals the student has swapped the walkthrough's role - a shopkeeper in Delhi tracks the two-item inventory of notebooks and pens.** Scenario blanks repeat the walkthrough verbatim, so the role noun is the walkthrough's own word for who keeps the ledger. Recall the Monday 3 + 4i stock before filling, and give the noun exactly.
