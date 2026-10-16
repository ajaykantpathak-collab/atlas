## ELI5
Walk into a Jaipur palace and slide a jali screen's pattern sideways: it lands on itself. That slide is translational symmetry, the engine that carries a tiling to infinity; spin the pattern about a corner and that is rotational balance; flip it across a mirror line and that is reflection. A design is symmetric when some move leaves it looking completely unchanged - artists compose one honest unit and let the moves do the repeating.

## DEFINITION
Symmetry in tilings and patterns refers to the presence of translational, rotational, or reflectional balance when a plane is covered repeatedly with geometric shapes without gaps or overlaps. It describes how a repeating design or tessellation remains invariant under specific geometric transformations like translation, rotation about a point, or reflection across a line.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can identify lines of symmetry, centers of rotational symmetry, and translation vectors in complex geometric tilings and patterns, and can construct a symmetric pattern using regular polygons.
## SCOPE_BOUNDARY
Covers line symmetry, rotational symmetry, and translational symmetry in 2D tilings, patterns, and tessellations using regular and semi-regular polygons. It does not cover 3D crystal lattices or advanced abstract group theory of wallpaper groups.
## WALKTHROUGH
Imagine walking into a grand palace in Jaipur and looking at the intricate marble floor tiles or the decorative jali window screens. You notice that if you slide the pattern sideways, rotate it around a corner, or flip it over a mirror line, it looks completely identical. How do artists and architects ensure these repeating designs look balanced and harmonious? To begin exploring this, we draw a grid over a tiled floor and identify the repeating unit cell. Building on our prior knowledge of lines of symmetry and rotational symmetry in 2D shapes from Class 6, we now extend these concepts to entire repeating tessellations. The key insight is that symmetry in a tiling is a combination of repeating a unit shape while preserving specific mirror lines, rotation centers, and translation vectors.

**Takeaway:** a tiling's symmetry is the set of moves - slide, spin, mirror - that leave it unchanged. **In the exam:** name the move before you claim the symmetry: translation for slides, rotation about a centre, reflection across a line. **Check yourself:** take the Jaipur jali screen and point out one slide direction, one mirror line and one turning centre in the same pattern. **Why students miss it:** students credit a wallpaper with rotation when only a slide repeats it - the flagged mix-up. Each move is a different tool: a slide travels, a spin pivots about a fixed centre, a mirror flips. Read the repeating unit, test each move in turn, and the pattern confesses every symmetry it owns.

## DIAGNOSTIC_QUESTION_1
What type of symmetry is primarily responsible for extending a tiling infinitely across a plane by sliding a unit shape in a fixed direction without turning it?
## DIAGNOSTIC_ANSWER_1
Translational symmetry. If a student answers "rotational symmetry" or "line symmetry", it reveals a confusion between moving a shape along a straight path (translation) and spinning or flipping it.

**A wrong answer (choosing rotation) reveals the student swapped travel for turning - extending a tiling infinitely across a plane is pure straight-line repetition, the same slide the walkthrough performs on the palace floor, no pivot anywhere.**

