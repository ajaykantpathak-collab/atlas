import type { SimDef } from '../../engine/types';
import C8_ScienceOurHomeEarthAUniqueSim from '../../../simulations/c6_12/C8_ScienceOurHomeEarthAUniqueSim';

/** v3 wrapped master — C8_ScienceOurHomeEarthAUniqueSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_scienceourhomeearthauniquesim: SimDef = {
    id: 'v3w_c8_scienceourhomeearthauniquesim',
    title: 'Earth as a Unique Planet: Conditions for Life',
    subtitle: 'This node covers the overview of life-sustaining conditions on Earth (temperature, water,.',
    classLevel: 8, subject: 'science', topic: 'Earth as a Unique Planet: Conditions for Life',
    chapters: [],
    nodeIds: ['c8_physics_ch9_1', 'c8_physics_ch9_2'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Look up at the night sky from your terrace in Delhi or a village in Kerala — you see the Moon, maybe Venus or.', goal: 'Master Earth as a Unique Planet: Conditions for Life.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Earth is a unique planet in our solar system.', text: 'Earth is a unique planet in our solar system because it possesses a specific combination of physical conditions — including a stable temperature range allowing liquid water, a protective atmosphere.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch9_1', title: 'Earth is a unique planet in our solar.',
          scaffold: { problem: 'A student claims: "Mars is further from the Sun than Earth, so it\'s colder.',
            steps: [
            { text: 'Identify the claim\'s assumption — only distance determines temperature.' },
            { text: 'Recall Mars has very thin atmosphere (pressure ~0.6 kPa vs Earth\'s 101 kPa) — even at Earth\'s distance, low pressure.' },
            { text: 'Recall Mars has no global magnetic field — solar wind would strip any thickened atmosphere over time (as it did.' },
            { text: 'Recall Mars has lower gravity (3.7 m/s² vs 9.8 m/s²) — even with magnetic field, lighter gases (N₂, O₂, H₂O) escape to.' },
            { text: 'Conclude: Distance is necessary but not sufficient; atmosphere, magnetic field, and gravity are co-requirements.', faded: true, blankAnswer: 'The claim is false. At Earth\'s orbit, Mars would still.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch9_2', title: 'Earth\'s crust is the outermost solid.',
          scaffold: { problem: 'Earth\'s average radius is 6,371 km. The average thickness of continental crust is 35 km and oceanic crust is 7 km.',
            steps: [
            { text: 'Identify given quantities: R_earth = 6,371 km, T_cont = 35 km, T_ocean = 7 km. Find: %_cont and %_ocean.' },
            { text: 'Formula: Percentage = (Crust Thickness / Earth Radius) × 100%. Units: km/km cancels, giving dimensionless percentage.' },
            { text: 'Substitute continental: %_cont = (35 km / 6,371 km) × 100% = 0.005494 × 100%.' },
            { text: 'Compute: %_cont = 0.5494% ≈ 0.55%. Substitute oceanic: %_ocean = (7 km / 6,371 km) × 100% = 0.001099 × 100% = 0.1099% ≈.' },
            { text: 'Verify reasonableness: Crust is less than 1% of radius for both, continental ~5× thicker than oceanic.', faded: true, blankAnswer: 'Continental crust = 0.55% of Earth\'s radius; Oceanic crust.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch9_2', title: 'Identify each idea',
          dissect: { specimen: 'Earth as a Unique Planet: Conditions for Life', spots: [
            { id: 's1', label: 'Earth is a unique planet', prompt: 'Which idea is this? — Earth is a unique planet in our solar system because it possesses a specific combination.', answer: 'Earth is a unique planet', options: ['Earth is a unique planet', 'Earths crust is the outermost'] },
            { id: 's2', label: 'Earths crust is the outermost', prompt: 'Which idea is this? — Earth\'s crust is the outermost solid rocky layer of our planet, averaging only 30 km in.', answer: 'Earths crust is the outermost', options: ['Earths crust is the outermost', 'Earth is a unique planet'] }
          ] } }
    ],
    explore: { component: C8_ScienceOurHomeEarthAUniqueSim, prompt: 'Explore the interactive — Earth as a Unique Planet: Conditions for Life' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch9_1', difficulty: 'standard',
          question: 'Earth is a unique planet in our solar system because it possesses a specific.',
          hint: 'If stuck, revisit c7_physics_ch06_001 (rotation/day-night) and c6_physics_ch07_023 (water.',
          misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating.',
          parts: [
                { id: 'a', prompt: 'Compare Earth and Venus: both are similar in size and have atmospheres, but Venus has a surface temperature of 464°C while Earth averages 15°C.', answer: 'Venus fails the "suitable temperature" condition',
                  options: ['Venus fails the "suitable temperature" condition', 'closer to Sun'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating distance as the sole.' }
          ],
            remediations: { 'earth-is-at-the-right': { steps: ['Show a 2-minute video of Moon surface temperatures (day: 127°C, night: -173°C) — same distance as Earth, no atmosphere.', 'In class, use two thermometers: one in a sealed transparent box under a lamp, one in open air.', 'Plot both curves.', 'Guide students to calculate Earth\'s expected temperature without atmosphere using Stefan-Boltzmann idea (simplified:.', 'Connect to greenhouse gases trapping outgoing heat. This directly confronts the "distance alone" error with empirical.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating.',
          parts: [
                { id: 'a', prompt: 'Compare Earth and Venus: both are similar in size and have atmospheres, but Venus has a surface temperature of 464°C while Earth averages 15°C.', answer: 'Venus fails the "suitable temperature" condition',
                  options: ['Venus fails the "suitable temperature" condition', 'closer to Sun'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating distance as the sole.' }
          ],
            remediations: { 'earth-is-at-the-right': { steps: ['Show a 2-minute video of Moon surface temperatures (day: 127°C, night: -173°C) — same distance as Earth, no atmosphere.', 'In class, use two thermometers: one in a sealed transparent box under a lamp, one in open air.', 'Plot both curves.', 'Guide students to calculate Earth\'s expected temperature without atmosphere using Stefan-Boltzmann idea (simplified:.', 'Connect to greenhouse gases trapping outgoing heat. This directly confronts the "distance alone" error with empirical.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_2', difficulty: 'standard',
          question: 'Earth\'s crust is the outermost solid rocky layer of our planet, averaging only.',
          hint: 'Review unit conversions (km ↔ m ↔ mm) and ratio calculations from Class 6/7 measurement.',
          misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of.',
          parts: [
                { id: 'a', prompt: 'If Earth were scaled down to a sphere of radius 50 cm (like a large beach ball), calculate the thickness of continental crust and oceanic crust on this model.', answer: '**Step 1:** Identify scale factor',
                  options: ['**Step 1:** Identify scale factor', 'lithosphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which is scientifically accurate.', answer: 'Statement B is accurate',
                  options: ['Statement B is accurate', 'lithosphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' }
          ],
            remediations: { 'crust-and-lithosphere-are-the': { steps: ['**Apple Demo:** Slice an apple horizontally.', 'Show skin = crust (∼0.3 mm), flesh = mantle, seeds = core.', 'Measure apple radius (∼35 mm) and skin thickness.', 'Calculate ratio (0.3/35 ≈ 1/117).'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since the crust is so thin compared to Earth\'s radius, it cannot possibly support massive mountain ranges like the Himalayas." Evaluate this.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'lithosphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using everyday materials (fruit, clay, balls, etc.) to show the relative thinness of Earth\'s crust and the difference.', answer: '**Example answer:** Use a large watermelon (radius ~15 cm) as Earth',
                  options: ['**Example answer:** Use a large watermelon (radius ~15 cm) as Earth', 'lithosphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' },
                { id: 'c', prompt: 'Compare the following two statements and identify which is scientifically accurate.', answer: 'Statement B is accurate',
                  options: ['Statement B is accurate', 'lithosphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' }
          ],
            remediations: { 'crust-and-lithosphere-are-the': { steps: ['**Apple Demo:** Slice an apple horizontally.', 'Show skin = crust (∼0.3 mm), flesh = mantle, seeds = core.', 'Measure apple radius (∼35 mm) and skin thickness.', 'Calculate ratio (0.3/35 ≈ 1/117).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
