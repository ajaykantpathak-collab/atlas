import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch11_p1: SimDef = {
    id: 'v3_c8_math_ch11_p1',
    title: 'Exploring Some Geometric Themes · Part 1/2',
    subtitle: 'Shapes that contain smaller copies of themselves',
    classLevel: 8, subject: 'mathematics', topic: 'Exploring Some Geometric Themes · Part 1/2',
    chapters: ['c8_math_ch11'],
    nodeIds: ['c8_math_ch11_1', 'c8_math_ch11_10', 'c8_math_ch11_11', 'c8_math_ch11_2', 'c8_math_ch11_3', 'c8_math_ch11_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pattern-spotter in nature', intro: 'From a satellite and from a microscope, a coastline looks equally crinkly. Learn to spot the deep rule — self-similarity — behind nature\'s favourite shapes.', goal: 'Recognise fractals and self-similarity in nature — distinguishing scale-copying from mirror symmetry, and exact from statistical self-similarity.' },
    discovery: {
        question: 'Zoom into one leaflet of a fern and it looks like the whole fern. Zoom into India\'s coastline and it stays just as jagged. What do you call a shape that keeps copying itself at every scale?',
        options: ['A fractal — self-similar, with each small part echoing the whole shape', 'A symmetric shape — the halves mirror each other', 'A repeating pattern like wallpaper', 'A coincidence of nature'],
        answer: 'A fractal — self-similar, with each small part echoing the whole shape',
        hook: 'Self-similar isn\'t the same as symmetric. A fern\'s left and right sides aren\'t mirror images — but each leaflet is a scaled-down clone of the whole frond. Nature\'s trick: one simple branching rule, repeated at every size.',
    },
    teaching: [
        { title: 'Fractals: Self-Similarity in Nature (Ferns, Trees, Coastlines)', text: 'A fractal is a geometric shape that exhibits self-similarity across different scales, meaning any small part of the shape resembles the whole shape either exactly or approximately.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch11_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Hunt self-similarity in the wild: fern fronds, tree branches, river deltas, cauliflower, coastlines. Then sort exact from statistical self-similarity — and argue whether a humble straight line counts as a fractal (it doesn\'t — no detail at smaller scales).',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c8_math_ch11_1', title: 'Fractals: Self-Similarity in Nature (Ferns, Trees, Coastlines)',
          caseStudy: { intro: 'Look at a picture of a fern leaf and a coastline of India (like the Konkan coast).',
            decisions: [{ prompt: 'What does "self-similarity" mean in the context of fractals? Give one example from nature.', options: [
                { text: 'Self-similarity means a shape looks similar to itself at different scales', outcome: 'Self-similarity means a shape looks similar to itself at different scales; a small part resembles.' },
                { text: 'it means the shape is symmetric', outcome: 'Not quite — Students often confuse self-similarity with symmetry (mirror or rotational).', reveals: 'students-often-confuse-self-similarity' },
                { text: 'it means the pattern repeats exactly like wallpaper', outcome: 'Not quite — Students often confuse self-similarity with symmetry (mirror or rotational).', reveals: 'students-often-confuse-self-similarity' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_10', title: 'Polyhedra: Faces, Edges, and Vertices',
          scaffold: { problem: 'Riya has a net of a triangular prism made of 2 triangles and 3 rectangles. She folds it to make the solid.',
            steps: [
            { text: 'Identify the faces from the net. The net has 2 triangles and 3 rectangles → these become the 5 faces of the prism (2.' },
            { text: 'Count edges on the net before folding. Each triangle has 3 edges (total 6), each rectangle has 4 edges (total 12).' },
            { text: 'Count vertices. Each triangle has 3 vertices. The top and bottom triangles share no vertices; they are connected.' },
            { text: 'Verify using the net: When folded, the 3 rectangles form a tube; the two triangles cap the ends.' },
            { text: 'State final answer with units (counts are dimensionless). Faces = 5, Edges = 9, Vertices = 6.', faded: true, blankAnswer: 'Faces = 5, Edges = 9, Vertices = 6' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_11', title: 'Euler\'s Formula: F + V - E = 2 for Polyhedra',
          scaffold: { problem: 'A gift box in the shape of a regular hexagonal prism is to be wrapped. The box has 8 faces and 12 vertices. How many edges does it have?',
            steps: [
            { text: 'Identify the given values from the problem. The solid is a convex polyhedron (hexagonal prism).' },
            { text: 'Write down Euler\'s Formula for convex polyhedra: F + V - E = 2.' },
            { text: 'Substitute the known values into the formula: 8 + 12 - E = 2.' },
            { text: 'Solve for E algebraically. 20 - E = 2 → Subtract 20 from both sides: -E = 2 - 20 → -E = -18 → Multiply by -1: E = 18.' },
            { text: 'Verify the answer makes sense. A hexagonal prism has 2 hexagonal faces and 6 rectangular faces = 8 faces.', faded: true, blankAnswer: '18 edges' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_2', title: 'Sierpinski Carpet: Construction and Pattern',
          scaffold: { problem: 'A square piece of cloth of side 81 cm is used to make a Sierpinski Carpet design up to Stage 3.',
            steps: [
            { text: 'Identify the given values: original side length s₀ = 81 cm, target stage n = 3.' },
            { text: 'Recall the pattern for number of squares: N = 8ⁿ. For n = 3, N = 8³ = 8 × 8 × 8 = 512 squares.' },
            { text: 'Recall the pattern for side length: sₙ = s₀ × (1/3)ⁿ. For n = 3, s₃ = 81 × (1/3)³ = 81 × (1/27) = 3 cm.' },
            { text: 'Verify by constructing mentally: Stage 1: 81/3 = 27 cm squares; Stage 2: 27/3 = 9 cm; Stage 3: 9/3 = 3 cm. Matches.' },
            { text: 'State the answer with units: 512 squares remain, each of side 3 cm.', faded: true, blankAnswer: '512 squares, each of side 3 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_3', title: 'Sierpinski Gasket (Triangle): Construction and Pattern',
          scaffold: { problem: 'Construct the Sierpinski Gasket up to Step 2 starting with an equilateral triangle of side 8 cm.',
            steps: [
            { text: 'Draw equilateral triangle (Step 0). Side = 8 cm. Area = (√3/4) × 8² = 16√3 cm². Number of triangles = 1.' },
            { text: 'Join midpoints to form 4 triangles of side 4 cm. Remove middle one. Remaining triangles = 3.' },
            { text: 'On each of the 3 triangles (side 4 cm), join midpoints to get 4 triangles of side 2 cm. Remove middle from each.' },
            { text: 'Verify pattern: Number of triangles = 3² = 9. Area fraction = (3/4)² = 9/16.' },
            { text: 'Answer: At Step 2, there are 9 triangles of side 2 cm, total remaining area = 9√3 cm² (or 9/16 of original).', faded: true, blankAnswer: 'Step 2: 9 triangles, side 2 cm each, total area 9√3 cm².' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch11_4', title: 'Counting Holes and Remaining Squares in Sierpinski Fractals',
          scaffold: { problem: 'A square ceramic tile of side 30 cm is used to create a Sierpinski Carpet design by drilling out square holes.',
            steps: [
            { text: 'Identify the iteration number \\(n = 3\\). Recall the formulas: remaining squares \\(R_n = 8^n\\), total holes \\(H_n.' },
            { text: 'Compute \\(R_3 = 8^3 = 8 \\times 8 \\times 8 = 512\\) solid squares.' },
            { text: 'Compute \\(H_3 = \\frac{8^3 - 1}{7} = \\frac{512 - 1}{7} = \\frac{511}{7} = 73\\) holes.' },
            { text: 'Find the side length of each small square at step 3. Each iteration divides the side by 3. Original side = 30 cm.' },
            { text: 'Verify: Total pieces (squares + holes) at step 3 would be \\(9^3 = 729\\) if none removed.', faded: true, blankAnswer: '512 solid squares, 73 holes, each small square side.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch11_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch11_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For a nature-geometry display, Ira pins up a fern photo, a tree photo and a Konkan coastline photo, calling them \'symmetric fractals.\' A visitor asks whether symmetry is really the point.',
            decisions: [{ prompt: 'What makes these images fractal-like?', options: [
                { text: 'Self-similarity across scales — each fern leaflet is a miniature of the frond, each branch echoes the whole tree, and the coastline stays equally jagged whether you view it from a satellite or standing on the beach. It is a scale match, not a mirror match.', outcome: 'This names the defining feature correctly — parts resemble the whole at smaller scales, which is different from left-right symmetry.' },
                { text: 'The label is right — a shape whose two halves mirror each other is exactly what fractal means.', outcome: 'That is bilateral symmetry; a fern is not even mirror-symmetric, yet each leaflet still miniatures the whole — the relationship is scaling, not reflection.', reveals: 'fractal-means-symmetric' },
                { text: 'They are fractals because the same pattern repeats side by side, like identical tiles in a row.', outcome: 'Wallpaper repeats at the same size; fractal self-similarity repeats the pattern shrunk — a part resembling the whole at a smaller scale.', reveals: 'repeat-equals-fractal' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch11_4', title: 'The bigger picture',
          caseStudy: { intro: 'A fractal is a rule repeated across scales — zoom in and the same pattern stares back. Nature builds trees, rivers and coastlines with this one cheap trick.',
            decisions: [{ prompt: 'What comes next? Exploring Some Geometric Themes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Exploring Some Geometric Themes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch11_1', difficulty: 'standard',
          question: 'A fractal is a geometric shape that exhibits self-similarity across different.',
          hint: 'Revisit c6_math_ch10_109 (Symmetry in Nature) and c6_math_ch12_122 (Geometric Patterns).',
          misconception: 'Students often confuse self-similarity with symmetry (mirror or rotational).',
          parts: [
                { id: 'a', prompt: 'What does "self-similarity" mean in the context of fractals? Give one example from nature.', answer: 'Self-similarity means a shape looks similar to itself at different scales',
                  options: ['Self-similarity means a shape looks similar to itself at different scales', 'it means the shape is symmetric', 'it means the pattern repeats exactly like wallpaper'],
                  hint: 'Revisit c6_math_ch10_109 (Symmetry in Nature) and c6_math_ch12_122 (Geometric Patterns) to practice.',
                  misconception: 'Students often confuse self-similarity with symmetry (mirror or rotational).' },
                { id: 'b', prompt: 'A student draws a tree where the trunk splits into 3 branches, each of those splits into 3 smaller branches, and each of those splits into 3 twigs.', answer: 'This tree is exactly self-similar',
                  options: ['This tree is exactly self-similar', 'statistical because it\'s a tree'],
                  hint: 'Revisit c6_math_ch10_109 (Symmetry in Nature) and c6_math_ch12_122 (Geometric Patterns) to practice.',
                  misconception: 'Students often confuse self-similarity with symmetry (mirror or rotational).' }
          ],
            remediations: { 'students-often-confuse-self-similarity': { steps: ['Have the student physically trace a fern frond: place tracing paper over the whole frond, trace outline.', 'Then trace a single leaflet.', 'Overlay the two tracings — they match in shape but not size.', 'Then fold the frond down the middle to test mirror symmetry — the two halves won\'t align.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_10', difficulty: 'standard',
          question: 'A polyhedron is a three-dimensional solid bounded entirely by flat polygonal.',
          hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) and "Polygons.',
          misconception: 'Students frequently count the curved surface of a cylinder or cone as a "face" because they think any surface is.',
          parts: [
                { id: 'a', prompt: 'Compare a cube and a regular tetrahedron. Both are polyhedra. What is the same and what is different about their faces, edges, and vertices?', answer: 'Cube: 6 square faces, 12 edges, 8 vertices',
                  options: ['Cube: 6 square faces, 12 edges, 8 vertices', '4 faces meet at a cube\'s vertex'],
                  hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) and "Polygons: Regular and.',
                  misconception: 'Students frequently count the curved surface of a cylinder or cone as a "face" because they think any surface is a face.' }
          ],
            remediations: { 'students-frequently-count-the-curved': { steps: ['Give the student a physical model (or a net they can fold) of a square pyramid.', 'Ask them to: (1) Place a sticker on each face and count stickers.', '(2) Run a finger along each edge and make a tally mark on paper for each distinct edge felt.', '(3) Put a dot of paint on each vertex and count dots.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently count the curved surface of a cylinder or cone as a "face" because they think any surface is.',
          parts: [
                { id: 'a', prompt: 'Ravi counts the elements of a hexagonal pyramid and writes: F = 7, E = 12, V = 7. His teacher says one number is wrong.', answer: 'The error is in edges',
                  options: ['The error is in edges', 'V=6 or E=11', 'the apex doesn\'t count as a vertex or miscount lateral edges'],
                  hint: 'If stuck, revisit Class 6 "Three-Dimensional Shapes" (c6_math_ch07_077) and "Polygons: Regular and.',
                  misconception: 'Students frequently count the curved surface of a cylinder or cone as a "face" because they think any surface is a face.' }
          ],
            remediations: { 'students-frequently-count-the-curved': { steps: ['Give the student a physical model (or a net they can fold) of a square pyramid.', 'Ask them to: (1) Place a sticker on each face and count stickers.', '(2) Run a finger along each edge and make a tally mark on paper for each distinct edge felt.', '(3) Put a dot of paint on each vertex and count dots.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_11', difficulty: 'standard',
          question: 'Euler\'s Formula states that for any convex polyhedron (a 3D solid with flat.',
          hint: 'If stuck, revisit c8_math_ch11_10 (Polyhedra: Faces, Edges, and Vertices) and practice.',
          misconception: 'Students often incorrectly count edges and vertices on polyhedra drawn in 2D (on paper) because they miss hidden edges.',
          parts: [
                { id: 'a', prompt: 'A student says: "My cylindrical pencil holder has 3 faces (top, bottom, curved side), 2 edges (the two circular rims), and 0 vertices.', answer: 'Euler\'s Formula applies only to convex polyhedra',
                  options: ['Euler\'s Formula applies only to convex polyhedra', 'the formula works for all 3D shapes'],
                  hint: 'If stuck, revisit c8_math_ch11_10 (Polyhedra: Faces, Edges, and Vertices) and practice counting.',
                  misconception: 'Students often incorrectly count edges and vertices on polyhedra drawn in 2D (on paper) because they miss hidden edges or double-count.' }
          ],
            remediations: { 'students-often-incorrectly-count-edges': { steps: ['If a student gets F + V - E ≠ 2 for a known polyhedron (e.g., cube), do not just re-teach the formula.', 'Instead: (1) Give them a physical model (toothpicks and clay, or a paper net they fold) to touch and count.', '(2) Guide them to systematically count: mark each face with a sticker, each vertex with a dot, each edge with.', '(3) Have them record in a table: Face 1, Face 2...'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_2', difficulty: 'standard',
          question: 'The Sierpinski Carpet is a fractal constructed by starting with a solid square.',
          hint: 'If stuck, revisit c6_math_ch12_122 (Geometric Patterns) to practice drawing recursive.',
          misconception: 'Students often think the side length of the small squares at Stage n is (1/3)ⁿ of the original, but then they.',
          parts: [
                { id: 'a', prompt: 'Explain why the number of remaining squares at Stage 2 is 64, not 56 or 72.', answer: 'At Stage 1 we have 8 squares',
                  options: ['At Stage 1 we have 8 squares', 'each square becomes 8'],
                  hint: 'If stuck, revisit c6_math_ch12_122 (Geometric Patterns) to practice drawing recursive patterns, and.',
                  misconception: 'Students often think the side length of the small squares at Stage n is (1/3)ⁿ of the original, but then they incorrectly use this linear.' },
                { id: 'b', prompt: 'Compare the construction rule of the Sierpinski Carpet with the Sierpinski Gasket (triangle).', answer: 'The Carpet uses a square grid (3×3) and removes the central square',
                  options: ['The Carpet uses a square grid (3×3) and removes the central square', 'both remove the middle'],
                  hint: 'If stuck, revisit c6_math_ch12_122 (Geometric Patterns) to practice drawing recursive patterns, and.',
                  misconception: 'Students often think the side length of the small squares at Stage n is (1/3)ⁿ of the original, but then they incorrectly use this linear.' }
          ],
            remediations: { 'the-side-length-of-the': { steps: ['Have the student draw a 9 cm × 9 cm square (Stage 0) and compute its area (81 cm²).', 'Construct Stage 1: divide into 3 cm × 3 cm squares, remove centre.', 'Count 8 squares, each 3 cm side → area each = 9 cm².', 'Total area = 8 × 9 = 72 cm².'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_3', difficulty: 'standard',
          question: 'The Sierpinski Gasket (or Sierpinski Triangle) is a fractal constructed.',
          hint: 'Review the midpoint theorem and area of equilateral triangle from c6_math_ch07_073 and.',
          misconception: 'Students treat the growth of triangles as additive (+3 per step) rather than multiplicative (×3 per step), leading.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Sierpinski Gasket (or Sierpinski Triangle) is a fractal constructed by starting with',
                  options: ['The Sierpinski Gasket (or Sierpinski Triangle) is a fractal constructed by starting with', 'A fractal is a geometric shape that exhibits self-similarity across different scales,', 'A polyhedron is a three-dimensional solid bounded entirely by flat polygonal faces, where', 'Euler\'s Formula states that for any convex polyhedron (a 3D solid with flat polygonal'],
                  hint: 'Review the midpoint theorem and area of equilateral triangle from c6_math_ch07_073 and.',
                  misconception: 'Students treat the growth of triangles as additive (+3 per step) rather than multiplicative (×3 per step), leading to answers like 1, 3, 6.' }
          ],
            remediations: { 'students-treat-the-growth-of': { steps: ['Have the student physically draw Step 0, 1, and 2 on triangular grid paper.', 'At each step, ask: "How many triangles did you have before?', 'How many does EACH of those become?" Write the multiplication: 1×3=3, 3×3=9, 9×3=27.', 'For area, shade the original triangle, then at Step 1 shade only the 3 remaining pieces.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch11_4', difficulty: 'standard',
          question: 'In the Sierpinski Carpet, at each iteration step \\(n\\) (starting with \\(n=1\\).',
          hint: 'Revisit c7_math_ch04_005 (Matchstick Patterns and Generalising with Variables) and.',
          misconception: 'Students often think the number of holes at step \\(n\\) is simply \\(8^n\\) (same as squares) or \\(9^n - 8^n\\).',
          parts: [
                { id: 'a', prompt: 'State the formula for the number of remaining squares after \\(n\\) iterations of the Sierpinski Carpet construction.', answer: 'The formula is \\(R_n = 8^n\\)',
                  options: ['The formula is \\(R_n = 8^n\\)', 'all 9 sub-squares remain, missing the removal of the central square'],
                  hint: 'Revisit c7_math_ch04_005 (Matchstick Patterns and Generalising with Variables) and c7_math_ch06_008.',
                  misconception: 'Students often think the number of holes at step \\(n\\) is simply \\(8^n\\) (same as squares) or \\(9^n - 8^n\\).' },
                { id: 'b', prompt: 'Compare the growth rate of remaining squares in the Sierpinski Carpet with the growth of remaining triangles in the Sierpinski Gasket (where each triangle.', answer: 'Sierpinski Carpet: \\(R_5 = 8^5 = 32768\\)',
                  options: ['Sierpinski Carpet: \\(R_5 = 8^5 = 32768\\)', 'says the gasket has more'],
                  hint: 'Revisit c7_math_ch04_005 (Matchstick Patterns and Generalising with Variables) and c7_math_ch06_008.',
                  misconception: 'Students often think the number of holes at step \\(n\\) is simply \\(8^n\\) (same as squares) or \\(9^n - 8^n\\).' }
          ],
            remediations: { 'the-number-of-holes-at': { steps: ['If a student makes this error, guide them to build a table for steps 0, 1, 2, 3 with columns: Step, Squares before.', 'Emphasize: "Only the solid squares from the previous step are subdivided.', 'The holes are empty and do not produce new holes." Then have them write the recurrence: \\(R_n = 8 R_{n-1}\\), \\(H_n.', 'Solve the recurrence to get the closed forms.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
