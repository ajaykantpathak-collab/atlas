import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch10_p2: SimDef = {
    id: 'v3_c9_math_ch10_p2',
    title: 'Lines and Angles · Part 2/2',
    subtitle: 'This node covers the definition, identification, and application of the Corresponding.',
    classLevel: 9, subject: 'mathematics', topic: 'Lines and Angles · Part 2/2',
    chapters: ['c9_math_ch10'],
    nodeIds: ['c9_math_ch10_6', 'c9_math_ch10_7', 'c9_math_ch10_8', 'c9_math_ch10_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Imagine you are designing a zebra crossing on a road with two parallel white lines marking the lane edges.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two lines *AB* and *CD* are cut by a transversal *EF*. ∠2 and ∠6 are alternate interior angles.',
        options: ['Yes, the statement is always true', 'Only if corresponding angles are also equal', 'parallelism requires multiple conditions simultaneously'],
        answer: 'Yes, the statement is always true',
        hook: 'Students incorrectly apply the **forward theorem** (parallel → angles equal) when the problem requires the **converse**.',
    },
    teaching: [
        { title: 'Parallel Lines and Transversals: Corresponding Angles', text: 'When a transversal intersects two parallel lines, the pair of angles that lie on the **same side of the transversal** and in **corresponding positions** (both above the lines or both below the lines).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch10_6', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_6', title: 'Parallel Lines and Transversals: Corresponding Angles',
          scaffold: { problem: 'A railway track has two parallel rails. A crossing gate arm (transversal) makes an angle of $55^\\circ$ with the left rail on the city-side.',
            steps: [
            { text: 'Draw two parallel horizontal lines (rails). Draw a transversal slanting down-right.' },
            { text: 'Identify the angle asked: top-right angle between transversal and right rail.' },
            { text: 'Apply Corresponding Angles Axiom: Since rails are parallel, corresponding angles are equal.' },
            { text: '(Extension) In the right triangle formed by gate arm (hypotenuse = 4 m), rail gap (opposite = 1.67 m), $\\sin(\\theta).' },
            { text: 'Final answer: The gate arm makes a $55^\\circ$ angle with the right rail on the city-side.', faded: true, blankAnswer: '$55^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_7', title: 'Alternate Interior Angles and Converse',
          scaffold: { problem: 'A railway track has two parallel rails *AB* and *CD*. A crossing gate (transversal *EF*) intersects *AB* at *G* and *CD* at *H*.',
            steps: [
            { text: 'Identify the configuration: *AB* || *CD* (given), *EF* is transversal.' },
            { text: 'Apply Alternate Interior Angle Theorem: Since *AB* || *CD*, ∠EGD = ∠GHC.' },
            { text: 'Substitute given value: ∠EGD = 110°, therefore ∠GHC = 110°.' },
            { text: 'Check perpendicularity: A line is perpendicular to another if the angle between them is 90°. Here ∠GHC = 110° ≠ 90°.' },
            { text: 'Conclude: The crossing gate is NOT perpendicular to the rails; it crosses at an oblique angle of 110° (or 70° on the.', faded: true, blankAnswer: '∠GHC = 110°. The gate is not perpendicular to the rails.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_8', title: 'Interior Angles on Same Side of Transversal',
          scaffold: { problem: 'A railway track has two parallel rails. A crossing gate (transversal) makes an angle of (4x – 20)° with one rail on the interior side.',
            steps: [
            { text: 'Identify the angle pair — they are interior angles on the same side of the transversal (co-interior angles).' },
            { text: 'Recall the theorem: If lines are parallel, co-interior angles are supplementary (sum = 180°).' },
            { text: 'Simplify: 6x + 20 = 180 → 6x = 160 → x = 80/3 ≈ 26.67.' },
            { text: 'Compute angles: ∠1 = 4(80/3) – 20 = 320/3 – 60/3 = 260/3 ≈ 86.67°. ∠2 = 2(80/3) + 40 = 160/3 + 120/3 = 280/3 ≈ 93.33°.' },
            { text: 'Verify: 260/3 + 280/3 = 540/3 = 180° ✓. By converse, since co-interior angles sum to 180°, rails are parallel.', faded: true, blankAnswer: 'x = 80/3 (≈26.67), angles are 260/3° (≈86.67°) and 280/3°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_9', title: 'Lines Parallel to the Same Line',
          scaffold: { problem: 'In a city road plan, three straight roads — MG Road, Brigade Road, and Church Street — are such that MG Road || Brigade Road and Brigade.',
            steps: [
            { text: 'Identify given: MG Road || Brigade Road, Brigade Road || Church Street.' },
            { text: 'Apply theorem: Since MG Road || Brigade Road and Brigade Road || Church Street, therefore MG Road || Church Street.' },
            { text: 'Since MG Road || Church Street and the flyover is a transversal cutting both, corresponding angles are equal.' },
            { text: 'The angle at A (62°) and the angle at C are corresponding angles → ∠C = 62°.' },
            { text: 'Verify: The flyover also crosses Brigade Road at B. ∠B = 62° (corresponding, MG Road || Brigade Road).', faded: true, blankAnswer: '62°' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch10_9', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch10_9', title: 'You made it',
          caseStudy: { intro: 'You finished Lines and Angles — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch10_6', difficulty: 'standard',
          question: 'When a transversal intersects two parallel lines, the pair of angles that lie.',
          hint: 'Revisit c7_math_ch05_007 (Corresponding Angles Formed by a Transversal) and.',
          misconception: 'Students often confuse **corresponding angles** with **alternate interior angles** because both are "equal" when lines.',
          parts: [
                { id: 'a', prompt: 'Two lines $AB$ and $CD$ are cut by a transversal $EF$. A student claims $\\angle AEF$ and $\\angle CFE$ are corresponding angles. Is the student correct?', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'position'],
                  hint: 'Revisit c7_math_ch05_007 (Corresponding Angles Formed by a Transversal) and c9_math_ch10_1 (Basic.',
                  misconception: 'Students often confuse **corresponding angles** with **alternate interior angles** because both are "equal" when lines are parallel.' }
          ],
            remediations: { 'students-often-confuse-corresponding-angles': { steps: ['**Re-teach the "Same Side" rule**: Draw a large diagram on the board.', 'Place a ruler along the transversal.', 'Ask: "Are both angles on the *left* of the ruler?', 'Or both on the *right*?" If yes $\\rightarrow$ corresponding.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_7', difficulty: 'standard',
          question: 'When a transversal intersects two parallel lines, the pair of angles formed.',
          hint: 'Revisit c9_math_ch10_5 (Vertically Opposite Angles) and c9_math_ch10_6 (Corresponding.',
          misconception: 'Students incorrectly apply the **forward theorem** (parallel → angles equal) when the problem requires the **converse**.',
          parts: [
                { id: 'a', prompt: 'Two lines *AB* and *CD* are cut by a transversal *EF*. ∠2 and ∠6 are alternate interior angles.', answer: 'Yes, the statement is always true',
                  options: ['Yes, the statement is always true', 'Only if corresponding angles are also equal', 'parallelism requires multiple conditions simultaneously'],
                  hint: 'Revisit c9_math_ch10_5 (Vertically Opposite Angles) and c9_math_ch10_6 (Corresponding Angles).',
                  misconception: 'Students incorrectly apply the **forward theorem** (parallel → angles equal) when the problem requires the **converse** (angles equal →.' },
                { id: 'b', prompt: 'Consider two lines *l* and *m* cut by transversal *t*. ∠3 = 70° and ∠5 = 110° (alternate interior angles).', answer: 'The conclusion is **invalid**',
                  options: ['The conclusion is **invalid**', 'Alternate Interior Angles', 'Interior Angles on the Same Side of the Transversal'],
                  hint: 'Revisit c9_math_ch10_5 (Vertically Opposite Angles) and c9_math_ch10_6 (Corresponding Angles).',
                  misconception: 'Students incorrectly apply the **forward theorem** (parallel → angles equal) when the problem requires the **converse** (angles equal →.' }
          ],
            remediations: { 'students-incorrectly-apply-the-forward': { steps: ['**Colour-Code the Logic:** Give the student two highlighters.', 'Highlight "Given" statements in GREEN and "To Prove" in RED.', 'In the converse problem, "l || m" will be RED (target), not green.', '**Flowchart the Direction:** Draw two flowcharts side-by-side: - Forward: [Parallel Lines] → (Theorem) → [Alt.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_8', difficulty: 'standard',
          question: 'When a transversal intersects two parallel lines, the pair of interior angles.',
          hint: 'Revisit c9_math_ch10_7 (Alternate Interior Angles) and c9_math_ch10_4 (Linear Pairs).',
          misconception: 'Students consistently set co-interior angles equal to each other (like alternate interior angles) instead of summing.',
          parts: [
                { id: 'a', prompt: 'Two lines are cut by a transversal. One pair of interior angles on the same side are 105° and 75°. Another pair are 110° and 80°. Are the lines parallel?', answer: 'First pair: 105° + 75° = 180° → supplementary',
                  options: ['First pair: 105° + 75° = 180° → supplementary', 'yes, because one pair sums to 180°'],
                  hint: 'Revisit c9_math_ch10_7 (Alternate Interior Angles) and c9_math_ch10_4 (Linear Pairs) — practice.',
                  misconception: 'Students consistently set co-interior angles equal to each other (like alternate interior angles) instead of summing them to 180°.' }
          ],
            remediations: { 'students-consistently-set-co-interior': { steps: ['Draw a clear diagram with parallel lines and transversal. Colour-code: mark alternate interior angles in GREEN (equal).', 'Have the student trace the path: "Start at ∠1, go to its alternate interior ∠3 (GREEN, equal), then ∠3 + ∠2 = 180°.', 'Practice 5 problems where they must FIRST classify the angle pair (alternate? corresponding?', 'Use the mnemonic "Same Side Sums to Straight (180°)" — write it on a sticky note for their desk.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_9', difficulty: 'standard',
          question: 'If two distinct lines are each parallel to the same line, then they are.',
          hint: 'Revisit c9_math_ch10_6 (Corresponding Angles) and c9_math_ch10_7 (Alternate Interior.',
          misconception: 'Students believe the theorem "lines parallel to the same line are parallel to each other" applies only when all three.',
          parts: [
                { id: 'a', prompt: 'Compare the following two statements: (A) "If two lines are perpendicular to the same line, they are parallel to each other." (B) "If two lines are parallel.', answer: 'Both are TRUE in Euclidean plane geometry',
                  options: ['Both are TRUE in Euclidean plane geometry', 'lines parallel to the same line are parallel to each other'],
                  hint: 'Revisit c9_math_ch10_6 (Corresponding Angles) and c9_math_ch10_7 (Alternate Interior Angles).',
                  misconception: 'Students believe the theorem "lines parallel to the same line are parallel to each other" applies only when all three lines are cut by the.' }
          ],
            remediations: { 'the-theorem-lines-parallel-to': { steps: ['Draw three lines l, m, n on paper with l || m and m || n but NO transversal. Ask: "Are l and n parallel?"', 'Place a ruler along l and n — they never meet.', 'Now draw a transversal cutting only l and m. Ask: "Does this change whether l || n?"', 'Emphasise: "Parallelism is a property of the lines themselves.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
