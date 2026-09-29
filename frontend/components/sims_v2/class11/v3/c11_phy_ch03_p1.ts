import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch03_p1: SimDef = {
    id: 'v3_c11_phy_ch03_p1',
    title: 'Motion in a Plane',
    subtitle: 'Two dimensions change everything — projectiles, vectors, and why the fastest path isn\'t a straight line.',
    classLevel: 11, subject: 'physics', topic: 'Motion in a Plane',
    chapters: ['c11_phy_ch03'],
    nodeIds: ['c11_phy_cbse_03_001', 'c11_phy_cbse_03_002', 'c11_phy_cbse_03_003', 'c11_phy_cbse_03_004', 'c11_phy_cbse_03_005', 'c11_phy_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a basketball physicist perfecting a three-pointer', intro: 'The shot leaves your hands at 45°. Your job: find the launch angle that maximises range — and explain why it isn\'t 90°.', goal: 'Resolve vectors, predict projectile paths, and understand why horizontal and vertical motion are independent.' },
    discovery: {
        question: 'A ball thrown straight up from a moving truck lands... where? Most people say \'behind the truck\' — what does physics say?',
        options: ['Back in your hand — it keeps the truck\'s horizontal speed', 'Behind the truck', 'Straight down where it was thrown', 'It depends on the wind'],
        answer: 'Back in your hand — it keeps the truck\'s horizontal speed',
        hook: 'The ball never forgets it was moving with you. Horizontal and vertical motion are separate stories told at the same time.',
    },
    teaching: [
        { title: 'Scalars and Vectors', text: 'A scalar is a physical quantity completely specified by its magnitude (a single numerical value with proper SI unit) and has no direction; it obeys ordinary algebraic rules for addition, subtraction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_03_001', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the projectile lab: launch at 30°, 45°, 60° — measure range and air time, and find the angle that wins.',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_001', title: 'Scalars and Vectors',
          caseStudy: { intro: 'Observe a ceiling fan in your classroom: the blades rotate at constant speed, so each point on a blade has a speed (scalar) that stays the same, but its.',
            decisions: [{ prompt: 'State whether each of the following is a scalar or a vector: (a) mass of a cricket ball, (b) velocity of a bowler\'s delivery, (c).', options: [
                { text: '(a) Scalar — mass has magnitude only (kg), no direction', outcome: '(a) Scalar — mass has magnitude only (kg), no direction. (b) Vector — velocity requires both speed.' },
                { text: 'quantity with units', outcome: 'Not quite — Students believe that "any quantity with units is a vector" or "any quantity with magnitude is.', reveals: 'any-quantity-with-units-is' },
                { text: 'quantity with direction', outcome: 'Not quite — Students believe that "any quantity with units is a vector" or "any quantity with magnitude is.', reveals: 'any-quantity-with-units-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_002', title: 'Addition of Vectors: Graphical Method',
          scaffold: { problem: 'A motorboat moves with a velocity of 20 km/h due north in still water. The river flows at 12 km/h due east.',
            steps: [
            { text: 'Identify given quantities: **v_b** = 20 km/h north, **v_r** = 12 km/h east. Scale: 1 cm = 4 km/h.' },
            { text: 'Draw **v_b** = 5.0 cm (20/4) vertically upward (north). From its head, draw **v_r** = 3.0 cm (12/4) horizontally right.' },
            { text: 'Join tail of **v_b** to head of **v_r** to get resultant **v**. Measure length: ≈ 5.8 cm.' },
            { text: 'Convert measurements: magnitude = 5.8 cm × 4 km/h/cm = 23.2 km/h.' },
            { text: 'Verify analytically: |**v**| = √(20² + 12²) = √544 = 23.32 km/h. Angle = tan⁻¹(12/20) = 31°.' },
            { text: 'State final answer with units and proper vector notation.', faded: true, blankAnswer: 'Resultant velocity = 23.3 km/h at 31° east of north (or 59°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_003', title: 'Addition of Vectors: Analytical Method (Components)',
          scaffold: { problem: 'A drone flies from a warehouse with a velocity of 25 m/s at 53° above the horizontal towards the northeast.',
            steps: [
            { text: 'Identify given quantities and define coordinate system. Let +x = east, +y = north.' },
            { text: 'Resolve drone velocity into components. v_dx = 25 cos 53° = 25 × 0.6 = 15 m/s. v_dy = 25 sin 53° = 25 × 0.8 = 20 m/s.' },
            { text: 'Write vectors in component form. v_d = 15î + 20ĵ m/s. v_w = 10î + 0ĵ m/s.' },
            { text: 'Add components to get resultant. v_g = v_d + v_w = (15 + 10)î + (20 + 0)ĵ = 25î + 20ĵ m/s.' },
            { text: 'Compute magnitude. |v_g| = √(25² + 20²) = √(625 + 400) = √1025 ≈ 32.0 m/s.' },
            { text: 'Compute direction. tan θ = vy/vx = 20/25 = 0.8. θ = tan⁻¹(0.8) ≈ 38.7°.' },
            { text: 'Verify physical reasonableness. Wind adds to eastward component, so resultant should be more eastward than drone\'s.', faded: true, blankAnswer: 'v_g = (25î + 20ĵ) m/s; |v_g| ≈ 32.0 m/s; direction ≈ 38.7°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_004', title: 'Resolution of Vectors',
          scaffold: { problem: 'A drone flies with a velocity of 25 m/s at an angle of 53° above the horizontal towards the north-east.',
            steps: [
            { text: 'Identify given: magnitude v = 25 m/s, angle θ = 53° with +x axis (east). Find: vₓ (east), vᵧ (north).' },
            { text: 'Use resolution formulas: vₓ = v cosθ, vᵧ = v sinθ. Units: m/s.' },
            { text: 'Substitute: vₓ = 25 × 0.6 = 15 m/s; vᵧ = 25 × 0.8 = 20 m/s.' },
            { text: 'Verify magnitude: √(15² + 20²) = √(225+400) = √625 = 25 m/s. Consistent.' },
            { text: 'State answer with unit vectors: **v** = (15 **î** + 20 **ĵ**) m/s.', faded: true, blankAnswer: '**v** = (15 **î** + 20 **ĵ**) m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_005', title: 'Vector Addition Using Components',
          scaffold: { problem: 'A person walks 3.0 km at 30° north of east, then 4.0 km at 60° north of west, then 2.0 km due south.',
            steps: [
            { text: 'Identify given quantities and choose coordinate system. +x = east, +y = north.' },
            { text: 'Resolve each vector into components. **D₁**: D₁ₓ = 3.0 cos 30° = 3.0 × (√3/2) = 2.598 km, D₁ᵧ = 3.0 sin 30° = 3.0 × 0.5.' },
            { text: 'Add corresponding components. Rₓ = 2.598 + (−2.000) + 0 = 0.598 km. Rᵧ = 1.500 + 3.464 + (−2.000) = 2.964 km.' },
            { text: 'Compute magnitude and direction. R = √(0.598² + 2.964²) = √(0.358 + 8.785) = √9.143 = 3.024 km.' },
            { text: 'Express in unit-vector notation and verify. **R** = 0.598î + 2.964ĵ km.', faded: true, blankAnswer: '**R** = 3.02 km at 78.6° north of east (or 0.598î + 2.96ĵ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_006', title: 'Multiplication of Vectors by Real Numbers',
          scaffold: { problem: 'A car moves with velocity **v** = (12î – 5ĵ) m/s. The driver applies a constant deceleration such that after 3 s the velocity becomes.',
            steps: [
            { text: 'Identify given: **v** = (12î – 5ĵ) m/s, λ = –0.5, t = 3 s.' },
            { text: 'Compute **v\'** = λ**v** = –0.5(12î – 5ĵ) = –6î + 2.5ĵ m/s.' },
            { text: 'Magnitude of **v** = √(12² + 5²) = 13 m/s. Magnitude of **v\'** = |λ|×|**v**| = 0.5×13 = 6.5 m/s.' },
            { text: 'Direction of **v**: angle θ = tan⁻¹(–5/12) ≈ –22.6° (below +x axis).' },
            { text: 'For constant acceleration, average velocity = (**v** + **v\'**)/2 = ((12î – 5ĵ) + (–6î + 2.5ĵ))/2 = (6î – 2.5ĵ)/2 = 3î.', faded: true, blankAnswer: '**v\'** = –6î + 2.5ĵ m/s, magnitude 6.5 m/s, direction.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate classifying quantities says: \'Velocity is a scalar — it\'s written as a number with m/s. And for adding two forces, the triangle method and parallelogram method give different resultants — my two drawings came out different lengths.\'',
            decisions: [{ prompt: 'What\'s wrong on both counts?', options: [
                { text: 'Correct the test and the geometry: units don\'t decide scalar vs vector — direction does; velocity needs magnitude AND direction (a ceiling-fan blade keeps constant speed but changing velocity). And the two methods are identical geometry — the triangle is half the parallelogram; sliding a vector parallel to itself doesn\'t change it, so different-looking results mean drawing error, not different answers.', outcome: 'He applies the real test — does it need direction and add by the triangle law — and stops treating construction error as a physics result.' },
                { text: 'Agree velocity is scalar — only a number and unit appear when we write \'5 m/s\'.', outcome: 'The printed magnitude hides the attribute: \'5 m/s\' is incomplete without \'east\' or \'30° to horizontal\' — direction is inseparable from the vector.', reveals: 'units-imply-scalar' },
                { text: 'Accept the two resultants — different constructions can legitimately give different answers.', outcome: 'Both methods encode the same head-to-tail addition: the parallelogram\'s diagonal IS the triangle\'s closing side — equivalence is exact, not approximate.', reveals: 'methods-give-different-resultants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every cricket throw, every long jump, every water fountain is the same two independent motions — you can now see them separately.',
            decisions: [{ prompt: 'What comes next? Motion in a Plane · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Motion in a Plane · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_001', difficulty: 'standard',
          question: 'A scalar is a physical quantity completely specified by its magnitude (a single.',
          hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between.',
          misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically.',
          parts: [
                { id: 'a', prompt: 'State whether each of the following is a scalar or a vector: (a) mass of a cricket ball, (b) velocity of a bowler\'s delivery, (c) temperature of the pitch, (d).', answer: 'mass of a cricket ball, (',
                  options: ['mass of a cricket ball, (', 'quantity with units', 'quantity with direction', 'any quantity with units is a vector'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' },
                { id: 'b', prompt: 'Two vectors $\\vec{A}$ and $\\vec{B}$ have the same magnitude of 5 N. $\\vec{A}$ points due east, $\\vec{B}$ points due north.', answer: 'Vector equality requires both magnitude AND direction to be identical',
                  options: ['Vector equality requires both magnitude AND direction to be identical', 'any quantity with units is a vector', 'any quantity with magnitude is a scalar', 'it\'s just a number in newtons'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' },
                { id: 'c', prompt: 'A particle moves from point P(2, 3) to point Q(7, 8) in the x-y plane.', answer: 'Step 1: Position vector of P: $\\vec{r}_P = 2\\hat{i} + 3\\hat{j}$ m',
                  options: ['Step 1: Position vector of P: $\\vec{r}_P = 2\\hat{i} + 3\\hat{j}$ m', 'any quantity with units is a vector', 'any quantity with magnitude is a scalar', 'it\'s just a number in newtons'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' },
                { id: 'd', prompt: 'A car travels 10 km east, then 10 km north, then 10 km west. Compare the total path length (distance) with the magnitude of the net displacement.', answer: 'Total path length = 10 + 10 + 10 = 30 km',
                  options: ['Total path length = 10 + 10 + 10 = 30 km', 'any quantity with units is a vector', 'any quantity with magnitude is a scalar', 'it\'s just a number in newtons'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' }
          ],
            remediations: { 'any-quantity-with-units-is': { steps: ['Have the student list 5 quantities from daily life (e.g., "weight of school bag," "direction to school," "time to reach.', 'For each, ask: "Can you fully describe this quantity WITHOUT mentioning a direction?" If yes → scalar; if no → vector.', 'Demonstrate with a force spring balance: pull horizontally vs vertically — same magnitude (reading), different effect →.', 'Revisit the definition: "A vector is a quantity that has both magnitude AND direction AND obeys triangle law.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The displacement of a particle moving in a circle of radius R after one complete revolution is 2πR." Evaluate this statement and correct.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'any quantity with units is a vector', 'any quantity with magnitude is a scalar', 'it\'s just a number in newtons'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' },
                { id: 'b', prompt: 'Design a simple classroom activity using a metre scale, a piece of string, and two fixed points A and B on a lab table to demonstrate that displacement.', answer: 'Procedure: Fix points A and B 50 cm apart',
                  options: ['Procedure: Fix points A and B 50 cm apart', 'any quantity with units is a vector', 'any quantity with magnitude is a scalar', 'it\'s just a number in newtons'],
                  hint: 'If stuck, revisit Class 9 Chapter 8 (Motion) — specifically the difference between distance and.',
                  misconception: 'Students believe that "any quantity with units is a vector" or "any quantity with magnitude is a scalar." Specifically, they classify.' }
          ],
            remediations: { 'any-quantity-with-units-is': { steps: ['Have the student list 5 quantities from daily life (e.g., "weight of school bag," "direction to school," "time to reach.', 'For each, ask: "Can you fully describe this quantity WITHOUT mentioning a direction?" If yes → scalar; if no → vector.', 'Demonstrate with a force spring balance: pull horizontally vs vertically — same magnitude (reading), different effect →.', 'Revisit the definition: "A vector is a quantity that has both magnitude AND direction AND obeys triangle law.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_002', difficulty: 'standard',
          question: 'The graphical method of vector addition involves representing vectors.',
          hint: 'If stuck on drawing/measurement: revisit Class 10 Maths Chapter 7 (Coordinate Geometry).',
          misconception: 'Students believe the parallelogram method and triangle method give different resultants because "the parallelogram uses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The graphical method of vector addition involves representing vectors as directed line',
                  options: ['The graphical method of vector addition involves representing vectors as directed line', 'A scalar is a physical quantity completely specified by its magnitude (a single numerical', 'The analytical method of vector addition resolves each vector into its rectangular', 'Resolution of vectors is the process of splitting a single vector into two or more'],
                  hint: 'If stuck on drawing/measurement: revisit Class 10 Maths Chapter 7 (Coordinate Geometry) for.',
                  misconception: 'Students believe the parallelogram method and triangle method give different resultants because "the parallelogram uses both vectors from.' }
          ],
            remediations: { 'the-parallelogram-method-and-triangle': { steps: ['On graph paper, draw vector **A** = 4 cm east. Draw **B** = 3 cm north from same origin.', 'On same paper, draw **A** = 4 cm east. From its head, draw **B** = 3 cm north.', 'Compare **R** and **R\'** — they are identical in length and direction.', 'Explicitly state: "Moving **B** parallel to itself does not change the vector.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_003', difficulty: 'standard',
          question: 'The analytical method of vector addition resolves each vector into its.',
          hint: 'If stuck, revisit c10_math_cbse_08_001 (trigonometric ratios) for computing sin/cos.',
          misconception: 'Students believe that the angle θ in the formulas Ax = A cos θ, Ay = A sin θ is always measured from the positive.',
          parts: [
                { id: 'a', prompt: 'Why does the component method work for adding vectors that are not perpendicular to each other?', answer: 'The component method works',
                  options: ['The component method works', 'it works because of the parallelogram law'],
                  hint: 'If stuck, revisit c10_math_cbse_08_001 (trigonometric ratios) for computing sin/cos of non-standard.',
                  misconception: 'Students believe that the angle θ in the formulas Ax = A cos θ, Ay = A sin θ is always measured from the positive x-axis.' }
          ],
            remediations: { 'the-angle-in-the-formulas': { steps: ['Draw the vector on a coordinate system with its tail at the origin.', 'Identify the angle the vector makes with the +x-axis, measured counterclockwise (0° to 360°).', 'Use Ax = A cos θ, Ay = A sin θ with this θ.', 'Verify signs: if the vector points left, Ax must be negative; if it points down, Ay must be negative.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_004', difficulty: 'standard',
          question: 'Resolution of vectors is the process of splitting a single vector into two.',
          hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles.',
          misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as.',
          parts: [
                { id: 'a', prompt: 'State the x- and y-components of a force vector **F** = 20 N acting at an angle of 30° with the positive x-axis. Write the vector in unit vector notation.', answer: 'Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N',
                  options: ['Fₓ = 20 cos30° = 20 × (√3/2) = 10√3 ≈ 17.3 N, Fᵧ = 20 sin30° = 20 × 0.5 = 10 N', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles and the.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force.' },
                { id: 'b', prompt: 'A velocity vector has components vₓ = -12 m/s and vᵧ = 5 m/s. In which quadrant does the vector lie?', answer: 'The vector lies in the second quadrant (vₓ negative, vᵧ positive)',
                  options: ['The vector lies in the second quadrant (vₓ negative, vᵧ positive)', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles and the.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force.' },
                { id: 'c', prompt: 'A displacement vector **r** = (4î - 3ĵ) m. Find its magnitude and the angle it makes with the positive x-axis.', answer: 'Magnitude = √(4² + (-3)²) = √(16+9) = 5 m',
                  options: ['Magnitude = √(4² + (-3)²) = √(16+9) = 5 m', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles and the.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force.' },
                { id: 'd', prompt: 'Two vectors **A** and **B** lie in the x-y plane. **A** has magnitude 5 units along +x. **B** has magnitude 5 units at 120° from +x.', answer: 'Aₓ = +5',
                  options: ['Aₓ = +5', 'part of the vector', 'disappears', 'the original vector "disappears" when resolved'],
                  hint: 'Revise Class 10 Trigonometry (Chapter 8): specifically sin, cos, tan of standard angles and the.',
                  misconception: 'Students often believe that the component of a vector along an axis is "part of the vector" that exists physically as a separate force.' }
          ],
            remediations: { 'the-component-of-a-vector': { steps: ['Draw a vector **A** on graph paper.', 'Construct its x- and y-components by drawing perpendiculars to axes.', 'Measure the component lengths and verify Aₓ² + Aᵧ² = A² using a ruler.', 'Place a force sensor at the tip of **A** and then replace **A** with two perpendicular springs representing components.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_005', difficulty: 'standard',
          question: 'Vector addition using components is the analytical method of finding the.',
          hint: 'If stuck, revisit "Resolution of Vectors" (c11_phy_cbse_03_004) and practice finding.',
          misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g.',
          parts: [
                { id: 'a', prompt: 'A force vector **F** = 10 N acts at an angle of 120° measured counterclockwise from the +x-axis. What are its x and y components?', answer: '*Fₓ* = 10 cos 120° = 10 × (−½) = −5.0 N',
                  options: ['*Fₓ* = 10 cos 120° = 10 × (−½) = −5.0 N', '**R** is at 45° or 90°)'],
                  hint: 'If stuck, revisit "Resolution of Vectors" (c11_phy_cbse_03_004) and practice finding components for.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' },
                { id: 'b', prompt: 'A displacement vector **D₁** = 5.0 m at 37° above +x-axis, and **D₂** = 8.0 m at 53° below +x-axis.', answer: '**Step 1:** Resolve **D₁**: *D₁ₓ* = 5.0 × 0.8 = 4.0 m, *D₁ᵧ* = 5.0 × 0.6 = 3.0 m',
                  options: ['**Step 1:** Resolve **D₁**: *D₁ₓ* = 5.0 × 0.8 = 4.0 m, *D₁ᵧ* = 5.0 × 0.6 = 3.0 m', '**R** is at 45° or 90°)'],
                  hint: 'If stuck, revisit "Resolution of Vectors" (c11_phy_cbse_03_004) and practice finding components for.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' },
                { id: 'c', prompt: 'Three forces act on a point object: **F₁** = 10 N at 0°, **F₂** = 10 N at 120°, **F₃** = 10 N at 240°.', answer: 'The resultant force is **zero** (null vector)',
                  options: ['The resultant force is **zero** (null vector)', '**R** is at 45° or 90°)'],
                  hint: 'If stuck, revisit "Resolution of Vectors" (c11_phy_cbse_03_004) and practice finding components for.',
                  misconception: 'Students believe the angle of the resultant vector is simply the sum or average of the individual vector angles (e.g., if **A** is at 30°.' }
          ],
            remediations: { 'the-angle-of-the-resultant': { steps: ['**Visualise components:** Draw each vector on an x-y grid, drop perpendiculars to axes, and label *Aₓ*, *Aᵧ* with signs.', '**Make a component table:** Create a table with columns: Vector | Magnitude | Angle | *x-comp* (mag × cos θ) | *y-comp*.', '**Sum columns separately:** Add all *x-comp* values → *Rₓ*; add all *y-comp* values → *Rᵧ*.', '**Check quadrant:** Use signs of *Rₓ* and *Rᵧ* to determine the resultant\'s quadrant (I: ++, II: −+, III: −−, IV: +−).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_006', difficulty: 'standard',
          question: 'Multiplication of a vector by a real number (scalar) λ yields a new vector.',
          hint: 'Review Class 6 integer multiplication (c6_math_ch02_022) and Class 11 Scalars and Vectors.',
          misconception: 'Students often think that multiplying a vector by a negative scalar only changes the magnitude (like positive scalar).',
          parts: [
                { id: 'a', prompt: 'State the magnitude and direction of the vector –3**A** if **A** has magnitude 4 units and points north.', answer: 'Magnitude = 12 units, direction = south',
                  options: ['Magnitude = 12 units, direction = south', 'a negative scalar only changes magnitude, not direction'],
                  hint: 'Review Class 6 integer multiplication (c6_math_ch02_022) and Class 11 Scalars and Vectors.',
                  misconception: 'Students often think that multiplying a vector by a negative scalar only changes the magnitude (like positive scalar) and forget that the.' }
          ],
            remediations: { 'multiplying-a-vector-by-a': { steps: ['Draw vector **A** on paper.', 'Draw 2**A** (same direction, double length).', 'Draw –**A** (same length, opposite direction).', 'Draw –2**A** (double length, opposite direction).'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
