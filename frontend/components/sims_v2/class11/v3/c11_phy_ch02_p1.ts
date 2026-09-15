import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch02_p1: SimDef = {
    id: 'v3_c11_phy_ch02_p1',
    title: 'Motion in a Straight Line · Part 1/2',
    subtitle: 'Learn why a round trip\'s velocity is zero while its speed never was.',
    classLevel: 11, subject: 'physics', topic: 'Motion in a Straight Line · Part 1/2',
    chapters: ['c11_phy_ch02'],
    nodeIds: ['c11_phy_cbse_02_001', 'c11_phy_cbse_02_002', 'c11_phy_cbse_02_003', 'c11_phy_cbse_02_004', 'c11_phy_cbse_02_005', 'c11_phy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a race analyst splitting distance from displacement', intro: 'The Metro goes out 5 km and comes back 5 km — one quantity reports ten kilometres, the other reports zero.', goal: 'Distinguish path length from displacement and compute average speed by total distance over total time.' },
    discovery: {
        question: 'Walk 2 km at 4 km/h, then 2 km at 6 km/h — average speed is (4+6)/2 = 5 km/h?',
        options: ['No — equal distances mean more time is spent slow: total 4 km over 5/6 h gives 4.8 km/h', 'Yes — average speed is the mean of speeds', 'Yes — arithmetic mean always applies', 'No — the answer is 6 km/h'],
        answer: 'No — equal distances mean more time is spent slow: total 4 km over 5/6 h gives 4.8 km/h',
        hook: 'And a round trip has zero average velocity but positive average speed — displacement and path length are not the same animal.',
    },
    teaching: [
        { title: 'Position, Path Length and Displacement', text: 'Position is the location of a point object specified by its coordinate (x) on a chosen axis with respect to a fixed origin, where positions to the right of the origin are positive and to the left are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_02_001', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'For a cyclist going −10 m → +20 m → −5 m, compute path length (55 m), displacement (+5 m) and see how far apart they sit.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_001', title: 'Position, Path Length and Displacement',
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
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_002', title: 'Average Velocity and Average Speed',
          scaffold: { problem: 'A delivery person on a scooter starts from a warehouse at 9:00 AM, rides 8 km east to a shop in 20 minutes, waits 10 minutes, then rides 5.',
            steps: [
            { text: 'Identify given quantities with units. East = positive direction. Segment 1: Δx₁ = +8 km, t₁ = 20 min = 1/3 h.' },
            { text: 'Compute total displacement and total time. Δx_total = (+8) + 0 + (-5) = +3 km.' },
            { text: 'Compute total path length. Path = |+8| + |0| + |-5| = 8 + 0 + 5 = 13 km.' },
            { text: 'Apply formulas. (a) v_avg = Δx_total / Δt_total = 3 km / 0.75 h = 4 km/h east.' },
            { text: 'Verify reasonableness. Average speed > |average velocity| (17.33 > 4) because path includes backtracking.', faded: true, blankAnswer: '(a) 4 km/h east (or +4 km/h), (b) 17.33 km/h, (c) 5.14 km/h.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_003', title: 'Instantaneous Velocity and Speed',
          scaffold: { problem: 'A particle moves along the x-axis such that its position varies with time as \\( x(t) = 5t^2 - 20t + 15 \\) (x in metres, t in seconds).',
            steps: [
            { text: 'Identify the given position function \\( x(t) = 5t^2 - 20t + 15 \\) m and the target instant \\( t = 3 \\) s.' },
            { text: 'Differentiate \\( x(t) \\) term by term using the power rule \\( \\frac{d}{dt}(t^n) = n t^{n-1} \\): \\( \\frac{d}{dt}(5t^2).' },
            { text: 'Substitute \\( t = 3 \\) s into \\( v(t) \\): \\( v(3) = 10(3) - 20 = 30 - 20 = 10 \\) m/s.' },
            { text: 'Instantaneous speed is the magnitude of velocity: speed \\( = |v(3)| = |10| = 10 \\) m/s.' },
            { text: 'For the particle to be momentarily at rest, \\( v(t) = 0 \\). Solve \\( 10t - 20 = 0 \\) → \\( t = 2 \\) s.' },
            { text: 'Find position at \\( t = 2 \\) s: \\( x(2) = 5(2)^2 - 20(2) + 15 = 20 - 40 + 15 = -5 \\) m.', faded: true, blankAnswer: '(a) 10 m/s, (b) 10 m/s, (c) 2 s, (d) -5 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_004', title: 'Acceleration: Average and Instantaneous',
          scaffold: { problem: 'A particle moves along the x-axis such that its velocity varies with time as v(t) = 4t³ - 6t² + 2t (in m/s), where t is in seconds.',
            steps: [
            { text: 'Identify given: v(t) = 4t³ - 6t² + 2t m/s. Need a_avg for t=1 to 3, a_inst at t=2, and t when a=0.' },
            { text: 'For average acceleration, use a_avg = [v(3) - v(1)] / (3 - 1).' },
            { text: 'For instantaneous acceleration, differentiate v(t): a(t) = dv/dt = d/dt(4t³ - 6t² + 2t) = 12t² - 12t + 2 m/s².' },
            { text: 'Evaluate a(2) = 12(4) - 12(2) + 2 = 48 - 24 + 2 = 26 m/s².' },
            { text: 'Find when a(t) = 0: 12t² - 12t + 2 = 0 → Divide by 2: 6t² - 6t + 1 = 0.' },
            { text: 'Verify units: v in m/s, t in s, dv/dt gives m/s². Answers are physically reasonable (acceleration values typical for.', faded: true, blankAnswer: '(a) 30 m/s², (b) 26 m/s², (c) t = (3 ± √3)/6 s ≈ 0.21 s and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_005', title: 'Kinematic Equations for Uniformly Accelerated Motion',
          scaffold: { problem: 'A motorcyclist on a straight highway passes a kilometre stone at 72 km/h and accelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Convert all given quantities to SI units. v₀ = 72 km/h = 72 × (5/18) = 20 m/s. a = 2 m/s². t = 10 s.' },
            { text: 'Identify the appropriate kinematic equation for each part. (a) needs v, given v₀, a, t → use v = v₀ + at.' },
            { text: 'Substitute values with units. (a) v = 20 m/s + (2 m/s²)(10 s) = 20 + 20 = 40 m/s.' },
            { text: 'Verify unit consistency. (a) m/s + (m/s²)(s) = m/s ✓. (b) (m/s)(s) + (m/s²)(s²) = m + m = m ✓.' },
            { text: 'Check physical reasonableness. Velocity increases from 20 to 40 m/s (144 km/h) in 10 s — plausible for a motorcycle.', faded: true, blankAnswer: '(a) 40 m/s (144 km/h); (b) 300 m; (c) 49.0 m/s (176 km/h)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_02_006', title: 'Equations of Motion: Derivation Using Calculus',
          scaffold: { problem: 'A car starts from rest and accelerates uniformly at 2.5 m/s² along a straight road.',
            steps: [
            { text: 'Identify given quantities: initial velocity \\( u = 0 \\) m/s, constant acceleration \\( a = 2.5 \\) m/s², time \\( t = 10.' },
            { text: 'Start from the definition of acceleration as derivative of velocity: \\( a = \\frac{dv}{dt} \\).' },
            { text: 'Perform integration: \\( v - u = a t \\). With \\( u = 0 \\), we get \\( v = a t \\).' },
            { text: 'Now use velocity as derivative of displacement: \\( v = \\frac{ds}{dt} = a t \\).' },
            { text: 'Perform integration: \\( s = \\frac{1}{2} a t^2 \\). Substitute \\( a = 2.5 \\) m/s² and \\( t = 10 \\) s: \\( s = \\frac{1}{2}.', faded: true, blankAnswer: '125 m' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a metro round trip — 5 km out, 5 km back — a student reports \'displacement 10 km, average speed equals average velocity.\' For a walk-and-run-back errand (1 m/s out, 2 m/s back) he computes average speed as (1+2)/2 = 1.5 m/s.',
            decisions: [{ prompt: 'Which kinematic quantities did he scramble?', options: [
                { text: 'Split scalar from vector properly: displacement is x_final − x_initial = 0 for the round trip (it can be negative too — moving +5 to −3 gives −8 m, not 8). Average speed uses total path length: the errand\'s true value is 1000/(500+250) = 1.33 m/s — you can\'t average speeds like marks unless times are equal. Round trips prove the split: zero average velocity, positive average speed.', outcome: 'He adopts the definitions: speed is path over time, velocity is displacement over time — and they diverge exactly when direction reverses.' },
                { text: 'Accept 10 km displacement — the auto travelled 10 km of road.', outcome: 'That\'s path length: displacement only measures net position change with sign — start and end coincide, so it\'s zero.', reveals: 'distance-equals-displacement' },
                { text: 'Keep 1.5 m/s — averaging the two speeds is the natural calculation.', outcome: 'Speeds can only be averaged when time intervals match; here equal distances differ in time — total distance over total time gives 1.33 m/s.', reveals: 'average-speed-is-mean-of-speeds' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The arithmetic mean only works when the clock ticks equally — average by time, not by speed.',
            decisions: [{ prompt: 'What comes next? Motion in a Straight Line · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Motion in a Straight Line · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_001', difficulty: 'standard',
          question: 'Position is the location of a point object specified by its coordinate (x) on.',
          hint: 'If stuck, review Class 6 integers on the number line (c6_math_ch02_017) and Class 9.',
          misconception: 'Students treat displacement as "total distance travelled" and assign it a positive sign always, because in Class 9 they.',
          parts: [
                { id: 'a', prompt: 'Explain why the path length travelled by a particle in one-dimensional motion is always greater than or equal to the magnitude of its displacement.', answer: 'Path length is the sum of absolute lengths of all path segments (Σ|Δx_i|), while',
                  options: ['Path length is the sum of absolute lengths of all path segments (Σ|Δx_i|), while', 'path length is always greater'],
                  hint: 'If stuck, review Class 6 integers on the number line (c6_math_ch02_017) and Class 9 coordinate.',
                  misconception: 'Students treat displacement as "total distance travelled" and assign it a positive sign always, because in Class 9 they learned "distance.' }
          ],
            remediations: { 'students-treat-displacement-as-total': { steps: ['Draw a number line on paper with origin at 0. Place a coin at x = +5 cm. Move it to x = −3 cm.', 'Repeat with coin starting at −5 cm moving to +3 cm: (+3) − (−5) = +8 cm.', 'Emphasize that the sign of displacement tells direction relative to chosen +x axis.', 'Practice 5 similar calculations with explicit coordinate values until student consistently applies x_f − x_i with.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_002', difficulty: 'standard',
          question: 'Average velocity is the ratio of net displacement (Δx) to the time interval.',
          hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice.',
          misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless.',
          parts: [
                { id: 'a', prompt: 'State the formula for average velocity and average speed, including their SI units.', answer: 'Average velocity v_avg = Δx/Δt = (x₂ - x₁)/(t₂ - t₁), SI unit m/s (vector)',
                  options: ['Average velocity v_avg = Δx/Δt = (x₂ - x₁)/(t₂ - t₁), SI unit m/s (vector)', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' },
                { id: 'b', prompt: 'A car travels 60 km north in 1 hour, then 40 km south in 1 hour.', answer: 'Magnitude of average velocity ≠ average speed',
                  options: ['Magnitude of average velocity ≠ average speed', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' },
                { id: 'c', prompt: 'A cyclist rides from home to school 3 km away at 10 km/h, finds school closed, and immediately rides back home at 15 km/h.', answer: 'average velocity for the full trip, (',
                  options: ['average velocity for the full trip, (', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' },
                { id: 'd', prompt: 'An x-t graph shows a particle at x=0 at t=0, moving to x=10 m at t=2 s, then reversing to x=4 m at t=5 s.', answer: 'average velocity for 0 to 5 s, (',
                  options: ['average velocity for 0 to 5 s, (', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' }
          ],
            remediations: { 'average-speed-is-the-arithmetic': { steps: ['Draw a number line. Mark home at 0, school at +3 km. Walk a finger from 0 to +3 (3 km), then back to 0 (3 km).', 'Time the forward trip (e.g., 20 min) and return trip (e.g., 15 min). Total time = 35 min.', 'Compute v_avg = 0/35 = 0. Speed_avg = 6 km / (35/60) h = 10.3 km/h.', 'Ask "Why is speed not zero?" — because you actually walked 6 km.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A man walks 2 km at 4 km/h, then 2 km at 6 km/h. Average speed = (4+6)/2 = 5 km/h." Evaluate this solution. Is it correct?', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'average of speeds', 'average speed', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' },
                { id: 'b', prompt: 'Design a simple experiment using only a stopwatch, a measuring tape, and a toy car on a straight track to demonstrate that average speed can be non-zero while.', answer: 'Procedure: Mark start point O',
                  options: ['Procedure: Mark start point O', 'average speed is the arithmetic mean of speeds for different segments (e'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_001 Position, Path Length and Displacement and practice drawing.',
                  misconception: 'Students believe average speed is the arithmetic mean of speeds for different segments (e.g., (v₁+v₂)/2) regardless of whether time.' }
          ],
            remediations: { 'average-speed-is-the-arithmetic': { steps: ['Draw a number line. Mark home at 0, school at +3 km. Walk a finger from 0 to +3 (3 km), then back to 0 (3 km).', 'Time the forward trip (e.g., 20 min) and return trip (e.g., 15 min). Total time = 35 min.', 'Compute v_avg = 0/35 = 0. Speed_avg = 6 km / (35/60) h = 10.3 km/h.', 'Ask "Why is speed not zero?" — because you actually walked 6 km.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_003', difficulty: 'standard',
          question: 'Instantaneous velocity is the rate of change of position with respect to time.',
          hint: 'If stuck, revisit c11_phy_cbse_02_002 (Average Velocity and Average Speed) and.',
          misconception: 'Students often believe that "instantaneous velocity is just average velocity over a very small time interval, like 0.01.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Instantaneous velocity is the rate of change of position with respect to time at a',
                  options: ['Instantaneous velocity is the rate of change of position with respect to time at a', 'Position is the location of a point object specified by its coordinate (x) on a chosen', 'Average velocity is the ratio of net displacement (Δx) to the time interval (Δt) during', 'Acceleration is the rate of change of velocity with respect to time'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_002 (Average Velocity and Average Speed) and c9_physics_ch2_6.',
                  misconception: 'Students often believe that "instantaneous velocity is just average velocity over a very small time interval, like 0.01 s." They treat \\.' }
          ],
            remediations: { 'instantaneous-velocity-is-just-average': { steps: ['** Revisit the numerical method in NCERT Table 2.1. Have the student compute \\( \\frac{\\Delta x}{\\Delta t} \\) for \\(.', '** Draw the x-t graph of \\( x = t^3 \\). Draw chords for each \\( \\Delta t \\) and show how they approach the tangent. **', '** Introduce the derivative as the *exact* slope of the tangent.', '** Give a position function \\( x(t) = 3t^2 - 4t + 5 \\) and ask: "Find instantaneous velocity at t=2 s using (a) the.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_004', difficulty: 'standard',
          question: 'Acceleration is the rate of change of velocity with respect to time.',
          hint: 'Review the concept of instantaneous velocity (node c11_phy_cbse_02_003) and the.',
          misconception: 'Students believe that negative acceleration always means "slowing down" and positive acceleration always means.',
          parts: [
                { id: 'a', prompt: 'For the same particle v(t) = 3t² - 12t + 9 m/s, find the instantaneous acceleration at t = 2 s.', answer: 'a_inst = dv/dt = d/dt(3t² - 12t + 9) = 6t - 12',
                  options: ['a_inst = dv/dt = d/dt(3t² - 12t + 9) = 6t - 12', 'slowing down', 'speeding up'],
                  hint: 'Review the concept of instantaneous velocity (node c11_phy_cbse_02_003) and the mathematical.',
                  misconception: 'Students believe that negative acceleration always means "slowing down" and positive acceleration always means "speeding up." This.' },
                { id: 'b', prompt: 'A car\'s velocity changes from 18 km/h to 72 km/h in 5 seconds. Calculate its average acceleration in m/s². Is the acceleration positive or negative?', answer: 'Step 1: Convert velocities to m/s: 18 km/h = 5 m/s, 72 km/h = 20 m/s',
                  options: ['Step 1: Convert velocities to m/s: 18 km/h = 5 m/s, 72 km/h = 20 m/s', 'slowing down', 'speeding up'],
                  hint: 'Review the concept of instantaneous velocity (node c11_phy_cbse_02_003) and the mathematical.',
                  misconception: 'Students believe that negative acceleration always means "slowing down" and positive acceleration always means "speeding up." This.' },
                { id: 'c', prompt: 'The velocity-time graph of a particle is a straight line with positive slope passing through the origin.', answer: 'Correct answer: (b) a parabola opening upward',
                  options: ['Correct answer: (b) a parabola opening upward', 'slowing down', 'speeding up'],
                  hint: 'Review the concept of instantaneous velocity (node c11_phy_cbse_02_003) and the mathematical.',
                  misconception: 'Students believe that negative acceleration always means "slowing down" and positive acceleration always means "speeding up." This.' }
          ],
            remediations: { 'negative-acceleration-always-means-slowing': { steps: ['Draw a coordinate axis and define positive direction explicitly.', 'For a ball thrown upward, list velocity signs (upward +, downward -) and acceleration sign (always -g).', 'Create a table: Phase | v sign | a sign | v·a sign | Speed change.', 'Observe that when v and a have same sign, speed increases; opposite signs, speed decreases.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_005', difficulty: 'standard',
          question: 'Kinematic equations for uniformly accelerated motion are a set of three.',
          hint: 'If stuck, revisit c11_phy_cbse_02_004 (Acceleration: Average and Instantaneous).',
          misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid.',
          parts: [
                { id: 'a', prompt: 'A ball is thrown vertically upward with initial speed 20 m/s. At the highest point of its motion, what are the values of velocity and acceleration?', answer: 'At the highest point: velocity v = 0 m/s',
                  options: ['At the highest point: velocity v = 0 m/s', 'momentarily at rest', 'no net force'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_004 (Acceleration: Average and Instantaneous) to reinforce the.',
                  misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid ONLY when acceleration.' },
                { id: 'b', prompt: 'Two stones are dropped from the same height at an interval of 1 second. The first stone is dropped (v₀ = 0), the second is thrown downward with v₀ = 10 m/s.', answer: 'No, the second stone will not catch up',
                  options: ['No, the second stone will not catch up', 'yes, because it was thrown faster'],
                  hint: 'If stuck, revisit c11_phy_cbse_02_004 (Acceleration: Average and Instantaneous) to reinforce the.',
                  misconception: 'Students believe the kinematic equations can be used for ANY motion with acceleration, not realising they are valid ONLY when acceleration.' }
          ],
            remediations: { 'the-kinematic-equations-can-be': { steps: ['Re-read the problem statement and underline phrases like "uniform acceleration", "constant deceleration", "freely.', 'If the problem does not explicitly state constant acceleration, check if it is implied (e.g., free fall near Earth\'s.', 'If acceleration varies (e.g., a = kt, or a = –kx), STOP — kinematic equations cannot be used; go to node.', 'Practice identifying this condition by classifying 10 textbook problems as "kinematic equations applicable" or "not.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_02_006', difficulty: 'standard',
          question: 'The equations of motion for uniformly accelerated rectilinear motion are.',
          hint: 'Review differentiation and integration of polynomials from Class 11 Mathematics (Limits.',
          misconception: 'Students often think the calculus derivation is just a fancy rewrite of the algebraic derivation and that the constant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The equations of motion for uniformly accelerated rectilinear motion are derived using',
                  options: ['The equations of motion for uniformly accelerated rectilinear motion are derived using', 'Position is the location of a point object specified by its coordinate (x) on a chosen', 'Average velocity is the ratio of net displacement (Δx) to the time interval (Δt) during', 'Instantaneous velocity is the rate of change of position with respect to time at a'],
                  hint: 'Review differentiation and integration of polynomials from Class 11 Mathematics (Limits and.',
                  misconception: 'Students often think the calculus derivation is just a fancy rewrite of the algebraic derivation and that the constant acceleration.' }
          ],
            remediations: { 'the-calculus-derivation-is-just': { steps: ['Revisit the definition of derivative as a limit: \\( a = \\lim_{\\Delta t \\to 0} \\frac{\\Delta v}{\\Delta t} \\).', 'Practice integrating simple functions with initial conditions: e.g., given \\( a(t) = 4t \\), \\( v(0)=3 \\), find \\( v(t).', 'Explicitly write the definite integrals with limits for each derivation step, labeling the lower limit as initial.', 'Compare with the algebraic derivation to see where constant acceleration is used (pulling \\( a \\) out of the integral).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