## DIAGNOSTIC_QUESTION_2
Why can a tiling made of equilateral triangles possess rotational symmetry of order 6 around a vertex where six triangles meet, but a tiling of regular pentagons cannot tile the plane at all?
## DIAGNOSTIC_ANSWER_2
Equilateral triangles have interior angles of 60°, and six of them fit around a point to sum to 360° (6 × 60° = 360°), creating a rotation center of order 6. Regular pentagons have interior angles of 108°, which do not divide 360° evenly, making a regular pentagonal tiling impossible. A wrong answer shows a failure to connect interior angle sums to 360° at a vertex.
## DIAGNOSTIC_QUESTION_3
In a tiled wall pattern, a square tile of side length 15 cm is translated horizontally by a vector $\vec{v} = (30\text{ cm}, 0\text{ cm})$. If the original tile's center is at coordinate $(15, 15)$, what are the coordinates of the center of the newly translated tile?
## DIAGNOSTIC_ANSWER_3
Step 1: Identify the original center coordinates as $(x_1, y_1) = (15, 15)$.
Step 2: Identify the translation vector $\vec{v} = (dx, dy) = (30, 0)$.
Step 3: Apply the translation formula for coordinates: $(x_2, y_2) = (x_1 + dx, y_1 + dy)$.
Step 4: Compute $x_2 = 15 + 30 = 45$ and $y_2 = 15 + 0 = 15$.
Step 5: The new center coordinates are $(45, 15)$ cm.
A wrong answer usually indicates that the student added the translation vector to only one coordinate or confused horizontal and vertical axes.
## DIAGNOSTIC_QUESTION_4
Compare a semi-regular tiling made of squares and regular octagons with a regular tiling of squares. How do their rotational symmetries at a vertex differ?
## DIAGNOSTIC_ANSWER_4
In a regular square tiling, four squares meet at every vertex, giving a 4-fold rotational symmetry (order 4, angle 90°). In a semi-regular tiling of squares and octagons (where one square and two octagons meet at each vertex, with interior angles 90° + 135° + 135° = 360°), the local arrangement at the vertex has lower rotational symmetry (order 2 or 1 depending on the exact pattern configuration) because the shapes alternating around the vertex are not all identical. A wrong answer shows misunderstanding of how mixed polygon vertex configurations affect local rotational order.
## DIAGNOSTIC_QUESTION_5
A student claims that a tiling made of scalene triangles has both line symmetry and rotational symmetry because the overall pattern looks neat. Evaluate this claim.
## DIAGNOSTIC_ANSWER_5
The claim is false. A scalene triangle has no lines of symmetry and no rotational symmetry of its own. While a clever arrangement of asymmetric scalene triangles can create a pattern with global translational symmetry, the individual tiles themselves do not possess reflectional or rotational symmetry, meaning the pattern's symmetry comes entirely from translation, not from internal shape symmetry. A wrong answer reveals a confusion between the symmetry of an individual tile and the symmetry of an assembled pattern.
## DIAGNOSTIC_QUESTION_6
Design a composite tile unit consisting of a square and four right-angled triangles that possesses both 4-fold rotational symmetry and four lines of symmetry when tessellated. Describe its layout.
## DIAGNOSTIC_ANSWER_6
The expected design places a central square of side $s$, with four identical right-angled triangles attached to its four outer edges such that their hypotenuses or legs match the square's sides, arranged symmetrically so that rotating the composite unit by 90°, 180°, or 270° maps it onto itself, and reflecting across horizontal, vertical, and diagonal axes maintains exact overlap. A poor answer lacks proper angle or side alignment, creating gaps or asymmetric layouts.
## COMMON_MISCONCEPTION
Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns. For example, when asked to find the symmetry of a brick wall pattern, a student might state that the pattern has 180-degree rotational symmetry everywhere, ignoring the fact that bricks are staggered and require a specific horizontal shift (translation) combined with a vertical drop before matching, rather than a simple point rotation.
## ON_FAILURE
Remind the student to physically trace the repeating unit on transparent paper. Ask them: "Did you turn your hand (rotation), flip your hand (reflection), or slide your hand across the desk (translation) to reach the next matching piece?" Guide them to check if the orientation of the shape changes or remains upright during the movement.
## PREREQUISITE_NODE_IDS
c6_math_ch10_105, c6_math_ch10_108, c6_math_ch10_111, c7_math_ch14_006, c7_math_ch14_007
## PREREQUISITE_REASONS
c6_math_ch10_105: provides foundational understanding of line symmetry in 2D shapes.
c6_math_ch10_108: teaches rotational symmetry concepts required for analyzing tile turning angles.
c6_math_ch10_111: introduces basic tessellation fitting without gaps, a prerequisite for tiling patterns.
c7_math_ch14_006: establishes plane covering rules without gaps or overlaps.
c7_math_ch14_007: covers regular and semi-regular polygon tiling types used in symmetry analysis.
## FORWARD_NODE_IDS
c7_math_ch14_010, c8_math_ch11_1, c8_math_ch11_2
## FORWARD_REASONS
c7_math_ch14_010: uses geometric constructions and symmetry principles in practical real-life architecture and design applications.
c8_math_ch11_1: Explores symmetry in patterns and tilings, building pattern-recognition skills used here.
c8_math_ch11_2: symmetry in tilings is evident in the carpet's 90° rotational and reflection symmetry.

