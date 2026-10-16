## ELI5
Imagine a satellite dish or a car headlight — they both have a curved, bowl-like shape called a parabola. The magic of this shape is that if you put a light bulb exactly at the **focus** (a special point inside the curve), the light rays bounce off the curved surface and travel out perfectly parallel, creating a strong beam. Conversely, incoming parallel signals (like satellite TV) hit the dish and all reflect to that exact same focus point where the receiver sits. The most common mix-up: students think the **vertex** (the tip of the curve) and the **focus** are the same point, but the focus is always *inside* the curve, a specific distance 'a' away from the vertex.

## DEFINITION
A parabola is the set of all points in a plane that are equidistant from a fixed point (the **focus**) and a fixed line (the **directrix**); the line through the focus perpendicular to the directrix is the **axis**, and the midpoint of the perpendicular segment from the focus to the directrix is the **vertex**.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to derive the standard equation of a parabola (e.g., $y^2 = 4ax$) from the focus-directrix definition, identify the coordinates of the focus, vertex, equation of directrix, axis, and length of latus rectum for any standard parabola, and solve application problems involving parabolic reflectors, arches, or projectile paths by modelling them with the correct standard equation.

## SCOPE_BOUNDARY
This node covers the geometric definition of a parabola, derivation and properties of the four standard forms ($y^2 = \pm 4ax$, $x^2 = \pm 4ay$) with vertex at the origin, and real-world application problems (reflectors, arches, bridges). It does **NOT** cover parabolas with vertex at $(h,k)$ (shifting of origin), parametric equations, tangents/normals, or the general second-degree equation of a conic — these are beyond the Class 11 Applied Mathematics NCERT scope.

## WALKTHROUGH
Have you ever noticed the curved shape of a flashlight reflector or a satellite dish and wondered why it’s *exactly* that shape and not a semicircle? Let’s start with a real-world puzzle: *A satellite dish is 10 meters wide at the opening and 2 meters deep at the center. Where exactly should the receiver be placed to catch all signals?* To solve this, we first define the curve mathematically using the focus-directrix property: every point on the dish is equidistant from the receiver (focus) and a virtual line behind the dish (directrix). We place the vertex at the origin and the axis along the x-axis to get the simplest equation $y^2 = 4ax$. Then we use the given dimensions (width/depth) as coordinates of a point on the curve to find the value of 'a', which directly gives the focus location. The key insight is that **'a' is the focal length** — the distance from vertex to focus — and it completely determines the "sharpness" or "flatness" of the parabola; once you find 'a', every geometric property (directrix, latus rectum, focus) is known.

Takeaway: mastery means setting up the focus-directrix distance equation and fitting a real dish to it. Exam moves: find-the-focus questions on the satellite scene. Check yourself: width and depth fix the parameter, and the receiver's position falls straight out - all parallel rays meet at the focus. Students miss it because the parabola looks like a stretched U, when the satellite dish shows the design: equidistance from point and line is the definition, and the engineering payoff is that same geometry read backwards.

## DIAGNOSTIC_QUESTION_1
State the geometric definition of a parabola and name the fixed point and fixed line involved.

## DIAGNOSTIC_ANSWER_1
A parabola is the set of all points in a plane equidistant from a fixed point called the **focus** and a fixed line called the **directrix**. A wrong answer (e.g., "equidistant from two points" or "equidistant from a point and a circle") reveals the student is confusing the parabola with an ellipse (two foci) or a circle (single center), indicating a lack of clarity on the fundamental locus definition that distinguishes conic sections.

## DIAGNOSTIC_QUESTION_2
For the parabola $y^2 = 12x$, a student claims the focus is at $(3,0)$ and the directrix is $x = -3$. Another student says the focus is at $(0,3)$ and directrix is $y = -3$. Who is correct, and why is the other student wrong?

## DIAGNOSTIC_ANSWER_2
The first student is correct. Comparing $y^2 = 12x$ with $y^2 = 4ax$ gives $4a = 12 \Rightarrow a = 3$. Since the equation has $y^2$ and positive $x$, the axis is the x-axis, focus is $(a,0) = (3,0)$, and directrix is $x = -a = -3$. The second student incorrectly assumes the axis is the y-axis (confusing $y^2 = 4ax$ with $x^2 = 4ay$), a classic error caused by memorising formulas without linking the squared variable to the axis of symmetry.

## DIAGNOSTIC_QUESTION_3
A parabolic arch bridge has its vertex at the highest point, 10 m above the road. The span (width at road level) is 40 m. Find the height of the arch 5 m from the center (vertex) towards one end.

