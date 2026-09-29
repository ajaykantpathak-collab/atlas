import type { SimDef } from '../../engine/types';
import C6_ScienceTemperatureAndItsMeasurementSim from '../../../simulations/c6_12/C6_ScienceTemperatureAndItsMeasurementSim';

/** v3 wrapped master — C6_ScienceTemperatureAndItsMeasurementSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencetemperatureanditsmeasurementsim: SimDef = {
    id: 'v3w_c6_sciencetemperatureanditsmeasurementsim',
    title: 'Heat vs Temperature: Understanding the Difference',
    subtitle: 'This node covers the conceptual difference between heat and temperature and the.',
    classLevel: 6, subject: 'science', topic: 'Heat vs Temperature: Understanding the Difference',
    chapters: [],
    nodeIds: ['c6_physics_ch07_024', 'c6_physics_ch07_019', 'c6_physics_ch07_020', 'c6_physics_ch08_027', 'c6_physics_ch08_033', 'c6_physics_ch08_029'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why a small cup of tea feels hot enough to burn your tongue, but a giant swimming pool.', goal: 'Master Heat vs Temperature: Understanding the Difference.' },
    discovery: {
        question: 'What is the primary device used to measure the temperature of an object?',
        options: ['A thermometer', 'a calorimeter', 'a heater'],
        answer: 'A thermometer',
        hook: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They.',
    },
    teaching: [
        { title: 'Heat is a form of energy related to the.', text: 'Heat is a form of energy related to the total motion of molecules in a substance, while temperature is a measurement indicating how hot or cold an object is based on the average kinetic energy of its.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_physics_ch07_024', title: 'Heat is a form of energy related to the.',
          caseStudy: { intro: 'Have you ever wondered why a small cup of tea feels hot enough to burn your tongue, but a giant swimming pool of warm water feels comfortable, even though the.',
            decisions: [{ prompt: 'What is the primary device used to measure the temperature of an object?', options: [
                { text: 'A thermometer', outcome: 'A thermometer. Answering "a calorimeter" or "a heater" suggests a confusion between devices that.' },
                { text: 'a calorimeter', outcome: 'Not quite — Students often confuse temperature with heat because they assume "higher temperature" always equals.', reveals: 'students-often-confuse-temperature-with' },
                { text: 'a heater', outcome: 'Not quite — Students often confuse temperature with heat because they assume "higher temperature" always equals.', reveals: 'students-often-confuse-temperature-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_019', title: 'Heat is a form of energy that moves.',
          caseStudy: { intro: 'Have you ever noticed that a metal spoon left in a hot cup of tea becomes hot to touch?',
            decisions: [{ prompt: 'In which direction does heat always flow between two objects of different temperatures?', options: [
                { text: 'Heat always flows from the hotter object to the cooler object', outcome: 'Heat always flows from the hotter object to the cooler object.' },
                { text: 'cold to hot', outcome: 'Not quite — Students often believe "cold" is a substance that travels, rather than understanding that "cold" is.', reveals: 'cold-is-a-substance-that' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch07_026', title: 'Heat transfer in daily life refers to.',
          caseStudy: { intro: 'Have you ever wondered why the handle of your frying pan is often made of wood or plastic instead of metal?',
            decisions: [{ prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass.', options: [
                { text: 'The process is radiation', outcome: 'The process is radiation. A wrong answer like "conduction" suggests the student thinks the sun must.' },
                { text: 'conduction', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' },
                { text: 'insulators', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_032', title: 'Speed is a measure of how quickly an.',
          caseStudy: { intro: 'Imagine you and your friend decide to race from the school gate to the playground. If you both start at the same time, how do you decide who is faster?',
            decisions: [{ prompt: 'What is the simple formula used to calculate the speed of a moving object?', options: [
                { text: 'Speed = Distance / Time', outcome: 'Speed = Distance / Time. A student who answers "Distance times Time" is confusing the concept of.' },
                { text: 'Distance times Time', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' },
                { text: 'distance', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch08_033', title: 'A simple pendulum is a device.',
          caseStudy: { intro: 'Have you ever noticed how a swing in a park moves forward and backward repeatedly?',
            decisions: [{ prompt: 'What do we call the motion of a pendulum where it moves to and fro about a fixed position?', options: [
                { text: 'This is called oscillatory motion', outcome: 'This is called oscillatory motion. A wrong answer like "linear motion" suggests the student does.' },
                { text: 'linear motion', outcome: 'Not quite — Students often believe that the "heavier the bob, the faster it swings" or that "the harder you.', reveals: 'the-heavier-the-bob' },
                { text: 'to and fro', outcome: 'Not quite — Students often believe that the "heavier the bob, the faster it swings" or that "the harder you.', reveals: 'the-heavier-the-bob' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_034', title: 'Time is a physical quantity used to.',
          scaffold: { problem: 'A student takes 2 hours and 15 minutes to complete their homework. How many minutes did they spend in total?',
            steps: [
            { text: 'Identify given time: 2 hours and 15 minutes.' },
            { text: 'Convert hours to minutes using the rule 1 hour = 60 minutes.' },
            { text: 'Calculate: 2 hours × 60 minutes/hour = 120 minutes.' },
            { text: 'Add the extra minutes: 120 minutes + 15 minutes = 135 minutes.' },
            { text: 'Conclude the total time is 135 minutes.', faded: true, blankAnswer: '135 minutes' }
            ] } }
    ],
    explore: { component: C6_ScienceTemperatureAndItsMeasurementSim, prompt: 'Explore the interactive — Heat vs Temperature: Understanding the Difference' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch07_024', difficulty: 'standard',
          question: 'Heat is a form of energy related to the total motion of molecules in a.',
          hint: 'Review the concept that all matter is made of tiny, moving particles.',
          misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They.',
          parts: [
                { id: 'a', prompt: 'What is the primary device used to measure the temperature of an object?', answer: 'A thermometer',
                  options: ['A thermometer', 'a calorimeter', 'a heater'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' },
                { id: 'b', prompt: 'If you have a cup of hot coffee and a giant lake, both at 60°C, which one has more heat? Why?', answer: 'The lake has more heat',
                  options: ['The lake has more heat', 'the cup', 'temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' },
                { id: 'c', prompt: 'If you touch a metal spoon that has been sitting in a bowl of hot soup, the spoon gets hot. What is actually moving from the soup into the spoon?', answer: 'Heat (energy) is moving into the spoon',
                  options: ['Heat (energy) is moving into the spoon', 'higher temperature', 'more heat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse temperature with heat because they assume "higher temperature" always equals "more heat." They fail to realize that.' }
          ],
            remediations: { 'students-often-confuse-temperature-with': { steps: ['Ask the student to draw a diagram with two boxes: one with 2 dots and one with 20 dots.', 'Assign each dot a "speed" (energy value) of 5.', 'Ask them to calculate the "average" (temperature) and the "total" (heat) for both boxes.', 'They will see that while the average is the same (5), the total is vastly different (10 vs 100), clarifying that.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_019', difficulty: 'standard',
          question: 'Heat is a form of energy that moves from a region or object with a higher.',
          hint: 'Review the section on "Temperature" in Chapter 7 to understand how we measure the degree.',
          misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of.',
          parts: [
                { id: 'a', prompt: 'In which direction does heat always flow between two objects of different temperatures?', answer: 'Heat always flows from the hotter object to the cooler object',
                  options: ['Heat always flows from the hotter object to the cooler object', 'cold to hot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' },
                { id: 'b', prompt: 'If you hold an ice cube in your hand, why does your hand feel cold?', answer: 'Your hand feels cold',
                  options: ['Your hand feels cold', 'the cold moves into my hand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' },
                { id: 'c', prompt: 'A metal rod is held over a candle flame. After a few minutes, the other end becomes hot. What is this mode of heat transfer called?', answer: 'This is called conduction',
                  options: ['This is called conduction', 'convection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "cold" is a substance that travels, rather than understanding that "cold" is just the state of having less heat.' }
          ],
            remediations: { 'cold-is-a-substance-that': { steps: ['Ask the student to define what "heat" is (energy) and what "cold" is (a lack of energy).', 'Use the analogy of a bank account: if you have 100 rupees and your friend has 0, money moves from you to them; you.', 'Re-examine the ice cube example: emphasize that the ice cube is gaining energy (melting) while the hand is losing.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_026', difficulty: 'standard',
          question: 'Heat transfer in daily life refers to the natural movement of thermal energy.',
          hint: 'Review the definitions of conduction (solids), convection (fluids), and radiation.',
          misconception: 'Students often believe that "insulators" create cold or stop heat entirely.',
          parts: [
                { id: 'a', prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass from the sun?', answer: 'The process is radiation',
                  options: ['The process is radiation', 'conduction', 'insulators'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' },
                { id: 'b', prompt: 'A metal spoon is placed in a bowl of hot dal. After one minute, the handle of the spoon becomes hot. Explain the movement of heat in this scenario.', answer: 'The heat moves through the spoon via conduction',
                  options: ['The heat moves through the spoon via conduction', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' }
          ],
            remediations: { 'insulators-create-cold-or-stop': { steps: ['Ask the student: "If you put ice in a woollen mitten, does it melt faster or slower than on a table?" When they answer.', 'Explain that insulators are like "slow-motion" zones for heat transfer.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_026', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "insulators" create cold or stop heat entirely.',
          parts: [
                { id: 'a', prompt: 'If you are holding a hot cup of tea, why does a woollen tea cozy keep the tea hot longer than a metal cover?', answer: 'Wool acts as an insulator',
                  options: ['Wool acts as an insulator', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' }
          ],
            remediations: { 'insulators-create-cold-or-stop': { steps: ['Ask the student: "If you put ice in a woollen mitten, does it melt faster or slower than on a table?" When they answer.', 'Explain that insulators are like "slow-motion" zones for heat transfer.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_032', difficulty: 'standard',
          question: 'Speed is a measure of how quickly an object covers a specific distance over a.',
          hint: 'Review the definitions of SI units for length (metre) and time (second).',
          misconception: 'Students often believe that "speed" and "distance" are the same thing.',
          parts: [
                { id: 'a', prompt: 'What is the simple formula used to calculate the speed of a moving object?', answer: 'Speed = Distance / Time',
                  options: ['Speed = Distance / Time', 'Distance times Time', 'distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' },
                { id: 'b', prompt: 'If two cars travel the same distance, but Car A takes 10 minutes and Car B takes 20 minutes, which car is faster and why?', answer: 'Car A is faster because it covered the same distance in less time',
                  options: ['Car A is faster because it covered the same distance in less time', 'they are the same', 'distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' },
                { id: 'c', prompt: 'A student walks a 20-metre corridor in 5 seconds. Calculate the speed of the student.', answer: 'Speed = 20 m / 5 s = 4 m/s',
                  options: ['Speed = 20 m / 5 s = 4 m/s', 'distance', '"speed" and "distance" are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "speed" and "distance" are the same thing.' }
          ],
            remediations: { 'speed-and-distance-are-the': { steps: ['Ask the student to compare two scenarios: walking 10 metres in 2 seconds versus walking 10 metres in 10 seconds.', 'Ask: "In which case were you moving faster?" Once they identify the faster scenario, point to the time values and.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_033', difficulty: 'standard',
          question: 'A simple pendulum is a device consisting of a small weight (bob) suspended from.',
          hint: 'Review the definitions of oscillatory vs linear motion in the previous chapter.',
          misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the.',
          parts: [
                { id: 'a', prompt: 'What do we call the motion of a pendulum where it moves to and fro about a fixed position?', answer: 'This is called oscillatory motion',
                  options: ['This is called oscillatory motion', 'linear motion', 'to and fro'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' },
                { id: 'b', prompt: 'If you pull a pendulum bob a little further to the side than before, does the time taken for one full swing change significantly?', answer: 'No, the time (period) remains the same',
                  options: ['No, the time (period) remains the same', 'isochronism', 'heavier the bob, the faster it swings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' },
                { id: 'c', prompt: 'A pendulum has a string of a certain length. If you replace the bob with a heavier one but keep the string length the same, what happens to the time for one.', answer: 'The time remains unchanged',
                  options: ['The time remains unchanged', 'heavier the bob, the faster it swings', 'the harder you push, the longer the period must be'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' }
          ],
            remediations: { 'the-heavier-the-bob': { steps: ['Ask the student to perform a "Pendulum Race." Have them use two strings of the same length, one with a paperclip and.', 'Ask them to count how many swings both make in 30 seconds.', 'When they see the counts are the same, explain that the "rhythm" is set by the string length, not the weight.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_033', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the.',
          parts: [
                { id: 'a', prompt: 'If two pendulums have different string lengths, will they have the same time period?', answer: 'No, the longer pendulum will take more time for a full swing',
                  options: ['No, the longer pendulum will take more time for a full swing', 'heavier the bob, the faster it swings', 'the harder you push, the longer the period must be'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the "heavier the bob, the faster it swings" or that "the harder you push, the longer the period must be." This.' }
          ],
            remediations: { 'the-heavier-the-bob': { steps: ['Ask the student to perform a "Pendulum Race." Have them use two strings of the same length, one with a paperclip and.', 'Ask them to count how many swings both make in 30 seconds.', 'When they see the counts are the same, explain that the "rhythm" is set by the string length, not the weight.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_034', difficulty: 'standard',
          question: 'Time is a physical quantity used to measure the duration of events or the.',
          hint: 'Review basic multiplication tables for 6.',
          misconception: 'Students often assume that all time conversions use a factor of 10, similar to the metric system for length (10 mm = 1.',
          parts: [
                { id: 'a', prompt: 'What is the basic SI unit of time? Answer: The second. Wrong answer reveals: The student is confusing the SI unit of length (metre) with the SI unit of time,.', answer: 'The basic SI unit of time is the second',
                  options: ['The basic SI unit of time is the second', 'minute'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all time conversions use a factor of 10, similar to the metric system for length (10 mm = 1 cm).' }
          ],
            remediations: { 'all-time-conversions-use-a': { steps: ['Remind the student that time is special and does not follow the base-10 pattern.', 'Have them write out a table: "1 minute = 60 seconds", "1 hour = 60 minutes".', 'Ask them to physically count 60 seconds with a stopwatch to see that it takes a "full minute," reinforcing that the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
