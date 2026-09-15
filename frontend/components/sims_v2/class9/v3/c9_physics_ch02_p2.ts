import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch02_p2: SimDef = {
    id: 'v3_c9_physics_ch02_p2',
    title: 'Motion',
    subtitle: 'Distance, displacement, speed, velocity — the vocabulary that turns \'it moved\' into physics.',
    classLevel: 9, subject: 'physics', topic: 'Motion · Part 2/2',
    chapters: ['c9_physics_ch02'],
    nodeIds: ['c9_physics_ch2_5', 'c9_physics_ch2_6', 'c9_physics_ch2_7', 'c9_physics_ch2_8', 'c9_physics_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports analyst timing a sprinter', intro: 'Two runners finish 100m together — but one\'s speed graph tells a completely different story. Your job: read the graph and find who actually ran faster when.', goal: 'Read and build distance-time and velocity-time graphs — extract speed, acceleration and displacement on sight.' },
    discovery: {
        question: 'You drive 40 km to school and back home. Odometer says 80 km. A physicist says your displacement is zero. Who\'s right?',
        options: ['Both — displacement measures position change, not travel', 'The odometer — distance is what matters', 'The physicist — the trip was wasted', 'Neither — displacement is always half the distance'],
        answer: 'Both — displacement measures position change, not travel',
        hook: 'Distance and displacement are different questions — one asks \'how far did you travel\', the other \'how far did you end up\'.',
    },
    teaching: [
        { title: 'Acceleration: Definition and Units', text: 'Acceleration is the rate of change of velocity with respect to time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch2_5', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'On the motion lab: draw a velocity-time graph for a car that speeds up, cruises, and brakes — read the displacement from the area.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_5', title: 'Acceleration: Definition and Units',
          scaffold: { problem: 'A school bus starts from rest and attains a velocity of 54 km/h in 10 seconds. Find its acceleration in SI units.',
            steps: [
            { text: 'Identify given quantities: u = 0 (starts from rest), v = 54 km/h, t = 10 s. Required: a in m/s².' },
            { text: 'Convert final velocity to SI units: 54 km/h = 54 × (1000 m / 3600 s) = 54 × (5/18) = 15 m/s.' },
            { text: 'Use formula a = (v - u)/t. Substitute values with units: a = (15 m/s - 0 m/s) / 10 s.' },
            { text: 'Compute: a = 15/10 = 1.5. Unit analysis: (m/s) / s = m/s².' },
            { text: 'Verify reasonableness: A bus accelerating at 1.5 m/s² reaches 54 km/h in 10 s, which is realistic for a heavy vehicle.', faded: true, blankAnswer: '1.5 m/s²' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_6', title: 'Distance-Time Graphs and Their Interpretation',
          scaffold: { problem: 'A school bus leaves the depot at 7:00 AM. The following data is recorded: at 7:00 AM (t=0 s), distance = 0 km; at 7:10 AM (t=600 s).',
            steps: [
            { text: 'Identify given quantities — time values: 0 s, 600 s, 1200 s, 1800 s; distance values: 0 km, 6 km, 12 km, 18 km.' },
            { text: 'The formula is speed = slope = Δd/Δt. Since points lie on a straight line through origin, choose any two points.' },
            { text: 'Substitute values: Δd = 18000 m - 0 m = 18000 m; Δt = 1800 s - 0 s = 1800 s. Speed = 18000 m / 1800 s.' },
            { text: 'Compute: 18000 / 1800 = 10. Units: m/s. The bus travels at constant speed 10 m/s.' },
            { text: 'Verify reasonableness: 10 m/s = 36 km/h, a typical city bus speed. The straight line confirms uniform motion.', faded: true, blankAnswer: '10 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_7', title: 'Velocity-Time Graphs and Their Interpretation',
          scaffold: { problem: 'A motorcyclist starts from rest and accelerates uniformly at 2 m/s² for 5 s.',
            steps: [
            { text: 'Identify given quantities: Phase 1: u=0, a=2 m/s², t=5 s. Phase 2: constant v, t=10 s.' },
            { text: 'Calculate velocities at key points. Phase 1 end: v = u + at = 0 + 2×5 = 10 m/s. Phase 2: v = 10 m/s constant.' },
            { text: 'Sketch v-t graph: (0,0) to (5,10) straight line (slope 2), then horizontal to (15,10), then straight line to (19,0).' },
            { text: 'Compute area under graph (displacement). Area = triangle (0-5 s) + rectangle (5-15 s) + triangle (15-19 s) = ½×5×10.' },
            { text: 'Verify: All velocities positive, so distance = displacement = 145 m. Reasonable for a motorcycle over 19 s.', faded: true, blankAnswer: '145 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_8', title: 'Equations of Motion: Derivation',
          scaffold: { problem: 'A scooterist in Bengaluru is moving at 10 m/s on a straight road. He applies brakes and decelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Identify given quantities with units: initial velocity u = 10 m/s, final velocity v = 0 m/s (stops), acceleration.' },
            { text: 'Choose appropriate equations. For s, use v² = u² + 2as (no t needed). For t, use v = u + at.' },
            { text: 'Substitute values into v² = u² + 2as: 0² = 10² + 2(-2)s → 0 = 100 - 4s.' },
            { text: 'Solve for s: 4s = 100 → s = 25 m. Unit check: (m/s)² / (m/s²) = m. Correct.' },
            { text: 'Substitute into v = u + at: 0 = 10 + (-2)t → 2t = 10 → t = 5 s. Unit check: (m/s) / (m/s²) = s. Correct.' },
            { text: 'Verify reasonableness: A scooter at 36 km/h stopping in 25 m and 5 s is realistic for moderate braking.', faded: true, blankAnswer: 'Displacement = 25 m; Time to stop = 5 s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_9', title: 'Equations of Motion: Applications',
          scaffold: { problem: 'A car traveling at 54 km/h applies brakes and decelerates uniformly at 2 m/s².',
            steps: [
            { text: 'Convert u = 54 km/h = 54 × (5/18) = 15 m/s. v = 0 (stops), a = -2 m/s² (deceleration opposite to motion).' },
            { text: '(a) Use v = u + at → 0 = 15 + (-2)t → t = 7.5 s. (b) Use v² = u² + 2as → 0 = 15² + 2(-2)s → s = 225/4 = 56.25 m.' },
            { text: '(c) Distance in nth second = u + a(n - ½). For 3rd second: s₃ = 15 + (-2)(3 - 0.5) = 15 - 5 = 10 m.' },
            { text: 'Check units: all in m, m/s, s. Check reasonableness: car stops in 7.5 s, distance ~56 m (about 13 car lengths).' },
            { text: 'Final answers: (a) 7.5 s, (b) 56.25 m, (c) 10 m.', faded: true, blankAnswer: '(a) 7.5 s, (b) 56.25 m, (c) 10 m' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'On a school hike, a group walks 3 km north to a stream, then 4 km east to a camp. Tallying the day, a student writes \'we are 7 km from where we started — same as the distance we walked.\'',
            decisions: [{ prompt: 'Is the straight-line separation 7 km?', options: [
                { text: 'No — 7 km is the distance, the scalar total of path walked. Displacement is the vector start-to-finish: √(3² + 4²) = 5 km northeast. Distance collects every step; displacement cares only about endpoints.', outcome: 'This applies the scalar-versus-vector split and the Pythagorean straight line between the two positions.' },
                { text: 'The tally is right — distance and displacement are two words for the same measurement.', outcome: 'They diverge the moment the path bends: distance adds legs (3 + 4), displacement draws the straight line between ends (5).', reveals: 'distance-is-displacement' },
                { text: 'Displacement is 7 − 5 = 2 km, the difference between the two legs.', outcome: 'Subtracting legs measures nothing here; the net change is the hypotenuse of the 3-4 right triangle, 5 km.', reveals: 'subtract-the-legs' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Graphs are where motion becomes readable — every GPS, every crash test, every rocket trajectory is a story told in slopes and areas.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch2_5', difficulty: 'standard',
          question: 'Acceleration is the rate of change of velocity with respect to time.',
          hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion.',
          misconception: 'Students often think negative acceleration always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'State the SI unit of acceleration and write the formula for average acceleration when an object changes its velocity from u to v in time t.', answer: 'SI unit: m/s²',
                  options: ['SI unit: m/s²', 'slowing down', 'deceleration', 'negative acceleration always means "slowing down"'],
                  hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion (c9_physics_ch2_4).',
                  misconception: 'Students often think negative acceleration always means "slowing down".' },
                { id: 'b', prompt: 'A car moves along a straight road with a constant velocity of 30 km/h. What is its acceleration?', answer: 'Acceleration is zero',
                  options: ['Acceleration is zero', 'moving fast', 'slowing down', 'deceleration'],
                  hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion (c9_physics_ch2_4).',
                  misconception: 'Students often think negative acceleration always means "slowing down".' },
                { id: 'c', prompt: 'A motorbike starting from rest reaches a velocity of 72 km/h in 5 seconds. Calculate its acceleration in SI units. Show all unit conversions.', answer: 'Given: u = 0, v = 72 km/h = 72 × (5/18) = 20 m/s, t = 5 s',
                  options: ['Given: u = 0, v = 72 km/h = 72 × (5/18) = 20 m/s, t = 5 s', 'slowing down', 'deceleration', 'negative acceleration always means "slowing down"'],
                  hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion (c9_physics_ch2_4).',
                  misconception: 'Students often think negative acceleration always means "slowing down".' },
                { id: 'd', prompt: 'Two objects A and B start from rest. Object A reaches 10 m/s in 2 s; object B reaches 15 m/s in 3 s. Compare their accelerations.', answer: 'a_A = (10-0)/2 = 5 m/s²',
                  options: ['a_A = (10-0)/2 = 5 m/s²', 'B has greater acceleration', 'slowing down', 'deceleration'],
                  hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion (c9_physics_ch2_4).',
                  misconception: 'Students often think negative acceleration always means "slowing down".' }
          ],
            remediations: { 'negative-acceleration-always-means-slowing': { steps: ['Draw a coordinate axis on paper.', 'Show a car moving right (positive velocity) with positive acceleration (speeding up) and negative acceleration (slowing.', 'Show the same car moving left (negative velocity) with negative acceleration (speeding up) and positive acceleration.', 'Emphasise: "Slowing down" means acceleration is opposite to velocity; "speeding up" means acceleration is in the same.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think negative acceleration always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'A student writes: "A ball thrown vertically upward has zero acceleration at the highest point because its velocity becomes zero momentarily." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'slowing down', 'deceleration', 'negative acceleration always means "slowing down"'],
                  hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion (c9_physics_ch2_4).',
                  misconception: 'Students often think negative acceleration always means "slowing down".' }
          ],
            remediations: { 'negative-acceleration-always-means-slowing': { steps: ['Draw a coordinate axis on paper.', 'Show a car moving right (positive velocity) with positive acceleration (speeding up) and negative acceleration (slowing.', 'Show the same car moving left (negative velocity) with negative acceleration (speeding up) and positive acceleration.', 'Emphasise: "Slowing down" means acceleration is opposite to velocity; "speeding up" means acceleration is in the same.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_6', difficulty: 'standard',
          question: 'A distance-time graph is a graphical representation plotting distance travelled.',
          hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform.',
          misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns".',
          parts: [
                { id: 'a', prompt: 'What physical quantity does the slope of a distance-time graph represent, and what are its SI units?', answer: 'The slope represents speed, with SI units of metres per second (m/s)',
                  options: ['The slope represents speed, with SI units of metres per second (m/s)', 'velocity', 'acceleration', 'returns'],
                  hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform vs non-uniform.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' },
                { id: 'b', prompt: 'A distance-time graph for a car shows a straight line passing through the origin with a slope of 15 m/s. After 20 seconds, the line becomes horizontal.', answer: 'The horizontal section means the car is at rest (speed = 0 m/s)',
                  options: ['The horizontal section means the car is at rest (speed = 0 m/s)', 'the car moves backwards', 'returns', 'moves backwards'],
                  hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform vs non-uniform.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' },
                { id: 'c', prompt: 'Two cyclists, A and B, start from the same point at the same time. Cyclist A\'s distance-time graph is a straight line with slope 5 m/s.', answer: 'Average speed = total distance / total time = 75 m / 15 s = 5 m/s for both',
                  options: ['Average speed = total distance / total time = 75 m / 15 s = 5 m/s for both', 'returns', 'moves backwards'],
                  hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform vs non-uniform.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' },
                { id: 'd', prompt: 'A student draws a distance-time graph for a ball thrown vertically upward and claims the graph goes up, then down, forming an inverted V shape.', answer: 'The error: distance travelled never decreases',
                  options: ['The error: distance travelled never decreases', 'returns', 'moves backwards'],
                  hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform vs non-uniform.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' }
          ],
            remediations: { 'a-distance-time-graph-can': { steps: ['Have the student walk 5 m forward, stop, then walk 5 m back to start.', 'Plot the actual distance-time data: t=0 s, d=0 m; t=5 s, d=5 m; t=10 s, d=10 m.', 'Contrast with a displacement-time graph for the same walk (goes up to +5 m, then down to 0 m).', 'Emphasise: "Distance never decreases — odometer in a car never rolls backward."'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_7', difficulty: 'standard',
          question: 'A velocity-time graph plots velocity (m/s) on the vertical axis against time.',
          hint: 'If stuck, revisit c9_physics_ch2_3 (velocity as vector) and c9_math_ch3_1 (slope and area.',
          misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'What does the slope of a velocity-time graph represent, and what is its SI unit?', answer: 'The slope represents acceleration, with SI unit m/s²',
                  options: ['The slope represents acceleration, with SI unit m/s²', 'slope gives speed', 'unit is m/s', 'slowing down'],
                  hint: 'If stuck, revisit c9_physics_ch2_3 (velocity as vector) and c9_math_ch3_1 (slope and area of basic.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' },
                { id: 'b', prompt: 'A car\'s velocity-time graph is a horizontal line at 20 m/s from t=0 s to t=10 s, then a straight line dropping to 0 m/s at t=15 s.', answer: 'Step 1: Displacement = area under v-t graph',
                  options: ['Step 1: Displacement = area under v-t graph', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'If stuck, revisit c9_physics_ch2_3 (velocity as vector) and c9_math_ch3_1 (slope and area of basic.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' },
                { id: 'c', prompt: 'Two velocity-time graphs are given: Graph A is a straight line through origin with slope 2 m/s².', answer: 'Graph A: constant slope = 2 m/s², so acceleration at t=3 s is 2 m/s²',
                  options: ['Graph A: constant slope = 2 m/s², so acceleration at t=3 s is 2 m/s²', 'slowing down', 'a negative slope on a v-t graph always means "slowing down"'],
                  hint: 'If stuck, revisit c9_physics_ch2_3 (velocity as vector) and c9_math_ch3_1 (slope and area of basic.',
                  misconception: 'Students often think that a negative slope on a v-t graph always means "slowing down".' }
          ],
            remediations: { 'a-negative-slope-on-a': { steps: ['Remediation: (1) Draw a v-t graph for a ball thrown vertically upward (take upward as positive).', 'Mark points: launch (+v), top (0), landing (-v).', '(2) Ask: "Is the slope positive or negative at each point?" (Always negative = -g).', '(3) Ask: "Is the ball slowing down or speeding up on the way down?" (Speeding up, because velocity and acceleration.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_8', difficulty: 'standard',
          question: 'The three equations of motion are mathematical relationships that connect the.',
          hint: 'Review node c9_physics_ch2_7 (Velocity-Time Graphs) and practise calculating slope (a.',
          misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work.',
          parts: [
                { id: 'a', prompt: 'Two cyclists start from the same point on a straight road. Cyclist A moves with constant velocity 5 m/s.', answer: 'At t=2s: s_A = 5×2 = 10 m',
                  options: ['At t=2s: s_A = 5×2 = 10 m', 'B is always ahead', 'A is always ahead'],
                  hint: 'Review node c9_physics_ch2_7 (Velocity-Time Graphs) and practise calculating slope (a = Δv/Δt) and.',
                  misconception: 'Students believe the equations of motion (v = u + at, s = ut + ½at², v² = u² + 2as) are universal formulas that work for ANY motion.' }
          ],
            remediations: { 'the-equations-of-motion-v': { steps: ['Revisit the velocity-time graph (node c9_physics_ch2_7) and physically trace the area under a straight line vs a curved.', 'Perform a quick experiment: roll a ball down a rough incline (non-uniform acceleration due to friction changes) and.', 'Practice identifying "uniform acceleration" in word problems: circle the phrase "uniformly accelerated" or "constant.', 'Derive the equations again from the graph, emphasising that the straight line (constant slope) is the essential.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_9', difficulty: 'standard',
          question: 'Equations of Motion Applications involve using the three kinematic equations (v.',
          hint: 'Revisit c9_physics_ch2_8 (derivation from v-t graph) to see why each equation has.',
          misconception: 'Students believe the three equations can be used for ANY motion problem.',
          parts: [
                { id: 'a', prompt: 'Write the three equations of motion for uniformly accelerated motion along with the meaning of each symbol and its SI unit.', answer: 'The three equations are: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as',
                  options: ['The three equations are: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as', 'the three equations can be used for ANY motion problem'],
                  hint: 'Revisit c9_physics_ch2_8 (derivation from v-t graph) to see why each equation has a specific set.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' },
                { id: 'b', prompt: 'A scooter moving at 36 km/h applies brakes and stops uniformly in 5 seconds. Calculate (a) the deceleration in m/s², (b) the stopping distance in meters.', answer: 'Given: u = 36 km/h = 10 m/s, v = 0, t = 5 s',
                  options: ['Given: u = 36 km/h = 10 m/s, v = 0, t = 5 s', 'the three equations can be used for ANY motion problem'],
                  hint: 'Revisit c9_physics_ch2_8 (derivation from v-t graph) to see why each equation has a specific set.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' },
                { id: 'c', prompt: 'Two cars A and B start from rest. Car A accelerates at 2 m/s² for 10 s, then moves at constant velocity.', answer: 'Car A: v_A = 0 + 2×10 = 20 m/s',
                  options: ['Car A: v_A = 0 + 2×10 = 20 m/s', 'Car A is ahead because it accelerated longer', 'the three equations can be used for ANY motion problem'],
                  hint: 'Revisit c9_physics_ch2_8 (derivation from v-t graph) to see why each equation has a specific set.',
                  misconception: 'Students believe the three equations can be used for ANY motion problem.' }
          ],
            remediations: { 'the-three-equations-can-be': { steps: ['Draw a velocity-time graph for the problem – the equations are just area/slope of this graph.', 'Make a table: Knowns (u, v, a, t, s) with signs, Unknowns.', 'Pick the equation that has ONLY ONE unknown.', 'If motion has phases (acceleration then constant velocity), solve each phase separately and add displacements.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