## DIAGNOSTIC_ANSWER_3
**Steps:**
1. Vertex at origin $(0,0)$, axis vertical downward $\Rightarrow$ equation $x^2 = -4ay$.
2. Road level is $y = -10$. Span 40 m $\Rightarrow$ ends at $(\pm 20, -10)$.
3. Substitute $(20, -10)$: $20^2 = -4a(-10) \Rightarrow 400 = 40a \Rightarrow a = 10$.
4. Equation: $x^2 = -40y$.
5. At $x = 5$ (5 m from center): $25 = -40y \Rightarrow y = -25/40 = -0.625$ m.
6. Height above road $= 10 - 0.625 = 9.375$ m.
A wrong answer (e.g., using $y^2 = 4ax$ or getting $a$ negative) reveals the student cannot translate the physical description (vertex at top, opening downward) into the correct standard form ($x^2 = -4ay$) and sign convention for 'a'.

## DIAGNOSTIC_QUESTION_4
Compare the parabolas $y^2 = 8x$ and $x^2 = 8y$. How do their axes, foci, directrices, and latus rectum lengths differ? What single parameter controls the "width" of the opening in both cases?

## DIAGNOSTIC_ANSWER_4
For $y^2 = 8x$: $4a=8 \Rightarrow a=2$. Axis: x-axis ($y=0$), Focus: $(2,0)$, Directrix: $x=-2$, Latus Rectum (LR) $= 8$, endpoints $(2, \pm 4)$.
For $x^2 = 8y$: $4a=8 \Rightarrow a=2$. Axis: y-axis ($x=0$), Focus: $(0,2)$, Directrix: $y=-2$, LR $= 8$, endpoints $(\pm 4, 2)$.
The **latus rectum length ($4a$)** is the same (8 units), controlling the "width" of the opening at the focus. The difference is **orientation**: the first opens right, the second opens up. A wrong answer swapping axes or foci reveals the student does not associate the squared variable ($y^2$ vs $x^2$) with the axis of symmetry.

## DIAGNOSTIC_QUESTION_5
A student argues: "For the parabola $y^2 = -16x$, the focus is at $(-4,0)$ and the directrix is $x = 4$. Since the focus has a negative x-coordinate, the parabola opens to the left. But the latus rectum length is $-16$ because $4a = -16$." Evaluate this statement and correct any errors.

## DIAGNOSTIC_ANSWER_5
The student is **partially correct but makes a critical error on the latus rectum length**.
- Correct: $4a = -16 \Rightarrow a = -4$. Focus $(-4,0)$, Directrix $x=4$, opens left.
- **Error**: Latus Rectum length is **always positive** ($|4a| = 16$). Length cannot be negative. The parameter 'a' can be negative (indicating direction), but $4a$ in the formula $y^2 = 4ax$ represents the *signed* coefficient; the geometric length is $|4a|$.
This reveals the misconception that algebraic sign carries over directly to geometric magnitude. Students must distinguish between the *directed distance* 'a' and the *absolute length* of the latus rectum.

## DIAGNOSTIC_QUESTION_6
Design a real-world problem (Indian context) where a parabolic shape is used, specifying all dimensions needed to find the focus. Write the problem statement only (do not solve it).

## DIAGNOSTIC_ANSWER_6
**Example Problem:** *"A solar cooker at a community kitchen in Rajasthan uses a parabolic reflector to concentrate sunlight. The reflector is 1.5 meters in diameter at the rim and 30 cm deep at the center. The cooking pot is placed at the focus. How far from the vertex (center bottom) should the pot holder be fixed?"*
A good answer provides a clear physical scenario (solar cooker, satellite dish, highway headlight), gives diameter/width and depth (or two points on the curve), and asks for the focal distance. A poor answer (e.g., "find focus of $y^2=4x$") is just a math drill, showing the student cannot *create* a model from a physical situation — a key competency in Applied Mathematics.

## COMMON_MISCONCEPTION
**Misconception:** *The vertex and the focus are the same point, or the focus lies on the directrix.*
**Why it happens:** In the diagram of $y^2 = 4ax$, the vertex is at $(0,0)$ and focus at $(a,0)$. Students see both on the x-axis and often confuse "midpoint of ZF" (vertex) with "point F" (focus) during the derivation. They also confuse the definition: "equidistant from focus and directrix" applies to points *on the parabola*, not to the vertex itself (vertex is distance 'a' from both). A concrete error: For $y^2 = 12x$, writing Vertex = $(3,0)$ and Focus = $(0,0)$, or stating the directrix passes through the focus. This breaks the fundamental geometry: the focus is *inside* the curve, the directrix is *outside*, and the vertex is exactly halfway between them.

