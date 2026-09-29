import type { SimDef } from '../../engine/types';
import C9_PhysicsEquationsUniformlyAcceleratedSim from '../../../simulations/c6_12/C9_PhysicsEquationsUniformlyAcceleratedSim';

/** v3 wrapped master — C9_PhysicsEquationsUniformlyAcceleratedSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_physicsequationsuniformlyacceleratedsim: SimDef = {
    id: 'v3w_c9_physicsequationsuniformlyacceleratedsim',
    title: 'Equations of Motion: Derivation',
    subtitle: 'This node covers the algebraic and graphical derivation of the three equations of motion.',
    classLevel: 9, subject: 'physics', topic: 'Equations of Motion: Derivation',
    chapters: [],
    nodeIds: ['c9_physics_ch2_8', 'c9_physics_ch2_9', 'c9_physics_ch2_7', 'c9_physics_ch2_3', 'c9_physics_ch2_11', 'c9_physics_ch2_10', 'c9_physics_ch2_2', 'c9_physics_ch2_4', 'c9_physics_ch2_5', 'c9_physics_ch2_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a motorcycle at a traffic signal in Delhi – it starts from rest and accelerates uniformly to cross.', goal: 'Master Equations of Motion: Derivation.' },
    discovery: {
        question: 'Two cyclists start from the same point on a straight road. Cyclist A moves with constant velocity 5 m/s.',
        options: ['At t=2s: s_A = 5×2 = 10 m', 'B is always ahead', 'A is always ahead'],
        answer: 'At t=2s: s_A = 5×2 = 10 m',
        hook: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work.',
    },
    teaching: [
        { title: 'The three equations of motion are.', text: 'The three equations of motion are mathematical relationships that connect the five kinematic variables – initial velocity (u), final velocity (v), uniform acceleration (a), time (t), and displacement.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch2_8', title: 'The three equations of motion are.',
          scaffold: { problem: 'A scooterist in Bengaluru is moving at 10 m/s on a straight road. He applies brakes and decelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Identify given quantities with units: initial velocity u = 10 m/s, final velocity v = 0 m/s (stops), acceleration a =.' },
            { text: 'Choose appropriate equations. For s, use v² = u² + 2as (no t needed). For t, use v = u + at.' },
            { text: 'Substitute values into v² = u² + 2as: 0² = 10² + 2(-2)s → 0 = 100 - 4s.' },
            { text: 'Solve for s: 4s = 100 → s = 25 m. Unit check: (m/s)² / (m/s²) = m. Correct.' },
            { text: 'Substitute into v = u + at: 0 = 10 + (-2)t → 2t = 10 → t = 5 s. Unit check: (m/s) / (m/s²) = s. Correct.' },
            { text: 'Verify reasonableness: A scooter at 36 km/h stopping in 25 m and 5 s is realistic for moderate braking.', faded: true, blankAnswer: 'Displacement = 25 m; Time to stop = 5 s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_9', title: 'Equations of Motion Applications.',
          scaffold: { problem: 'A car traveling at 54 km/h applies brakes and decelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Convert u = 54 km/h = 54 × (5/18) = 15 m/s. v = 0 (stops), a = -2 m/s² (deceleration opposite to motion).' },
            { text: '(a) Use v = u + at → 0 = 15 + (-2)t → t = 7.5 s. (b) Use v² = u² + 2as → 0 = 15² + 2(-2)s → s = 225/4 = 56.25 m.' },
            { text: '(c) Distance in nth second = u + a(n - ½). For 3rd second: s₃ = 15 + (-2)(3 - 0.5) = 15 - 5 = 10 m.' },
            { text: 'Check units: all in m, m/s, s. Check reasonableness: car stops in 7.5 s, distance ~56 m (about 13 car lengths).' },
            { text: 'Final answers: (a) 7.5 s, (b) 56.25 m, (c) 10 m.', faded: true, blankAnswer: '(a) 7.5 s, (b) 56.25 m, (c) 10 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_7', title: 'A velocity-time graph plots velocity.',
          scaffold: { problem: 'A motorcyclist starts from rest and accelerates uniformly at 2 m/s² for 5 s.',
            steps: [
            { text: 'Identify given quantities: Phase 1: u=0, a=2 m/s², t=5 s. Phase 2: constant v, t=10 s.' },
            { text: 'Calculate velocities at key points. Phase 1 end: v = u + at = 0 + 2×5 = 10 m/s. Phase 2: v = 10 m/s constant.' },
            { text: 'Sketch v-t graph: (0,0) to (5,10) straight line (slope 2), then horizontal to (15,10), then straight line to (19,0).' },
            { text: 'Compute area under graph (displacement). Area = triangle (0-5 s) + rectangle (5-15 s) + triangle (15-19 s) = ½×5×10 +.' },
            { text: 'Verify: All velocities positive, so distance = displacement = 145 m. Reasonable for a motorcycle over 19 s.', faded: true, blankAnswer: '145 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_3', title: 'Velocity is a vector quantity defined.',
          scaffold: { problem: 'A delivery scooter starts from a warehouse, goes 3.6 km north to a shop in 12 minutes, then returns 1.2 km south to a restaurant in 4.',
            steps: [
            { text: 'Identify given quantities and convert to SI units. First leg: displacement = +3.6 km = +3600 m (north positive), time =.' },
            { text: 'State the formula for average velocity: v_avg = total displacement / total time.' },
            { text: 'Compute total displacement: Δx_total = (+3600 m) + (-1200 m) = +2400 m.' },
            { text: 'Substitute into formula: v_avg = 2400 m / 960 s = 2.5 m/s. The positive sign indicates northward direction.' },
            { text: 'Verify reasonableness: The scooter ends 2.4 km north in 16 minutes (960 s).', faded: true, blankAnswer: '2.5 m/s north' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_11', title: 'Kinematic problem solving in straight.',
          scaffold: { problem: 'A car on the Mumbai-Pune expressway enters a straight stretch at 20 m/s.',
            steps: [
            { text: 'Identify given quantities with units: u = 20 m/s, a = 1.2 m/s², t = 10 s. Unknowns: v, s, v_avg.' },
            { text: 'Choose equations: (a) v = u + at (contains u, a, t, v). (b) s = ut + ½at² (contains u, a, t, s).' },
            { text: 'Substitute values: (a) v = 20 + (1.2)(10) = 20 + 12 = 32 m/s. (b) s = (20)(10) + ½(1.2)(10)² = 200 + 0.6×100 = 200 + 60.' },
            { text: 'Unit check: (a) m/s + m/s²·s = m/s ✓. (b) m/s·s + m/s²·s² = m + m = m ✓. (c) (m/s + m/s)/2 = m/s ✓.' },
            { text: 'Physical reasonableness: A car accelerating from 72 km/h to 115 km/h in 10 s is plausible; displacement 260 m in 10 s.', faded: true, blankAnswer: '(a) 32 m/s, (b) 260 m, (c) 26 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_10', title: 'Uniform circular motion is the motion.',
          scaffold: { problem: 'A ceiling fan has blades of length 0.6 m. It rotates at 120 revolutions per minute (rpm).',
            steps: [
            { text: 'Identify given quantities: radius r = 0.6 m, rotational speed = 120 rpm.' },
            { text: 'Identify formulas needed: \\(\\omega = \\frac{2\\pi}{T}\\), \\(v = \\omega r\\), \\(a_c = \\omega^2 r\\).' },
            { text: 'Compute angular velocity: \\(\\omega = \\frac{2\\pi}{0.5} = 4\\pi \\approx 12.57\\ \\text{rad/s}\\).' },
            { text: 'Compute linear speed: \\(v = \\omega r = 12.57 \\times 0.6 = 7.54\\ \\text{m/s}\\).' },
            { text: 'Compute centripetal acceleration: \\(a_c = \\omega^2 r = (12.57)^2 \\times 0.6 = 158 \\times 0.6 = 94.8\\ \\text{m/s}^2\\).', faded: true, blankAnswer: '(a) \\(\\omega = 4\\pi \\approx 12.6\\ \\text{rad/s}\\), (b) \\(v.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch2_9', title: 'Identify each idea',
          dissect: { specimen: 'Equations of Motion: Derivation', spots: [
            { id: 's1', label: 'The three equations of motion', prompt: 'Which idea is this? — The three equations of motion are mathematical relationships that connect the five.', answer: 'The three equations of motion', options: ['The three equations of motion', 'Equations of Motion Applications involve', 'A velocity-time graph plots velocity', 'Velocity is a vector quantity'] },
            { id: 's2', label: 'Equations of Motion Applications involve', prompt: 'Which idea is this? — Equations of Motion Applications involve using the three kinematic equations (v = u + at,.', answer: 'Equations of Motion Applications involve', options: ['Equations of Motion Applications involve', 'The three equations of motion', 'A velocity-time graph plots velocity', 'Velocity is a vector quantity'] },
            { id: 's3', label: 'A velocity-time graph plots velocity', prompt: 'Which idea is this? — A velocity-time graph plots velocity (m/s) on the vertical axis against time (s) on the.', answer: 'A velocity-time graph plots velocity', options: ['A velocity-time graph plots velocity', 'The three equations of motion', 'Equations of Motion Applications involve', 'Velocity is a vector quantity'] },
            { id: 's4', label: 'Velocity is a vector quantity', prompt: 'Which idea is this? — Velocity is a vector quantity defined as the rate of change of displacement with respect.', answer: 'Velocity is a vector quantity', options: ['Velocity is a vector quantity', 'The three equations of motion', 'Equations of Motion Applications involve', 'A velocity-time graph plots velocity'] },
            { id: 's5', label: 'Kinematic problem solving in straight', prompt: 'Which idea is this? — Kinematic problem solving in straight line motion is the systematic application of the.', answer: 'Kinematic problem solving in straight', options: ['Kinematic problem solving in straight', 'The three equations of motion', 'Equations of Motion Applications involve', 'A velocity-time graph plots velocity'] },
            { id: 's6', label: 'Uniform circular motion is the', prompt: 'Which idea is this? — Uniform circular motion is the motion of an object traveling at a constant speed along a.', answer: 'Uniform circular motion is the', options: ['Uniform circular motion is the', 'The three equations of motion', 'Equations of Motion Applications involve', 'A velocity-time graph plots velocity'] }
          ] } }
    ],
    explore: { component: C9_PhysicsEquationsUniformlyAcceleratedSim, prompt: 'Explore the interactive — Equations of Motion: Derivation' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch2_8', difficulty: 'standard',
          question: 'The three equations of motion are mathematical relationships that connect the.',
          hint: 'Review node c9_physics_ch2_7 (Velocity-Time Graphs) and practise calculating slope (a =.',
          misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work.',
          parts: [
                { id: 'a', prompt: 'Two cyclists start from the same point on a straight road. Cyclist A moves with constant velocity 5 m/s.', answer: 'At t=2s: s_A = 5×2 = 10 m',
                  options: ['At t=2s: s_A = 5×2 = 10 m', 'B is always ahead', 'A is always ahead'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work for ANY motion –.' }
          ],
            remediations: { 'the-equations-of-motion-v': { steps: ['Revisit the velocity-time graph (node c9_physics_ch2_7) and physically trace the area under a straight line vs a curved.', 'Perform a quick experiment: roll a ball down a rough incline (non-uniform acceleration due to friction changes) and.', 'Practice identifying "uniform acceleration" in word problems: circle the phrase "uniformly accelerated" or "constant.', 'Derive the equations again from the graph, emphasising that the straight line (constant slope) is the essential.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work.',
          parts: [
                { id: 'a', prompt: 'Two cyclists start from the same point on a straight road. Cyclist A moves with constant velocity 5 m/s.', answer: 'At t=2s: s_A = 5×2 = 10 m',
                  options: ['At t=2s: s_A = 5×2 = 10 m', 'B is always ahead', 'A is always ahead'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work for ANY motion –.' }
          ],
            remediations: { 'the-equations-of-motion-v': { steps: ['Revisit the velocity-time graph (node c9_physics_ch2_7) and physically trace the area under a straight line vs a curved.', 'Perform a quick experiment: roll a ball down a rough incline (non-uniform acceleration due to friction changes) and.', 'Practice identifying "uniform acceleration" in word problems: circle the phrase "uniformly accelerated" or "constant.', 'Derive the equations again from the graph, emphasising that the straight line (constant slope) is the essential.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_9', difficulty: 'standard',
          question: 'Equations of Motion Applications involve using the three kinematic equations (v.',
          hint: 'Revisit c9_physics_ch2_8 (derivation from v-t graph) to see why each equation has a.',
          misconception: 'Students believe the three equations can be used for ANY motion problem.',
          parts: [
                { id: 'a', prompt: 'Write the three equations of motion for uniformly accelerated motion along with the meaning of each symbol and its SI unit.', answer: 'The three equations are: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as',
                  options: ['The three equations are: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as', 'the three equations can be used for ANY motion problem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' },
                { id: 'b', prompt: 'A scooter moving at 36 km/h applies brakes and stops uniformly in 5 seconds. Calculate (a) the deceleration in m/s², (b) the stopping distance in meters.', answer: 'Given: u = 36 km/h = 10 m/s, v = 0, t = 5 s',
                  options: ['Given: u = 36 km/h = 10 m/s, v = 0, t = 5 s', 'the three equations can be used for ANY motion problem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' },
                { id: 'c', prompt: 'Two cars A and B start from rest. Car A accelerates at 2 m/s² for 10 s, then moves at constant velocity.', answer: 'Car A: v_A = 0 + 2×10 = 20 m/s',
                  options: ['Car A: v_A = 0 + 2×10 = 20 m/s', 'the three equations can be used for ANY motion problem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' }
          ],
            remediations: { 'the-three-equations-can-be': { steps: ['Draw a velocity-time graph for the problem – the equations are just area/slope of this graph.', 'Make a table: Knowns (u, v, a, t, s) with signs, Unknowns.', 'Pick the equation that has ONLY ONE unknown.', 'If motion has phases (acceleration then constant velocity), solve each phase separately and add displacements.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the three equations can be used for ANY motion problem.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A ball thrown up at 20 m/s. Find max height." They write: v = u + at → 0 = 20 + 10t → t = 2 s. Then s = vt = 0×2 = 0 m.', answer: 'The solution is wrong',
                  options: ['The solution is wrong', 'the three equations can be used for ANY motion problem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' }
          ],
            remediations: { 'the-three-equations-can-be': { steps: ['Draw a velocity-time graph for the problem – the equations are just area/slope of this graph.', 'Make a table: Knowns (u, v, a, t, s) with signs, Unknowns.', 'Pick the equation that has ONLY ONE unknown.', 'If motion has phases (acceleration then constant velocity), solve each phase separately and add displacements.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_7', difficulty: 'standard',
          question: 'A velocity-time graph plots velocity (m/s) on the vertical axis against time.',
          hint: 'If stuck, revisit c9_physics_ch2_3 (velocity as vector) and c9_math_ch3_1 (slope and area.',
          misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'What does the slope of a velocity-time graph represent, and what is its SI unit?', answer: 'The slope represents acceleration, with SI unit m/s²',
                  options: ['The slope represents acceleration, with SI unit m/s²', 'slope gives speed', 'unit is m/s'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' },
                { id: 'b', prompt: 'A car\'s velocity-time graph is a horizontal line at 20 m/s from t=0 s to t=10 s, then a straight line dropping to 0 m/s at t=15 s.', answer: 'Step 1: Displacement = area under v-t graph',
                  options: ['Step 1: Displacement = area under v-t graph', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' },
                { id: 'c', prompt: 'Two velocity-time graphs are given: Graph A is a straight line through origin with slope 2 m/s².', answer: 'Graph A: constant slope = 2 m/s², so acceleration at t=3 s is 2 m/s²',
                  options: ['Graph A: constant slope = 2 m/s², so acceleration at t=3 s is 2 m/s²', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' }
          ],
            remediations: { 'a-negative-slope-on-a': { steps: ['Remediation: (1) Draw a v-t graph for a ball thrown vertically upward (take upward as positive).', 'Mark points: launch (+v), top (0), landing (-v).', '(2) Ask: "Is the slope positive or negative at each point?" (Always negative = -g).', '(3) Ask: "Is the ball slowing down or speeding up on the way down?" (Speeding up, because velocity and acceleration.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'A student claims: "The area under a velocity-time graph always gives distance travelled, never displacement." Evaluate this statement and correct it if.', answer: 'The statement is false',
                  options: ['The statement is false', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' },
                { id: 'b', prompt: 'Design a simple experiment using a smartphone\'s accelerometer and a toy car on a ramp to verify that the area under a velocity-time graph equals displacement.', answer: '(1) Place phone on toy car, start accelerometer recording',
                  options: ['(1) Place phone on toy car, start accelerometer recording', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' }
          ],
            remediations: { 'a-negative-slope-on-a': { steps: ['Remediation: (1) Draw a v-t graph for a ball thrown vertically upward (take upward as positive).', 'Mark points: launch (+v), top (0), landing (-v).', '(2) Ask: "Is the slope positive or negative at each point?" (Always negative = -g).', '(3) Ask: "Is the ball slowing down or speeding up on the way down?" (Speeding up, because velocity and acceleration.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_3', difficulty: 'standard',
          question: 'Velocity is a vector quantity defined as the rate of change of displacement.',
          hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing.',
          misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by.',
          parts: [
                { id: 'a', prompt: 'State the formula for average velocity and its SI unit. How does it differ from the formula for average speed?', answer: 'Average velocity = displacement / time taken (v = Δx/Δt), SI unit: m/s',
                  options: ['Average velocity = displacement / time taken (v = Δx/Δt), SI unit: m/s', 'speed with a direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add a.' },
                { id: 'b', prompt: 'A car travels 100 m east in 10 s, then 50 m west in 5 s. Calculate its average speed and average velocity. Explain why the two values are different.', answer: 'Total distance = 150 m, total time = 15 s → average speed = 10 m/s',
                  options: ['Total distance = 150 m, total time = 15 s → average speed = 10 m/s', 'speed with a direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add a.' },
                { id: 'c', prompt: 'A train moves along a straight track. It covers 2.4 km in 2 minutes, then reverses direction and covers 1.2 km in 1 minute.', answer: 'Step 1: Convert all units to SI',
                  options: ['Step 1: Convert all units to SI', 'speed with a direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add a.' }
          ],
            remediations: { 'average-velocity-is-just-speed': { steps: ['Revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing displacement vectors for back-and-forth.', 'Do a physical activity: walk 5 steps forward, 3 steps back.', 'Ask a partner to measure your final position from start (displacement) and total steps (distance).', 'Compute both quantities numerically: displacement = +2 steps, distance = 8 steps.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "A ball is thrown up and caught at the same point after 4 s. The ball went up 20 m and down 20 m.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'speed with a direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add a.' },
                { id: 'b', prompt: 'Design a simple experiment using a toy car, a measuring tape, and a stopwatch to demonstrate the difference between average speed and average velocity.', answer: 'Procedure: Mark a start line',
                  options: ['Procedure: Mark a start line', 'speed with a direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add a.' }
          ],
            remediations: { 'average-velocity-is-just-speed': { steps: ['Revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing displacement vectors for back-and-forth.', 'Do a physical activity: walk 5 steps forward, 3 steps back.', 'Ask a partner to measure your final position from start (displacement) and total steps (distance).', 'Compute both quantities numerically: displacement = +2 steps, distance = 8 steps.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_11', difficulty: 'standard',
          question: 'Kinematic problem solving in straight line motion is the systematic application.',
          hint: 'If stuck, review the velocity-time graph derivation in c9_physics_ch2_8 and the worked.',
          misconception: 'Students often treat the three equations of motion as interchangeable recipes: they pick the one that contains the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kinematic problem solving in straight line motion is the systematic application of the',
                  options: ['Kinematic problem solving in straight line motion is the systematic application of the', 'The three equations of motion are mathematical relationships that connect the five', 'Equations of Motion Applications involve using the three kinematic equations (v = u + at,', 'A velocity-time graph plots velocity (m/s) on the vertical axis against time (s) on the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the three equations of motion as interchangeable recipes: they pick the one that contains the unknown they want,.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student write a "Known/Unknown" table for every problem: list u, v, a, t, s with values or "?".', 'Ask them to circle which equation contains ONLY one unknown.', 'Practice with 5 problems where multiple equations *could* work but only one uses the given knowns directly.', 'Use a flowchart: "If u, a, t known → s = ut + ½at²; if u, a, s known → v² = u² + 2as; etc." 5.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_10', difficulty: 'standard',
          question: 'Uniform circular motion is the motion of an object traveling at a constant.',
          hint: 'Revisit c9_physics_ch2_3 (velocity as vector) and c8_physics_ch3_12 (Newton\'s first law).',
          misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.',
          parts: [
                { id: 'a', prompt: 'A particle moves in uniform circular motion with radius 0.5 m and speed 2 m/s. State the magnitude and direction of its centripetal acceleration.', answer: 'Magnitude: \\(a_c = \\frac{v^2}{r} = \\frac{(2\\ \\text{m/s})^2}{0.5\\ \\text{m}} = 8\\',
                  options: ['Magnitude: \\(a_c = \\frac{v^2}{r} = \\frac{(2\\ \\text{m/s})^2}{0.5\\ \\text{m}} = 8\\', 'centrifugal force', 'a real "centrifugal force" pushes the object outward during circular motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' },
                { id: 'b', prompt: 'A stone tied to a string is whirled in a horizontal circle at constant speed. The string suddenly breaks.', answer: 'The stone moves in a straight line tangent to the circle at the point of release',
                  options: ['The stone moves in a straight line tangent to the circle at the point of release', 'it flies radially outward', 'it spirals out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' }
          ],
            remediations: { 'a-real-centrifugal-force-pushes': { steps: ['Demonstrate with a ball on a string — when released, it flies tangentially, not radially outward.', 'Have the student sit on a rotating office chair holding a heavy book; when they pull the book inward, they spin faster.', 'Draw free-body diagrams for a car turning (inertial frame: only inward friction/normal force; rotating frame: add.', 'Practice identifying real vs. fictitious forces in 3 scenarios: (a) mud flying off a bicycle tyre, (b) water staying in.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In uniform circular motion, the acceleration is zero because the speed is constant." Evaluate this claim and provide a counter-argument.', answer: 'The claim is false',
                  options: ['The claim is false', 'centrifugal force', 'a real "centrifugal force" pushes the object outward during circular motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' },
                { id: 'b', prompt: 'Design a simple experiment using a rubber stopper, string, and hanging masses to verify the relationship \\(F_c \\propto v^2\\) for uniform circular motion.', answer: 'Independent variable: hanging mass (provides \\(F_c = mg\\))',
                  options: ['Independent variable: hanging mass (provides \\(F_c = mg\\))', 'centrifugal force', 'a real "centrifugal force" pushes the object outward during circular motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' }
          ],
            remediations: { 'a-real-centrifugal-force-pushes': { steps: ['Demonstrate with a ball on a string — when released, it flies tangentially, not radially outward.', 'Have the student sit on a rotating office chair holding a heavy book; when they pull the book inward, they spin faster.', 'Draw free-body diagrams for a car turning (inertial frame: only inward friction/normal force; rotating frame: add.', 'Practice identifying real vs. fictitious forces in 3 scenarios: (a) mud flying off a bicycle tyre, (b) water staying in.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
