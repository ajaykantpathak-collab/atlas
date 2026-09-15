import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch03_p2: SimDef = {
    id: 'v3_c11_phy_ch03_p2',
    title: 'Motion in a Plane',
    subtitle: 'Two dimensions change everything — projectiles, vectors, and why the fastest path isn\'t a straight line.',
    classLevel: 11, subject: 'physics', topic: 'Motion in a Plane · Part 2/3',
    chapters: ['c11_phy_ch03'],
    nodeIds: ['c11_phy_cbse_03_007', 'c11_phy_cbse_03_008', 'c11_phy_cbse_03_009', 'c11_phy_cbse_03_010', 'c11_phy_cbse_03_011', 'c11_phy_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a basketball physicist perfecting a three-pointer', intro: 'The shot leaves your hands at 45°. Your job: find the launch angle that maximises range — and explain why it isn\'t 90°.', goal: 'Resolve vectors, predict projectile paths, and understand why horizontal and vertical motion are independent.' },
    discovery: {
        question: 'A ball thrown straight up from a moving truck lands... where? Most people say \'behind the truck\' — what does physics say?',
        options: ['Back in your hand — it keeps the truck\'s horizontal speed', 'Behind the truck', 'Straight down where it was thrown', 'It depends on the wind'],
        answer: 'Back in your hand — it keeps the truck\'s horizontal speed',
        hook: 'The ball never forgets it was moving with you. Horizontal and vertical motion are separate stories told at the same time.',
    },
    teaching: [
        { title: 'Scalar (Dot) Product of Two Vectors', text: 'The scalar (dot) product of two vectors **A** and **B** is a scalar quantity defined as **A·B = |A||B|cosθ**, where |A| and |B| are the magnitudes of the vectors and θ is the smaller angle between.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_03_007', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the projectile lab: launch at 30°, 45°, 60° — measure range and air time, and find the angle that wins.',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_007', title: 'Scalar (Dot) Product of Two Vectors',
          scaffold: { problem: 'A force **F** = (5î − 2ĵ + 3k̂) N acts on a particle that moves from point P(1, 2, −1) m to point Q(4, 0, 3) m.',
            steps: [
            { text: 'Find displacement vector **s** = **r_Q** − **r_P** = (4−1)î + (0−2)ĵ + (3−(−1))k̂ = 3î − 2ĵ + 4k̂ m.' },
            { text: 'Write force **F** = 5î − 2ĵ + 3k̂ N.' },
            { text: 'Compute dot product **F·s** = (5)(3) + (−2)(−2) + (3)(4) = 15 + 4 + 12 = 31.' },
            { text: 'Units: N × m = J. So W = 31 J.' },
            { text: 'Check reasonableness: Force and displacement have positive dot product, so work is positive; angle is acute.', faded: true, blankAnswer: '31 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_008', title: 'Vector (Cross) Product of Two Vectors',
          scaffold: { problem: 'A force **F** = (3î + 4ĵ) N acts at a point with position vector **r** = (2î - ĵ) m relative to a pivot.',
            steps: [
            { text: 'Identify given vectors in component form: **r** = 2î - 1ĵ + 0k̂ m, **F** = 3î + 4ĵ + 0k̂ N.' },
            { text: 'Write the determinant for cross product:' },
            { text: 'Expand the determinant:' },
            { text: 'Simplify each component:' },
            { text: 'Magnitude = 11 N·m. Direction = +k̂ (out of the page, counterclockwise rotation).', faded: true, blankAnswer: '**τ** = 11k̂ N·m (magnitude 11 N·m, direction out of the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_009', title: 'Motion in a Plane: Position and Displacement Vectors',
          scaffold: { problem: 'A drone takes off from a roof at point A(2, 3) and flies to point B(8, 11) on a coordinate grid where each unit is 10 m.',
            steps: [
            { text: 'Convert coordinates to metres. A(2,3) → (20 m, 30 m); B(8,11) → (80 m, 110 m).' },
            { text: 'Position vector formula **r** = x**î** + y**ĵ**. Substitute: **r**_A = 20**î** + 30**ĵ** m; **r**_B = 80**î**.' },
            { text: 'Displacement **Δr** = **r**_B − **r**_A = (80−20)**î** + (110−30)**ĵ** = 60**î** + 80**ĵ** m.' },
            { text: 'Magnitude |**Δr**| = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 m. Unit check: √(m²) = m ✓.' },
            { text: 'Path length = 150 m > 100 m = displacement magnitude. Physically reasonable: straight-line distance is shorter than.', faded: true, blankAnswer: '(a) **r**_A = (20**î** + 30**ĵ**) m, **r**_B = (80**î**.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_010', title: 'Projectile Motion: Horizontal Projection',
          scaffold: { problem: 'A rescue helicopter flying horizontally at 50 m/s at a height of 200 m drops a food packet for flood victims.',
            steps: [
            { text: 'Identify given quantities: u = 50 m/s (horizontal), h = 200 m, g = 10 m/s².' },
            { text: 'For vertical motion, use y = -½gt² with y = -h = -200 m. So -200 = -½(10)t² → 200 = 5t² → t² = 40 → t = √40 = 2√10 ≈.' },
            { text: 'Horizontal range R = u × t = 50 × 6.32 = 316 m (or exactly 50 × 2√10 = 100√10 ≈ 316.2 m).' },
            { text: 'Impact velocity components: vₓ = u = 50 m/s (constant). vᵧ = -gt = -10 × 6.32 = -63.2 m/s (downward).' },
            { text: 'Impact speed v = √(vₓ² + vᵧ²) = √(50² + 63.2²) = √(2500 + 3994) = √6494 ≈ 80.6 m/s.', faded: true, blankAnswer: '(a) t = 2√10 s ≈ 6.32 s, (b) R = 100√10 m ≈ 316 m, (c) v ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_011', title: 'Projectile Motion: Angular Projection',
          scaffold: { problem: 'A football is kicked from ground level with an initial speed of 25 m/s at an angle of 37° above horizontal.',
            steps: [
            { text: 'Identify given quantities with units: v₀ = 25 m/s, θ₀ = 37°, g = 10 m/s². sin 37° = 0.6, cos 37° = 0.8.' },
            { text: 'Resolve initial velocity into components: v₀ₓ = v₀ cos θ₀ = 25 × 0.8 = 20 m/s. v₀ᵧ = v₀ sin θ₀ = 25 × 0.6 = 15 m/s.' },
            { text: 'Apply formulas for max height, time of flight, range. H = (v₀ᵧ²)/(2g) = (15²)/(2×10) = 225/20 = 11.25 m.' },
            { text: 'Find velocity at t = 2.0 s. vₓ = v₀ₓ = 20 m/s (constant). vᵧ = v₀ᵧ - gt = 15 - 10×2 = -5 m/s (downward).' },
            { text: 'Magnitude of velocity at t=2 s: v = √(20² + (-5)²) = √425 ≈ 20.6 m/s.' },
            { text: 'Verify physical reasonableness: At t=2 s, ball is on its way down (since T=3 s, tₘ=1.5 s).', faded: true, blankAnswer: '(a) H = 11.25 m, (b) T = 3.0 s, (c) R = 60 m, (d) v(2 s).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_012', title: 'Equation of Trajectory of a Projectile',
          scaffold: { problem: 'A football is kicked from ground level with a speed of \\(25 \\, \\text{m/s}\\) at an angle of \\(37^\\circ\\) to the horizontal.',
            steps: [
            { text: 'Identify given quantities: \\(u = 25 \\, \\text{m/s}\\), \\(\\theta = 37^\\circ\\), \\(g = 10 \\, \\text{m/s}^2\\).' },
            { text: 'Write the general trajectory equation: \\(y = x\\tan\\theta - \\frac{g}{2u^2\\cos^2\\theta}x^2\\).' },
            { text: 'Equation is \\(y = 0.75x - 0.0125x^2\\). (Check units: \\(0.75\\) dimensionless, \\(0.0125 \\, \\text{m}^{-1} \\times x^2 \\.' },
            { text: 'For (b), put \\(x = 20 \\, \\text{m}\\): \\(y = 0.75(20) - 0.0125(400) = 15 - 5 = 10 \\, \\text{m}\\).' },
            { text: 'For (c), set \\(y = 10\\): \\(10 = 0.75x - 0.0125x^2 \\Rightarrow 0.0125x^2 - 0.75x + 10 = 0\\).', faded: true, blankAnswer: '(a) \\(y = 0.75x - 0.0125x^2\\) (b) \\(10 \\, \\text{m}\\) (c).' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate classifying quantities says: \'Velocity is a scalar — it\'s written as a number with m/s. And for adding two forces, the triangle method and parallelogram method give different resultants — my two drawings came out different lengths.\'',
            decisions: [{ prompt: 'What\'s wrong on both counts?', options: [
                { text: 'Correct the test and the geometry: units don\'t decide scalar vs vector — direction does; velocity needs magnitude AND direction (a ceiling-fan blade keeps constant speed but changing velocity). And the two methods are identical geometry — the triangle is half the parallelogram; sliding a vector parallel to itself doesn\'t change it, so different-looking results mean drawing error, not different answers.', outcome: 'He applies the real test — does it need direction and add by the triangle law — and stops treating construction error as a physics result.' },
                { text: 'Agree velocity is scalar — only a number and unit appear when we write \'5 m/s\'.', outcome: 'The printed magnitude hides the attribute: \'5 m/s\' is incomplete without \'east\' or \'30° to horizontal\' — direction is inseparable from the vector.', reveals: 'units-imply-scalar' },
                { text: 'Accept the two resultants — different constructions can legitimately give different answers.', outcome: 'Both methods encode the same head-to-tail addition: the parallelogram\'s diagonal IS the triangle\'s closing side — equivalence is exact, not approximate.', reveals: 'methods-give-different-resultants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'Every cricket throw, every long jump, every water fountain is the same two independent motions — you can now see them separately.',
            decisions: [{ prompt: 'What comes next? Motion in a Plane · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Motion in a Plane · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_007', difficulty: 'standard',
          question: 'The scalar (dot) product of two vectors **A** and **B** is a scalar quantity.',
          hint: 'Review node c11_phy_cbse_03_004 (Resolution of Vectors) and practice writing vectors.',
          misconception: 'Students often think the dot product of two vectors is a vector (like the cross product) and write **A·B = |A||B|cosθ.',
          parts: [
                { id: 'a', prompt: 'Vector **A** = 2î + 3ĵ and vector **B** = 4î − 6ĵ. Without calculating the exact angle, determine whether the angle between them is acute, obtuse, or right.', answer: '**A·B** = (2)(4) + (3)(−6) = 8 − 18 = −10',
                  options: ['**A·B** = (2)(4) + (3)(−6) = 8 − 18 = −10', 'acute because magnitudes are positive'],
                  hint: 'Review node c11_phy_cbse_03_004 (Resolution of Vectors) and practice writing vectors in î, ĵ, k̂.',
                  misconception: 'Students often think the dot product of two vectors is a vector (like the cross product) and write **A·B = |A||B|cosθ n̂** with.' }
          ],
            remediations: { 'the-dot-product-of-two': { steps: ['**Revisit projection**: Draw a vector **A** and drop a perpendicular from **B**\'s tip to **A**\'s line.', 'The length of the projection is |B|cosθ.', 'Multiply by |A| to get the dot product.', 'Do this graphically for θ = 0°, 60°, 90°, 120°.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_008', difficulty: 'standard',
          question: 'The vector (cross) product of two vectors **A** and **B** is a vector **C**.',
          hint: 'If stuck, review the unit vector cross products (î × ĵ = k̂, etc.) and practice the 3×3.',
          misconception: 'Students often think the cross product **A** × **B** is a scalar because the magnitude formula |**A**||**B**| sin θ.',
          parts: [
                { id: 'a', prompt: 'State the magnitude and direction of the cross product **A** × **B** if **A** = 3î + 4ĵ and **B** = 5î (both in metres). Give the SI unit of the result.', answer: 'Magnitude = 20 m², direction = +k̂ (out of the page)',
                  options: ['Magnitude = 20 m², direction = +k̂ (out of the page)', 'parallel vectors have non-zero cross product'],
                  hint: 'If stuck, review the unit vector cross products (î × ĵ = k̂, etc.) and practice the 3×3 determinant.',
                  misconception: 'Students often think the cross product **A** × **B** is a scalar because the magnitude formula |**A**||**B**| sin θ looks like a number.' },
                { id: 'b', prompt: 'Explain why **A** × **B** = -(**B** × **A**) using the right-hand rule and the definition of the cross product.', answer: 'The right-hand rule gives opposite directions when the order is reversed',
                  options: ['The right-hand rule gives opposite directions when the order is reversed', 'cross product is negative'],
                  hint: 'If stuck, review the unit vector cross products (î × ĵ = k̂, etc.) and practice the 3×3 determinant.',
                  misconception: 'Students often think the cross product **A** × **B** is a scalar because the magnitude formula |**A**||**B**| sin θ looks like a number.' }
          ],
            remediations: { 'the-cross-product-a-b': { steps: ['Revisit the right-hand rule physically: hold a pen as **A**, another as **B**, use your right hand to find **A**.', 'Practice the determinant method with a 3×3 matrix written on paper, explicitly writing the cofactor signs (+ - +) for.', 'Memorize the unit vector cross products: î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ, and the reverse order gives negatives.', 'Solve 5 problems where you compute both **A** × **B** and **B** × **A** to internalize anti-commutativity.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_009', difficulty: 'standard',
          question: 'A position vector **r** of a particle P in a plane is the vector drawn from.',
          hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
          misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".',
          parts: [
                { id: 'a', prompt: 'A particle is located at point P(3, 4) in a coordinate system with origin O(0, 0).', answer: '**r** = 3**î** + 4**ĵ** m',
                  options: ['**r** = 3**î** + 4**ĵ** m', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'b', prompt: 'A car moves from point A(2, 1) to point B(5, 5) on a flat field. The driver actually takes a winding path of length 8 m.', answer: '**Δr** = 3**î** + 4**ĵ** m',
                  options: ['**Δr** = 3**î** + 4**ĵ** m', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'c', prompt: 'The position of a particle at time t = 2 s is **r**₁ = (4**î** + 3**ĵ**) m and at t = 5 s is **r**₂ = (10**î** − 2**ĵ**) m.', answer: '**Δr** = **r**₂ − **r**₁ = (10−4)**î** + (−2−3)**ĵ** = 6**î** − 5**ĵ** m',
                  options: ['**Δr** = **r**₂ − **r**₁ = (10−4)**î** + (−2−3)**ĵ** = 6**î** − 5**ĵ** m', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' }
          ],
            remediations: { 'displacement-is-the-distance-travelled': { steps: ['Draw a coordinate grid on paper.', 'Mark start point O(0,0) and end point P(3,4).', 'Draw three different paths from O to P: a straight line, a right-angled path (3 right, 4 up), and a wavy curve.', 'Use a thread to measure each path length.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a particle moves in a circle of radius R and completes one full revolution, its displacement is 2πR." Evaluate this statement and correct.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'b', prompt: 'Design a simple experiment using a metre scale, a thread, and a few pins on a cardboard to demonstrate that displacement magnitude is always less than or equal.', answer: 'Fix pins at points A and B on cardboard',
                  options: ['Fix pins at points A and B on cardboard', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' }
          ],
            remediations: { 'displacement-is-the-distance-travelled': { steps: ['Draw a coordinate grid on paper.', 'Mark start point O(0,0) and end point P(3,4).', 'Draw three different paths from O to P: a straight line, a right-angled path (3 right, 4 up), and a wavy curve.', 'Use a thread to measure each path length.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_010', difficulty: 'standard',
          question: 'Horizontal projection is a special case of projectile motion where an object.',
          hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
          misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the.',
          parts: [
                { id: 'a', prompt: 'A stone is thrown horizontally with a speed of 10 m/s from a cliff 80 m high. What is the horizontal component of its velocity 2 seconds after projection?', answer: '10 m/s',
                  options: ['10 m/s', 'goes straight for a while then falls down', 'gravity affects horizontal motion or that horizontal velocity changes with time', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' },
                { id: 'b', prompt: 'Why does a horizontally projected object follow a parabolic path even though its horizontal velocity is constant?', answer: 'The horizontal displacement x is proportional to time (x = v₀t), while vertical',
                  options: ['The horizontal displacement x is proportional to time (x = v₀t), while vertical', 'because gravity curves the path', 'goes straight for a while then falls down', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' },
                { id: 'c', prompt: 'A ball is thrown horizontally from a height of 45 m with a speed of 20 m/s.', answer: 'the time taken to reach the ground, (',
                  options: ['the time taken to reach the ground, (', 'goes straight for a while then falls down', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' },
                { id: 'd', prompt: 'Two identical balls are projected horizontally from the same height. Ball A has initial speed 10 m/s, Ball B has initial speed 20 m/s.', answer: '(i) Time of flight is SAME for both (depends only on height and g)',
                  options: ['(i) Time of flight is SAME for both (depends only on height and g)', 'B takes less time', 'goes straight for a while then falls down', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' }
          ],
            remediations: { 'a-horizontally-projected-object-goes': { steps: ['Use a "simultaneous drop" demo: Project a ball horizontally from a table while simultaneously dropping an identical.', 'Both hit the ground at the same time (audible).', 'Have the student video-record the motion and trace positions frame-by-frame on a transparent sheet overlay - they will.', 'Re-derive the equations emphasizing that x(t) and y(t) are evaluated at the SAME t.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_011', difficulty: 'standard',
          question: 'Projectile motion with angular projection (oblique projection) is the.',
          hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for.',
          misconception: 'Students often believe that the velocity vector at the maximum height is zero.',
          parts: [
                { id: 'a', prompt: 'State the horizontal and vertical components of initial velocity for a projectile launched with speed 25 m/s at 30° above horizontal.', answer: 'v₀ₓ = v₀ cos θ₀ = 25 cos 30° = 25 × (√3/2) = 21.65 m/s (horizontal)',
                  options: ['v₀ₓ = v₀ cos θ₀ = 25 cos 30° = 25 × (√3/2) = 21.65 m/s (horizontal)', 'vertical velocity is zero', 'total velocity is zero', 'the velocity vector at the maximum height is zero'],
                  hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for constant.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' },
                { id: 'b', prompt: 'Explain why the horizontal velocity of a projectile remains constant throughout its flight while the vertical velocity changes.', answer: 'Horizontal velocity is constant',
                  options: ['Horizontal velocity is constant', 'horizontal velocity decreases due to gravity', 'vertical velocity is zero', 'total velocity is zero'],
                  hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for constant.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' },
                { id: 'c', prompt: 'A stone is thrown from the top of a 45 m high cliff with an initial speed of 20 m/s at 30° above horizontal.', answer: 'Given: y₀ = 45 m, v₀ = 20 m/s, θ₀ = 30°, g = 10 m/s²',
                  options: ['Given: y₀ = 45 m, v₀ = 20 m/s, θ₀ = 30°, g = 10 m/s²', 'vertical velocity is zero', 'total velocity is zero', 'the velocity vector at the maximum height is zero'],
                  hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for constant.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' },
                { id: 'd', prompt: 'Two projectiles A and B are launched with the same initial speed v₀ but at angles θ and (90° - θ) respectively.', answer: 'For A (angle θ): H_A = (v₀² sin²θ)/(2g), T_A = (2v₀ sinθ)/g, R_A = (v₀² sin2θ)/g',
                  options: ['For A (angle θ): H_A = (v₀² sin²θ)/(2g), T_A = (2v₀ sinθ)/g, R_A = (v₀² sin2θ)/g', 'vertical velocity is zero', 'total velocity is zero', 'all three are equal'],
                  hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for constant.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' }
          ],
            remediations: { 'the-velocity-vector-at-the': { steps: ['To fix the "zero velocity at top" misconception: (1) Draw velocity vectors at several points on the trajectory.', '(2) Use a video of a ball thrown at an angle (or a simulation) and pause at the top; ask "Is the ball moving sideways?".', '(4) For acceleration: remind that a = dv/dt; even if vᵧ=0 instantaneously, it is changing from + to -, so aᵧ = -g ≠ 0.', 'Do a quick activity: toss a ball straight up; at the top v=0 but it still falls, proving a=g.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_012', difficulty: 'standard',
          question: 'The equation of trajectory of a projectile is the mathematical relationship.',
          hint: 'Revisit "Projectile Motion: Angular Projection" (c11_phy_cbse_03_011) and practice.',
          misconception: 'Students often believe the trajectory equation \\(y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}\\) gives the *entire*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The equation of trajectory of a projectile is the mathematical relationship between the',
                  options: ['The equation of trajectory of a projectile is the mathematical relationship between the', 'A scalar is a physical quantity completely specified by its magnitude (a single numerical', 'The graphical method of vector addition involves representing vectors as directed line', 'The analytical method of vector addition resolves each vector into its rectangular'],
                  hint: 'Revisit "Projectile Motion: Angular Projection" (c11_phy_cbse_03_011) and practice eliminating the.',
                  misconception: 'Students often believe the trajectory equation \\(y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}\\) gives the *entire* flight path including.' }
          ],
            remediations: { 'the-trajectory-equation-y-x': { steps: ['Re-derive the equation from \\(x = u\\cos\\theta \\, t\\) and \\(y = u\\sin\\theta \\, t - \\frac{1}{2}gt^2\\) on paper.', 'Identify the domain: \\(t \\geq 0 \\Rightarrow x \\geq 0\\); flight ends when \\(y=0 \\Rightarrow x = R\\).', 'Test the horizontal projection case (\\(\\theta=0\\)): \\(y = -\\frac{gx^2}{2u^2}\\) — verify it matches the known result for.', 'Solve a problem where you are given \\(x > R\\) and asked for \\(y\\) — explicitly state "the projectile has already.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
