import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch12_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch12_p2: SimDef = {
    id: 'v3_c9_math_ch12_p2',
    title: 'Quadrilaterals · Part 2/2',
    subtitle: 'This node covers the definitions, properties, and interrelationships of rectangles.',
    classLevel: 9, subject: 'mathematics', topic: 'Quadrilaterals · Part 2/2',
    chapters: ['c9_math_ch12'],
    nodeIds: ['c9_math_ch12_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Suppose a carpenter is building a window frame and measures the diagonals to check if it\'s perfectly.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State the *minimum* additional condition needed to guarantee that a parallelogram is (a) a rectangle, (b) a rhombus, and (c) a square.',
        options: ['a rectangle, (', 'diagonals are equal', 'diagonals are perpendicular'],
        answer: 'a rectangle, (',
        hook: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are.',
    },
    teaching: [
        { title: 'Special Parallelograms: Rectangle, Rhombus, Square', text: 'A rectangle is a parallelogram with one angle equal to 90° (which forces all four angles to be 90°). A rhombus is a parallelogram with all four sides of equal length.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch12_7', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_7', title: 'Special Parallelograms: Rectangle, Rhombus, Square',
          scaffold: { problem: 'In rhombus PQRS, diagonal PR = 14 cm and diagonal QS = 48 cm. Find the length of side PQ and the perimeter of the rhombus.',
            steps: [
            { text: 'Recall that diagonals of a rhombus are perpendicular bisectors of each other. So PR ⊥ QS and they bisect at point O.' },
            { text: 'In right triangle ΔPOQ, ∠POQ = 90° (diagonals are perpendicular). PO = 7 cm, QO = 24 cm are the legs.' },
            { text: 'Apply Pythagoras theorem: PQ² = PO² + QO² = 7² + 24² = 49 + 576 = 625.' },
            { text: 'PQ = √625 = 25 cm. Since all sides of a rhombus are equal, each side = 25 cm.' },
            { text: 'Perimeter = 4 × side = 4 × 25 = 100 cm. Verify: 7-24-25 is a Pythagorean triple, so calculation is consistent.', faded: true, blankAnswer: 'Side PQ = 25 cm, Perimeter = 100 cm.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch12_7', title: 'Rapid check',
          drill: { kind: 'algebra,linear2', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch12_7', title: 'You made it',
          caseStudy: { intro: 'You finished Quadrilaterals — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch12_7', difficulty: 'standard',
          question: 'A rectangle is a parallelogram with one angle equal to 90° (which forces all.',
          hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence).',
          misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are.',
          parts: [
                { id: 'a', prompt: 'State the *minimum* additional condition needed to guarantee that a parallelogram is (a) a rectangle, (b) a rhombus, and (c) a square.', answer: 'a rectangle, (',
                  options: ['a rectangle, (', 'diagonals are equal', 'diagonals are perpendicular'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' },
                { id: 'b', prompt: 'In a rhombus ABCD, diagonal AC is drawn. A student claims that ∠BAC = ∠DAC because "diagonals of a rhombus bisect the angles." Is this *always* true?', answer: 'Yes, it is always true',
                  options: ['Yes, it is always true', 'only if it\'s a square', 'diagonals are perpendicular', 'diagonals bisect angles'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' },
                { id: 'c', prompt: 'The diagonals of a rectangle are 10 cm and 10 cm. The diagonals of a rhombus are 12 cm and 16 cm. Find the side length of each quadrilateral.', answer: 'Rectangle: Diagonals are equal and bisect each other',
                  options: ['Rectangle: Diagonals are equal and bisect each other', '10 cm for both', 'diagonals are perpendicular', 'diagonals are equal'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' },
                { id: 'd', prompt: 'A quadrilateral has diagonals that are equal in length and bisect each other at right angles. Must it be a square?', answer: 'Yes, it must be a square',
                  options: ['Yes, it must be a square', 'could be a rhombus with equal diagonals', 'diagonals are perpendicular', 'diagonals are equal'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' }
          ],
            remediations: { 'diagonals-are-perpendicular-is-a': { steps: ['Draw a general parallelogram (slanted, not rectangle/rhombus) and measure its diagonals — show they are neither equal.', 'Draw a rectangle (non-square) and measure diagonals — show they are equal but *not* perpendicular.', 'Draw a rhombus (non-square) — show diagonals are perpendicular but *not* equal.', 'Create a comparison table: Parallelogram / Rectangle / Rhombus / Square vs.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are.',
          parts: [
                { id: 'a', prompt: 'A student proves that a quadrilateral is a square by showing: (1) opposite sides are parallel, (2) all sides are equal, (3) one angle is 90°.', answer: 'The proof is logically sufficient but has a redundant step',
                  options: ['The proof is logically sufficient but has a redundant step', 'it\'s complete and perfect', 'all sides equal', 'diagonals are perpendicular'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' },
                { id: 'b', prompt: 'Construct a problem where a carpenter checks if a wooden frame is a perfect rectangle by measuring only the diagonals.', answer: 'Problem: A carpenter builds a frame with opposite sides equal',
                  options: ['Problem: A carpenter builds a frame with opposite sides equal', 'diagonals are perpendicular', 'diagonals are equal'],
                  hint: 'Revisit c9_math_ch12_3 (parallelogram properties) and c7_math_ch09_005 (SSS congruence) — practice.',
                  misconception: 'Students believe that "diagonals are perpendicular" is a property of *all* parallelograms, or that "diagonals are equal" is a property.' }
          ],
            remediations: { 'diagonals-are-perpendicular-is-a': { steps: ['Draw a general parallelogram (slanted, not rectangle/rhombus) and measure its diagonals — show they are neither equal.', 'Draw a rectangle (non-square) and measure diagonals — show they are equal but *not* perpendicular.', 'Draw a rhombus (non-square) — show diagonals are perpendicular but *not* equal.', 'Create a comparison table: Parallelogram / Rectangle / Rhombus / Square vs.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
