import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch10_p2: SimDef = {
    id: 'v3_c6_math_ch10_p2',
    title: 'Symmetry · Part 2/2',
    subtitle: 'This node covers the definition of tessellation and the properties of regular/irregular.',
    classLevel: 6, subject: 'mathematics', topic: 'Symmetry · Part 2/2',
    chapters: ['c6_math_ch10'],
    nodeIds: ['c6_math_ch10_111', 'c6_math_ch10_105'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever looked at a brick wall or a tiled floor and wondered why they look so neat and perfectly.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You fold paper, cut half a heart, and open a perfect mirror-image shape. But a scalene triangle sliced into two equal-area pieces is not symmetric. Why does equal size fail the test?',
        options: ['Symmetry needs mirror-image halves that fold exactly onto each other — equal area alone is not enough', 'Because triangles can never be symmetric', 'Because the cut was not made with scissors', 'Equal size always proves symmetry — the triangle counts'],
        answer: 'Symmetry needs mirror-image halves that fold exactly onto each other — equal area alone is not enough',
        hook: 'The line of symmetry is a mirror, not a measuring tape. A butterfly proves it — and an equilateral triangle proves a shape can have not one but three such mirror lines.',
    },
    teaching: [
        { title: 'Tessellation: Fitting Shapes Together', text: 'A tessellation is a pattern created by repeating one or more geometric shapes to cover a flat surface completely, leaving no gaps and having no overlaps.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch10_111', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Hunt for mirror lines — fold a rectangle to find its two lines of symmetry, check the letter A, then draw a shape with at least two of your own.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_111', title: 'Tessellation: Fitting Shapes Together',
          scaffold: { problem: 'A mason has a square floor measuring 4 metres by 4 metres. He uses square tiles that are 0.5 metres on each side.',
            steps: [
            { text: 'Identify the area of the floor: 4m * 4m = 16 sq metres.' },
            { text: 'Identify the area of one tile: 0.5m * 0.5m = 0.25 sq metres.' },
            { text: 'Divide the total area by the area of one tile: 16 / 0.25.' },
            { text: 'Calculate the result: 16 / (1/4) = 16 * 4 = 64 tiles.', faded: true, blankAnswer: '64 tiles.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch10_112', title: 'Creating Symmetric Shapes',
          scaffold: { problem: 'You have a rectangular piece of paper (10cm x 6cm). You fold it once horizontally to make a line of symmetry.',
            steps: [
            { text: 'Identify that folding creates a line of symmetry at the center.' },
            { text: 'The triangle is 2cm above the fold, so its reflection will be 2cm below the fold.' },
            { text: 'Total distance = Distance above fold + Distance below fold.' },
            { text: '2cm + 2cm = 4cm.', faded: true, blankAnswer: '4 cm' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch10_112', title: 'Rapid check',
          drill: { kind: 'area,perimeter', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch10_111', title: 'Use it in the wild',
          caseStudy: { intro: 'For a greeting-card contest, a student draws a house: door in the centre, window on the left side only. \'It\'s roughly balanced,\' she says, \'so it has a line of symmetry.\'',
            decisions: [{ prompt: 'Does the drawing have a line of symmetry?', options: [
                { text: 'No — a line of symmetry must make both halves mirror each other exactly. The centred door would mirror fine, but the window sits only on the left; folding the card puts it over blank wall, so no fold line works. \'Roughly balanced\' fails the mirror test — symmetry is exact or it is not symmetry.', outcome: 'The test is folding, not eyeballing — every feature on one side needs its twin on the other, and one unmatched window breaks it.' },
                { text: 'She is right — if a design looks balanced overall, that is close enough to count as symmetric.', outcome: 'Symmetry is a precise mirror match, not an overall impression — one unmatched window is enough to eliminate every possible fold line.', reveals: 'roughly-equal-is-symmetric' },
                { text: 'The drawing has two lines of symmetry, since the house shape itself is symmetric even if the window is not.', outcome: 'Symmetry applies to the whole drawing — the window is part of it, so its unmatched position removes all lines of symmetry.', reveals: 'parts-can-be-ignored' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch10_112', title: 'You made it',
          caseStudy: { intro: 'Symmetry is a folding promise: one side must land exactly on the other. If the mirror completes the picture, the line is true.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch10_111', difficulty: 'standard',
          question: 'A tessellation is a pattern created by repeating one or more geometric shapes.',
          hint: 'Review the properties of regular polygons in the geometry chapter.',
          misconception: 'Students often think that ANY shape can tessellate if you just force it together.',
          parts: [
                { id: 'a', prompt: 'What is the primary rule that a pattern must follow to be called a tessellation?', answer: 'The pattern must cover a flat surface completely with no gaps and no overlaps',
                  options: ['The pattern must cover a flat surface completely with no gaps and no overlaps', 'it just needs to be a pattern', 'fitting together', 'ANY shape can tessellate if you just force it together'],
                  hint: 'Review the properties of regular polygons in the geometry chapter.',
                  misconception: 'Students often think that ANY shape can tessellate if you just force it together.' },
                { id: 'b', prompt: 'If you try to tile a floor with regular pentagons, you will see gaps. Why does this happen?', answer: 'Regular pentagons cannot tessellate',
                  options: ['Regular pentagons cannot tessellate', 'because they are round', 'ANY shape can tessellate if you just force it together'],
                  hint: 'Review the properties of regular polygons in the geometry chapter.',
                  misconception: 'Students often think that ANY shape can tessellate if you just force it together.' },
                { id: 'c', prompt: 'Can an irregular triangle always tessellate? If so, how would you prove it?', answer: 'Yes, any triangle can tessellate',
                  options: ['Yes, any triangle can tessellate', 'perfect', 'only "perfect" or regular shapes can form patterns', 'ANY shape can tessellate if you just force it together'],
                  hint: 'Review the properties of regular polygons in the geometry chapter.',
                  misconception: 'Students often think that ANY shape can tessellate if you just force it together.' }
          ],
            remediations: { 'any-shape-can-tessellate-if': { steps: ['Provide the student with a set of square, circular, and hexagonal cut-outs.', 'Ask them to cover a 10cm x 10cm area on paper with each.', 'When they see the gaps left by the circles, ask: "Do these shapes touch everywhere, or is there empty space?" Then.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_111', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that ANY shape can tessellate if you just force it together.',
          parts: [
                { id: 'a', prompt: 'If a shape has curved edges, like a circle, can it form a standard tessellation? Why or why not?', answer: 'No, because curved edges cannot meet to fill the space between them',
                  options: ['No, because curved edges cannot meet to fill the space between them', 'ANY shape can tessellate if you just force it together'],
                  hint: 'Review the properties of regular polygons in the geometry chapter.',
                  misconception: 'Students often think that ANY shape can tessellate if you just force it together.' }
          ],
            remediations: { 'any-shape-can-tessellate-if': { steps: ['Provide the student with a set of square, circular, and hexagonal cut-outs.', 'Ask them to cover a 10cm x 10cm area on paper with each.', 'When they see the gaps left by the circles, ask: "Do these shapes touch everywhere, or is there empty space?" Then.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch10_112', difficulty: 'standard',
          question: 'Creating symmetric shapes involves constructing a figure where one part is.',
          hint: 'Review the properties of basic 2D shapes and distance measurement on a grid.',
          misconception: 'Students often confuse line symmetry with rotational symmetry.',
          parts: [
                { id: 'a', prompt: 'What is a "line of symmetry" in a paper-cutting activity? [Recall]', answer: 'It is the specific line along',
                  options: ['It is the specific line along', 'overlapping', 'mirroring', 'it is just any line drawn on a paper'],
                  hint: 'Review the properties of basic 2D shapes and distance measurement on a grid.',
                  misconception: 'Students often confuse line symmetry with rotational symmetry.' },
                { id: 'b', prompt: 'Draw a rectangle on a grid. If you are given a vertical line of symmetry passing through the center, how do you find the position of a point that is 2 units.', answer: 'You place the corresponding point 2 units to the left of the line',
                  options: ['You place the corresponding point 2 units to the left of the line', '3 units', 'same side'],
                  hint: 'Review the properties of basic 2D shapes and distance measurement on a grid.',
                  misconception: 'Students often confuse line symmetry with rotational symmetry.' }
          ],
            remediations: { 'students-often-confuse-line-symmetry': { steps: ['First, ask the student to trace the shape on a piece of paper.', 'Have them physically fold the paper in different directions.', 'If the shapes don\'t align, tell them: "If it doesn\'t fold perfectly, it doesn\'t have line symmetry." Then, have them.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
