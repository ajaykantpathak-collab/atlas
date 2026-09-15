import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch09_p2: SimDef = {
    id: 'v3_c10_math_ch09_p2',
    title: 'Some Applications of Trigonometry · Part 2/2',
    subtitle: 'Measure skyscrapers and rivers with nothing but angles',
    classLevel: 10, subject: 'mathematics', topic: 'Some Applications of Trigonometry · Part 2/2',
    chapters: ['c10_math_ch09'],
    nodeIds: ['c10_math_cbse_09_007', 'c10_math_cbse_09_008', 'c10_math_cbse_09_009', 'c10_math_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field surveyor armed with a clinometer', intro: 'Your instruments: a protractor-like clinometer, a measuring tape, and trigonometry. Your targets: things nobody can reach — treetops, towers, the far bank of a river.', goal: 'Distinguish angle of elevation from depression, set up correct right triangles from word problems, and solve height-and-distance cases.' },
    discovery: {
        question: 'You stand 50 m from a tower and tilt your head up 30° to see its top. A classmate starts climbing to measure it directly. Who gets the height first — and how?',
        options: ['You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed', 'The classmate — indirect methods are always rough estimates', 'Neither — you also need the tower\'s shadow length', 'You — but only if you also measure the angle of depression'],
        answer: 'You — tan 30° = height ÷ 50 gives the answer (~28.9 m) from a single angle and a single distance, no climbing needed',
        hook: 'Angle of elevation plus one ground distance secretly builds a whole right triangle. Trigonometry lets you \'measure\' heights that no tape can reach.',
    },
    teaching: [
        { title: 'Heights and Distances: Two-Step Problems Using Multiple Ratios', text: 'Two-step height and distance problems require setting up and solving two trigonometric equations sequentially or simultaneously using different trigonometric ratios (tan, sin, cos) from two distinct.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_09_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Survey the unclimbable: compute heights of towers, widths of rivers and depths of valleys using only angles of elevation and depression — and learn to spot which ratio fits which problem.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_007', title: 'Heights and Distances: Two-Step Problems Using Multiple Ratios',
          scaffold: { problem: 'From a point on the ground, the angle of elevation of the top of a vertical tower is 30°.',
            steps: [
            { text: 'Read the problem carefully. Identify the two observation points: Point A (first position) and Point B (second position.' },
            { text: 'Draw a clear diagram. Draw a vertical line for the tower (height h).' },
            { text: 'In right triangle formed by Point A, the tower\'s foot, and the top: tan 30° = opposite/adjacent = h / d.' },
            { text: 'In right triangle formed by Point B, the tower\'s foot, and the top: tan 60° = h / (d − 50).' },
            { text: 'Equate the two expressions for h from Equation 1 and Equation 2: d / √3 = √3 (d − 50).' },
            { text: 'Substitute d = 75 into Equation 1: h = 75 / √3 = 75√3 / 3 = 25√3 m. Using √3 = 1.732, h ≈ 25 × 1.732 = 43.3 m.' },
            { text: 'Verify the solution. Check Equation 1: tan 30° = 43.3 / 75 ≈ 0.577 ✓ (1/√3 ≈ 0.577).', faded: true, blankAnswer: 'Height of tower = 25√3 m (≈ 43.3 m). Distance from first.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_008', title: 'Word Problems: Finding Height of a Tower/Tree',
          scaffold: { problem: 'From a point on the ground 40 m away from the foot of a tower, the angle of elevation of the top of the tower is 30°.',
            steps: [
            { text: 'Identify given and unknown. Horizontal distance \\( d = 40 \\) m, angle of elevation \\( \\theta = 30° \\), observer.' },
            { text: 'Draw the right triangle. Vertical side = tower height \\( h \\) (opposite to 30°).' },
            { text: 'Choose the trigonometric ratio that connects opposite and adjacent: \\( \\tan \\theta.' },
            { text: 'Substitute the exact value \\( \\tan 30° = \\frac{1}{\\sqrt{3}} \\). So \\( \\frac{1}{\\sqrt{3}} = \\frac{h}{40} \\).' },
            { text: 'Verify: \\( \\tan 30° \\approx 0.577 \\), \\( \\frac{23.09}{40} \\approx 0.577 \\). Units: metres.', faded: true, blankAnswer: '23.09 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_009', title: 'Word Problems: Finding Distance Using Angle of Depression',
          scaffold: { problem: 'From the top of a vertical cliff 80 m high, the angle of depression of a boat at sea is 30°.',
            steps: [
            { text: 'Identify given: height of cliff (AB) = 80 m, angle of depression from A to boat C = 30°. Asked: horizontal distance BC.' },
            { text: 'Draw diagram. Vertical line AB = 80 m. Horizontal line through A. Line of sight AC down to boat at C.' },
            { text: 'In right triangle ABC, relative to angle C (30°), opposite side = AB = 80 m, adjacent side = BC = distance (unknown).' },
            { text: 'tan 30° = 1/√3. So 1/√3 = 80 / BC → BC = 80√3 = 80 × 1.732 = 138.56 m.' },
            { text: 'Verify: tan 30° ≈ 0.577, 80/138.56 ≈ 0.577. Correct. Distance = 138.56 m.', faded: true, blankAnswer: '138.56 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_010', title: 'Word Problems: Ships and Lighthouses (Two Angles)',
          scaffold: { problem: 'The lighthouse at Chennai port is 75 m high. From its top, the angles of depression of two ships on the same side are observed to be 30°.',
            steps: [
            { text: 'Draw a diagram. Let AB be the lighthouse of height 75 m. Let C and D be the positions of the two ships on the same.' },
            { text: 'In right triangle ABC (right angle at B), tan 45° = AB / BC. So BC = AB / tan 45° = 75 / 1 = 75 m.' },
            { text: 'In right triangle ABD (right angle at B), tan 30° = AB / BD. So BD = AB / tan 30° = 75 / (1/√3) = 75√3 = 75 × 1.732.' },
            { text: 'Since both ships are on the same side, the distance between them = BD - BC = 129.9 - 75 = 54.9 m.' },
            { text: 'Verify: The farther ship has smaller angle of depression (30°) and larger horizontal distance.', faded: true, blankAnswer: '54.9 m' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_09_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school wants the flagpole\'s height painted on the new noticeboard, but nobody can climb it and the pole is too tall for a ladder. A student claims the height simply cannot be found without going up.',
            decisions: [{ prompt: 'How can trigonometry measure the pole from the ground?', options: [
                { text: 'Stand a known distance from the base — say 10 m — and measure the angle of elevation to the top. Then tan θ = height ÷ distance, so height = 10 tan θ, plus the observer\'s eye height. The line of sight, the ground and the pole form a right triangle, so one angle and one side give the unreachable side.', outcome: 'This is the everyday power of angles of elevation: any tall object — tower, tree, building — becomes measurable with a tape and an angle, no climbing needed.' },
                { text: 'The student is right — a vertical height can only be measured by going to the top with a tape.', outcome: 'Angles let you measure what you cannot reach — a right triangle forms between you, the base and the top, and trigonometry solves for the pole.', reveals: 'must-climb-to-measure' },
                { text: 'You can only estimate by comparing shadows — exact height from the ground is impossible.', outcome: 'Shadow comparison is one valid trick, but measuring the angle of elevation with a clinometer gives an exact answer too — ground measurement is quite possible.', reveals: 'only-shadows-work' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'Every squint upward at a building is a hidden right triangle. Read the angle, pace the ground, and tan does the climbing for you.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_09_007', difficulty: 'standard',
          question: 'Two-step height and distance problems require setting up and solving two.',
          hint: 'If stuck, review c9_math_ch2_8 (solving linear equations: substitution method) and.',
          misconception: 'Students consistently write the second horizontal distance as *d* − *x* regardless of whether the observer moves.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two-step height and distance problems require setting up and solving two trigonometric',
                  options: ['Two-step height and distance problems require setting up and solving two trigonometric', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of elevation is the angle formed between the horizontal line (drawn through the', 'The angle of depression is the angle formed between the horizontal line through the'],
                  hint: 'If stuck, review c9_math_ch2_8 (solving linear equations: substitution method) and.',
                  misconception: 'Students consistently write the second horizontal distance as *d* − *x* regardless of whether the observer moves towards or away from the.' }
          ],
            remediations: { 'students-consistently-write-the-second': { steps: ['Ask the student to physically act out the scenario: stand at a point, point to an object (top of a door), walk 3 steps.', 'Ask: "Did your distance to the door increase or decrease?" Then draw the two triangles side by side on paper.', 'For the second triangle, ask: "Is the new base longer or shorter than *d*?" If closer → shorter → *d* − *x*.', 'If farther → longer → *d* + *x*.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_008', difficulty: 'standard',
          question: 'Word problems on finding the height of a tower or tree involve using.',
          hint: 'If stuck, revisit node c10_math_cbse_09_005 (Angle of Elevation Problems) and practice.',
          misconception: '**Exact error:** Students use the full tower height H as the opposite side in \\( \\tan \\theta = \\frac{H}{d} \\) even when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on finding the height of a tower or tree involve using trigonometric ratios',
                  options: ['Word problems on finding the height of a tower or tree involve using trigonometric ratios', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of elevation is the angle formed between the horizontal line (drawn through the', 'The angle of depression is the angle formed between the horizontal line through the'],
                  hint: 'If stuck, revisit node c10_math_cbse_09_005 (Angle of Elevation Problems) and practice drawing the.',
                  misconception: '**Exact error:** Students use the full tower height H as the opposite side in \\( \\tan \\theta = \\frac{H}{d} \\) even when the problem.' }
          ],
            remediations: { 'exact-error-students-use-the': { steps: ['Make the student re-read the problem and underline "from his eyes" or "from a point 1.5 m above ground".', 'Ask: "Where does the line of sight start?', 'At ground or at eye level?" 3.', 'Have them draw two horizontal lines: one at ground, one at eye level.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_009', difficulty: 'standard',
          question: 'The angle of depression is the angle formed between the horizontal line from.',
          hint: 'If stuck, revisit c7_math_ch05_008 (Alternate angles formed by a transversal) and.',
          misconception: 'Students often place the given angle of depression at the top of the vertical structure (between the vertical side and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle of depression is the angle formed between the horizontal line from an',
                  options: ['The angle of depression is the angle formed between the horizontal line from an', 'The line of sight is the straight line drawn from the eye of an observer to the point', 'The angle of elevation is the angle formed between the horizontal line (drawn through the', 'The angle of depression is the angle formed between the horizontal line through the'],
                  hint: 'If stuck, revisit c7_math_ch05_008 (Alternate angles formed by a transversal) and.',
                  misconception: 'Students often place the given angle of depression at the top of the vertical structure (between the vertical side and the line of sight).' }
          ],
            remediations: { 'students-often-place-the-given': { steps: ['If a student places the angle of depression at the top of the tower: 1) Draw two horizontal lines: one at the.', '2) Draw the line of sight.', '3) Mark the angle of depression between the upper horizontal and the line of sight.', '4) State: "These two horizontals are parallel, so the alternate interior angle at the object is equal to the angle.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_010', difficulty: 'standard',
          question: 'Word problems involving ships and lighthouses with two angles refer to.',
          hint: 'If stuck, review c10_math_cbse_09_003 (Angle of Depression: Definition and.',
          misconception: 'The most common error is mixing up the order of subtraction when ships are on the same side.',
          parts: [
                { id: 'a', prompt: 'From the top of a lighthouse 80 m high, the angles of depression of two ships on opposite sides are 30° and 45°. Find the distance between the two ships.', answer: 'Let height h = 80 m',
                  options: ['Let height h = 80 m', 'opposite sides'],
                  hint: 'If stuck, review c10_math_cbse_09_003 (Angle of Depression: Definition and Identification) and.',
                  misconception: 'The most common error is mixing up the order of subtraction when ships are on the same side.' }
          ],
            remediations: { 'the-most-common-error-is': { steps: ['If a student makes the subtraction-order error, have them draw the two right triangles side by side, label the.', 'Ask: "Which ship is closer?', 'Which distance is smaller?" Since x = h cot α, y = h cot β, and α > β, then cot α < cot β, so x < y.', 'The distance between ships = y - x = h(cot β - cot α).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
