import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch04_p2: SimDef = {
    id: 'v3_c12_phy_ch04_p2',
    title: 'Moving Charges and Magnetism · Part 2/2',
    subtitle: 'The force is real — the work is zero',
    classLevel: 12, subject: 'physics', topic: 'Moving Charges and Magnetism · Part 2/2',
    chapters: ['c12_phy_ch04'],
    nodeIds: ['c12_phy_cbse_04_007', 'c12_phy_cbse_04_008', 'c12_phy_cbse_04_009', 'c12_phy_cbse_04_010', 'c12_phy_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field-forces analyst', intro: 'A bar magnet bends a beam of electrons — the first sign that magnetism only steers, never pushes.', goal: 'Apply the magnetic Lorentz force — magnitude, right-hand direction, and the zero-work consequence.' },
    discovery: {
        question: 'A magnet bends the electron beam in an old TV tube — yet the electrons never speed up or slow down. How can a force leave speed untouched?',
        options: ['It\'s perpendicular to velocity — F = qv×B steers without pushing; zero work, direction changed, kinetic energy conserved', 'It cancels gravity', 'Electrons resist', 'The field is weak'],
        answer: 'It\'s perpendicular to velocity — F = qv×B steers without pushing; zero work, direction changed, kinetic energy conserved',
        hook: 'Same field, same speed: proton and electron feel equal force in opposite directions — but the electron accelerates ~1836 times harder because F = ma divides by mass. And the right-hand rule belongs to positive charge; flip it for electrons.',
    },
    teaching: [
        { title: 'Magnetic Field Due to a Solenoid and Toroid', text: 'The magnetic field inside a long solenoid is uniform, directed along its axis, and has magnitude \\( B = \\mu_0 n I \\), where \\( n \\) is the number of turns per unit length and \\( I \\) is the current.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_04_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Cross the vectors yourself: compute F = qvB sin θ for a proton at 30°, run the right-hand rule for both charge signs, and explain to a sceptic why magnetic force can never do work.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_007', title: 'Magnetic Field Due to a Solenoid and Toroid',
          scaffold: { problem: 'A solenoid used in a school physics lab is 50 cm long, has a radius of 1.5 cm, and is wound with 5 layers of 200 turns each.',
            steps: [
            { text: 'Identify given quantities with units. \\( l = 0.50 \\, \\text{m} \\), radius = 0.015 m (not needed for B inside), layers.' },
            { text: 'Compute turn density \\( n = N/l = 1000 / 0.50 = 2000 \\, \\text{m}^{-1} \\).' },
            { text: 'Apply solenoid formula \\( B = \\mu_0 n I = (4\\pi \\times 10^{-7}) \\times 2000 \\times 4.0 = 32\\pi \\times 10^{-4} \\.' },
            { text: 'Check approximation: \\( l / \\text{diameter} = 0.50 / 0.03 \\approx 16.7 \\).' },
            { text: 'For toroid, use \\( B = \\frac{\\mu_0 N I}{2\\pi r} = \\frac{(4\\pi \\times 10^{-7}) \\times 1000 \\times 4.0}{2\\pi \\times 0.10}.' },
            { text: 'Verify units: \\( \\mu_0 \\) (T·m/A) × \\( n \\) (m\\(^{-1}\\)) × \\( I \\) (A) = T.', faded: true, blankAnswer: '(a) \\( 1.0 \\times 10^{-2} \\, \\text{T} \\) (or \\( 10.0 \\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_008', title: 'Force Between Two Parallel Current-Carrying Conductors',
          scaffold: { problem: 'Two overhead power lines run parallel to each other along a street, separated by 40 cm.',
            steps: [
            { text: 'Identify given quantities: \\(I_1 = 250\\,\\text{A}\\), \\(I_2 = 180\\,\\text{A}\\), \\(d = 40\\,\\text{cm} = 0.40\\,\\text{m}\\).' },
            { text: 'Write the formula for force per unit length: \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\).' },
            { text: 'Substitute values: \\(f = \\frac{(4\\pi \\times 10^{-7}) \\times 250 \\times 180}{2\\pi \\times 0.40}\\).' },
            { text: 'Simplify: Cancel \\(\\pi\\): \\(\\frac{4 \\times 10^{-7} \\times 250 \\times 180}{2 \\times 0.40} = \\frac{4 \\times 10^{-7}.' },
            { text: 'Since currents are parallel, the force is attractive. The magnitude \\(0.0225\\,\\text{N/m}\\) is small but measurable; for.', faded: true, blankAnswer: '\\(2.25 \\times 10^{-2}\\,\\text{N/m}\\) attractive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_009', title: 'Torque on a Current Loop in Magnetic Field',
          scaffold: { problem: 'A rectangular coil of 20 turns, dimensions 10 cm × 5 cm, carries a current of 12 A.',
            steps: [
            { text: 'Identify given quantities: N = 20, length = 0.10 m, breadth = 0.05 m, I = 12 A, B = 0.80 T, θ = 30° (angle between.' },
            { text: 'Compute area A = length × breadth = 0.10 × 0.05 = 0.0050 m². Magnetic moment m = NIA = 20 × 12 × 0.0050 = 1.2 A·m².' },
            { text: 'Use torque formula τ = mB sinθ = 1.2 × 0.80 × sin30° = 1.2 × 0.80 × 0.5 = 0.48 N·m.' },
            { text: 'Check units: A·m² × T = A·m² × (N/(A·m)) = N·m. Correct.' },
            { text: 'Verify reasonableness: Torque is less than maximum (mB = 0.96 N·m) because sin30°=0.5. Answer is physically plausible.', faded: true, blankAnswer: '0.48 N·m' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_010', title: 'Moving Coil Galvanometer: Principle and Sensitivity',
          scaffold: { problem: 'A moving coil galvanometer has a coil of 150 turns, each of area 2.0 cm². The coil is suspended in a radial magnetic field of 0.15 T.',
            steps: [
            { text: 'Convert given quantities to SI units: N = 150, A = 2.0 cm² = 2.0 × 10⁻⁴ m², B = 0.15 T, k = 2.5 × 10⁻⁶ N·m/rad, R = 12.' },
            { text: 'Calculate current sensitivity S_I = φ/I = NAB/k = (150 × 2.0×10⁻⁴ × 0.15) / (2.5×10⁻⁶) = (4.5×10⁻³) / (2.5×10⁻⁶) = 1800.' },
            { text: 'Convert to μA per division: 1 A = 10⁶ μA. So S_I = 1800 rad/A = 1800 × 10⁻⁶ rad/μA = 1.8 × 10⁻³ rad/μA.' },
            { text: 'Calculate voltage sensitivity S_V = φ/V = NAB/(kR) = S_I / R = 1800 / 12 = 150 rad/V.' },
            { text: 'Voltage per division = (deflection per division) / S_V = 0.05236 / 150 = 3.49 × 10⁻⁴ V/div = 0.349 mV/div.', faded: true, blankAnswer: '(a) 29.1 μA per division; (b) 0.349 mV per division.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_011', title: 'Conversion of Galvanometer to Ammeter and Voltmeter',
          scaffold: { problem: 'In a school physics lab, a moving coil galvanometer has a resistance of 80 Ω and gives full-scale deflection for a current of 0.5 mA.',
            steps: [
            { text: 'Identify given quantities with units: \\(G = 80 \\text{ Ω}\\), \\(I_g = 0.5 \\text{ mA} = 0.0005 \\text{ A}\\), desired.' },
            { text: 'Write the shunt formula for ammeter conversion: \\(r_s = \\frac{I_g G}{I - I_g}\\).' },
            { text: 'Substitute values: \\(r_s = \\frac{0.0005 \\times 80}{2 - 0.0005} = \\frac{0.04}{1.9995} \\approx 0.020005 \\text{ Ω}\\).' },
            { text: 'Compute equivalent resistance of ammeter: \\(R_{eq} = \\frac{G r_s}{G + r_s} = \\frac{80 \\times 0.020005}{80.020005}.' },
            { text: 'Compare with circuit resistance: Typical circuit \\(R_{circuit} = 10 \\text{ Ω}\\).' },
            { text: 'Verify shunt power rating: Current through shunt \\(I_s = I - I_g = 1.9995 \\text{ A}\\).', faded: true, blankAnswer: 'Shunt resistance \\(r_s = 0.020 \\text{ Ω}\\); Equivalent.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A demo wire hangs between magnet poles and won\'t budge. A junior keeps cranking the supply — \'more current, more force, it\'ll move eventually.\'',
            decisions: [{ prompt: 'What should he check before touching the current?', options: [
                { text: 'The angle — F = IlB sinθ is zero when the wire runs parallel to the field; if current and B are aligned, no current on Earth produces force — rotate the wire or the magnet, don\'t amplify a zero.', outcome: 'The chapter\'s geometry: the cross product kills force at θ = 0° or 180° — scaling I multiplies a sinθ that\'s already zero.' },
                { text: 'He\'s right — force is proportional to current, so persistence pays.', outcome: 'Proportional means I multiplies the sinθ term, not replaces it — ten times the current on a parallel wire is still ten times zero.', reveals: 'more-current-overcomes-angle' },
                { text: 'Reverse the battery — opposite current must push instead of pull.', outcome: 'Reversal flips the force\'s direction, not its existence — at parallel alignment both directions give zero; the fix is geometric, not electrical.', reveals: 'reverse-current-creates-force' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'You can now predict a charge\'s deflection — and defend the strange truth that a real force can do zero work.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_007', difficulty: 'standard',
          question: 'The magnetic field inside a long solenoid is uniform, directed along its axis.',
          hint: 'Revisit c12_phy_cbse_04_006 (Ampere\'s Circuital Law) – focus on Example 4.7 (field.',
          misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends,.',
          parts: [
                { id: 'a', prompt: 'State the formula for the magnetic field inside a long solenoid and give the SI unit of each quantity.', answer: '\\( B = \\mu_0 n I \\), where \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\)',
                  options: ['\\( B = \\mu_0 n I \\), where \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\)', 'the toroid is a closed loop with no ends, so no magnetic poles, hence no field'],
                  hint: 'Revisit c12_phy_cbse_04_006 (Ampere\'s Circuital Law) – focus on Example 4.7 (field inside/outside.',
                  misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so no magnetic poles.' }
          ],
            remediations: { 'the-magnetic-field-inside-a': { steps: ['If the student holds this misconception: (1) Revisit Ampere\'s law (c12_phy_cbse_04_006) – draw three Amperian loops for.', '(2) For each, compute \\( I_{\\text{enc}} \\): cavity = 0, windings = \\( N I \\), outside = 0.', '(3) Apply \\( \\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enc}} \\) to get \\( B \\) in each region.', '(4) Re-do Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The magnetic field inside a toroid is uniform, just like in a long solenoid." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the toroid is a closed loop with no ends, so no magnetic poles, hence no field'],
                  hint: 'Revisit c12_phy_cbse_04_006 (Ampere\'s Circuital Law) – focus on Example 4.7 (field inside/outside.',
                  misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so no magnetic poles.' }
          ],
            remediations: { 'the-magnetic-field-inside-a': { steps: ['If the student holds this misconception: (1) Revisit Ampere\'s law (c12_phy_cbse_04_006) – draw three Amperian loops for.', '(2) For each, compute \\( I_{\\text{enc}} \\): cavity = 0, windings = \\( N I \\), outside = 0.', '(3) Apply \\( \\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enc}} \\) to get \\( B \\) in each region.', '(4) Re-do Diagnostic Question 5.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_008', difficulty: 'standard',
          question: 'The force between two parallel current-carrying conductors is the magnetic.',
          hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation.',
          misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between.',
          parts: [
                { id: 'a', prompt: 'State the formula for the force per unit length between two long parallel current-carrying conductors in vacuum.', answer: 'The force per unit length is \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\)',
                  options: ['The force per unit length is \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\)', 'like charges repel'],
                  hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation of \\(B.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' },
                { id: 'b', prompt: 'Two parallel wires carry currents in the same direction. Using the right-hand rule for magnetic field and the Lorentz force, explain why the force between them.', answer: 'Wire 1 produces a magnetic field \\(\\vec{B}_1\\) that circles around it',
                  options: ['Wire 1 produces a magnetic field \\(\\vec{B}_1\\) that circles around it', 'like charges repel'],
                  hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation of \\(B.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' },
                { id: 'c', prompt: 'Two long parallel wires are separated by 5.0 cm. Wire A carries 12 A upward, wire B carries 8.0 A downward.', answer: 'Given: \\(I_1 = 12\\,\\text{A}\\), \\(I_2 = 8.0\\,\\text{A}\\), \\(d = 0.050\\,\\text{m}\\)',
                  options: ['Given: \\(I_1 = 12\\,\\text{A}\\), \\(I_2 = 8.0\\,\\text{A}\\), \\(d = 0.050\\,\\text{m}\\)', 'like charges repel'],
                  hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation of \\(B.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' },
                { id: 'd', prompt: 'A student claims: "The force between two parallel currents is proportional to \\(1/d^2\\) because the magnetic field of a wire falls as \\(1/d\\) and the force.', answer: 'The error is double-counting the distance dependence',
                  options: ['The error is double-counting the distance dependence', 'like charges repel'],
                  hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation of \\(B.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' }
          ],
            remediations: { 'the-force-between-parallel-currents': { steps: ['If a student exhibits the \\(1/d^2\\) misconception, have them re-derive the force step by step: (1) Write the magnetic.', '(2) Write the force on a length \\(L\\) of wire 2: \\(F = I_2 L B_1 \\sin 90^\\circ\\).', '(3) Substitute \\(B_1\\) and simplify to \\(F = \\frac{\\mu_0 I_1 I_2 L}{2\\pi d}\\).', '(4) Divide by \\(L\\) to get \\(f\\).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_009', difficulty: 'standard',
          question: 'The torque on a current-carrying loop in a uniform magnetic field is the.',
          hint: 'If stuck, review c12_phy_cbse_04_002 (force on current conductor) and c11_phy_cbse_06_004.',
          misconception: 'Students often think the angle in τ = NIAB sinθ is the angle between the plane of the loop and the magnetic field.',
          parts: [
                { id: 'a', prompt: 'A rectangular loop of wire carries a steady current. The loop is placed in a uniform magnetic field such that the plane of the loop is parallel to the field.', answer: 'Forces on opposite arms are equal and opposite',
                  options: ['Forces on opposite arms are equal and opposite', 'net force is non-zero'],
                  hint: 'If stuck, review c12_phy_cbse_04_002 (force on current conductor) and c11_phy_cbse_06_004 (torque.',
                  misconception: 'Students often think the angle in τ = NIAB sinθ is the angle between the plane of the loop and the magnetic field.' }
          ],
            remediations: { 'the-angle-in-niab-sin': { steps: ['Revisit the definition of magnetic moment direction (right-hand thumb rule: curl fingers in current direction, thumb.', 'Draw the loop, B-field, and m vector.', 'Practice identifying θ in diagrams.', 'Use the worked example in NCERT Example 4.10.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_010', difficulty: 'standard',
          question: 'A moving coil galvanometer is a sensitive current-detecting instrument that.',
          hint: 'If stuck, review the torque on a rectangular current loop in a uniform magnetic field.',
          misconception: 'Students often think that increasing the number of turns N always increases both current sensitivity and voltage.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A moving coil galvanometer is a sensitive current-detecting instrument that operates on',
                  options: ['A moving coil galvanometer is a sensitive current-detecting instrument that operates on', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular'],
                  hint: 'If stuck, review the torque on a rectangular current loop in a uniform magnetic field.',
                  misconception: 'Students often think that increasing the number of turns N always increases both current sensitivity and voltage sensitivity.' }
          ],
            remediations: { 'increasing-the-number-of-turns': { steps: ['If the student struggles with the linear relationship φ = (NAB/k)I, first revisit the torque on a current loop in.', 'Then, physically demonstrate a torsional spring (e.g., a twisted wire or a torsion balance) to show that restoring.', 'Next, guide them through the equilibrium condition step by step: magnetic torque = restoring torque.', 'For the sensitivity formulas, have them write the definitions: current sensitivity = φ/I, voltage sensitivity = φ/V.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_011', difficulty: 'standard',
          question: 'A moving coil galvanometer is converted into an ammeter by connecting a low.',
          hint: 'If stuck, review the derivation of \\(\\varphi = (NAB/k)I\\) in the galvanometer node and.',
          misconception: 'Students often think that increasing the number of turns \\(N\\) in the galvanometer coil increases *both* current.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A moving coil galvanometer is converted into an ammeter by connecting a low resistance',
                  options: ['A moving coil galvanometer is converted into an ammeter by connecting a low resistance', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic force on a straight current-carrying conductor placed in a uniform magnetic', 'When a charged particle moves in a uniform magnetic field with its velocity perpendicular'],
                  hint: 'If stuck, review the derivation of \\(\\varphi = (NAB/k)I\\) in the galvanometer node and practice.',
                  misconception: 'Students often think that increasing the number of turns \\(N\\) in the galvanometer coil increases *both* current sensitivity and voltage.' }
          ],
            remediations: { 'increasing-the-number-of-turns': { steps: ['Revisit node **c12_phy_cbse_04_010** (Moving Coil Galvanometer: Principle and Sensitivity) to re-derive \\(\\varphi.', 'Revisit node **c10_phy_cbse_01_006** and **c10_phy_cbse_01_007** (Series and Parallel Resistance) to practice.', 'Do a re-diagnostic: Calculate the shunt for a 50 Ω, 2 mA galvanometer to make a 0–2 A ammeter.', 'Then calculate the equivalent resistance of the ammeter.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
