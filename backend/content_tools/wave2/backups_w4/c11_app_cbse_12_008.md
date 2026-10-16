## ELI5
Imagine a parabolic satellite dish: the focus is where all signals converge, and the **latus rectum** is the width of the dish opening at that exact focal point. If the dish is "shallow" (large focal length $a$), the latus rectum $4a$ is wide, capturing more signal; if the dish is "deep" (small $a$), the latus rectum is narrow. The most common mix-up is confusing the **focal distance $a$** (vertex to focus) with the **latus rectum length $4a$** — they differ by a factor of 4, and using one for the other in application problems (like finding the width of a reflector) gives wildly wrong answers.

## DEFINITION
The **latus rectum** of a parabola is the chord passing through the focus and perpendicular to the axis of the parabola. Its **length** is a constant $4a$, where $a$ is the focal distance (distance from vertex to focus), and it determines the "width" or "openness" of the parabola at the focus for all four standard orientations $y^2 = \pm 4ax$ and $x^2 = \pm 4ay$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Identify the standard form of a given parabola equation and extract the value of $a$ correctly, including sign and orientation. (2) Compute the length of the latus rectum as $4|a|$ and state the coordinates of its endpoints for any standard parabola. (3) Apply this to real-world problems (e.g., parabolic reflectors, bridges, projectile arcs) by modelling the situation, finding $a$ from given dimensions, and using $4a$ to determine required widths or heights.

## SCOPE_BOUNDARY
This node covers the geometric definition, derivation, and length ($4a$) of the latus rectum for the four standard parabolas with vertex at origin and axes along coordinate axes ($y^2 = \pm 4ax$, $x^2 = \pm 4ay$). It includes finding endpoints coordinates and equations of the latus rectum. It does **NOT** cover shifted parabolas (vertex not at origin), rotated axes, or the general second-degree equation of a parabola — those are beyond the Class 11 Applied Mathematics scope.

## WALKTHROUGH
Start by asking: *"You are designing a parabolic solar cooker. The focus is where you place the cooking pot. How wide must the cooker be at the focus level to capture maximum sunlight?"* This width is exactly the latus rectum. Remind students that in the previous node (Parabola), we derived $y^2 = 4ax$ by setting focus at $(a,0)$ and directrix $x=-a$. Now, to find the width at the focus, substitute $x=a$ into the equation: $y^2 = 4a(a) = 4a^2 \Rightarrow y = \pm 2a$. The endpoints are $(a, 2a)$ and $(a, -2a)$, so the length is $4a$. Repeat this substitution logic for the other three standard forms ($y^2 = -4ax$, $x^2 = 4ay$, $x^2 = -4ay$) to show the length is always $4a$ (using $|a|$ for length). The key insight: **the latus rectum length depends ONLY on $a$; orientation changes the coordinates of endpoints and the equation of the latus rectum line, but never the length.**

Takeaway: mastery means deriving the latus rectum by substituting the focus's coordinate and interpreting 4a as the openness. Exam moves: find-the-latus-rectum questions on the solar-cooker scene. Check yourself: the chord through the focus perpendicular to the axis has endpoints at plus and minus 2a, so its length is 4a - the focal distance measured fourfold. Students miss it because the name sounds exotic, when the cooker's width shows the design: the wider the latus rectum, the shallower the dish and the gentler the curve - one number summarising the parabola's opening at its most useful place.

## DIAGNOSTIC_QUESTION_1
What is the length of the latus rectum of the parabola $y^2 = -12x$, and what are the coordinates of its endpoints?

## DIAGNOSTIC_ANSWER_1
The standard form is $y^2 = -4ax$ with $4a = 12 \Rightarrow a = 3$. Length of latus rectum = $4a = 12$ units. Since the parabola opens leftwards, focus is at $(-a, 0) = (-3, 0)$ and the latus rectum is vertical ($x = -3$). Endpoints: $(-3, 6)$ and $(-3, -6)$.  
A wrong answer (e.g., length $= 3$ or endpoints $(3, \pm 6)$) reveals the student either confuses $a$ with $4a$ or ignores the sign in the standard form, leading to incorrect focus coordinates and orientation.

## DIAGNOSTIC_QUESTION_2
A student claims: *"For the parabola $x^2 = 8y$, the latus rectum lies on the line $y = 2$ and has length 8."* Is this statement fully correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The statement is **correct**. For $x^2 = 4ay$, we have $4a = 8 \Rightarrow a = 2$. Focus is $(0, a) = (0, 2)$. The latus rectum is perpendicular to the axis (y-axis), so it is horizontal: equation $y = 2$. Endpoints satisfy $x^2 = 8(2) = 16 \Rightarrow x = \pm 4$, giving points $(-4, 2)$ and $(4, 2)$. Length = $4 - (-4) = 8 = 4a$.  
If a student says the length is 2 or the line is $x = 2$, they have confused the axis orientation (thinking it opens along x-axis) or swapped the roles of $x$ and $y$ in the standard form.

