import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch11_p2: SimDef = {
    id: 'v3_c8_math_ch11_p2',
    title: 'Exploring Some Geometric Themes · Part 2/2',
    subtitle: 'Shapes that contain smaller copies of themselves',
    classLevel: 8, subject: 'mathematics', topic: 'Exploring Some Geometric Themes · Part 2/2',
    chapters: ['c8_math_ch11'],
    nodeIds: ['c8_math_ch11_5', 'c8_math_ch11_6', 'c8_math_ch11_7', 'c8_math_ch11_8', 'c8_math_ch11_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern-spotter in nature', intro: 'From a satellite and from a microscope, a coastline looks equally crinkly. Learn to spot the deep rule — self-similarity — behind nature\'s favourite shapes.', goal: 'Recognise fractals and self-similarity in nature — distinguishing scale-copying from mirror symmetry, and exact from statistical self-similarity.' },
    discovery: {
        question: 'Zoom into one leaflet of a fern and it looks like the whole fern. Zoom into India\'s coastline and it stays just as jagged. What do you call a shape that keeps copying itself at every scale?',
        options: ['A fractal — self-similar, with each small part echoing the whole shape', 'A symmetric shape — the halves mirror each other', 'A repeating pattern like wallpaper', 'A coincidence of nature'],
        answer: 'A fractal — self-similar, with each small part echoing the whole shape',
        hook: 'Self-similar isn\'t the same as symmetric. A fern\'s left and right sides aren\'t mirror images — but each leaflet is a scaled-down clone of the whole frond. Nature\'s trick: one simple branching rule, repeated at every size.',
    },
    teaching: [
        { title: 'Koch Snowflake: Construction and Perimeter Growth', text: 'The Koch Snowflake is a fractal curve constructed by starting with an equilateral triangle and recursively replacing the middle third of every line segment with two segments of equal length that form.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch11_5', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Hunt self-similarity in the wild: fern fronds, tree branches, river deltas, cauliflower, coastlines. Then sort exact from statistical self-similarity — and argue whether a humble straight line counts as a fractal (it doesn\'t — no detail at smaller scales).',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_5', title: 'Koch Snowflake: Construction and Perimeter Growth',
          scaffold: { problem: 'A craft teacher asks students to make a Koch Snowflake decoration using gold wire.',
            steps: [
            { text: 'Identify given values: initial side s = 18 cm, iteration n = 3. Initial perimeter P₀ = 3 × s = 3 × 18 = 54 cm.' },
            { text: 'Recall the perimeter growth factor per iteration is 4/3. The formula for perimeter after n iterations is P_n = P₀.' },
            { text: 'Substitute n = 3 into the formula: P₃ = 54 × (4/3)³.' },
            { text: 'Compute (4/3)³ = 4³/3³ = 64/27. Then P₃ = 54 × 64/27 = (54/27) × 64 = 2 × 64 = 128 cm.' },
            { text: 'Verify: P₁ = 54 × 4/3 = 72 cm; P₂ = 72 × 4/3 = 96 cm; P₃ = 96 × 4/3 = 128 cm. Matches. Answer: 128 cm of gold wire.', faded: true, blankAnswer: '128 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_6', title: 'Area of Fractals at the nth Step: Formula Derivation',
          scaffold: { problem: 'A Sierpinski carpet is constructed from a square sheet of side 36 cm. Find the exact area remaining after 5 steps.',
            steps: [
            { text: 'Identify given values. Initial side length = 36 cm. Initial area A₀ = 36² = 1296 cm². Number of steps n = 5.' },
            { text: 'Recall the Sierpinski carpet area formula. At each step, the square is divided into 9 equal squares and the middle one.' },
            { text: 'Substitute the values. A₅ = 1296 × (8/9)⁵.' },
            { text: 'Compute (8/9)⁵ = 8⁵/9⁵ = 32768/59049. Then A₅ = 1296 × 32768/59049.' },
            { text: 'Verify the fraction is in simplest form. 524288 and 729 share no common factors (729 = 3⁶, 524288 = 2¹⁹).', faded: true, blankAnswer: '524288/729 cm² (approximately 719.19 cm²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_7', title: 'Visualising Solids: Nets of 3D Shapes',
          scaffold: { problem: 'Ravi has a cuboidal gift box of length 20 cm, breadth 15 cm, and height 10 cm.',
            steps: [
            { text: 'Identify the faces of the cuboid — there are 3 pairs of identical rectangles: top/bottom (20×15), front/back (20×10).' },
            { text: 'Choose a base face for the net layout — select the 20×15 rectangle as the bottom face. Draw it first.' },
            { text: 'Attach the four side faces to the four edges of the bottom face — attach a 20×10 rectangle to one 20 cm edge (front),.' },
            { text: 'Attach the top face (20×15) to one of the side faces — for example, attach it to the free 20 cm edge of the front face.' },
            { text: 'Verify the net — check that all 6 faces are present, each edge of the cuboid appears exactly twice in the net (once.', faded: true, blankAnswer: 'Net drawn with one 20×15 rectangle central, four side.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_8', title: 'Cross-Sections of Solids: Slicing Through 3D Objects',
          scaffold: { problem: 'A cylindrical water tank (radius 1.4 m, height 3 m) stands vertically on a farm in Punjab.',
            steps: [
            { text: 'Identify the solid (cylinder) and the cutting planes. The vertical cuts are planes parallel to the axis.' },
            { text: 'The four cuts together define a patch on the curved surface. Since the vertical cuts are parallel to the axis, they cut.' },
            { text: 'On the curved surface, the patch is bounded by two vertical straight lines (distance 0.5 m apart along the.' },
            { text: 'The rectangle\'s dimensions: height = distance between horizontal cuts = 0.4 m.' },
            { text: 'But wait, the question asks for "shape and area of the metal piece removed". The piece is a curved rectangle.' },
            { text: 'First cut: horizontal plane parallel to base (20×15) at height 4 cm. Cross-section is a rectangle 20 cm × 15 cm.' },
            { text: 'Second cut: on the TOP piece only. Vertical plane parallel to length (20 cm side), 3 cm from one breadth-side face.' },
            { text: 'The vertical plane cuts the 15 cm breadth into 3 cm and 12 cm. The height remains 6 cm. Length remains 20 cm.' },
            { text: 'Resulting three pieces:' },
            { text: 'All cross-sections are rectangles. The first cross-section (horizontal) is 20×15.', faded: true, blankAnswer: 'Three cuboids: (20×15×4) cm, (20×3×6) cm, (20×12×6) cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_9', title: 'Front, Top, and Side Views of Solids',
          scaffold: { problem: 'A solid is formed by placing a right circular cylinder (height 5 cm, radius 1.5 cm) on top of a cube of side 5 cm, with the cylinder\'s axis.',
            steps: [
            { text: 'Identify the composite solid – a cube of side 5 cm with a cylinder of height 5 cm and diameter 3 cm centered on top.' },
            { text: 'Determine the front view. The front view shows the cube as a 5 cm × 5 cm square.' },
            { text: 'Determine the top view. Looking down, you see the top of the cylinder – a circle of radius 1.5 cm – centered on the top.' },
            { text: 'Determine the side view. By symmetry, the side view is identical to the front view: a 5 cm square with a centered 3.' },
            { text: 'Draw the three views to scale (e.g., 1 cm = 1 cm), label all dimensions, and indicate the center lines for the cylinder.', faded: true, blankAnswer: 'Front view: 5 cm wide, total height 10 cm (lower 5 cm full.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch11_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch11_5', title: 'Use it in the wild',
          caseStudy: { intro: 'For a nature-geometry display, Ira pins up a fern photo, a tree photo and a Konkan coastline photo, calling them \'symmetric fractals.\' A visitor asks whether symmetry is really the point.',
            decisions: [{ prompt: 'What makes these images fractal-like?', options: [
                { text: 'Self-similarity across scales — each fern leaflet is a miniature of the frond, each branch echoes the whole tree, and the coastline stays equally jagged whether you view it from a satellite or standing on the beach. It is a scale match, not a mirror match.', outcome: 'This names the defining feature correctly — parts resemble the whole at smaller scales, which is different from left-right symmetry.' },
                { text: 'The label is right — a shape whose two halves mirror each other is exactly what fractal means.', outcome: 'That is bilateral symmetry; a fern is not even mirror-symmetric, yet each leaflet still miniatures the whole — the relationship is scaling, not reflection.', reveals: 'fractal-means-symmetric' },
                { text: 'They are fractals because the same pattern repeats side by side, like identical tiles in a row.', outcome: 'Wallpaper repeats at the same size; fractal self-similarity repeats the pattern shrunk — a part resembling the whole at a smaller scale.', reveals: 'repeat-equals-fractal' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch11_9', title: 'You made it',
          caseStudy: { intro: 'A fractal is a rule repeated across scales — zoom in and the same pattern stares back. Nature builds trees, rivers and coastlines with this one cheap trick.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch11_5', difficulty: 'standard',
          question: 'The Koch Snowflake is a fractal curve constructed by starting with.',
          hint: 'If stuck, revisit multiplication of fractions (c6_math_ch03_035) and pattern.',
          misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and.',
          parts: [
                { id: 'a', prompt: 'What is the multiplication factor by which the perimeter of the Koch Snowflake increases at each iteration?', answer: 'The perimeter increases by a factor of 4/3 at each iteration',
                  options: ['The perimeter increases by a factor of 4/3 at each iteration', 'one segment becomes four new segments'],
                  hint: 'If stuck, revisit multiplication of fractions (c6_math_ch03_035) and pattern generalisation with.',
                  misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and forget that the middle.' },
                { id: 'b', prompt: 'If the initial equilateral triangle has a side length of 12 cm, what is the perimeter of the Koch Snowflake after 2 iterations?', answer: 'Step 1: Initial perimeter P₀ = 3 × 12 = 36 cm',
                  options: ['Step 1: Initial perimeter P₀ = 3 × 12 = 36 cm', 'one segment becomes four new segments'],
                  hint: 'If stuck, revisit multiplication of fractions (c6_math_ch03_035) and pattern generalisation with.',
                  misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and forget that the middle.' },
                { id: 'c', prompt: 'Compare the growth of the number of sides and the length of each side in the Koch Snowflake.', answer: 'number of sides, (',
                  options: ['number of sides, (', 'one segment becomes four new segments'],
                  hint: 'If stuck, revisit multiplication of fractions (c6_math_ch03_035) and pattern generalisation with.',
                  misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and forget that the middle.' }
          ],
            remediations: { 'the-perimeter-growth-factor-is': { steps: ['P₀,', 'P₀×4/3,', '(P₀×4/3)×4/3 = P₀×(4/3)², and ask "What operation connects each step?" to reinforce multiplicative growth.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Koch Snowflake perimeter after 3 steps starting from side 9 cm is 9 × (4/3)³ = 9 × 64/27 = 64/3 cm." Evaluate this claim and correct any.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'one segment becomes four new segments'],
                  hint: 'If stuck, revisit multiplication of fractions (c6_math_ch03_035) and pattern generalisation with.',
                  misconception: 'Students often think the perimeter growth factor is 5/3 because they see "one segment becomes four new segments" and forget that the middle.' }
          ],
            remediations: { 'the-perimeter-growth-factor-is': { steps: ['P₀,', 'P₀×4/3,', '(P₀×4/3)×4/3 = P₀×(4/3)², and ask "What operation connects each step?" to reinforce multiplicative growth.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_6', difficulty: 'standard',
          question: 'The area of a fractal at the nth step is the total remaining area after.',
          hint: 'Review geometric sequences (constant ratio between terms) and the formula for nth term.',
          misconception: 'Students confuse the scale factor for area with the scale factor for linear dimensions or perimeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a fractal at the nth step is the total remaining area after n iterations of a',
                  options: ['The area of a fractal at the nth step is the total remaining area after n iterations of a', 'A fractal is a geometric shape that exhibits self-similarity across different scales,', 'A polyhedron is a three-dimensional solid bounded entirely by flat polygonal faces, where', 'Euler\'s Formula states that for any convex polyhedron (a 3D solid with flat polygonal'],
                  hint: 'Review geometric sequences (constant ratio between terms) and the formula for nth term: Tₙ =.',
                  misconception: 'Students confuse the scale factor for area with the scale factor for linear dimensions or perimeter.' }
          ],
            remediations: { 'students-confuse-the-scale-factor': { steps: ['If a student uses the wrong scale factor, have them physically draw step 0, step 1, and step 2 of the fractal on grid.', 'Count the remaining unit squares (for carpet) or small triangles (for gasket) at each step.', 'Write the areas as a sequence: A₀, A₁, A₂.', 'Compute the ratio A₁/A₀ and A₂/A₁.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_7', difficulty: 'standard',
          question: 'A net of a 3D solid is a two-dimensional arrangement of polygons (faces).',
          hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) to review.',
          misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.',
          parts: [
                { id: 'a', prompt: 'How many square faces must a net of a cube have, and what is the maximum number of squares that can meet at a single vertex in the folded cube?', answer: 'A cube net must have exactly 6 square faces',
                  options: ['A cube net must have exactly 6 square faces', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) to review face/edge/vertex.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' },
                { id: 'b', prompt: 'A student draws a straight line of 6 squares connected edge-to-edge and claims it is a net of a cube.', answer: 'A straight line of 6 squares cannot form a cube',
                  options: ['A straight line of 6 squares cannot form a cube', 'it works because there are 6 squares', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) to review face/edge/vertex.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' },
                { id: 'c', prompt: 'A net of a cuboid has three pairs of identical rectangles. The net shows rectangles of dimensions: 8 cm × 5 cm (two pieces), 8 cm × 3 cm (two pieces), and 5.', answer: 'The cuboid has length = 8 cm, breadth = 5 cm, height = 3 cm',
                  options: ['The cuboid has length = 8 cm, breadth = 5 cm, height = 3 cm', 'any arrangement of the correct number and shape of faces forms a valid net'],
                  hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) to review face/edge/vertex.',
                  misconception: 'Students believe any arrangement of the correct number and shape of faces forms a valid net.' }
          ],
            remediations: { 'any-arrangement-of-the-correct': { steps: ['Give the student squared paper and scissors.', 'Have them draw the problematic net (e.g., straight line of 6 squares), cut it out, and physically attempt to fold.', 'Ask them to label each square as Front, Back, Top, Bottom, Left, Right before folding.', 'As they fold, they will see the overlap.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_8', difficulty: 'standard',
          question: 'A cross-section is the two-dimensional shape formed by the intersection of.',
          hint: 'Revisit c8_math_ch11_7 (Nets of 3D Shapes) and physically build solids from nets to see.',
          misconception: 'Students believe that the cross-section of a solid is always similar to its base (e.g., a pyramid always gives square.',
          parts: [
                { id: 'a', prompt: 'What is the cross-section shape when a sphere is cut by any plane passing through its centre?', answer: 'A circle with radius equal to the sphere\'s radius (a great circle)',
                  options: ['A circle with radius equal to the sphere\'s radius (a great circle)', 'it depends', 'the cross-section of a solid is always similar to its base (e'],
                  hint: 'Revisit c8_math_ch11_7 (Nets of 3D Shapes) and physically build solids from nets to see how faces.',
                  misconception: 'Students believe that the cross-section of a solid is always similar to its base (e.g., a pyramid always gives square cross-sections,.' },
                { id: 'b', prompt: 'A cylinder stands upright on its circular base. A student says: "If I slice it with a vertical plane (perpendicular to base) that does NOT pass through the.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'vertical', 'horizontal', 'the cross-section of a solid is always similar to its base (e'],
                  hint: 'Revisit c8_math_ch11_7 (Nets of 3D Shapes) and physically build solids from nets to see how faces.',
                  misconception: 'Students believe that the cross-section of a solid is always similar to its base (e.g., a pyramid always gives square cross-sections,.' },
                { id: 'c', prompt: 'A right circular cone (vertex up, base down) is sliced by three different planes: (A) parallel to base, (B) perpendicular to base passing through vertex, (C).', answer: '(A) Circle (smaller than base)',
                  options: ['(A) Circle (smaller than base)', 'the cross-section of a solid is always similar to its base (e'],
                  hint: 'Revisit c8_math_ch11_7 (Nets of 3D Shapes) and physically build solids from nets to see how faces.',
                  misconception: 'Students believe that the cross-section of a solid is always similar to its base (e.g., a pyramid always gives square cross-sections,.' }
          ],
            remediations: { 'the-cross-section-of-a': { steps: ['If a student draws the base shape for every cut: 1.', 'Insert a wire vertically through the apex.', 'Ask: "What shape does the wire cut on the surface?" Trace the cut with a finger — it goes from apex down two edges.', 'Place a transparent sheet (plane) against the model at different angles.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_9', difficulty: 'standard',
          question: 'Front, top, and side views (orthographic projections) are 2D representations.',
          hint: 'Revisit c6_math_ch07_077 (Three-Dimensional Shapes) and practice matching real objects.',
          misconception: 'Students often draw the views as if they are looking from an angle (perspective) rather than using parallel projection.',
          parts: [
                { id: 'a', prompt: 'What are the three standard orthographic views used to represent a 3D solid on paper?', answer: 'The three standard views are the front view, top view, and side view',
                  options: ['The three standard views are the front view, top view, and side view', 'isometric, oblique, perspective'],
                  hint: 'Revisit c6_math_ch07_077 (Three-Dimensional Shapes) and practice matching real objects (dice, cans.',
                  misconception: 'Students often draw the views as if they are looking from an angle (perspective) rather than using parallel projection.' },
                { id: 'b', prompt: 'Why does a right circular cylinder standing on its base have a rectangular front view but a circular top view?', answer: 'From the front, you see the cylinder\'s height and diameter',
                  options: ['From the front, you see the cylinder\'s height and diameter', 'both are circles'],
                  hint: 'Revisit c6_math_ch07_077 (Three-Dimensional Shapes) and practice matching real objects (dice, cans.',
                  misconception: 'Students often draw the views as if they are looking from an angle (perspective) rather than using parallel projection.' }
          ],
            remediations: { 'students-often-draw-the-views': { steps: ['Give the student a physical model (e.g., a few centimetre cubes joined together) and a transparent sheet.', 'Ask them to hold the sheet vertically in front of the model, close one eye, and trace the outline they see with.', 'Repeat for top (sheet horizontal above) and side.', 'Then have them transfer the tracings to paper.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
