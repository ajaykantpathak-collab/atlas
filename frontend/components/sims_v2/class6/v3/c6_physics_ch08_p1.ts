import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch08_p1: SimDef = {
    id: 'v3_c6_physics_ch08_p1',
    title: 'Measurement of Time and Motion · Part 1/2',
    subtitle: 'This node covers the historical transition from observing natural cycles to using the.',
    classLevel: 6, subject: 'physics', topic: 'Measurement of Time and Motion · Part 1/2',
    chapters: ['c6_physics_ch08'],
    nodeIds: ['c6_physics_ch08_027', 'c6_physics_ch08_033', 'c6_physics_ch08_029', 'c6_physics_ch08_030', 'c6_physics_ch08_031'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how your own shadow changes length and direction during a sunny day?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stick in the ground tells perfect time all sunny afternoon — its shadow crawling like a clock hand. But at midnight it is completely useless. Why?',
        options: ['A sundial needs sunlight to cast a shadow — and the shadow moves only because the sun appears to shift as Earth rotates', 'The stick gets tired and stops working at night', 'Moonlight is too weak to ever make any shadow', 'Sundials need to be wound up every evening'],
        answer: 'A sundial needs sunlight to cast a shadow — and the shadow moves only because the sun appears to shift as Earth rotates',
        hook: 'The stick never moves — Earth does. The sun only appears to travel across the sky because our planet spins, and it is that shifting light angle that drags the shadow around the dial.',
    },
    teaching: [
        { title: 'Measuring Time: From Sundials to Clocks', text: 'A sundial is an ancient device that measures time by using the position of a shadow cast by a stationary object (a gnomon) onto a marked surface, tracking the sun\'s apparent movement across the sky.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch08_027', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Plant a stick in open ground, mark its shadow tip with a pebble every hour, and figure out why a cloudy day defeats your homemade clock.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch08_027', title: 'Measuring Time: From Sundials to Clocks',
          caseStudy: { intro: 'Have you ever noticed how your own shadow changes length and direction during a sunny day?',
            decisions: [{ prompt: 'What is the main source of energy/movement that causes a sundial’s shadow to change position?', options: [
                { text: 'The sun\'s apparent movement across the sky', outcome: 'The sun\'s apparent movement across the sky. A wrong answer (e.g., "the moon" or "the stick moving").' },
                { text: 'the moon', outcome: 'Not quite — Students often believe the sun physically "moves" around the earth, causing the shadow to move.', reveals: 'the-sun-physically-moves-around' },
                { text: 'the stick moving', outcome: 'Not quite — Students often believe the sun physically "moves" around the earth, causing the shadow to move.', reveals: 'the-sun-physically-moves-around' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_028', title: 'Slow and Fast: Comparing Speeds',
          scaffold: { problem: 'An auto-rickshaw travels 30 kilometres in 1.5 hours to reach a market. What is its speed?',
            steps: [
            { text: 'Identify distance = 30 km and time = 1.5 hours.' },
            { text: 'Use the formula Speed = Distance / Time.' },
            { text: 'Substitute values: Speed = 30 / 1.5.' },
            { text: 'Calculate: 30 divided by 1.5 is 20.' },
            { text: 'Result is 20 km/h.', faded: true, blankAnswer: '20 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_029', title: 'Understanding Speed',
          scaffold: { problem: 'A delivery boy rides his bicycle 15 kilometres to deliver a parcel to a shop in 3 hours. What is his speed?',
            steps: [
            { text: 'Identify given values: Distance = 15 km, Time = 3 hours.' },
            { text: 'Identify the formula: Speed = Distance / Time.' },
            { text: 'Substitute the values: Speed = 15 / 3.' },
            { text: 'Calculate: 15 / 3 = 5.' },
            { text: 'Apply the unit: 5 km/h.', faded: true, blankAnswer: '5 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_030', title: 'Uniform Motion: Constant Speed',
          scaffold: { problem: 'A local train travels between two stations. It covers 10 km in the first 15 minutes, 10 km in the second 15 minutes, and 10 km in the third.',
            steps: [
            { text: 'Identify that the distance is 10 km per 15-minute interval.' },
            { text: 'Confirm intervals are equal (15 mins) and distances are equal (10 km). This is uniform motion.' },
            { text: 'Convert 15 minutes to hours (15/60 = 0.25 hours).' },
            { text: 'Use Speed = Distance / Time = 10 km / 0.25 h.' },
            { text: 'Result = 40 km/h.', faded: true, blankAnswer: '40 km/h' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch08_031', title: 'Non-uniform Motion: Changing Speed',
          caseStudy: { intro: 'Have you ever watched a car driving through a busy market street?',
            decisions: [{ prompt: 'If a cyclist travels 5 meters in the first second and 3 meters in the second second, is the cyclist’s motion uniform or non-uniform?', options: [
                { text: 'The motion is non-uniform', outcome: 'The motion is non-uniform. A wrong answer here suggests the student confuses "total distance" with.' },
                { text: 'total distance', outcome: 'Not quite — Students often believe that if an object is moving, its motion must be "uniform" simply because.', reveals: 'if-an-object-is-moving' },
                { text: 'constant speed', outcome: 'Not quite — Students often believe that if an object is moving, its motion must be "uniform" simply because.', reveals: 'if-an-object-is-moving' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_032', title: 'Measuring Speed in Practice',
          caseStudy: { intro: 'Imagine you and your friend decide to race from the school gate to the playground. If you both start at the same time, how do you decide who is faster?',
            decisions: [{ prompt: 'What is the simple formula used to calculate the speed of a moving object?', options: [
                { text: 'Speed = Distance / Time', outcome: 'Speed = Distance / Time. A student who answers "Distance times Time" is confusing the concept.' },
                { text: 'Distance times Time', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' },
                { text: 'distance', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_027', title: 'Use it in the wild',
          caseStudy: { intro: 'The school garden club builds a sundial to time their plants\' watering schedule. It works beautifully — until a cloudy week and an early-evening session leave them staring at a shadowless dial. \'The sundial is broken,\' someone says.',
            decisions: [{ prompt: 'Is the sundial broken — and why did people invent water clocks at all?', options: [
                { text: 'It is working exactly as designed — a sundial can only read time while the sun shines on it, so clouds and nights blind it completely. That is precisely why ancient civilisations added water clocks and sand clocks: those keep ticking in the dark, indoors, and in any weather. The sundial\'s limits, not its failure, are on display.', outcome: 'Each timekeeping tool covers the others\' gaps — the sundial\'s dependence on sunlight is the reason other clocks were invented to work without the sky.' },
                { text: 'The sundial is broken — a properly built sundial works at any hour in any weather.', outcome: 'No sundial works without a shadow — sunlight is its input, so cloud cover and night are not malfunctions but the design\'s limit.', reveals: 'sundial-works-anytime' },
                { text: 'They should have built a bigger sundial — a larger shadow works even without much sun.', outcome: 'Size does not create light — with no sun there is no shadow at any scale, which is why the ancients switched to dripping water or falling sand.', reveals: 'bigger-sundial-fixes-night' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_032', title: 'The bigger picture',
          caseStudy: { intro: 'The first clock was a shadow. It worked beautifully — as long as the biggest light in the sky was switched on.',
            decisions: [{ prompt: 'What comes next? Measurement of Time and Motion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Measurement of Time and Motion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch08_027', difficulty: 'standard',
          question: 'A sundial is an ancient device that measures time by using the position of.',
          hint: 'Review the properties of light and shadow formation (opaque objects casting shadows).',
          misconception: 'Students often believe the sun physically "moves" around the earth, causing the shadow to move.',
          parts: [
                { id: 'a', prompt: 'What is the main source of energy/movement that causes a sundial’s shadow to change position?', answer: 'The sun\'s apparent movement across the sky',
                  options: ['The sun\'s apparent movement across the sky', 'the moon', 'the stick moving', 'the sun physically "moves" around the earth, causing the shadow to move'],
                  hint: 'Review the properties of light and shadow formation (opaque objects casting shadows).',
                  misconception: 'Students often believe the sun physically "moves" around the earth, causing the shadow to move.' },
                { id: 'b', prompt: 'A student wants to use a sundial to check the time at midnight. Why is this impossible?', answer: 'Because a sundial requires a light source to cast a shadow',
                  options: ['Because a sundial requires a light source to cast a shadow', 'the sun physically "moves" around the earth, causing the shadow to move'],
                  hint: 'Review the properties of light and shadow formation (opaque objects casting shadows).',
                  misconception: 'Students often believe the sun physically "moves" around the earth, causing the shadow to move.' }
          ],
            remediations: { 'the-sun-physically-moves-around': { steps: ['Ask the student to stand under a ceiling light and slowly turn their body in a circle while keeping their hand held out.', 'Ask them: "Did your hand change shape, or did the light\'s angle relative to your hand change?" Explain that just as the.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_028', difficulty: 'standard',
          question: 'Speed is the distance an object travels in a specific amount of time.',
          hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
          misconception: 'Students often believe that "fast" means "long distance" regardless of time.',
          parts: [
                { id: 'a', prompt: 'If a bicycle travels 10 kilometres in 2 hours, what is its speed?', answer: 'The speed is 5 km/h',
                  options: ['The speed is 5 km/h', 'represents a rate of change', '"fast" means "long distance" regardless of time'],
                  hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
                  misconception: 'Students often believe that "fast" means "long distance" regardless of time.' },
                { id: 'b', prompt: 'Two cars travel the same distance. Car A takes 1 hour and Car B takes 2 hours. Which car is faster and why?', answer: 'Car A is faster',
                  options: ['Car A is faster', 'a larger time value means higher speed', '"fast" means "long distance" regardless of time'],
                  hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
                  misconception: 'Students often believe that "fast" means "long distance" regardless of time.' },
                { id: 'c', prompt: 'A bus travels 100 km in 2 hours. What is its speed in km/h?', answer: 'Speed = 100 km / 2 h = 50 km/h',
                  options: ['Speed = 100 km / 2 h = 50 km/h', '"fast" means "long distance" regardless of time'],
                  hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
                  misconception: 'Students often believe that "fast" means "long distance" regardless of time.' },
                { id: 'd', prompt: 'If you double the distance while keeping the time the same, what happens to your speed?', answer: 'The speed doubles',
                  options: ['The speed doubles', '"fast" means "long distance" regardless of time'],
                  hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
                  misconception: 'Students often believe that "fast" means "long distance" regardless of time.' }
          ],
            remediations: { 'fast-means-long-distance-regardless': { steps: ['First, ask the student to define "speed" as a "fair race" where everyone has the same amount of time.', 'Show them a table with two runners: Runner A runs 10m in 2s, and Runner B runs 10m in 5s.', 'Ask them who is faster and why, guiding them to see that the smaller time for the same distance implies higher speed.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_028', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "fast" means "long distance" regardless of time.',
          parts: [
                { id: 'a', prompt: 'Is it possible for a fast-moving object to have a lower speed value than a slow-moving object if the units are different?', answer: 'Yes, if the units are not the same (e.g., comparing 100 m/s to 5 km/h)',
                  options: ['Yes, if the units are not the same (e.g., comparing 100 m/s to 5 km/h)', '"fast" means "long distance" regardless of time'],
                  hint: 'Review the "Measurement of Length" chapter to ensure you can measure distance correctly.',
                  misconception: 'Students often believe that "fast" means "long distance" regardless of time.' }
          ],
            remediations: { 'fast-means-long-distance-regardless': { steps: ['First, ask the student to define "speed" as a "fair race" where everyone has the same amount of time.', 'Show them a table with two runners: Runner A runs 10m in 2s, and Runner B runs 10m in 5s.', 'Ask them who is faster and why, guiding them to see that the smaller time for the same distance implies higher speed.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_029', difficulty: 'standard',
          question: 'Speed is a measure of how fast an object changes its position, calculated.',
          hint: 'Review basic division and the relationship between units (1km = 1000m).',
          misconception: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical formula used to calculate the speed of a moving object?', answer: 'The formula is Speed = Distance / Time',
                  options: ['The formula is Speed = Distance / Time', 'Distance times Time', 'Time divided by Distance'],
                  hint: 'Review basic division and the relationship between units (1km = 1000m).',
                  misconception: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.' }
          ],
            remediations: { 'students-often-confuse-the-units': { steps: ['First, ask the student to define 1 km (1000 m) and 1 hour (3600 seconds).', 'Then, have them write the formula as Speed = (Distance in metres) / (Time in seconds) for m/s.', 'Show them that 1 km/h is actually 1000m / 3600s, which is a much smaller value than 1 m/s, to prove the units represent.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_030', difficulty: 'standard',
          question: 'Uniform motion occurs when an object moves in a straight line at a constant.',
          hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
          misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be.',
          parts: [
                { id: 'a', prompt: 'If a toy train travels 5 cm every 1 second, how far will it travel in 4 seconds if it is in uniform motion?', answer: 'It will travel 20 cm',
                  options: ['It will travel 20 cm', 'constant speed', 'constant velocity', 'if an object moves, it must be in uniform motion'],
                  hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'b', prompt: 'A car’s distance-time graph is a perfectly straight, sloped line. What does this tell you about the car\'s speed?', answer: 'The speed is constant',
                  options: ['The speed is constant', 'constant speed', 'constant velocity', 'if an object moves, it must be in uniform motion'],
                  hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'c', prompt: 'A bus travels 100 km in 2 hours. Calculate its speed.', answer: 'Speed = Distance / Time = 100 km / 2 h = 50 km/h',
                  options: ['Speed = Distance / Time = 100 km / 2 h = 50 km/h', 'constant speed', 'constant velocity', 'if an object moves, it must be in uniform motion'],
                  hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'd', prompt: 'Two cars, A and B, are moving in uniform motion. Car A has a steeper line on the graph than Car B. Which car is faster?', answer: 'Car A is faster',
                  options: ['Car A is faster', 'constant speed', 'constant velocity', 'if an object moves, it must be in uniform motion'],
                  hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' }
          ],
            remediations: { 'students-often-confuse-constant-speed': { steps: ['First, ask the student to draw a table with two columns: Time (1s, 2s, 3s) and Distance (5m, 10m, 15m).', 'Ask them to calculate the difference between the distances for each step.', 'Explain that uniform motion is only present if that difference remains the same every single time.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_031', difficulty: 'standard',
          question: 'Non-uniform motion is the movement of an object where its speed changes over.',
          hint: 'Review the section on "Moving Things" to ensure you understand how to determine if.',
          misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling.',
          parts: [
                { id: 'a', prompt: 'If a cyclist travels 5 meters in the first second and 3 meters in the second second, is the cyclist’s motion uniform or non-uniform?', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'total distance', 'constant speed', 'still moving'],
                  hint: 'Review the section on "Moving Things" to ensure you understand how to determine if an object.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' },
                { id: 'b', prompt: 'A train leaves a station and increases its speed steadily for 5 minutes. Is this non-uniform motion? Why or why not?', answer: 'Yes, it is non-uniform',
                  options: ['Yes, it is non-uniform', 'speeding up', 'motion', 'uniform'],
                  hint: 'Review the section on "Moving Things" to ensure you understand how to determine if an object.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' },
                { id: 'c', prompt: 'If you draw a distance-time graph for a car stuck in a traffic jam, why would the line be curved instead of straight?', answer: 'The line is curved',
                  options: ['The line is curved', 'it\'s straight because it\'s a road', 'uniform'],
                  hint: 'Review the section on "Moving Things" to ensure you understand how to determine if an object.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['First, ask the student to count how many steps they take in the first 5 seconds of walking, then in the next 5 seconds.', 'If the numbers are different, explain that their speed changed.', 'Define uniform motion as "doing the exact same thing every single second," and non-uniform as "everything else." Use.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_032', difficulty: 'standard',
          question: 'Speed is a measure of how quickly an object covers a specific distance over.',
          hint: 'Review the definitions of SI units for length (metre) and time (second).',
          misconception: 'Students often believe that "speed" and "distance" are the same thing.',
          parts: [
                { id: 'a', prompt: 'What is the simple formula used to calculate the speed of a moving object?', answer: 'Speed = Distance / Time',
                  options: ['Speed = Distance / Time', 'Distance times Time', 'distance', '"speed" and "distance" are the same thing'],
                  hint: 'Review the definitions of SI units for length (metre) and time (second).',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' },
                { id: 'b', prompt: 'If two cars travel the same distance, but Car A takes 10 minutes and Car B takes 20 minutes, which car is faster and why?', answer: 'Car A is faster because it covered the same distance in less time',
                  options: ['Car A is faster because it covered the same distance in less time', 'they are the same', 'distance', '"speed" and "distance" are the same thing'],
                  hint: 'Review the definitions of SI units for length (metre) and time (second).',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' },
                { id: 'c', prompt: 'A student walks a 20-metre corridor in 5 seconds. Calculate the speed of the student.', answer: 'Speed = 20 m / 5 s = 4 m/s',
                  options: ['Speed = 20 m / 5 s = 4 m/s', 'distance', '"speed" and "distance" are the same thing'],
                  hint: 'Review the definitions of SI units for length (metre) and time (second).',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' }
          ],
            remediations: { 'speed-and-distance-are-the': { steps: ['Ask the student to compare two scenarios: walking 10 metres in 2 seconds versus walking 10 metres in 10 seconds.', 'Ask: "In which case were you moving faster?" Once they identify the faster scenario, point to the time values and.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