## DIAGNOSTIC_QUESTION_3
A parabolic reflector (cross-section $y^2 = 4ax$) has a diameter of 20 cm at its opening and is 5 cm deep. Find the length of its latus rectum and the distance of the focus from the vertex.

## DIAGNOSTIC_ANSWER_3
Place vertex at origin, axis along +x. Depth = 5 cm means the opening is at $x = 5$. Diameter = 20 cm means half-width $y = 10$ at $x = 5$. Point $(5, 10)$ lies on parabola: $10^2 = 4a(5) \Rightarrow 100 = 20a \Rightarrow a = 5$ cm. Focus distance from vertex = $a = 5$ cm. Length of latus rectum = $4a = 20$ cm.  
A wrong answer (e.g., $a = 20$ or latus rectum = 5) shows the student either used diameter instead of radius for $y$, or confused depth with focal length, or mis-identified which variable corresponds to the given dimensions.

## DIAGNOSTIC_QUESTION_4
Compare the latus rectum of $y^2 = 4ax$ and $x^2 = 4ay$ for the same $a > 0$. How do their **equations**, **endpoints**, and **orientation relative to the axes** differ? What remains the same?

## DIAGNOSTIC_ANSWER_4
For $y^2 = 4ax$ (opens right): Focus $(a,0)$, axis = x-axis, latus rectum is vertical line $x = a$, endpoints $(a, \pm 2a)$.  
For $x^2 = 4ay$ (opens up): Focus $(0,a)$, axis = y-axis, latus rectum is horizontal line $y = a$, endpoints $(\pm 2a, a)$.  
**Same**: Length = $4a$, both pass through focus, both perpendicular to respective axis.  
**Different**: Equation of latus rectum ($x=a$ vs $y=a$), coordinates of endpoints (swapped $x,y$ with signs), orientation (vertical vs horizontal).  
If a student says endpoints are same or equations are same, they have not internalized how swapping $x$ and $y$ rotates the parabola 90° and swaps the roles of coordinates.

## DIAGNOSTIC_QUESTION_5
In a suspension bridge, the cable forms a parabola $x^2 = 4ay$ (vertex at lowest point). The towers are 200 m apart and 30 m above the roadway. The cable is 5 m above the roadway at the centre. A student calculates $a = 500$ and claims the latus rectum length is 2000 m. Evaluate this claim and find the correct length if the claim is wrong.

## DIAGNOSTIC_ANSWER_5
The claim is **incorrect**. The vertex is at the lowest point, 5 m above roadway. Towers are 30 m above roadway, so vertical distance from vertex to tower attachment = $30 - 5 = 25$ m. Horizontal distance from centre to tower = $200/2 = 100$ m. Point on parabola: $(100, 25)$. Substitute into $x^2 = 4ay$: $10000 = 4a(25) \Rightarrow a = 100$. Length of latus rectum = $4a = 400$ m.  
The student’s error: they likely used the tower height (30 m) as the y-coordinate instead of the height **relative to the vertex** (25 m), and/or used the full span (200 m) as x instead of half-span (100 m). This reveals a failure to set up the coordinate system correctly relative to the vertex.

## DIAGNOSTIC_QUESTION_6
Design a real-world problem (with numbers) where a parabolic arch or reflector requires finding the latus rectum length, but the given data does **not** directly give $a$. The solver must first find $a$ from geometric constraints. Provide the problem statement and the solution steps.

## DIAGNOSTIC_ANSWER_6
**Problem**: A parabolic arch bridge has a span of 40 m. The height of the arch at a distance of 5 m from one end is 6 m. Find the maximum height of the arch and the length of the latus rectum.  
**Solution**: Place vertex at maximum height (origin), axis vertical downward: $x^2 = -4ay$. Span 40 m $\Rightarrow$ ends at $(\pm 20, -H)$ where $H$ = max height. Point 5 m from end: $x = 20 - 5 = 15$ (or $-15$), height = $H - 6$ $\Rightarrow$ y-coordinate = $-(H-6)$. But we don't know $H$ yet. Better: set roadway as x-axis, vertex at $(0, H)$. Then parabola: $x^2 = -4a(y - H)$. Ends: $(\pm 20, 0)$. Point: $(15, 6)$. Substitute ends: $400 = -4a(0 - H) = 4aH$. Substitute point: $225 = -4a(6 - H) = 4a(H - 6)$. Divide: $400/225 = H/(H-6) \Rightarrow 16/9 = H/(H-6) \Rightarrow 16H - 96 = 9H \Rightarrow 7H = 96 \Rightarrow H = 96/7 \approx 13.71$ m. Then $4a = 400/H = 400 \times 7/96 = 175/6 \approx 29.17$ m. Latus rectum = $4a = 175/6$ m.  
A poor answer would assume vertex at road level or misuse the coordinate shift, showing inability to model shifted parabolas (though shifted vertex is not in scope, the *concept* of relative coordinates is essential).

