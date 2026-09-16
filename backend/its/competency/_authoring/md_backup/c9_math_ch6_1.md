## DEFINITION
The perimeter of a plane figure is the total length of its boundary, calculated as the sum of the lengths of all its sides. For a rectangle with length $l$ and breadth $b$, perimeter $P = 2(l + b)$; for a square with side $a$, $P = 4a$; for a triangle with sides $a$, $b$, $c$, $P = a + b + c$.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can solve multi-step perimeter problems involving algebraic expressions for side lengths, find missing dimensions given perimeter and other conditions, and solve real-world problems combining perimeter with unit conversions and cost calculations.
## SCOPE_BOUNDARY
Covers perimeter formulas for rectangles, squares, and triangles (including isosceles and equilateral cases), problems with sides expressed as algebraic expressions, finding missing sides using perimeter, and composite figures made by joining these shapes. Does NOT cover circumference of circles (node c9_math_ch6_2), arc length (c9_math_ch6_3), or area calculations (c9_math_ch6_4 onwards).
## WALKTHROUGH
Imagine you are helping your family fence a rectangular garden that is 12 metres long and 8 metres wide. The fencing wire costs ₹45 per metre. How much wire do you need and what will it cost? Start by drawing the rectangle and labelling the sides. Recall from Class 6 that perimeter is the distance around the shape. For a rectangle, opposite sides are equal, so you add length + breadth + length + breadth, which simplifies to $2(l + b)$. Substitute the values: $2(12 + 8) = 40$ metres. Then multiply by cost per metre: $40 \times 45 = ₹1800$. The key insight is that perimeter is a linear measure (metres) while cost involves multiplication of two quantities (metres × rupees/metre), connecting to the unitary method from Class 7.
## DIAGNOSTIC_QUESTION_1
Write the formula for the perimeter of a rectangle in terms of its length $l$ and breadth $b$. If the length is doubled and the breadth is halved, write the new perimeter in terms of $l$ and $b$.
## DIAGNOSTIC_ANSWER_1
The perimeter of a rectangle is $P = 2(l + b)$. If length becomes $2l$ and breadth becomes $b/2$, the new perimeter is $P' = 2(2l + b/2) = 4l + b$. A wrong answer like $P' = 2l + b$ reveals the student incorrectly applied the operations only to one term inside the bracket, showing a misunderstanding of the distributive property over addition.
## DIAGNOSTIC_QUESTION_2
A square and a rectangle have the same perimeter. The square has side 10 cm. The rectangle has length 14 cm. Explain why the rectangle's breadth must be 6 cm without calculating the perimeter numerically first.
## DIAGNOSTIC_ANSWER_2
Since perimeters are equal, $4 \times 10 = 2(14 + b) \Rightarrow 40 = 28 + 2b \Rightarrow 2b = 12 \Rightarrow b = 6$. A student who says "breadth is 6 because 14 + 6 = 20 and 2 × 20 = 40" is using guess-and-check rather than algebraic reasoning. The correct explanation uses the equality of perimeters to set up an equation, showing understanding that perimeter is a conserved quantity that can be equated across shapes.
## DIAGNOSTIC_QUESTION_3
An isosceles triangle has a perimeter of 36 cm. The base is 4 cm less than each equal side. Find the length of each side.
## DIAGNOSTIC_ANSWER_3
Let each equal side be $x$ cm. Then base = $(x - 4)$ cm. Perimeter = $x + x + (x - 4) = 3x - 4 = 36 \Rightarrow 3x = 40 \Rightarrow x = 40/3 = 13\frac{1}{3}$ cm. Equal sides = $13\frac{1}{3}$ cm, base = $9\frac{1}{3}$ cm. A wrong answer like $x = 12$ (giving sides 12, 12, 8) reveals the student set up $3x = 36$ ignoring the "4 cm less" condition, or set up $2x + (x - 4) = 36$ but solved as $3x = 32$ (subtracting 4 instead of adding), showing algebraic manipulation errors.
## DIAGNOSTIC_QUESTION_4
A rectangular field has length $(3x + 2)$ m and breadth $(2x - 1)$ m. Its perimeter is 50 m. Find $x$ and hence the actual dimensions. Then determine if the same perimeter could enclose a square with a larger area. Justify.
## DIAGNOSTIC_ANSWER_4
$P = 2[(3x+2)+(2x-1)] = 2(5x+1) = 10x+2 = 50 \Rightarrow 10x=48 \Rightarrow x=4.8$. Length = $3(4.8)+2 = 16.4$ m, Breadth = $2(4.8)-1 = 8.6$ m. Area = $16.4 \times 8.6 = 141.04$ m². Square with same perimeter: side = $50/4 = 12.5$ m, area = $156.25$ m² > $141.04$ m². Yes, square has larger area. A student who only finds $x$ and dimensions but cannot compare areas shows they treat perimeter and area as independent rather than understanding the isoperimetric principle introduced in Class 8 (c8_math_ch14_7).
## DIAGNOSTIC_QUESTION_5
Rahul solved: "Perimeter of a triangle with sides $2x$, $3x$, $5x$ is 60 cm. So $2x+3x+5x=60 \Rightarrow 10x=60 \Rightarrow x=6$. Sides are 12, 18, 30 cm." Evaluate his solution. Is the triangle possible? Explain.
## DIAGNOSTIC_ANSWER_5
Rahul's algebra is correct ($x=6$, sides 12, 18, 30), but the triangle is NOT possible because it violates the triangle inequality theorem: $12 + 18 = 30$, which is NOT greater than the third side (30). The sum of two sides must be strictly greater than the third. A student who says "yes, it's correct" only checked the perimeter arithmetic, not the geometric feasibility. This reveals a gap in connecting algebraic solutions to geometric constraints (triangle inequality from Class 7, c7_math_ch07_001).
## DIAGNOSTIC_QUESTION_6
Create a real-world problem where a farmer has 200 m of fencing wire to make a rectangular pen for goats. The length must be 10 m more than twice the breadth. Write the problem statement, define variables, form the equation, and solve for dimensions. Then calculate the area of the pen.
## DIAGNOSTIC_ANSWER_6
Problem: "A farmer has 200 m fencing. Length = 2 × breadth + 10. Find dimensions and area." Let breadth = $b$, length = $2b+10$. $P = 2(b + 2b+10) = 2(3b+10) = 6b+20 = 200 \Rightarrow 6b=180 \Rightarrow b=30$ m. Length = $70$ m. Area = $30 \times 70 = 2100$ m². A poor answer might omit the "twice the breadth" translation to $2b$, or forget to multiply by 2 in the perimeter formula, or calculate area as $30+70=100$. This reveals whether the student can translate verbal conditions into algebraic expressions and execute the full solution chain.
## COMMON_MISCONCEPTION
Students treat the perimeter formula $P = 2(l + b)$ as $P = 2l + b$ (forgetting to multiply breadth by 2) OR they add the two given dimensions and stop (e.g., for $l=12, b=8$, they answer $20$ m instead of $40$ m). This happens because they see "2(l+b)" and incorrectly distribute the 2 only to the first term, or they confuse the semi-perimeter $(l+b)$ with the full perimeter. In triangle problems, they often write $P = a + b$ (using only two sides) when the problem gives two equal sides and says "the third side is 4 cm less", forgetting to express the third side algebraically before summing.
## ON_FAILURE
Step 1: Have the student physically measure a rectangular notebook with a ruler. Ask: "If you walk around it once, how many lengths and breadths do you cross?" (Answer: two lengths, two breadths). Step 2: Write $P = l + b + l + b$ on paper, then factor: $P = 2l + 2b = 2(l+b)$. Step 3: For the "2l + b" error, substitute numbers: $l=10, b=5$. Correct: $2(10+5)=30$. Wrong: $2(10)+5=25$. Ask: "Does the wire go around the breadth twice or once?" Step 4: For triangle problems, insist on labelling ALL three sides with algebraic expressions BEFORE writing the perimeter sum. Use a template: Side 1 = ____, Side 2 = ____, Side 3 = ____, Perimeter = ____ + ____ + ____.
## PREREQUISITE_NODE_IDS
c6_math_ch08_085, c7_math_ch07_001, c8_math_ch14_7, c8_math_ch4_2, c8_math_ch4_5, c7_math_ch15_003
## PREREQUISITE_REASONS
c6_math_ch08_085: Introduces the basic concept of perimeter as boundary length for rectangles and squares.
c7_math_ch07_001: Defines triangle, its sides, and the triangle inequality theorem needed for feasibility checks.
c8_math_ch14_7: Establishes that perimeter does not determine area, crucial for diagnostic question 4.
c8_math_ch4_2: Covers rectangle properties (opposite sides equal) which justifies the $2(l+b)$ formula.
c8_math_ch4_5: Covers square properties (all sides equal) which justifies the $4a$ formula.
c7_math_ch15_003: Provides systematic method for solving linear equations needed when sides are algebraic expressions.
## FORWARD_NODE_IDS
c9_math_ch6_2, c9_math_ch6_3, c9_math_ch6_4, c9_math_ch6_5, c9_math_ch6_11, c10_math_cbse_03_002, c9_math_ch6_6, c9_math_ch6_7, c9_math_ch6_8

