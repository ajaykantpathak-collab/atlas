import type { SimDef } from '../../engine/types';
import C6_PhysicsPhysicalQuantitiesUnitsSim from '../../../simulations/c6_12/C6_PhysicsPhysicalQuantitiesUnitsSim';

/** v3 wrapped master — C6_PhysicsPhysicalQuantitiesUnitsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_physicsphysicalquantitiesunitssim: SimDef = {
    id: 'v3w_c6_physicsphysicalquantitiesunitssim',
    title: 'Physical Quantities Units',
    subtitle: 'This node covers standard time units (seconds, minutes, hours, days, years) and sub-units.',
    classLevel: 6, subject: 'physics', topic: 'Units of Time and Their Conversions',
    chapters: [],
    nodeIds: ['c6_physics_ch08_034', 'c6_physics_ch08_029', 'c6_physics_ch08_031', 'c6_physics_ch08_032'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are waiting for your favorite television show to start; do you check the clock in hours or.', goal: 'Master Physical Quantities Units.' },
    discovery: {
        question: 'What is the mathematical formula used to calculate the speed of a moving object?',
        options: ['The formula is Speed = Distance / Time', 'Distance times Time', 'Time divided by Distance'],
        answer: 'The formula is Speed = Distance / Time',
        hook: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.',
    },
    teaching: [
        { title: 'Time is a physical quantity used to measure.', text: 'Time is a physical quantity used to measure the duration of events or the interval between them, with the \'second\' serving as the basic SI unit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_physics_ch08_034', title: 'Time is a physical quantity used to.',
          scaffold: { problem: 'A student takes 2 hours and 15 minutes to complete their homework. How many minutes did they spend in total?',
            steps: [
            { text: 'Identify given time: 2 hours and 15 minutes.' },
            { text: 'Convert hours to minutes using the rule 1 hour = 60 minutes.' },
            { text: 'Calculate: 2 hours × 60 minutes/hour = 120 minutes.' },
            { text: 'Add the extra minutes: 120 minutes + 15 minutes = 135 minutes.' },
            { text: 'Conclude the total time is 135 minutes.', faded: true, blankAnswer: '135 minutes' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_029', title: 'Speed is a measure of how fast an.',
          scaffold: { problem: 'A delivery boy rides his bicycle 15 kilometres to deliver a parcel to a shop in 3 hours. What is his speed?',
            steps: [
            { text: 'Identify given values: Distance = 15 km, Time = 3 hours.' },
            { text: 'Identify the formula: Speed = Distance / Time.' },
            { text: 'Substitute the values: Speed = 15 / 3.' },
            { text: 'Calculate: 15 / 3 = 5.' },
            { text: 'Apply the unit: 5 km/h.', faded: true, blankAnswer: '5 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch08_031', title: 'Non-uniform motion is the movement of.',
          scaffold: { problem: 'A cyclist travels 10 metres in the first 2 seconds and 6 metres in the next 2 seconds. Is this uniform?',
            steps: [
            { text: 'Identify interval 1 (10m, 2s) and interval 2 (6m, 2s).' },
            { text: 'Use Speed = Distance / Time.' },
            { text: 'Interval 1 Speed = 10 / 2 = 5 m/s.' },
            { text: 'Interval 2 Speed = 6 / 2 = 3 m/s.' },
            { text: 'Compare 5 m/s and 3 m/s. They are not equal, so motion is non-uniform.', faded: true, blankAnswer: 'Non-uniform; 5 m/s and 3 m/s.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch08_032', title: 'Speed is a measure of how quickly an.',
          caseStudy: { intro: 'Imagine you and your friend decide to race from the school gate to the playground. If you both start at the same time, how do you decide who is faster?',
            decisions: [{ prompt: 'What is the simple formula used to calculate the speed of a moving object?', options: [
                { text: 'Speed = Distance / Time', outcome: 'Speed = Distance / Time. A student who answers "Distance times Time" is confusing the concept of.' },
                { text: 'Distance times Time', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' },
                { text: 'distance', outcome: 'Not quite — Students often believe that "speed" and "distance" are the same thing.', reveals: 'speed-and-distance-are-the' }
            ] }] } }
    ],
    explore: { component: C6_PhysicsPhysicalQuantitiesUnitsSim, prompt: 'Explore the interactive — Physical Quantities Units' },
    challenges: [
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
            remediations: { 'all-time-conversions-use-a': { steps: ['Remind the student that time is special and does not follow the base-10 pattern.', 'Have them write out a table: "1 minute = 60 seconds", "1 hour = 60 minutes".', 'Ask them to physically count 60 seconds with a stopwatch to see that it takes a "full minute," reinforcing that the.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_029', difficulty: 'standard',
          question: 'Speed is a measure of how fast an object changes its position, calculated by.',
          hint: 'Review basic division and the relationship between units (1km = 1000m).',
          misconception: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical formula used to calculate the speed of a moving object?', answer: 'The formula is Speed = Distance / Time',
                  options: ['The formula is Speed = Distance / Time', 'Distance times Time', 'Time divided by Distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.' }
          ],
            remediations: { 'students-often-confuse-the-units': { steps: ['First, ask the student to define 1 km (1000 m) and 1 hour (3600 seconds).', 'Then, have them write the formula as Speed = (Distance in metres) / (Time in seconds) for m/s.', 'Show them that 1 km/h is actually 1000m / 3600s, which is a much smaller value than 1 m/s, to prove the units represent.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_031', difficulty: 'standard',
          question: 'Non-uniform motion is the movement of an object where its speed changes over.',
          hint: 'Review the section on "Moving Things" to ensure you understand how to determine if an.',
          misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a.',
          parts: [
                { id: 'a', prompt: 'If a cyclist travels 5 meters in the first second and 3 meters in the second second, is the cyclist’s motion uniform or non-uniform?', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'total distance', 'constant speed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' },
                { id: 'b', prompt: 'A train leaves a station and increases its speed steadily for 5 minutes. Is this non-uniform motion? Why or why not?', answer: 'Yes, it is non-uniform',
                  options: ['Yes, it is non-uniform', 'speeding up', 'motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' },
                { id: 'c', prompt: 'If you draw a distance-time graph for a car stuck in a traffic jam, why would the line be curved instead of straight?', answer: 'The line is curved',
                  options: ['The line is curved', 'it\'s straight because it\'s a road', 'uniform'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['First, ask the student to count how many steps they take in the first 5 seconds of walking, then in the next 5 seconds.', 'If the numbers are different, explain that their speed changed.', 'Define uniform motion as "doing the exact same thing every single second," and non-uniform as "everything else." Use.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_031', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a.',
          parts: [
                { id: 'a', prompt: 'Is a person walking at a steady pace of 1 meter per second for 10 seconds an example of non-uniform motion? Defend your answer.', answer: 'No, it is uniform motion',
                  options: ['No, it is uniform motion', 'uniform'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving, its motion must be "uniform" simply because it is traveling a straight path.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['First, ask the student to count how many steps they take in the first 5 seconds of walking, then in the next 5 seconds.', 'If the numbers are different, explain that their speed changed.', 'Define uniform motion as "doing the exact same thing every single second," and non-uniform as "everything else." Use.'] } } },
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
            remediations: { 'speed-and-distance-are-the': { steps: ['Ask the student to compare two scenarios: walking 10 metres in 2 seconds versus walking 10 metres in 10 seconds.', 'Ask: "In which case were you moving faster?" Once they identify the faster scenario, point to the time values and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
