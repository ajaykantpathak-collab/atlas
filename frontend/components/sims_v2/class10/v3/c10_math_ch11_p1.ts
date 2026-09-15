import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch11_p1: SimDef = {
    id: 'v3_c10_math_ch11_p1',
    title: 'Areas Related to Circles · Part 1/2',
    subtitle: 'Slice circles into pieces and measure what formulas forgot',
    classLevel: 10, subject: 'mathematics', topic: 'Areas Related to Circles · Part 1/2',
    chapters: ['c10_math_ch11'],
    nodeIds: ['c10_math_cbse_11_001', 'c10_math_cbse_11_002', 'c10_math_cbse_11_003', 'c10_math_cbse_11_004', 'c10_math_cbse_11_005', 'c10_math_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a designer pricing curved shapes', intro: 'A client wants a flower bed shaped like a sector and a pathway shaped like a segment. There\'s no \'segment formula\' — only circle pieces, triangles, and your ability to combine them.', goal: 'Derive and apply area and circumference formulas, and compute areas of sectors and segments in composite shapes.' },
    discovery: {
        question: 'Chop a circle into many thin pizza slices and rearrange them alternately — they stack into something eerily close to a parallelogram. This ancient rearrangement trick yields A = πr². What does slicing reveal that memorising can\'t?',
        options: ['The \'height\' becomes r and the \'base\' becomes half the circumference — the formula falls out of the rearrangement itself', 'It proves π is exactly 3.14', 'It shows circles are secretly polygons with four sides', 'Nothing — the rearrangement is just a party trick'],
        answer: 'The \'height\' becomes r and the \'base\' becomes half the circumference — the formula falls out of the rearrangement itself',
        hook: 'πr² isn\'t a magic spell — it\'s a parallelogram wearing a disguise. Slice thin enough and the curve straightens into geometry you already know.',
    },
    teaching: [
        { title: 'Area of a Circle: Formula and Derivation', text: 'The area of a circle is the measure of the region enclosed by its circumference.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_11_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Compute areas of sectors and segments — cake slices, running-track bends, circular gardens with paths — by combining πr² and 2πr into shapes that don\'t have their own formulas.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_001', title: 'Area of a Circle: Formula and Derivation',
          scaffold: { problem: 'A circular vegetable patch in a school garden has a radius of 3.5 metres.',
            steps: [
            { text: 'Identify the given values — radius \\(r = 3.5\\) m = \\(\\frac{7}{2}\\) m, cost = ₹15 per m², \\(\\pi = \\frac{22}{7}\\).' },
            { text: 'Recall the area formula for a circle: \\(A = \\pi r^2\\).' },
            { text: 'Substitute the values: \\(A = \\frac{22}{7} \\times \\left(\\frac{7}{2}\\right)^2 = \\frac{22}{7} \\times \\frac{49}{4}\\).' },
            { text: 'Simplify step by step: \\(\\frac{22}{7} \\times \\frac{49}{4} = \\frac{22 \\times 49}{7 \\times 4} = \\frac{22 \\times 7}{4}.' },
            { text: 'Compute total cost = Area × Cost per m² = \\(38.5 \\times 15 = ₹577.50\\).' },
            { text: 'Verify units — area in m², cost in ₹/m², total in ₹. Answer is reasonable for a small garden patch.', faded: true, blankAnswer: '₹577.50' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_002', title: 'Circumference of a Circle: Formula and Application',
          scaffold: { problem: 'The wheel of a motorbike has a radius of 35 cm. How many complete revolutions will the wheel make to cover a distance of 2.2 km?',
            steps: [
            { text: 'Identify given values: radius \\(r = 35\\,\\text{cm}\\), total distance \\(= 2.2\\,\\text{km}\\).' },
            { text: 'Recall the formula for circumference: \\(C = 2\\pi r\\). This gives distance covered in one revolution.' },
            { text: 'Substitute \\(r = 35\\) and \\(\\pi = \\frac{22}{7}\\): \\(C = 2 \\times \\frac{22}{7} \\times 35\\).' },
            { text: 'Use unitary method: Number of revolutions = \\(\\frac{\\text{Total distance}}{\\text{Distance per revolution}}.' },
            { text: 'Compute division: \\(2,20,000 \\div 220 = 1000\\). The wheel makes 1000 complete revolutions.', faded: true, blankAnswer: '1000 revolutions' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_003', title: 'Area of a Sector of a Circle: Formula',
          scaffold: { problem: 'A circular playground in a school has radius 14 m. The students of Class 10 are asked to plant grass in a sector-shaped region with central.',
            steps: [
            { text: 'Identify given values: radius \\(r = 14\\) m, central angle \\(\\theta = 60^\\circ\\). We need to find the area of the sector.' },
            { text: 'Recall the formula for area of a sector: \\(A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2\\).' },
            { text: 'Substitute the values into the formula: \\(A = \\frac{60}{360} \\times \\frac{22}{7} \\times 14 \\times 14\\).' },
            { text: 'Simplify step by step: \\(\\frac{60}{360} = \\frac{1}{6}\\). Then \\(\\frac{22}{7} \\times 14 \\times 14 = 22 \\times 2 \\times.' },
            { text: 'State the final answer with units: The area to be planted is \\(\\frac{308}{3}\\) m² or approximately 102.67 m².', faded: true, blankAnswer: '\\(\\frac{308}{3}\\) m² (or 102.67 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_004', title: 'Area of a Sector: Applications and Calculations',
          scaffold: { problem: 'A horse is tied to a corner of a square field of side 20 m with a rope of length 14 m.',
            steps: [
            { text: 'Visualise the problem — the horse is tied at a corner of the square, so the grazing area is a sector of a circle with.' },
            { text: 'Identify the formula: Area of sector = (θ/360°) × πr².' },
            { text: 'Substitute known values: θ = 90°, r = 14 m, π = 22/7. Area = (90/360) × (22/7) × 14 × 14.' },
            { text: 'Simplify the fraction: 90/360 = 1/4. Area = (1/4) × (22/7) × 196.' },
            { text: 'Cancel 7 with 196: 196 ÷ 7 = 28. Area = (1/4) × 22 × 28 = (1/4) × 616 = 154 m².' },
            { text: 'State the answer with units: The horse can graze in an area of 154 m².', faded: true, blankAnswer: '154 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_005', title: 'Length of an Arc of a Sector: Formula',
          scaffold: { problem: 'A circular running track has a radius of 35 metres. An athlete runs along a curved section that subtends an angle of 120° at the centre.',
            steps: [
            { text: 'Identify given values: radius \\( r = 35 \\) m, central angle \\( \\theta = 120^\\circ \\). We need arc length \\( L \\).' },
            { text: 'Recall the arc length formula for degrees: \\( L = \\frac{\\theta}{360^\\circ} \\times 2\\pi r \\).' },
            { text: 'Substitute the values: \\( L = \\frac{120}{360} \\times 2 \\times \\frac{22}{7} \\times 35 \\).' },
            { text: 'Simplify step by step: \\( \\frac{120}{360} = \\frac{1}{3} \\). Cancel 35 and 7: \\( 35 \\div 7 = 5 \\).' },
            { text: 'Interpret the result: The athlete runs \\( 73\\frac{1}{3} \\) metres on the curved section.', faded: true, blankAnswer: '\\( 73\\frac{1}{3} \\) m (or 73.33 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_006', title: 'Area of a Segment of a Circle: Formula',
          scaffold: { problem: 'A circular table top of radius 35 cm has a decorative inlay in the shape of a segment formed by a chord that subtends an angle of 60°.',
            steps: [
            { text: 'Identify given values — radius r = 35 cm, central angle θ = 60°. We need area of minor segment.' },
            { text: 'Write the formula: Area of minor segment = Area of sector − Area of triangle = (θ/360) × πr² − ½r²sinθ.' },
            { text: 'Compute sector area = (60/360) × (22/7) × 35² = (1/6) × (22/7) × 1225 = (1/6) × 22 × 175 = 3850/6 = 641.67 cm² (or.' },
            { text: 'Compute triangle area = ½ × 35² × sin60° = ½ × 1225 × (√3/2) = 1225√3/4 = 1225 × 1.732/4 = 530.425 cm².' },
            { text: 'Subtract: Minor segment area = 641.67 − 530.425 = 111.245 cm² ≈ 111.25 cm².', faded: true, blankAnswer: '111.25 cm² (approx)' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_11_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A circular pond of diameter 10 m gets a 2 m wide tiled path built all around it. The contractor calculates the path\'s area as \'the circumference times the width\' and orders tiles on that basis. A student checks the estimate.',
            decisions: [{ prompt: 'How should the path\'s area be computed?', options: [
                { text: 'As a ring — the outer circle has radius 7 m and the pond has radius 5 m, so the path\'s area is π(7² − 5²) = π × 24 ≈ 75.4 m². Circumference × width uses the inner circle\'s edge and misses that the outer edge is longer, so the contractor\'s shortcut underestimates the real area.', outcome: 'The ring area is always the difference of two circle areas — π(R² − r²) — because the path is the gap between two circles, not a rectangle of circumference by width.' },
                { text: 'The contractor\'s method is fine — a path of uniform width is just a rectangle whose length is the pond\'s circumference.', outcome: 'Unrolling a ring into a rectangle understates it — the outer boundary is longer than the inner one, so the true area is π(R² − r²).', reveals: 'ring-is-rectangle' },
                { text: 'The path area is π(7 − 5)² = about 12.6 m², since the width is the only new radius.', outcome: 'Squaring the width alone gives a small disc, not a ring — the path surrounds the whole pond, so it is the outer circle minus the inner one.', reveals: 'ring-is-pi-width-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every sector is a fraction of a circle, every segment a slice minus a triangle. Two formulas, cleverly combined, measure every curve life throws at you.',
            decisions: [{ prompt: 'What comes next? Areas Related to Circles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Areas Related to Circles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_11_001', difficulty: 'standard',
          question: 'The area of a circle is the measure of the region enclosed by its.',
          hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula) and c6_math_ch07_076 (circle.',
          misconception: 'Students often substitute the diameter \\(d\\) directly into \\(A = \\pi r^2\\) without halving it, computing \\(\\pi d^2\\).',
          parts: [
                { id: 'a', prompt: 'Two circles have radii in the ratio 2:3. What is the ratio of their areas? If the area of the smaller circle is 88 cm², find the area of the larger circle.', answer: 'Ratio of radii = 2:3 → ratio of areas = \\(2^2 : 3^2 = 4 : 9\\)',
                  options: ['Ratio of radii = 2:3 → ratio of areas = \\(2^2 : 3^2 = 4 : 9\\)', 'area scales linearly with radius'],
                  hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula) and c6_math_ch07_076 (circle parts: radius.',
                  misconception: 'Students often substitute the diameter \\(d\\) directly into \\(A = \\pi r^2\\) without halving it, computing \\(\\pi d^2\\) instead of \\(\\pi.' }
          ],
            remediations: { 'students-often-substitute-the-diameter': { steps: ['If a student makes this error, have them: (1) Write down the given: "Diameter = 14 cm".', '(2) Explicitly state: "Radius = Diameter ÷ 2 = 7 cm".', '(3) Write the formula \\(A = \\pi r^2\\) and substitute \\(r = 7\\).', '(4) Compute \\(\\frac{22}{7} \\times 7 \\times 7 = 154\\).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_002', difficulty: 'standard',
          question: 'The circumference of a circle is the perimeter or the total length of the.',
          hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula and \\(\\pi\\)) and c6_math_ch06_064.',
          misconception: 'Students often confuse the circumference formula \\(C = 2\\pi r\\) with the area formula \\(A = \\pi r^2\\), especially when.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Circumference of a circle with radius 7 cm is \\(2 \\times \\frac{22}{7} \\times 7 = 44\\,\\text{cm}\\).', answer: 'Yes, the reasoning is correct',
                  options: ['Yes, the reasoning is correct', 'circumference becomes four times'],
                  hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula and \\(\\pi\\)) and c6_math_ch06_064 (unitary.',
                  misconception: 'Students often confuse the circumference formula \\(C = 2\\pi r\\) with the area formula \\(A = \\pi r^2\\), especially when the radius is.' }
          ],
            remediations: { 'students-often-confuse-the-circumference': { steps: ['Ask the student to write both formulas side by side: \\(C = 2\\pi r\\) and \\(A = \\pi r^2\\).', 'Give a radius that is a multiple of 7 (e.g., 21 cm). Have them compute both using \\(\\frac{22}{7}\\) and note that \\(C.', 'Practice 5 inverse problems: "Given \\(C = 88\\,\\text{cm}\\), find \\(r\\)" — force them to write \\(88 = 2 \\times.', 'Use the mnemonic "Circumference is **C** for **C**ircle\'s **C**ontour — **C** = **2**\\(\\pi\\)**r** (two pi r)".'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the circumference formula \\(C = 2\\pi r\\) with the area formula \\(A = \\pi r^2\\), especially when.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the radius of a circle whose circumference is \\(44\\,\\text{cm}\\)." Their working: \\(44 = 2 \\times \\frac{22}{7} \\times r \\Rightarrow 44.', answer: 'The radius value \\(r = 7\\,\\text{cm}\\) is correct',
                  options: ['The radius value \\(r = 7\\,\\text{cm}\\) is correct', 'the radius is wrong'],
                  hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula and \\(\\pi\\)) and c6_math_ch06_064 (unitary.',
                  misconception: 'Students often confuse the circumference formula \\(C = 2\\pi r\\) with the area formula \\(A = \\pi r^2\\), especially when the radius is.' }
          ],
            remediations: { 'students-often-confuse-the-circumference': { steps: ['Ask the student to write both formulas side by side: \\(C = 2\\pi r\\) and \\(A = \\pi r^2\\).', 'Give a radius that is a multiple of 7 (e.g., 21 cm). Have them compute both using \\(\\frac{22}{7}\\) and note that \\(C.', 'Practice 5 inverse problems: "Given \\(C = 88\\,\\text{cm}\\), find \\(r\\)" — force them to write \\(88 = 2 \\times.', 'Use the mnemonic "Circumference is **C** for **C**ircle\'s **C**ontour — **C** = **2**\\(\\pi\\)**r** (two pi r)".'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_003', difficulty: 'standard',
          question: 'The area of a sector of a circle is the region enclosed by two radii and the.',
          hint: 'Revisit the derivation of circle area (c10_math_cbse_11_001) and practice fraction.',
          misconception: 'Students often confuse the denominator in the fraction: they use 180° instead of 360° because they associate circles.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a sector of a circle is the region enclosed by two radii and the intercepted',
                  options: ['The area of a sector of a circle is the region enclosed by two radii and the intercepted', 'The area of a circle is the measure of the region enclosed by its circumference', 'The circumference of a circle is the perimeter or the total length of the boundary of the', 'The area of a sector is the region enclosed by two radii and the arc between them'],
                  hint: 'Revisit the derivation of circle area (c10_math_cbse_11_001) and practice fraction multiplication.',
                  misconception: 'Students often confuse the denominator in the fraction: they use 180° instead of 360° because they associate circles with 180° (semicircle).' }
          ],
            remediations: { 'students-often-confuse-the-denominator': { steps: ['If a student uses 180° in the denominator, draw a full circle and mark the centre.', 'Ask: "What is the total angle around this point?" Guide them to 360°.', 'If they forget to square the radius, remind them: "Area of circle is \\(\\pi r^2\\), so sector area must also have.', 'Cancel 7 with ONE 14 only.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_004', difficulty: 'standard',
          question: 'The area of a sector is the region enclosed by two radii and the arc between.',
          hint: 'Revisit c10_math_cbse_11_003 (sector area formula derivation) and c9_math_ch6_8 (circle.',
          misconception: 'Students confuse the formula for area of a sector with the formula for arc length.',
          parts: [
                { id: 'a', prompt: 'State the formula for the area of a sector of a circle with radius r and central angle θ (in degrees). What is the condition on θ for this formula to be valid?', answer: 'The formula is Area = (θ/360°) × πr², valid for 0° < θ ≤ 360°',
                  options: ['The formula is Area = (θ/360°) × πr², valid for 0° < θ ≤ 360°', 'Area = θ × πr²', 'Area = (θ/180°) × πr²'],
                  hint: 'Revisit c10_math_cbse_11_003 (sector area formula derivation) and c9_math_ch6_8 (circle area.',
                  misconception: 'Students confuse the formula for area of a sector with the formula for arc length.' }
          ],
            remediations: { 'students-confuse-the-formula-for': { steps: ['Ask the student to write both formulas side by side: Arc Length = (θ/360°) × 2πr, Sector Area = (θ/360°) × πr².', 'Have them compute the full circle circumference (2πr) and full circle area (πr²) for r = 7 cm.', 'Give a mixed practice set: 3 arc length problems, 3 sector area problems.', 'Insist on writing units at every step — if they write "cm" for area, immediately stop and correct to "cm²".'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_005', difficulty: 'standard',
          question: 'The length of an arc of a sector is the distance along the curved part of the.',
          hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula) and c6_math_ch06_064 (unitary.',
          misconception: 'Students frequently confuse the arc length formula \\( L = \\frac{\\theta}{360^\\circ} \\times 2\\pi r \\) with the sector.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The length of an arc of a sector is the distance along the curved part of the circle',
                  options: ['The length of an arc of a sector is the distance along the curved part of the circle', 'The area of a circle is the measure of the region enclosed by its circumference', 'The circumference of a circle is the perimeter or the total length of the boundary of the', 'The area of a sector of a circle is the region enclosed by two radii and the intercepted'],
                  hint: 'If stuck, revisit c9_math_ch6_2 (circumference formula) and c6_math_ch06_064 (unitary method for.',
                  misconception: 'Students frequently confuse the arc length formula \\( L = \\frac{\\theta}{360^\\circ} \\times 2\\pi r \\) with the sector area formula \\(.' }
          ],
            remediations: { 'students-frequently-confuse-the-arc': { steps: ['If a student confuses arc length with sector area, immediately draw two diagrams side by side: one showing the curved.', 'Ask: "Which one is a line?', 'Which one is a surface?" Then write both formulas with the fraction \\( \\frac{\\theta}{360^\\circ} \\) highlighted in the.', 'Make them practise 5 problems where they must first identify whether the question asks for "length of the arc" or "area.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_006', difficulty: 'standard',
          question: 'A segment of a circle is the region bounded by a chord and the arc subtended.',
          hint: 'If stuck, revisit c10_math_cbse_11_003 (sector area) and Class 9 trigonometry (area.',
          misconception: 'Students consistently write the segment area formula as (θ/360)πr² − ½bh, where they attempt to find base and height.',
          parts: [
                { id: 'a', prompt: 'A student calculates the area of a minor segment with r = 14 cm, θ = 60° as: Area = (60/360) × (22/7) × 14² − ½ × 14² × sin60°.', answer: 'Yes, the calculation is correct',
                  options: ['Yes, the calculation is correct', 'triangle area = ½ × base × height'],
                  hint: 'If stuck, revisit c10_math_cbse_11_003 (sector area) and Class 9 trigonometry (area of triangle.',
                  misconception: 'Students consistently write the segment area formula as (θ/360)πr² − ½bh, where they attempt to find base and height of the triangle.' }
          ],
            remediations: { 'students-consistently-write-the-segment': { steps: ['If a student uses the base-height method for triangle area: 1.', 'Acknowledge their method is mathematically correct: "Your approach using chord length and perpendicular distance.', 'Show the algebraic simplification: "Let\'s simplify ½ × (2r sin(θ/2)) × (r cos(θ/2)) = r² sin(θ/2)cos(θ/2).', 'Now use the identity 2sinAcosA = sin2A with A = θ/2.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
