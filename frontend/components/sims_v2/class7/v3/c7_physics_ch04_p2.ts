import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch04_p2: SimDef = {
    id: 'v3_c7_physics_ch04_p2',
    title: 'Measurement of Time and Motion · Part 2/2',
    subtitle: 'Covers uniform and average linear motion calculations involving distance, speed, and.',
    classLevel: 7, subject: 'physics', topic: 'Measurement of Time and Motion · Part 2/2',
    chapters: ['c7_physics_ch04'],
    nodeIds: ['c7_physics_ch04_007', 'c7_physics_ch04_008', 'c7_physics_ch04_009', 'c7_physics_ch04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you ride your bicycle from your home to a nearby shop in your neighbourhood, you notice that it takes.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A sundial tells perfect time through a sunny afternoon — but a monsoon sky or midnight renders it blind. How did people measure the hours when the shadow disappeared?',
        options: ['With water clocks — a steady drip from a vessel marks equal time intervals no matter the weather', 'By guessing based on hunger', 'By counting heartbeats out loud', 'They simply waited for the sun to return'],
        answer: 'With water clocks — a steady drip from a vessel marks equal time intervals no matter the weather',
        hook: 'Every early clock ran on something that changes predictably — a shadow sliding round a gnomon, or water flowing at a steady rate. And watch the shadow shrink toward noon: it is shortest when the sun stands highest.',
    },
    teaching: [
        { title: 'Relationship Between Speed, Distance and Time', text: 'The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states that speed is equal to distance divided by time ($v = \\frac{d}{t}$), allowing us to calculate any one of these.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch04_007', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Build a water clock — pierce a vessel, measure how 300 mL drains in 15 minutes, then predict the drip time for 100 mL and verify the rate holds steady.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_007', title: 'Relationship Between Speed, Distance and Time',
          scaffold: { problem: 'A delivery scooter travels through a local market street at a constant speed of 8 m/s for 5 minutes.',
            steps: [
            { text: 'Identify given values and what needs to be calculated. Speed ($v$) = 8 m/s, Time ($t$) = 5 minutes. Find distance ($d$).' },
            { text: 'Check units for consistency. Time is given in minutes, but speed uses seconds.' },
            { text: 'Select the appropriate rearranged formula based on $v = \\frac{d}{t}$: $d = v \\times t$.' },
            { text: 'Substitute the values with their units into the formula: $d = 8 \\text{ m/s} \\times 300 \\text{ s}$.' },
            { text: 'Compute the numerical value and cancel the units ($\\text{m/s} \\times \\text{s} = \\text{m}$): $d = 2400 \\text{ m}$.', faded: true, blankAnswer: '2400 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_008', title: 'Uniform and Non-Uniform Linear Motion',
          scaffold: { problem: 'A metro train on a straight elevated track travels 150 meters in the first 10 seconds, 150 meters in the next 10 seconds, and 150 meters.',
            steps: [
            { text: 'Identify the given distance ($d$) and time ($t$) for each of the three intervals: Interval 1 ($d_1 = 150\\text{ m}, t_1.' },
            { text: 'State the formula for speed: $v = \\frac{d}{t}$ and verify units are in meters and seconds.' },
            { text: 'Substitute the values for each interval: $v_1 = \\frac{150\\text{ m}}{10\\text{ s}}$, $v_2 = \\frac{150\\text{ m}}{10\\text{.' },
            { text: 'Compute the values and track unit cancellation: $v_1 = 15\\text{ m/s}$, $v_2 = 15\\text{ m/s}$, $v_3 = 15\\text{ m/s}$.' },
            { text: 'Verify if the speeds are equal across all intervals. Since $15\\text{ m/s} = 15\\text{ m/s} = 15\\text{ m/s}$, the motion.', faded: true, blankAnswer: 'Uniform motion; speed in all intervals is 15 m/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_009', title: 'Calculating Distance and Time from Speed',
          scaffold: { problem: 'A delivery scooter in Mumbai travels at a uniform speed of $12\\text{ m/s}$ for $5\\text{ minutes}$.',
            steps: [
            { text: 'Identify given quantities: Speed ($v$) = $12\\text{ m/s}$, Time ($t$) = $5\\text{ minutes}$. What to find: Distance ($d$).' },
            { text: 'Check unit consistency: Time is given in minutes, but speed is in meters per second.' },
            { text: 'Select the appropriate rearranged formula: $Distance = Speed \\times Time$ ($d = v \\times t$).' },
            { text: 'Substitute values with units: $d = 12\\text{ m/s} \\times 300\\text{ s}$.' },
            { text: 'Compute arithmetic and track unit cancellation: $12 \\times 300 = 3600$, and $\\text{m/s} \\times \\text{s} = \\text{m}$.' },
            { text: 'Verify physical reasonableness: $3600\\text{ meters}$ ($3.6\\text{ km}$) in 5 minutes for a scooter is entirely.', faded: true, blankAnswer: '3600 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_010', title: 'Units of Speed and Their Conversions',
          scaffold: { problem: 'A school bus travels from Delhi to a nearby monument at a speed of $54\\text{ km/h}$. Express this speed in metres per second ($\\text{m/s}$).',
            steps: [
            { text: 'Identify the given quantity and target unit: Given speed $= 54\\text{ km/h}$, target unit $= \\text{m/s}$.' },
            { text: 'Recall the conversion factor from $\\text{km/h}$ to $\\text{m/s}$, which is multiplying by $\\frac{5}{18}$.' },
            { text: 'Set up the multiplication expression: $54 \\times \\frac{5}{18}$.' },
            { text: 'Cancel common factors and compute: $54 \\div 18 = 3$, then $3 \\times 5 = 15$.' },
            { text: 'Attach the correct unit and verify reasonableness: $15\\text{ m/s}$.', faded: true, blankAnswer: '15 m/s' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a history-cum-science exhibit, a class builds a sundial and a bottle water clock. On the day of the fair the sky is overcast, and the water clock seems to run fast when freshly filled. A visitor asks why both are \'failing.\'',
            decisions: [{ prompt: 'How should the students explain the behaviour?', options: [
                { text: 'The sundial needs direct sunlight travelling in straight lines to cast the gnomon\'s shadow, so clouds blind it; the water clock runs fast when full because a higher water level means higher pressure and a faster drip — neither device is broken, both are hostage to their physical inputs.', outcome: 'This ties each limitation to its mechanism — blocked light for the sundial, level-dependent flow for the water clock — which is exactly why later clocks needed regulation.' },
                { text: 'Both clocks are just poorly built — a properly made sundial and water clock keep perfect time in all weathers.', outcome: 'No craftsmanship removes the dependence: shadows need sunlight, and a draining vessel\'s flow slows as its level falls, so calibration is always needed.', reveals: 'old-clocks-are-perfect' },
                { text: 'The sundial is failing because cold cloudy air slows down shadow movement, and the water clock speeds up because warm water drips faster — it\'s all about temperature.', outcome: 'Clouds block light rather than slow shadows, and while temperature does change water flow, the fast start here comes from water pressure at high level, not warmth.', reveals: 'its-all-temperature' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch04_010', title: 'You made it',
          caseStudy: { intro: 'Before gears and batteries, time was measured by whatever moved steadily — a travelling shadow or a patient drip.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch04_007', difficulty: 'standard',
          question: 'The mathematical relationship between speed ($v$), distance ($d$), and time.',
          hint: 'Review the definition of speed and how to rearrange simple algebraic equations in math.',
          misconception: 'Students often mix up the arrangement of the formula variables, writing $d = \\frac{v}{t}$ or $t = v \\times d$ because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states',
                  options: ['The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states', 'Early methods of measuring time relied on repeating natural cycles and consistent', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'The second is the standard International System of Units (SI) unit of time, defined'],
                  hint: 'Review the definition of speed and how to rearrange simple algebraic equations in math.',
                  misconception: 'Students often mix up the arrangement of the formula variables, writing $d = \\frac{v}{t}$ or $t = v \\times d$ because they memorise letters.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['To fix this misconception, guide the student to use unit analysis (dimensional reasoning) as a sanity check.', 'Remind them that speed has units of distance over time (m/s).', 'Therefore, to find distance (metres), we must multiply speed (metres per second) by time (seconds) so that the.', 'Have them practice checking units in every calculation before plugging in numbers.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_008', difficulty: 'standard',
          question: 'Uniform linear motion is the motion of an object along a straight line where.',
          hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing.',
          misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform.',
          parts: [
                { id: 'a', prompt: 'A car travels along a straight highway, covering exactly 50 meters every 5 seconds. Is this motion uniform or non-uniform, and why?', answer: 'This is uniform motion',
                  options: ['This is uniform motion', 'non-uniform', 'just moving'],
                  hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing multiple.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' },
                { id: 'b', prompt: 'During a 10-second run, a sprinter covers 2 meters in the first second, 4 meters in the second second, and 6 meters in the third second.', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'just moving'],
                  hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing multiple.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' },
                { id: 'c', prompt: 'A toy train travels along a straight track. It covers 12 meters in the first 3 seconds, 12 meters in the next 3 seconds, and 12 meters in the final 3 seconds.', answer: 'Identify given values for each interval: Distance ($d$) = 12 m, Time ($t$) = 3 s',
                  options: ['Identify given values for each interval: Distance ($d$) = 12 m, Time ($t$) = 3 s', 'just moving'],
                  hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing multiple.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' },
                { id: 'd', prompt: 'Analyze the following distance-time data for a bicycle moving in a straight line: At t=0s, d=0m; at t=2s, d=10m; at t=4s, d=25m; at t=6s, d=45m.', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'just moving'],
                  hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing multiple.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['To fix this, have the student take a toy car and push it across a rough carpet.', 'Ask them to measure how far it travels in the 1st second, 2nd second, and 3rd second using a phone stopwatch or wall.', 'When they see the car covers 40 cm in the first second but only 10 cm in the third second before stopping, point out.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If a vehicle travels a total distance of 100 km in 2 hours, its motion must be uniform throughout the entire journey." Is this.', answer: 'The statement is false and invalid',
                  options: ['The statement is false and invalid', 'just moving', 'an average speed implies a constant, unvarying speed throughout the entire trip'],
                  hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing multiple.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['To fix this, have the student take a toy car and push it across a rough carpet.', 'Ask them to measure how far it travels in the 1st second, 2nd second, and 3rd second using a phone stopwatch or wall.', 'When they see the car covers 40 cm in the first second but only 10 cm in the third second before stopping, point out.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_009', difficulty: 'standard',
          question: 'Calculating distance and time from speed involves using rearranged forms of the.',
          hint: 'Review c7_physics_ch04_006 to reinforce how speed is defined before attempting.',
          misconception: 'Students frequently confuse which variable to isolate and end up multiplying speed by distance instead of dividing.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical formula used to calculate distance if you know the speed of an object and the time it has traveled, along with its SI unit?', answer: 'Distance = Speed $\\times$ Time, with the SI unit being meters (m)',
                  options: ['Distance = Speed $\\times$ Time, with the SI unit being meters (m)', 'Distance = Speed / Time'],
                  hint: 'Review c7_physics_ch04_006 to reinforce how speed is defined before attempting to calculate.',
                  misconception: 'Students frequently confuse which variable to isolate and end up multiplying speed by distance instead of dividing distance by speed when.' }
          ],
            remediations: { 'students-frequently-confuse-which-variable': { steps: ['To fix this error, guide the student back to dimensional analysis using units as a compass.', 'Ask them to write out the units explicitly: if distance is in meters ($\\text{m}$) and speed is in meters per second.', 'Show them that dividing meters by meters-per-second ($\\text{m} / (\\text{m/s})$) algebraically inverts the fraction.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_010', difficulty: 'standard',
          question: 'Speed can be expressed in different units such as metres per second.',
          hint: 'Review basic fraction simplification and how $1\\text{ km} = 1000\\text{ m}$ and $1\\text{.',
          misconception: 'Students frequently multiply by the wrong fraction ($\\frac{18}{5}$ instead of $\\frac{5}{18}$ when converting from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or',
                  options: ['Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or', 'Early methods of measuring time relied on repeating natural cycles and consistent', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'The second is the standard International System of Units (SI) unit of time, defined'],
                  hint: 'Review basic fraction simplification and how $1\\text{ km} = 1000\\text{ m}$ and $1\\text{ hour}.',
                  misconception: 'Students frequently multiply by the wrong fraction ($\\frac{18}{5}$ instead of $\\frac{5}{18}$ when converting from $\\text{km/h}$.' }
          ],
            remediations: { 'students-frequently-multiply-by-the': { steps: ['To fix this, write out the unit replacement explicitly every single time: replace \'$1\\text{ km}$\' with \'$1000\\text{.', 'Cancel the zeros manually: $\\frac{1\\text{ km}}{1\\text{ h}} = \\frac{1000\\text{ m}}{3600\\text{ s}} = \\frac{5}{18}\\text{.', 'Check whether the final number should look larger or smaller by remembering that $\\text{km/h}$ numbers are always.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
