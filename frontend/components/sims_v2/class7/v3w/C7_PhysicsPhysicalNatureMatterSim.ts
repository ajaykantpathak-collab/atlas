import type { SimDef } from '../../engine/types';
import C7_PhysicsPhysicalNatureMatterSim from '../../../simulations/c6_12/C7_PhysicsPhysicalNatureMatterSim';

/** v3 wrapped master — C7_PhysicsPhysicalNatureMatterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicsphysicalnaturemattersim: SimDef = {
    id: 'v3w_c7_physicsphysicalnaturemattersim',
    title: 'Branches of Science: Physics, Chemistry, Biology, Earth Science',
    subtitle: 'Covers the identification and definition of physics as a distinct branch of natural.',
    classLevel: 7, subject: 'physics', topic: 'Branches of Science: Physics, Chemistry, Biology, Earth Science',
    chapters: [],
    nodeIds: ['c7_physics_ch01_006', 'c7_physics_ch05_002', 'c7_physics_ch01_002', 'c7_physics_ch01_008', 'c7_physics_ch01_010', 'c7_physics_ch04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you look at a ceiling fan spinning in your classroom or a bicycle moving down an Indian street, you are.', goal: 'Master Branches of Science: Physics, Chemistry, Biology, Earth Science.' },
    discovery: {
        question: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting them blindly?',
        options: ['Scientific temper', 'memorization', 'assumption'],
        answer: 'Scientific temper',
        hook: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an.',
    },
    teaching: [
        { title: 'Physics is the branch of science that.', text: 'Physics is the branch of science that studies matter, energy, motion, force, and their interactions in the physical universe, measured in fundamental SI units such as meters (m), kilograms (kg), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch01_006', title: 'Physics is the branch of science that.',
          scaffold: { problem: 'A bicycle moving down a sloping road in Shimla undergoes several changes.',
            steps: [
            { text: 'Analyze event (a) - Speed, motion, and force are investigated. Speed is measured in meters per second (m/s).' },
            { text: 'Analyze event (b) - Muscle contraction, cellular energy, and living metabolism are investigated.' },
            { text: 'Analyze event (c) - Chemical changes involving iron, oxygen, and water to form iron oxide are investigated.' },
            { text: 'Assign each event to its respective scientific branch based on the core interaction.' },
            { text: 'Conclude classifications: (a) Physics, (b) Biology, (c) Chemistry.', faded: true, blankAnswer: '(a) Physics, (b) Biology, (c) Chemistry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_002', title: 'Luminous objects are those that emit.',
          scaffold: { problem: 'Classify the following four items found in a typical Indian school classroom into luminous and non-luminous categories: 1) A glowing tube.',
            steps: [
            { text: 'Examine item 1 (glowing tube light). It uses electricity to produce its own light. Therefore, it is luminous.' },
            { text: 'Examine item 2 (wooden desk). It does not produce any light; it only reflects classroom light.' },
            { text: 'Examine item 3 (burning sun). It undergoes nuclear fusion to generate its own massive amount of light.' },
            { text: 'Examine item 4 (green chalkboard). It does not emit light of its own and is only visible because light bounces off its.' },
            { text: 'Group the items into final categories: Luminous = Tube light, Sun; Non-luminous = Wooden desk, Chalkboard.', faded: true, blankAnswer: 'Luminous: Tube light, Sun; Non-luminous: Wooden desk,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch01_002', title: 'The interconnectedness of science.',
          scaffold: { problem: 'A student riding a bicycle in a park applies a braking force of 20 N over a distance of 5 meters to stop.',
            steps: [
            { text: 'Identify given values: force $F = 20\\text{ N}$, distance $d = 5\\text{ m}$.' },
            { text: 'Identify the relevant formula for work done: $\\text{Work } W = F \\times d$.' },
            { text: 'Substitute the given values with their respective units: $W = 20\\text{ N} \\times 5\\text{ m}$.' },
            { text: 'Compute the numerical value and track unit combination ($\\text{N}\\cdot\\text{m} = \\text{J}$): $W = 100\\text{ J}$.' },
            { text: 'Verify the physical reasonableness: $100\\text{ J}$ of thermal energy produced by friction is a realistic amount for.', faded: true, blankAnswer: '100 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch01_008', title: 'The role of experiments in.',
          scaffold: { problem: 'A student measures the time taken for a pendulum of length 0.5 m to complete 10 oscillations in 3 separate trials.',
            steps: [
            { text: 'Identify given values with units: Trial 1 ($t_1$) = 14.2 s, Trial 2 ($t_2$) = 14.5 s, Trial 3 ($t_3$) = 14.3 s, number.' },
            { text: 'Identify formula for average time ($T_{\\text{avg}}$) = $(t_1 + t_2 + t_3) / 3$, and formula for time period of one.' },
            { text: 'Substitute values into average formula: $T_{\\text{avg}} = (14.2\\text{ s} + 14.5\\text{ s} + 14.3\\text{ s}) / 3 =.' },
            { text: 'Compute average and track unit: $T_{\\text{avg}} = 14.33\\text{ s}$.' },
            { text: 'Verify the answer is physically reasonable (a half-meter pendulum taking about 1.4 seconds per swing makes sense) and.', faded: true, blankAnswer: '1.43 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch01_010', title: 'Science is an ongoing, evolving process.',
          scaffold: { problem: 'A student records the temperature of boiling water in a school science lab over three consecutive days.',
            steps: [
            { text: 'Identify the given values with units: $T_1 = 99.0\\text{ °C}$, $T_2 = 99.2\\text{ °C}$, $T_3 = 98.9\\text{ °C}$.' },
            { text: 'Set up the formula for average temperature: $\\text{Average } T = \\frac{T_1 + T_2 + T_3}{n}$, where $n = 3$.' },
            { text: 'Substitute the numerical values and units into the equation: $\\text{Average } T = \\frac{99.0\\text{ °C} + 99.2\\text{ °C}.' },
            { text: 'Compute the sum and divide, tracking units: Sum $= 297.1\\text{ °C}$; $\\text{Average } T = \\frac{297.1\\text{ °C}}{3} =.' },
            { text: 'Verify if the answer is physically reasonable (water boils near 100 °C depending on atmospheric pressure) and state.', faded: true, blankAnswer: '99.03 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_008', title: 'Uniform linear motion is the motion of.',
          scaffold: { problem: 'A metro train on a straight elevated track travels 150 meters in the first 10 seconds, 150 meters in the next 10 seconds, and 150 meters in.',
            steps: [
            { text: 'Identify the given distance ($d$) and time ($t$) for each of the three intervals: Interval 1 ($d_1 = 150\\text{ m}, t_1.' },
            { text: 'State the formula for speed: $v = \\frac{d}{t}$ and verify units are in meters and seconds.' },
            { text: 'Substitute the values for each interval: $v_1 = \\frac{150\\text{ m}}{10\\text{ s}}$, $v_2 = \\frac{150\\text{ m}}{10\\text{.' },
            { text: 'Compute the values and track unit cancellation: $v_1 = 15\\text{ m/s}$, $v_2 = 15\\text{ m/s}$, $v_3 = 15\\text{ m/s}$.' },
            { text: 'Verify if the speeds are equal across all intervals. Since $15\\text{ m/s} = 15\\text{ m/s} = 15\\text{ m/s}$, the motion.', faded: true, blankAnswer: 'Uniform motion; speed in all intervals is 15 m/s.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch05_002', title: 'Identify each idea',
          dissect: { specimen: 'Branches of Science: Physics, Chemistry, Biology, Earth Science', spots: [
            { id: 's1', label: 'Physics is the branch of', prompt: 'Which idea is this? — Physics is the branch of science that studies matter, energy, motion, force, and their.', answer: 'Physics is the branch of', options: ['Physics is the branch of', 'Luminous objects are those that', 'The interconnectedness of science disciplines', 'The role of experiments in'] },
            { id: 's2', label: 'Luminous objects are those that', prompt: 'Which idea is this? — Luminous objects are those that emit their own light by converting various forms of.', answer: 'Luminous objects are those that', options: ['Luminous objects are those that', 'Physics is the branch of', 'The interconnectedness of science disciplines', 'The role of experiments in'] },
            { id: 's3', label: 'The interconnectedness of science disciplines', prompt: 'Which idea is this? — The interconnectedness of science disciplines is the principle that natural phenomena.', answer: 'The interconnectedness of science disciplines', options: ['The interconnectedness of science disciplines', 'Physics is the branch of', 'Luminous objects are those that', 'The role of experiments in'] },
            { id: 's4', label: 'The role of experiments in', prompt: 'Which idea is this? — The role of experiments in understanding nature is the systematic process of testing.', answer: 'The role of experiments in', options: ['The role of experiments in', 'Physics is the branch of', 'Luminous objects are those that', 'The interconnectedness of science disciplines'] },
            { id: 's5', label: 'Science is an ongoing evolving', prompt: 'Which idea is this? — Science is an ongoing, evolving process of discovery where observations, experiments, and.', answer: 'Science is an ongoing evolving', options: ['Science is an ongoing evolving', 'Physics is the branch of', 'Luminous objects are those that', 'The interconnectedness of science disciplines'] },
            { id: 's6', label: 'Uniform linear motion is the', prompt: 'Which idea is this? — Uniform linear motion is the motion of an object along a straight line where it covers.', answer: 'Uniform linear motion is the', options: ['Uniform linear motion is the', 'Physics is the branch of', 'Luminous objects are those that', 'The interconnectedness of science disciplines'] }
          ] } }
    ],
    explore: { component: C7_PhysicsPhysicalNatureMatterSim, prompt: 'Explore the interactive — Branches of Science: Physics, Chemistry, Biology, Earth Science' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch01_006', difficulty: 'standard',
          question: 'Physics is the branch of science that studies matter, energy, motion, force,.',
          hint: 'Review c6_physics_ch01_003 to refresh how science is divided into broad observational.',
          misconception: 'Students often think that the branches of science (Physics, Chemistry, Biology, Earth Science) are completely separate.',
          parts: [
                { id: 'a', prompt: 'Which branch of science primarily investigates forces, motion, heat, light, and electricity?', answer: 'Physics is the branch that studies forces, motion, heat, light, and electricity',
                  options: ['Physics is the branch that studies forces, motion, heat, light, and electricity', 'Biology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the branches of science (Physics, Chemistry, Biology, Earth Science) are completely separate boxes that never.' }
          ],
            remediations: { 'the-branches-of-science-physics': { steps: ['Remediate this by taking a common everyday object, such as a smartphone or a bicycle, and mapping out all four.', 'Show the student that nature does not divide itself into subjects; humans do it to understand different aspects of the.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_002', difficulty: 'standard',
          question: 'Luminous objects are those that emit their own light by converting various.',
          hint: 'Review c7_physics_ch05_001 on Sources of Light: Natural and Artificial to reinforce how.',
          misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Luminous objects are those that emit their own light by converting various forms of',
                  options: ['Luminous objects are those that emit their own light by converting various forms of', 'Physics is the branch of science that studies matter, energy, motion, force, and their', 'The interconnectedness of science disciplines is the principle that natural phenomena', 'The role of experiments in understanding nature is the systematic process of testing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal plate, a glass marble,.' }
          ],
            remediations: { 'any-object-that-looks-bright': { steps: ['To fix this, take the student into a windowless room or use a closed shoebox.', 'Place a shiny object like a steel spoon and a glowing object like a lit torch inside the box.', 'Close the lid completely and look through a pinhole—only the lit torch part of the torch can be seen if it emits light,.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_002', difficulty: 'standard',
          question: 'The interconnectedness of science disciplines is the principle that natural.',
          hint: 'Review Class 6 topics on branches of science to reinforce what physics, chemistry, and.',
          misconception: 'Students often think that school subjects like physics, chemistry, and biology exist as completely separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The interconnectedness of science disciplines is the principle that natural phenomena',
                  options: ['The interconnectedness of science disciplines is the principle that natural phenomena', 'Physics is the branch of science that studies matter, energy, motion, force, and their', 'Luminous objects are those that emit their own light by converting various forms of', 'The role of experiments in understanding nature is the systematic process of testing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that school subjects like physics, chemistry, and biology exist as completely separate compartments in the real world,.' }
          ],
            remediations: { 'school-subjects-like-physics': { steps: ['To fix this misconception, take a common object like a flashlight and trace all sciences involved: the electric circuit.', 'Guide the student to list observations and consciously tag each one with at least two scientific disciplines to break.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_008', difficulty: 'standard',
          question: 'The role of experiments in understanding nature is the systematic process of.',
          hint: 'Review c6_physics_ch01_002 to reinforce how hypotheses are tested through step-by-step.',
          misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of experiments in understanding nature is the systematic process of testing',
                  options: ['The role of experiments in understanding nature is the systematic process of testing', 'Physics is the branch of science that studies matter, energy, motion, force, and their', 'Luminous objects are those that emit their own light by converting various forms of', 'The interconnectedness of science disciplines is the principle that natural phenomena'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed" experiment and of no value.' }
          ],
            remediations: { 'if-an-experiment-does-not': { steps: ['To fix this misconception, guide the student to reframe unexpected results not as failures, but as new questions to.', 'Have them deliberately test how changing a neglected variable (like crumpling the paper or measuring wind in the room).', 'Explain that famous scientific discoveries often arose from unexpected experimental anomalies that forced scientists to.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed".',
          parts: [
                { id: 'a', prompt: 'A student performs an experiment on heat conduction in metal rods of different materials (copper, iron, aluminum) of the exact same length and thickness, using.', answer: 'The conclusion is justified',
                  options: ['The conclusion is justified', 'failed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if an experiment does not turn out the way they expected or hoped, it is a "failed" experiment and of no value.' }
          ],
            remediations: { 'if-an-experiment-does-not': { steps: ['To fix this misconception, guide the student to reframe unexpected results not as failures, but as new questions to.', 'Have them deliberately test how changing a neglected variable (like crumpling the paper or measuring wind in the room).', 'Explain that famous scientific discoveries often arose from unexpected experimental anomalies that forced scientists to.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch01_010', difficulty: 'standard',
          question: 'Science is an ongoing, evolving process of discovery where observations,.',
          hint: 'Review c6_physics_ch01_002 to reinforce how observations lead to logical conclusions.',
          misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an.',
          parts: [
                { id: 'a', prompt: 'What term best describes the scientific habit of questioning established ideas and testing them against new evidence rather than accepting them blindly?', answer: 'Scientific temper',
                  options: ['Scientific temper', 'memorization', 'assumption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think science is a static collection of absolute "facts" memorized from a textbook, rather than an active, ongoing method of.' }
          ],
            remediations: { 'science-is-a-static-collection': { steps: ['To fix this misconception, guide the student to compare how a specific topic (like light or heat) was understood.', 'Have them perform a simple experiment where their first measurement of a moving toy car\'s speed differs slightly from a.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_008', difficulty: 'standard',
          question: 'Uniform linear motion is the motion of an object along a straight line where it.',
          hint: 'Review c7_physics_ch04_006 to ensure you can calculate speed correctly before comparing.',
          misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform.',
          parts: [
                { id: 'a', prompt: 'A car travels along a straight highway, covering exactly 50 meters every 5 seconds. Is this motion uniform or non-uniform, and why?', answer: 'This is uniform motion',
                  options: ['This is uniform motion', 'non-uniform', 'just moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' },
                { id: 'b', prompt: 'During a 10-second run, a sprinter covers 2 meters in the first second, 4 meters in the second second, and 6 meters in the third second.', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'just moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' },
                { id: 'c', prompt: 'Analyze the following distance-time data for a bicycle moving in a straight line: At t=0s, d=0m; at t=2s, d=10m; at t=4s, d=25m; at t=6s, d=45m.', answer: 'The motion is non-uniform',
                  options: ['The motion is non-uniform', 'just moving'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['To fix this, have the student take a toy car and push it across a rough carpet.', 'Ask them to measure how far it travels in the 1st second, 2nd second, and 3rd second using a phone stopwatch or wall.', 'When they see the car covers 40 cm in the first second but only 10 cm in the third second before stopping, point out.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If a vehicle travels a total distance of 100 km in 2 hours, its motion must be uniform throughout the entire journey." Is this.', answer: 'The statement is false and invalid',
                  options: ['The statement is false and invalid', 'just moving', 'an average speed implies a constant, unvarying speed throughout the entire trip'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if an object is moving forward in a straight line, its motion is automatically uniform because it is "just.' }
          ],
            remediations: { 'if-an-object-is-moving': { steps: ['To fix this, have the student take a toy car and push it across a rough carpet.', 'Ask them to measure how far it travels in the 1st second, 2nd second, and 3rd second using a phone stopwatch or wall.', 'When they see the car covers 40 cm in the first second but only 10 cm in the third second before stopping, point out.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