## ON_FAILURE
1. **Re-derive visually:** Draw the standard parabola $y^2 = 4ax$ step-by-step: mark Origin O, Focus F(a,0), Directrix x=-a, Point Z(-a,0). Show O is midpoint of ZF. Label distances: OF = a, OZ = a. Ask: "Is O the focus? No, F is. Is O on the directrix? No, directrix is at x=-a."
2. **Focus-Directrix Distance Drill:** Give 5 equations (e.g., $x^2 = -12y$, $y^2 = 20x$). For each, student must state: Vertex, Focus, Directrix, Axis, LR Length — **in a table**. Force writing "LR = |4a| = [positive number]".
3. **Physical Analogy:** Use a torch/flashlight. "The bulb is the focus. The shiny curved surface is the parabola. The vertex is the *deepest point* of the reflector. The bulb sits *in front* of that deepest point, not *at* it." Connect 'a' to the physical distance from the bulb to the reflector's bottom.

## PREREQUISITE_NODE_IDS
c11_app_cbse_12_001, c11_app_cbse_12_004, c11_app_cbse_12_005

## PREREQUISITE_REASONS
c11_app_cbse_12_001: Understanding the equation of a straight line (directrix, axis, latus rectum are all lines) and distance from a point to a line is essential for the focus-directrix derivation.
c11_app_cbse_12_004: Mastery of various forms of line equations (especially intercept form, normal form, and perpendicular distance formula) is required to derive and manipulate the parabola's geometric properties.
c11_app_cbse_12_005: The concept of a locus (set of points satisfying a condition) introduced in the Circle node is the direct prerequisite; the parabola is the next conic section defined by a locus condition (PF = PM).

## FORWARD_NODE_IDS
c11_app_cbse_12_008

## FORWARD_REASONS
c11_app_cbse_12_008: The Length of the Latus Rectum node directly builds on the definition of latus rectum introduced here (chord through focus perpendicular to axis) and requires the standard equations ($y^2=4ax$ etc.) and parameter 'a' established in this node to compute the length $4a$.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_12_005 -> c11_app_cbse_12_007 -> c11_app_cbse_12_008

## THIS_FORMULA
Standard Equations of Parabola (Vertex at Origin):
1. $y^2 = 4ax$ (Opens Right, $a>0$)
2. $y^2 = -4ax$ (Opens Left, $a>0$)
3. $x^2 = 4ay$ (Opens Up, $a>0$)
4. $x^2 = -4ay$ (Opens Down, $a>0$)

## FORMULA_VARIABLES
- $x, y$: Coordinates of any point P on the parabola.
- $a$: Focal length (distance from Vertex to Focus, and Vertex to Directrix). $a > 0$ in standard forms; sign in equation indicates direction.
- Focus coordinates: $(a,0), (-a,0), (0,a), (0,-a)$ respectively.
- Directrix equations: $x = -a, x = a, y = -a, y = a$ respectively.
- Axis equations: $y = 0, y = 0, x = 0, x = 0$ respectively.
- Latus Rectum Length: $|4a|$ (always positive).
- Latus Rectum Endpoints: $(a, \pm 2a), (-a, \pm 2a), (\pm 2a, a), (\pm 2a, -a)$ respectively.

## FORMULA_UNITS
- $x, y, a$: Length units (metres, cm, etc. — consistent within a problem).
- Latus Rectum Length: Same length unit.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_ch03_motion_in_a_plane | Projectile motion under gravity (neglecting air resistance) follows a parabolic trajectory $y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}$, which is an inverted parabola ($x^2 = -4ay$ form). The focus and directrix have physical interpretations in terms of energy and initial velocity.
c11_phy_ch07_optics | Parabolic mirrors are used in telescopes, headlights, and solar furnaces because rays parallel to the axis reflect through the focus (or vice versa). The property $PF = PM$ is the geometric basis for the law of reflection on a parabolic surface.

## PREREQ_CONCEPT
Locus definition of a curve (from Circle: set of points at constant distance from a fixed point) and distance formula between a point and a line.

## PREREQ_BEFORE
Student must be able to write the equation of a line (directrix, axis), calculate perpendicular distance from a point to a line, and apply the distance formula between two points — all to set up $PF = PM$.

## PREREQ_STUCK
If stuck, review the derivation of the circle equation $(x-h)^2 + (y-k)^2 = r^2$ from the locus definition (Circle node), then replace "distance to fixed point = constant" with "distance to fixed point = distance to fixed line".

