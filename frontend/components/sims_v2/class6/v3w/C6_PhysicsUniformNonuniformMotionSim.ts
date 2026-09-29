import type { SimDef } from '../../engine/types';
import C6_PhysicsUniformNonuniformMotionSim from '../../../simulations/c6_12/C6_PhysicsUniformNonuniformMotionSim';

/** v3 wrapped master — C6_PhysicsUniformNonuniformMotionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_physicsuniformnonuniformmotionsim: SimDef = {
    id: 'v3w_c6_physicsuniformnonuniformmotionsim',
    title: 'Understanding Speed',
    subtitle: 'This node covers the definition and calculation of speed using the formula Speed =.',
    classLevel: 6, subject: 'physics', topic: 'Understanding Speed',
    chapters: [],
    nodeIds: ['c6_physics_ch08_029', 'c6_physics_ch08_031', 'c6_physics_ch08_030'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you and your friend are both running to the school gate.', goal: 'Master Understanding Speed.' },
    discovery: {
        question: 'What is the mathematical formula used to calculate the speed of a moving object?',
        options: ['The formula is Speed = Distance / Time', 'Distance times Time', 'Time divided by Distance'],
        answer: 'The formula is Speed = Distance / Time',
        hook: 'Students often confuse the units of speed (km/h vs m/s) and treat them as interchangeable without conversion.',
    },
    teaching: [
        { title: 'Speed is a measure of how fast an object.', text: 'Speed is a measure of how fast an object changes its position, calculated by dividing the total distance travelled by the time taken to cover that distance.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c6_physics_ch08_030', title: 'Uniform motion occurs when an object.',
          scaffold: { problem: 'A local train travels between two stations. It covers 10 km in the first 15 minutes, 10 km in the second 15 minutes, and 10 km in the third.',
            steps: [
            { text: 'Identify that the distance is 10 km per 15-minute interval.' },
            { text: 'Confirm intervals are equal (15 mins) and distances are equal (10 km). This is uniform motion.' },
            { text: 'Convert 15 minutes to hours (15/60 = 0.25 hours).' },
            { text: 'Use Speed = Distance / Time = 10 km / 0.25 h.' },
            { text: 'Result = 40 km/h.', faded: true, blankAnswer: '40 km/h' }
            ] } },
        { type: 'dissect', nodeId: 'c6_physics_ch08_031', title: 'Identify each idea',
          dissect: { specimen: 'Understanding Speed', spots: [
            { id: 's1', label: 'Speed is a measure of', prompt: 'Which idea is this? — Speed is a measure of how fast an object changes its position, calculated by dividing the.', answer: 'Speed is a measure of', options: ['Speed is a measure of', 'Non-uniform motion is the movement', 'Uniform motion occurs when an'] },
            { id: 's2', label: 'Non-uniform motion is the movement', prompt: 'Which idea is this? — Non-uniform motion is the movement of an object where its speed changes over time,.', answer: 'Non-uniform motion is the movement', options: ['Non-uniform motion is the movement', 'Speed is a measure of', 'Uniform motion occurs when an'] },
            { id: 's3', label: 'Uniform motion occurs when an', prompt: 'Which idea is this? — Uniform motion occurs when an object moves in a straight line at a constant speed,.', answer: 'Uniform motion occurs when an', options: ['Uniform motion occurs when an', 'Speed is a measure of', 'Non-uniform motion is the movement'] }
          ] } }
    ],
    explore: { component: C6_PhysicsUniformNonuniformMotionSim, prompt: 'Explore the interactive — Understanding Speed' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c6_physics_ch08_030', difficulty: 'standard',
          question: 'Uniform motion occurs when an object moves in a straight line at a constant.',
          hint: 'Review the definitions of "Distance" and "Time" from earlier sections of the chapter.',
          misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in.',
          parts: [
                { id: 'a', prompt: 'If a toy train travels 5 cm every 1 second, how far will it travel in 4 seconds if it is in uniform motion?', answer: 'It will travel 20 cm',
                  options: ['It will travel 20 cm', 'constant speed', 'constant velocity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'b', prompt: 'A car’s distance-time graph is a perfectly straight, sloped line. What does this tell you about the car\'s speed?', answer: 'The speed is constant',
                  options: ['The speed is constant', 'constant speed', 'constant velocity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'c', prompt: 'A bus travels 100 km in 2 hours. Calculate its speed.', answer: 'Speed = Distance / Time = 100 km / 2 h = 50 km/h',
                  options: ['Speed = Distance / Time = 100 km / 2 h = 50 km/h', 'constant speed', 'constant velocity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' }
          ],
            remediations: { 'students-often-confuse-constant-speed': { steps: ['First, ask the student to draw a table with two columns: Time (1s, 2s, 3s) and Distance (5m, 10m, 15m).', 'Ask them to calculate the difference between the distances for each step.', 'Explain that uniform motion is only present if that difference remains the same every single time.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch08_030', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in.',
          parts: [
                { id: 'a', prompt: 'If a cyclist covers 10m in the first second, 10m in the second, and 15m in the third, is this uniform motion? Why or why not?', answer: 'No, it is not uniform motion',
                  options: ['No, it is not uniform motion', 'equal distance', 'constant speed', 'constant velocity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' },
                { id: 'b', prompt: 'Design a simple experiment to prove a rolling marble is in uniform motion. What would you look for in your data?', answer: 'Measure the marble\'s position at every 1-second interval',
                  options: ['Measure the marble\'s position at every 1-second interval', 'constant speed', 'constant velocity', 'if an object moves, it must be in uniform motion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "constant speed" with "constant velocity" or assume that if an object moves, it must be in uniform motion.' }
          ],
            remediations: { 'students-often-confuse-constant-speed': { steps: ['First, ask the student to draw a table with two columns: Time (1s, 2s, 3s) and Distance (5m, 10m, 15m).', 'Ask them to calculate the difference between the distances for each step.', 'Explain that uniform motion is only present if that difference remains the same every single time.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