## CROSS_SUBJECT_PREREQS
c6_math_ch07_078
## CROSS_SUBJECT_REASONS
c6_math_ch07_078: builds core spatial reasoning and symmetry recognition in geometric figures needed for advanced pattern analysis.
## CHAIN_DESCRIPTION
c7_math_ch14_007 -> c7_math_ch14_008 -> c7_math_ch14_010
## THIS_FORMULA
\text{Translational Vector } \vec{T} = m\vec{a} + n\vec{b} \text{ where } m, n \in \mathbb{Z}
## FORMULA_VARIABLES
$\vec{T}$ = total translation vector, $\vec{a}$ and $\vec{b}$ = fundamental translation vectors of the tiling lattice, $m$ and $n$ = integer steps along the lattice axes.
## FORMULA_UNITS
cm, metres, or dimensionless grid units.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
Geometric transformations (translation, rotation, reflection) and angle sum properties of polygons meeting at a vertex.
## PREREQ_BEFORE
Be able to identify lines of symmetry and calculate interior angles of regular polygons.
## PREREQ_STUCK
Review c6_math_ch10_108 for rotational symmetry and c7_math_ch14_007 for vertex angle sums in regular tilings.
## WORKED_EXAMPLE_1
PROBLEM: A decorative bathroom wall in Delhi is tiled using regular hexagonal tiles. Each hexagon has a side length of 10 cm. The tiling pattern is shifted horizontally by 15 cm and vertically by $15\sqrt{3}$ cm to repeat. Find the total horizontal distance covered after 8 successive translational steps along the primary lattice vector.

STEPS:
- Step 1: Identify the given values from the problem statement. The step size along the horizontal translation vector is $dx = 15\text{ cm}$, and the number of successive steps is $n = 8$.
- Step 2: Choose the appropriate mathematical operation for cumulative translation. Total distance $D_x = n \times dx$.
- Step 3: Substitute the known values into the equation: $D_x = 8 \times 15$.
- Step 4: Perform the arithmetic multiplication: $8 \times 15 = 120$.
- Step 5: Verify the result with proper units. The total horizontal distance covered is 120 cm (or 1.2 metres).
REASONING: Translational symmetry allows a pattern to repeat indefinitely by adding fixed vector increments. Multiplying the number of steps by the constant shift vector magnitude gives the total spatial displacement.
ANSWER: 120 cm
## WORKED_EXAMPLE_2
PROBLEM: A courtyard in Mumbai is paved with square tiles. A single square tile has a rotational symmetry order of 4 about its center. If four such tiles are arranged in a larger square block to form a composite pattern, determine the order of rotational symmetry of the new composite 2x2 block around its central intersection point.

