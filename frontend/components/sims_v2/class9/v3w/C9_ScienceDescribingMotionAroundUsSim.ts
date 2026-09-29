import type { SimDef } from '../../engine/types';
import C9_ScienceDescribingMotionAroundUsSim from '../../../simulations/c6_12/C9_ScienceDescribingMotionAroundUsSim';

/** v3 wrapped master — C9_ScienceDescribingMotionAroundUsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencedescribingmotionaroundussim: SimDef = {
    id: 'v3w_c9_sciencedescribingmotionaroundussim',
    title: 'Distance and Displacement: Difference',
    subtitle: 'Covers definitions, scalar/vector distinction, calculation for straight-line and.',
    classLevel: 9, subject: 'science', topic: 'Distance and Displacement: Difference',
    chapters: [],
    nodeIds: ['c9_physics_ch2_1'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a student walking from the school gate to the library, then to the canteen, and back to the gate.', goal: 'Master Distance and Displacement: Difference.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Distance is a scalar quantity measuring the.', text: 'Distance is a scalar quantity measuring the total path length traveled by an object, with SI unit meter (m).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch2_1', title: 'Distance is a scalar quantity measuring.',
          scaffold: { problem: 'An auto-rickshaw in Delhi starts from a stand at point O. It goes 2.5 km north to pick a passenger at point A, then 1.5 km south to drop at.',
            steps: [
            { text: 'Identify given quantities: OA = 2.5 km north, AB = 1.5 km south, BC = 3 km north.' },
            { text: 'Distance formula: sum of all segment lengths = OA + AB + BC. Displacement: assign north as +ve, south as -ve.' },
            { text: 'Substitute: Distance = 2500 m + 1500 m + 3000 m. Displacement = 2500 - 1500 + 3000.' },
            { text: 'Compute: Distance = 7000 m. Displacement = 4000 m north (positive sign indicates north).' },
            { text: 'Verify: Distance (7000 m) > |Displacement| (4000 m), consistent with principle.', faded: true, blankAnswer: 'Distance = 7000 m, Displacement = 4000 m north.' }
            ] } }
    ],
    explore: { component: C9_ScienceDescribingMotionAroundUsSim, prompt: 'Explore the interactive — Distance and Displacement: Difference' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch2_1', difficulty: 'standard',
          question: 'Distance is a scalar quantity measuring the total path length traveled by an.',
          hint: 'Revisit Class 6 "Understanding Speed" (c6_physics_ch08_029) and Class 8 "Force:.',
          misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths.',
          parts: [
                { id: 'a', prompt: 'A car moves 50 m east, then 30 m west. What is the distance traveled and the displacement of the car? State the SI unit for each.', answer: 'Distance = 80 m, Displacement = 20 m east',
                  options: ['Distance = 80 m, Displacement = 20 m east', 'distance with a direction sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'b', prompt: 'A cyclist rides 3 km north, then 4 km east. Calculate the distance traveled and the magnitude of displacement. (Use Pythagoras for displacement magnitude.)', answer: 'Distance = 3 km + 4 km = 7 km',
                  options: ['Distance = 3 km + 4 km = 7 km', 'distance with a direction sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'c', prompt: 'A particle moves on a number line: starts at x = -2 m, goes to x = +5 m, then to x = -1 m.', answer: 'Distance = |5 - (-2)| + |-1 - 5| = 7 + 6 = 13 m',
                  options: ['Distance = |5 - (-2)| + |-1 - 5| = 7 + 6 = 13 m', 'distance with a direction sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' }
          ],
            remediations: { 'displacement-is-distance-with-a': { steps: ['Draw a large number line on floor with tape.', 'Student starts at 0, walks to +3, then to -1.', 'Class measures each segment (3 m, 4 m) and totals 7 m (distance).', 'Teacher stretches a string from start (0) to end (-1): length 1 m (displacement magnitude).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A boy walks 10 m forward, then 10 m backward. Distance = 0 m, Displacement = 20 m." Evaluate this solution.', answer: 'The solution swaps the two quantities',
                  options: ['The solution swaps the two quantities', 'distance with a direction sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' },
                { id: 'b', prompt: 'Design a simple experiment using a meter scale, a toy car, and tape to demonstrate that distance ≥ |displacement|.', answer: 'Procedure: Mark start point A',
                  options: ['Procedure: Mark start point A', 'distance with a direction sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think displacement is "distance with a direction sign" and calculate it by adding signed segment lengths (e.g., +5 for east, -3.' }
          ],
            remediations: { 'displacement-is-distance-with-a': { steps: ['Draw a large number line on floor with tape.', 'Student starts at 0, walks to +3, then to -1.', 'Class measures each segment (3 m, 4 m) and totals 7 m (distance).', 'Teacher stretches a string from start (0) to end (-1): length 1 m (displacement magnitude).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
