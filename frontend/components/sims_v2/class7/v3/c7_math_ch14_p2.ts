import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch14_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch14_p2: SimDef = {
    id: 'v3_c7_math_ch14_p2',
    title: 'Constructions and Tilings · Part 2/2',
    subtitle: 'Covers the classification and angle sum properties of regular and semi-regular tilings.',
    classLevel: 7, subject: 'mathematics', topic: 'Constructions and Tilings · Part 2/2',
    chapters: ['c7_math_ch14'],
    nodeIds: ['c7_math_ch14_007', 'c7_math_ch14_008', 'c7_math_ch14_009', 'c7_math_ch14_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are decorating the kitchen floor of your home in Jaipur using shiny ceramic tiles shaped like.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You must copy a 6.2 cm line segment exactly — but this time no reading numbers off a ruler scale. How did ancient builders pull off perfect copies anyway?',
        options: ['Set the compass span on the original segment, lift it, and swing — the fixed compass width transfers the length with no numbers needed', 'Fold the paper until the ends touch', 'Estimate by eye and hope for close', 'Trace it with string and guess the knots'],
        answer: 'Set the compass span on the original segment, lift it, and swing — the fixed compass width transfers the length with no numbers needed',
        hook: 'Classical construction allows only two tools — a straightedge for lines and a compass for distance. Never widen or narrow the compass mid-task: its locked span is the guarantee that every arc point sits the same distance from the centre.',
    },
    teaching: [
        { title: 'Regular and Semi-Regular Tilings: Types and Properties', text: 'A regular tiling is a tessellation of a plane using a single type of regular polygon (such as equilateral triangles, squares, or regular hexagons), while a semi-regular tiling uses two or more.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch14_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Using only compass and straightedge, verify whether two segments on your page are truly equal — then explain why a marked ruler would have spoiled the purity of the test.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_007', title: 'Regular and Semi-Regular Tilings: Types and Properties',
          scaffold: { problem: 'A flooring contractor wants to check if regular hexagons (side length 30 cm) can form a regular tiling for a courtyard in Mumbai.',
            steps: [
            { text: 'Identify the number of sides ($n$) for a regular hexagon, which is $6$.' },
            { text: 'Use the interior angle formula for a regular polygon: $\\text{Angle} = \\frac{(n - 2) \\times 180^\\circ}{n}$.' },
            { text: 'Substitute $n = 6$ into the formula: $\\text{Angle} = \\frac{(6 - 2) \\times 180^\\circ}{6} = \\frac{4 \\times 180^\\circ}{6}.' },
            { text: 'Check if the interior angle divides $360^\\circ$ evenly: $360^\\circ \\div 120^\\circ = 3$.' },
            { text: 'Verify units and state final conclusion: The interior angle is $120^\\circ$ and regular hexagons successfully form.', faded: true, blankAnswer: 'Interior angle = $120^\\circ$; Valid regular tiling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_008', title: 'Symmetry in Tilings and Patterns',
          scaffold: { problem: 'A decorative bathroom wall in Delhi is tiled using regular hexagonal tiles. Each hexagon has a side length of 10 cm.',
            steps: [
            { text: 'Identify the given values from the problem statement. The step size along the horizontal translation vector is $dx.' },
            { text: 'Choose the appropriate mathematical operation for cumulative translation. Total distance $D_x = n \\times dx$.' },
            { text: 'Substitute the known values into the equation: $D_x = 8 \\times 15$.' },
            { text: 'Perform the arithmetic multiplication: $8 \\times 15 = 120$.' },
            { text: 'Verify the result with proper units. The total horizontal distance covered is 120 cm (or 1.2 metres).', faded: true, blankAnswer: '120 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_009', title: 'Constructing Perpendicular from a Point to a Line',
          scaffold: { problem: 'Rahul is designing a rectangular garden bed in his school in Delhi. He draws a baseline path represented by line $MN$.',
            steps: [
            { text: 'Identify the given elements: Line $MN$ and an external point $P$.' },
            { text: 'Place the compass pointer at point $P$. Adjust the compass width so that it is wide enough to cross line $MN$ at two.' },
            { text: 'Draw an arc that intersects line $MN$ at two points. Label these intersection points as $A$ and $B$.' },
            { text: 'With point $A$ as the center and a radius greater than half of the distance $AB$, draw an arc below line $MN$.' },
            { text: 'Align your straightedge (ruler) with point $P$ and point $Q$. Draw a straight line passing through $P$ and $Q$ that.', faded: true, blankAnswer: 'Line segment $PR$ is perpendicular to line $MN$ ($PR \\perp.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch14_010', title: 'Applications of Geometric Constructions',
          scaffold: { problem: 'A local community garden has a triangular plot of land with corners at vertices A, B, and C.',
            steps: [
            { text: 'Identify the given conditions and the required geometric loci.' },
            { text: 'Choose the construction methods. We need to construct the angle bisector of angle A using a compass, and construct the.' },
            { text: 'Execute the angle bisector construction at vertex A. Place the compass needle at A, draw an arc intersecting both arms.' },
            { text: 'Execute the perpendicular bisector construction for side BC. With center B and radius greater than half of BC (say, 5.' },
            { text: 'Locate the intersection of the angle bisector ray from A and the perpendicular bisector line of BC. Label this point F.', faded: true, blankAnswer: 'Point F, located at the intersection of the angle bisector.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch14_010', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a constructions worksheet, Madhav must copy segment AB onto a fresh line. He reads \'6.2 cm\' off his ruler and draws from the 0 mark to 6.2 on the new line, then wonders why his later arcs do not intersect symmetrically — his compass hinge slipped mid-way.',
            decisions: [{ prompt: 'What does proper construction require instead?', options: [
                { text: 'Set the compass span directly from A to B and transfer it without changing the width — the compass carries the exact distance, so no numbers are needed and the copy cannot drift; also hold the compass by its top knob so the hinge cannot slip.', outcome: 'This is the Euclidean method: a fixed compass width guarantees equal radii and equal lengths, avoiding ruler-reading errors and mid-arc slipping.' },
                { text: 'His method was already a perfect construction — reading the scale and redrawing is exactly what the tools are for.', outcome: 'That is measurement, not construction; scale markings invite parallax and worn-edge errors, and the compass exists precisely to transfer length without numbers.', reveals: 'measuring-is-constructing' },
                { text: 'The fix is to squeeze the compass legs tighter and press harder on the paper so the width cannot change.', outcome: 'Gripping the legs is what makes the hinge slip; the correct habit is holding the top knob and re-checking the span before each new arc.', reveals: 'squeeze-the-compass' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch14_010', title: 'You made it',
          caseStudy: { intro: 'Measurement counts; construction proves. A locked compass and a straight edge build exactness from pure geometry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch14_007', difficulty: 'standard',
          question: 'A regular tiling is a tessellation of a plane using a single type of regular.',
          hint: 'Review c6_math_ch07_075 for polygon angle formulas and c7_math_ch14_006 for basic plane.',
          misconception: 'Students often assume that because a polygon is regular (like a pentagon or octagon), it can automatically tile.',
          parts: [
                { id: 'a', prompt: 'Why can a regular octagon alone not form a regular tiling of the plane, even though it is a regular polygon?', answer: 'A regular octagon cannot form a regular tiling',
                  options: ['A regular octagon cannot form a regular tiling', 'any regular polygon can tile a plane'],
                  hint: 'Review c6_math_ch07_075 for polygon angle formulas and c7_math_ch14_006 for basic plane.',
                  misconception: 'Students often assume that because a polygon is regular (like a pentagon or octagon), it can automatically tile a plane.' }
          ],
            remediations: { 'because-a-polygon-is-regular': { steps: ['Remind the student to physically or mentally draw the meeting point of corners (the vertex).', 'Guide them to calculate the interior angle using $\\frac{(n-2) \\times 180^\\circ}{n}$ and then divide $360^\\circ$ by that.', 'Ask: "Does the angle fit into $360^\\circ$ without leaving a remainder or a gap?" Step through the division together.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_008', difficulty: 'standard',
          question: 'Symmetry in tilings and patterns refers to the presence of translational.',
          hint: 'Review c6_math_ch10_108 for rotational symmetry and c7_math_ch14_007 for vertex angle.',
          misconception: 'Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.',
          parts: [
                { id: 'a', prompt: 'What type of symmetry is primarily responsible for extending a tiling infinitely across a plane by sliding a unit shape in a fixed direction without turning it?', answer: 'Translational symmetry',
                  options: ['Translational symmetry', 'rotational symmetry', 'line symmetry'],
                  hint: 'Review c6_math_ch10_108 for rotational symmetry and c7_math_ch14_007 for vertex angle sums.',
                  misconception: 'Students often confuse translational symmetry with rotational symmetry in repetitive wallpaper patterns.' }
          ],
            remediations: { 'students-often-confuse-translational-symmetry': { steps: ['Remind the student to physically trace the repeating unit on transparent paper.', 'Ask them: "Did you turn your hand (rotation), flip your hand (reflection), or slide your hand across the desk.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_009', difficulty: 'standard',
          question: 'Constructing a perpendicular from a point to a line using a compass and a ruler.',
          hint: 'Review node c7_math_ch14_002 (Perpendicular Bisector of a Line Segment) to practice.',
          misconception: 'Students often change the compass radius halfway through a construction sequence—for instance, changing the radius when.',
          parts: [
                { id: 'a', prompt: 'What geometric instrument is primarily used alongside a straightedge (ruler) to measure equal radii when constructing a perpendicular from an external point.', answer: 'a compass',
                  options: ['a compass', 'protractor', 'set-square'],
                  hint: 'Review node c7_math_ch14_002 (Perpendicular Bisector of a Line Segment) to practice setting compass.',
                  misconception: 'Students often change the compass radius halfway through a construction sequence—for instance, changing the radius when moving from marking.' }
          ],
            remediations: { 'students-often-change-the-compass': { steps: ['Remind the student that the compass is a tool for maintaining identical distances.', 'Tell them: "Check your screw!', 'If your compass legs wiggle or you change the gap between the pencil tip and needle, your entire symmetry breaks.', 'Lock your compass width, write down or check the setting, and never alter the radius once an arc sequence has begun.".'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_010', difficulty: 'standard',
          question: 'Applications of geometric constructions involve using fundamental ruler and.',
          hint: 'Review c7_math_ch14_002 and c7_math_ch14_003 to practice the mechanical steps.',
          misconception: 'Students frequently confuse which construction method to apply when translating real-world constraints, such as using.',
          parts: [
                { id: 'a', prompt: 'Which fundamental geometric construction tool is used to replicate an angle of a given measure or draw arcs of equal radius?', answer: 'a compass',
                  options: ['a compass', 'a protractor', 'a set square'],
                  hint: 'Review c7_math_ch14_002 and c7_math_ch14_003 to practice the mechanical steps of bisecting segments.',
                  misconception: 'Students frequently confuse which construction method to apply when translating real-world constraints, such as using an angle bisector.' }
          ],
            remediations: { 'students-frequently-confuse-which-construction': { steps: ['To correct this, guide the student to first translate the physical word problem into a precise geometric statement: ask.', 'Have them physically fold paper models to verify this relationship before picking up the compass again.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch14_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse which construction method to apply when translating real-world constraints, such as using.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following student claim: "To find a point on a boundary wall that is the shortest distance from a water pipe represented by a line, I need.', answer: 'that the claim is incorrect',
                  options: ['that the claim is incorrect', 'shortest distance'],
                  hint: 'Review c7_math_ch14_002 and c7_math_ch14_003 to practice the mechanical steps of bisecting segments.',
                  misconception: 'Students frequently confuse which construction method to apply when translating real-world constraints, such as using an angle bisector.' }
          ],
            remediations: { 'students-frequently-confuse-which-construction': { steps: ['To correct this, guide the student to first translate the physical word problem into a precise geometric statement: ask.', 'Have them physically fold paper models to verify this relationship before picking up the compass again.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
