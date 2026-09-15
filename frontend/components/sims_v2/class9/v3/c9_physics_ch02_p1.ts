import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch02_p1: SimDef = {
    id: 'v3_c9_physics_ch02_p1',
    title: 'Motion',
    subtitle: 'Distance, displacement, speed, velocity — the vocabulary that turns \'it moved\' into physics.',
    classLevel: 9, subject: 'physics', topic: 'Motion · Part 1/2',
    chapters: ['c9_physics_ch02'],
    nodeIds: ['c9_physics_ch2_1', 'c9_physics_ch2_10', 'c9_physics_ch2_11', 'c9_physics_ch2_2', 'c9_physics_ch2_3', 'c9_physics_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports analyst timing a sprinter', intro: 'Two runners finish 100m together — but one\'s speed graph tells a completely different story. Your job: read the graph and find who actually ran faster when.', goal: 'Read and build distance-time and velocity-time graphs — extract speed, acceleration and displacement on sight.' },
    discovery: {
        question: 'You drive 40 km to school and back home. Odometer says 80 km. A physicist says your displacement is zero. Who\'s right?',
        options: ['Both — displacement measures position change, not travel', 'The odometer — distance is what matters', 'The physicist — the trip was wasted', 'Neither — displacement is always half the distance'],
        answer: 'Both — displacement measures position change, not travel',
        hook: 'Distance and displacement are different questions — one asks \'how far did you travel\', the other \'how far did you end up\'.',
    },
    teaching: [
        { title: 'Distance and Displacement: Difference', text: 'Distance is a scalar quantity measuring the total path length traveled by an object, with SI unit meter (m).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch2_1', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'On the motion lab: draw a velocity-time graph for a car that speeds up, cruises, and brakes — read the displacement from the area.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c9_physics_ch2_1', title: 'Distance and Displacement: Difference',
          caseStudy: { intro: 'Imagine a student walking from the school gate to the library, then to the canteen, and back to the gate.',
            decisions: [{ prompt: 'A car moves 50 m east, then 30 m west. What is the distance traveled and the displacement of the car? State the SI unit for each.', options: [
                { text: 'Distance = 80 m, Displacement = 20 m east', outcome: 'Distance = 80 m, Displacement = 20 m east. SI unit for both is meter (m).' },
                { text: 'distance with a direction sign', outcome: 'Not quite — Students think displacement is "distance with a direction sign" and calculate it by adding signed.', reveals: 'displacement-is-distance-with-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_10', title: 'Circular Motion: Uniform Circular Motion',
          scaffold: { problem: 'A ceiling fan has blades of length 0.6 m. It rotates at 120 revolutions per minute (rpm).',
            steps: [
            { text: 'Identify given quantities: radius r = 0.6 m, rotational speed = 120 rpm.' },
            { text: 'Identify formulas needed: \\(\\omega = \\frac{2\\pi}{T}\\), \\(v = \\omega r\\), \\(a_c = \\omega^2 r\\).' },
            { text: 'Compute angular velocity: \\(\\omega = \\frac{2\\pi}{0.5} = 4\\pi \\approx 12.57\\ \\text{rad/s}\\).' },
            { text: 'Compute linear speed: \\(v = \\omega r = 12.57 \\times 0.6 = 7.54\\ \\text{m/s}\\).' },
            { text: 'Compute centripetal acceleration: \\(a_c = \\omega^2 r = (12.57)^2 \\times 0.6 = 158 \\times 0.6 = 94.8\\ \\text{m/s}^2\\).', faded: true, blankAnswer: '(a) \\(\\omega = 4\\pi \\approx 12.6\\ \\text{rad/s}\\), (b) \\(v.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_11', title: 'Motion in a Straight Line: Kinematic Problem Solving',
          scaffold: { problem: 'A car on the Mumbai-Pune expressway enters a straight stretch at 20 m/s.',
            steps: [
            { text: 'Identify given quantities with units: u = 20 m/s, a = 1.2 m/s², t = 10 s. Unknowns: v, s, v_avg.' },
            { text: 'Choose equations: (a) v = u + at (contains u, a, t, v). (b) s = ut + ½at² (contains u, a, t, s).' },
            { text: 'Substitute values: (a) v = 20 + (1.2)(10) = 20 + 12 = 32 m/s. (b) s = (20)(10) + ½(1.2)(10)² = 200 + 0.6×100 = 200 + 60.' },
            { text: 'Unit check: (a) m/s + m/s²·s = m/s ✓. (b) m/s·s + m/s²·s² = m + m = m ✓. (c) (m/s + m/s)/2 = m/s ✓.' },
            { text: 'Physical reasonableness: A car accelerating from 72 km/h to 115 km/h in 10 s is plausible; displacement 260 m in 10.', faded: true, blankAnswer: '(a) 32 m/s, (b) 260 m, (c) 26 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_2', title: 'Speed: Definition and Formula',
          scaffold: { problem: 'Ravi cycles from his home to the market, a distance of 3.6 km, in 20 minutes. He returns home along the same route in 15 minutes.',
            steps: [
            { text: 'Identify given quantities: distance one way = 3.6 km = 3600 m; time forward = 20 min = 1200 s; time return = 15 min.' },
            { text: 'Total distance = 3600 m + 3600 m = 7200 m. Total time = 1200 s + 900 s = 2100 s.' },
            { text: 'Apply average speed formula: v_avg = total distance / total time = 7200 m / 2100 s.' },
            { text: 'Compute: 7200 / 2100 = 72/21 = 24/7 ≈ 3.4286 m/s. Track units: m/s remains.' },
            { text: 'Verify reasonableness: 3.43 m/s ≈ 12.3 km/h, a plausible cycling speed. State answer with units.', faded: true, blankAnswer: '3.43 m/s (or 24/7 m/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_3', title: 'Velocity: Definition and Formula',
          scaffold: { problem: 'A delivery scooter starts from a warehouse, goes 3.6 km north to a shop in 12 minutes, then returns 1.2 km south to a restaurant in 4.',
            steps: [
            { text: 'Identify given quantities and convert to SI units. First leg: displacement = +3.6 km = +3600 m (north positive), time.' },
            { text: 'State the formula for average velocity: v_avg = total displacement / total time.' },
            { text: 'Compute total displacement: Δx_total = (+3600 m) + (-1200 m) = +2400 m.' },
            { text: 'Substitute into formula: v_avg = 2400 m / 960 s = 2.5 m/s. The positive sign indicates northward direction.' },
            { text: 'Verify reasonableness: The scooter ends 2.4 km north in 16 minutes (960 s).', faded: true, blankAnswer: '2.5 m/s north' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch2_4', title: 'Uniform and Non-Uniform Motion',
          caseStudy: { intro: 'Observe a ceiling fan rotating at constant speed – the blades cover equal angles in equal time but their direction changes continuously.',
            decisions: [{ prompt: 'A car moves on a straight highway. Its odometer readings at 10:00 AM, 10:05 AM, 10:10 AM, and 10:15 AM are 1200 km, 1205 km, 1210 km, and.', options: [
                { text: 'Yes, the car is in uniform motion', outcome: 'Yes, the car is in uniform motion because it covers equal displacements (5 km) in equal time.' },
                { text: 'uniform motion = constant speed', outcome: 'Not quite — Students often think "uniform motion = constant speed" and classify uniform circular motion.', reveals: 'uniform-motion-constant-speed-and' },
                { text: 'speed is constant but not checking direction', outcome: 'Not quite — Students often think "uniform motion = constant speed" and classify uniform circular motion.', reveals: 'uniform-motion-constant-speed-and' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'On a school hike, a group walks 3 km north to a stream, then 4 km east to a camp. Tallying the day, a student writes \'we are 7 km from where we started — same as the distance we walked.\'',
            decisions: [{ prompt: 'Is the straight-line separation 7 km?', options: [
                { text: 'No — 7 km is the distance, the scalar total of path walked. Displacement is the vector start-to-finish: √(3² + 4²) = 5 km northeast. Distance collects every step; displacement cares only about endpoints.', outcome: 'This applies the scalar-versus-vector split and the Pythagorean straight line between the two positions.' },
                { text: 'The tally is right — distance and displacement are two words for the same measurement.', outcome: 'They diverge the moment the path bends: distance adds legs (3 + 4), displacement draws the straight line between ends (5).', reveals: 'distance-is-displacement' },
                { text: 'Displacement is 7 − 5 = 2 km, the difference between the two legs.', outcome: 'Subtracting legs measures nothing here; the net change is the hypotenuse of the 3-4 right triangle, 5 km.', reveals: 'subtract-the-legs' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Graphs are where motion becomes readable — every GPS, every crash test, every rocket trajectory is a story told in slopes and areas.',
            decisions: [{ prompt: 'What comes next? Motion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Motion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch2_1', difficulty: 'standard',
          question: 'Distance is a scalar quantity measuring the total path length traveled by.',
          hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force.',
          misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths.',
          parts: [
                { id: 'a', prompt: 'A car moves 50 m east, then 30 m west. What is the distance traveled and the displacement of the car? State the SI unit for each.', answer: 'Distance = 80 m, Displacement = 20 m east',
                  options: ['Distance = 80 m, Displacement = 20 m east', 'distance with a direction sign'],
                  hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force: Definition as Push.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'b', prompt: 'A cyclist rides 3 km north, then 4 km east. Calculate the distance traveled and the magnitude of displacement. (Use Pythagoras for displacement magnitude.)', answer: 'Distance = 3 km + 4 km = 7 km',
                  options: ['Distance = 3 km + 4 km = 7 km', 'distance with a direction sign'],
                  hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force: Definition as Push.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'c', prompt: 'A particle moves on a number line: starts at x = -2 m, goes to x = +5 m, then to x = -1 m.', answer: 'Distance = |5 - (-2)| + |-1 - 5| = 7 + 6 = 13 m',
                  options: ['Distance = |5 - (-2)| + |-1 - 5| = 7 + 6 = 13 m', 'distance with a direction sign'],
                  hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force: Definition as Push.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' }
          ],
            remediations: { 'displacement-is-distance-with-a': { steps: ['Draw a large number line on floor with tape.', 'Student starts at 0, walks to +3, then to -1.', 'Class measures each segment (3 m, 4 m) and totals 7 m (distance).', 'Teacher stretches a string from start (0) to end (-1): length 1 m (displacement magnitude).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A boy walks 10 m forward, then 10 m backward. Distance = 0 m, Displacement = 20 m." Evaluate this solution.', answer: 'The solution swaps the two quantities',
                  options: ['The solution swaps the two quantities', 'distance with a direction sign'],
                  hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force: Definition as Push.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'b', prompt: 'Design a simple experiment using a meter scale, a toy car, and tape to demonstrate that distance ≥ |displacement|.', answer: 'Procedure: Mark start point A',
                  options: ['Procedure: Mark start point A', 'distance with a direction sign'],
                  hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force: Definition as Push.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' }
          ],
            remediations: { 'displacement-is-distance-with-a': { steps: ['Draw a large number line on floor with tape.', 'Student starts at 0, walks to +3, then to -1.', 'Class measures each segment (3 m, 4 m) and totals 7 m (distance).', 'Teacher stretches a string from start (0) to end (-1): length 1 m (displacement magnitude).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_10', difficulty: 'standard',
          question: 'Uniform circular motion is the motion of an object traveling at a constant.',
          hint: 'Revisit c9_physics_ch2_3 (velocity as vector) and c8_physics_ch3_12 (Newton\'s first law).',
          misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.',
          parts: [
                { id: 'a', prompt: 'A particle moves in uniform circular motion with radius 0.5 m and speed 2 m/s. State the magnitude and direction of its centripetal acceleration.', answer: 'Magnitude: \\(a_c = \\frac{v^2}{r} = \\frac{(2\\ \\text{m/s})^2}{0.5\\ \\text{m}} = 8\\',
                  options: ['Magnitude: \\(a_c = \\frac{v^2}{r} = \\frac{(2\\ \\text{m/s})^2}{0.5\\ \\text{m}} = 8\\', 'centrifugal force', 'acceleration is zero', 'a real "centrifugal force" pushes the object outward during circular motion'],
                  hint: 'Revisit c9_physics_ch2_3 (velocity as vector) and c8_physics_ch3_12 (Newton\'s first law) — the core.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' },
                { id: 'b', prompt: 'A stone tied to a string is whirled in a horizontal circle at constant speed. The string suddenly breaks.', answer: 'The stone moves in a straight line tangent to the circle at the point of release',
                  options: ['The stone moves in a straight line tangent to the circle at the point of release', 'it flies radially outward', 'it spirals out', 'centrifugal force'],
                  hint: 'Revisit c9_physics_ch2_3 (velocity as vector) and c8_physics_ch3_12 (Newton\'s first law) — the core.',
                  misconception: 'Students believe a real "centrifugal force" pushes the object outward during circular motion.' }
          ],
            remediations: { 'a-real-centrifugal-force-pushes': { steps: ['Demonstrate with a ball on a string — when released, it flies tangentially, not radially outward.', 'Have the student sit on a rotating office chair holding a heavy book; when they pull the book inward, they spin faster.', 'Draw free-body diagrams for a car turning (inertial frame: only inward friction/normal force; rotating frame: add.', 'Practice identifying real vs. fictitious forces in 3 scenarios: (a) mud flying off a bicycle tyre, (b) water staying.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_11', difficulty: 'standard',
          question: 'Kinematic problem solving in straight line motion is the systematic application.',
          hint: 'If stuck, review the velocity-time graph derivation in c9_physics_ch2_8 and the worked.',
          misconception: 'Students often treat the three equations of motion as interchangeable recipes: they pick the one that contains the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kinematic problem solving in straight line motion is the systematic application of the',
                  options: ['Kinematic problem solving in straight line motion is the systematic application of the', 'Distance is a scalar quantity measuring the total path length traveled by an object, with', 'Uniform circular motion is the motion of an object traveling at a constant speed along a', 'Speed is a scalar physical quantity defined as the rate of change of distance travelled'],
                  hint: 'If stuck, review the velocity-time graph derivation in c9_physics_ch2_8 and the worked examples.',
                  misconception: 'Students often treat the three equations of motion as interchangeable recipes: they pick the one that contains the unknown they want.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student write a "Known/Unknown" table for every problem: list u, v, a, t, s with values or "?".', 'Ask them to circle which equation contains ONLY one unknown.', 'Practice with 5 problems where multiple equations *could* work but only one uses the given knowns directly.', 'Use a flowchart: "If u, a, t known → s = ut + ½at²; if u, a, s known → v² = u² + 2as; etc." 5.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_2', difficulty: 'standard',
          question: 'Speed is a scalar physical quantity defined as the rate of change of distance.',
          hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) to clarify that speed uses.',
          misconception: 'Students believe that average speed equals the arithmetic mean of individual speeds (v_avg = (v1 + v2)/2) regardless.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speed is a scalar physical quantity defined as the rate of change of distance travelled',
                  options: ['Speed is a scalar physical quantity defined as the rate of change of distance travelled', 'Distance is a scalar quantity measuring the total path length traveled by an object, with', 'Uniform circular motion is the motion of an object traveling at a constant speed along a', 'Kinematic problem solving in straight line motion is the systematic application of the'],
                  hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) to clarify that speed uses distance.',
                  misconception: 'Students believe that average speed equals the arithmetic mean of individual speeds (v_avg = (v1 + v2)/2) regardless of time or distance.' }
          ],
            remediations: { 'average-speed-equals-the-arithmetic': { steps: ['Have the student walk 10 m at a slow pace, measure time. Then walk 10 m at a fast pace, measure time.', 'Ask them to compute the average speed for the total 20 m using (total distance)/(total time).', 'Ask them to compute the arithmetic mean of the two speeds.', 'Compare the two results; they will differ.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_3', difficulty: 'standard',
          question: 'Velocity is a vector quantity defined as the rate of change of displacement.',
          hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing.',
          misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided.',
          parts: [
                { id: 'a', prompt: 'State the formula for average velocity and its SI unit. How does it differ from the formula for average speed?', answer: 'Average velocity = displacement / time taken (v = Δx/Δt), SI unit: m/s',
                  options: ['Average velocity = displacement / time taken (v = Δx/Δt), SI unit: m/s', 'speed with a direction'],
                  hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing number-line.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add.' },
                { id: 'b', prompt: 'A car travels 100 m east in 10 s, then 50 m west in 5 s. Calculate its average speed and average velocity. Explain why the two values are different.', answer: 'Total distance = 150 m, total time = 15 s → average speed = 10 m/s',
                  options: ['Total distance = 150 m, total time = 15 s → average speed = 10 m/s', 'speed with a direction'],
                  hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing number-line.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add.' },
                { id: 'c', prompt: 'A train moves along a straight track. It covers 2.4 km in 2 minutes, then reverses direction and covers 1.2 km in 1 minute.', answer: 'Step 1: Convert all units to SI',
                  options: ['Step 1: Convert all units to SI', 'speed with a direction'],
                  hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing number-line.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add.' },
                { id: 'd', prompt: 'Two runners, A and B, start at the same point on a 400 m circular track. A runs at 5 m/s, B runs at 4 m/s in the same direction.', answer: 'Both runners have completed integer numbers of laps?',
                  options: ['Both runners have completed integer numbers of laps?', 'speed with a direction'],
                  hint: 'If stuck, revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing number-line.',
                  misconception: 'Students often think average velocity is just "speed with a direction" and calculate it as total distance divided by time, then add.' }
          ],
            remediations: { 'average-velocity-is-just-speed': { steps: ['Revisit c9_physics_ch2_1 (Distance and Displacement) and practice drawing displacement vectors for back-and-forth.', 'Do a physical activity: walk 5 steps forward, 3 steps back.', 'Ask a partner to measure your final position from start (displacement) and total steps (distance).', 'Compute both quantities numerically: displacement = +2 steps, distance = 8 steps.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_4', difficulty: 'standard',
          question: 'Uniform motion is motion in which an object covers equal displacements in equal.',
          hint: 'If stuck, review "Velocity: Definition and Formula" (c9_physics_ch2_3) and practice.',
          misconception: 'Students often think "uniform motion = constant speed" and classify uniform circular motion as uniform motion.',
          parts: [
                { id: 'a', prompt: 'A car moves on a straight highway. Its odometer readings at 10:00 AM, 10:05 AM, 10:10 AM, and 10:15 AM are 1200 km, 1205 km, 1210 km, and 1215 km respectively.', answer: 'Yes, the car is in uniform motion',
                  options: ['Yes, the car is in uniform motion', 'uniform motion = constant speed', 'speed is constant but not checking direction'],
                  hint: 'If stuck, review "Velocity: Definition and Formula" (c9_physics_ch2_3) and practice identifying.',
                  misconception: 'Students often think "uniform motion = constant speed" and classify uniform circular motion as uniform motion.' },
                { id: 'b', prompt: 'A boy runs around a square track of side 50 m at a constant speed of 5 m/s. Is his motion uniform or non-uniform?', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'uniform motion = constant speed'],
                  hint: 'If stuck, review "Velocity: Definition and Formula" (c9_physics_ch2_3) and practice identifying.',
                  misconception: 'Students often think "uniform motion = constant speed" and classify uniform circular motion as uniform motion.' },
                { id: 'c', prompt: 'An object moves along a straight line. Its displacements in successive 3-second intervals are: 6 m, 6 m, 6 m, 9 m, 6 m.', answer: 'First 12 s: total displacement = 6+6+6+6 = 24 m (four intervals of 3 s each)',
                  options: ['First 12 s: total displacement = 6+6+6+6 = 24 m (four intervals of 3 s each)', 'uniform motion = constant speed'],
                  hint: 'If stuck, review "Velocity: Definition and Formula" (c9_physics_ch2_3) and practice identifying.',
                  misconception: 'Students often think "uniform motion = constant speed" and classify uniform circular motion as uniform motion.' },
                { id: 'd', prompt: 'Two distance-time graphs are shown: Graph A is a straight line passing through origin with slope 4 m/s. Graph B is a curve that gets steeper with time.', answer: 'Which graph represents uniform motion?',
                  options: ['Which graph represents uniform motion?', 'uniform motion = constant speed', 'Graph B is uniform'],
                  hint: 'If stuck, review "Velocity: Definition and Formula" (c9_physics_ch2_3) and practice identifying.',
                  misconception: 'Students often think "uniform motion = constant speed" and classify uniform circular motion as uniform motion.' }
          ],
            remediations: { 'uniform-motion-constant-speed-and': { steps: ['Revisit the definition of velocity (c9_physics_ch2_3) – emphasize it is a vector.', 'Perform a simple activity: walk in a straight line at constant pace (uniform), then walk in a circle at same pace.', 'Note the feeling of changing direction.', 'Draw velocity vectors at different points on a circular path; see they point in different directions.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