## WORKED_EXAMPLE_1
PROBLEM: A satellite dish has a parabolic cross-section. The dish is 4 metres wide at the opening and 0.5 metres deep at the vertex. The receiver is to be placed at the focus. How far from the vertex (along the axis) should the receiver be fixed?
STEPS:
- Step 1: Choose coordinate axes. Place the vertex of the parabola at the origin O(0,0). Since the dish opens to the right (signals come from the right and reflect to focus), the axis is the positive x-axis. The standard equation is $y^2 = 4ax$ ($a>0$).
- Step 2: Interpret dimensions. "4 m wide at opening" means the latus rectum width is not given directly; rather, the rim is a vertical line segment at the depth. "0.5 m deep" means the distance from vertex to the plane of the rim along the axis is 0.5 m. So the rim lies on the line $x = 0.5$. The half-width is $4/2 = 2$ m. Thus, a point on the parabola at the rim is $P(0.5, 2)$.
- Step 3: Substitute point P into the equation to find 'a'. $y^2 = 4ax \Rightarrow (2)^2 = 4a(0.5) \Rightarrow 4 = 2a \Rightarrow a = 2$.
- Step 4: State the focus coordinates. Focus is at $(a, 0) = (2, 0)$.
- Step 5: Interpret the result. The receiver should be placed **2 metres from the vertex** along the axis of the dish.
REASONING: The key is correctly mapping the physical "depth" to the x-coordinate and "half-width" to the y-coordinate of a point on the curve. The standard form $y^2 = 4ax$ assumes the vertex is at the origin and the axis is the x-axis. The parameter 'a' is exactly the focal length (vertex-to-focus distance), which is the required answer.
ANSWER: The receiver should be fixed 2 metres from the vertex along the axis.

## WORKED_EXAMPLE_2
PROBLEM: An arch is in the shape of a parabola with its axis vertical. The arch is 10 m high and 8 m wide at the base. How wide is the arch 2 m from the vertex (measured vertically downwards)?
STEPS:
- Step 1: Set up coordinates. Vertex at the highest point = Origin O(0,0). Axis is vertical downward $\Rightarrow$ negative y-axis. The parabola opens downward. Standard equation: $x^2 = -4ay$ ($a>0$).
- Step 2: Use base dimensions to find 'a'. Base is 10 m below vertex $\Rightarrow y = -10$. Width is 8 m $\Rightarrow$ half-width $x = \pm 4$. Point on parabola: $Q(4, -10)$.
- Step 3: Substitute Q into equation. $x^2 = -4ay \Rightarrow 4^2 = -4a(-10) \Rightarrow 16 = 40a \Rightarrow a = 16/40 = 0.4$ m.
- Step 4: Write specific equation. $x^2 = -4(0.4)y = -1.6y$.
- Step 5: Find width at 2 m from vertex (i.e., $y = -2$). Substitute $y = -2$: $x^2 = -1.6(-2) = 3.2 \Rightarrow x = \pm\sqrt{3.2} = \pm 1.788...$ m.
- Step 6: Calculate total width. Width $= 2 \times |x| = 2 \times 1.788... \approx 3.58$ m.
REASONING: The vertex is at the top (maximum height), so the parabola opens downward ($x^2 = -4ay$). The "base" gives a point to solve for 'a'. The question asks for width at a specific vertical distance from the vertex, which translates directly to a specific y-coordinate. The parameter 'a' determines the curvature; a smaller 'a' means a "sharper" or narrower parabola for a given height.
ANSWER: The width of the arch 2 m from the vertex is approximately 3.58 m.

