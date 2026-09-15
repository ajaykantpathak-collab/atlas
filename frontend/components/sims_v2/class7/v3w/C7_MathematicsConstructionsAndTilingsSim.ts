import type { SimDef } from '../../engine/types';
import C7_MathematicsConstructionsAndTilingsSim from '../../../simulations/c6_12/C7_MathematicsConstructionsAndTilingsSim';

/** v3 wrapped master — C7_MathematicsConstructionsAndTilingsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsconstructionsandtilingssim: SimDef = {
    id: 'v3w_c7_mathematicsconstructionsandtilingssim',
    title: 'Constructions And Tilings',
    subtitle: 'Covers line symmetry, rotational symmetry, and translational symmetry in 2D tilings,.',
    classLevel: 7, subject: 'mathematics', topic: 'Symmetry in Tilings and Patterns',
    chapters: [],
    nodeIds: ['c7_math_ch14_008', 'c7_math_ch14_006', 'c7_math_ch14_007', 'c7_math_ch14_001', 'c7_math_ch14_002', 'c7_math_ch14_003', 'c7_math_ch14_004', 'c7_math_ch14_005', 'c7_math_ch14_009', 'c7_math_ch14_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a grand palace in Jaipur and looking at the intricate marble floor tiles or the.', goal: 'Master Constructions And Tilings.' },
    discovery: {
        question: 'What type of symmetry is primarily responsible for extending a tiling infinitely across a plane by sliding a unit shape in a fixed direction without turning it?',
        options: ['Translational symmetry', 'rotational symmetry', 'line symmetry'],
        answer: 'Translational symmetry',
        hook: 'Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.',
    },
    teaching: [
        { title: 'Symmetry in tilings and patterns refers to.', text: 'Symmetry in tilings and patterns refers to the presence of translational, rotational, or reflectional balance when a plane is covered repeatedly with geometric shapes without gaps or overlaps.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch14_008', title: 'Symmetry in tilings and patterns refers.',
          scaffold: { problem: 'A decorative bathroom wall in Delhi is tiled using regular hexagonal tiles. Each hexagon has a side length of 10 cm.',
            steps: [
            { text: 'Identify the given values from the problem statement. The step size along the horizontal translation vector is $dx =.' },
            { text: 'Choose the appropriate mathematical operation for cumulative translation. Total distance $D_x = n \\times dx$.' },
            { text: 'Substitute the known values into the equation: $D_x = 8 \\times 15$.' },
            { text: 'Perform the arithmetic multiplication: $8 \\times 15 = 120$.' },
            { text: 'Verify the result with proper units. The total horizontal distance covered is 120 cm (or 1.2 metres).', faded: true, blankAnswer: '120 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_006', title: 'Tiling (or tessellation) is the process.',
          scaffold: { problem: 'A floor decorator in Jaipur wants to pave a rectangular courtyard using regular hexagonal marble tiles.',
            steps: [
            { text: 'Identify the given values from the problem statement. The interior angle of a regular hexagon is $A = 120^\\circ$, and.' },
            { text: 'Set up the equation for vertex angle coverage: $k \\times A = 360^\\circ$, where $k$ is the number of tiles meeting at a.' },
            { text: 'Substitute the known value of $A$ into the equation: $k \\times 120^\\circ = 360^\\circ$.' },
            { text: 'Perform algebraic division to solve for $k$: $k = \\frac{360^\\circ}{120^\\circ} = 3$.' },
            { text: 'Interpret the result: Since $k = 3$ is a whole number, exactly 3 regular hexagons meet at each vertex with no.', faded: true, blankAnswer: '3 tiles meet at each vertex; regular hexagons successfully.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_007', title: 'A regular tiling is a tessellation of a.',
          scaffold: { problem: 'A flooring contractor wants to check if regular hexagons (side length 30 cm) can form a regular tiling for a courtyard in Mumbai.',
            steps: [
            { text: 'Identify the number of sides ($n$) for a regular hexagon, which is $6$.' },
            { text: 'Use the interior angle formula for a regular polygon: $\\text{Angle} = \\frac{(n - 2) \\times 180^\\circ}{n}$.' },
            { text: 'Substitute $n = 6$ into the formula: $\\text{Angle} = \\frac{(6 - 2) \\times 180^\\circ}{6} = \\frac{4 \\times 180^\\circ}{6}.' },
            { text: 'Check if the interior angle divides $360^\\circ$ evenly: $360^\\circ \\div 120^\\circ = 3$.' },
            { text: 'Verify units and state final conclusion: The interior angle is $120^\\circ$ and regular hexagons successfully form a.', faded: true, blankAnswer: 'Interior angle = $120^\\circ$; Valid regular tiling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_001', title: 'Geometric constructions involve drawing.',
          scaffold: { problem: 'A carpenter in Delhi needs to replicate a decorative wooden beam edge of length 7.4 cm onto a new plank using only a ruler and compass.',
            steps: [
            { text: 'Draw a long working line $l$ using the straightedge, and mark a starting point $C$ on it.' },
            { text: 'Place the metal pointer of the compass at endpoint $A$ and adjust the pencil end so it rests exactly at endpoint $B$ of.' },
            { text: 'Verify the compass span against the ruler to ensure it reads exactly 7.4 cm without slipping.' },
            { text: 'Without changing the compass width, lift the compass and place the metal pointer at point $C$ on the working line $l$.' },
            { text: 'Swing an arc that intersects the working line $l$ at a new point, and label this intersection point $D$.', faded: true, blankAnswer: 'Line segment $CD$ of length 7.4 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_002', title: 'A perpendicular bisector of a line.',
          scaffold: { problem: 'Rahul wants to divide a metal wire of length $10\\text{ cm}$ into two equal halves for a craft project using a compass and ruler.',
            steps: [
            { text: 'Draw a line segment $AB = 10\\text{ cm}$ horizontally using a ruler in your notebook.' },
            { text: 'Place the compass pointer on point $A$ and adjust its width to more than half of $10\\text{ cm}$ (e.g., set it to.' },
            { text: 'Draw two arcs, one above the segment $AB$ and one below the segment $AB$.' },
            { text: 'Without changing the compass width, place the compass pointer on point $B$ and draw two intersecting arcs that cut the.' },
            { text: 'Use a ruler to join points $P$ and $Q$ with a straight line that intersects $AB$ at midpoint $M$, and verify that $AM =.', faded: true, blankAnswer: 'Each half-segment is $5\\text{ cm}$ long, intersected at.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_003', title: 'Bisecting an angle using a geometric.',
          scaffold: { problem: 'Rahul is designing a triangular park layout in Jaipur. One corner of the park forms an angle $\\angle XYZ = 70^\\circ$.',
            steps: [
            { text: 'Identify the given angle $\\angle XYZ = 70^\\circ$ with vertex $Y$ and arms $YX$ and $YZ$.' },
            { text: 'Place the compass needle at vertex $Y$ and draw an arc of convenient radius that intersects arm $YX$ at point $A$ and.' },
            { text: 'Place the compass needle at point $A$ and draw an arc inside the angle; keeping the exact same compass radius, place.' },
            { text: 'Use a straightedge to draw ray $YC$ from vertex $Y$ through point $C$, which forms the angle bisector, and calculate.', faded: true, blankAnswer: 'Two angles of $35^\\circ$ each ($\\angle XYC = 35^\\circ$ and.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch14_006', title: 'Identify each idea',
          dissect: { specimen: 'Constructions And Tilings', spots: [
            { id: 's1', label: 'Symmetry in tilings and patterns', prompt: 'Which idea is this? — Symmetry in tilings and patterns refers to the presence of translational, rotational, or.', answer: 'Symmetry in tilings and patterns', options: ['Symmetry in tilings and patterns', 'Tiling or tessellation is the', 'A regular tiling is a', 'Geometric constructions involve drawing precise'] },
            { id: 's2', label: 'Tiling or tessellation is the', prompt: 'Which idea is this? — Tiling (or tessellation) is the process of covering a flat plane completely with.', answer: 'Tiling or tessellation is the', options: ['Tiling or tessellation is the', 'Symmetry in tilings and patterns', 'A regular tiling is a', 'Geometric constructions involve drawing precise'] },
            { id: 's3', label: 'A regular tiling is a', prompt: 'Which idea is this? — A regular tiling is a tessellation of a plane using a single type of regular polygon.', answer: 'A regular tiling is a', options: ['A regular tiling is a', 'Symmetry in tilings and patterns', 'Tiling or tessellation is the', 'Geometric constructions involve drawing precise'] },
            { id: 's4', label: 'Geometric constructions involve drawing precise', prompt: 'Which idea is this? — Geometric constructions involve drawing precise figures, line segments, angles, and.', answer: 'Geometric constructions involve drawing precise', options: ['Geometric constructions involve drawing precise', 'Symmetry in tilings and patterns', 'Tiling or tessellation is the', 'A regular tiling is a'] },
            { id: 's5', label: 'A perpendicular bisector of a', prompt: 'Which idea is this? — A perpendicular bisector of a line segment is a line, ray, or line segment that divides.', answer: 'A perpendicular bisector of a', options: ['A perpendicular bisector of a', 'Symmetry in tilings and patterns', 'Tiling or tessellation is the', 'A regular tiling is a'] },
            { id: 's6', label: 'Bisecting an angle using a', prompt: 'Which idea is this? — Bisecting an angle using a geometric construction method involves dividing a given angle.', answer: 'Bisecting an angle using a', options: ['Bisecting an angle using a', 'Symmetry in tilings and patterns', 'Tiling or tessellation is the', 'A regular tiling is a'] }
          ] } }
    ],
    explore: { component: C7_MathematicsConstructionsAndTilingsSim, prompt: 'Explore the interactive — Constructions And Tilings' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch14_008', difficulty: 'standard',
          question: 'Symmetry in tilings and patterns refers to the presence of translational,.',
          hint: 'Review c6_math_ch10_108 for rotational symmetry and c7_math_ch14_007 for vertex angle.',
          misconception: 'Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.',
          parts: [
                { id: 'a', prompt: 'What type of symmetry is primarily responsible for extending a tiling infinitely across a plane by sliding a unit shape in a fixed direction without turning it?', answer: 'Translational symmetry',
                  options: ['Translational symmetry', 'rotational symmetry', 'line symmetry'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.' }
          ],
            remediations: { 'students-often-confuse-translational-symmetry': { steps: ['Remind the student to physically trace the repeating unit on transparent paper.', 'Ask them: "Did you turn your hand (rotation), flip your hand (reflection), or slide your hand across the desk.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_006', difficulty: 'standard',
          question: 'Tiling (or tessellation) is the process of covering a flat plane completely.',
          hint: 'Review polygon interior angle formulas and angle measurement around a point from.',
          misconception: 'Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tiling (or tessellation) is the process of covering a flat plane completely with',
                  options: ['Tiling (or tessellation) is the process of covering a flat plane completely with', 'Symmetry in tilings and patterns refers to the presence of translational, rotational, or', 'A regular tiling is a tessellation of a plane using a single type of regular polygon', 'Geometric constructions involve drawing precise figures, line segments, angles, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter properties with angle.' }
          ],
            remediations: { 'any-shape-with-straight-sides': { steps: ['When a student fails to grasp why certain shapes leave gaps, have them physically draw a vertex point and trace.', 'Guide them step-by-step: 1.', 'Measure the interior angle of the tile using a protractor.', 'Multiply that angle by $2, 3, 4$, etc., until the sum approaches or exceeds $360^\\circ$.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_007', difficulty: 'standard',
          question: 'A regular tiling is a tessellation of a plane using a single type of regular.',
          hint: 'Review c6_math_ch07_075 for polygon angle formulas and c7_math_ch14_006 for basic plane.',
          misconception: 'Students often assume that because a polygon is regular (like a pentagon or octagon), it can automatically tile a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A regular tiling is a tessellation of a plane using a single type of regular polygon',
                  options: ['A regular tiling is a tessellation of a plane using a single type of regular polygon', 'Symmetry in tilings and patterns refers to the presence of translational, rotational, or', 'Tiling (or tessellation) is the process of covering a flat plane completely with', 'Geometric constructions involve drawing precise figures, line segments, angles, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because a polygon is regular (like a pentagon or octagon), it can automatically tile a plane.' }
          ],
            remediations: { 'because-a-polygon-is-regular': { steps: ['Remind the student to physically or mentally draw the meeting point of corners (the vertex).', 'Guide them to calculate the interior angle using $\\frac{(n-2) \\times 180^\\circ}{n}$ and then divide $360^\\circ$ by that.', 'Ask: "Does the angle fit into $360^\\circ$ without leaving a remainder or a gap?" Step through the division together to.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_001', difficulty: 'standard',
          question: 'Geometric constructions involve drawing precise figures, line segments, angles,.',
          hint: 'Review basic line segment construction and compass handling from c6_math_ch11_114 before.',
          misconception: 'Students often change the compass opening inadvertently while drawing arcs because they grip the compass legs too.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometric constructions involve drawing precise figures, line segments, angles, and',
                  options: ['Geometric constructions involve drawing precise figures, line segments, angles, and', 'Symmetry in tilings and patterns refers to the presence of translational, rotational, or', 'Tiling (or tessellation) is the process of covering a flat plane completely with', 'A regular tiling is a tessellation of a plane using a single type of regular polygon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often change the compass opening inadvertently while drawing arcs because they grip the compass legs too tightly or apply uneven.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student to hold the compass only by its insulated or plastic top knob when swinging arcs, keeping fingers.', 'Show them how to tighten the central hinge screw with a small screwdriver or coin if the legs feel loose, and always.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_002', difficulty: 'standard',
          question: 'A perpendicular bisector of a line segment is a line, ray, or line segment that.',
          hint: 'Review c7_math_ch14_001 to practice basic arc drawing and compass handling.',
          misconception: 'Students often change the compass radius halfway through the construction when moving from one endpoint to the other.',
          parts: [
                { id: 'a', prompt: 'If you construct the perpendicular bisector of line segment $AB$ of length $8\\text{ cm}$ and it intersects $AB$ at point $M$, what is the exact length of.', answer: 'The length of $AM$ is $4\\text{ cm}$',
                  options: ['The length of $AM$ is $4\\text{ cm}$', 'bisect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often change the compass radius halfway through the construction when moving from one endpoint to the other (e.g., using a radius.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student that the compass width represents a fixed distance.', 'Say: "When you swing the arc from point $A$, lock your compass tight.', 'Move the exact same locked compass to point $B$ to draw the second set of arcs.', 'If the radius changes, the distance is no longer equal, and our symmetry is broken." Have them restart by redrawing.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_003', difficulty: 'standard',
          question: 'Bisecting an angle using a geometric construction method involves dividing a.',
          hint: 'Review basic compass usage and arc drawing techniques in c7_math_ch14_001 before.',
          misconception: 'Students often place the compass point on the vertex of the angle for the second step of drawing the interior arcs,.',
          parts: [
                { id: 'a', prompt: 'What geometric tool is used alongside a straightedge (ruler without measurement markings) to perform an angle bisector construction?', answer: 'The correct answer is a compass',
                  options: ['The correct answer is a compass', 'protractor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often place the compass point on the vertex of the angle for the second step of drawing the interior arcs, rather than placing the.' }
          ],
            remediations: { 'students-often-place-the-compass': { steps: ['If a student places the compass needle at the vertex for the interior arcs, gently guide them back to the arm.', 'Say: "Remember, the vertex $Q$ is already our starting point.', 'To find a point that is equally far from both arms, our compass needle must \'walk out\' onto the arms themselves where.', 'Place your needle on the first arm intersection, draw a small arc inside, keep that exact same compass width, move your.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
