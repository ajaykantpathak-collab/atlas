import type { SimDef } from '../../engine/types';
import C11_PhysicsConservationMechanicalEnergySim from '../../../simulations/c6_12/C11_PhysicsConservationMechanicalEnergySim';

/** v3 wrapped master — C11_PhysicsConservationMechanicalEnergySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsconservationmechanicalenergysim: SimDef = {
    id: 'v3w_c11_physicsconservationmechanicalenergysim',
    title: 'Potential Energy of a Spring',
    subtitle: 'This node covers: Hooke\'s law ($F_s = -kx$), derivation of spring potential energy $U =.',
    classLevel: 11, subject: 'physics', topic: 'Potential Energy of a Spring',
    chapters: [],
    nodeIds: ['c11_phy_cbse_05_008', 'c11_phy_cbse_05_009', 'c11_phy_cbse_05_010', 'c11_phy_cbse_10_008', 'c11_phy_cbse_13_004', 'c11_phy_cbse_04_006', 'c11_phy_cbse_07_001', 'c11_phy_cbse_07_010', 'c11_phy_cbse_05_013', 'c11_phy_cbse_05_014', 'c11_phy_cbse_05_015', 'c11_phy_cbse_06_005', 'c11_phy_cbse_05_012', 'c11_phy_cbse_11_002', 'c11_phy_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a common spring balance used in Indian vegetable markets — when you hang a 1 kg tomato bag, the.', goal: 'Master Potential Energy of a Spring.' },
    discovery: {
        question: 'A block is moved from point A to point B along two different paths: Path 1 is a straight line, Path 2 is a longer curved path.',
        options: ['For gravity (conservative), \\( W_1 = W_2 \\)', 'work done in a specific displacement', 'work done over any closed path'],
        answer: 'For gravity (conservative), \\( W_1 = W_2 \\)',
        hook: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force,.',
    },
    teaching: [
        { title: 'The elastic potential energy of a spring is.', text: 'The elastic potential energy of a spring is the energy stored in a spring due to its deformation (extension or compression) from its equilibrium position, given by the formula $U = \\frac{1}{2}kx^2$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_008', title: 'The elastic potential energy of a.',
          scaffold: { problem: 'A spring gun has a spring of force constant $k = 400\\ \\text{N/m}$.',
            steps: [
            { text: 'Identify given quantities with units: $k = 400\\ \\text{N/m}$, $m = 20\\ \\text{g} = 0.02\\ \\text{kg}$, $x = 5\\ \\text{cm} =.' },
            { text: 'For (a), apply conservation of mechanical energy inside the gun: initial spring potential energy = final kinetic energy.' },
            { text: 'Substitute values: $v = 0.05 \\times \\sqrt{400 / 0.02} = 0.05 \\times \\sqrt{20000} = 0.05 \\times 141.42 = 7.07\\.' },
            { text: 'For (b), treat as projectile motion. Time of fall: $h = \\frac{1}{2}gt^2 \\Rightarrow t = \\sqrt{2h/g} = \\sqrt{2 \\times.' },
            { text: 'Verify physical reasonableness: Spring gun firing a light ball at ~7 m/s reaching ~3.5 m horizontally from 1.2 m height.', faded: true, blankAnswer: '(a) $7.07\\ \\text{m/s}$, (b) $3.46\\ \\text{m}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_009', title: 'A force is **conservative** if the work.',
          scaffold: { problem: 'A 0.5 kg block is pushed against a horizontal spring (spring constant \\( k = 200 \\, \\text{N/m} \\)) compressing it by 0.1 m.',
            steps: [
            { text: 'Identify the forces doing work: spring force (conservative) and kinetic friction (non-conservative).' },
            { text: 'Initial spring potential energy \\( U_i = \\frac{1}{2} k x^2 = \\frac{1}{2} \\times 200 \\times (0.1)^2 = 1 \\, \\text{J} \\).' },
            { text: 'Work done by friction \\( W_f = -f_k d = -\\mu_k m g d \\). Here \\( f_k = 0.15 \\times 0.5 \\times 10 = 0.75 \\, \\text{N} \\).' },
            { text: 'Apply work-energy theorem including non-conservative work: \\( \\Delta K = W_{\\text{spring}} + W_f \\).' },
            { text: 'Solve for \\( d \\): \\( 0.75 d = 1 \\Rightarrow d = 1 / 0.75 = 1.33 \\, \\text{m} \\).', faded: true, blankAnswer: '\\( d = 1.33 \\, \\text{m} \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_010', title: 'The principle of conservation of.',
          scaffold: { problem: 'A 500 g ball is dropped from a height of 20 m above the ground. During its fall, air resistance does -15 J of work on the ball.',
            steps: [
            { text: 'Identify given quantities with units: m = 500 g = 0.5 kg, h = 20 m, W_air = -15 J (negative because air resistance.' },
            { text: 'Choose the principle. Since air resistance (non-conservative force) does work, use generalized work-energy: Ki + Vi +.' },
            { text: 'Write initial and final energies. Initial: Ki = 0 (dropped from rest), Vi = mgh = 0.5 × 10 × 20 = 100 J.' },
            { text: 'Substitute into equation: 0 + 100 + (-15) = ½(0.5)v² + 0 → 85 = 0.25 v².' },
            { text: 'Solve for v: v² = 85 / 0.25 = 340 → v = √340 ≈ 18.44 m/s.' },
            { text: 'Check physical reasonableness: Without air resistance, v = √(2gh) = √(400) = 20 m/s.', faded: true, blankAnswer: '18.4 m/s (or √340 m/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_008', title: 'Calorimetry is the experimental.',
          scaffold: { problem: 'A 200 g copper vessel (s = 386 J kg⁻¹ K⁻¹) contains 500 g of water at 25°C.',
            steps: [
            { text: 'Identify all components and their properties. Copper vessel: m_c = 0.200 kg, s_c = 386 J kg⁻¹ K⁻¹, T_c = 25°C.' },
            { text: 'Apply calorimetry principle. Heat gained by spoon = Heat lost by (water + copper vessel).' },
            { text: 'Substitute values with units. 0.100 × 460 × (T_f - 15) = (0.500 × 4186 + 0.200 × 386) × (25 - T_f).' },
            { text: 'Solve algebraically. 46(T_f - 15) = 2170.2(25 - T_f) → 46T_f - 690 = 54255 - 2170.2T_f → 2216.2T_f = 54945 → T_f =.' },
            { text: 'Verify reasonableness. T_f (24.79°C) lies between 15°C and 25°C, closer to 25°C because water+copper have much larger.', faded: true, blankAnswer: '24.8°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_13_004', title: 'In Simple Harmonic Motion, the total.',
          scaffold: { problem: 'A 200 g block is attached to a horizontal spring of force constant 50 N/m on a frictionless surface.',
            steps: [
            { text: 'Identify given: m = 0.2 kg, k = 50 N/m, A = 0.1 m, x = 0.05 m. Find E, v at x=0.05 m, a at x=0.05 m.' },
            { text: 'Total energy E = ½kA² = ½(50 N/m)(0.1 m)² = 0.25 J. Angular frequency ω = √(k/m) = √(50/0.2) = √250 = 15.81 rad/s.' },
            { text: 'At x = 0.05 m, potential energy U = ½kx² = ½(50)(0.05)² = 0.0625 J. Kinetic energy K = E - U = 0.25 - 0.0625 = 0.1875 J.' },
            { text: 'Speed v = √(2K/m) = √(2×0.1875/0.2) = √1.875 = 1.37 m/s. Acceleration a = -ω²x = -(15.81)²(0.05) = -12.5 m/s² (negative.' },
            { text: 'Verify: v_max = ωA = 15.81×0.1 = 1.58 m/s > 1.37 m/s (reasonable since x=0.05 m is not at mean position).', faded: true, blankAnswer: '(a) 0.25 J, (b) 1.37 m/s, (c) -12.5 m/s² (toward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_006', title: 'The law of conservation of momentum.',
          scaffold: { problem: 'A 60 kg astronaut floating at rest in space throws a 2 kg tool kit at 10 m/s away from the spaceship.',
            steps: [
            { text: 'Identify system = astronaut + tool kit. No external forces in space → isolated system.' },
            { text: 'Define direction: tool kit thrown in +x direction. Let astronaut recoil velocity be \\(v_a\\) (expected negative).' },
            { text: 'Apply conservation: \\(m_a u_a + m_t u_t = m_a v_a + m_t v_t\\). \\(0 = (60)v_a + (2)(10)\\).' },
            { text: 'Solve: \\(60 v_a = -20\\) → \\(v_a = -20/60 = -1/3 = -0.333\\ \\text{m/s}\\). Units: kg·m/s = kg·(m/s) ✓.' },
            { text: 'Interpret: Astronaut recoils at 0.333 m/s opposite to tool kit (negative sign).', faded: true, blankAnswer: '\\(v_a = -0.333\\ \\text{m/s}\\) (opposite to tool kit.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_05_009', title: 'Identify each idea',
          dissect: { specimen: 'Potential Energy of a Spring', spots: [
            { id: 's1', label: 'The elastic potential energy of', prompt: 'Which idea is this? — The elastic potential energy of a spring is the energy stored in a spring due to its.', answer: 'The elastic potential energy of', options: ['The elastic potential energy of', 'A force is conservative if', 'The principle of conservation of', 'Calorimetry is the experimental technique'] },
            { id: 's2', label: 'A force is conservative if', prompt: 'Which idea is this? — A force is **conservative** if the work done by it on an object moving between two points.', answer: 'A force is conservative if', options: ['A force is conservative if', 'The elastic potential energy of', 'The principle of conservation of', 'Calorimetry is the experimental technique'] },
            { id: 's3', label: 'The principle of conservation of', prompt: 'Which idea is this? — The principle of conservation of mechanical energy states that in an isolated system.', answer: 'The principle of conservation of', options: ['The principle of conservation of', 'The elastic potential energy of', 'A force is conservative if', 'Calorimetry is the experimental technique'] },
            { id: 's4', label: 'Calorimetry is the experimental technique', prompt: 'Which idea is this? — Calorimetry is the experimental technique of measuring heat transfer between bodies in an.', answer: 'Calorimetry is the experimental technique', options: ['Calorimetry is the experimental technique', 'The elastic potential energy of', 'A force is conservative if', 'The principle of conservation of'] },
            { id: 's5', label: 'In Simple Harmonic Motion the', prompt: 'Which idea is this? — In Simple Harmonic Motion, the total mechanical energy is the sum of kinetic energy (K =.', answer: 'In Simple Harmonic Motion the', options: ['In Simple Harmonic Motion the', 'The elastic potential energy of', 'A force is conservative if', 'The principle of conservation of'] },
            { id: 's6', label: 'The law of conservation of', prompt: 'Which idea is this? — The law of conservation of momentum states that for an isolated system (no net external.', answer: 'The law of conservation of', options: ['The law of conservation of', 'The elastic potential energy of', 'A force is conservative if', 'The principle of conservation of'] }
          ] } }
    ],
    explore: { component: C11_PhysicsConservationMechanicalEnergySim, prompt: 'Explore the interactive — Potential Energy of a Spring' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_008', difficulty: 'standard',
          question: 'The elastic potential energy of a spring is the energy stored in a spring due.',
          hint: 'If stuck, review "Work Done by Spring Force" (c11_phy_cbse_05_003) for the integration.',
          misconception: 'Students often believe that the potential energy of a vertical spring-mass system is simply $\\frac{1}{2}kx^2$ where $x$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The elastic potential energy of a spring is the energy stored in a spring due to its',
                  options: ['The elastic potential energy of a spring is the energy stored in a spring due to its', 'A force is **conservative** if the work done by it on an object moving between two points', 'The principle of conservation of mechanical energy states that in an isolated system', 'Calorimetry is the experimental technique of measuring heat transfer between bodies in an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the potential energy of a vertical spring-mass system is simply $\\frac{1}{2}kx^2$ where $x$ is measured from.' }
          ],
            remediations: { 'the-potential-energy-of-a': { steps: ['** Re-derive the total potential energy for a vertical spring from scratch.', '** Integrate to get potential energy: $U = -\\int F\\,dy\' = \\frac{1}{2}ky\'^2 + C$.', '** Verify that this $U = \\frac{1}{2}ky\'^2$ already includes **both** spring and gravitational potential energy.', '** Practice 3 vertical spring problems: (a) mass lowered gently to equilibrium, (b) mass released from unstretched.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_009', difficulty: 'standard',
          question: 'A force is **conservative** if the work done by it on an object moving between.',
          hint: 'Review the calculation of work for constant and variable forces (nodes 001, 002) and the.',
          misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force,.',
          parts: [
                { id: 'a', prompt: 'A block is moved from point A to point B along two different paths: Path 1 is a straight line, Path 2 is a longer curved path.', answer: 'For gravity (conservative), \\( W_1 = W_2 \\)',
                  options: ['For gravity (conservative), \\( W_1 = W_2 \\)', 'work done in a specific displacement', 'work done over any closed path'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force, tension in a pendulum.' }
          ],
            remediations: { 'any-force-that-does-zero': { steps: ['Revisit the definition: "Work done over a closed loop is zero" – test this with a specific closed path for the force in.', 'For normal force/tension: imagine a scenario where the constraint moves (e.g., block on an accelerating cart) and.', 'For constant magnitude forces: compute work over a closed rectangular path for friction (non-zero) vs gravity (zero).', 'Practice classifying forces using the two criteria: (a) path-independence of work, (b) existence of a potential energy.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since the normal force does no work (it\'s perpendicular to displacement), it must be a conservative force." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'zero work in a specific situation', 'work done in a specific displacement', 'work done over any closed path'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force, tension in a pendulum.' },
                { id: 'b', prompt: 'Design a simple experiment using a spring, a block, and a rough horizontal surface to demonstrate that the spring force is conservative while kinetic friction.', answer: '**Experiment:** Compress the spring by distance \\( x \\) and release the block',
                  options: ['**Experiment:** Compress the spring by distance \\( x \\) and release the block', 'work done in a specific displacement', 'work done over any closed path', '**any force that does zero work in a given situation is conservative** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force, tension in a pendulum.' }
          ],
            remediations: { 'any-force-that-does-zero': { steps: ['Revisit the definition: "Work done over a closed loop is zero" – test this with a specific closed path for the force in.', 'For normal force/tension: imagine a scenario where the constraint moves (e.g., block on an accelerating cart) and.', 'For constant magnitude forces: compute work over a closed rectangular path for friction (non-zero) vs gravity (zero).', 'Practice classifying forces using the two criteria: (a) path-independence of work, (b) existence of a potential energy.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_010', difficulty: 'standard',
          question: 'The principle of conservation of mechanical energy states that in an isolated.',
          hint: 'If stuck, revisit c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) and.',
          misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading.',
          parts: [
                { id: 'a', prompt: 'A block slides down a frictionless inclined plane of height h. At the bottom, its speed is v. The same block is now dropped vertically from the same height h.', answer: 'The speed will be the same',
                  options: ['The speed will be the same', 'greater on the incline', 'less because the distance is longer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading them to apply Ki +.' },
                { id: 'b', prompt: 'A 2.0 kg block is released from rest at the top of a smooth (frictionless) quarter-circle track of radius R = 1.5 m.', answer: '**Step 1:** On the smooth track, mechanical energy is conserved',
                  options: ['**Step 1:** On the smooth track, mechanical energy is conserved', 'conservation of mechanical energy', 'energy is always conserved in any situation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading them to apply Ki +.' }
          ],
            remediations: { 'conservation-of-mechanical-energy-means': { steps: ['Revisit node c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) — list every force in the problem and.', 'For each non-conservative force, calculate its work (Wnc = ∫Fnc·dx).', 'Remember: normal force from fixed surface does zero work; static friction on a rolling object without slipping does.', 'Write the generalized equation: Ki + Vi + Wnc = Kf + Vf.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading.',
          parts: [
                { id: 'a', prompt: 'A student solves a pendulum problem: "A bob of mass m is released from height h. Find its speed at the lowest point." They write: mgh = ½mv² → v = √(2gh).', answer: 'The final answer v = √(2gh) is correct, but the reasoning is wrong',
                  options: ['The final answer v = √(2gh) is correct, but the reasoning is wrong', 'conservation of mechanical energy', 'energy is always conserved in any situation', 'only conservative forces do work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading them to apply Ki +.' }
          ],
            remediations: { 'conservation-of-mechanical-energy-means': { steps: ['Revisit node c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) — list every force in the problem and.', 'For each non-conservative force, calculate its work (Wnc = ∫Fnc·dx).', 'Remember: normal force from fixed surface does zero work; static friction on a rolling object without slipping does.', 'Write the generalized equation: Ki + Vi + Wnc = Kf + Vf.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'standard',
          question: 'Calorimetry is the experimental technique of measuring heat transfer between.',
          hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT,.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a calorimeter experiment, the heat lost by the hot metal block is exactly equal to the heat gained by the water alone." Explain why this.', answer: 'The statement ignores the calorimeter cup (and stirrer)',
                  options: ['The statement ignores the calorimeter cup (and stirrer)', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'b', prompt: 'A 0.050 kg aluminium sphere at 100°C is dropped into a 0.150 kg copper calorimeter containing 0.200 kg water at 20°C. The final steady temperature is 24°C.', answer: 'Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J',
                  options: ['Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'c', prompt: 'Two identical calorimeters A and B contain equal masses of water at 20°C.', answer: 'Calorimeter B (with aluminium) reaches a higher final temperature',
                  options: ['Calorimeter B (with aluminium) reaches a higher final temperature', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'In a calorimetry experiment to find the specific heat of a metal, a student forgets to dry the metal block after removing it from boiling water.', answer: 'The calculated specific heat will be HIGHER than the true value',
                  options: ['The calculated specific heat will be HIGHER than the true value', 'water equivalent', 'the droplets cool the block faster, confusing rate with total heat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_004', difficulty: 'standard',
          question: 'In Simple Harmonic Motion, the total mechanical energy is the sum of kinetic.',
          hint: 'Review c11_phy_cbse_13_003 for v = ω√(A²-x²) derivation and c9_physics_ch4_6 for spring.',
          misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero*.',
          parts: [
                { id: 'a', prompt: 'State the expression for total mechanical energy of a particle executing SHM with amplitude A and spring constant k. What is its SI unit?', answer: 'E = ½kA², unit: joule (J)',
                  options: ['E = ½kA², unit: joule (J)', 'the *zero* of potential energy is fixed at the equilibrium position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero* of potential energy.' },
                { id: 'b', prompt: 'A block on a spring oscillates with amplitude A. At what displacement is the kinetic energy equal to the potential energy?', answer: 'At x = ±A/√2',
                  options: ['At x = ±A/√2', 'the *zero* of potential energy is fixed at the equilibrium position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero* of potential energy.' },
                { id: 'c', prompt: 'A 0.5 kg mass attached to a spring (k = 200 N/m) oscillates with amplitude 0.1 m.', answer: 'total energy, (',
                  options: ['total energy, (', 'the *zero* of potential energy is fixed at the equilibrium position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero* of potential energy.' }
          ],
            remediations: { 'potential-energy-in-shm-is': { steps: ['Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Potential Energy definition (c9_physics_ch4_6).', 'Perform a quick activity: stretch a spring by 2 cm, 4 cm, 6 cm; feel the force increase.', 'Plot F vs x, show area under graph = ½kx².', 'Explicitly write U(x) = ½kx² + C, explain C=0 is a convenient choice at equilibrium.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero*.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a spring, masses, and a ruler to verify that total energy in SHM is constant.', answer: 'Hang a spring, attach a mass, measure k by static extension (mg = kx₀)',
                  options: ['Hang a spring, attach a mass, measure k by static extension (mg = kx₀)', 'the *zero* of potential energy is fixed at the equilibrium position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe potential energy in SHM is always positive and minimum at x=0, but they incorrectly think the *zero* of potential energy.' }
          ],
            remediations: { 'potential-energy-in-shm-is': { steps: ['Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Potential Energy definition (c9_physics_ch4_6).', 'Perform a quick activity: stretch a spring by 2 cm, 4 cm, 6 cm; feel the force increase.', 'Plot F vs x, show area under graph = ½kx².', 'Explicitly write U(x) = ½kx² + C, explain C=0 is a convenient choice at equilibrium.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_006', difficulty: 'standard',
          question: 'The law of conservation of momentum states that for an isolated system (no net.',
          hint: 'If stuck, revisit c11_phy_cbse_04_004 (Newton\'s third law) to see how \\(\\vec{F}_{12} =.',
          misconception: 'Students believe momentum is conserved in every collision, ignoring external forces like friction or gravity components.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The law of conservation of momentum states that for an isolated system (no net external',
                  options: ['The law of conservation of momentum states that for an isolated system (no net external', 'The elastic potential energy of a spring is the energy stored in a spring due to its', 'A force is **conservative** if the work done by it on an object moving between two points', 'The principle of conservation of mechanical energy states that in an isolated system'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe momentum is conserved in every collision, ignoring external forces like friction or gravity components along the motion.' }
          ],
            remediations: { 'momentum-is-conserved-in-every': { steps: ['Revisit Newton\'s third law (c11_phy_cbse_04_004): action-reaction pairs are internal to the system.', 'Practice identifying system boundaries: draw a dashed circle around interacting objects; any force crossing the circle.', 'Do vector addition drills: resolve momenta into x/y components before summing.', 'Use PhET "Collision Lab" simulation: toggle external friction on/off to see momentum conservation fail/succeed.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