STEPS:
- Step 1: Analyze the geometry of the individual square tile. A square has 4-fold rotational symmetry (rotations of 90°, 180°, 270°, 360° map it onto itself).
- Step 2: Set up the 2x2 arrangement. Four identical squares are placed side-by-side touching at a central vertex, forming a larger square shape of side $2s$.
- Step 3: Examine the symmetry of the combined 2x2 block. Because the outer boundary is a square and the internal configuration is symmetrical in all four quadrants around the central point, the entire 2x2 block preserves the 90-degree rotational invariance.
- Step 4: Determine the order of rotational symmetry for the composite figure. Since rotating the block by 90°, 180°, 270°, and 360° produces an identical appearance, the rotational order remains 4.
- Step 5: State the final conclusion with reasoning. The order of rotational symmetry of the 2x2 block is 4.
REASONING: Combining symmetric shapes symmetrically preserves the rotational order of the overarching geometry as long as the constituent arrangement maintains uniform quadrant distribution around the center.
ANSWER: Order 4
## WORKED_EXAMPLE_3
PROBLEM: A school art project involves creating a frieze pattern (a repeating strip pattern) using equilateral triangles and squares. The repeating unit consists of 2 squares and 3 equilateral triangles. If the pattern is reflected across a horizontal axis passing through the middle of the strip and also translated along the strip by a vector of 24 cm, calculate the coordinates of a vertex originally at $(3, 4)$ after 3 translation steps and 1 horizontal reflection.

STEPS:
- Step 1: Identify initial coordinates $(x_1, y_1) = (3, 4)$ and translation vector $\vec{v} = (24, 0)$.
- Step 2: Calculate the coordinates after 3 successive translations: $x_2 = x_1 + 3 \times 24 = 3 + 72 = 75$, and $y_2 = y_1 = 4$ (since translation is purely horizontal).
- Step 3: Apply the horizontal reflection across an axis. Assume the reflection axis is the line $y = 0$ (the x-axis). The reflection transformation rule for a point $(x, y)$ across the x-axis is $(x, -y)$. If the axis is a general horizontal line $y = k$, let us use a midline $y = 2$ for the frieze strip.
- Step 4: Let the line of reflection be $y = 2$. The vertical distance from $y_2 = 4$ to the axis $y = 2$ is $4 - 2 = 2$ units. Reflecting this across the axis means the new y-coordinate is $2 - 2 = 0$.
- Step 5: Combine the final transformed coordinates. The x-coordinate is 75 and the y-coordinate is 0, giving the final position $(75, 0)$.
REASONING: Transformations in repetitive patterns are applied sequentially. First, translational symmetry shifts the position along the axis of repetition, and then reflectional symmetry alters the coordinates perpendicular to the axis of symmetry based on the mirror line equation.
ANSWER: $(75, 0)$
## COMPETENCY_QUESTION_1
QUESTION: A traditional Kolam pattern in South India uses a grid of dots to create symmetric looped curves. If a grid has a 5x5 dot matrix with 4 lines of symmetry (horizontal, vertical, and two diagonals), explain how the rotational symmetry order of the pattern relates to its lines of symmetry. If a student rotates the pattern by 90 degrees, does it map onto itself? Justify your answer.
COMPETENCY: Connecting line symmetry and rotational symmetry in traditional geometric patterns.
STEPS:
- Step 1: Understand the given properties of the 5x5 dot matrix pattern (4 lines of symmetry: horizontal, vertical, and two diagonals).
- Step 2: Recall the geometric relationship between lines of symmetry and rotational symmetry. A 2D figure with $n$ lines of symmetry passing through a single center typically has rotational symmetry of order $n$.
- Step 3: Check the specific case where $n = 4$ (horizontal, vertical, and 2 diagonals). An order 4 rotational symmetry corresponds to rotation angles of 90°, 180°, 270°, and 360°.
- Step 4: Apply a 90-degree rotation to the pattern. Since there are 4 lines of symmetry intersecting at 45-degree intervals, rotating by 90 degrees maps every feature across successive symmetric quadrants, resulting in exact self-overlap.
- Step 5: Conclude that the pattern maps onto itself under a 90-degree rotation because 4 lines of symmetry imply 4-fold rotational symmetry.
ANSWER: Yes, the pattern maps onto itself. A figure with 4 lines of symmetry intersecting at a common center possesses 4-fold rotational symmetry (order 4), meaning rotations of 90° will map the figure onto itself.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect designs a floor mosaic using regular hexagons and equilateral triangles in a semi-regular tessellation. At a specific junction vertex, two regular hexagons and two equilateral triangles meet in alternating order. 
(a) Calculate the sum of the interior angles meeting at this vertex to verify if it forms a valid tiling point. 
(b) Analyze whether this vertex configuration possesses line symmetry through that vertex point.
COMPETENCY: Analyzing angle sums and symmetry properties in semi-regular tiling vertices.
STEPS:
- Step 1: Recall the formula for interior angles of a regular polygon with $n$ sides: $\text{Angle} = \frac{(n-2) \times 180^\circ}{n}$.
- Step 2: Calculate the interior angle of a regular hexagon ($n=6$): $\frac{(4) \times 180^\circ}{6} = 120^\circ$.
- Step 3: Recall or calculate the interior angle of an equilateral triangle ($n=3$): $60^\circ$.
- Step 4: Sum the angles around the vertex given the configuration of two hexagons and two triangles ($2 \times 120^\circ + 2 \times 60^\circ$). Compute $240^\circ + 120^\circ = 360^\circ$, confirming it is a valid vertex.
- Step 5: Analyze line symmetry at the vertex: Since the arrangement around the vertex in circular order is Hexagon-Triangle-Hexagon-Triangle, a mirror line can pass directly bisecting the two hexagons or the two triangles, creating valid lines of reflection symmetry through the vertex.
ANSWER: (a) The sum of angles is $360^\circ$ ($240^\circ + 120^\circ$), confirming a valid tiling vertex. (b) Yes, the vertex configuration possesses lines of symmetry passing through the bisectors of the alternating identical shapes.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Symmetry in tilings and patterns refers to the presence of ______, rotational, or reflectional balance when a plane is covered repeatedly with geometric shapes without gaps or overlaps.

