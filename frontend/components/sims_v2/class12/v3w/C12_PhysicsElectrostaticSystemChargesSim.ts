import type { SimDef } from '../../engine/types';
import C12_PhysicsElectrostaticSystemChargesSim from '../../../simulations/c6_12/C12_PhysicsElectrostaticSystemChargesSim';

/** v3 wrapped master — C12_PhysicsElectrostaticSystemChargesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicselectrostaticsystemchargessim: SimDef = {
    id: 'v3w_c12_physicselectrostaticsystemchargessim',
    title: 'Electrostatic System Charges',
    subtitle: 'This node covers the superposition principle for discrete point charges in vacuum/air as.',
    classLevel: 12, subject: 'physics', topic: 'Superposition Principle for Electric Forces',
    chapters: [],
    nodeIds: ['c12_phy_cbse_01_003', 'c12_phy_cbse_01_004', 'c12_phy_cbse_02_001', 'c12_phy_cbse_02_002', 'c12_phy_cbse_02_004', 'c12_phy_cbse_02_005', 'c12_phy_cbse_01_001', 'c12_phy_cbse_01_005', 'c12_phy_cbse_02_009', 'c12_phy_cbse_01_002', 'c12_phy_cbse_01_006', 'c12_phy_cbse_02_007', 'c12_phy_cbse_02_012', 'c12_phy_cbse_02_003', 'c12_phy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you rub a plastic ruler with wool and bring it near small paper bits on your desk — they jump up.', goal: 'Master Electrostatic System Charges.' },
    discovery: {
        question: 'What is the SI unit of electric field, and how is it derived from the definition \\(\\vec{E} = \\vec{F}/q\\)?',
        options: ['The SI unit is newton per coulomb (N/C)', 'without realizing it is equivalent', 'which inverts the definition'],
        answer: 'The SI unit is newton per coulomb (N/C)',
        hook: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\).',
    },
    teaching: [
        { title: 'The superposition principle for electric.', text: 'The superposition principle for electric forces states that the net electrostatic force on a given charge due to a system of multiple other charges is the vector sum of the individual forces exerted.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_003', title: 'The superposition principle for.',
          scaffold: { problem: '** Three charges are placed at the vertices of a right triangle: \\(q_A = +5.0\\ \\mu\\text{C}\\) at \\((0,0)\\), \\(q_B = -3.0\\ \\mu\\text{C}\\) at.',
            steps: [
            { text: 'Identify given quantities with units. \\(q_A = +5.0 \\times 10^{-6}\\ \\text{C}\\), \\(q_B = -3.0 \\times 10^{-6}\\ \\text{C}\\).' },
            { text: 'Compute force on \\(q_A\\) due to \\(q_B\\). Distance \\(r_{AB} = 0.040\\ \\text{m}\\).' },
            { text: 'Compute force on \\(q_A\\) due to \\(q_C\\). Distance \\(r_{AC} = 0.030\\ \\text{m}\\).' },
            { text: 'Add components. \\(F_x = +84.375\\ \\text{N}\\), \\(F_y = -100\\ \\text{N}\\).' },
            { text: 'Verify reasonableness. Forces are large because charges are \\(\\mu\\text{C}\\) at cm distances — typical for lab-scale.', faded: true, blankAnswer: '** \\(\\vec{F}_{\\text{net}} = (84.4\\ \\hat{i} - 100\\ \\hat{j})\\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_004', title: 'Electric field at a point in space is.',
          scaffold: { problem: 'A charge \\(q_1 = +2.0\\,\\mu\\text{C}\\) is placed at the origin, and a charge \\(q_2 = -3.0\\,\\mu\\text{C}\\) is placed at \\((0.10\\,\\text{m}, 0)\\).',
            steps: [
            { text: 'Identify given quantities: \\(q_1 = +2.0 \\times 10^{-6}\\,\\text{C}\\) at (0,0), \\(q_2 = -3.0 \\times 10^{-6}\\,\\text{C}\\) at.' },
            { text: 'Compute distances from each charge to P. For \\(q_1\\): \\(r_1 = 0.10\\,\\text{m}\\).' },
            { text: 'Determine unit vectors \\(\\hat{r}_1\\) and \\(\\hat{r}_2\\) from each charge to P.' },
            { text: 'Calculate field magnitudes: \\(E_1 = 9 \\times 10^9 \\times \\frac{2.0 \\times 10^{-6}}{(0.10)^2} = 1.8 \\times.' },
            { text: 'Compute vector fields: \\(\\vec{E}_1 = 1.8 \\times 10^6 (+\\hat{y}) = (0, 1.8 \\times 10^6)\\).' },
            { text: 'Add components: \\(\\vec{E}_{\\text{net}} = (-9.54 \\times 10^5, 1.8 \\times 10^6 + 9.54 \\times 10^5) = (-9.54 \\times 10^5,.', faded: true, blankAnswer: '\\(\\vec{E}_{\\text{net}} = (-9.54 \\times 10^5\\,\\hat{x} + 2.75.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_001', title: 'Electrostatic potential at a point in.',
          scaffold: { problem: 'A small positively charged sphere of 5.0 μC is brought from infinity to a point near a charged conductor.',
            steps: [
            { text: 'Identify given quantities: q₁ = +5.0 μC = 5.0 × 10⁻⁶ C, W = 12.0 mJ = 12.0 × 10⁻³ J. Find V.' },
            { text: 'Use definition V = W/q. Note: potential is property of the point in the field, independent of test charge.' },
            { text: 'Substitute for (a): V = (12.0 × 10⁻³ J) / (5.0 × 10⁻⁶ C) = 2.4 × 10³ V = 2.4 kV.' },
            { text: 'For (b), q₂ = -3.0 μC. The work done by external agent is still +12.0 mJ (given).' },
            { text: 'Conclusion: (a) 2.4 kV, (b) 2.4 kV (potential is unchanged), (c) Potential is defined using a unit positive test.', faded: true, blankAnswer: '(a) 2.4 kV, (b) 2.4 kV, (c) Potential is defined using unit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_002', title: 'The electrostatic potential at a point.',
          scaffold: { problem: 'A point charge of +8 μC is placed at the origin. Calculate the electrostatic potential at a point P located 16 cm away on the positive.',
            steps: [
            { text: 'Identify given quantities: Q = +8 × 10⁻⁶ C, r = 0.16 m, q_test = +2 × 10⁻⁹ C. Find V at P and W_ext.' },
            { text: 'Use formula V = kQ/r with k = 9 × 10⁹ N·m²/C². Check units: kQ/r → (N·m²/C²)(C)/m = N·m/C = J/C = V. Correct.' },
            { text: 'Substitute: V = (9 × 10⁹)(8 × 10⁻⁶)/0.16 = (72 × 10³)/0.16 = 4.5 × 10⁵ V.' },
            { text: 'Work done by external agent W = q_test × V = (2 × 10⁻⁹)(4.5 × 10⁵) = 9 × 10⁻⁴ J.' },
            { text: 'Verify reasonableness: Positive Q gives positive V; positive test charge requires positive work against repulsion.', faded: true, blankAnswer: 'V = 4.5 × 10⁵ V; W = 9 × 10⁻⁴ J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_004', title: 'An equipotential surface is a.',
          scaffold: { problem: 'Two large parallel conducting plates are separated by 2.0 cm in air. The potential difference between them is 300 V.',
            steps: [
            { text: 'Identify given: d = 0.020 m, V_total = 300 V. The field is uniform, so equipotentials are planes parallel to plates.' },
            { text: 'Electric field magnitude in uniform field: E = ΔV/Δd = 300 V / 0.020 m = 1.5×10⁴ V/m (or N/C).' },
            { text: 'Electron charge q = -e = -1.6×10⁻¹⁹ C. It moves from 100 V to 300 V.' },
            { text: 'Work done by field = qΔV = (-1.6×10⁻¹⁹ C)(200 V) = -3.2×10⁻¹⁷ J.' },
            { text: 'Check units: C·V = J. Answer is positive energy, magnitude 3.2×10⁻¹⁷ J.', faded: true, blankAnswer: '(a) Four parallel planes at x = 0, 0.00667 m, 0.0133 m,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_005', title: 'The electrostatic potential energy of a.',
          scaffold: { problem: 'Four identical charges \\(q = 2\\,\\mu\\text{C}\\) are placed at the corners of a square of side \\(10\\,\\text{cm}\\).',
            steps: [
            { text: 'Identify all unique pairs. A square has 4 sides (distance \\(a = 0.10\\,\\text{m}\\)) and 2 diagonals (distance \\(a\\sqrt{2}.' },
            { text: 'Write pair energy for one side pair: \\(U_{\\text{side}} = k \\frac{q^2}{a} = 9\\times10^9 \\frac{(2\\times10^{-6})^2}{0.10}.' },
            { text: 'Write pair energy for one diagonal pair: \\(U_{\\text{diag}} = k \\frac{q^2}{a\\sqrt{2}} = \\frac{0.36}{\\sqrt{2}} =.' },
            { text: 'Total energy = \\(4 \\times U_{\\text{side}} + 2 \\times U_{\\text{diag}} = 4(0.36) + 2(0.2546) = 1.44 + 0.5092 =.' },
            { text: 'Verify sign: all charges positive → all pair energies positive → total positive (repulsive system).', faded: true, blankAnswer: '\\(1.95\\,\\text{J}\\) (approx)' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_01_004', title: 'Identify each idea',
          dissect: { specimen: 'Electrostatic System Charges', spots: [
            { id: 's1', label: 'The superposition principle for electric', prompt: 'Which idea is this? — The superposition principle for electric forces states that the net electrostatic force.', answer: 'The superposition principle for electric', options: ['The superposition principle for electric', 'Electric field at a point', 'Electrostatic potential at a point', 'The electrostatic potential at a'] },
            { id: 's2', label: 'Electric field at a point', prompt: 'Which idea is this? — Electric field at a point in space is defined as the electrostatic force per unit.', answer: 'Electric field at a point', options: ['Electric field at a point', 'The superposition principle for electric', 'Electrostatic potential at a point', 'The electrostatic potential at a'] },
            { id: 's3', label: 'Electrostatic potential at a point', prompt: 'Which idea is this? — Electrostatic potential at a point in an electric field is the work done by an external.', answer: 'Electrostatic potential at a point', options: ['Electrostatic potential at a point', 'The superposition principle for electric', 'Electric field at a point', 'The electrostatic potential at a'] },
            { id: 's4', label: 'The electrostatic potential at a', prompt: 'Which idea is this? — The electrostatic potential at a point due to a point charge Q is the work done per unit.', answer: 'The electrostatic potential at a', options: ['The electrostatic potential at a', 'The superposition principle for electric', 'Electric field at a point', 'Electrostatic potential at a point'] },
            { id: 's5', label: 'An equipotential surface is a', prompt: 'Which idea is this? — An equipotential surface is a three-dimensional surface in an electrostatic field where.', answer: 'An equipotential surface is a', options: ['An equipotential surface is a', 'The superposition principle for electric', 'Electric field at a point', 'Electrostatic potential at a point'] },
            { id: 's6', label: 'The electrostatic potential energy of', prompt: 'Which idea is this? — The electrostatic potential energy of a system of point charges is the total work done by.', answer: 'The electrostatic potential energy of', options: ['The electrostatic potential energy of', 'The superposition principle for electric', 'Electric field at a point', 'Electrostatic potential at a point'] }
          ] } }
    ],
    explore: { component: C12_PhysicsElectrostaticSystemChargesSim, prompt: 'Explore the interactive — Electrostatic System Charges' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_003', difficulty: 'standard',
          question: 'The superposition principle for electric forces states that the net.',
          hint: 'Revisit vector components (c11_phy_cbse_03_003) and Coulomb\'s law direction rules.',
          misconception: 'Students often believe that the net force is the algebraic sum of the magnitudes of individual forces (scalar addition).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The superposition principle for electric forces states that the net electrostatic force',
                  options: ['The superposition principle for electric forces states that the net electrostatic force', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Electrostatic potential at a point in an electric field is the work done by an external', 'The electrostatic potential at a point due to a point charge Q is the work done per unit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the net force is the algebraic sum of the magnitudes of individual forces (scalar addition) because they.' }
          ],
            remediations: { 'the-net-force-is-the': { steps: ['If the student cannot correctly add force vectors, they must revisit: (1) Class 11 vector addition by components.', '(2) Coulomb\'s law magnitude and direction rules (c12_phy_cbse_01_002) — drill 10 problems identifying.', '(3) Re-attempt Diagnostic Questions 2, 3, and 5 with a focus on drawing free-body diagrams and writing each force in.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_004', difficulty: 'standard',
          question: 'Electric field at a point in space is defined as the electrostatic force per.',
          hint: 'If stuck, review Coulomb\'s law (c12_phy_cbse_01_002) and vector addition by components.',
          misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\).',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of electric field, and how is it derived from the definition \\(\\vec{E} = \\vec{F}/q\\)?', answer: 'The SI unit is newton per coulomb (N/C)',
                  options: ['The SI unit is newton per coulomb (N/C)', 'without realizing it is equivalent', 'which inverts the definition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\) and then substituting.' },
                { id: 'b', prompt: 'Three identical point charges \\(+q\\) are placed at the vertices of an equilateral triangle of side \\(a\\).', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'non-zero because charges are positive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\) and then substituting.' }
          ],
            remediations: { 'the-electric-field-at-a': { steps: ['If a student exhibits this misconception, have them revisit the definition: \\(\\vec{E} = \\lim_{q \\to 0} \\vec{F}/q\\).', 'Do a quick thought experiment: "Place a \\(+1\\,\\mu\\text{C}\\) test charge at point P and measure force \\(\\vec{F}\\).', 'Now replace it with \\(+2\\,\\mu\\text{C}\\) — the force doubles, but the ratio \\(\\vec{F}/q\\) stays the same.', 'The field is a property of the source charges and the point in space, not the test charge." Then ask them to compute.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\).',
          parts: [
                { id: 'a', prompt: 'Three identical point charges \\(+q\\) are placed at the vertices of an equilateral triangle of side \\(a\\).', answer: 'Yes, the claim is correct',
                  options: ['Yes, the claim is correct', 'non-zero because charges are positive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\) and then substituting.' }
          ],
            remediations: { 'the-electric-field-at-a': { steps: ['If a student exhibits this misconception, have them revisit the definition: \\(\\vec{E} = \\lim_{q \\to 0} \\vec{F}/q\\).', 'Do a quick thought experiment: "Place a \\(+1\\,\\mu\\text{C}\\) test charge at point P and measure force \\(\\vec{F}\\).', 'Now replace it with \\(+2\\,\\mu\\text{C}\\) — the force doubles, but the ratio \\(\\vec{F}/q\\) stays the same.', 'The field is a property of the source charges and the point in space, not the test charge." Then ask them to compute.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_001', difficulty: 'standard',
          question: 'Electrostatic potential at a point in an electric field is the work done by an.',
          hint: 'If stuck, revisit c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) and.',
          misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of electrostatic potential and write its dimensional formula. What does 1 volt represent in terms of work and charge?', answer: 'SI unit: volt (V)',
                  options: ['SI unit: volt (V)', 'per unit charge', '— omitting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting "per unit charge".' },
                { id: 'b', prompt: 'Why is electrostatic potential defined using a "test charge" that is infinitesimally small and moved "without acceleration"?', answer: 'The test charge must be infinitesimal so it does not disturb the source charge',
                  options: ['The test charge must be infinitesimal so it does not disturb the source charge', '— omitting', 'without acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting "per unit charge".' },
                { id: 'c', prompt: 'A charge of 3.0 μC is moved from infinity to a point P in an electric field. The work done by an external agent is 4.5 × 10⁻³ J.', answer: 'Given: q = 3.0 μC = 3.0 × 10⁻⁶ C, W = 4.5 × 10⁻³ J',
                  options: ['Given: q = 3.0 μC = 3.0 × 10⁻⁶ C, W = 4.5 × 10⁻³ J', '— omitting', 'without acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting "per unit charge".' }
          ],
            remediations: { 'potential-at-a-point-is': { steps: ['If the student cannot distinguish potential from potential energy: (1) Revisit Class 10 node c10_phy_cbse_01_002.', '(2) Do a quick dimensional check exercise: Write dimensions of work [ML²T⁻²], charge [AT], and potential [ML²T⁻³A⁻¹].', '(3) Re-attempt Diagnostic Question 1 and 3.', 'If confusion persists, use the analogy: "Price per kg (potential) vs total price (potential energy)" — price per kg.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since potential at infinity is zero, and potential at a point due to a positive charge is positive, the potential energy of a positive test.', answer: 'The statement is NOT always true',
                  options: ['The statement is NOT always true', '— omitting', 'without acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting "per unit charge".' },
                { id: 'b', prompt: 'Design a thought experiment to demonstrate that electrostatic potential is a scalar quantity, not a vector, even though it is derived from the electric field.', answer: 'Place a fixed positive charge Q at the origin',
                  options: ['Place a fixed positive charge Q at the origin', '— omitting', 'without acceleration'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "potential at a point is the work done to bring a charge from infinity to that point" — omitting "per unit charge".' }
          ],
            remediations: { 'potential-at-a-point-is': { steps: ['If the student cannot distinguish potential from potential energy: (1) Revisit Class 10 node c10_phy_cbse_01_002.', '(2) Do a quick dimensional check exercise: Write dimensions of work [ML²T⁻²], charge [AT], and potential [ML²T⁻³A⁻¹].', '(3) Re-attempt Diagnostic Question 1 and 3.', 'If confusion persists, use the analogy: "Price per kg (potential) vs total price (potential energy)" — price per kg.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_002', difficulty: 'standard',
          question: 'The electrostatic potential at a point due to a point charge Q is the work done.',
          hint: 'If stuck, review c12_phy_cbse_02_001 for the definition of potential and.',
          misconception: 'Students often write V = kQ/r² by analogy with E = kQ/r², forgetting that potential is the integral of field (V = -∫.',
          parts: [
                { id: 'a', prompt: 'Two point charges +Q and -Q are placed at x = -a and x = +a on the x-axis. At what point(s) on the x-axis is the total electrostatic potential zero?', answer: 'Let the point be at coordinate x',
                  options: ['Let the point be at coordinate x', 'E is also zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write V = kQ/r² by analogy with E = kQ/r², forgetting that potential is the integral of field (V = -∫ E·dr), which reduces.' }
          ],
            remediations: { 'students-often-write-v-kq': { steps: ['If the student confuses V ∝ 1/r with E ∝ 1/r², have them revisit c12_phy_cbse_02_001 (Electrostatic Potential:.', 'Then, re-derive V = kQ/r step-by-step on paper, explicitly writing F_ext = -kQ/r², dr negative, and limits ∞ to r.', 'Next, solve 5 superposition problems with mixed-sign charges (e.g., from NCERT Exercise 2.2), checking each term\'s sign.', 'Finally, take Diagnostic Questions 3 and 4 again to confirm correction.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write V = kQ/r² by analogy with E = kQ/r², forgetting that potential is the integral of field (V = -∫.',
          parts: [
                { id: 'a', prompt: 'Two point charges +Q and -Q are placed at x = -a and x = +a on the x-axis. At what point(s) on the x-axis is the total electrostatic potential zero?', answer: 'Let the point be at coordinate x',
                  options: ['Let the point be at coordinate x', 'E is also zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write V = kQ/r² by analogy with E = kQ/r², forgetting that potential is the integral of field (V = -∫ E·dr), which reduces.' }
          ],
            remediations: { 'students-often-write-v-kq': { steps: ['If the student confuses V ∝ 1/r with E ∝ 1/r², have them revisit c12_phy_cbse_02_001 (Electrostatic Potential:.', 'Then, re-derive V = kQ/r step-by-step on paper, explicitly writing F_ext = -kQ/r², dr negative, and limits ∞ to r.', 'Next, solve 5 superposition problems with mixed-sign charges (e.g., from NCERT Exercise 2.2), checking each term\'s sign.', 'Finally, take Diagnostic Questions 3 and 4 again to confirm correction.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_004', difficulty: 'standard',
          question: 'An equipotential surface is a three-dimensional surface in an electrostatic.',
          hint: 'If stuck, revisit the definition of potential difference (c12_phy_cbse_02_001) and the.',
          misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point.',
          parts: [
                { id: 'a', prompt: 'What is the shape of the equipotential surfaces for a single isolated positive point charge?', answer: 'The equipotential surfaces are concentric spheres centred on the point charge',
                  options: ['The equipotential surfaces are concentric spheres centred on the point charge', 'cylinders', 'non-zero work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point charge.' },
                { id: 'b', prompt: 'Why can two equipotential surfaces never intersect each other? Explain using the definition of electric potential at a point.', answer: 'If two equipotential surfaces intersected, the intersection point would have two',
                  options: ['If two equipotential surfaces intersected, the intersection point would have two', 'they can intersect if the field is strong', 'zero potential difference along the surface'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point charge.' },
                { id: 'c', prompt: 'Figure shows equipotential surfaces spaced at 10 V intervals in a non-uniform electric field.', answer: 'E ≈ |ΔV/Δn|',
                  options: ['E ≈ |ΔV/Δn|', 'field is stronger at B', 'zero potential difference along the surface'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point charge.' }
          ],
            remediations: { 'equipotential-surfaces-are-always-spherical': { steps: ['If a student draws spherical equipotentials for a uniform field or thinks E is tangent to the surface: (1) Revisit the.', '(2) For a uniform field E = E₀î, V = -E₀x + constant → x = constant planes.', '(3) Use the work argument: W = q∫E·dl = 0 for any dl on the surface → E·dl = 0 → E ⟂ dl.', '(4) Practice sketching: parallel plates → parallel planes; dipole → curved surfaces pinching at the centre.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since no work is done in moving a charge along an equipotential surface, the electric field must be zero everywhere on that surface.".', answer: 'The statement is false',
                  options: ['The statement is false', 'no work along a path', 'zero field', 'zero potential difference along the surface'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that equipotential surfaces are always spherical, because the first example they see is a point charge.' }
          ],
            remediations: { 'equipotential-surfaces-are-always-spherical': { steps: ['If a student draws spherical equipotentials for a uniform field or thinks E is tangent to the surface: (1) Revisit the.', '(2) For a uniform field E = E₀î, V = -E₀x + constant → x = constant planes.', '(3) Use the work argument: W = q∫E·dl = 0 for any dl on the surface → E·dl = 0 → E ⟂ dl.', '(4) Practice sketching: parallel plates → parallel planes; dipole → curved surfaces pinching at the centre.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_005', difficulty: 'standard',
          question: 'The electrostatic potential energy of a system of point charges is the total.',
          hint: 'If stuck, revisit the derivation of potential due to a point charge (c12_phy_cbse_02_002).',
          misconception: 'Students often think the potential energy of a system of charges is the sum of \\(q_i V_i\\) where \\(V_i\\) is the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The electrostatic potential energy of a system of point charges is the total work done by',
                  options: ['The electrostatic potential energy of a system of point charges is the total work done by', 'The superposition principle for electric forces states that the net electrostatic force', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Electrostatic potential at a point in an electric field is the work done by an external'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the potential energy of a system of charges is the sum of \\(q_i V_i\\) where \\(V_i\\) is the potential at the location.' }
          ],
            remediations: { 'the-potential-energy-of-a': { steps: ['If a student double-counts or misses the 1/2 factor: (1) Re-derive the two-charge case from first principles: bring.', 'Note that \\(V_1\\) is potential due to \\(q_1\\) only.', '(2) Show that \\(q_1 V_2 + q_2 V_1 = 2 \\times\\) correct energy.', '(3) Practice the pair-sum method \\(\\sum_{i<j} \\frac{k q_i q_j}{r_{ij}}\\) for 3–4 charge systems until it becomes.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