## COMMON_MISCONCEPTION
Students often believe **"the latus rectum is the same as the focal length"** or **"the latus rectum endpoints are $(\pm a, \pm 2a)$ for all parabolas"**. Specifically: (1) They write length = $a$ instead of $4a$, forgetting the factor 4 comes from substituting $x=a$ into $y^2=4ax$ giving $y^2=4a^2$. (2) They memorize endpoints for $y^2=4ax$ as $(a, \pm 2a)$ but then apply the *same coordinates* to $x^2=4ay$ or $y^2=-4ax$ without adjusting for axis orientation and focus position. For example, for $x^2=4ay$, they write endpoints as $(a, \pm 2a)$ instead of $(\pm 2a, a)$. This happens because they rote-memorize one case instead of deriving via "substitute focus coordinate into equation".

## ON_FAILURE
If a student makes the above errors:  
1. **Force derivation every time**: "Don't recall — re-derive. For any standard parabola, write its equation, write focus coordinates, write the line through focus perpendicular to axis (that's the latus rectum line), substitute that line's equation into the parabola, solve for the other coordinate. The distance between the two solutions is the length."  
2. **Use a table**: Make a 4-row table for the four standard forms with columns: Equation, Focus, Axis, Latus Rectum Line, Endpoints, Length. Fill it by deriving each row once.  
3. **Drill with sign variations**: Give 5 rapid-fire equations ($y^2=12x$, $y^2=-8x$, $x^2=20y$, $x^2=-16y$, $3y^2=12x$) and ask for $a$, focus, latus rectum length, endpoints, equation of latus rectum — all in 2 minutes. Immediate feedback on each.

## PREREQUISITE_NODE_IDS
c11_app_cbse_12_007

## PREREQUISITE_REASONS
c11_app_cbse_12_007: The Parabola node defines the standard forms ($y^2 = \pm 4ax$, $x^2 = \pm 4ay$), focus, directrix, axis, and vertex — all essential to derive the latus rectum. Without knowing how $a$ relates to the focus and the equation, the student cannot extract $a$ or locate the focus to construct the latus rectum.

## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none: No prior class nodes are available for cross-subject links in Applied Mathematics.

## CHAIN_DESCRIPTION
c11_app_cbse_12_007 -> c11_app_cbse_12_008 -> none

## THIS_FORMULA
Length of Latus Rectum = $4a$ (where $a$ is the focal distance, i.e., distance from vertex to focus). For standard parabolas: $y^2 = 4ax \Rightarrow$ LR length $= 4a$, endpoints $(a, \pm 2a)$, equation $x = a$; $y^2 = -4ax \Rightarrow$ LR length $= 4a$, endpoints $(-a, \pm 2a)$, equation $x = -a$; $x^2 = 4ay \Rightarrow$ LR length $= 4a$, endpoints $(\pm 2a, a)$, equation $y = a$; $x^2 = -4ay \Rightarrow$ LR length $= 4a$, endpoints $(\pm 2a, -a)$, equation $y = -a$.

## FORMULA_VARIABLES
$a$ = focal distance (distance from vertex to focus), always taken as positive for length calculations; sign of $a$ in equation determines orientation. Coordinates of endpoints depend on orientation.

## FORMULA_UNITS
Length of latus rectum is in linear units (cm, m, etc.) same as the units of $a$ and the coordinate axes.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_12_007 | The Parabola node provides the geometric definition (focus-directrix property) and standard equations from which the latus rectum is derived by substituting the focus coordinate.  
c11_app_cbse_12_005 | The Circle node introduces the concept of "latus rectum" by analogy: just as the diameter is the chord through the centre perpendicular to... wait, circle has no latus rectum. But the idea of a *characteristic chord* (diameter for circle, latus rectum for parabola) that defines the "width" at a key point is a cross-concept link in conic sections.

