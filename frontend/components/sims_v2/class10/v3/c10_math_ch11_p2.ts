import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch11_p2: SimDef = {
    id: 'v3_c10_math_ch11_p2',
    title: 'Areas Related to Circles · Part 2/2',
    subtitle: 'Slice circles into pieces and measure what formulas forgot',
    classLevel: 10, subject: 'mathematics', topic: 'Areas Related to Circles · Part 2/2',
    chapters: ['c10_math_ch11'],
    nodeIds: ['c10_math_cbse_11_007', 'c10_math_cbse_11_008', 'c10_math_cbse_11_009', 'c10_math_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a designer pricing curved shapes', intro: 'A client wants a flower bed shaped like a sector and a pathway shaped like a segment. There\'s no \'segment formula\' — only circle pieces, triangles, and your ability to combine them.', goal: 'Derive and apply area and circumference formulas, and compute areas of sectors and segments in composite shapes.' },
    discovery: {
        question: 'Chop a circle into many thin pizza slices and rearrange them alternately — they stack into something eerily close to a parallelogram. This ancient rearrangement trick yields A = πr². What does slicing reveal that memorising can\'t?',
        options: ['The \'height\' becomes r and the \'base\' becomes half the circumference — the formula falls out of the rearrangement itself', 'It proves π is exactly 3.14', 'It shows circles are secretly polygons with four sides', 'Nothing — the rearrangement is just a party trick'],
        answer: 'The \'height\' becomes r and the \'base\' becomes half the circumference — the formula falls out of the rearrangement itself',
        hook: 'πr² isn\'t a magic spell — it\'s a parallelogram wearing a disguise. Slice thin enough and the curve straightens into geometry you already know.',
    },
    teaching: [
        { title: 'Area of a Segment: Applications and Calculations', text: 'The area of a segment of a circle is the region bounded by a chord and the arc subtended by that chord.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_11_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Compute areas of sectors and segments — cake slices, running-track bends, circular gardens with paths — by combining πr² and 2πr into shapes that don\'t have their own formulas.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_007', title: 'Area of a Segment: Applications and Calculations',
          scaffold: { problem: 'A circular table top of radius 30 cm has a decorative inlay along a chord that subtends an angle of 60° at the centre.',
            steps: [
            { text: 'Identify given values: radius r = 30 cm, central angle θ = 60° (minor segment). We need area of minor segment.' },
            { text: 'Write the formula for area of minor segment: Area = (θ/360) × πr² − (1/2) r² sin θ.' },
            { text: 'Compute sector area: (60/360) × 3.14 × 30² = (1/6) × 3.14 × 900 = 471 cm².' },
            { text: 'Compute triangle area: (1/2) × 30² × sin 60° = (1/2) × 900 × (√3/2) = 450 × 0.866 = 389.7 cm².' },
            { text: 'Subtract: Minor segment area = 471 − 389.7 = 81.3 cm².', faded: true, blankAnswer: '81.3 cm²' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_008', title: 'Area of a Combination of Plane Figures (Circle + Polygon)',
          scaffold: { problem: 'Find the area of the shaded region in the given figure where a square ABCD is inscribed in a circle of radius 7 cm.',
            steps: [
            { text: 'Identify: Square inscribed in circle → diagonal of square = diameter of circle = 2 × 7 = 14 cm.' },
            { text: 'Side of square: diagonal = a√2 = 14, so a = 14/√2 = 7√2 cm.' },
            { text: 'Area of circle = πr² = π × 49 = 49π cm².' },
            { text: 'Area of square = a² = (7√2)² = 98 cm².' },
            { text: 'Shaded area = Area of circle − Area of square = 49π − 98 = 49(π − 2) ≈ 49 × 1.14 ≈ 55.86 cm².', faded: true, blankAnswer: 'Shaded area = 49(π − 2) ≈ 55.86 cm².' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_009', title: 'Word Problems: Clock and Wheel (Arc and Sector)',
          scaffold: { problem: 'The minute hand of a wall clock is 14 cm long. Find the area swept by the minute hand between 9:00 AM and 9:20 AM. Use π = 22/7.',
            steps: [
            { text: 'Identify given values: radius r = 14 cm (length of minute hand), time interval = 20 minutes (from 9:00 to 9:20).' },
            { text: 'Determine the central angle θ swept by the minute hand. The minute hand completes 360° in 60 minutes, so it moves 6°.' },
            { text: 'Write the sector area formula: Area = (θ/360) × πr².' },
            { text: 'Substitute values: Area = (120/360) × (22/7) × (14)² = (1/3) × (22/7) × 196 = (22 × 196) / (3 × 7) = (22 × 28) / 3.' },
            { text: 'State final answer with units: The area swept is 616/3 cm² or approximately 205.33 cm².', faded: true, blankAnswer: '616/3 cm² (≈ 205.33 cm²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_010', title: 'Word Problems: Area of Combined Regions',
          scaffold: { problem: 'A rectangular garden 30 m long and 20 m wide has two semicircular flower beds on its two shorter sides (outside the rectangle).',
            steps: [
            { text: 'Identify the shapes and given dimensions. The figure consists of a rectangle (30 m × 20 m) and two semicircles on the.' },
            { text: 'Determine the operation. The flower beds are outside the rectangle, so the total area = Area of rectangle + Area of two.' },
            { text: 'Write the formulas and substitute values. Area of rectangle = length × breadth = 30 × 20 = 600 m².' },
            { text: 'Compute total area. Total area = 600 + 2200/7 = (4200/7 + 2200/7) = 6400/7 ≈ 914.29 m².' },
            { text: 'Compute cost. Cost = Total area × Rate = (6400/7) × 15 = 96000/7 = ₹13,714.29 (approx).', faded: true, blankAnswer: 'Total area = 6400/7 m² (≈ 914.29 m²); Cost of levelling.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_11_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A circular pond of diameter 10 m gets a 2 m wide tiled path built all around it. The contractor calculates the path\'s area as \'the circumference times the width\' and orders tiles on that basis. A student checks the estimate.',
            decisions: [{ prompt: 'How should the path\'s area be computed?', options: [
                { text: 'As a ring — the outer circle has radius 7 m and the pond has radius 5 m, so the path\'s area is π(7² − 5²) = π × 24 ≈ 75.4 m². Circumference × width uses the inner circle\'s edge and misses that the outer edge is longer, so the contractor\'s shortcut underestimates the real area.', outcome: 'The ring area is always the difference of two circle areas — π(R² − r²) — because the path is the gap between two circles, not a rectangle of circumference by width.' },
                { text: 'The contractor\'s method is fine — a path of uniform width is just a rectangle whose length is the pond\'s circumference.', outcome: 'Unrolling a ring into a rectangle understates it — the outer boundary is longer than the inner one, so the true area is π(R² − r²).', reveals: 'ring-is-rectangle' },
                { text: 'The path area is π(7 − 5)² = about 12.6 m², since the width is the only new radius.', outcome: 'Squaring the width alone gives a small disc, not a ring — the path surrounds the whole pond, so it is the outer circle minus the inner one.', reveals: 'ring-is-pi-width-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_11_010', title: 'You made it',
          caseStudy: { intro: 'Every sector is a fraction of a circle, every segment a slice minus a triangle. Two formulas, cleverly combined, measure every curve life throws at you.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_11_007', difficulty: 'standard',
          question: 'The area of a segment of a circle is the region bounded by a chord and the arc.',
          hint: 'Review the derivation of the triangle area formula (1/2)ab sin C from Class 9.',
          misconception: 'Students often use the formula for the area of the triangle as (1/2) × r × sin θ (missing the square on r) or (1/2).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a segment of a circle is the region bounded by a chord and the arc subtended',
                  options: ['The area of a segment of a circle is the region bounded by a chord and the arc subtended', 'The area of a circle is the measure of the region enclosed by its circumference', 'The circumference of a circle is the perimeter or the total length of the boundary of the', 'The area of a sector of a circle is the region enclosed by two radii and the intercepted'],
                  hint: 'Review the derivation of the triangle area formula (1/2)ab sin C from Class 9 trigonometry and the.',
                  misconception: 'Students often use the formula for the area of the triangle as (1/2) × r × sin θ (missing the square on r) or (1/2) × r² × cos θ (using.' }
          ],
            remediations: { 'students-often-use-the-formula': { steps: ['If a student makes the triangle area error, guide them to re-derive the triangle area: the triangle has two sides r and.', 'Area = (1/2) × r × r × sin θ = (1/2) r² sin θ.', 'Emphasise that both sides are radii, so r appears twice.', 'For the major segment, draw a diagram showing the circle, the minor segment, and the major segment.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_008', difficulty: 'standard',
          question: 'The area of a combination of plane figures (such as a circle and a polygon).',
          hint: 'Review individual area formulas (c10_math_cbse_11_001, c9_math_ch6_11) and practice.',
          misconception: 'Students often confuse inscribed vs circumscribed figures: (1) Square inscribed in circle → diagonal of square.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a combination of plane figures (such as a circle and a polygon) is found by',
                  options: ['The area of a combination of plane figures (such as a circle and a polygon) is found by', 'The area of a circle is the measure of the region enclosed by its circumference', 'The circumference of a circle is the perimeter or the total length of the boundary of the', 'The area of a sector of a circle is the region enclosed by two radii and the intercepted'],
                  hint: 'Review individual area formulas (c10_math_cbse_11_001, c9_math_ch6_11) and practice identifying.',
                  misconception: 'Students often confuse inscribed vs circumscribed figures: (1) Square inscribed in circle → diagonal of square = diameter of circle.' }
          ],
            remediations: { 'students-often-confuse-inscribed-vs': { steps: ['Draw each composite figure and color-code the component shapes.', 'For each problem, write: "Shaded area = [shape 1] ± [shape 2]" before computing.', 'Practice the two key relationships: inscribed square (diagonal = diameter), inscribed circle (side = diameter).', 'Always check: does the answer make sense?'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_009', difficulty: 'standard',
          question: 'Word problems on clocks and wheels apply the formulas for arc length and sector.',
          hint: 'Revisit c10_math_cbse_11_003 (sector area) and c10_math_cbse_11_005 (arc length) and.',
          misconception: 'Students consistently confuse the angular speeds of the hour and minute hands: they use 6° per minute for the hour hand.',
          parts: [
                { id: 'a', prompt: 'What is the angle swept by the minute hand of a clock in 25 minutes?', answer: '150°',
                  options: ['150°', 'the minute hand moves 1° per minute (confusing with hour hand)'],
                  hint: 'Revisit c10_math_cbse_11_003 (sector area) and c10_math_cbse_11_005 (arc length) and practice.',
                  misconception: 'Students consistently confuse the angular speeds of the hour and minute hands: they use 6° per minute for the hour hand (instead of 0.5°.' },
                { id: 'b', prompt: 'A bicycle wheel makes 5000 revolutions to cover 11 km. Find the radius of the wheel.', answer: 'Distance = revolutions × circumference → 11 km = 11000 m = 1100000 cm',
                  options: ['Distance = revolutions × circumference → 11 km = 11000 m = 1100000 cm', 'radius stays same', 'revolutions double when radius doubles'],
                  hint: 'Revisit c10_math_cbse_11_003 (sector area) and c10_math_cbse_11_005 (arc length) and practice.',
                  misconception: 'Students consistently confuse the angular speeds of the hour and minute hands: they use 6° per minute for the hour hand (instead of 0.5°.' }
          ],
            remediations: { 'students-consistently-confuse-the-angular': { steps: ['If a student uses the wrong angular speed, have them physically simulate a clock: "How many degrees does the minute.', '(30° in 5 minutes → 6°/min).', 'How many degrees does the hour hand move from 12 to 1?', '(30° in 60 minutes → 0.5°/min)." For wheel errors, make them trace a coin rolling one full turn on a ruler: "The.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse the angular speeds of the hour and minute hands: they use 6° per minute for the hour hand.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Hour hand length = 6 cm. Area swept from 7:00 AM to 10:00 AM." They write: θ = 3 hours × 30° = 90°, Area = (90/360) × π × 6² = 28.26 cm².', answer: 'Incorrect',
                  options: ['Incorrect', 'correct', 'angle should be 360°'],
                  hint: 'Revisit c10_math_cbse_11_003 (sector area) and c10_math_cbse_11_005 (arc length) and practice.',
                  misconception: 'Students consistently confuse the angular speeds of the hour and minute hands: they use 6° per minute for the hour hand (instead of 0.5°.' }
          ],
            remediations: { 'students-consistently-confuse-the-angular': { steps: ['If a student uses the wrong angular speed, have them physically simulate a clock: "How many degrees does the minute.', '(30° in 5 minutes → 6°/min).', 'How many degrees does the hour hand move from 12 to 1?', '(30° in 60 minutes → 0.5°/min)." For wheel errors, make them trace a coin rolling one full turn on a ruler: "The.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_010', difficulty: 'standard',
          question: 'Word problems on area of combined regions require calculating the total area.',
          hint: 'If stuck, revisit c10_math_cbse_11_008 (Area of a Combination of Plane Figures) and.',
          misconception: 'Students often treat the combined region as a single formula rather than decomposing it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on area of combined regions require calculating the total area of a plane',
                  options: ['Word problems on area of combined regions require calculating the total area of a plane', 'The area of a circle is the measure of the region enclosed by its circumference', 'The circumference of a circle is the perimeter or the total length of the boundary of the', 'The area of a sector of a circle is the region enclosed by two radii and the intercepted'],
                  hint: 'If stuck, revisit c10_math_cbse_11_008 (Area of a Combination of Plane Figures) and c9_math_ch6_11.',
                  misconception: 'Students often treat the combined region as a single formula rather than decomposing it.' }
          ],
            remediations: { 'students-often-treat-the-combined': { steps: ['If a student cannot decompose the figure: 1.', 'Ask them to trace the boundary of the shaded region with a coloured pen.', 'Have them list every distinct shape they see (circle, triangle, rectangle).', 'For each shape, write its area formula next to it on the diagram.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