## DIAGNOSTIC_ANSWER_7
translational

**A wrong answer (writing 'rotation') reveals the student confused the slide with the spin - the definition's list opens with translational balance, and the blank asks for the move that carries a unit tile sideways across the Jaipur floor without turning it. A slide travels; a spin pivots about a centre. In the palace corridor the pattern repeats by pure travel, so the first word of the definition is the answer the blank holds.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine walking into a grand palace in Jaipur and looking at the intricate marble floor tiles or the ______ jali window screens.

## DIAGNOSTIC_ANSWER_8
decorative

**A wrong answer (writing 'ornamental') reveals the student a close cousin but the wrong word - the walkthrough's own adjective is decorative, describing the jali screens of the Jaipur palace. The scene names what the visitor sees: intricate marble floors below and decorative screens alongside. Vocabulary from the walkthrough is fair game in these blanks, so quote its exact word rather than a synonym that only gestures at the same screen.**

## DIAGNOSTIC_QUESTION_9
What is Symmetry in tilings and patterns? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Symmetry in tilings and patterns refers to the presence of translational, rotational, or reflectional balance when a plane is covered repeatedly with geometric shapes without gaps or overlaps.

**A wrong answer (dropping a symmetry type) reveals the student returned a shorter list - the definition names three balances together: translational, rotational and reflectional, all of them acting while the covering keeps its no-gaps, no-overlaps discipline. Quote the full triple to complete the definition.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Symmetry in tilings and patterns?

## DIAGNOSTIC_ANSWER_10
Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.

**A wrong answer (calling a slide a spin) reveals the student the flagged mix-up itself - trace one wallpaper unit through a repeat: if it travels along a straight path it is translational, if it swings about a corner it is rotational. The trace settles the argument in one move.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
Can identify lines of symmetry, centers of rotational symmetry, and translation vectors in complex geometric tilings and patterns, and can construct a symmetric pattern using regular polygons.

**A wrong answer (naming identifications only) reveals the student half the skill - mastery also means constructing a symmetric pattern using regular polygons, not just spotting lines, centres and translation vectors in someone else's tiling.**

