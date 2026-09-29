import type { SimDef } from '../../engine/types';
import C9_PhysicsWeightMassComparisonSim from '../../../simulations/c6_12/C9_PhysicsWeightMassComparisonSim';

/** v3 wrapped master — C9_PhysicsWeightMassComparisonSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_physicsweightmasscomparisonsim: SimDef = {
    id: 'v3w_c9_physicsweightmasscomparisonsim',
    title: 'Distance-Time Graphs and Their Interpretation',
    subtitle: 'Covers interpretation of distance-time graphs for rectilinear motion including: straight.',
    classLevel: 9, subject: 'physics', topic: 'Distance-Time Graphs and Their Interpretation',
    chapters: [],
    nodeIds: ['c9_physics_ch2_6', 'c9_physics_ch5_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are standing at a railway crossing in Delhi and watch a train pass by.', goal: 'Master Distance-Time Graphs and Their Interpretation.' },
    discovery: {
        question: 'What physical quantity does the slope of a distance-time graph represent, and what are its SI units?',
        options: ['The slope represents speed, with SI units of metres per second (m/s)', 'velocity', 'acceleration'],
        answer: 'The slope represents speed, with SI units of metres per second (m/s)',
        hook: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or.',
    },
    teaching: [
        { title: 'A distance-time graph is a graphical.', text: 'A distance-time graph is a graphical representation plotting distance travelled (on the y-axis) against time elapsed (on the x-axis) for an object moving along a straight line.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch2_6', title: 'A distance-time graph is a graphical.',
          scaffold: { problem: 'A school bus leaves the depot at 7:00 AM. The following data is recorded: at 7:00 AM (t=0 s), distance = 0 km; at 7:10 AM (t=600 s),.',
            steps: [
            { text: 'Identify given quantities — time values: 0 s, 600 s, 1200 s, 1800 s; distance values: 0 km, 6 km, 12 km, 18 km.' },
            { text: 'The formula is speed = slope = Δd/Δt. Since points lie on a straight line through origin, choose any two points.' },
            { text: 'Substitute values: Δd = 18000 m - 0 m = 18000 m; Δt = 1800 s - 0 s = 1800 s. Speed = 18000 m / 1800 s.' },
            { text: 'Compute: 18000 / 1800 = 10. Units: m/s. The bus travels at constant speed 10 m/s.' },
            { text: 'Verify reasonableness: 10 m/s = 36 km/h, a typical city bus speed. The straight line confirms uniform motion.', faded: true, blankAnswer: '10 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_6', title: 'Speed of sound is the distance.',
          scaffold: { problem: 'A submarine sends a sonar pulse of frequency 50 kHz in seawater where the speed of sound is 1530 m/s.',
            steps: [
            { text: 'Identify given quantities: f = 50 kHz = 50,000 Hz, v_water = 1530 m/s, v_air = 340 m/s. Find λ_water and λ_air.' },
            { text: 'Recall the wave equation v = fλ, rearrange to λ = v/f. Check units: (m/s) / (1/s) = m, correct.' },
            { text: 'Substitute for water: λ_water = 1530 m/s / 50,000 Hz = 0.0306 m.' },
            { text: 'Substitute for air: λ_air = 340 m/s / 50,000 Hz = 0.0068 m.' },
            { text: 'Verify: Wavelength in water (3.06 cm) is longer than in air (0.68 cm) because speed is higher in water for the same.', faded: true, blankAnswer: 'λ_water = 0.0306 m (3.06 cm), λ_air = 0.0068 m (0.68 cm)' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch5_6', title: 'Identify each idea',
          dissect: { specimen: 'Distance-Time Graphs and Their Interpretation', spots: [
            { id: 's1', label: 'A distance-time graph is a', prompt: 'Which idea is this? — A distance-time graph is a graphical representation plotting distance travelled (on the.', answer: 'A distance-time graph is a', options: ['A distance-time graph is a', 'Speed of sound is the'] },
            { id: 's2', label: 'Speed of sound is the', prompt: 'Which idea is this? — Speed of sound is the distance travelled per unit time by a sound wave as it propagates.', answer: 'Speed of sound is the', options: ['Speed of sound is the', 'A distance-time graph is a'] }
          ] } }
    ],
    explore: { component: C9_PhysicsWeightMassComparisonSim, prompt: 'Explore the interactive — Distance-Time Graphs and Their Interpretation' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch2_6', difficulty: 'standard',
          question: 'A distance-time graph is a graphical representation plotting distance travelled.',
          hint: 'If stuck, revisit c9_physics_ch2_2 (Speed formula) and c9_physics_ch2_4 (Uniform vs.',
          misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or.',
          parts: [
                { id: 'a', prompt: 'What physical quantity does the slope of a distance-time graph represent, and what are its SI units?', answer: 'The slope represents speed, with SI units of metres per second (m/s)',
                  options: ['The slope represents speed, with SI units of metres per second (m/s)', 'velocity', 'acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' },
                { id: 'b', prompt: 'A distance-time graph for a car shows a straight line passing through the origin with a slope of 15 m/s. After 20 seconds, the line becomes horizontal.', answer: 'The horizontal section means the car is at rest (speed = 0 m/s)',
                  options: ['The horizontal section means the car is at rest (speed = 0 m/s)', 'the car moves backwards', 'returns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' },
                { id: 'c', prompt: 'Two cyclists, A and B, start from the same point at the same time. Cyclist A\'s distance-time graph is a straight line with slope 5 m/s.', answer: 'Average speed = total distance / total time = 75 m / 15 s = 5 m/s for both',
                  options: ['Average speed = total distance / total time = 75 m / 15 s = 5 m/s for both', 'returns', 'moves backwards'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe a distance-time graph can have a negative slope (line going downwards) when an object "returns" or "moves backwards".' }
          ],
            remediations: { 'a-distance-time-graph-can': { steps: ['Have the student walk 5 m forward, stop, then walk 5 m back to start.', 'Plot the actual distance-time data: t=0 s, d=0 m; t=5 s, d=5 m; t=10 s, d=10 m.', 'Contrast with a displacement-time graph for the same walk (goes up to +5 m, then down to 0 m).', 'Emphasise: "Distance never decreases — odometer in a car never rolls backward."'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_6', difficulty: 'standard',
          question: 'Speed of sound is the distance travelled per unit time by a sound wave as it.',
          hint: 'If stuck, revisit c9_physics_ch5_4 (wavelength-frequency-speed relationship) and.',
          misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.',
          parts: [
                { id: 'a', prompt: 'State the typical speed of sound in air at 20°C, in water at 20°C, and in steel at 20°C, along with their SI units.', answer: 'At 20°C: air ≈ 343 m/s, water ≈ 1480 m/s, steel ≈ 5960 m/s',
                  options: ['At 20°C: air ≈ 343 m/s, water ≈ 1480 m/s, steel ≈ 5960 m/s', 'universal', 'denser medium means faster sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' },
                { id: 'b', prompt: 'Calculate the wavelength of a 1000 Hz sound wave in (a) air at 20°C and (b) steel at 20°C. Use v_air = 343 m/s and v_steel = 5960 m/s.', answer: 'air at 20°C and (',
                  options: ['air at 20°C and (', 'denser medium means faster sound', '"denser medium means faster sound"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' },
                { id: 'c', prompt: 'Two students measure the time taken for a sound pulse to travel 100 m through a steel rod and through air at 20°C.', answer: 'Speed in steel = 100 m / 0.0168 s ≈ 5950 m/s (matches steel)',
                  options: ['Speed in steel = 100 m / 0.0168 s ≈ 5950 m/s (matches steel)', 'denser medium means faster sound', '"denser medium means faster sound"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' }
          ],
            remediations: { 'denser-medium-means-faster-sound': { steps: ['Show a video or demo of a longitudinal wave on a slinky (low stiffness, low density) vs.', 'Ask students to predict which transmits a pulse faster.', 'Measure and compare.', 'Explicitly write v ∝ √(E/ρ) on the board and plug in approximate values for steel (E ≈ 200 GPa, ρ ≈ 7800 kg/m³) and.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Sound travels faster in denser media because the particles are closer together, so they collide more often." Evaluate this statement and.', answer: 'The statement is partially correct about particle proximity but incorrect in its',
                  options: ['The statement is partially correct about particle proximity but incorrect in its', 'denser medium means faster sound', 'density alone determines speed, ignoring elasticity', '"denser medium means faster sound"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' },
                { id: 'b', prompt: 'Design a simple school-lab experiment to demonstrate that sound travels faster in a solid than in air, using only a metre scale, a stopwatch, and a metal rod.', answer: 'Procedure: Place the metal rod on a table',
                  options: ['Procedure: Place the metal rod on a table', 'denser medium means faster sound', '"denser medium means faster sound"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' }
          ],
            remediations: { 'denser-medium-means-faster-sound': { steps: ['Show a video or demo of a longitudinal wave on a slinky (low stiffness, low density) vs.', 'Ask students to predict which transmits a pulse faster.', 'Measure and compare.', 'Explicitly write v ∝ √(E/ρ) on the board and plug in approximate values for steel (E ≈ 200 GPa, ρ ≈ 7800 kg/m³) and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
