import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch04_p1: SimDef = {
    id: 'v3_c7_physics_ch04_p1',
    title: 'Measurement of Time and Motion · Part 1/2',
    subtitle: 'Covers historical and physical principles behind sundials and water clocks, specifically.',
    classLevel: 7, subject: 'physics', topic: 'Measurement of Time and Motion · Part 1/2',
    chapters: ['c7_physics_ch04'],
    nodeIds: ['c7_physics_ch04_001', 'c7_physics_ch04_002', 'c7_physics_ch04_003', 'c7_physics_ch04_004', 'c7_physics_ch04_005', 'c7_physics_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Observe how your shadow stretches and shifts position on the school playground as the sun moves across the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A sundial tells perfect time through a sunny afternoon — but a monsoon sky or midnight renders it blind. How did people measure the hours when the shadow disappeared?',
        options: ['With water clocks — a steady drip from a vessel marks equal time intervals no matter the weather', 'By guessing based on hunger', 'By counting heartbeats out loud', 'They simply waited for the sun to return'],
        answer: 'With water clocks — a steady drip from a vessel marks equal time intervals no matter the weather',
        hook: 'Every early clock ran on something that changes predictably — a shadow sliding round a gnomon, or water flowing at a steady rate. And watch the shadow shrink toward noon: it is shortest when the sun stands highest.',
    },
    teaching: [
        { title: 'Early Methods of Measuring Time: Sundials and Water Clocks', text: 'Early methods of measuring time relied on repeating natural cycles and consistent physical processes, such as the movement of shadows cast by the sun (sundials) and the steady flow of water (water.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch04_001', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Build a water clock — pierce a vessel, measure how 300 mL drains in 15 minutes, then predict the drip time for 100 mL and verify the rate holds steady.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c7_physics_ch04_001', title: 'Early Methods of Measuring Time: Sundials and Water Clocks',
          caseStudy: { intro: 'Observe how your shadow stretches and shifts position on the school playground as the sun moves across the sky from morning to evening.',
            decisions: [{ prompt: 'What is the name of the vertical rod or pin used in a sundial to cast a shadow?', options: [
                { text: 'The vertical rod or pin is called a gnomon', outcome: 'The vertical rod or pin is called a gnomon. A student who answers "hands" or "dial face".' },
                { text: 'dial face', outcome: 'Not quite — Students often believe that sundials show the exact same standard clock time all year round without.', reveals: 'sundials-show-the-exact-same' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_002', title: 'Simple Pendulum: Period and Oscillation',
          scaffold: { problem: 'In a school physics laboratory in Delhi, a student sets up a simple pendulum.',
            steps: [
            { text: 'Identify given values: Total time ($t$) = 45 s, Number of oscillations ($N$) = 25. What to find: Time period ($T$).' },
            { text: 'Select the appropriate formula relating time period, total time, and number of oscillations: $T = \\frac{t}{N}$.' },
            { text: 'Substitute the numerical values along with their units into the formula: $T = \\frac{45\\text{ s}}{25}$.' },
            { text: 'Perform the division: $45 \\div 25 = 1.8$, tracking unit cancellation so the resulting unit is seconds (s).' },
            { text: 'Verify if the answer is physically reasonable (1.8 s per swing is normal for a medium-length laboratory pendulum) and.', faded: true, blankAnswer: '1.8 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_003', title: 'SI Unit of Time: Second',
          scaffold: { problem: 'A school bell rings for a duration of 2 minutes and 30 seconds. Express this total duration entirely in SI units of time.',
            steps: [
            { text: 'Identify the given components of time: $2 \\text{ minutes}$ and $30 \\text{ seconds}$.' },
            { text: 'Identify the target SI unit: seconds (s).' },
            { text: 'Convert the minute portion into seconds: $2 \\text{ min} \\times 60 \\text{ s/min} = 120 \\text{ seconds}$.' },
            { text: 'Add the remaining seconds to the converted value: $120 \\text{ s} + 30 \\text{ s} = 150 \\text{ seconds}$.' },
            { text: 'Confirm unit consistency and state final answer: $150 \\text{ s}$.', faded: true, blankAnswer: '150 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_004', title: 'Modern Timekeeping Devices: Clocks and Stopwatches',
          scaffold: { problem: 'During a school athletic meet in New Delhi, a timekeeper uses a digital stopwatch to measure a runner\'s sprint time.',
            steps: [
            { text: 'Identify the start time ($1\\text{ min } 15.50\\text{ s}$) and the end time ($1\\text{ min } 27.85\\text{ s}$).' },
            { text: 'Convert both times entirely into seconds by multiplying the minute value by 60 and adding the remaining seconds.' },
            { text: 'Compute start time in seconds: $(1 \\times 60) + 15.50 = 60 + 15.50 = 75.50\\text{ s}$.' },
            { text: 'Subtract the start time from the end time to find elapsed duration: $87.85\\text{ s} - 75.50\\text{ s} = 12.35\\text{ s}$.' },
            { text: 'Verify that the time difference is positive, reasonable for a short sprint segment, and expressed in correct SI units.', faded: true, blankAnswer: '12.35 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_005', title: 'Slow and Fast Motion: Comparing Speeds',
          scaffold: { problem: 'Two cyclists, Priya and Rohan, participate in a school race. Priya covers a distance of 300 meters in 50 seconds.',
            steps: [
            { text: 'Identify Priya\'s data: Distance $d_1 = 300\\text{ m}$, Time $t_1 = 50\\text{ s}$.' },
            { text: 'Recall the concept that speed is distance divided by time ($v = \\frac{d}{t}$).' },
            { text: 'Calculate Priya\'s speed: $v_1 = \\frac{300\\text{ m}}{50\\text{ s}} = 6\\text{ m/s}$.' },
            { text: 'Calculate Rohan\'s speed: $v_2 = \\frac{400\\text{ m}}{80\\text{ s}} = 5\\text{ m/s}$.' },
            { text: 'Compare speeds ($6\\text{ m/s} > 5\\text{ m/s}$); Priya has a higher speed and is cycling faster.', faded: true, blankAnswer: 'Priya is faster with a speed of $6\\text{ m/s}$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_006', title: 'Speed: Definition and Formula',
          scaffold: { problem: 'A school bus travels along a straight highway from Delhi to a picnic spot, covering a distance of 1500 meters in 100 seconds.',
            steps: [
            { text: 'Identify given values: distance $d = 1500\\text{ m}$, time $t = 100\\text{ s}$. Unknown to find: speed ($v$).' },
            { text: 'Select the appropriate formula: $v = \\frac{d}{t}$. Check that units are in standard SI form (meters and seconds).' },
            { text: 'Substitute the given values into the formula: $v = \\frac{1500\\text{ m}}{100\\text{ s}}$.' },
            { text: 'Perform the division and cancel matching units: $1500 \\div 100 = 15$, yielding units of m/s.' },
            { text: 'Verify physical reasonableness: A bus traveling 15 meters every second is a realistic highway speed ($15\\text{ m/s}$).', faded: true, blankAnswer: '15 m/s' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a history-cum-science exhibit, a class builds a sundial and a bottle water clock. On the day of the fair the sky is overcast, and the water clock seems to run fast when freshly filled. A visitor asks why both are \'failing.\'',
            decisions: [{ prompt: 'How should the students explain the behaviour?', options: [
                { text: 'The sundial needs direct sunlight travelling in straight lines to cast the gnomon\'s shadow, so clouds blind it; the water clock runs fast when full because a higher water level means higher pressure and a faster drip — neither device is broken, both are hostage to their physical inputs.', outcome: 'This ties each limitation to its mechanism — blocked light for the sundial, level-dependent flow for the water clock — which is exactly why later clocks needed regulation.' },
                { text: 'Both clocks are just poorly built — a properly made sundial and water clock keep perfect time in all weathers.', outcome: 'No craftsmanship removes the dependence: shadows need sunlight, and a draining vessel\'s flow slows as its level falls, so calibration is always needed.', reveals: 'old-clocks-are-perfect' },
                { text: 'The sundial is failing because cold cloudy air slows down shadow movement, and the water clock speeds up because warm water drips faster — it\'s all about temperature.', outcome: 'Clouds block light rather than slow shadows, and while temperature does change water flow, the fast start here comes from water pressure at high level, not warmth.', reveals: 'its-all-temperature' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Before gears and batteries, time was measured by whatever moved steadily — a travelling shadow or a patient drip.',
            decisions: [{ prompt: 'What comes next? Measurement of Time and Motion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Measurement of Time and Motion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch04_001', difficulty: 'standard',
          question: 'Early methods of measuring time relied on repeating natural cycles and.',
          hint: 'Review c6_physics_ch11_038 (Shadow Formation and Its Properties) and c6_physics_ch12_045.',
          misconception: 'Students often believe that sundials show the exact same standard clock time all year round without any adjustments,.',
          parts: [
                { id: 'a', prompt: 'What is the name of the vertical rod or pin used in a sundial to cast a shadow?', answer: 'The vertical rod or pin is called a gnomon',
                  options: ['The vertical rod or pin is called a gnomon', 'dial face'],
                  hint: 'Review c6_physics_ch11_038 (Shadow Formation and Its Properties) and c6_physics_ch12_045 (Rotation.',
                  misconception: 'Students often believe that sundials show the exact same standard clock time all year round without any adjustments, or that water clocks.' }
          ],
            remediations: { 'sundials-show-the-exact-same': { steps: ['To fix this misconception, perform a simple experiment with a plastic bottle that has a small hole near the bottom.', 'Fill it to the top and time how long it takes for the first half of the water to empty versus the second half.', 'Students will observe that the water jets out faster when the bottle is full due to greater water pressure overhead.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_002', difficulty: 'standard',
          question: 'A simple pendulum consists of a small metallic ball (called the bob) suspended.',
          hint: 'Review Class 6 topic c6_physics_ch08_033 (The Pendulum and Time Measurement).',
          misconception: 'Students often believe that a heavier bob swings faster and completes its oscillations in less time than a lighter bob.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of the time period of a simple pendulum?', answer: 'The SI unit of the time period is the second (s)',
                  options: ['The SI unit of the time period is the second (s)', 'kilogram'],
                  hint: 'Review Class 6 topic c6_physics_ch08_033 (The Pendulum and Time Measurement) to re-familiarize with.',
                  misconception: 'Students often believe that a heavier bob swings faster and completes its oscillations in less time than a lighter bob.' }
          ],
            remediations: { 'a-heavier-bob-swings-faster': { steps: ['To fix this misconception, perform a simple comparative demonstration in class.', 'Hang two bobs of identical size—one made of light wood and one made of heavy iron—using strings of the exact same.', 'Displace them together by the same small angle and release them simultaneously; observe that they keep pace with each.', 'Explain that while gravity pulls harder on the heavy bob, it also requires more force to accelerate it (inertia),.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_003', difficulty: 'standard',
          question: 'The second is the standard International System of Units (SI) unit of time.',
          hint: 'Review basic time units and conversions from c6_physics_ch08_034.',
          misconception: 'Students often believe that time units follow a decimal (base-10) system just like length (10 mm = 1 cm, 100 cm = 1 m).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The second is the standard International System of Units (SI) unit of time, defined',
                  options: ['The second is the standard International System of Units (SI) unit of time, defined', 'Early methods of measuring time relied on repeating natural cycles and consistent', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'Modern timekeeping devices, such as quartz clocks, digital watches, and electronic'],
                  hint: 'Review basic time units and conversions from c6_physics_ch08_034.',
                  misconception: 'Students often believe that time units follow a decimal (base-10) system just like length (10 mm = 1 cm, 100 cm = 1 m).' }
          ],
            remediations: { 'time-units-follow-a-decimal': { steps: ['To fix this error, have the student physically count 60 seconds using a watch with a sweep second hand while tapping.', 'Emphasize that the clock hand completes one full circle of 60 small markings to make 1 single minute, proving that the.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_004', difficulty: 'standard',
          question: 'Modern timekeeping devices, such as quartz clocks, digital watches, and.',
          hint: 'Review the basics of electric cells and circuits from Class 6, and practice reading.',
          misconception: 'Students often believe that digital stopwatches measure time continuously in a smooth flow, similar to an analog.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of time measured by modern timekeeping devices like stopwatches?', answer: 'The SI unit of time is the second (s)',
                  options: ['The SI unit of time is the second (s)', 'minute'],
                  hint: 'Review the basics of electric cells and circuits from Class 6, and practice reading decimal time.',
                  misconception: 'Students often believe that digital stopwatches measure time continuously in a smooth flow, similar to an analog sundial shadow.' }
          ],
            remediations: { 'digital-stopwatches-measure-time-continuously': { steps: ['To fix this misconception, have the student examine the digital seconds display of a stopwatch or mobile phone closely.', 'Point out that the numbers jump in discrete steps (e.g., from 0.01 to 0.02) rather than sliding smoothly, proving that.', 'Explain that each jump represents a counted electrical pulse, connecting back to their prior knowledge of electric.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_005', difficulty: 'standard',
          question: 'Comparing speeds involves determining which of two or more moving objects.',
          hint: 'Review the measurement of time intervals and basic division of numbers if struggling with.',
          misconception: 'Students often think that the object that travels the greater total distance is always the faster object, completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing speeds involves determining',
                  options: ['Comparing speeds involves determining', 'Early methods of measuring time relied on repeating natural cycles and consistent', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'The second is the standard International System of Units (SI) unit of time, defined'],
                  hint: 'Review the measurement of time intervals and basic division of numbers if struggling with.',
                  misconception: 'Students often think that the object that travels the greater total distance is always the faster object, completely ignoring the time.' }
          ],
            remediations: { 'the-object-that-travels-the': { steps: ['Have the student write down both the distance and the time taken for each object side by side.', 'Guide them to calculate how much distance each object covers in a single unit of time (such as 1 hour or 1 second).', 'Point out that comparing totals without considering time is like comparing marks scored in exams of different maximum.', 'Re-verify using the formula $v = \\frac{\\text{Distance}}{\\text{Time}}$ with unit tracking.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_006', difficulty: 'standard',
          question: 'Speed is the distance traveled by a moving object per unit of time, defined.',
          hint: 'Review c7_physics_ch04_003 and c7_physics_ch04_005 to reinforce how time is measured and.',
          misconception: 'Students often confuse the units of speed and add or multiply distance and time values arbitrarily instead of dividing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speed is the distance traveled by a moving object per unit of time, defined',
                  options: ['Speed is the distance traveled by a moving object per unit of time, defined', 'Early methods of measuring time relied on repeating natural cycles and consistent', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'The second is the standard International System of Units (SI) unit of time, defined'],
                  hint: 'Review c7_physics_ch04_003 and c7_physics_ch04_005 to reinforce how time is measured and what makes.',
                  misconception: 'Students often confuse the units of speed and add or multiply distance and time values arbitrarily instead of dividing them.' }
          ],
            remediations: { 'students-often-confuse-the-units': { steps: ['To fix this error, guide the student back to the physical meaning of the words: "per" means "divided by" (just like.', 'Have them physically walk a measured 10-meter path in their classroom, time it with a watch, and write down the.', 'Emphasize that the fraction bar in $\\text{m/s}$ literally means division.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