## PREREQ_CONCEPT
The student must know the four standard equations of a parabola with vertex at origin, the coordinates of the focus for each, and the orientation of the axis.

## PREREQ_BEFORE
Before starting this node, the student must be able to: given a parabola equation like $y^2 = -16x$, identify it as $y^2 = -4ax$, extract $a = 4$, state the focus is $(-4, 0)$, and the axis is the x-axis.

## PREREQ_STUCK
If stuck, review the "Parabola" node (c11_app_cbse_12_007) — specifically the derivation of $y^2 = 4ax$ from focus $(a,0)$ and directrix $x=-a$, and the symmetry observations for the four standard forms.

## WORKED_EXAMPLE_1
PROBLEM: A satellite dish has a parabolic cross-section with its vertex at the origin and axis along the positive x-axis. The dish is 4 metres wide at the opening and 1 metre deep. Find the position of the focus (where the receiver should be placed) and the length of the latus rectum (width of the dish at the focus level).  
STEPS:  
- Step 1: Model the parabola. Vertex at (0,0), opens right $\Rightarrow$ equation $y^2 = 4ax$. Depth = 1 m means the opening is at $x = 1$. Width = 4 m means at $x = 1$, $y = \pm 2$. So point $(1, 2)$ lies on the parabola.  
- Step 2: Substitute $(1, 2)$ into $y^2 = 4ax$: $2^2 = 4a(1) \Rightarrow 4 = 4a \Rightarrow a = 1$.  
- Step 3: Focus is at $(a, 0) = (1, 0)$. So the receiver should be placed 1 metre from the vertex along the axis.  
- Step 4: Length of latus rectum = $4a = 4 \times 1 = 4$ metres. This is the width of the dish at the focus level ($x = 1$).  
- Step 5: Verify: At focus $x = 1$, $y^2 = 4(1)(1) = 4 \Rightarrow y = \pm 2$. Endpoints $(1, 2)$ and $(1, -2)$, distance = 4 m. Matches given opening width because in this case depth = focal length.  
REASONING: The problem gives geometric dimensions (depth, width at opening) which correspond to coordinates of a point on the parabola. Substituting that point yields $a$, which directly gives both the focus position and the latus rectum length. The latus rectum length $4a$ is a fixed property of the parabola once $a$ is known.  
ANSWER: Focus at (1, 0) i.e., 1 m from vertex; Length of latus rectum = 4 m.

## WORKED_EXAMPLE_2
PROBLEM: The main cable of a suspension bridge forms a parabola with its vertex at the lowest point, 5 m above the roadway. The towers are 200 m apart and 30 m high above the roadway. Find the length of the latus rectum of the parabola and the height of the cable at a point 30 m from the centre of the bridge.  
STEPS:  
- Step 1: Set up coordinates. Vertex at lowest point $\Rightarrow$ place vertex at $(0, 5)$ (5 m above roadway). Axis vertical $\Rightarrow$ parabola opens upward: $x^2 = 4a(y - 5)$. (Standard form shifted up by 5).  
- Step 2: Towers are 200 m apart $\Rightarrow$ horizontal distance from centre to tower = 100 m. Tower height = 30 m above roadway $\Rightarrow$ y-coordinate at tower = 30. So point $(100, 30)$ lies on parabola.  
- Step 3: Substitute $(100, 30)$: $100^2 = 4a(30 - 5) \Rightarrow 10000 = 4a(25) \Rightarrow 10000 = 100a \Rightarrow a = 100$.  
- Step 4: Length of latus rectum = $4a = 400$ m. (This is the width of the cable parabola at the focus level, $y = 5 + a = 105$ m above roadway — not physically meaningful but mathematically defined).  
- Step 5: Height at 30 m from centre: $x = 30$. Find $y$: $30^2 = 4(100)(y - 5) \Rightarrow 900 = 400(y - 5) \Rightarrow y - 5 = 900/400 = 2.25 \Rightarrow y = 7.25$ m above roadway.  
REASONING: The vertex is not at the origin, so we use the shifted form $(x - h)^2 = 4a(y - k)$ with $(h,k) = (0,5)$. The value $a$ is extracted from the tower coordinates. The latus rectum length $4a$ is invariant under translation. The height at a given horizontal distance is found by substituting $x$ into the equation.  
ANSWER: Length of latus rectum = 400 m; Height of cable 30 m from centre = 7.25 m above roadway.

