import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch10_p2: SimDef = {
    id: 'v3_c12_math_ch10_p2',
    title: 'Vector Algebra · Part 2/2',
    subtitle: '5 N east ≠ 5 N north — direction is half the vector',
    classLevel: 12, subject: 'mathematics', topic: 'Vector Algebra · Part 2/2',
    chapters: ['c12_math_ch10'],
    nodeIds: ['c12_math_cbse_10_007', 'c12_math_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Vector classifier', intro: 'Speed is a number; a delivery needs a direction. The difference is the entire subject of vectors.', goal: 'Define vectors by magnitude and direction — and classify zero, unit, collinear, equal and negative correctly.' },
    discovery: {
        question: 'Push a box northeast while your friend pushes east — where does it actually go?',
        options: ['A single resultant direction — vectors add head-to-tail', 'Northeast then east alternately', 'The stronger push wins entirely', 'It spins in place'],
        answer: 'A single resultant direction — vectors add head-to-tail',
        hook: 'Forces, velocities, fields — the world is made of arrows that add. This chapter teaches you to add them.',
    },
    teaching: [
        { title: 'Section Formula for Vectors', text: 'The section formula for vectors gives the position vector of a point R that divides the line segment joining two points P and Q (with position vectors **a** and **b** respectively) in a given ratio.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_10_007', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'Add vector b to a — is the result just the lengths added?',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_007', title: 'Section Formula for Vectors',
          scaffold: { problem: 'A drone flies from point P(3, -2, 5) to point Q(-1, 4, -3). It stops at a point R that divides the journey internally in the ratio 2:3.',
            steps: [
            { text: 'Write position vectors of P and Q. **a** = 3**i** - 2**j** + 5**k**, **b** = -**i** + 4**j** - 3**k**.' },
            { text: 'Identify the formula for internal division. **r** = (m**b** + n**a**)/(m+n) with m=2, n=3.' },
            { text: 'Substitute values. **r** = (2(-**i**+4**j**-3**k**) + 3(3**i**-2**j**+5**k**))/(2+3).' },
            { text: 'Simplify numerator: 2(-**i**+4**j**-3**k**) = -2**i**+8**j**-6**k**; 3(3**i**-2**j**+5**k**) = 9**i**-6**j**+15**k**.' },
            { text: 'Divide by 5. **r** = (7/5)**i** + (2/5)**j** + (9/5)**k**. Coordinates: (1.4, 0.4, 1.8).', faded: true, blankAnswer: 'Position vector = (7/5)**i** + (2/5)**j** + (9/5)**k**.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_008', title: 'Vector Equation of a Line',
          scaffold: { problem: 'A drone takes off from a point A(2, -1, 3) on the school roof and flies in a straight line towards point B(5, 2, -1) on the water tank.',
            steps: [
            { text: 'Identify position vectors of A and B. **a = 2i - j + 3k**, **b = 5i + 2j - k**.' },
            { text: 'Write vector equation using point A and direction vector: **r = a + λ(b - a) = (2i - j + 3k) + λ(3i + 3j - 4k)**.' },
            { text: 'For λ = 2, substitute: **r = (2i - j + 3k) + 2(3i + 3j - 4k) = (2+6)i + (-1+6)j + (3-8)k = 8i + 5j - 5k**.' },
            { text: 'Distance from A = |λ| × |direction vector|. |direction| = √(3²+3²+(-4)²) = √(9+9+16) = √34.' },
            { text: 'Substitute λ = 7/√34 into **r** to get coordinates: **r = (2i - j + 3k) + (7/√34)(3i + 3j - 4k)** = (2 + 21/√34)i + (-1.', faded: true, blankAnswer: 'Vector equation: **r = (2i - j + 3k) + λ(3i + 3j - 4k)**.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_10_008', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Programming a delivery drone to fly from the warehouse to a building at (3, −4, 12), a junior computes the direction cosines as (3/13, 4/13, 12/13) — \'angles and cosines are positive, so drop the minus.\' The drone heads for the wrong block.',
            decisions: [{ prompt: 'Where did the navigation break?', options: [
                { text: 'At the sign — direction cosines are the components of the unit vector, so they keep the direction ratios\' signs; y = −4 forces m = −4/13, and stripping the minus turned the southbound leg into a northbound one.', outcome: 'The chapter\'s identity: l, m, n are coordinates divided by magnitude — they encode which octant the vector points into, so a flipped sign is a flipped direction.' },
                { text: 'Nowhere mathematically — cosines should be positive; the drone hardware must be faulty.', outcome: 'Direction cosines aren\'t unsigned angles\' absolute values — cosβ is negative for an obtuse angle with the axis; \'always positive\' discards the information the sign was carrying.', reveals: 'cosines-always-positive' },
                { text: 'In the magnitude — he should have used the raw components (3, −4, 12) as the direction cosines.', outcome: 'Raw components are direction ratios, not cosines — cosines must satisfy l²+m²+n²=1; skipping the division by 13 keeps the sign problem and adds a unit problem.', reveals: 'ratios-are-cosines' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'Components, dot, cross — you now navigate in the language physics and game engines share.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_10_007', difficulty: 'standard',
          question: 'The section formula for vectors gives the position vector of a point R that.',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vectors) and c12_math_cbse_10_003.',
          misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for vectors gives the position vector of a point R that divides the',
                  options: ['The section formula for vectors gives the position vector of a point R that divides the', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the', 'The triangle law of vector addition states that if two vectors are represented as two'],
                  hint: 'If stuck, revisit c12_math_cbse_10_002 (position vectors) and c12_math_cbse_10_003 (vector addition.',
                  misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b** - n**a**)/(m-n).' }
          ],
            remediations: { 'students-consistently-write-the-external': { steps: ['Revisit the derivation in NCERT Section 10.5.3 (Case II): draw the directed line OP, OQ, OR.', 'Write vector equations: **r** = **a** + **PR**, **b** = **a** + **PQ**.', 'For external division PR:RQ = m:n, so **PR** = (m/(m-n))**PQ**.', 'Substitute **PQ** = **b** - **a** to get **r** = **a** + (m/(m-n))(**b** - **a**) = (m**b** - n**a**)/(m-n).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_008', difficulty: 'standard',
          question: 'The vector equation of a line in three-dimensional space is given by **r =.',
          hint: 'Revisit c12_math_cbse_10_003 (vector addition) and c12_math_cbse_10_007 (section formula).',
          misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: **r = (i + 2j + 3k) + λ(2i + 3j + 4k)** and L₂: **r = (2i + 4j + 5k) + μ(4i + 6j + 8k)**.', answer: 'The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**',
                  options: ['The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**', 'intersecting'],
                  hint: 'Revisit c12_math_cbse_10_003 (vector addition) and c12_math_cbse_10_007 (section formula).',
                  misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to subtract the.' }
          ],
            remediations: { 'students-often-write-the-cartesian': { steps: ['If a student makes the above error, have them: (1) Plot the point (x₁, y₁, z₁) and the origin on a 3D sketch.', '(2) Show that the vector from origin to a general point on the line is **a + λb**, not **λb**.', '(3) Derive Cartesian by equating components: x = x₁ + λa ⇒ λ = (x - x₁)/a.', '(4) Practice 5 conversions where the point is not the origin, e.g., through (2, -1, 3) parallel to (1, 2, -2).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
