## DEFINITION
A composite plane figure is a shape formed by combining two or more basic plane figures (rectangles, triangles, circles, sectors, segments) such that they share boundaries but do not overlap. The total area is the algebraic sum of the areas of the constituent parts: areas of added parts are summed, and areas of removed parts (holes, cut-outs) are subtracted.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can decompose any composite figure into non-overlapping basic shapes, correctly identify which areas to add or subtract, select and apply the appropriate area formula for each part (including Heron's formula, sector area, segment area), and compute the final area with correct units. The student can also solve inverse problems (e.g., find a missing dimension given the total area).
## SCOPE_BOUNDARY
Covers composite figures made from rectangles, triangles (right, scalene using Heron's formula), circles, sectors, and segments. Includes problems where a shape is cut out from another (subtraction) and where shapes are joined (addition). Does NOT cover 3D surface areas, calculus-based integration, or figures requiring trigonometric area formulas beyond Class 9 scope (e.g., area of triangle using 1/2 ab sin C).
## WALKTHROUGH
Imagine a school is designing a new badge: a rectangular strip 10 cm by 3 cm with a semicircular top of diameter 3 cm, and a triangular cut-out at the bottom for a pin. "How much metal is needed?" This real-world fabrication question forces decomposition. First, sketch the figure and label all given dimensions. Second, identify each distinct region: rectangle, semicircle (addition), triangle (subtraction). Third, recall the area formula for each from previous nodes (c9_math_ch6_4, c9_math_ch6_5, c9_math_ch6_9). Fourth, compute each area separately, watching for radius vs. diameter. Finally, combine: Total Area = Area_rectangle + Area_semicircle - Area_triangle. The key insight is that area is additive for non-overlapping regions, and subtraction handles removed material.
## DIAGNOSTIC_QUESTION_1
State the general rule for finding the area of a composite figure formed by joining a rectangle and a semicircle along one side, and then cutting out a right triangle from the opposite side.
## DIAGNOSTIC_ANSWER_1
The total area equals the area of the rectangle plus the area of the semicircle minus the area of the right triangle. A wrong answer (e.g., adding all three) reveals the student does not distinguish between added material (joining) and removed material (cutting out), treating all operations as addition.
## DIAGNOSTIC_QUESTION_2
A figure consists of a square of side 14 cm with a quadrant (quarter circle) of radius 14 cm drawn inside it, sharing two sides. A student claims the shaded area between the square and the quadrant is found by adding the area of the square and the area of the quadrant. Is this correct? Explain why or why not.
## DIAGNOSTIC_ANSWER_2
Incorrect. The quadrant lies inside the square, so the shaded region is the square minus the quadrant. Adding would give an area larger than the square itself, which is impossible for a part of the square. This error shows the student cannot visually determine set inclusion (which region contains which) and defaults to addition for any combination.
## DIAGNOSTIC_QUESTION_3
A rectangular sheet of metal 40 cm by 25 cm has four quarter-circles of radius 5 cm cut from its four corners. Find the area of the remaining sheet. (Use π = 3.14)
## DIAGNOSTIC_ANSWER_3
Step 1: Area of rectangle = 40 × 25 = 1000 cm².  
Step 2: Four quarter-circles = one full circle of radius 5 cm. Area = πr² = 3.14 × 25 = 78.5 cm².  
Step 3: Remaining area = 1000 - 78.5 = 921.5 cm².  
A wrong answer of 1078.5 cm² reveals the student added the cut-outs instead of subtracting. An answer of 1000 - 3.14×5 = 984.3 reveals using radius instead of radius squared.
## DIAGNOSTIC_QUESTION_4
Two composite figures have the same outer boundary: a square of side 20 cm. Figure A has a circular hole of radius 6 cm at the centre. Figure B has four quarter-circles of radius 6 cm cut from the four corners. Without calculating exact numerical values, determine which figure has the larger remaining area and justify your reasoning.
## DIAGNOSTIC_ANSWER_4
Figure B has larger remaining area. Both remove circular regions totalling one full circle of radius 6 cm (since four quarter-circles = one circle). However, in Figure A the circle is entirely inside the square (diameter 12 cm < side 20 cm). In Figure B, the quarter-circles at corners also fit (radius 6 cm < half side 10 cm). The removed area is identical (π×36). Since the original square is identical, the remaining areas are equal. A student claiming they differ reveals a misconception that corner cut-outs remove more/less area than a central hole of same total radius.
## DIAGNOSTIC_QUESTION_5
A student solves: "Find the area of a regular hexagon of side 10 cm with a circular hole of radius 3 cm at its centre." Their working:  
Area = 6 × (1/2 × 10 × 10) - π × 3² = 300 - 28.26 = 271.74 cm².  
Identify the conceptual error in the triangle area calculation and give the correct area. (Use √3 = 1.732, π = 3.14)
## DIAGNOSTIC_ANSWER_5
The student used 1/2 × side × side for the equilateral triangle, which assumes a right triangle with legs 10 cm. The correct area of an equilateral triangle is (√3/4) × side² = 0.433 × 100 = 43.3 cm². Hexagon area = 6 × 43.3 = 259.8 cm². Circle area = 28.26 cm². Correct remaining area = 231.54 cm². The error shows the student confuses the formula for a right isosceles triangle with that of an equilateral triangle.
## DIAGNOSTIC_QUESTION_6
Design a composite figure for a garden bed that uses exactly three different basic shapes (choose from rectangle, triangle, circle, sector, segment) and has a total area of exactly 150 m². Provide a labelled sketch (description), all dimensions, and the step-by-step area calculation proving the total is 150 m².
## DIAGNOSTIC_ANSWER_6
Example: A rectangle 10 m × 10 m = 100 m². An equilateral triangle of side 10 m attached to one side: area = (√3/4)×100 ≈ 43.3 m². A semicircle of radius 5 m cut out from the rectangle: area = ½×π×25 ≈ 39.25 m². Total = 100 + 43.3 - 39.25 = 104.05 m² (not 150). A correct answer must adjust dimensions to hit exactly 150. A poor answer uses random dimensions without verification or uses only two shapes. This tests synthesis and algebraic adjustment.
## COMMON_MISCONCEPTION
Students frequently use the diameter directly in the circle area formula (πd² instead of πr²) when a semicircle or quadrant is described by its diameter (e.g., "semicircle on side 14 cm"). They write Area = π × 14² instead of π × 7². Another pervasive error: when a sector is cut from a circle, they subtract the sector area from the circle area but forget the triangle part, confusing segment and sector. For example, "area of segment = area of sector" (omitting - area of triangle). This leads to overestimating the removed area.
## ON_FAILURE
If a student uses diameter in πr²: Draw a circle, label diameter d and radius r. Write r = d/2. Substitute: Area = π(d/2)² = πd²/4. Show that using d² gives 4× the correct area. Practice: "A semicircle on a side of 10 cm. Step 1: Radius = 5 cm. Step 2: Area = ½ × π × 5²." For segment confusion: Re-derive segment area = sector - triangle. Use a 90° sector in a circle of radius r: sector = πr²/4, triangle = r²/2. Segment = r²(π/4 - 1/2). Drill: "Identify if the shaded part is a sector or a segment. If it has a chord and arc, it's a segment; subtract the triangle."
## PREREQUISITE_NODE_IDS
c9_math_ch6_4, c9_math_ch6_5, c9_math_ch6_6, c9_math_ch6_8, c9_math_ch6_9, c9_math_ch6_10, c6_math_ch08_090, c8_math_ch14_9, c9_math_ch6_1, c9_math_ch6_2, c9_math_ch6_3, c9_math_ch6_7

## PREREQUISITE_REASONS
c9_math_ch6_4: Area of rectangle/parallelogram formulas for rectangular components.
c9_math_ch6_5: Area of triangle (base-height) for right triangles in composites.
c9_math_ch6_6: Heron's formula for scalene triangles when only sides are given.
c9_math_ch6_8: Area of full circle for circular holes or additions.
c9_math_ch6_9: Area of sector for partial circular regions.
c9_math_ch6_10: Area of segment for regions bounded by chord and arc.
c6_math_ch08_090: Class 6 introduction to composite shapes by adding/subtracting areas.
c8_math_ch14_9: Class 8 compound shapes using decomposition into triangles/rectangles.
c9_math_ch6_1: The perimeter of a plane figure is the total length of its boundary, calculated as the sum of  - earlier chapter node that this node's author flags as feeding into this content.
c9_math_ch6_2: The circumference of a circle is the perimeter or the total distance around the circle, given  - earlier chapter node that this node's author flags as feeding into this content.
c9_math_ch6_3: The arc length of a circle is the distance along the curved line forming a portion of the  - earlier chapter node that this node's author flags as feeding into this content.
c9_math_ch6_7: Heron's formula enables calculation of a triangle's area using only its three side lengths  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
c10_math_cbse_11_008, c10_math_cbse_11_010, c10_math_cbse_12_003, c10_math_cbse_12_010

## FORWARD_REASONS
c10_math_cbse_11_008: Covers composite plane figures formed by combining basic shapes (rectangles, triangles, circles, sectors); directly foundational for computing areas of combinations.
c10_math_cbse_11_010: Class 9 foundation on composite area problems (Heron's formula + circle areas), directly extended here.
c10_math_cbse_12_003: Teaches decomposition of composite 2D figures into basic shapes — the exact same strategy extended to 3D solids.
c10_math_cbse_12_010: Composite plane figures — 2D analogue of 3D combinations.

## CROSS_SUBJECT_PREREQS
c6_math_ch08_087, c6_math_ch08_088, c6_math_ch08_089, c8_math_ch14_1, c8_math_ch14_2, c8_math_ch14_3, c8_math_ch14_4, c8_math_ch14_5, c8_math_ch14_6
## CROSS_SUBJECT_REASONS
c6_math_ch08_087: Area of rectangles/squares foundation for rectangular parts.
c6_math_ch08_088: Area of triangles/parallelograms foundation for triangular parts.
c6_math_ch08_089: Area of circles foundation for circular parts.
c8_math_ch14_1: Rectangle area = length × width.
c8_math_ch14_2: Triangle area = ½ × base × height.
c8_math_ch14_3: Parallelogram area = base × height.
c8_math_ch14_4: Triangle area derived from parallelogram.
c8_math_ch14_5: Rhombus area using diagonals (special quadrilateral in composites).
c8_math_ch14_6: Trapezium area formula (another quadrilateral type in composites).
## CHAIN_DESCRIPTION
c9_math_ch6_4 -> c9_math_ch6_11 -> none
## THIS_FORMULA
Total Area = Σ (Area of added basic shapes) - Σ (Area of removed basic shapes)
## FORMULA_VARIABLES
Area of added basic shapes = areas of rectangles, triangles, circles, sectors, segments that are joined to form the figure.
Area of removed basic shapes = areas of holes, cut-outs, or overlapping regions that are subtracted.
## FORMULA_UNITS
Square units: cm², m², km², mm², etc.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c9_physics_ch2_3 | In physics, calculating the cross-sectional area of a composite wire (copper core + insulation) uses addition of circular areas.
c9_eco_ch1_2 | In economics, land revenue calculation for a plot comprising a rectangular field with a triangular pond and a circular well uses composite area subtraction.
## PREREQ_CONCEPT
Decomposition of a complex planar figure into a set of non-overlapping basic shapes (rectangles, triangles, circles, sectors, segments) whose area formulas are known.
## PREREQ_BEFORE
Student must independently compute areas of rectangles, triangles (using base-height and Heron's formula), circles, sectors, and segments.
## PREREQ_STUCK
If stuck on a specific shape's area, revisit that shape's node: sector area (c9_math_ch6_9), segment area (c9_math_ch6_10), or Heron's formula (c9_math_ch6_6).
## WORKED_EXAMPLE_1
PROBLEM: A window frame is shaped like a rectangle of length 2.5 m and breadth 1.2 m, with a semicircular top whose diameter equals the breadth of the rectangle. The frame is made of wood. Find the area of the wood used. (Use π = 3.14)
STEPS:
- Step 1: Identify the composite shapes: The wood forms a rectangle (2.5 m × 1.2 m) and a semicircle on top. The semicircle's diameter = breadth = 1.2 m, so radius = 0.6 m.
- Step 2: Write area formulas: Area_rectangle = length × breadth. Area_semicircle = ½ × π × radius².
- Step 3: Substitute values: Area_rectangle = 2.5 × 1.2 = 3.0 m². Area_semicircle = ½ × 3.14 × (0.6)² = 0.5 × 3.14 × 0.36 = 0.5652 m².
- Step 4: Add the areas (since the semicircle is added on top): Total area = 3.0 + 0.5652 = 3.5652 m².
- Step 5: Round to reasonable precision: 3.57 m² (or 3.565 m²).
REASONING: The window frame is a single piece of wood comprising two attached shapes. Their areas add because they do not overlap. The critical step is converting the given diameter (breadth) to radius for the circle formula.
ANSWER: 3.57 m² (approx)
## WORKED_EXAMPLE_2
PROBLEM: A rectangular cardboard 30 cm by 20 cm has a right triangular corner cut off. The cut is made from a point 8 cm from one vertex along the length and 6 cm from the same vertex along the breadth. Find the area of the remaining cardboard.
STEPS:
- Step 1: Visualize the figure: Rectangle 30 cm × 20 cm. A right triangle is removed from one corner. The legs of the triangle are 8 cm and 6 cm (along the sides of the rectangle).
- Step 2: Area of rectangle = 30 × 20 = 600 cm².
- Step 3: Area of removed right triangle = ½ × base × height = ½ × 8 × 6 = 24 cm².
- Step 4: Remaining area = Area_rectangle - Area_triangle = 600 - 24 = 576 cm².
- Step 5: Verify the triangle is indeed right-angled (the cut is along the sides, so yes) and that the legs are correctly identified from the description.
REASONING: The problem describes a subtraction composite. The rectangle is the original sheet; the triangle is the cut-out. The triangle's legs are given directly by the distances along the sides from the corner, so base-height formula applies directly.
ANSWER: 576 cm²
## WORKED_EXAMPLE_3
PROBLEM: A park is in the shape of a regular hexagon of side 12 m. At the centre of the park, a circular fountain of radius 4 m is built. The remaining area is to be covered with grass. Find the cost of grassing at ₹50 per m². (Use √3 = 1.732, π = 3.14)
STEPS:
- Step 1: Decompose the regular hexagon into 6 equilateral triangles of side 12 m.
- Step 2: Area of one equilateral triangle = (√3/4) × side² = (1.732/4) × 144 = 0.433 × 144 = 62.352 m².
- Step 3: Area of hexagon = 6 × 62.352 = 374.112 m².
- Step 4: Area of circular fountain = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 m².
- Step 5: Grass area = Hexagon area - Fountain area = 374.112 - 50.24 = 323.872 m².
- Step 6: Cost = Grass area × Rate = 323.872 × 50 = ₹16193.60.
REASONING: This combines polygon area (via triangle decomposition, linking to Heron's formula or equilateral triangle formula) with circle area subtraction. The regular hexagon's area is derived from 6 equilateral triangles, a standard geometric decomposition. The fountain is a central hole, so its area is subtracted. Finally, a unit rate multiplication gives the cost.
ANSWER: ₹16193.60
## COMPETENCY_QUESTION_1
QUESTION: A decorative floor tile is a square of side 30 cm. The design consists of four identical quadrants of radius 10 cm drawn at the four corners, and a circle of radius 5 cm at the centre. The quadrants and the central circle are shaded (coloured). Find the total shaded area. (Use π = 3.14)
COMPETENCY: Translating a verbal description of a composite figure into a mathematical decomposition and computing the sum of multiple added parts.
STEPS:
- Step 1: Understand the figure: Square (30 cm side) is the base. Four quadrants (radius 10 cm) at corners and one circle (radius 5 cm) at centre are shaded. They do not overlap.
- Step 2: Four quadrants = one full circle of radius 10 cm. Area = π × 10² = 3.14 × 100 = 314 cm².
- Step 3: Central circle radius 5 cm. Area = π × 5² = 3.14 × 25 = 78.5 cm².
- Step 4: Total shaded area = 314 + 78.5 = 392.5 cm².
- Step 5: Check that the shapes fit: Quadrant radius 10 cm ≤ half side 15 cm, so they fit without overlapping. Central circle radius 5 cm fits in the middle.
ANSWER: 392.5 cm²
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A running track has two straight parallel sections each 90 m long and two semicircular ends. The inner edge of the track measures 400 m in total. If the track is uniformly 7 m wide, find the area of the track surface. (Use π = 22/7)
COMPETENCY: Multi-step reasoning: using perimeter to find an unknown radius, then computing the area of a composite shape (rectangular strips + circular ring) as the difference between outer and inner boundaries.
STEPS:
- Step 1: Let inner radius of semicircles be r. Inner perimeter = 2 × 90 + 2πr = 400 → 180 + 2πr = 400 → 2πr = 220 → πr = 110 → r = 110/π = 110/(22/7) = 35 m.
- Step 2: Outer radius R = r + 7 = 42 m.
- Step 3: Area of track = Area of outer shape - Area of inner shape.
   Outer shape: Rectangle 90 m × 2R = 90 × 84 = 7560 m² plus full circle of radius R = πR².
   Inner shape: Rectangle 90 m × 2r = 90 × 70 = 6300 m² plus full circle of radius r = πr².
   Difference = (7560 - 6300) + π(R² - r²) = 1260 + π(R - r)(R + r).
- Step 4: R - r = 7, R + r = 77. π(R² - r²) = (22/7) × 7 × 77 = 22 × 77 = 1694 m².
- Step 5: Total track area = 1260 + 1694 = 2954 m².
ANSWER: 2954 m²
DIFFICULTY: hard
