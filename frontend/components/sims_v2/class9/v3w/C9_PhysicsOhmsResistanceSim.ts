import type { SimDef } from '../../engine/types';
import C9_PhysicsOhmsResistanceSim from '../../../simulations/c6_12/C9_PhysicsOhmsResistanceSim';

/** v3 wrapped master — C9_PhysicsOhmsResistanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_physicsohmsresistancesim: SimDef = {
    id: 'v3w_c9_physicsohmsresistancesim',
    title: 'Ohm\'s Law: Statement, Formula and V-I Graph',
    subtitle: 'Covers Ohm\'s Law (V = IR), resistance, the ohm, calculation problems, and the condition.',
    classLevel: 9, subject: 'physics', topic: 'Ohm\'s Law: Statement, Formula and V-I Graph',
    chapters: [],
    nodeIds: ['c10_phy_cbse_01_003', 'c10_phy_cbse_01_004', 'c10_phy_cbse_01_001', 'c10_phy_cbse_01_002', 'c10_phy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Connect a 6 V battery to a resistor. Measure the current: 2 A.', goal: 'Master Ohm\'s Law: Statement, Formula and V-I Graph.' },
    discovery: {
        question: 'What is the unit of resistance, and how is it defined?',
        options: ['The unit of resistance is the ohm (symbol: capital omega)', 'ohm is the unit of current', 'resistance changes with voltage or current'],
        answer: 'The unit of resistance is the ohm (symbol: capital omega)',
        hook: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and.',
    },
    teaching: [
        { title: 'Ohm\'s Law states that the current through a.', text: 'Ohm\'s Law states that the current through a conductor is directly proportional to the potential difference across it, provided temperature and other physical conditions remain constant: V = I * R, or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_003', title: 'Ohm\'s Law states that the current.',
          scaffold: { problem: 'A 6 V battery is connected across a 3 ohm resistor. Calculate the current.',
            steps: [
            { text: 'Identify the formula. I = V/R.' },
            { text: 'Substitute. I = 6/3 = 2 A.' },
            { text: 'Interpret. The current is 2 amperes.', faded: true, blankAnswer: 'I = 6/3 = 2 A. The current is 2 amperes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_004', title: 'Resistance is the opposition a.',
          scaffold: { problem: 'A copper wire has resistivity 1.7e-8 ohm*m, length 5 m, and cross-sectional area 2e-6 m^2. Calculate its resistance.',
            steps: [
            { text: 'Identify the formula. R = rho * L / A.' },
            { text: 'Substitute. R = 1.7e-8 * 5 / 2e-6 = 8.5e-8 / 2e-6 = 4.25e-2 = 0.0425 ohms.' },
            { text: 'Interpret. The resistance is 0.0425 ohms — very low, as expected for copper (good conductor).', faded: true, blankAnswer: 'R = 1.7e-8 * 5 / 2e-6 = 0.0425 ohms. The resistance is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_001', title: 'Electric current is the rate of flow of.',
          scaffold: { problem: 'A battery drives 30 coulombs of charge through a circuit in 6 seconds. Calculate the current.',
            steps: [
            { text: 'Identify the formula. I = Q/t.' },
            { text: 'Substitute. I = 30/6 = 5 A.' },
            { text: 'Interpret. The current is 5 amperes — 5 coulombs of charge pass per second.', faded: true, blankAnswer: 'I = 30/6 = 5 A. The current is 5 amperes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_002', title: 'Electric potential at a point is the.',
          scaffold: { problem: 'A battery does 45 J of work to move 15 C of charge through a circuit. Calculate the potential difference.',
            steps: [
            { text: 'Identify the formula. V = W/Q.' },
            { text: 'Substitute. V = 45/15 = 3 V.' },
            { text: 'Interpret. The potential difference is 3 volts — 3 joules of work per coulomb.', faded: true, blankAnswer: 'V = 45/15 = 3 V. The potential difference is 3 volts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_006', title: 'Series combination of resistors is a.',
          scaffold: { problem: 'Three resistors (2, 3, 5 ohms) are connected in series with a 10 V battery.',
            steps: [
            { text: 'Equivalent resistance. R_eq = 2 + 3 + 5 = 10 ohms.' },
            { text: 'Current. I = V/R_eq = 10/10 = 1 A.' },
            { text: 'Voltages. V1 = I * R1 = 1 * 2 = 2 V. V2 = I * R2 = 1 * 3 = 3 V. V3 = I * R3 = 1 * 5 = 5 V.' },
            { text: 'Verify. V1 + V2 + V3 = 2 + 3 + 5 = 10 V = V. Correct.', faded: true, blankAnswer: 'R_eq = 10 ohms. I = 1 A. V1 = 2 V, V2 = 3 V, V3 = 5 V..' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_01_004', title: 'Identify each idea',
          dissect: { specimen: 'Ohm\'s Law: Statement, Formula and V-I Graph', spots: [
            { id: 's1', label: 'Ohms Law states that the', prompt: 'Which idea is this? — Ohm\'s Law states that the current through a conductor is directly proportional to the.', answer: 'Ohms Law states that the', options: ['Ohms Law states that the', 'Resistance is the opposition a', 'Electric current is the rate', 'Electric potential at a point'] },
            { id: 's2', label: 'Resistance is the opposition a', prompt: 'Which idea is this? — Resistance is the opposition a conductor offers to electric current, measured in ohms.', answer: 'Resistance is the opposition a', options: ['Resistance is the opposition a', 'Ohms Law states that the', 'Electric current is the rate', 'Electric potential at a point'] },
            { id: 's3', label: 'Electric current is the rate', prompt: 'Which idea is this? — Electric current is the rate of flow of electric charge through a conductor, defined as I.', answer: 'Electric current is the rate', options: ['Electric current is the rate', 'Ohms Law states that the', 'Resistance is the opposition a', 'Electric potential at a point'] },
            { id: 's4', label: 'Electric potential at a point', prompt: 'Which idea is this? — Electric potential at a point is the electric potential energy per unit charge at that.', answer: 'Electric potential at a point', options: ['Electric potential at a point', 'Ohms Law states that the', 'Resistance is the opposition a', 'Electric current is the rate'] },
            { id: 's5', label: 'Series combination of resistors is', prompt: 'Which idea is this? — Series combination of resistors is a circuit arrangement where resistors are connected.', answer: 'Series combination of resistors is', options: ['Series combination of resistors is', 'Ohms Law states that the', 'Resistance is the opposition a', 'Electric current is the rate'] }
          ] } }
    ],
    explore: { component: C9_PhysicsOhmsResistanceSim, prompt: 'Explore the interactive — Ohm\'s Law: Statement, Formula and V-I Graph' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_003', difficulty: 'standard',
          question: 'Ohm\'s Law states that the current through a conductor is directly proportional.',
          hint: 'Revisit c10_phy_cbse_01_001 (Electric Current) and c10_phy_cbse_01_002 (Electric Potential) for.',
          misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and.',
          parts: [
                { id: 'a', prompt: 'A 12 V battery produces a current of 3 A through a resistor. Calculate the resistance.', answer: 'R = V/I = 12/3 = 4 ohms',
                  options: ['R = V/I = 12/3 = 4 ohms', 'resistance changes with voltage or current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if V.' },
                { id: 'b', prompt: 'A 10 ohm resistor has a current of 0.5 A flowing through it. What is the potential difference across it?', answer: 'V = I * R = 0.5 * 10 = 5 V',
                  options: ['V = I * R = 0.5 * 10 = 5 V', 'resistance changes with voltage or current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if V.' },
                { id: 'c', prompt: 'What is the unit of resistance, and how is it defined?', answer: 'The unit of resistance is the ohm (symbol: capital omega)',
                  options: ['The unit of resistance is the ohm (symbol: capital omega)', 'ohm is the unit of current', 'resistance changes with voltage or current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if V.' }
          ],
            remediations: { 'resistance-changes-with-voltage-or': { steps: ['Set up a circuit with a resistor.', 'Conclude: V and I are proportional; R is constant (property of the material).', 'Practice: given any two, find the third.', 'Condition: constant temperature.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and.',
          parts: [
                { id: 'a', prompt: 'A student says: "If the voltage doubles, the resistance doubles too." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'If the voltage doubles and resistance stays the same, the current doubles', 'resistance changes with voltage or current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think resistance changes with voltage or current. The exact error: from V = IR, they rearrange to R = V/I and conclude that if V.' }
          ],
            remediations: { 'resistance-changes-with-voltage-or': { steps: ['Set up a circuit with a resistor.', 'Conclude: V and I are proportional; R is constant (property of the material).', 'Practice: given any two, find the third.', 'Condition: constant temperature.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_004', difficulty: 'standard',
          question: 'Resistance is the opposition a conductor offers to electric current, measured.',
          hint: 'Revisit c10_phy_cbse_01_003 (Ohm\'s Law) for the definition of resistance as R = V/I.',
          misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that.',
          parts: [
                { id: 'a', prompt: 'A copper wire has resistivity 1.7e-8 ohm*m, length 10 m, and cross-sectional area 0.0001 m^2. Calculate its resistance.', answer: 'R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms',
                  options: ['R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms', 'more material', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' },
                { id: 'b', prompt: 'If a wire\'s length is doubled (same material and cross-section), what happens to its resistance?', answer: 'Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R',
                  options: ['Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R', 'resistance stays the same', 'more material'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' }
          ],
            remediations: { 'thicker-wires-have-more-resistance': { steps: ['Long pipe = more resistance (more friction).', 'Wide pipe = less resistance (more space).', 'L in numerator (more L = more R).', 'A in denominator (more A = less R).'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that.',
          parts: [
                { id: 'a', prompt: 'A student says: "A thicker wire has more resistance because it has more material." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'more material', 'more resistance', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' },
                { id: 'b', prompt: 'If a wire\'s length is doubled (same material and cross-section), what happens to its resistance?', answer: 'Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R',
                  options: ['Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R', 'resistance stays the same', 'more material', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' }
          ],
            remediations: { 'thicker-wires-have-more-resistance': { steps: ['Long pipe = more resistance (more friction).', 'Wide pipe = less resistance (more space).', 'L in numerator (more L = more R).', 'A in denominator (more A = less R).'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_001', difficulty: 'standard',
          question: 'Electric current is the rate of flow of electric charge through a conductor,.',
          hint: 'Revisit c10_phy_cbse_01_001 (Electric Current) for the basic framework of.',
          misconception: 'Students confuse current (rate of flow) with charge (amount). The exact error: they think "more current" means "more.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electric current is the rate of flow of electric charge through a conductor, defined as I',
                  options: ['Electric current is the rate of flow of electric charge through a conductor, defined as I', 'Ohm\'s Law states that the current through a conductor is directly proportional to the', 'Resistance is the opposition a conductor offers to electric current, measured in ohms', 'Electric potential at a point is the electric potential energy per unit charge at that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse current (rate of flow) with charge (amount). The exact error: they think "more current" means "more charge in the wire.".' }
          ],
            remediations: { 'students-confuse-current-rate-of': { steps: ['"How much water" = charge (coulombs).', '"How fast it flows" = current (amperes).', 'Practice: given Q and t, find I; given I and t, find Q.', 'Direction: conventional current (positive to negative) vs.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_002', difficulty: 'standard',
          question: 'Electric potential at a point is the electric potential energy per unit charge.',
          hint: 'Revisit c10_phy_cbse_01_001 (Electric Current) for the concept of current and.',
          misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but.',
          parts: [
                { id: 'a', prompt: 'Calculate the potential difference if 24 J of work moves 6 C of charge.', answer: 'V = W/Q = 24/6 = 4 V',
                  options: ['V = W/Q = 24/6 = 4 V', 'voltage is the same as current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow;.' },
                { id: 'b', prompt: 'Explain the analogy between potential difference and water pressure.', answer: 'Water flows from high pressure to low pressure',
                  options: ['Water flows from high pressure to low pressure', 'voltage is like water volume', 'voltage is the same as current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow;.' }
          ],
            remediations: { 'voltage-is-the-same-as': { steps: ['Pump = battery (creates pressure/voltage).', 'Pressure difference = voltage.', 'Practice: given W and Q, find V; given V and Q, find W.', 'Emphasize: voltage is the push, current is the flow.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but.',
          parts: [
                { id: 'a', prompt: 'A 9 V battery does 9 J of work on each coulomb. If 3 C of charge pass through, how much energy is delivered?', answer: 'V = W/Q, so W = V * Q = 9 * 3 = 27 J',
                  options: ['V = W/Q, so W = V * Q = 9 * 3 = 27 J', 'voltage is the same as current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow;.' },
                { id: 'b', prompt: 'A student says: "A higher voltage battery has more current." Evaluate this statement.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'voltage is the same as current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think voltage is the same as current. The exact error: they say "the voltage flows through the wire" — but voltage does not flow;.' }
          ],
            remediations: { 'voltage-is-the-same-as': { steps: ['Pump = battery (creates pressure/voltage).', 'Pressure difference = voltage.', 'Practice: given W and Q, find V; given V and Q, find W.', 'Emphasize: voltage is the push, current is the flow.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_006', difficulty: 'standard',
          question: 'Series combination of resistors is a circuit arrangement where resistors are.',
          hint: 'Revisit c10_phy_cbse_01_003 (Ohm\'s Law) for V = IR and c10_phy_cbse_01_004 (Resistance) for the.',
          misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel).',
          parts: [
                { id: 'a', prompt: 'In a series circuit, what is the relationship between the current through each resistor?', answer: 'The current is the same through all resistors: I = I1 = I2 = I3 =',
                  options: ['The current is the same through all resistors: I = I1 = I2 = I3 =', 'current divides among resistors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel) and current divides.' },
                { id: 'b', prompt: 'Why does the total resistance in series increase when more resistors are added?', answer: 'In series, R_eq = R1 + R2 +',
                  options: ['In series, R_eq = R1 + R2 +', 'adding resistors gives more paths'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel) and current divides.' }
          ],
            remediations: { 'students-confuse-the-series-and': { steps: ['Draw a series circuit with 3 resistors.', 'Trace the current: one path, same I everywhere.', 'Add more resistors: R_eq increases.', 'Voltage divides: V = V1 + V2 + V3, where V_i = I * R_i.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel).',
          parts: [
                { id: 'a', prompt: 'Why does the total resistance in series increase when more resistors are added?', answer: 'In series, R_eq = R1 + R2 +',
                  options: ['In series, R_eq = R1 + R2 +', 'adding resistors gives more paths'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the series and parallel rules: they think voltage is the same in series (it is the same in parallel) and current divides.' }
          ],
            remediations: { 'students-confuse-the-series-and': { steps: ['Draw a series circuit with 3 resistors.', 'Trace the current: one path, same I everywhere.', 'Add more resistors: R_eq increases.', 'Voltage divides: V = V1 + V2 + V3, where V_i = I * R_i.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