## FORWARD_REASONS
c9_math_ch6_2: Perimeter concept extends to curved boundaries (circumference) using the same "distance around" principle.
c9_math_ch6_3: Arc length is a fractional part of circumference, building on perimeter as a linear measure.
c9_math_ch6_4: Area formulas for rectangle/parallelogram use the same dimensions (length, breadth) as perimeter.
c9_math_ch6_5: Triangle area uses base and height; perimeter problems often give sides requiring triangle inequality.
c9_math_ch6_11: Composite figures combine perimeters of rectangles, triangles, circles; this node provides the polygon components.
c10_math_cbse_03_002: Defines linear equations in two variables and their graphs as lines; foundational for understanding systems.
c9_math_ch6_6: Understanding perimeter of triangles is needed to compute semi-perimeter s = (a+b+c)/2
c9_math_ch6_7: Perimeter concepts are needed to compute semi-perimeter and for fencing/cost problems that combine perimeter and area.
c9_math_ch6_8: Perimeter of plane figures introduced the concept of measuring 2D shapes.

## CROSS_SUBJECT_PREREQS
c6_math_ch08_085, c7_math_ch03_005, c7_math_ch15_007, c8_math_ch7_6
## CROSS_SUBJECT_REASONS
c6_math_ch08_085: Foundation concept of perimeter as boundary measurement in practical geometry.
c7_math_ch03_005: Units of measurement and decimal notation for expressing side lengths in metres/centimetres.
c7_math_ch15_007: Setting up equations from word problems (e.g., "length is 5 more than breadth").
c8_math_ch7_6: Unitary method for cost calculations (cost per metre of fencing × total metres).
## CHAIN_DESCRIPTION
c6_math_ch08_085 -> c9_math_ch6_1 -> c9_math_ch6_4
## THIS_FORMULA
Rectangle: $P = 2(l + b)$; Square: $P = 4a$; Triangle: $P = a + b + c$; Equilateral triangle: $P = 3a$; Isosceles triangle: $P = 2a + b$ (where $a$ = equal side, $b$ = base)
## FORMULA_VARIABLES
$P$ = perimeter (linear units), $l$ = length of rectangle, $b$ = breadth of rectangle, $a$ = side of square or equal side of isosceles/equilateral triangle, $a,b,c$ = three sides of a general triangle
## FORMULA_UNITS
metres (m), centimetres (cm), kilometres (km), millimetres (mm) - any linear unit
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c9_physics_ch2_1 | Distance travelled in one complete round of a rectangular/square track is the perimeter; connects to speed = distance/time problems.
c9_eco_ch1_2 | Fencing cost = perimeter × rate per metre; connects to linear cost functions and budgeting constraints.
## PREREQ_CONCEPT
Solving linear equations in one variable and translating verbal statements into algebraic expressions.
## PREREQ_BEFORE
Student must be able to form and solve equations like $2(x + 5) = 30$ and express "3 more than twice a number" as $2x + 3$.
## PREREQ_STUCK
Review c7_math_ch15_003 (solving linear equations: systematic method) and c7_math_ch15_007 (setting up equations from word problems).
## WORKED_EXAMPLE_1
PROBLEM: A rectangular playground has length 35 m and breadth 20 m. The school wants to put a boundary rope around it. The rope costs ₹12 per metre. If the school has ₹1500 budgeted, is it enough? If not, how much more is needed?
STEPS:
- Step 1: Identify given values: length $l = 35$ m, breadth $b = 20$ m, cost per metre = ₹12, budget = ₹1500. Required: total cost and comparison with budget.
- Step 2: Recall perimeter formula for rectangle: $P = 2(l + b)$. This gives total metres of rope needed.
- Step 3: Substitute values: $P = 2(35 + 20) = 2 \times 55 = 110$ m. So 110 metres of rope is needed.
- Step 4: Calculate total cost: Cost = perimeter × rate per metre = $110 \times 12 = ₹1320$.
- Step 5: Compare with budget: ₹1320 < ₹1500, so budget is enough. Surplus = ₹1500 - ₹1320 = ₹180.
REASONING: The problem chains two concepts: perimeter as a linear measure (metres) and unitary method for cost (rupees = metres × rupees/metre). The key is recognising that perimeter gives the quantity to be multiplied by the unit rate. This mirrors board exam questions where mensuration combines with commercial mathematics.
ANSWER: Yes, the budget is enough. Total cost = ₹1320, surplus = ₹180.
## WORKED_EXAMPLE_2
PROBLEM: The perimeter of an isosceles triangle is 42 cm. The base is $\frac{3}{2}$ times each equal side. Find the lengths of all three sides.
STEPS:
- Step 1: Let each equal side be $x$ cm. Then base = $\frac{3}{2}x$ cm. Given perimeter $P = 42$ cm.
- Step 2: Write perimeter equation: $x + x + \frac{3}{2}x = 42$.
- Step 3: Combine like terms: $2x + \frac{3}{2}x = \frac{4}{2}x + \frac{3}{2}x = \frac{7}{2}x = 42$.
- Step 4: Solve for $x$: Multiply both sides by 2: $7x = 84 \Rightarrow x = 12$. So equal sides = 12 cm each.
- Step 5: Find base: $\frac{3}{2} \times 12 = 18$ cm. Verify: $12 + 12 + 18 = 42$ cm. Check triangle inequality: $12 + 12 = 24 > 18$, $12 + 18 = 30 > 12$ - valid triangle.
REASONING: This problem requires handling fractional coefficients in the algebraic equation, a step up from integer coefficients. The triangle inequality check at the end is essential - many students skip it, but board exams expect verification that the sides can actually form a triangle. The fraction $\frac{3}{2}$ tests comfort with rational numbers in geometric contexts.
ANSWER: Equal sides = 12 cm each, base = 18 cm.
## WORKED_EXAMPLE_3
PROBLEM: A rectangular park 60 m long and 40 m wide has a 2 m wide jogging track running along its inside boundary. Find the perimeter of the inner rectangle (the grass area) and the area of the track.
STEPS:
- Step 1: Draw a diagram. Outer rectangle: length = 60 m, breadth = 40 m. Track width = 2 m on all sides inside.
- Step 2: Find inner rectangle dimensions: Inner length = $60 - 2(2) = 56$ m (track takes 2 m from left and 2 m from right). Inner breadth = $40 - 2(2) = 36$ m.
- Step 3: Perimeter of inner rectangle (grass boundary): $P_{inner} = 2(56 + 36) = 2 \times 92 = 184$ m.
- Step 4: Area of outer rectangle = $60 \times 40 = 2400$ m². Area of inner rectangle = $56 \times 36 = 2016$ m².
- Step 5: Area of track = Outer area - Inner area = $2400 - 2016 = 384$ m².
- Step 6: Verify track area using alternative method: Track = two horizontal strips ($2 \times 60 \times 2$) + two vertical strips ($2 \times 36 \times 2$) - four corners ($4 \times 2 \times 2$) = $240 + 144 - 16 = 368$ m². Wait, discrepancy! Re-check: Horizontal strips are along full length 60, but vertical strips are only along inner breadth 36. Correct: $2(60 \times 2) + 2(36 \times 2) = 240 + 144 = 384$ m². Matches.
REASONING: This combines perimeter (inner boundary) with area (track) and requires visualising the composite figure. The "inside track" reduces each dimension by twice the track width. The verification step using strip method reinforces the decomposition concept from Class 8 (c8_math_ch14_9). Board exams often have such "path/track around/between" problems.
ANSWER: Perimeter of inner rectangle = 184 m. Area of track = 384 m².
## COMPETENCY_QUESTION_1
QUESTION: A wire of length 88 cm is bent to form a rectangle. The same wire is then straightened and bent to form a square. (a) If the rectangle's length is 28 cm, find its breadth. (b) Find the side of the square. (c) Compare the areas of the rectangle and the square. Which shape encloses more area for the same perimeter? Justify your answer.
COMPETENCY: Comparing and justifying - evaluating which shape maximises area for a fixed perimeter
STEPS:
- Step 1: Use perimeter of rectangle = 88 cm to find breadth: $2(28 + b) = 88$.
- Step 2: Calculate rectangle area.
- Step 3: Perimeter of square = 88 cm, find side: $4a = 88$.
- Step 4: Calculate square area.
- Step 5: Compare areas and state the general principle.
ANSWER: (a) $2(28+b)=88 \Rightarrow 28+b=44 \Rightarrow b=16$ cm. Rectangle area = $28 \times 16 = 448$ cm². (b) Square side = $88/4 = 22$ cm. Square area = $22^2 = 484$ cm². (c) Square encloses more area (484 > 448). For a given perimeter, the square has maximum area among all rectangles. This is the isoperimetric property for quadrilaterals.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A triangular park has sides in the ratio 3:4:5. The cost of fencing it at ₹25 per metre is ₹3000. (a) Find the actual side lengths of the park. (b) Verify whether it is a right-angled triangle. (c) If a person jogs around the park 5 times, what distance does he cover in kilometres?
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step problem solving with unit conversion
STEPS:
- Step 1: Let sides be $3x, 4x, 5x$. Perimeter = $12x$ metres.
- Step 2: Total fencing cost = Perimeter × Rate $\Rightarrow 12x \times 25 = 3000$. Solve for $x$.
- Step 3: Find actual side lengths.
- Step 4: Check if $(3x)^2 + (4x)^2 = (5x)^2$ to verify right angle.
- Step 5: Distance for 5 rounds = $5 \times$ perimeter. Convert metres to kilometres.
ANSWER: (a) $12x \times 25 = 3000 \Rightarrow 300x = 3000 \Rightarrow x = 10$. Sides = 30 m, 40 m, 50 m. (b) $30^2 + 40^2 = 900 + 1600 = 2500 = 50^2$. Yes, it is a right-angled triangle (Pythagorean triplet). (c) Perimeter = 120 m. 5 rounds = $5 \times 120 = 600$ m = 0.6 km.
DIFFICULTY: hard
