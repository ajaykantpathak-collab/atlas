import type { SimDef } from '../../engine/types';
import C11_PhysicsStraightLineMotionSim from '../../../simulations/three/C11_PhysicsStraightLineMotionSim';

/** v3 wrapped master — C11_PhysicsStraightLineMotionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsstraightlinemotionsim: SimDef = {
    id: 'v3w_c11_physicsstraightlinemotionsim',
    title: 'Straight Line Motion',
    subtitle: 'This node covers: definition of position coordinate, path length, and displacement for.',
    classLevel: 11, subject: 'physics', topic: 'Position, Path Length and Displacement',
    chapters: [],
    nodeIds: ['c11_phy_cbse_02_001', 'c11_phy_cbse_02_005', 'c11_phy_cbse_02_009', 'c11_phy_cbse_02_011', 'c11_phy_cbse_04_001', 'c11_phy_cbse_04_002', 'c11_phy_cbse_04_007', 'c11_phy_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe an auto-rickshaw moving on a straight Delhi road from Connaught Place (origin) towards India Gate.', goal: 'Master Straight Line Motion.' },
    discovery: {
        question: 'A ball is thrown vertically upward with initial speed 20 m/s. At the highest point of its motion, what are the values of velocity and acceleration?',
        options: ['At the highest point: velocity v = 0 m/s', 'momentarily at rest', 'no net force'],
        answer: 'At the highest point: velocity v = 0 m/s',
        hook: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid.',
    },
    teaching: [
        { title: 'Position is the location of a point object.', text: 'Position is the location of a point object specified by its coordinate (x) on a chosen axis with respect to a fixed origin, where positions to the right of the origin are positive and to the left are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_001', title: 'Position is the location of a point.',
          scaffold: { problem: 'A delivery scooter starts from a warehouse (chosen as origin x = 0 km on a straight highway, positive direction towards the city).',
            steps: [
            { text: 'Identify given quantities with units. Segment 1: Δx₁ = +12 km (towards city = +x).' },
            { text: 'Identify formulas. Final position x_f = x_i + ΣΔx_i. Path length s = Σ|Δx_i|. Displacement Δx = x_f − x_i.' },
            { text: 'Compute final position. x_f = 0 + (+12) + (−5) + (+8) = +15 km.' },
            { text: 'Compute path length. s = |+12| + |−5| + |+8| = 12 + 5 + 8 = 25 km.' },
            { text: 'Compute displacement. Δx = x_f − x_i = (+15 km) − (0 km) = +15 km.' },
            { text: 'Compute magnitude of displacement. |Δx| = |+15 km| = 15 km.' },
            { text: 'Verify physical reasonableness. Path length (25 km) > |displacement| (15 km) because direction reversed once.', faded: true, blankAnswer: '(a) Final position = +15 km, (b) Path length = 25 km, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_005', title: 'Kinematic equations for uniformly.',
          scaffold: { problem: 'A motorcyclist on a straight highway passes a kilometre stone at 72 km/h and accelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Convert all given quantities to SI units. v₀ = 72 km/h = 72 × (5/18) = 20 m/s. a = 2 m/s². t = 10 s.' },
            { text: 'Identify the appropriate kinematic equation for each part. (a) needs v, given v₀, a, t → use v = v₀ + at.' },
            { text: 'Substitute values with units. (a) v = 20 m/s + (2 m/s²)(10 s) = 20 + 20 = 40 m/s.' },
            { text: 'Verify unit consistency. (a) m/s + (m/s²)(s) = m/s ✓. (b) (m/s)(s) + (m/s²)(s²) = m + m = m ✓.' },
            { text: 'Check physical reasonableness. Velocity increases from 20 to 40 m/s (144 km/h) in 10 s — plausible for a motorcycle.', faded: true, blankAnswer: '(a) 40 m/s (144 km/h); (b) 300 m; (c) 49.0 m/s (176 km/h)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_009', title: 'Stopping distance is the total.',
          scaffold: { problem: 'A car is travelling at 90 km/h on a highway. The driver applies brakes producing a constant deceleration of 6 m/s².',
            steps: [
            { text: 'Convert initial velocity to SI units: v₀ = 90 km/h = 90 × (1000 m / 3600 s) = 25 m/s.' },
            { text: 'Identify the appropriate formula for stopping distance: ds = v₀²/(2a).' },
            { text: 'Substitute values with units: ds = (25 m/s)² / (2 × 6 m/s²) = 625 m²/s² / 12 m/s².' },
            { text: 'Compute and track units: 625/12 = 52.083... m. Unit analysis: (m²/s²) ÷ (m/s²) = m ✓. Stopping distance ≈ 52.1 m.' },
            { text: 'Find stopping time using v = u + at: 0 = 25 + (-6)t → t = 25/6 = 4.17 s.', faded: true, blankAnswer: 'Stopping distance = 52.1 m, Stopping time = 4.17 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_011', title: 'Word problems in motion in a straight.',
          scaffold: { problem: 'A car traveling at 90 km/h on the Yamuna Expressway sees a stationary truck 200 m ahead.',
            steps: [
            { text: 'Convert all units to SI. u = 90 km/h = 90 × (5/18) = 25 m/s. Reaction time t_r = 0.5 s.' },
            { text: 'Choose coordinate system. Let direction of car\'s motion be +x axis. Origin at car\'s position when driver sees truck.' },
            { text: 'Analyze motion in two phases. Phase 1 (reaction): constant velocity u = 25 m/s for t_r = 0.5 s.' },
            { text: 'Phase 2 (braking): initial velocity u₂ = 25 m/s, final velocity v = 0 (stops), a = -5 m/s².' },
            { text: 'Total stopping distance = s₁ + s₂ = 12.5 + 62.5 = 75 m. Since 75 m < 200 m, car stops before hitting truck.' },
            { text: 'Verify physical reasonableness: 75 m stopping distance from 90 km/h with 5 m/s² deceleration is realistic (typical car.', faded: true, blankAnswer: 'No, the car does not hit the truck. It stops 125 m before.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_001', title: 'Aristotle\'s fallacy is the incorrect.',
          scaffold: { problem: 'A 2 kg block is pushed across a horizontal table with a constant force of 10 N. The block moves at a constant velocity of 0.5 m/s.',
            steps: [
            { text: 'Identify given: m = 2 kg, F_push = 10 N, v = 0.5 m/s (constant).' },
            { text: 'Forces in horizontal direction: F_push (forward) and friction f (backward). F_net = F_push - f = 0 → f = F_push = 10 N.' },
            { text: 'When push is removed, only friction acts horizontally. F_net = -f = -10 N.' },
            { text: 'Distance to stop: v² = u² + 2as → 0 = (0.5)² + 2(-5)s → s = 0.25 / 10 = 0.025 m = 2.5 cm.' },
            { text: 'Check units: N/kg = m/s² ✓; v²/(2a) → (m²/s²)/(m/s²) = m ✓. Answer is physically reasonable (small distance due to.', faded: true, blankAnswer: '(a) Friction force = 10 N (opposite to motion). (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_002', title: 'Newton\'s First Law of Motion (Law of.',
          scaffold: { problem: 'A 15 kg suitcase rests on the horizontal floor of a train compartment. The train accelerates horizontally at 2 m/s².',
            steps: [
            { text: 'Identify the system (suitcase) and given quantities: m = 15 kg, a_train = 2 m/s² forward, no slipping ⇒ a_suitcase = 2.' },
            { text: 'Since the suitcase accelerates with the train, it is NOT in equilibrium in the horizontal direction.' },
            { text: 'Vertical equilibrium: N - mg = 0 ⇒ N = mg = 15 × 10 = 150 N. Maximum static friction f_s,max = μ_s N, but μ_s not given.' },
            { text: 'Horizontal: Only horizontal force is static friction f_s (forward). So f_s = m a = 15 kg × 2 m/s² = 30 N forward.' },
            { text: 'Check reasonableness: f_s = 30 N. If μ_s ≥ 0.2, no slipping occurs (f_s ≤ μ_s N ⇒ 30 ≤ μ_s × 150 ⇒ μ_s ≥ 0.2).', faded: true, blankAnswer: '30 N, horizontally forward (in direction of train\'s.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_02_005', title: 'Identify each idea',
          dissect: { specimen: 'Straight Line Motion', spots: [
            { id: 's1', label: 'Position is the location of', prompt: 'Which idea is this? — Position is the location of a point object specified by its coordinate (x) on a chosen.', answer: 'Position is the location of', options: ['Position is the location of', 'Kinematic equations for uniformly accelerated', 'Stopping distance is the total', 'Word problems in motion in'] },
            { id: 's2', label: 'Kinematic equations for uniformly accelerated', prompt: 'Which idea is this? — Kinematic equations for uniformly accelerated motion are a set of three algebraic.', answer: 'Kinematic equations for uniformly accelerated', options: ['Kinematic equations for uniformly accelerated', 'Position is the location of', 'Stopping distance is the total', 'Word problems in motion in'] },
            { id: 's3', label: 'Stopping distance is the total', prompt: 'Which idea is this? — Stopping distance is the total displacement of a vehicle from the instant the brakes are.', answer: 'Stopping distance is the total', options: ['Stopping distance is the total', 'Position is the location of', 'Kinematic equations for uniformly accelerated', 'Word problems in motion in'] },
            { id: 's4', label: 'Word problems in motion in', prompt: 'Which idea is this? — Word problems in motion in a straight line are structured physics questions that describe.', answer: 'Word problems in motion in', options: ['Word problems in motion in', 'Position is the location of', 'Kinematic equations for uniformly accelerated', 'Stopping distance is the total'] },
            { id: 's5', label: 'Aristotles fallacy is the incorrect', prompt: 'Which idea is this? — Aristotle\'s fallacy is the incorrect assertion that a continuous external force is.', answer: 'Aristotles fallacy is the incorrect', options: ['Aristotles fallacy is the incorrect', 'Position is the location of', 'Kinematic equations for uniformly accelerated', 'Stopping distance is the total'] },
            { id: 's6', label: 'Newtons First Law of Motion', prompt: 'Which idea is this? — Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its state of.', answer: 'Newtons First Law of Motion', options: ['Newtons First Law of Motion', 'Position is the location of', 'Kinematic equations for uniformly accelerated', 'Stopping distance is the total'] }
          ] } }
    ],
    explore: { component: C11_PhysicsStraightLineMotionSim, prompt: 'Explore the interactive — Straight Line Motion' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_001', difficulty: 'standard',
          question: 'Position is the location of a point object specified by its coordinate (x) on a.',
          hint: 'If stuck, review Class 6 integers on the number line (c6_math_ch02_017) and Class 9.',
          misconception: 'Students treat displacement as "total distance travelled" and assign it a positive sign always, because in Class 9 they.',
          parts: [
                { id: 'a', prompt: 'Explain why the path length travelled by a particle in one-dimensional motion is always greater than or equal to the magnitude of its displacement.', answer: 'Path length is the sum of absolute lengths of all path segments (Σ|Δx_i|), while',
                  options: ['Path length is the sum of absolute lengths of all path segments (Σ|Δx_i|), while', 'path length is always greater'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat displacement as "total distance travelled" and assign it a positive sign always, because in Class 9 they learned "distance.' }
          ],
            remediations: { 'students-treat-displacement-as-total': { steps: ['Draw a number line on paper with origin at 0. Place a coin at x = +5 cm. Move it to x = −3 cm.', 'Repeat with coin starting at −5 cm moving to +3 cm: (+3) − (−5) = +8 cm.', 'Emphasize that the sign of displacement tells direction relative to chosen +x axis.', 'Practice 5 similar calculations with explicit coordinate values until student consistently applies x_f − x_i with.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_005', difficulty: 'standard',
          question: 'Kinematic equations for uniformly accelerated motion are a set of three.',
          hint: 'If stuck, revisit c11_phy_cbse_02_004 (Acceleration: Average and Instantaneous) to.',
          misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid.',
          parts: [
                { id: 'a', prompt: 'A ball is thrown vertically upward with initial speed 20 m/s. At the highest point of its motion, what are the values of velocity and acceleration?', answer: 'At the highest point: velocity v = 0 m/s',
                  options: ['At the highest point: velocity v = 0 m/s', 'momentarily at rest', 'no net force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid ONLY when acceleration.' },
                { id: 'b', prompt: 'Two stones are dropped from the same height at an interval of 1 second. The first stone is dropped (v₀ = 0), the second is thrown downward with v₀ = 10 m/s.', answer: 'No, the second stone will not catch up',
                  options: ['No, the second stone will not catch up', 'yes, because it was thrown faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid ONLY when acceleration.' }
          ],
            remediations: { 'the-kinematic-equations-can-be': { steps: ['Re-read the problem statement and underline phrases like "uniform acceleration", "constant deceleration", "freely.', 'If the problem does not explicitly state constant acceleration, check if it is implied (e.g., free fall near Earth\'s.', 'If acceleration varies (e.g., a = kt, or a = –kx), STOP — kinematic equations cannot be used; go to node.', 'Practice identifying this condition by classifying 10 textbook problems as "kinematic equations applicable" or "not.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid.',
          parts: [
                { id: 'a', prompt: 'Two stones are dropped from the same height at an interval of 1 second. The first stone is dropped (v₀ = 0), the second is thrown downward with v₀ = 10 m/s.', answer: 'No, the second stone will not catch up',
                  options: ['No, the second stone will not catch up', 'yes, because it was thrown faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid ONLY when acceleration.' }
          ],
            remediations: { 'the-kinematic-equations-can-be': { steps: ['Re-read the problem statement and underline phrases like "uniform acceleration", "constant deceleration", "freely.', 'If the problem does not explicitly state constant acceleration, check if it is implied (e.g., free fall near Earth\'s.', 'If acceleration varies (e.g., a = kt, or a = –kx), STOP — kinematic equations cannot be used; go to node.', 'Practice identifying this condition by classifying 10 textbook problems as "kinematic equations applicable" or "not.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_009', difficulty: 'standard',
          question: 'Stopping distance is the total displacement of a vehicle from the instant the.',
          hint: 'Revisit c11_phy_cbse_02_005 (Kinematic Equations for Uniformly Accelerated Motion) and.',
          misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the.',
          parts: [
                { id: 'a', prompt: 'A car travelling at 20 m/s stops in 40 m with constant deceleration.', answer: 'Stopping distance at 40 m/s = 160 m',
                  options: ['Stopping distance at 40 m/s = 160 m', 'twice the speed means twice the distance to stop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' },
                { id: 'b', prompt: 'A motorcycle moving at 72 km/h applies brakes producing a deceleration of 5 m/s². Calculate the stopping distance in metres. Show all unit conversions.', answer: 'Step 1: Convert 72 km/h to m/s: 72 × (1000/3600) = 20 m/s',
                  options: ['Step 1: Convert 72 km/h to m/s: 72 × (1000/3600) = 20 m/s', 'twice the speed means twice the distance to stop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' },
                { id: 'c', prompt: 'Two identical cars have the same deceleration capability. Car A travels at 50 km/h, Car B at 100 km/h. Compare their stopping distances.', answer: 'Car B needs 60 m (4 × 15 m)',
                  options: ['Car B needs 60 m (4 × 15 m)', 'twice the speed means twice the distance to stop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' }
          ],
            remediations: { 'stopping-distance-is-directly-proportional': { steps: ['Re-derive v² = u² + 2as from v = u + at and s = ut + ½at² by eliminating t.', 'Set v = 0, u = v₀, a = -a (deceleration), s = ds to get 0 = v₀² - 2a·ds.', 'Solve for ds = v₀²/(2a). Note the v₀² term.', 'Make a table: v₀ = 10, 20, 30 m/s with a = 5 m/s². Calculate ds = 10, 40, 90 m. Observe ratio 1:4:9 = 1²:2²:3².', 'Connect to work-energy: Kinetic energy ½mv₀² = Work done by brakes = F·ds = ma·ds → ds = v₀²/(2a).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the.',
          parts: [
                { id: 'a', prompt: 'A student derives stopping distance as ds = v₀t - ½at² where t = v₀/a. They claim this is different from ds = v₀²/(2a).', answer: 'Both expressions are equivalent',
                  options: ['Both expressions are equivalent', 'twice the speed means twice the distance to stop'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe stopping distance is directly proportional to speed (ds ∝ v₀) because "twice the speed means twice the distance to stop.".' }
          ],
            remediations: { 'stopping-distance-is-directly-proportional': { steps: ['Re-derive v² = u² + 2as from v = u + at and s = ut + ½at² by eliminating t.', 'Set v = 0, u = v₀, a = -a (deceleration), s = ds to get 0 = v₀² - 2a·ds.', 'Solve for ds = v₀²/(2a). Note the v₀² term.', 'Make a table: v₀ = 10, 20, 30 m/s with a = 5 m/s². Calculate ds = 10, 40, 90 m. Observe ratio 1:4:9 = 1²:2²:3².', 'Connect to work-energy: Kinetic energy ½mv₀² = Work done by brakes = F·ds = ma·ds → ds = v₀²/(2a).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_011', difficulty: 'standard',
          question: 'Word problems in motion in a straight line are structured physics questions.',
          hint: 'If stuck on equation selection: write down the 4 variables (u, v, a, t, s) — which 3 are.',
          misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a.',
          parts: [
                { id: 'a', prompt: 'A ball is thrown vertically upward with an initial speed of 20 m/s.', answer: '0 m/s',
                  options: ['0 m/s', 'momentarily at rest', 'a car decelerates at 5 m/s²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' },
                { id: 'b', prompt: 'A car moving at 72 km/h applies brakes and stops in 50 m. A student writes: "u = 72 km/h, v = 0, s = 50 m, find a using v² = u² + 2as" and gets a = -51.84.', answer: 'The student forgot to convert 72 km/h to m/s (72 × 5/18 = 20 m/s)',
                  options: ['The student forgot to convert 72 km/h to m/s (72 × 5/18 = 20 m/s)', 'a car decelerates at 5 m/s²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' },
                { id: 'c', prompt: 'A stone is dropped from a bridge 45 m above a river. Taking g = 10 m/s² and downward as positive, calculate the time taken to hit the water and the velocity.', answer: 'Given: u = 0 m/s (dropped), s = +45 m, a = +10 m/s²',
                  options: ['Given: u = 0 m/s (dropped), s = +45 m, a = +10 m/s²', 'a car decelerates at 5 m/s²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' }
          ],
            remediations: { 'students-treat-deceleration-as-a': { steps: ['Draw the motion diagram with a clear +ve arrow.', 'Write "Let +ve direction be [direction of initial motion / east / upward]".', 'For each quantity (u, v, a, s), write its sign based on this choice.', 'Say aloud: "Velocity is +20 m/s, speed is decreasing, so acceleration opposes velocity → a is negative."', 'Plug signed values into equations. Practice with 3 problems where direction of motion is opposite to chosen +ve axis.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a.',
          parts: [
                { id: 'a', prompt: 'A problem states: "A particle moves with constant acceleration. Its velocity increases from 10 m/s to 30 m/s in 5 s.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'a car decelerates at 5 m/s²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "deceleration" as a negative number to be plugged directly into formulas without establishing a coordinate system.' }
          ],
            remediations: { 'students-treat-deceleration-as-a': { steps: ['Draw the motion diagram with a clear +ve arrow.', 'Write "Let +ve direction be [direction of initial motion / east / upward]".', 'For each quantity (u, v, a, s), write its sign based on this choice.', 'Say aloud: "Velocity is +20 m/s, speed is decreasing, so acceleration opposes velocity → a is negative."', 'Plug signed values into equations. Practice with 3 problems where direction of motion is opposite to chosen +ve axis.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_001', difficulty: 'standard',
          question: 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force.',
          hint: 'Revisit Class 9 "Force and Laws of Motion" (Newton\'s First Law) and "Friction" topics;.',
          misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In.',
          parts: [
                { id: 'a', prompt: 'A ball is released from rest at height h on a smooth (frictionless) inclined plane. It rolls down and up a second smooth inclined plane of the same angle.', answer: 'On the second inclined plane, the ball reaches exactly height h (conservation of',
                  options: ['On the second inclined plane, the ball reaches exactly height h (conservation of', 'it stops after a finite distance', 'inertia is a force that keeps things moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is a.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Place a coin on a card covering a glass. Flick the card horizontally. The coin drops into the glass.', 'Roll a ball on a smooth floor and a rough carpet from the same speed. Measure stopping distances.', 'Plot stopping distance vs. surface roughness.', 'Extrapolate the graph to zero roughness—distance → infinity. This sequence replaces the wrong mental model ("inertia.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Galileo was wrong. If I stop pushing my bicycle on a level road, it stops. So force IS needed to keep it moving." Evaluate this claim.', answer: 'The observation is correct (bicycle stops), but the conclusion is wrong',
                  options: ['The observation is correct (bicycle stops), but the conclusion is wrong', 'applied force', 'net force', 'student is right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is a.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using low-cost materials (e.g., a wooden plank, a marble, a towel, a book) that illustrates Galileo\'s insight: reducing.', answer: 'Setup: Place a wooden plank at a slight incline',
                  options: ['Setup: Place a wooden plank at a slight incline', 'inertia is a force that keeps things moving', 'inertia is the tendency to resist motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is a.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Place a coin on a card covering a glass. Flick the card horizontally. The coin drops into the glass.', 'Roll a ball on a smooth floor and a rough carpet from the same speed. Measure stopping distances.', 'Plot stopping distance vs. surface roughness.', 'Extrapolate the graph to zero roughness—distance → infinity. This sequence replaces the wrong mental model ("inertia.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_002', difficulty: 'standard',
          question: 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its.',
          hint: 'Revisit c8_physics_ch3_6 (Net Force: Combining Multiple Forces) and c11_math_ch10_001.',
          misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'A 2 kg book lies at rest on a horizontal table. The weight of the book is 19.6 N downward.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' },
                { id: 'b', prompt: 'A spaceship of mass 5000 kg is drifting in interstellar space far from any gravitational influence with its engines off.', answer: 'Given: m = 5000 kg, v = 200 m/s (constant), no external forces',
                  options: ['Given: m = 5000 kg, v = 200 m/s (constant), no external forces', 'carries', 'the engine force keeps the car moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' },
                { id: 'c', prompt: 'Analyze the following two situations and compare the net force on the body in each: (i) A 10 kg block rests on a frictionless horizontal surface.', answer: '(i) After the 50 N force is removed, no horizontal forces act (frictionless)',
                  options: ['(i) After the 50 N force is removed, no horizontal forces act (frictionless)', 'net force is zero in both cases', 'the engine force keeps the car moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' }
          ],
            remediations: { 'a-body-moving-with-uniform': { steps: ['Place a dynamics trolley on a friction-compensated runway (slight incline so trolley moves at constant velocity after a.', 'Ask: "What forces act horizontally?" (Answer: None — friction is compensated by gravity component).', 'Ask: "Is there a forward force?" (No).', 'Show a force sensor reading zero while trolley moves uniformly.', 'Contrast with a car on road: engine force exists *only* to cancel friction.', 'Have student draw free-body diagrams for both cases and write F_net = 0 explicitly.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "A 5 kg box is pushed across a rough floor at constant 2 m/s. The pushing force is 20 N.', answer: 'The solution is correct in result (friction = 20 N) but incomplete in reasoning',
                  options: ['The solution is correct in result (friction = 20 N) but incomplete in reasoning', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' },
                { id: 'b', prompt: 'Design a simple experiment using only a toy car, a long smooth plank, a rough cloth, and a stopwatch to demonstrate that uniform motion does not require a.', answer: 'Procedure: (1) Place the plank horizontally',
                  options: ['Procedure: (1) Place the plank horizontally', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' }
          ],
            remediations: { 'a-body-moving-with-uniform': { steps: ['Place a dynamics trolley on a friction-compensated runway (slight incline so trolley moves at constant velocity after a.', 'Ask: "What forces act horizontally?" (Answer: None — friction is compensated by gravity component).', 'Ask: "Is there a forward force?" (No).', 'Show a force sensor reading zero while trolley moves uniformly.', 'Contrast with a car on road: engine force exists *only* to cancel friction.', 'Have student draw free-body diagrams for both cases and write F_net = 0 explicitly.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
