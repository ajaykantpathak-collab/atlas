import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch13_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch13_p2: SimDef = {
    id: 'v3_c9_math_ch13_p2',
    title: 'Surface Areas and Volumes · Part 2/2',
    subtitle: 'This node covers the volume of right circular cones only, using the formula.',
    classLevel: 9, subject: 'mathematics', topic: 'Surface Areas and Volumes · Part 2/2',
    chapters: ['c9_math_ch13'],
    nodeIds: ['c9_math_ch13_7', 'c9_math_ch13_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Imagine you\'re helping your father fill conical bags with cement for a small construction project.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Volume of a Cone', text: 'The volume of a right circular cone is the amount of three-dimensional space enclosed within its surface, calculated as one-third the product of the area of its circular base and its perpendicular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch13_7', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_7', title: 'Volume of a Cone',
          scaffold: { problem: 'A conical tent used for a school fair has a base diameter of 10 m and a height of 12 m.',
            steps: [
            { text: 'Identify given values: diameter = 10 m → radius r = diameter/2 = 5 m; height h = 12 m; π = 3.14' },
            { text: 'Write the volume formula for a cone: V = (1/3)πr²h' },
            { text: 'Calculate r²: r² = 5² = 25 m²' },
            { text: 'Substitute into formula: V = (1/3) × 3.14 × 25 × 12' },
            { text: 'Compute step by step: First, 3.14 × 25 = 78.5; then 78.5 × 12 = 942; finally, 942 ÷ 3 = 314' },
            { text: 'State answer with units: V = 314 m³', faded: true, blankAnswer: '314 m³' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch13_8', title: 'Volume of a Sphere and Hemisphere',
          scaffold: { problem: 'A spherical water tank for a village school has a radius of 2.1 metres. How many litres of water can it hold when full? (Use π = 22/7)',
            steps: [
            { text: 'Identify given: radius r = 2.1 m. Required: volume in litres. Recall 1 m³ = 1000 litres.' },
            { text: 'Use sphere volume formula V = (4/3)πr³.' },
            { text: 'Substitute r = 2.1 = 21/10 m and π = 22/7: V = (4/3) × (22/7) × (21/10)³.' },
            { text: 'Compute stepwise: (21/10)³ = 9261/1000. Then V = (4/3) × (22/7) × (9261/1000) = (4 × 22 × 9261) / (3 × 7 × 1000).' },
            { text: 'Convert to litres: 38.808 × 1000 = 38,808 litres. Interpret: The tank holds 38,808 L of water.', faded: true, blankAnswer: '38,808 litres' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch13_8', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch13_8', title: 'You made it',
          caseStudy: { intro: 'You finished Surface Areas and Volumes — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch13_7', difficulty: 'standard',
          question: 'The volume of a right circular cone is the amount of three-dimensional space.',
          hint: 'Review how to compute r² correctly and distinguish it from 2r, specifically practicing.',
          misconception: 'Students often incorrectly calculate πr²h first and then divide by 3, but when r² involves cancellation (e.g., r=7 with.',
          parts: [
                { id: 'a', prompt: 'Explain why the volume of a cone is one-third the volume of a cylinder with the same base and height, without using calculus.', answer: 'The volume of a cone is one-third that of a matching cylinder',
                  options: ['The volume of a cone is one-third that of a matching cylinder', 'because the cone is smaller'],
                  hint: 'Review how to compute r² correctly and distinguish it from 2r, specifically practicing with values.',
                  misconception: 'Students often incorrectly calculate πr²h first and then divide by 3, but when r² involves cancellation (e.g., r=7 with π=22/7), they.' },
                { id: 'b', prompt: 'Two cones have the same height. Cone A has twice the radius of Cone B. How many times larger is the volume of Cone A compared to Cone B?', answer: 'Volume scales with the square of the radius',
                  options: ['Volume scales with the square of the radius', '2 times'],
                  hint: 'Review how to compute r² correctly and distinguish it from 2r, specifically practicing with values.',
                  misconception: 'Students often incorrectly calculate πr²h first and then divide by 3, but when r² involves cancellation (e.g., r=7 with π=22/7), they.' }
          ],
            remediations: { 'students-often-incorrectly-calculate-r': { steps: ['To fix this, explicitly write r² as r × r before substitution.', 'For r=7, write: r² = 7 × 7.', 'Then substitute: V = (1/3) × π × (7 × 7) × h.', 'Only then substitute π=22/7: V = (1/3) × (22/7) × (7 × 7) × h.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch13_8', difficulty: 'standard',
          question: 'The volume of a sphere with radius r is the measure of the three-dimensional.',
          hint: 'If stuck, revisit c8_math_ch1_10 (cube numbers and cube roots) and c9_math_ch13_5 (volume.',
          misconception: 'Students often write the hemisphere volume as V = (1/2) × (4/3)πr² = (2/3)πr² — they correctly halve the sphere\'s.',
          parts: [
                { id: 'a', prompt: 'What is the formula for the volume of a solid hemisphere of radius r?', answer: 'The correct formula is V = (2/3)πr³',
                  options: ['The correct formula is V = (2/3)πr³', 'half of 4/3 is 2/3'],
                  hint: 'If stuck, revisit c8_math_ch1_10 (cube numbers and cube roots) and c9_math_ch13_5 (volume basics).',
                  misconception: 'Students often write the hemisphere volume as V = (1/2) × (4/3)πr² = (2/3)πr² — they correctly halve the sphere\'s coefficient but.' }
          ],
            remediations: { 'students-often-write-the-hemisphere': { steps: ['If a student makes this error, do NOT just re-state the formula.', 'Instead: (1) Ask them to write both sphere volume and sphere surface area formulas side by side.', '(2) Ask: "When we take half a sphere, which part changes — the coefficient (4/3) or the power of r (r³)?" (3) Guide.', '(4) Have them compute both correct and incorrect versions for r = 2, 3, 4 to see the numerical difference.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
