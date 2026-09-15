import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch03_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch03_p3: SimDef = {
    id: 'v3_c11_phy_ch03_p3',
    title: 'Motion in a Plane',
    subtitle: 'Two dimensions change everything — projectiles, vectors, and why the fastest path isn\'t a straight line.',
    classLevel: 11, subject: 'physics', topic: 'Motion in a Plane · Part 3/3',
    chapters: ['c11_phy_ch03'],
    nodeIds: ['c11_phy_cbse_03_013', 'c11_phy_cbse_03_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a basketball physicist perfecting a three-pointer', intro: 'The shot leaves your hands at 45°. Your job: find the launch angle that maximises range — and explain why it isn\'t 90°.', goal: 'Resolve vectors, predict projectile paths, and understand why horizontal and vertical motion are independent.' },
    discovery: {
        question: 'A ball thrown straight up from a moving truck lands... where? Most people say \'behind the truck\' — what does physics say?',
        options: ['Back in your hand — it keeps the truck\'s horizontal speed', 'Behind the truck', 'Straight down where it was thrown', 'It depends on the wind'],
        answer: 'Back in your hand — it keeps the truck\'s horizontal speed',
        hook: 'The ball never forgets it was moving with you. Horizontal and vertical motion are separate stories told at the same time.',
    },
    teaching: [
        { title: 'Maximum Height and Range of Projectile', text: 'The maximum height (H) of a projectile is the highest vertical position reached above the launch point, given by H = (u² sin²θ)/(2g), where u is the initial speed, θ is the projection angle with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_03_013', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the projectile lab: launch at 30°, 45°, 60° — measure range and air time, and find the angle that wins.',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_013', title: 'Maximum Height and Range of Projectile',
          scaffold: { problem: 'A football is kicked from ground level with an initial speed of 25 m/s at an angle of 30° with the horizontal.',
            steps: [
            { text: 'Identify given quantities: u = 25 m/s, θ = 30°, g = 10 m/s². sin30° = 0.5, cos30° = √3/2 ≈ 0.866.' },
            { text: 'Select formulas: H = (u² sin²θ)/(2g), t_m = u sinθ/g, R = (u² sin2θ)/g, T = 2u sinθ/g.' },
            { text: 'Compute sin²θ = (0.5)² = 0.25. sin2θ = sin60° = √3/2 ≈ 0.866.' },
            { text: 'Substitute: H = (625 × 0.25)/20 = 156.25/20 = 7.8125 m. t_m = (25 × 0.5)/10 = 12.5/10 = 1.25 s.' },
            { text: 'Verify: T = 2t_m ✓ (2.5 = 2×1.25). Range is positive and reasonable for a football kick. H < R for θ < 45° ✓.', faded: true, blankAnswer: '(a) H = 7.81 m, (b) t_m = 1.25 s, (c) R = 54.1 m, (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_03_014', title: 'Uniform Circular Motion: Centripetal Acceleration',
          scaffold: { problem: 'A ceiling fan blade of length 0.6 m rotates at 1200 revolutions per minute (rpm).',
            steps: [
            { text: 'Identify given quantities: radius \\(R = 0.6\\ \\text{m}\\) (blade length), frequency \\(\\nu = 1200\\ \\text{rpm}.' },
            { text: 'Choose formula linking \\(a_c\\) to frequency and radius: \\(a_c = 4\\pi^2 \\nu^2 R\\).' },
            { text: 'Substitute values with units: \\(a_c = 4 \\times (3.1416)^2 \\times (20)^2 \\times 0.6\\ \\text{m/s}^2\\).' },
            { text: 'Compute stepwise: \\(\\pi^2 \\approx 9.87\\); \\(4\\pi^2 \\approx 39.48\\); \\(\\nu^2 = 400\\); \\(39.48 \\times 400 = 15792\\).' },
            { text: 'Convert to \\(g\\)\'s: \\(\\frac{9475.2}{9.8} \\approx 967\\ g\\).' },
            { text: 'Check reasonableness: Fan tips experience huge acceleration (hundreds of g), consistent with high rpm.', faded: true, blankAnswer: '\\(a_c \\approx 9.5 \\times 10^3\\ \\text{m/s}^2\\) (or \\(9475\\.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate classifying quantities says: \'Velocity is a scalar — it\'s written as a number with m/s. And for adding two forces, the triangle method and parallelogram method give different resultants — my two drawings came out different lengths.\'',
            decisions: [{ prompt: 'What\'s wrong on both counts?', options: [
                { text: 'Correct the test and the geometry: units don\'t decide scalar vs vector — direction does; velocity needs magnitude AND direction (a ceiling-fan blade keeps constant speed but changing velocity). And the two methods are identical geometry — the triangle is half the parallelogram; sliding a vector parallel to itself doesn\'t change it, so different-looking results mean drawing error, not different answers.', outcome: 'He applies the real test — does it need direction and add by the triangle law — and stops treating construction error as a physics result.' },
                { text: 'Agree velocity is scalar — only a number and unit appear when we write \'5 m/s\'.', outcome: 'The printed magnitude hides the attribute: \'5 m/s\' is incomplete without \'east\' or \'30° to horizontal\' — direction is inseparable from the vector.', reveals: 'units-imply-scalar' },
                { text: 'Accept the two resultants — different constructions can legitimately give different answers.', outcome: 'Both methods encode the same head-to-tail addition: the parallelogram\'s diagonal IS the triangle\'s closing side — equivalence is exact, not approximate.', reveals: 'methods-give-different-resultants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_03_014', title: 'You made it',
          caseStudy: { intro: 'Every cricket throw, every long jump, every water fountain is the same two independent motions — you can now see them separately.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_013', difficulty: 'standard',
          question: 'The maximum height (H) of a projectile is the highest vertical position reached.',
          hint: 'If stuck, revisit c11_phy_cbse_03_011 for velocity components and c11_phy_cbse_03_012 for.',
          misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including.',
          parts: [
                { id: 'a', prompt: 'Two projectiles are launched with the same initial speed u. Projectile A is launched at angle θ, and Projectile B at angle (90° - θ).', answer: 'Correct answer: Range formula R = (u² sin2θ)/g depends on sin2θ',
                  options: ['Correct answer: Range formula R = (u² sin2θ)/g depends on sin2θ', 'complementary angles give same range', 'heights are also equal'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_011 for velocity components and c11_phy_cbse_03_012 for the.',
                  misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including horizontal projection (θ.' }
          ],
            remediations: { 'the-maximum-height-formula-h': { steps: ['Re-derive H from v_y² = u_y² - 2gy, setting v_y = 0 at max height. Note this assumes y=0 at launch.', 'For horizontal projection from height h, show that max height = h (since initial vertical velocity is zero and it only.', 'Derive range from cliff by solving y = -h = u sinθ t - ½gt² for t, then R = u cosθ × t.', 'Practice 3 problems: one level-ground, one from height, one horizontal from height, comparing formula applicability.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the launch speed, the maximum height becomes double, and the range also becomes double." Evaluate this claim using the formulas.', answer: 'Claim is FALSE',
                  options: ['Claim is FALSE', 'formulas are linear in u, not quadratic'],
                  hint: 'If stuck, revisit c11_phy_cbse_03_011 for velocity components and c11_phy_cbse_03_012 for the.',
                  misconception: 'Students believe the maximum height formula H = (u² sin²θ)/(2g) can be used for any projection angle including horizontal projection (θ.' }
          ],
            remediations: { 'the-maximum-height-formula-h': { steps: ['Re-derive H from v_y² = u_y² - 2gy, setting v_y = 0 at max height. Note this assumes y=0 at launch.', 'For horizontal projection from height h, show that max height = h (since initial vertical velocity is zero and it only.', 'Derive range from cliff by solving y = -h = u sinθ t - ½gt² for t, then R = u cosθ × t.', 'Practice 3 problems: one level-ground, one from height, one horizontal from height, comparing formula applicability.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_03_014', difficulty: 'standard',
          question: 'Centripetal acceleration is the acceleration experienced by an object moving.',
          hint: 'If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for.',
          misconception: 'Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.',
          parts: [
                { id: 'a', prompt: 'State the formula for centripetal acceleration in terms of linear speed \\(v\\) and radius \\(R\\), and give its SI unit.', answer: '\\(a_c = \\frac{v^2}{R}\\)',
                  options: ['\\(a_c = \\frac{v^2}{R}\\)', 'constant speed', 'constant velocity'],
                  hint: 'If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for finding.',
                  misconception: 'Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.' },
                { id: 'b', prompt: 'In uniform circular motion, the speed is constant. Why is there still an acceleration? Explain using the vector nature of velocity.', answer: 'Velocity is a vector',
                  options: ['Velocity is a vector', 'no acceleration because speed is constant', 'constant speed', 'constant velocity'],
                  hint: 'If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for finding.',
                  misconception: 'Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.' },
                { id: 'c', prompt: 'A particle moves in a circle of radius 0.5 m with a constant speed of 4 m/s. Calculate its centripetal acceleration and angular speed.', answer: 'Given: \\(R = 0.5\\ \\text{m}\\), \\(v = 4\\ \\text{m/s}\\)',
                  options: ['Given: \\(R = 0.5\\ \\text{m}\\), \\(v = 4\\ \\text{m/s}\\)', 'constant speed', 'constant velocity'],
                  hint: 'If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for finding.',
                  misconception: 'Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.' },
                { id: 'd', prompt: 'Two particles A and B move in uniform circular motion. Particle A has radius \\(R\\) and speed \\(v\\). Particle B has radius \\(2R\\) and speed \\(2v\\).', answer: '\\(a_{c,A} = \\frac{v^2}{R}\\)',
                  options: ['\\(a_{c,A} = \\frac{v^2}{R}\\)', 'four times', 'constant speed', 'constant velocity'],
                  hint: 'If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for finding.',
                  misconception: 'Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.' }
          ],
            remediations: { 'because-the-speed-is-constant': { steps: ['Revisit the definition of acceleration as \\(\\vec{a} = \\frac{d\\vec{v}}{dt}\\) (from c11_phy_cbse_03_009).', 'Draw velocity vectors at three points on a circle and perform vector subtraction \\(\\vec{v}_2 - \\vec{v}_1\\) graphically.', 'Use a simple simulation (e.g., PhET "Ladybug Revolution") to visualise velocity and acceleration vectors in real time.', 'Practice deriving \\(a_c = v^2/R\\) from similar triangles until the geometric reasoning is clear.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
