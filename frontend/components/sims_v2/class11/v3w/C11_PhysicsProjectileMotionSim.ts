import type { SimDef } from '../../engine/types';
import C11_PhysicsProjectileMotionSim from '../../../simulations/c6_12/C11_PhysicsProjectileMotionSim';

/** v3 wrapped master — C11_PhysicsProjectileMotionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsprojectilemotionsim: SimDef = {
    id: 'v3w_c11_physicsprojectilemotionsim',
    title: 'Motion with Constant Acceleration: Free Fall',
    subtitle: 'This node covers vertical motion under constant gravitational acceleration only (free.',
    classLevel: 11, subject: 'physics', topic: 'Motion with Constant Acceleration: Free Fall',
    chapters: [],
    nodeIds: ['c11_phy_cbse_02_008', 'c11_phy_cbse_03_009', 'c11_phy_cbse_03_010', 'c11_phy_cbse_03_011', 'c11_phy_cbse_03_012', 'c11_phy_cbse_03_013', 'c11_phy_cbse_02_001', 'c11_phy_cbse_02_002', 'c11_phy_cbse_02_003', 'c11_phy_cbse_02_004', 'c11_phy_cbse_02_005', 'c11_phy_cbse_02_006', 'c11_phy_cbse_02_007', 'c11_phy_cbse_02_009', 'c11_phy_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a feather and a coin dropped simultaneously in a vacuum tube (or watch a video of Apollo 15.', goal: 'Master Motion with Constant Acceleration: Free Fall.' },
    discovery: {
        question: 'A ball is dropped from rest from a height of 20 m. What is the magnitude and direction of its acceleration at the instant it is released? State the SI unit.',
        options: ['The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward', 'upward', 'heavier objects fall faster'],
        answer: 'The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward',
        hook: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with.',
    },
    teaching: [
        { title: 'Free fall is the motion of an object under.', text: 'Free fall is the motion of an object under the influence of gravitational force only, with air resistance neglected, where the acceleration is constant and directed vertically downward with magnitude.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_008', title: 'Free fall is the motion of an object.',
          scaffold: { problem: 'A cricket ball is thrown vertically upward from a balcony 12 m above the ground with an initial speed of 18 m/s.',
            steps: [
            { text: 'Identify given quantities: initial height y₀ = 12 m, initial velocity u = +18 m/s, acceleration a = -g = -10 m/s².' },
            { text: 'For (a) maximum height, use v² = u² + 2a(y - y₀) with v = 0 at top. Substitute: 0 = (18)² + 2(-10)(y_max - 12).' },
            { text: 'Solve for y_max: 0 = 324 - 20(y_max - 12) → 20(y_max - 12) = 324 → y_max - 12 = 16.2 → y_max = 28.2 m above ground.' },
            { text: 'For (b) time to max height, use v = u + at with v = 0: 0 = 18 + (-10)t_up → t_up = 1.8 s.' },
            { text: 'For (c) velocity at ground, use v² = u² + 2a(y - y₀) with y = 0 (ground level): v² = (18)² + 2(-10)(0 - 12) = 324 + 240.' },
            { text: 'v = -√564 ≈ -23.75 m/s (negative sign indicates downward direction).', faded: true, blankAnswer: '(a) 28.2 m above ground, (b) 1.8 s, (c) 23.75 m/s downward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_009', title: 'A position vector **r** of a particle P.',
          scaffold: { problem: 'A drone takes off from a roof at point A(2, 3) and flies to point B(8, 11) on a coordinate grid where each unit is 10 m.',
            steps: [
            { text: 'Convert coordinates to metres. A(2,3) → (20 m, 30 m); B(8,11) → (80 m, 110 m).' },
            { text: 'Position vector formula **r** = x**î** + y**ĵ**. Substitute: **r**_A = 20**î** + 30**ĵ** m; **r**_B = 80**î** +.' },
            { text: 'Displacement **Δr** = **r**_B − **r**_A = (80−20)**î** + (110−30)**ĵ** = 60**î** + 80**ĵ** m.' },
            { text: 'Magnitude |**Δr**| = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 m. Unit check: √(m²) = m ✓.' },
            { text: 'Path length = 150 m > 100 m = displacement magnitude. Physically reasonable: straight-line distance is shorter than.', faded: true, blankAnswer: '(a) **r**_A = (20**î** + 30**ĵ**) m, **r**_B = (80**î** +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_010', title: 'Horizontal projection is a special case.',
          scaffold: { problem: 'A rescue helicopter flying horizontally at 50 m/s at a height of 200 m drops a food packet for flood victims.',
            steps: [
            { text: 'Identify given quantities: u = 50 m/s (horizontal), h = 200 m, g = 10 m/s².' },
            { text: 'For vertical motion, use y = -½gt² with y = -h = -200 m. So -200 = -½(10)t² → 200 = 5t² → t² = 40 → t = √40 = 2√10 ≈.' },
            { text: 'Horizontal range R = u × t = 50 × 6.32 = 316 m (or exactly 50 × 2√10 = 100√10 ≈ 316.2 m).' },
            { text: 'Impact velocity components: vₓ = u = 50 m/s (constant). vᵧ = -gt = -10 × 6.32 = -63.2 m/s (downward).' },
            { text: 'Impact speed v = √(vₓ² + vᵧ²) = √(50² + 63.2²) = √(2500 + 3994) = √6494 ≈ 80.6 m/s.', faded: true, blankAnswer: '(a) t = 2√10 s ≈ 6.32 s, (b) R = 100√10 m ≈ 316 m, (c) v ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_011', title: 'Projectile motion with angular.',
          scaffold: { problem: 'A football is kicked from ground level with an initial speed of 25 m/s at an angle of 37° above horizontal.',
            steps: [
            { text: 'Identify given quantities with units: v₀ = 25 m/s, θ₀ = 37°, g = 10 m/s². sin 37° = 0.6, cos 37° = 0.8.' },
            { text: 'Resolve initial velocity into components: v₀ₓ = v₀ cos θ₀ = 25 × 0.8 = 20 m/s. v₀ᵧ = v₀ sin θ₀ = 25 × 0.6 = 15 m/s.' },
            { text: 'Apply formulas for max height, time of flight, range. H = (v₀ᵧ²)/(2g) = (15²)/(2×10) = 225/20 = 11.25 m.' },
            { text: 'Find velocity at t = 2.0 s. vₓ = v₀ₓ = 20 m/s (constant). vᵧ = v₀ᵧ - gt = 15 - 10×2 = -5 m/s (downward).' },
            { text: 'Magnitude of velocity at t=2 s: v = √(20² + (-5)²) = √425 ≈ 20.6 m/s.' },
            { text: 'Verify physical reasonableness: At t=2 s, ball is on its way down (since T=3 s, tₘ=1.5 s).', faded: true, blankAnswer: '(a) H = 11.25 m, (b) T = 3.0 s, (c) R = 60 m, (d) v(2 s) =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_012', title: 'The equation of trajectory of a.',
          scaffold: { problem: 'A football is kicked from ground level with a speed of \\(25 \\, \\text{m/s}\\) at an angle of \\(37^\\circ\\) to the horizontal.',
            steps: [
            { text: 'Identify given quantities: \\(u = 25 \\, \\text{m/s}\\), \\(\\theta = 37^\\circ\\), \\(g = 10 \\, \\text{m/s}^2\\).' },
            { text: 'Write the general trajectory equation: \\(y = x\\tan\\theta - \\frac{g}{2u^2\\cos^2\\theta}x^2\\).' },
            { text: 'Equation is \\(y = 0.75x - 0.0125x^2\\). (Check units: \\(0.75\\) dimensionless, \\(0.0125 \\, \\text{m}^{-1} \\times x^2 \\,.' },
            { text: 'For (b), put \\(x = 20 \\, \\text{m}\\): \\(y = 0.75(20) - 0.0125(400) = 15 - 5 = 10 \\, \\text{m}\\).' },
            { text: 'For (c), set \\(y = 10\\): \\(10 = 0.75x - 0.0125x^2 \\Rightarrow 0.0125x^2 - 0.75x + 10 = 0\\).', faded: true, blankAnswer: '(a) \\(y = 0.75x - 0.0125x^2\\) (b) \\(10 \\, \\text{m}\\) (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_013', title: 'The maximum height (H) of a projectile.',
          scaffold: { problem: 'A football is kicked from ground level with an initial speed of 25 m/s at an angle of 30° with the horizontal.',
            steps: [
            { text: 'Identify given quantities: u = 25 m/s, θ = 30°, g = 10 m/s². sin30° = 0.5, cos30° = √3/2 ≈ 0.866.' },
            { text: 'Select formulas: H = (u² sin²θ)/(2g), t_m = u sinθ/g, R = (u² sin2θ)/g, T = 2u sinθ/g.' },
            { text: 'Compute sin²θ = (0.5)² = 0.25. sin2θ = sin60° = √3/2 ≈ 0.866.' },
            { text: 'Substitute: H = (625 × 0.25)/20 = 156.25/20 = 7.8125 m. t_m = (25 × 0.5)/10 = 12.5/10 = 1.25 s.' },
            { text: 'Verify: T = 2t_m ✓ (2.5 = 2×1.25). Range is positive and reasonable for a football kick. H < R for θ < 45° ✓.', faded: true, blankAnswer: '(a) H = 7.81 m, (b) t_m = 1.25 s, (c) R = 54.1 m, (d) T =.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_03_009', title: 'Identify each idea',
          dissect: { specimen: 'Motion with Constant Acceleration: Free Fall', spots: [
            { id: 's1', label: 'Free fall is the motion', prompt: 'Which idea is this? — Free fall is the motion of an object under the influence of gravitational force only,.', answer: 'Free fall is the motion', options: ['Free fall is the motion', 'A position vector r of', 'Horizontal projection is a special', 'Projectile motion with angular projection'] },
            { id: 's2', label: 'A position vector r of', prompt: 'Which idea is this? — A position vector **r** of a particle P in a plane is the vector drawn from a chosen.', answer: 'A position vector r of', options: ['A position vector r of', 'Free fall is the motion', 'Horizontal projection is a special', 'Projectile motion with angular projection'] },
            { id: 's3', label: 'Horizontal projection is a special', prompt: 'Which idea is this? — Horizontal projection is a special case of projectile motion where an object is launched.', answer: 'Horizontal projection is a special', options: ['Horizontal projection is a special', 'Free fall is the motion', 'A position vector r of', 'Projectile motion with angular projection'] },
            { id: 's4', label: 'Projectile motion with angular projection', prompt: 'Which idea is this? — Projectile motion with angular projection (oblique projection) is the two-dimensional.', answer: 'Projectile motion with angular projection', options: ['Projectile motion with angular projection', 'Free fall is the motion', 'A position vector r of', 'Horizontal projection is a special'] },
            { id: 's5', label: 'The equation of trajectory of', prompt: 'Which idea is this? — The equation of trajectory of a projectile is the mathematical relationship between the.', answer: 'The equation of trajectory of', options: ['The equation of trajectory of', 'Free fall is the motion', 'A position vector r of', 'Horizontal projection is a special'] },
            { id: 's6', label: 'The maximum height H of', prompt: 'Which idea is this? — The maximum height (H) of a projectile is the highest vertical position reached above the.', answer: 'The maximum height H of', options: ['The maximum height H of', 'Free fall is the motion', 'A position vector r of', 'Horizontal projection is a special'] }
          ] } }
    ],
    explore: { component: C11_PhysicsProjectileMotionSim, prompt: 'Explore the interactive — Motion with Constant Acceleration: Free Fall' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_008', difficulty: 'standard',
          question: 'Free fall is the motion of an object under the influence of gravitational force.',
          hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s.',
          misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with.',
          parts: [
                { id: 'a', prompt: 'A ball is dropped from rest from a height of 20 m. What is the magnitude and direction of its acceleration at the instant it is released? State the SI unit.', answer: 'The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward',
                  options: ['The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward', 'upward', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' },
                { id: 'b', prompt: 'A student throws a ball vertically upward with initial speed 20 m/s. At the highest point of its motion, the ball\'s velocity is zero.', answer: 'No, acceleration is not zero',
                  options: ['No, acceleration is not zero', 'acceleration is zero', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' },
                { id: 'c', prompt: 'A stone is thrown vertically upward from the top of a 40 m high building with an initial velocity of 15 m/s.', answer: 'the maximum height reached above the ground, and (',
                  options: ['the maximum height reached above the ground, and (', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Revisit node c9_physics_ch3_4 (Newton\'s Second Law: F = ma) and explicitly derive \\( a = g \\) for free fall: \\(.', 'Perform a thought experiment: "If two identical 1 kg balls fall side by side, they accelerate at g.', 'Now glue them together mid-air – does the 2 kg combined ball suddenly accelerate faster?', 'No, because nothing changed physically." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with.',
          parts: [
                { id: 'a', prompt: 'A student solves a free-fall problem: "A ball is thrown upward at 25 m/s.', answer: 'The final answer (2.55 s) is numerically correct but the method is flawed',
                  options: ['The final answer (2.55 s) is numerically correct but the method is flawed', 'heavier objects fall faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Revisit node c9_physics_ch3_4 (Newton\'s Second Law: F = ma) and explicitly derive \\( a = g \\) for free fall: \\(.', 'Perform a thought experiment: "If two identical 1 kg balls fall side by side, they accelerate at g.', 'Now glue them together mid-air – does the 2 kg combined ball suddenly accelerate faster?', 'No, because nothing changed physically." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_009', difficulty: 'standard',
          question: 'A position vector **r** of a particle P in a plane is the vector drawn from a.',
          hint: 'If stuck, revisit c11_phy_cbse_03_001 (Scalars and Vectors) for unit vector notation and.',
          misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".',
          parts: [
                { id: 'a', prompt: 'A particle is located at point P(3, 4) in a coordinate system with origin O(0, 0).', answer: '**r** = 3**î** + 4**ĵ** m',
                  options: ['**r** = 3**î** + 4**ĵ** m', 'the distance travelled', 'the length of the path'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'b', prompt: 'A car moves from point A(2, 1) to point B(5, 5) on a flat field. The driver actually takes a winding path of length 8 m.', answer: '**Δr** = 3**î** + 4**ĵ** m',
                  options: ['**Δr** = 3**î** + 4**ĵ** m', 'the distance travelled', 'the length of the path'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'c', prompt: 'The position of a particle at time t = 2 s is **r**₁ = (4**î** + 3**ĵ**) m and at t = 5 s is **r**₂ = (10**î** − 2**ĵ**) m.', answer: '**Δr** = **r**₂ − **r**₁ = (10−4)**î** + (−2−3)**ĵ** = 6**î** − 5**ĵ** m',
                  options: ['**Δr** = **r**₂ − **r**₁ = (10−4)**î** + (−2−3)**ĵ** = 6**î** − 5**ĵ** m', 'the distance travelled', 'the length of the path'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' }
          ],
            remediations: { 'displacement-is-the-distance-travelled': { steps: ['Draw a coordinate grid on paper.', 'Mark start point O(0,0) and end point P(3,4).', 'Draw three different paths from O to P: a straight line, a right-angled path (3 right, 4 up), and a wavy curve.', 'Use a thread to measure each path length.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a particle moves in a circle of radius R and completes one full revolution, its displacement is 2πR." Evaluate this statement and correct.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' },
                { id: 'b', prompt: 'Design a simple experiment using a metre scale, a thread, and a few pins on a cardboard to demonstrate that displacement magnitude is always less than or equal.', answer: 'Fix pins at points A and B on cardboard',
                  options: ['Fix pins at points A and B on cardboard', 'the distance travelled', 'the length of the path', 'displacement is "the distance travelled" or "the length of the path"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think displacement is "the distance travelled" or "the length of the path".' }
          ],
            remediations: { 'displacement-is-the-distance-travelled': { steps: ['Draw a coordinate grid on paper.', 'Mark start point O(0,0) and end point P(3,4).', 'Draw three different paths from O to P: a straight line, a right-angled path (3 right, 4 up), and a wavy curve.', 'Use a thread to measure each path length.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_010', difficulty: 'standard',
          question: 'Horizontal projection is a special case of projectile motion where an object is.',
          hint: 'Review vector resolution (c11_phy_cbse_03_005) and 1D kinematic equations for free fall.',
          misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the.',
          parts: [
                { id: 'a', prompt: 'A stone is thrown horizontally with a speed of 10 m/s from a cliff 80 m high. What is the horizontal component of its velocity 2 seconds after projection?', answer: '10 m/s',
                  options: ['10 m/s', 'goes straight for a while then falls down', 'gravity affects horizontal motion or that horizontal velocity changes with time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' },
                { id: 'b', prompt: 'Why does a horizontally projected object follow a parabolic path even though its horizontal velocity is constant?', answer: 'The horizontal displacement x is proportional to time (x = v₀t), while vertical',
                  options: ['The horizontal displacement x is proportional to time (x = v₀t), while vertical', 'because gravity curves the path', 'goes straight for a while then falls down'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' },
                { id: 'c', prompt: 'A ball is thrown horizontally from a height of 45 m with a speed of 20 m/s.', answer: 'the time taken to reach the ground, (',
                  options: ['the time taken to reach the ground, (', 'goes straight for a while then falls down', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' }
          ],
            remediations: { 'a-horizontally-projected-object-goes': { steps: ['Use a "simultaneous drop" demo: Project a ball horizontally from a table while simultaneously dropping an identical.', 'Both hit the ground at the same time (audible).', 'Have the student video-record the motion and trace positions frame-by-frame on a transparent sheet overlay - they will.', 'Re-derive the equations emphasizing that x(t) and y(t) are evaluated at the SAME t.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the.',
          parts: [
                { id: 'a', prompt: 'A student solves a horizontal projection problem and writes: "Time of flight t = √(2h/g). Range R = v₀t. Then they calculate R = v₀√(2h/g).', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'goes straight for a while then falls down', 'a horizontally projected object "goes straight for a while then falls down" - i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a horizontally projected object "goes straight for a while then falls down" - i.e., the horizontal and vertical.' }
          ],
            remediations: { 'a-horizontally-projected-object-goes': { steps: ['Use a "simultaneous drop" demo: Project a ball horizontally from a table while simultaneously dropping an identical.', 'Both hit the ground at the same time (audible).', 'Have the student video-record the motion and trace positions frame-by-frame on a transparent sheet overlay - they will.', 'Re-derive the equations emphasizing that x(t) and y(t) are evaluated at the SAME t.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_011', difficulty: 'standard',
          question: 'Projectile motion with angular projection (oblique projection) is the.',
          hint: 'If stuck, review vector resolution (c11_phy_cbse_03_005) and the kinematic equations for.',
          misconception: 'Students often believe that the velocity vector at the maximum height is zero.',
          parts: [
                { id: 'a', prompt: 'State the horizontal and vertical components of initial velocity for a projectile launched with speed 25 m/s at 30° above horizontal.', answer: 'v₀ₓ = v₀ cos θ₀ = 25 cos 30° = 25 × (√3/2) = 21.65 m/s (horizontal)',
                  options: ['v₀ₓ = v₀ cos θ₀ = 25 cos 30° = 25 × (√3/2) = 21.65 m/s (horizontal)', 'vertical velocity is zero', 'total velocity is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' },
                { id: 'b', prompt: 'Explain why the horizontal velocity of a projectile remains constant throughout its flight while the vertical velocity changes.', answer: 'Horizontal velocity is constant',
                  options: ['Horizontal velocity is constant', 'horizontal velocity decreases due to gravity', 'vertical velocity is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' },
                { id: 'c', prompt: 'A stone is thrown from the top of a 45 m high cliff with an initial speed of 20 m/s at 30° above horizontal.', answer: 'Given: y₀ = 45 m, v₀ = 20 m/s, θ₀ = 30°, g = 10 m/s²',
                  options: ['Given: y₀ = 45 m, v₀ = 20 m/s, θ₀ = 30°, g = 10 m/s²', 'vertical velocity is zero', 'total velocity is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' }
          ],
            remediations: { 'the-velocity-vector-at-the': { steps: ['To fix the "zero velocity at top" misconception: (1) Draw velocity vectors at several points on the trajectory,.', '(2) Use a video of a ball thrown at an angle (or a simulation) and pause at the top; ask "Is the ball moving sideways?".', '(4) For acceleration: remind that a = dv/dt; even if vᵧ=0 instantaneously, it is changing from + to -, so aᵧ = -g ≠ 0.', 'Do a quick activity: toss a ball straight up; at the top v=0 but it still falls, proving a=g.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the velocity vector at the maximum height is zero.',
          parts: [
                { id: 'a', prompt: 'A student solves a projectile problem and gets a time of flight of 3.2 s for a ball launched at 20 m/s, 30° from ground level.', answer: 'Quick check: For ground-level launch, T = 2v₀ sinθ/g = 2×20×0.5/9.8 ≈ 2.04 s',
                  options: ['Quick check: For ground-level launch, T = 2v₀ sinθ/g = 2×20×0.5/9.8 ≈ 2.04 s', 'negative time means the projectile went backward in time', 'vertical velocity is zero', 'total velocity is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the velocity vector at the maximum height is zero.' }
          ],
            remediations: { 'the-velocity-vector-at-the': { steps: ['To fix the "zero velocity at top" misconception: (1) Draw velocity vectors at several points on the trajectory,.', '(2) Use a video of a ball thrown at an angle (or a simulation) and pause at the top; ask "Is the ball moving sideways?".', '(4) For acceleration: remind that a = dv/dt; even if vᵧ=0 instantaneously, it is changing from + to -, so aᵧ = -g ≠ 0.', 'Do a quick activity: toss a ball straight up; at the top v=0 but it still falls, proving a=g.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_012', difficulty: 'standard',
          question: 'The equation of trajectory of a projectile is the mathematical relationship.',
          hint: 'Revisit "Projectile Motion: Angular Projection" (c11_phy_cbse_03_011) and practice.',
          misconception: 'Students often believe the trajectory equation \\(y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}\\) gives the *entire*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The equation of trajectory of a projectile is the mathematical relationship between the',
                  options: ['The equation of trajectory of a projectile is the mathematical relationship between the', 'Free fall is the motion of an object under the influence of gravitational force only,', 'A position vector **r** of a particle P in a plane is the vector drawn from a chosen', 'Horizontal projection is a special case of projectile motion where an object is launched'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the trajectory equation \\(y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}\\) gives the *entire* flight path including.' }
          ],
            remediations: { 'the-trajectory-equation-y-x': { steps: ['Re-derive the equation from \\(x = u\\cos\\theta \\, t\\) and \\(y = u\\sin\\theta \\, t - \\frac{1}{2}gt^2\\) on paper,.', 'Identify the domain: \\(t \\geq 0 \\Rightarrow x \\geq 0\\); flight ends when \\(y=0 \\Rightarrow x = R\\).', 'Test the horizontal projection case (\\(\\theta=0\\)): \\(y = -\\frac{gx^2}{2u^2}\\) — verify it matches the known result for.', 'Solve a problem where you are given \\(x > R\\) and asked for \\(y\\) — explicitly state "the projectile has already.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_013', difficulty: 'standard',
          question: 'The maximum height (H) of a projectile is the highest vertical position reached.',
          hint: 'If stuck, revisit c11_phy_cbse_03_011 for velocity components and c11_phy_cbse_03_012 for.',
          misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including.',
          parts: [
                { id: 'a', prompt: 'Two projectiles are launched with the same initial speed u. Projectile A is launched at angle θ, and Projectile B at angle (90° - θ).', answer: 'Range formula R = (u² sin2θ)/g depends on sin2θ',
                  options: ['Correct answer: Range formula R = (u² sin2θ)/g depends on sin2θ', 'complementary angles give same range', 'heights are also equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including horizontal projection (θ =.' }
          ],
            remediations: { 'the-maximum-height-formula-h': { steps: ['Re-derive H from v_y² = u_y² - 2gy, setting v_y = 0 at max height. Note this assumes y=0 at launch.', 'For horizontal projection from height h, show that max height = h (since initial vertical velocity is zero and it only.', 'Derive range from cliff by solving y = -h = u sinθ t - ½gt² for t, then R = u cosθ × t.', 'Practice 3 problems: one level-ground, one from height, one horizontal from height, comparing formula applicability.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the launch speed, the maximum height becomes double, and the range also becomes double." Evaluate this claim using the formulas.', answer: 'Claim is FALSE',
                  options: ['Claim is FALSE', 'formulas are linear in u, not quadratic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including horizontal projection (θ =.' }
          ],
            remediations: { 'the-maximum-height-formula-h': { steps: ['Re-derive H from v_y² = u_y² - 2gy, setting v_y = 0 at max height. Note this assumes y=0 at launch.', 'For horizontal projection from height h, show that max height = h (since initial vertical velocity is zero and it only.', 'Derive range from cliff by solving y = -h = u sinθ t - ½gt² for t, then R = u cosθ × t.', 'Practice 3 problems: one level-ground, one from height, one horizontal from height, comparing formula applicability.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
