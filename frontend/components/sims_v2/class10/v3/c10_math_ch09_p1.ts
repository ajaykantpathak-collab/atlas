import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch09_p1: SimDef = {
    id: 'v3_c10_math_ch09_p1',
    title: 'Some Applications of Trigonometry · Part 1/2',
    subtitle: 'Measure skyscrapers and rivers with nothing but angles',
    classLevel: 10, subject: 'mathematics', topic: 'Some Applications of Trigonometry · Part 1/2',
    chapters: ['c10_math_ch09'],
    nodeIds: ['c10_math_cbse_09_001', 'c10_math_cbse_09_002', 'c10_math_cbse_09_003', 'c10_math_cbse_09_004', 'c10_math_cbse_09_005', 'c10_math_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field surveyor armed with a clinometer', intro: 'Your instruments: a protractor-like clinometer, a measuring tape, and trigonometry. Your targets: things nobody can reach — treetops, towers, the far bank of a river.', goal: 'Distinguish angle of elevation from depression, set up correct right triangles from word problems, and solve height-and-distance cases.' },
    discovery: {
        question: 'You stand 50 m from a tower and tilt your head up 30° to see its top. A classmate starts climbing to measure it directly. Who gets the height first — and how?',
        options: ['You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed', 'The classmate — indirect methods are always rough estimates', 'Neither — you also need the tower\'s shadow length', 'You — but only if you also measure the angle of depression'],
        answer: 'You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed',
        hook: 'Angle of elevation plus one ground distance secretly builds a whole right triangle. Trigonometry lets you \'measure\' heights that no tape can reach.',
    },
    teaching: [
        { title: 'Line of Sight: Definition and Identification', text: 'The line of sight is the straight line drawn from the eye of an observer to the point being viewed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_09_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Survey the unclimbable: compute heights of towers, widths of rivers and depths of valleys using only angles of elevation and depression — and learn to spot which ratio fits which problem.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_001', title: 'Line of Sight: Definition and Identification',
          scaffold: { problem: 'A person standing on the ground looks up at the top of a 30 m tall tower. The angle of elevation is 45°.',
            steps: [
            { text: 'Draw the diagram. Tower = vertical side (30 m), distance = horizontal side (unknown d), line of sight = hypotenuse from.' },
            { text: 'Angle of elevation = 45° (between line of sight and horizontal).' },
            { text: 'Identify the ratio: tan 45° = opposite/adjacent = height/distance = 30/d.' },
            { text: 'Since tan 45° = 1, we have 1 = 30/d, so d = 30 m.' },
            { text: 'The person is 30 m from the base of the tower.', faded: true, blankAnswer: 'The person is 30 m from the base of the tower.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_002', title: 'Angle of Elevation: Definition and Identification',
          scaffold: { problem: 'A girl stands 15 m away from a tree. She looks at the top of the tree. The angle of elevation of the top of the tree from her eye is 30°.',
            steps: [
            { text: 'Identify the observer\'s position. The girl\'s eye is at point O on the ground level. Mark point O.' },
            { text: 'Identify the object. The top of the tree is point T. The foot of the tree is point B directly below T on the ground.' },
            { text: 'Draw the horizontal line through O. This line is parallel to the ground (and parallel to OB).' },
            { text: 'Draw the line of sight. Join O to T with a straight line segment OT.' },
            { text: 'Mark the angle of elevation. At point O, the angle between the horizontal line (towards the tree) and the line of sight.' },
            { text: 'Label known measurements. Horizontal distance OB = 15 m. Height TB = h (unknown). Angle at O = 30°.', faded: true, blankAnswer: 'Diagram with points O, B, T; horizontal through O; line.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_003', title: 'Angle of Depression: Definition and Identification',
          scaffold: { problem: 'From the top of a 25 m high electric pole, the angle of depression of a point on the ground is 30°.',
            steps: [
            { text: 'Identify the observer\'s position — top of the electric pole. Label this point O.' },
            { text: 'Draw the horizontal line through the observer\'s eye O. Label a point H on this horizontal line to the right of O.' },
            { text: 'Identify the object — a point on the ground. Label this point P.' },
            { text: 'Mark the angle of depression — it is the angle between the horizontal OH and the line of sight OP, measured downward.' },
            { text: 'Draw the horizontal line through the object P, parallel to OH.' },
            { text: 'The line of sight OP acts as a transversal cutting the two parallel lines OH and PQ.' },
            { text: 'Complete the right triangle — the pole OB is vertical, the ground BP is horizontal, so ∠OBP = 90°.', faded: true, blankAnswer: 'Diagram drawn with all labels. Angle of depression = 30°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_004', title: 'Heights and Distances: Basic Single-Step Problems',
          scaffold: { problem: 'The angle of elevation of the top of a vertical pole from a point on the ground 25 m away from its base is 30°.',
            steps: [
            { text: 'Identify given and unknown — Horizontal distance from point to pole base = 25 m (adjacent side).' },
            { text: 'Draw the right triangle — Ground is horizontal base (25 m). Pole is vertical (h).' },
            { text: 'Choose the trigonometric ratio — We know adjacent (25 m) and need opposite (h).' },
            { text: 'Substitute and set up equation — tan 30° = h/25. We know tan 30° = 1/√3.' },
            { text: 'Solve algebraically — 1/√3 = h/25 → h = 25/√3. Rationalise denominator: h = (25√3)/3 m.' },
            { text: 'Calculate decimal value if required — h = (25 × 1.732)/3 = 43.3/3 = 14.43 m (approx).' },
            { text: 'Write final answer with units — Height of pole = 25/√3 m (exact) or 14.43 m (approx).', faded: true, blankAnswer: 'Height of pole = 25/√3 m (exact) ≈ 14.43 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_005', title: 'Heights and Distances: Angle of Elevation Problems',
          scaffold: { problem: 'From a point on the ground 40 m away from the foot of a tower, the angle of elevation of the top of the tower is 30°.',
            steps: [
            { text: 'Draw a right triangle. Label the tower as vertical side AB (height = h), the ground distance as BC = 40 m, and the.' },
            { text: 'Identify the known and unknown: adjacent side BC = 40 m, opposite side AB = h, angle at C = 30°.' },
            { text: 'Choose the trigonometric ratio that relates opposite and adjacent: tan 30° = AB/BC = h/40.' },
            { text: 'Substitute tan 30° = 1/√3. So h/40 = 1/√3 → h = 40/√3. Rationalise: h = (40√3)/3.' },
            { text: 'State the answer with units: Height of tower ≈ 23.09 m (or 23.1 m rounded to one decimal).', faded: true, blankAnswer: '23.09 m (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_006', title: 'Heights and Distances: Angle of Depression Problems',
          scaffold: { problem: 'From the top of a 75 m high building, the angle of depression of a scooter parked on the road is 30°.',
            steps: [
            { text: 'Draw a neat diagram. Let AB be the building (vertical), height = 75 m. Let C be the scooter on horizontal ground.' },
            { text: 'By alternate interior angles, the angle of elevation from C to A is also 30°.' },
            { text: 'Identify sides relative to ∠C = 30°: AB = 75 m is opposite, BC = ? is adjacent.' },
            { text: 'Use tan 30° = opposite/adjacent = AB/BC. Substitute: 1/√3 = 75 / BC.' },
            { text: 'Solve: BC = 75√3 = 75 × 1.732 = 129.9 m.', faded: true, blankAnswer: '129.9 m (approx)' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_09_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school wants the flagpole\'s height painted on the new noticeboard, but nobody can climb it and the pole is too tall for a ladder. A student claims the height simply cannot be found without going up.',
            decisions: [{ prompt: 'How can trigonometry measure the pole from the ground?', options: [
                { text: 'Stand a known distance from the base — say 10 m — and measure the angle of elevation to the top. Then tan θ = height ÷ distance, so height = 10 tan θ, plus the observer\'s eye height. The line of sight, the ground and the pole form a right triangle, so one angle and one side give the unreachable side.', outcome: 'This is the everyday power of angles of elevation: any tall object — tower, tree, building — becomes measurable with a tape and an angle, no climbing needed.' },
                { text: 'The student is right — a vertical height can only be measured by going to the top with a tape.', outcome: 'Angles let you measure what you cannot reach — a right triangle forms between you, the base and the top, and trigonometry solves for the pole.', reveals: 'must-climb-to-measure' },
                { text: 'You can only estimate by comparing shadows — exact height from the ground is impossible.', outcome: 'Shadow comparison is one valid trick, but measuring the angle of elevation with a clinometer gives an exact answer too — ground measurement is quite possible.', reveals: 'only-shadows-work' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every squint upward at a building is a hidden right triangle. Read the angle, pace the ground, and tan does the climbing for you.',
            decisions: [{ prompt: 'What comes next? Some Applications of Trigonometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Some Applications of Trigonometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_09_001', difficulty: 'standard',
          question: 'The line of sight is the straight line drawn from the eye of an observer to the.',
          hint: 'Review trigonometric ratios (c10_math_cbse_08_001) and their values for standard angles.',
          misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.',
          parts: [
                { id: 'a', prompt: 'A student stands 20 m from a building and looks up at a window. She draws the angle from the vertical (not the horizontal). What error has she made?', answer: 'The angle of elevation is always measured from the horizontal, not the vertical',
                  options: ['The angle of elevation is always measured from the horizontal, not the vertical', 'no error, it doesn\'t matter'],
                  hint: 'Review trigonometric ratios (c10_math_cbse_08_001) and their values for standard angles.',
                  misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.' }
          ],
            remediations: { 'students-often-measure-the-angle': { steps: ['Draw a large diagram with observer, object, horizontal line, line of sight, and label all angles and sides.', 'Practice identifying the angle of elevation vs depression in 5 different scenarios.', 'Emphasise: angle is ALWAYS from the horizontal.', 'Draw the horizontal line first.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.',
          parts: [
                { id: 'a', prompt: 'In the right triangle formed by the line of sight, the horizontal distance, and the vertical height, which side is the hypotenuse?', answer: 'The line of sight is always the hypotenuse',
                  options: ['The line of sight is always the hypotenuse', 'the horizontal distance'],
                  hint: 'Review trigonometric ratios (c10_math_cbse_08_001) and their values for standard angles.',
                  misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.' }
          ],
            remediations: { 'students-often-measure-the-angle': { steps: ['Draw a large diagram with observer, object, horizontal line, line of sight, and label all angles and sides.', 'Practice identifying the angle of elevation vs depression in 5 different scenarios.', 'Emphasise: angle is ALWAYS from the horizontal.', 'Draw the horizontal line first.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_002', difficulty: 'standard',
          question: 'The angle of elevation is the angle formed between the horizontal line (drawn.',
          hint: 'If stuck, revisit c6_math_ch07_072 (Angles: Types and Measurement) to review angle naming.',
          misconception: 'Students often draw the horizontal line at the foot of the object (ground level) instead of through the observer\'s eye.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle of elevation is the angle formed between the horizontal line (drawn through the',
                  options: ['The angle of elevation is the angle formed between the horizontal line (drawn through the', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of depression is the angle formed between the horizontal line through the', 'Heights and distances problems involve using trigonometric ratios (sine, cosine, tangent)'],
                  hint: 'If stuck, revisit c6_math_ch07_072 (Angles: Types and Measurement) to review angle naming and.',
                  misconception: 'Students often draw the horizontal line at the foot of the object (ground level) instead of through the observer\'s eye, and then mark the.' }
          ],
            remediations: { 'students-often-draw-the-horizontal': { steps: ['If a student makes this error, first ask: "Where is the observer\'s eye?" Mark point O.', '"Draw a line through O parallel to the ground." This is the horizontal.', '"Draw the line from O to the top of the object." This is the line of sight.', '"The angle between these two lines at O is the angle of elevation." Use a physical demonstration: hold a pen.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_003', difficulty: 'standard',
          question: 'The angle of depression is the angle formed between the horizontal line through.',
          hint: 'If stuck, revisit c7_math_ch05_008 (Alternate Angles Formed by a Transversal) and.',
          misconception: 'Students physically place the angle of depression at the wrong vertex — they draw it inside the right triangle at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle of depression is the angle formed between the horizontal line through the',
                  options: ['The angle of depression is the angle formed between the horizontal line through the', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of elevation is the angle formed between the horizontal line (drawn through the', 'Heights and distances problems involve using trigonometric ratios (sine, cosine, tangent)'],
                  hint: 'If stuck, revisit c7_math_ch05_008 (Alternate Angles Formed by a Transversal) and practice.',
                  misconception: 'Students physically place the angle of depression at the wrong vertex — they draw it inside the right triangle at the object\'s position.' }
          ],
            remediations: { 'students-physically-place-the-angle': { steps: ['Have the student physically act it out — stand on a chair (observer), place an object on the floor.', 'Draw the diagram together on paper: mark observer\'s eye O, horizontal OH, object P, line of sight OP.', 'Draw horizontal through P parallel to OH. Ask: "What angle does OP make with this horizontal at P? That\'s elevation.', 'Practice 3 diagrams where student must mark depression at observer, elevation at object, and state the equality with.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_004', difficulty: 'standard',
          question: 'Heights and distances problems involve using trigonometric ratios (sine.',
          hint: 'Revisit c10_math_cbse_09_002 and c10_math_cbse_09_003 for angle identification, and Class.',
          misconception: '**Misconception:** Students treat the angle of depression as the angle inside the right triangle at the top of the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "tan 30° = 10/h" to find the height h of a tower when the distance from the observer is 10 m and angle of elevation is 30°.', answer: '**Incorrect.** The equation should be tan 30° = h/10 (height/distance), not 10/h',
                  options: ['**Incorrect.** The equation should be tan 30° = h/10 (height/distance), not 10/h', 'tan = adjacent/opposite'],
                  hint: 'Revisit c10_math_cbse_09_002 and c10_math_cbse_09_003 for angle identification, and Class 10.',
                  misconception: '**Misconception:** Students treat the angle of depression as the angle inside the right triangle at the top of the vertical object.' }
          ],
            remediations: { 'misconception-students-treat-the-angle': { steps: ['** Draw two parallel horizontal lines — one at observer\'s eye level (top of tower), one at object\'s base (ground).', '** Explicitly draw the alternate interior angle at the ground level (angle of elevation) and label it equal to the.', '** Draw the right triangle at GROUND LEVEL only. Label: vertical side = height of tower (opposite), horizontal side.', '** Say aloud: "At the ground angle, height is opposite, distance is adjacent. So tan = height/distance." **'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_005', difficulty: 'standard',
          question: 'Angle of elevation is the angle formed between the line of sight and the.',
          hint: 'If stuck, review the definitions of trigonometric ratios in right triangles (Class 10.',
          misconception: 'Students frequently draw the angle of elevation at the top of the object (e.g., at the top of the tower) instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Angle of elevation is the angle formed between the line of sight and the horizontal line',
                  options: ['Angle of elevation is the angle formed between the line of sight and the horizontal line', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of elevation is the angle formed between the horizontal line (drawn through the', 'The angle of depression is the angle formed between the horizontal line through the'],
                  hint: 'If stuck, review the definitions of trigonometric ratios in right triangles (Class 10 Chapter 8).',
                  misconception: 'Students frequently draw the angle of elevation at the top of the object (e.g., at the top of the tower) instead of at the observer\'s eye.' }
          ],
            remediations: { 'students-frequently-draw-the-angle': { steps: ['Have the student physically enact the situation: stand at a point, look up at a tall object (door frame, tree), and use.', 'Ask them to point to where the angle is measured — it must be at their eye.', 'Then draw the diagram together, emphasising that the right angle is at the foot of the object, the angle of elevation.', 'Practice labelling "opposite" and "adjacent" for several diagrams before writing any equation.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_006', difficulty: 'standard',
          question: 'The angle of depression is the angle formed between the horizontal line drawn.',
          hint: 'Review c10_math_cbse_09_003 (Angle of Depression: Definition and Identification) and.',
          misconception: 'Students often draw the angle of depression inside the triangle at the observer\'s vertex (top of the tower) instead.',
          parts: [
                { id: 'a', prompt: 'A student is standing on a cliff 50 m above sea level. The angle of depression to a boat is 45°.', answer: 'The correct ratio is tan 45° = height / distance = 50 / d',
                  options: ['The correct ratio is tan 45° = height / distance = 50 / d', 'sin or cos'],
                  hint: 'Review c10_math_cbse_09_003 (Angle of Depression: Definition and Identification) and.',
                  misconception: 'Students often draw the angle of depression inside the triangle at the observer\'s vertex (top of the tower) instead of at the object\'s.' }
          ],
            remediations: { 'students-often-draw-the-angle': { steps: ['Have the student physically act it out: stand on a chair (observer), place an object on the floor.', 'Stretch a string from eye to object (line of sight).', 'Hold a ruler horizontally at eye level.', 'Show that the angle between ruler and string is the angle of depression.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
