import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch14_p1: SimDef = {
    id: 'v3_c7_math_ch14_p1',
    title: 'Constructions and Tilings · Part 1/2',
    subtitle: 'Covers fundamental geometric constructions using a ruler and compass within Euclidean.',
    classLevel: 7, subject: 'mathematics', topic: 'Constructions and Tilings · Part 1/2',
    chapters: ['c7_math_ch14'],
    nodeIds: ['c7_math_ch14_001', 'c7_math_ch14_002', 'c7_math_ch14_003', 'c7_math_ch14_004', 'c7_math_ch14_005', 'c7_math_ch14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are a builder designing a traditional Indian temple or a school playground, and you need to draw.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You must copy a 6.2 cm line segment exactly — but this time no reading numbers off a ruler scale. How did ancient builders pull off perfect copies anyway?',
        options: ['Set the compass span on the original segment, lift it, and swing — the fixed compass width transfers the length with no numbers needed', 'Fold the paper until the ends touch', 'Estimate by eye and hope for close', 'Trace it with string and guess the knots'],
        answer: 'Set the compass span on the original segment, lift it, and swing — the fixed compass width transfers the length with no numbers needed',
        hook: 'Classical construction allows only two tools — a straightedge for lines and a compass for distance. Never widen or narrow the compass mid-task: its locked span is the guarantee that every arc point sits the same distance from the centre.',
    },
    teaching: [
        { title: 'Geometric Constructions: Using Compass and Ruler', text: 'Geometric constructions involve drawing precise figures, line segments, angles, and shapes using only two standard mathematical tools: a ungraduated straightedge (ruler) and a pair of compasses.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch14_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Using only compass and straightedge, verify whether two segments on your page are truly equal — then explain why a marked ruler would have spoiled the purity of the test.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_001', title: 'Geometric Constructions: Using Compass and Ruler',
          scaffold: { problem: 'A carpenter in Delhi needs to replicate a decorative wooden beam edge of length 7.4 cm onto a new plank using only a ruler and compass.',
            steps: [
            { text: 'Draw a long working line $l$ using the straightedge, and mark a starting point $C$ on it.' },
            { text: 'Place the metal pointer of the compass at endpoint $A$ and adjust the pencil end so it rests exactly at endpoint $B$.' },
            { text: 'Verify the compass span against the ruler to ensure it reads exactly 7.4 cm without slipping.' },
            { text: 'Without changing the compass width, lift the compass and place the metal pointer at point $C$ on the working line $l$.' },
            { text: 'Swing an arc that intersects the working line $l$ at a new point, and label this intersection point $D$.', faded: true, blankAnswer: 'Line segment $CD$ of length 7.4 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_002', title: 'Perpendicular Bisector of a Line Segment: Construction',
          scaffold: { problem: 'Rahul wants to divide a metal wire of length $10\\text{ cm}$ into two equal halves for a craft project using a compass and ruler.',
            steps: [
            { text: 'Draw a line segment $AB = 10\\text{ cm}$ horizontally using a ruler in your notebook.' },
            { text: 'Place the compass pointer on point $A$ and adjust its width to more than half of $10\\text{ cm}$ (e.g., set it.' },
            { text: 'Draw two arcs, one above the segment $AB$ and one below the segment $AB$.' },
            { text: 'Without changing the compass width, place the compass pointer on point $B$ and draw two intersecting arcs that cut the.' },
            { text: 'Use a ruler to join points $P$ and $Q$ with a straight line that intersects $AB$ at midpoint $M$, and verify that $AM.', faded: true, blankAnswer: 'Each half-segment is $5\\text{ cm}$ long, intersected.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_003', title: 'Bisecting an Angle: Construction Method',
          scaffold: { problem: 'Rahul is designing a triangular park layout in Jaipur. One corner of the park forms an angle $\\angle XYZ = 70^\\circ$.',
            steps: [
            { text: 'Identify the given angle $\\angle XYZ = 70^\\circ$ with vertex $Y$ and arms $YX$ and $YZ$.' },
            { text: 'Place the compass needle at vertex $Y$ and draw an arc of convenient radius that intersects arm $YX$ at point $A$ and.' },
            { text: 'Place the compass needle at point $A$ and draw an arc inside the angle; keeping the exact same compass radius, place.' },
            { text: 'Use a straightedge to draw ray $YC$ from vertex $Y$ through point $C$, which forms the angle bisector, and calculate.', faded: true, blankAnswer: 'Two angles of $35^\\circ$ each ($\\angle XYC = 35^\\circ$ and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_004', title: 'Constructing Angles of Given Measures',
          scaffold: { problem: 'Construct an angle of 60° at point $A$ on a ray $AB$, and then construct its angle bisector to obtain an angle of 30°. Show all steps.',
            steps: [
            { text: 'Draw a ray $AB$ of any convenient length using a ruler.' },
            { text: 'With centre $A$ and any suitable radius, draw an arc that cuts ray $AB$ at point $C$.' },
            { text: 'Keeping the compass radius unchanged, place the needle at point $C$ and draw an arc that intersects the first arc.' },
            { text: 'Join $AD$ and extend it to form ray $AE$. The angle $\\angle BAE$ is exactly 60°.' },
            { text: 'To get 30°, bisect $\\angle BAE$ by drawing arcs from $C$ and the point where arc $AD$ intersects the first arc, then.', faded: true, blankAnswer: 'Angle $\\angle BAE = 60^\\circ$ and $\\angle BAF = 30^\\circ$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_005', title: 'Constructing Parallel Lines Using Compass',
          scaffold: { problem: 'Construct a line parallel to a given line $XY$ through an external point $Z$ located 6 cm away, using the alternate interior angle method.',
            steps: [
            { text: 'Draw a straight reference line $XY$ and mark point $Z$ above it.' },
            { text: 'Draw a transversal line passing through point $Z$ and intersecting line $XY$ at a point, let us call it $R$.' },
            { text: 'Place the compass point at $R$, open it to a convenient radius (e.g., 3 cm), and draw an arc that cuts line $XY$.' },
            { text: 'Keeping the compass radius exactly at 3 cm, place the compass point at $Z$ and draw a similar arc crossing the.' },
            { text: 'Measure the distance between point $A$ and point $B$ with the compass.' },
            { text: 'Use a straightedge to align point $Z$ and point $D$, then draw the line $ZD$ to form the parallel line.', faded: true, blankAnswer: 'Line $ZD$ is constructed parallel to line $XY$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_006', title: 'Tiling: Covering a Plane with Shapes Without Gaps',
          scaffold: { problem: 'A floor decorator in Jaipur wants to pave a rectangular courtyard using regular hexagonal marble tiles.',
            steps: [
            { text: 'Identify the given values from the problem statement. The interior angle of a regular hexagon is $A = 120^\\circ$, and.' },
            { text: 'Set up the equation for vertex angle coverage: $k \\times A = 360^\\circ$, where $k$ is the number of tiles meeting at.' },
            { text: 'Substitute the known value of $A$ into the equation: $k \\times 120^\\circ = 360^\\circ$.' },
            { text: 'Perform algebraic division to solve for $k$: $k = \\frac{360^\\circ}{120^\\circ} = 3$.' },
            { text: 'Interpret the result: Since $k = 3$ is a whole number, exactly 3 regular hexagons meet at each vertex with.', faded: true, blankAnswer: '3 tiles meet at each vertex; regular hexagons successfully.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch14_006', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a constructions worksheet, Madhav must copy segment AB onto a fresh line. He reads \'6.2 cm\' off his ruler and draws from the 0 mark to 6.2 on the new line, then wonders why his later arcs do not intersect symmetrically — his compass hinge slipped mid-way.',
            decisions: [{ prompt: 'What does proper construction require instead?', options: [
                { text: 'Set the compass span directly from A to B and transfer it without changing the width — the compass carries the exact distance, so no numbers are needed and the copy cannot drift; also hold the compass by its top knob so the hinge cannot slip.', outcome: 'This is the Euclidean method: a fixed compass width guarantees equal radii and equal lengths, avoiding ruler-reading errors and mid-arc slipping.' },
                { text: 'His method was already a perfect construction — reading the scale and redrawing is exactly what the tools are for.', outcome: 'That is measurement, not construction; scale markings invite parallax and worn-edge errors, and the compass exists precisely to transfer length without numbers.', reveals: 'measuring-is-constructing' },
                { text: 'The fix is to squeeze the compass legs tighter and press harder on the paper so the width cannot change.', outcome: 'Gripping the legs is what makes the hinge slip; the correct habit is holding the top knob and re-checking the span before each new arc.', reveals: 'squeeze-the-compass' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Measurement counts; construction proves. A locked compass and a straight edge build exactness from pure geometry.',
            decisions: [{ prompt: 'What comes next? Constructions and Tilings · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Constructions and Tilings · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch14_001', difficulty: 'standard',
          question: 'Geometric constructions involve drawing precise figures, line segments, angles.',
          hint: 'Review basic line segment construction and compass handling from c6_math_ch11_114 before.',
          misconception: 'Students often change the compass opening inadvertently while drawing arcs because they grip the compass legs too.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geometric constructions involve drawing precise figures, line segments, angles, and',
                  options: ['Geometric constructions involve drawing precise figures, line segments, angles, and', 'A perpendicular bisector of a line segment is a line, ray, or line segment that divides', 'Bisecting an angle using a geometric construction method involves dividing a given angle', 'Constructing angles of given measures involves using a ruler, compass, and protractor (or'],
                  hint: 'Review basic line segment construction and compass handling from c6_math_ch11_114 before attempting.',
                  misconception: 'Students often change the compass opening inadvertently while drawing arcs because they grip the compass legs too tightly or apply uneven.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student to hold the compass only by its insulated or plastic top knob when swinging arcs, keeping fingers.', 'Show them how to tighten the central hinge screw with a small screwdriver or coin if the legs feel loose, and always.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_002', difficulty: 'standard',
          question: 'A perpendicular bisector of a line segment is a line, ray, or line segment that.',
          hint: 'Review c7_math_ch14_001 to practice basic arc drawing and compass handling.',
          misconception: 'Students often change the compass radius halfway through the construction when moving from one endpoint to the other.',
          parts: [
                { id: 'a', prompt: 'If you construct the perpendicular bisector of line segment $AB$ of length $8\\text{ cm}$ and it intersects $AB$ at point $M$, what is the exact length.', answer: 'The length of $AM$ is $4\\text{ cm}$',
                  options: ['The length of $AM$ is $4\\text{ cm}$', 'bisect'],
                  hint: 'Review c7_math_ch14_001 to practice basic arc drawing and compass handling.',
                  misconception: 'Students often change the compass radius halfway through the construction when moving from one endpoint to the other (e.g., using a radius.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student that the compass width represents a fixed distance.', 'Say: "When you swing the arc from point $A$, lock your compass tight.', 'Move the exact same locked compass to point $B$ to draw the second set of arcs.', 'If the radius changes, the distance is no longer equal, and our symmetry is broken." Have them restart by redrawing.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_003', difficulty: 'standard',
          question: 'Bisecting an angle using a geometric construction method involves dividing.',
          hint: 'Review basic compass usage and arc drawing techniques in c7_math_ch14_001 before.',
          misconception: 'Students often place the compass point on the vertex of the angle for the second step of drawing the interior arcs.',
          parts: [
                { id: 'a', prompt: 'What geometric tool is used alongside a straightedge (ruler without measurement markings) to perform an angle bisector construction?', answer: 'a compass',
                  options: ['a compass', 'protractor'],
                  hint: 'Review basic compass usage and arc drawing techniques in c7_math_ch14_001 before attempting angle.',
                  misconception: 'Students often place the compass point on the vertex of the angle for the second step of drawing the interior arcs, rather than placing the.' },
                { id: 'b', prompt: 'If you change the compass width midway through drawing the two intersecting interior arcs from the arms of the angle, what will happen to the resulting line?', answer: 'that the resulting line will not be the true angle bisector',
                  options: ['that the resulting line will not be the true angle bisector', 'nothing, the angle is still bisected'],
                  hint: 'Review basic compass usage and arc drawing techniques in c7_math_ch14_001 before attempting angle.',
                  misconception: 'Students often place the compass point on the vertex of the angle for the second step of drawing the interior arcs, rather than placing the.' }
          ],
            remediations: { 'students-often-place-the-compass': { steps: ['If a student places the compass needle at the vertex for the interior arcs, gently guide them back to the arm.', 'Say: "Remember, the vertex $Q$ is already our starting point.', 'To find a point that is equally far from both arms, our compass needle must \'walk out\' onto the arms themselves where.', 'Place your needle on the first arm intersection, draw a small arc inside, keep that exact same compass width, move your.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_004', difficulty: 'standard',
          question: 'Constructing angles of given measures involves using a ruler, compass, and.',
          hint: 'Review c7_math_ch14_001 and c7_math_ch14_003 to ensure compass handling and angle.',
          misconception: 'Students often change the compass radius halfway through constructing a 60-degree angle or a perpendicular line.',
          parts: [
                { id: 'a', prompt: 'What geometric tool is strictly required alongside a ruler to construct a standard 60-degree angle without measuring degrees with a protractor?', answer: 'A compass is required',
                  options: ['A compass is required', 'a protractor'],
                  hint: 'Review c7_math_ch14_001 and c7_math_ch14_003 to ensure compass handling and angle bisecting skills.',
                  misconception: 'Students often change the compass radius halfway through constructing a 60-degree angle or a perpendicular line.' },
                { id: 'b', prompt: 'When constructing a 90-degree angle on a given line segment using a compass, why do we first construct a perpendicular bisector or a perpendicular from.', answer: 'A 90-degree angle represents a right angle',
                  options: ['A 90-degree angle represents a right angle', 'it just looks straight'],
                  hint: 'Review c7_math_ch14_001 and c7_math_ch14_003 to ensure compass handling and angle bisecting skills.',
                  misconception: 'Students often change the compass radius halfway through constructing a 60-degree angle or a perpendicular line.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student: "Your compass is your measuring tape for distance, not angle size!', 'Once you open your compass to draw the first arc from the vertex, you must lock that screw tight and NEVER change the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_005', difficulty: 'standard',
          question: 'Constructing parallel lines using a compass and ruler involves creating a line.',
          hint: 'Review c7_math_ch14_004 to practice copying angles accurately before attempting line.',
          misconception: 'Students often change the compass radius halfway through copying an angle between the transversal intersection and the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing parallel lines using a compass and ruler involves creating a line that',
                  options: ['Constructing parallel lines using a compass and ruler involves creating a line that', 'Geometric constructions involve drawing precise figures, line segments, angles, and', 'A perpendicular bisector of a line segment is a line, ray, or line segment that divides', 'Bisecting an angle using a geometric construction method involves dividing a given angle'],
                  hint: 'Review c7_math_ch14_004 to practice copying angles accurately before attempting line parallelism.',
                  misconception: 'Students often change the compass radius halfway through copying an angle between the transversal intersection and the external point.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student that a compass is a tool for maintaining a fixed distance (radius).', 'Tell them: "Lock your compass screw tightly after measuring the first arc length.', 'Do not touch or squeeze the legs of the compass when moving it from the first line intersection to the external point.', 'The distance from the vertex must stay identical to guarantee our angles are equal."'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_006', difficulty: 'standard',
          question: 'Tiling (or tessellation) is the process of covering a flat plane completely.',
          hint: 'Review polygon interior angle formulas and angle measurement around a point from.',
          misconception: 'Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tiling (or tessellation) is the process of covering a flat plane completely with',
                  options: ['Tiling (or tessellation) is the process of covering a flat plane completely with', 'Geometric constructions involve drawing precise figures, line segments, angles, and', 'A perpendicular bisector of a line segment is a line, ray, or line segment that divides', 'Bisecting an angle using a geometric construction method involves dividing a given angle'],
                  hint: 'Review polygon interior angle formulas and angle measurement around a point from c6_math_ch07_079.',
                  misconception: 'Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter properties with angle.' }
          ],
            remediations: { 'any-shape-with-straight-sides': { steps: ['When a student fails to grasp why certain shapes leave gaps, have them physically draw a vertex point and trace.', 'Guide them step-by-step: 1.', 'Measure the interior angle of the tile using a protractor.', 'Multiply that angle by $2, 3, 4$, etc., until the sum approaches or exceeds $360^\\circ$.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
