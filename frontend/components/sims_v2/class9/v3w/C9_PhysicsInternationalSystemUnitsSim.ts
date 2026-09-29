import type { SimDef } from '../../engine/types';
import C9_PhysicsInternationalSystemUnitsSim from '../../../simulations/c6_12/C9_PhysicsInternationalSystemUnitsSim';

/** v3 wrapped master — C9_PhysicsInternationalSystemUnitsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_physicsinternationalsystemunitssim: SimDef = {
    id: 'v3w_c9_physicsinternationalsystemunitssim',
    title: 'Measurement: Units and Standards in Science',
    subtitle: 'Covers the SI system of units, base and derived units, metric prefixes, and the need for.',
    classLevel: 9, subject: 'physics', topic: 'Measurement: Units and Standards in Science',
    chapters: [],
    nodeIds: ['c9_physics_ch1_5', 'c9_physics_ch4_4', 'c9_physics_ch4_9', 'c9_physics_ch2_5', 'c9_physics_ch3_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are buying cloth for a kurta in a Delhi market: the shopkeeper measures it with a "haath".', goal: 'Master Measurement: Units and Standards in Science.' },
    discovery: {
        question: 'State the SI base unit and its symbol for each of the following quantities: (a) length, (b) mass, (c) time, (d) electric current, (e) thermodynamic temperature.',
        options: ['length, (', 'metric unit', 'SI unit'],
        answer: 'length, (',
        hook: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking.',
    },
    teaching: [
        { title: 'Measurement in science is the process of.', text: 'Measurement in science is the process of comparing an unknown physical quantity with a known fixed quantity of the same kind called a standard unit.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch1_5', title: 'Measurement in science is the process.',
          scaffold: { problem: 'The diameter of a typical hydrogen atom is about 1.06 × 10⁻¹⁰ m. Express this diameter in nanometres (nm) and in picometres (pm).',
            steps: [
            { text: 'Identify given quantity: 1.06 × 10⁻¹⁰ m. Target units: nm and pm.' },
            { text: 'Write conversion factors as fractions equal to 1: (1 nm / 10⁻⁹ m) and (1 pm / 10⁻¹² m).' },
            { text: 'For nanometres: multiply given value by (1 nm / 10⁻⁹ m). Metres cancel: (1.06 × 10⁻¹⁰) × (1 / 10⁻⁹) nm = 1.06 × 10⁻¹ nm.' },
            { text: 'For picometres: multiply by (1 pm / 10⁻¹² m): (1.06 × 10⁻¹⁰) × (1 / 10⁻¹²) pm = 1.06 × 10² pm = 106 pm.' },
            { text: 'Verify reasonableness: nm is larger than pm, so value in nm should be smaller (0.106 < 106).', faded: true, blankAnswer: '0.106 nm and 106 pm' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_4', title: 'Energy is the capacity of a system to.',
          scaffold: { problem: 'A typical smartphone battery stores 15,000 J of chemical energy when fully charged.',
            steps: [
            { text: 'Identify given: Total chemical energy = 15,000 J. Charge used = 20% of 15,000 J = 3,000 J (chemical → electrical).' },
            { text: 'Identify principle: Conservation of energy — electrical energy drawn = useful output + heat loss.' },
            { text: 'Set up equation: Heat = Electrical drawn - Useful output = 3,000 J - 1,200 J.' },
            { text: 'Compute: Heat = 1,800 J.' },
            { text: 'Verify: 1,800 J + 1,200 J = 3,000 J (matches drawn energy). Answer is physically reasonable (phone gets warm).', faded: true, blankAnswer: '1,800 J of heat energy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_9', title: 'Power is the rate at which work is done.',
          scaffold: { problem: 'A 40 kg girl runs up a staircase of 20 steps, each 15 cm high, in 8 seconds. Calculate her power output. (Take g = 10 m/s²)',
            steps: [
            { text: 'Identify given: mass m = 40 kg, number of steps = 20, height per step = 15 cm = 0.15 m, time t = 8 s, g = 10 m/s².' },
            { text: 'Total height climbed h = 20 × 0.15 m = 3 m. Work done against gravity W = mgh = 40 × 10 × 3 = 1200 J.' },
            { text: 'Use power formula P = W/t. Check units: W in joules, t in seconds → P in watts.' },
            { text: 'Substitute: P = 1200 J / 8 s = 150 W.' },
            { text: 'Verify: 150 W is reasonable for a short burst of human effort (typical human power ~100-300 W). Answer: 150 W.', faded: true, blankAnswer: '150 W' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch2_5', title: 'Acceleration is the rate of change of.',
          scaffold: { problem: 'A school bus starts from rest and attains a velocity of 54 km/h in 10 seconds. Find its acceleration in SI units.',
            steps: [
            { text: 'Identify given quantities: u = 0 (starts from rest), v = 54 km/h, t = 10 s. Required: a in m/s².' },
            { text: 'Convert final velocity to SI units: 54 km/h = 54 × (1000 m / 3600 s) = 54 × (5/18) = 15 m/s.' },
            { text: 'Use formula a = (v - u)/t. Substitute values with units: a = (15 m/s - 0 m/s) / 10 s.' },
            { text: 'Compute: a = 15/10 = 1.5. Unit analysis: (m/s) / s = m/s².' },
            { text: 'Verify reasonableness: A bus accelerating at 1.5 m/s² reaches 54 km/h in 10 s, which is realistic for a heavy vehicle.', faded: true, blankAnswer: '1.5 m/s²' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch3_6', title: 'Momentum is a vector quantity defined.',
          scaffold: { problem: 'A 50 g bullet is fired from a 4 kg rifle with a velocity of 350 m/s. Calculate the recoil velocity of the rifle.',
            steps: [
            { text: 'Identify given quantities with units. Mass of bullet m_b = 50 g = 0.050 kg. Mass of rifle m_r = 4 kg.' },
            { text: 'Write conservation of momentum equation for the closed system (bullet + rifle). Total initial momentum = 0.' },
            { text: 'Substitute values with units. 0 = (0.050 kg × 350 m/s) + (4 kg × v_r) = 17.5 kg·m/s + 4 kg × v_r.' },
            { text: 'Solve for v_r with unit tracking. 4 kg × v_r = -17.5 kg·m/s → v_r = -17.5 / 4 m/s = -4.375 m/s.' },
            { text: 'Verify physical reasonableness. Negative sign means rifle moves opposite to bullet (recoil).', faded: true, blankAnswer: '-4.375 m/s (i.e., 4.375 m/s opposite to bullet\'s direction)' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch4_4', title: 'Identify each idea',
          dissect: { specimen: 'Measurement: Units and Standards in Science', spots: [
            { id: 's1', label: 'Measurement in science is the', prompt: 'Which idea is this? — Measurement in science is the process of comparing an unknown physical quantity with a.', answer: 'Measurement in science is the', options: ['Measurement in science is the', 'Energy is the capacity of', 'Power is the rate at', 'Acceleration is the rate of'] },
            { id: 's2', label: 'Energy is the capacity of', prompt: 'Which idea is this? — Energy is the capacity of a system to do work, measured in joules (J) in the SI system.', answer: 'Energy is the capacity of', options: ['Energy is the capacity of', 'Measurement in science is the', 'Power is the rate at', 'Acceleration is the rate of'] },
            { id: 's3', label: 'Power is the rate at', prompt: 'Which idea is this? — Power is the rate at which work is done or energy is transferred, measured as work done.', answer: 'Power is the rate at', options: ['Power is the rate at', 'Measurement in science is the', 'Energy is the capacity of', 'Acceleration is the rate of'] },
            { id: 's4', label: 'Acceleration is the rate of', prompt: 'Which idea is this? — Acceleration is the rate of change of velocity with respect to time.', answer: 'Acceleration is the rate of', options: ['Acceleration is the rate of', 'Measurement in science is the', 'Energy is the capacity of', 'Power is the rate at'] },
            { id: 's5', label: 'Momentum is a vector quantity', prompt: 'Which idea is this? — Momentum is a vector quantity defined as the product of an object\'s mass and its velocity.', answer: 'Momentum is a vector quantity', options: ['Momentum is a vector quantity', 'Measurement in science is the', 'Energy is the capacity of', 'Power is the rate at'] }
          ] } }
    ],
    explore: { component: C9_PhysicsInternationalSystemUnitsSim, prompt: 'Explore the interactive — Measurement: Units and Standards in Science' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch1_5', difficulty: 'standard',
          question: 'Measurement in science is the process of comparing an unknown physical quantity.',
          hint: 'If stuck, review Class 7 "Units of Speed and Their Conversions" (c7_physics_ch04_010) for.',
          misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking.',
          parts: [
                { id: 'a', prompt: 'State the SI base unit and its symbol for each of the following quantities: (a) length, (b) mass, (c) time, (d) electric current, (e) thermodynamic temperature.', answer: 'length, (',
                  options: ['length, (', 'metric unit', 'SI unit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' },
                { id: 'b', prompt: 'A car travels at 72 km/h. Convert this speed into m/s. Show all steps including unit cancellation.', answer: 'Step 1: Write given value with units: 72 km/h',
                  options: ['Step 1: Write given value with units: 72 km/h', 'divide by 3.6', 'metric unit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' },
                { id: 'c', prompt: 'The formula for pressure is P = F/A. If force is measured in newtons (N) and area in square metres (m²), what is the SI unit of pressure?', answer: 'Pressure = Force / Area = N / m²',
                  options: ['Pressure = Force / Area = N / m²', 'pascal', 'metric unit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "metric unit" and "SI unit" are synonyms, so they write "cm" or "g" in final answers thinking they are using SI.' }
          ],
            remediations: { 'metric-unit-and-si-unit': { steps: ['Have the student write the metric prefix table (kilo, hecto, deca, base, deci, centi, milli) with their powers of ten.', 'Give a conversion problem (e.g., 3.5 km to m) and require them to write the conversion factor as a fraction (1000 m / 1.', 'Ask them to identify the SI base unit for each quantity in a list (length → m, mass → kg, volume → m³ not litre).', 'Practice deriving units for force, pressure, energy from formulas using only kg, m, s until they can do it without.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_4', difficulty: 'standard',
          question: 'Energy is the capacity of a system to do work, measured in joules (J) in the SI.',
          hint: 'Revisit c9_physics_ch4_1 (Work definition) and c9_physics_ch4_3 (Work-Energy Theorem) —.',
          misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains.',
          parts: [
                { id: 'a', prompt: 'Name the four energy forms discussed in this node and state the SI unit of energy.', answer: 'The four forms are heat, light, chemical, and electrical energy',
                  options: ['The four forms are heat, light, chemical, and electrical energy', 'mechanical', 'nuclear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains ready-made electrical.' },
                { id: 'b', prompt: 'A student says: "When a battery lights a bulb, chemical energy is converted into electrical energy, which is then converted into light energy.', answer: 'Even LED bulbs produce some heat',
                  options: ['Even LED bulbs produce some heat', 'LEDs produce no heat', 'efficient'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains ready-made electrical.' },
                { id: 'c', prompt: 'A solar water heater receives 800 J of light energy per second per square metre. The collector area is 2.5 m² and it operates for 10 minutes.', answer: '**Step 1:** Incident power = 800 J/s/m² × 2.5 m² = 2000 J/s',
                  options: ['**Step 1:** Incident power = 800 J/s/m² × 2.5 m² = 2000 J/s', 'chemical energy is stored inside the battery as electricity', 'the battery contains ready-made electrical energy that simply flows out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains ready-made electrical.' }
          ],
            remediations: { 'chemical-energy-is-stored-inside': { steps: ['** Show a cut-open dry cell (or diagram) and identify the zinc casing, carbon rod, and electrolyte paste — no.', '** Perform the lemon cell experiment (Diagnostic Q6) and emphasize: the lemon had no electricity before inserting.', '** Connect to **c8_physics_ch2_11 (Rechargeable vs Non-Rechargeable Cells)**: recharging forces the reaction backward.', '** Ask student to write the energy chain for a torch: *Chemical (reactants) → Electrical (circuit) → Light + Heat.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: "In a rechargeable battery, during charging electrical energy is converted to chemical energy, and during discharging chemical energy is.', answer: 'The claim is false',
                  options: ['The claim is false', 'chemical energy is stored inside the battery as electricity', 'the battery contains ready-made electrical energy that simply flows out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"chemical energy is stored inside the battery as electricity"** — they think the battery contains ready-made electrical.' }
          ],
            remediations: { 'chemical-energy-is-stored-inside': { steps: ['** Show a cut-open dry cell (or diagram) and identify the zinc casing, carbon rod, and electrolyte paste — no.', '** Perform the lemon cell experiment (Diagnostic Q6) and emphasize: the lemon had no electricity before inserting.', '** Connect to **c8_physics_ch2_11 (Rechargeable vs Non-Rechargeable Cells)**: recharging forces the reaction backward.', '** Ask student to write the energy chain for a torch: *Chemical (reactants) → Electrical (circuit) → Light + Heat.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_9', difficulty: 'standard',
          question: 'Power is the rate at which work is done or energy is transferred, measured as.',
          hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed.',
          misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).',
          parts: [
                { id: 'a', prompt: 'State the SI unit of power and write its relationship with joule and second.', answer: 'The SI unit of power is watt (W)',
                  options: ['The SI unit of power is watt (W)', 'newton', 'higher power means more total energy consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' },
                { id: 'b', prompt: 'Two students, A and B, each lift a 20 kg box to a height of 2 m. Student A takes 4 seconds, student B takes 8 seconds. Who has greater power?', answer: 'Student A has greater power',
                  options: ['Student A has greater power', 'he took more time', 'higher power means more total energy consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' },
                { id: 'c', prompt: 'A 1.5 kW water pump runs for 2 hours daily. Calculate the electrical energy consumed in one day in joules and in kilowatt-hours (kWh).', answer: 'Power = 1.5 kW = 1500 W',
                  options: ['Power = 1.5 kW = 1500 W', 'higher power means more total energy consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' }
          ],
            remediations: { 'higher-power-means-more-total': { steps: ['Have student calculate energy for both bulbs: E1 = 100 W × 1 h = 100 Wh; E2 = 60 W × 3 h = 180 Wh.', 'Ask "Which is larger?"', 'Convert to joules: 100 Wh = 360,000 J; 180 Wh = 648,000 J.', 'Emphasize: Power is speed of energy use; energy is total amount.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).',
          parts: [
                { id: 'a', prompt: 'A student solves: "A 100 W bulb runs for 5 hours. Energy = 100 × 5 = 500 J." Evaluate this solution.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'higher power means more total energy consumed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' }
          ],
            remediations: { 'higher-power-means-more-total': { steps: ['Have student calculate energy for both bulbs: E1 = 100 W × 1 h = 100 Wh; E2 = 60 W × 3 h = 180 Wh.', 'Ask "Which is larger?"', 'Convert to joules: 100 Wh = 360,000 J; 180 Wh = 648,000 J.', 'Emphasize: Power is speed of energy use; energy is total amount.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_5', difficulty: 'standard',
          question: 'Acceleration is the rate of change of velocity with respect to time.',
          hint: 'Revisit velocity definition (c9_physics_ch2_3) and uniform vs non-uniform motion.',
          misconception: 'Students often think negative acceleration always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'State the SI unit of acceleration and write the formula for average acceleration when an object changes its velocity from u to v in time t.', answer: 'SI unit: m/s²',
                  options: ['SI unit: m/s²', 'slowing down', 'deceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think negative acceleration always means "slowing down".' },
                { id: 'b', prompt: 'A car moves along a straight road with a constant velocity of 30 km/h. What is its acceleration?', answer: 'Acceleration is zero',
                  options: ['Acceleration is zero', 'moving fast', 'slowing down'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think negative acceleration always means "slowing down".' },
                { id: 'c', prompt: 'A motorbike starting from rest reaches a velocity of 72 km/h in 5 seconds. Calculate its acceleration in SI units. Show all unit conversions.', answer: 'Given: u = 0, v = 72 km/h = 72 × (5/18) = 20 m/s, t = 5 s',
                  options: ['Given: u = 0, v = 72 km/h = 72 × (5/18) = 20 m/s, t = 5 s', 'slowing down', 'deceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think negative acceleration always means "slowing down".' }
          ],
            remediations: { 'negative-acceleration-always-means-slowing': { steps: ['Draw a coordinate axis on paper.', 'Show a car moving right (positive velocity) with positive acceleration (speeding up) and negative acceleration (slowing.', 'Show the same car moving left (negative velocity) with negative acceleration (speeding up) and positive acceleration.', 'Emphasise: "Slowing down" means acceleration is opposite to velocity; "speeding up" means acceleration is in the same.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think negative acceleration always means "slowing down".',
          parts: [
                { id: 'a', prompt: 'A student writes: "A ball thrown vertically upward has zero acceleration at the highest point because its velocity becomes zero momentarily." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'slowing down', 'deceleration', 'negative acceleration always means "slowing down"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think negative acceleration always means "slowing down".' }
          ],
            remediations: { 'negative-acceleration-always-means-slowing': { steps: ['Draw a coordinate axis on paper.', 'Show a car moving right (positive velocity) with positive acceleration (speeding up) and negative acceleration (slowing.', 'Show the same car moving left (negative velocity) with negative acceleration (speeding up) and positive acceleration.', 'Emphasise: "Slowing down" means acceleration is opposite to velocity; "speeding up" means acceleration is in the same.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_6', difficulty: 'standard',
          question: 'Momentum is a vector quantity defined as the product of an object\'s mass and.',
          hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
          misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total.',
          parts: [
                { id: 'a', prompt: 'State the definition of linear momentum, its formula, and its SI unit.', answer: 'Linear momentum (p) is the product of mass (m) and velocity (v): p = mv',
                  options: ['Linear momentum (p) is the product of mass (m) and velocity (v): p = mv', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'b', prompt: 'Explain why momentum is considered a vector quantity while kinetic energy is a scalar, even though both depend on mass and velocity.', answer: 'Momentum is a vector',
                  options: ['Momentum is a vector', 'both are vectors', 'momentum is scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'c', prompt: 'A 1500 kg car moving at 20 m/s east collides with a stationary 1000 kg truck. After collision, the car moves at 5 m/s east.', answer: '**Given:** m₁ = 1500 kg, u₁ = 20 m/s east',
                  options: ['**Given:** m₁ = 1500 kg, u₁ = 20 m/s east', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' }
          ],
            remediations: { 'momentum-conservation-means-the-momentum': { steps: ['Draw a system boundary around *both* colliding objects.', 'Label initial velocities (with arrows) and final velocities.', 'Write Σp_initial = Σp_final explicitly for the system.', 'Use a hands-on demo: two carts with magnets (repelling) on a track.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In a perfectly inelastic collision where two objects stick together, momentum is conserved but kinetic energy is not.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'b', prompt: 'Design a simple experiment using a balloon and a straw to demonstrate conservation of momentum.', answer: '**Setup:** Thread a straw on a long horizontal string stretched across the room',
                  options: ['**Setup:** Thread a straw on a long horizontal string stretched across the room', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' }
          ],
            remediations: { 'momentum-conservation-means-the-momentum': { steps: ['Draw a system boundary around *both* colliding objects.', 'Label initial velocities (with arrows) and final velocities.', 'Write Σp_initial = Σp_final explicitly for the system.', 'Use a hands-on demo: two carts with magnets (repelling) on a track.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