## WORKED_EXAMPLE_3
PROBLEM: A parabolic reflector for a car headlight has the equation $y^2 = 12x$ (units in cm). The bulb is placed at the focus. A mechanic claims that the width of the reflector at the bulb level is 6 cm. Is the mechanic correct? If not, what is the correct width? Also, find the equation of the directrix and the coordinates of the endpoints of the latus rectum.  
STEPS:  
- Step 1: Identify standard form. $y^2 = 12x = 4(3)x \Rightarrow a = 3$. Parabola opens right.  
- Step 2: Focus = $(a, 0) = (3, 0)$. Bulb is at $(3, 0)$.  
- Step 3: Latus rectum is chord through focus perpendicular to axis (x-axis) $\Rightarrow$ vertical line $x = 3$.  
- Step 4: Find endpoints: substitute $x = 3$ into $y^2 = 12x \Rightarrow y^2 = 36 \Rightarrow y = \pm 6$. Endpoints: $(3, 6)$ and $(3, -6)$.  
- Step 5: Length of latus rectum = distance between endpoints = $6 - (-6) = 12$ cm. Mechanic said 6 cm — incorrect; he likely used $a$ or $2a$ instead of $4a$.  
- Step 6: Directrix is $x = -a = -3$. Equation: $x + 3 = 0$.  
REASONING: The latus rectum width is found by intersecting the parabola with the vertical line through the focus. The length is always $4a = 12$ cm for this parabola. The mechanic confused the semi-latus rectum ($2a = 6$ cm, i.e., distance from focus to one endpoint) with the full length.  
ANSWER: Mechanic is incorrect; correct width (latus rectum length) = 12 cm. Endpoints: $(3, 6)$ and $(3, -6)$. Directrix: $x = -3$.

## COMPETENCY_QUESTION_1
QUESTION: A parabolic arch is 10 m high at the centre and 20 m wide at the base. A horizontal beam is to be placed across the arch at a height of 6 m from the base. Find the length of this beam. (Hint: Model the arch as a parabola with vertex at the top).  
COMPETENCY: Mathematical modelling and application of parabola geometry to a real-world structure.  
STEPS:  
- Step 1: Set coordinate system. Place vertex at top centre $(0, 10)$, axis vertical downward $\Rightarrow$ equation $x^2 = -4a(y - 10)$.  
- Step 2: Base is 20 m wide at height 0 (ground). So points $(\pm 10, 0)$ lie on parabola. Substitute $(10, 0)$: $100 = -4a(0 - 10) = 40a \Rightarrow a = 2.5$.  
- Step 3: Beam at height 6 m from base $\Rightarrow y = 6$. Substitute into $x^2 = -4(2.5)(6 - 10) = -10(-4) = 40 \Rightarrow x = \pm \sqrt{40} = \pm 2\sqrt{10}$.  
- Step 4: Length of beam = distance between $x = -2\sqrt{10}$ and $x = 2\sqrt{10}$ = $4\sqrt{10} \approx 12.65$ m.  
ANSWER: Length of beam = $4\sqrt{10}$ m (approx. 12.65 m).  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A water fountain jet follows a parabolic path. The jet reaches a maximum height of 4 m at a horizontal distance of 0.5 m from the vertical line through the nozzle (origin). The nozzle is at ground level (0,0). Find the height of the jet at a horizontal distance of 0.75 m from the nozzle. Also, determine the length of the latus rectum of this parabolic trajectory.  
COMPETENCY: Multi-step modelling: identifying vertex not at origin, using symmetry, extracting $a$, then computing both a specific height and a geometric property (latus rectum).  
STEPS:  
- Step 1: Vertex is at maximum height: $(0.5, 4)$. Axis is vertical. Parabola opens downward. Equation: $(x - 0.5)^2 = -4a(y - 4)$.  
- Step 2: Nozzle at $(0, 0)$ lies on parabola. Substitute: $(0 - 0.5)^2 = -4a(0 - 4) \Rightarrow 0.25 = 16a \Rightarrow a = 0.25/16 = 1/64$.  
- Step 3: Equation: $(x - 0.5)^2 = -4(1/64)(y - 4) = -(1/16)(y - 4)$.  
- Step 4: Height at $x = 0.75$: $(0.75 - 0.5)^2 = -(1/16)(y - 4) \Rightarrow (0.25)^2 = -(1/16)(y - 4) \Rightarrow 0.0625 = -(1/16)(y - 4) \Rightarrow y - 4 = -1 \Rightarrow y = 3$ m.  
- Step 5: Length of latus rectum = $4a = 4 \times (1/64) = 1/16 = 0.0625$ m = 6.25 cm.  
ANSWER: Height at 0.75 m = 3 m; Length of latus rectum = 0.0625 m (6.25 cm).  
DIFFICULTY: hard