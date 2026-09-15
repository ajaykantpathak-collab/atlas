import type { SimDef } from '../../engine/types';
import C10_PhysicsHouseWiringPowerSim from '../../../simulations/c6_12/C10_PhysicsHouseWiringPowerSim';

/** v3 wrapped master — C10_PhysicsHouseWiringPowerSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_physicshousewiringpowersim: SimDef = {
    id: 'v3w_c10_physicshousewiringpowersim',
    title: 'House Wiring Power',
    subtitle: 'Covers the working principles and simple numerical problems on electric heater,.',
    classLevel: 10, subject: 'physics', topic: 'Applications of Heating Effect: Electric Heater, Bulb, Fuse',
    chapters: [],
    nodeIds: ['c10_phy_cbse_01_009', 'c10_phy_cbse_01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe the electric heater in your home during winter: when you switch it on, the coil becomes red-hot and.', goal: 'Master House Wiring Power.' },
    discovery: {
        question: 'State the two essential properties of the material used for the filament of an incandescent bulb and explain why each property is necessary.',
        options: ['The filament material (tungsten) must have: (1) High resistivity', 'low resistance to allow more current', 'higher wattage appliance has higher resistance'],
        answer: 'The filament material (tungsten) must have: (1) High resistivity',
        hook: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with.',
    },
    teaching: [
        { title: 'The heating effect of electric current is.', text: 'The heating effect of electric current is utilized in appliances where electrical energy is deliberately converted into heat energy (electric heater, electric iron, geyser) or into both heat and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_009', title: 'The heating effect of electric current.',
          scaffold: { problem: 'An electric geyser is rated 2000 W, 220 V. It is used for 30 minutes daily.',
            steps: [
            { text: 'Identify given: P = 2000 W, V = 220 V, t_daily = 30 min = 0.5 h, rate = ₹6.50/kWh.' },
            { text: 'Use P = VI to find current I = P/V = 2000/220 = 9.09 A.' },
            { text: 'Use V = IR or P = I²R to find resistance R = V/I = 220/9.09 = 24.2 Ω (or R = V²/P = 220²/2000 = 24.2 Ω).' },
            { text: 'Energy consumed per day E = P × t = 2000 W × 0.5 h = 1000 Wh = 1 kWh.' },
            { text: 'Energy for 30 days = 1 × 30 = 30 kWh. Cost = 30 × 6.50 = ₹195.', faded: true, blankAnswer: '(a) 9.09 A, (b) 24.2 Ω, (c) 1 kWh, (d) ₹195' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_007', title: 'In a parallel combination of resistors,.',
          scaffold: { problem: '** In a household lighting circuit, two LED bulbs rated 6 Ω and 12 Ω are connected in parallel across a 240 V mains supply.',
            steps: [
            { text: 'Identify given: R₁ = 6 Ω, R₂ = 12 Ω, V = 240 V. Find R_eq, I_total, I₁, I₂, P₁, P₂.' },
            { text: 'Parallel formula: 1/R_eq = 1/R₁ + 1/R₂. Substitute: 1/R_eq = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 Ω⁻¹.' },
            { text: 'Take reciprocal: R_eq = 4 Ω. (Check: 4 Ω < 6 Ω ✓)' },
            { text: 'Total current: I_total = V / R_eq = 240 V / 4 Ω = 60 A.' },
            { text: 'Branch currents (voltage same): I₁ = V/R₁ = 240/6 = 40 A; I₂ = V/R₂ = 240/12 = 20 A. Verify: I₁ + I₂ = 60 A = I_total ✓.' },
            { text: 'Power: P₁ = V²/R₁ = (240)²/6 = 57600/6 = 9600 W = 9.6 kW; P₂ = V²/R₂ = 57600/12 = 4800 W = 4.8 kW.', faded: true, blankAnswer: '** (a) 4 Ω, (b) 60 A, (c) 40 A (6 Ω bulb), 20 A (12 Ω.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'House Wiring Power', spots: [
            { id: 's1', label: 'The heating effect of electric', prompt: 'Which idea is this? — The heating effect of electric current is utilized in appliances where electrical energy.', answer: 'The heating effect of electric', options: ['The heating effect of electric', 'In a parallel combination of'] },
            { id: 's2', label: 'In a parallel combination of', prompt: 'Which idea is this? — In a parallel combination of resistors, the potential difference (voltage) across each.', answer: 'In a parallel combination of', options: ['In a parallel combination of', 'The heating effect of electric'] }
          ] } }
    ],
    explore: { component: C10_PhysicsHouseWiringPowerSim, prompt: 'Explore the interactive — House Wiring Power' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_009', difficulty: 'standard',
          question: 'The heating effect of electric current is utilized in appliances where.',
          hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law).',
          misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with.',
          parts: [
                { id: 'a', prompt: 'State the two essential properties of the material used for the filament of an incandescent bulb and explain why each property is necessary.', answer: 'The filament material (tungsten) must have: (1) High resistivity',
                  options: ['The filament material (tungsten) must have: (1) High resistivity', 'low resistance to allow more current', 'higher wattage appliance has higher resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'b', prompt: 'Why is the fuse wire always connected in series with the live wire of the circuit, and why must it have a low melting point but the connecting wires must have.', answer: 'Fuse is in series so that the same current flows through it and the appliance',
                  options: ['Fuse is in series so that the same current flows through it and the appliance', 'fuse in parallel', 'higher wattage appliance has higher resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'c', prompt: 'An electric heater rated 1500 W, 220 V is connected to a 220 V supply.', answer: 'Given: P = 1500 W, V = 220 V, t = 10 min = 600 s',
                  options: ['Given: P = 1500 W, V = 220 V, t = 10 min = 600 s', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' }
          ],
            remediations: { 'higher-wattage-appliance-has-higher': { steps: ['Revisit the formula P = V²/R (derived from P = VI and V = IR) with fixed V = 220 V.', 'Recall the series circuit rule: same current, heat ∝ R (H = I²Rt).', 'Do a quick activity: connect a 40 W and 100 W bulb in series to 220 V (under teacher supervision) — observe the 40 W.', 'Practice 3 numerical problems where you first find resistances from power ratings, then analyze series/parallel.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with.',
          parts: [
                { id: 'a', prompt: 'A student replaces a blown 5 A fuse in a household circuit with a thick copper wire from a discarded cable. The circuit carries a 10 A load.', answer: 'Unsafe',
                  options: ['Unsafe', 'copper wire will melt', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'b', prompt: 'Design a simple experiment using a 9 V battery, nichrome wire of different lengths, and a small LED to demonstrate that a fuse wire must be thin and of.', answer: 'Steps: (1) Connect a 30 cm nichrome wire in series with LED and 9 V battery',
                  options: ['Steps: (1) Connect a 30 cm nichrome wire in series with LED and 9 V battery', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' }
          ],
            remediations: { 'higher-wattage-appliance-has-higher': { steps: ['Revisit the formula P = V²/R (derived from P = VI and V = IR) with fixed V = 220 V.', 'Recall the series circuit rule: same current, heat ∝ R (H = I²Rt).', 'Do a quick activity: connect a 40 W and 100 W bulb in series to 220 V (under teacher supervision) — observe the 40 W.', 'Practice 3 numerical problems where you first find resistances from power ratings, then analyze series/parallel.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_007', difficulty: 'standard',
          question: 'In a parallel combination of resistors, the potential difference (voltage).',
          hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and.',
          misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule.',
          parts: [
                { id: 'a', prompt: 'State the formula for the equivalent resistance of three resistors R₁, R₂, R₃ connected in parallel. Write the SI unit of equivalent resistance.', answer: 'Correct answer: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃',
                  options: ['Correct answer: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃', 'siemens', 'the current is the same through all resistors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' },
                { id: 'b', prompt: 'Two resistors of 6 Ω and 3 Ω are connected in parallel across a 12 V battery.', answer: 'Correct reasoning: In parallel, current has multiple paths',
                  options: ['Correct reasoning: In parallel, current has multiple paths', 'it becomes 9 Ω because resistances add', 'the current is the same through all resistors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' },
                { id: 'c', prompt: 'Three resistors of 2 Ω, 4 Ω, and 4 Ω are connected in parallel across a 12 V battery.', answer: '**Step 1:** Given: R₁ = 2 Ω, R₂ = 4 Ω, R₃ = 4 Ω, V = 12 V',
                  options: ['**Step 1:** Given: R₁ = 2 Ω, R₂ = 4 Ω, R₃ = 4 Ω, V = 12 V', 'the current is the same through all resistors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' }
          ],
            remediations: { 'in-a-parallel-circuit': { steps: ['** Use water-flow analogy: Two pipes (resistors) side by side from a tank (battery) — water (current) flows through.', '** Re-derive formula physically: V same → I₁ = V/R₁, I₂ = V/R₂ → I_total = V(1/R₁ + 1/R₂) → R_eq = V/I_total = 1/(1/R₁.', '** Practice "reciprocal sum → reciprocal" drill: For 2 Ω and 2 Ω, 1/R_eq = 1/2 + 1/2 = 1 → R_eq = 1 Ω.', '** Solve 5 numerical problems where the answer is checked by verifying R_eq < smallest R.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule.',
          parts: [
                { id: 'a', prompt: 'A student solves a parallel resistor problem: "R₁ = 3 Ω, R₂ = 6 Ω in parallel. 1/R_eq = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2.', answer: 'The solution is **incorrect**',
                  options: ['The solution is **incorrect**', 'the current is the same through all resistors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' }
          ],
            remediations: { 'in-a-parallel-circuit': { steps: ['** Use water-flow analogy: Two pipes (resistors) side by side from a tank (battery) — water (current) flows through.', '** Re-derive formula physically: V same → I₁ = V/R₁, I₂ = V/R₂ → I_total = V(1/R₁ + 1/R₂) → R_eq = V/I_total = 1/(1/R₁.', '** Practice "reciprocal sum → reciprocal" drill: For 2 Ω and 2 Ω, 1/R_eq = 1/2 + 1/2 = 1 → R_eq = 1 Ω.', '** Solve 5 numerical problems where the answer is checked by verifying R_eq < smallest R.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