## WORKED_EXAMPLE_3
PROBLEM: A suspension bridge cable hangs in the form of a parabola. The roadway is horizontal and 100 m long between the two towers. The tops of the towers are 30 m above the roadway. The lowest point of the cable (vertex) is 5 m above the roadway at the center of the bridge. Find the length of the vertical supporting cable attached to the roadway 20 m from the center.
STEPS:
- Step 1: Model the situation. Place the vertex of the parabola at the lowest point of the cable. Let the vertex be V(0,0). The axis is vertical upward (cable goes up from vertex to towers). Equation: $x^2 = 4ay$ ($a>0$). The roadway is a horizontal line *below* the vertex.
- Step 2: Locate the roadway and towers. Vertex is 5 m above roadway $\Rightarrow$ Roadway is at $y = -5$. Towers are at the ends of the 100 m roadway $\Rightarrow$ half-span = 50 m. Tower tops are 30 m above roadway $\Rightarrow$ height above roadway = 30 m $\Rightarrow$ y-coordinate of tower top $= 30 - 5 = 25$ m (since vertex is at y=0). So tower top coordinates: $T(50, 25)$ and $T'(-50, 25)$.
- Step 3: Find 'a' using tower top T. $x^2 = 4ay \Rightarrow 50^2 = 4a(25) \Rightarrow 2500 = 100a \Rightarrow a = 25$.
- Step 4: Equation of cable parabola: $x^2 = 100y$.
- Step 5: Find cable height at 20 m from center. "20 m from center" $\Rightarrow x = 20$ (or -20). Substitute: $20^2 = 100y \Rightarrow 400 = 100y \Rightarrow y = 4$.
- Step 6: Find supporting cable length. The supporting cable runs vertically from the roadway ($y = -5$) up to the cable parabola ($y = 4$). Length $= 4 - (-5) = 9$ m.
REASONING: This problem combines multiple concepts: vertex not on the roadway, coordinate geometry translation (roadway is a line $y = -5$), and the supporting cable length is a vertical segment difference in y-coordinates. The critical step is correctly setting the y-coordinate of the tower tops relative to the vertex (not the roadway).
ANSWER: The length of the vertical supporting cable 20 m from the center is 9 m.

## COMPETENCY_QUESTION_1
QUESTION: A parabolic reflector for a solar cooker is designed such that the focus is 15 cm from the vertex. The rim of the reflector is a circle of diameter 60 cm. Find the depth of the reflector (distance from vertex to the plane of the rim). If the reflector is made 10 cm deeper while keeping the same focal length, what will be the new rim diameter?
COMPETENCY: Mathematical Modelling & Problem Solving (Applying standard equation to a design scenario, solving for two different unknowns using the same parameter 'a').
STEPS:
- Step 1: Identify standard form. Vertex at origin, axis horizontal (opens right) $\Rightarrow y^2 = 4ax$. Given focus distance $a = 15$ cm.
- Step 2: Find depth for original rim diameter 60 cm. Rim radius $y = 30$ cm. Substitute in $y^2 = 4ax$: $30^2 = 4(15)x \Rightarrow 900 = 60x \Rightarrow x = 15$ cm. Depth = 15 cm.
- Step 3: Find new rim diameter for depth = 15 + 10 = 25 cm. New $x = 25$. Substitute: $y^2 = 4(15)(25) = 1500 \Rightarrow y = \sqrt{1500} = 10\sqrt{15} \approx 38.73$ cm.
- Step 4: New diameter $= 2y = 20\sqrt{15} \approx 77.46$ cm.
ANSWER: Original depth = 15 cm. New rim diameter $\approx 77.46$ cm (exactly $20\sqrt{15}$ cm).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A highway headlight uses a parabolic reflector with the bulb at the focus. The reflector is 20 cm in diameter and 5 cm deep. The bulb filament is a line segment of length 2 cm, placed along the latus rectum (perpendicular to the axis) with its midpoint at the focus. Determine the coordinates of the endpoints of the filament relative to the vertex. Verify that the entire filament lies *on* the reflector surface.
STEPS:
- Step 1: Set up equation. Vertex at (0,0), axis along +x. $y^2 = 4ax$. Diameter 20 cm $\Rightarrow$ radius $y = \pm 10$ at depth $x = 5$. $10^2 = 4a(5) \Rightarrow 100 = 20a \Rightarrow a = 5$.
- Step 2: Equation: $y^2 = 20x$. Focus: $(5,0)$. Latus Rectum: $x = 5$, length $4a = 20$ cm, endpoints $(5, \pm 10)$.
- Step 3: Filament is 2 cm long, centered at focus $(5,0)$, along latus rectum (vertical). Endpoints: $(5, 1)$ and $(5, -1)$.
- Step 4: Verify if endpoints lie on parabola. For $(5,1)$: LHS $y^2 = 1$. RHS $20x = 100$. $1 \neq 100$. The point $(5,1)$ is **inside** the parabola (since $y^2 < 4ax$).
- Step 5: Conclusion: The filament does **not** lie on the reflector surface; it is a line segment *inside* the parabola, along the latus rectum line, but only the focus is exactly on the axis. The reflector surface is at $y = \pm 10$ when $x=5$.
ANSWER: Filament endpoints relative to vertex: $(5, 1)$ and $(5, -1)$. The filament does **not** lie on the reflector surface; it is inside the parabola. The reflector surface at the focal plane ($x=5$) is at $y = \pm 10$.
DIFFICULTY: hard