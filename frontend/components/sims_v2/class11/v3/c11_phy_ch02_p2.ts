import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch02_p2: SimDef = {
    id: 'v3_c11_phy_ch02_p2',
    title: 'Motion in a Straight Line · Part 2/2',
    subtitle: 'Learn why a round trip\'s velocity is zero while its speed never was.',
    classLevel: 11, subject: 'physics', topic: 'Motion in a Straight Line · Part 2/2',
    chapters: ['c11_phy_ch02'],
    nodeIds: ['c11_phy_cbse_02_007', 'c11_phy_cbse_02_008', 'c11_phy_cbse_02_009', 'c11_phy_cbse_02_010', 'c11_phy_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a race analyst splitting distance from displacement', intro: 'The Metro goes out 5 km and comes back 5 km — one quantity reports ten kilometres, the other reports zero.', goal: 'Distinguish path length from displacement and compute average speed by total distance over total time.' },
    discovery: {
        question: 'Walk 2 km at 4 km/h, then 2 km at 6 km/h — average speed is (4+6)/2 = 5 km/h?',
        options: ['No — equal distances mean more time is spent slow: total 4 km over 5/6 h gives 4.8 km/h', 'Yes — average speed is the mean of speeds', 'Yes — arithmetic mean always applies', 'No — the answer is 6 km/h'],
        answer: 'No — equal distances mean more time is spent slow: total 4 km over 5/6 h gives 4.8 km/h',
        hook: 'And a round trip has zero average velocity but positive average speed — displacement and path length are not the same animal.',
    },
    teaching: [
        { title: 'Relative Velocity: Concept and Formula', text: 'Relative velocity is the vector velocity of an object A as measured from the reference frame of another moving object B, mathematically defined as **v_AB = v_A – v_B** where v_A and v_B are the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_02_007', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'For a cyclist going −10 m → +20 m → −5 m, compute path length (55 m), displacement (+5 m) and see how far apart they sit.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_007', title: 'Relative Velocity: Concept and Formula',
          scaffold: { problem: 'A train A of length 200 m moves at 72 km/h. Another train B of length 300 m moves on a parallel track in the opposite direction at 54 km/h.',
            steps: [
            { text: 'Identify given quantities with units. Length of A = 200 m, length of B = 300 m.' },
            { text: 'Convert all speeds to SI units (m/s). v_A = 72 × (5/18) = 20 m/s. v_B = 54 × (5/18) = 15 m/s.' },
            { text: 'Apply relative velocity formula. v_AB = v_A – v_B = 20 – (–15) = +35 m/s. Magnitude = 35 m/s.' },
            { text: 'Total distance to be covered for complete crossing = sum of lengths = 200 + 300 = 500 m.' },
            { text: 'Time = total distance / relative speed = 500 m / 35 m/s = 100/7 ≈ 14.29 s.' },
            { text: 'Verify physical reasonableness. At 35 m/s (≈126 km/h), 500 m takes ~14 s — plausible for trains. Units: m / (m/s) = s ✓.', faded: true, blankAnswer: '14.3 s (or 100/7 s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_008', title: 'Motion with Constant Acceleration: Free Fall',
          scaffold: { problem: 'A cricket ball is thrown vertically upward from a balcony 12 m above the ground with an initial speed of 18 m/s.',
            steps: [
            { text: 'Identify given quantities: initial height y₀ = 12 m, initial velocity u = +18 m/s, acceleration a = -g = -10 m/s².' },
            { text: 'For (a) maximum height, use v² = u² + 2a(y - y₀) with v = 0 at top. Substitute: 0 = (18)² + 2(-10)(y_max - 12).' },
            { text: 'Solve for y_max: 0 = 324 - 20(y_max - 12) → 20(y_max - 12) = 324 → y_max - 12 = 16.2 → y_max = 28.2 m above ground.' },
            { text: 'For (b) time to max height, use v = u + at with v = 0: 0 = 18 + (-10)t_up → t_up = 1.8 s.' },
            { text: 'For (c) velocity at ground, use v² = u² + 2a(y - y₀) with y = 0 (ground level): v² = (18)² + 2(-10)(0 - 12) = 324 + 240.' },
            { text: 'v = -√564 ≈ -23.75 m/s (negative sign indicates downward direction).', faded: true, blankAnswer: '(a) 28.2 m above ground, (b) 1.8 s, (c) 23.75 m/s downward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_009', title: 'Stopping Distance of a Vehicle',
          scaffold: { problem: 'A car is travelling at 90 km/h on a highway. The driver applies brakes producing a constant deceleration of 6 m/s².',
            steps: [
            { text: 'Convert initial velocity to SI units: v₀ = 90 km/h = 90 × (1000 m / 3600 s) = 25 m/s.' },
            { text: 'Identify the appropriate formula for stopping distance: ds = v₀²/(2a).' },
            { text: 'Substitute values with units: ds = (25 m/s)² / (2 × 6 m/s²) = 625 m²/s² / 12 m/s².' },
            { text: 'Compute and track units: 625/12 = 52.083... m. Unit analysis: (m²/s²) ÷ (m/s²) = m ✓. Stopping distance ≈ 52.1 m.' },
            { text: 'Find stopping time using v = u + at: 0 = 25 + (-6)t → t = 25/6 = 4.17 s.', faded: true, blankAnswer: 'Stopping distance = 52.1 m, Stopping time = 4.17 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_010', title: 'Reaction Time and Braking Distance',
          scaffold: { problem: 'A car is moving at 72 km/h on a straight highway. The driver\'s reaction time is 0.4 s.',
            steps: [
            { text: 'Convert initial speed to SI units: v₀ = 72 km/h = 72 × (1000/3600) = 20 m/s.' },
            { text: 'Identify given quantities: tᵣ = 0.4 s, a = 5 m/s² (magnitude of deceleration), v₀ = 20 m/s.' },
            { text: 'Calculate reaction distance using constant velocity formula: d_react = v₀ × tᵣ = 20 m/s × 0.4 s = 8 m.' },
            { text: 'Calculate braking distance using v² = u² + 2as with v = 0, u = v₀, a = -5 m/s²: 0 = 20² + 2(-5)d_brake → d_brake.' },
            { text: 'Total stopping distance = d_react + d_brake = 8 m + 40 m = 48 m.' },
            { text: 'Verify reasonableness: At 20 m/s (72 km/h), 48 m stopping distance is realistic for a car (typical 40–50 m).', faded: true, blankAnswer: '(a) 8 m, (b) 40 m, (c) 48 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_011', title: 'Word Problems: Motion in Straight Line',
          scaffold: { problem: 'A car traveling at 90 km/h on the Yamuna Expressway sees a stationary truck 200 m ahead.',
            steps: [
            { text: 'Convert all units to SI. u = 90 km/h = 90 × (5/18) = 25 m/s. Reaction time t_r = 0.5 s.' },
            { text: 'Choose coordinate system. Let direction of car\'s motion be +x axis. Origin at car\'s position when driver sees truck.' },
            { text: 'Analyze motion in two phases. Phase 1 (reaction): constant velocity u = 25 m/s for t_r = 0.5 s.' },
            { text: 'Phase 2 (braking): initial velocity u₂ = 25 m/s, final velocity v = 0 (stops), a = -5 m/s².' },
            { text: 'Total stopping distance = s₁ + s₂ = 12.5 + 62.5 = 75 m. Since 75 m < 200 m, car stops before hitting truck.' },
            { text: 'Verify physical reasonableness: 75 m stopping distance from 90 km/h with 5 m/s² deceleration is realistic (typical car.', faded: true, blankAnswer: 'No, the car does not hit the truck. It stops 125 m before.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a metro round trip — 5 km out, 5 km back — a student reports \'displacement 10 km, average speed equals average velocity.\' For a walk-and-run-back errand (1 m/s out, 2 m/s back) he computes average speed as (1+2)/2 = 1.5 m/s.',
            decisions: [{ prompt: 'Which kinematic quantities did he scramble?', options: [
                { text: 'Split scalar from vector properly: displacement is x_final − x_initial = 0 for the round trip (it can be negative too — moving +5 to −3 gives −8 m, not 8). Average speed uses total path length: the errand\'s true value is 1000/(500+250) = 1.33 m/s — you can\'t average speeds like marks unless times are equal. Round trips prove the split: zero average velocity, positive average speed.', outcome: 'He adopts the definitions: speed is path over time, velocity is displacement over time — and they diverge exactly when direction reverses.' },
                { text: 'Accept 10 km displacement — the auto travelled 10 km of road.', outcome: 'That\'s path length: displacement only measures net position change with sign — start and end coincide, so it\'s zero.', reveals: 'distance-equals-displacement' },
                { text: 'Keep 1.5 m/s — averaging the two speeds is the natural calculation.', outcome: 'Speeds can only be averaged when time intervals match; here equal distances differ in time — total distance over total time gives 1.33 m/s.', reveals: 'average-speed-is-mean-of-speeds' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'The arithmetic mean only works when the clock ticks equally — average by time, not by speed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_007', difficulty: 'standard',
          question: 'Relative velocity is the vector velocity of an object A as measured from the.',
          hint: 'Revisit c11_phy_cbse_02_003 (Instantaneous Velocity and Speed) and practice drawing.',
          misconception: '**Students treat relative velocity as relative speed (scalar subtraction of magnitudes) and ignore vector direction.**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Relative velocity is the vector velocity of an object A as measured from the reference',
                  options: ['Relative velocity is the vector velocity of an object A as measured from the reference', 'Position is the location of a point object specified by its coordinate (x) on a chosen', 'Average velocity is the ratio of net displacement (Δx) to the time interval (Δt) during', 'Instantaneous velocity is the rate of change of position with respect to time at a'],
                  hint: 'Revisit c11_phy_cbse_02_003 (Instantaneous Velocity and Speed) and practice drawing velocity.',
                  misconception: '**Students treat relative velocity as relative speed (scalar subtraction of magnitudes) and ignore vector direction.** Specifically: (1).' }
          ],
            remediations: { 'students-treat-relative-velocity-as': { steps: ['**Step-by-step remediation:** 1.', '**Draw the coordinate axis first.** On paper, draw x-axis (horizontal) and y-axis (vertical).', 'Label +x and +y directions.', '**Write velocity vectors in component form.** For every object, write v = v_x î + v_y ĵ with correct signs.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_008', difficulty: 'standard',
          question: 'Free fall is the motion of an object under the influence of gravitational force.',
          hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s.',
          misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with.',
          parts: [
                { id: 'a', prompt: 'A ball is dropped from rest from a height of 20 m. What is the magnitude and direction of its acceleration at the instant it is released? State the SI unit.', answer: 'The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward',
                  options: ['The acceleration is \\( 9.8 \\, \\text{m/s}^2 \\) vertically downward', 'upward', 'heavier objects fall faster', 'acceleration requires initial motion'],
                  hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s Second.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' },
                { id: 'b', prompt: 'A student throws a ball vertically upward with initial speed 20 m/s. At the highest point of its motion, the ball\'s velocity is zero.', answer: 'No, acceleration is not zero',
                  options: ['No, acceleration is not zero', 'acceleration is zero', 'heavier objects fall faster'],
                  hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s Second.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' },
                { id: 'c', prompt: 'A stone is thrown vertically upward from the top of a 40 m high building with an initial velocity of 15 m/s.', answer: 'the maximum height reached above the ground, and (',
                  options: ['the maximum height reached above the ground, and (', 'heavier objects fall faster'],
                  hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s Second.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Revisit node c9_physics_ch3_4 (Newton\'s Second Law: F = ma) and explicitly derive \\( a = g \\) for free fall: \\.', 'Perform a thought experiment: "If two identical 1 kg balls fall side by side, they accelerate at g.', 'Now glue them together mid-air – does the 2 kg combined ball suddenly accelerate faster?', 'No, because nothing changed physically." 3.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with.',
          parts: [
                { id: 'a', prompt: 'A student solves a free-fall problem: "A ball is thrown upward at 25 m/s.', answer: 'The final answer (2.55 s) is numerically correct but the method is flawed',
                  options: ['The final answer (2.55 s) is numerically correct but the method is flawed', 'heavier objects fall faster'],
                  hint: 'If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton\'s Second.',
                  misconception: 'Students believe that "heavier objects fall faster" because they confuse gravitational force (\\( mg \\)) with acceleration (\\( g \\)).' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Revisit node c9_physics_ch3_4 (Newton\'s Second Law: F = ma) and explicitly derive \\( a = g \\) for free fall: \\.', 'Perform a thought experiment: "If two identical 1 kg balls fall side by side, they accelerate at g.', 'Now glue them together mid-air – does the 2 kg combined ball suddenly accelerate faster?', 'No, because nothing changed physically." 3.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_009', difficulty: 'standard',
          question: 'Stopping distance is the total displacement of a vehicle from the instant the.',
          hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations for Uniformly Accelerated Motion) and.',
          misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the.',
          parts: [
                { id: 'a', prompt: 'A car travelling at 20 m/s stops in 40 m with constant deceleration.', answer: 'Stopping distance at 40 m/s = 160 m',
                  options: ['Stopping distance at 40 m/s = 160 m', 'twice the speed means twice the distance to stop'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations for Uniformly Accelerated Motion) and practice.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' },
                { id: 'b', prompt: 'A motorcycle moving at 72 km/h applies brakes producing a deceleration of 5 m/s². Calculate the stopping distance in metres. Show all unit conversions.', answer: 'Step 1: Convert 72 km/h to m/s: 72 × (1000/3600) = 20 m/s',
                  options: ['Step 1: Convert 72 km/h to m/s: 72 × (1000/3600) = 20 m/s', 'twice the speed means twice the distance to stop'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations for Uniformly Accelerated Motion) and practice.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' },
                { id: 'c', prompt: 'Two identical cars have the same deceleration capability. Car A travels at 50 km/h, Car B at 100 km/h. Compare their stopping distances.', answer: 'Car B needs 60 m (4 × 15 m)',
                  options: ['Car B needs 60 m (4 × 15 m)', 'twice the speed means twice the distance to stop'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations for Uniformly Accelerated Motion) and practice.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' }
          ],
            remediations: { 'stopping-distance-is-directly-proportional': { steps: ['Re-derive v² = u² + 2as from v = u + at and s = ut + ½at² by eliminating t.', 'Set v = 0, u = v₀, a = -a (deceleration), s = ds to get 0 = v₀² - 2a·ds.', 'Solve for ds = v₀²/(2a). Note the v₀² term.', 'Make a table: v₀ = 10, 20, 30 m/s with a = 5 m/s². Calculate ds = 10, 40, 90 m. Observe ratio 1:4:9 = 1²:2²:3².'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_010', difficulty: 'standard',
          question: 'Reaction time is the time interval between a stimulus (e.g., seeing.',
          hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations) and c11_phy_cbse_02_009 (Stopping.',
          misconception: 'Students believe "reaction distance" and "braking distance" are interchangeable terms for stopping distance, and that.',
          parts: [
                { id: 'a', prompt: 'A car travels at 20 m/s. The driver\'s reaction time is 0.5 s. What is the reaction distance traveled before brakes are applied?', answer: '10 m',
                  options: ['10 m', 'reaction distance', 'braking distance'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations) and c11_phy_cbse_02_009 (Stopping Distance).',
                  misconception: 'Students believe "reaction distance" and "braking distance" are interchangeable terms for stopping distance, and that both scale linearly.' },
                { id: 'b', prompt: 'A scooter moving at 15 m/s decelerates at 3 m/s² after a reaction time of 0.6 s. Calculate the total stopping distance.', answer: 'Step 1: Reaction distance = v₀tᵣ = 15 × 0.6 = 9 m',
                  options: ['Step 1: Reaction distance = v₀tᵣ = 15 × 0.6 = 9 m', 'reaction distance', 'braking distance'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations) and c11_phy_cbse_02_009 (Stopping Distance).',
                  misconception: 'Students believe "reaction distance" and "braking distance" are interchangeable terms for stopping distance, and that both scale linearly.' },
                { id: 'c', prompt: 'Two identical cars have the same deceleration. Car A travels at 30 km/h, Car B at 60 km/h.', answer: 'Convert speeds: 30 km/h = 8.33 m/s, 60 km/h = 16.67 m/s',
                  options: ['Convert speeds: 30 km/h = 8.33 m/s, 60 km/h = 16.67 m/s', 'reaction distance', 'braking distance'],
                  hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations) and c11_phy_cbse_02_009 (Stopping Distance).',
                  misconception: 'Students believe "reaction distance" and "braking distance" are interchangeable terms for stopping distance, and that both scale linearly.' }
          ],
            remediations: { 'reaction-distance-and-braking-distance': { steps: ['Re-derive braking distance from v² = u² + 2as with v = 0, u = v₀, a = -a → s_brake = v₀²/(2a).', 'Write reaction distance s_react = v₀tᵣ (constant velocity).', 'Create a table: v₀ (m/s) | s_react (m) | s_brake (m) | total (m) for v₀ = 5, 10, 15, 20 with tᵣ = 0.5 s, a = 5 m/s².', 'Plot total vs v₀ — observe quadratic curvature.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_011', difficulty: 'standard',
          question: 'Word problems in motion in a straight line are structured physics questions.',
          hint: 'If stuck on equation selection: write down the 4 variables (u, v, a, t, s) — which 3 are.',
          misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing.',
          parts: [
                { id: 'a', prompt: 'A ball is thrown vertically upward with an initial speed of 20 m/s.', answer: '0 m/s',
                  options: ['0 m/s', 'momentarily at rest', 'a car decelerates at 5 m/s²'],
                  hint: 'If stuck on equation selection: write down the 4 variables (u, v, a, t, s) — which 3 are.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' },
                { id: 'b', prompt: 'A car moving at 72 km/h applies brakes and stops in 50 m. A student writes: "u = 72 km/h, v = 0, s = 50 m, find a using v² = u² + 2as" and gets a = -51.84.', answer: 'The student forgot to convert 72 km/h to m/s (72 × 5/18 = 20 m/s)',
                  options: ['The student forgot to convert 72 km/h to m/s (72 × 5/18 = 20 m/s)', 'a car decelerates at 5 m/s²'],
                  hint: 'If stuck on equation selection: write down the 4 variables (u, v, a, t, s) — which 3 are.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' },
                { id: 'c', prompt: 'A stone is dropped from a bridge 45 m above a river. Taking g = 10 m/s² and downward as positive, calculate the time taken to hit the water and the velocity.', answer: 'Given: u = 0 m/s (dropped), s = +45 m, a = +10 m/s²',
                  options: ['Given: u = 0 m/s (dropped), s = +45 m, a = +10 m/s²', 'a car decelerates at 5 m/s²'],
                  hint: 'If stuck on equation selection: write down the 4 variables (u, v, a, t, s) — which 3 are.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' }
          ],
            remediations: { 'students-treat-deceleration-as-a': { steps: ['Draw the motion diagram with a clear +ve arrow.', 'Write "Let +ve direction be [direction of initial motion / east / upward]".', 'For each quantity (u, v, a, s), write its sign based on this choice.', 'Say aloud: "Velocity is +20 m/s, speed is decreasing, so acceleration opposes velocity → a is negative."'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
