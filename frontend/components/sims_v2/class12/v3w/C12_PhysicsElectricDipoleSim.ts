import type { SimDef } from '../../engine/types';
import C12_PhysicsElectricDipoleSim from '../../../simulations/three/C12_PhysicsElectricDipoleSim';

/** v3 wrapped master — C12_PhysicsElectricDipoleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicselectricdipolesim: SimDef = {
    id: 'v3w_c12_physicselectricdipolesim',
    title: 'Electric Dipole',
    subtitle: 'This node covers: definition of electric dipole and dipole moment; derivation of electric.',
    classLevel: 12, subject: 'physics', topic: 'Electric Dipole: Field and Torque',
    chapters: [],
    nodeIds: ['c12_phy_cbse_01_011', 'c12_phy_cbse_05_001', 'c12_phy_cbse_01_004', 'c12_phy_cbse_01_012', 'c12_phy_cbse_02_006', 'c12_phy_cbse_02_004', 'c12_phy_cbse_05_002', 'c12_phy_cbse_01_005', 'c12_phy_cbse_01_006', 'c12_phy_cbse_01_007', 'c12_phy_cbse_01_009', 'c12_phy_cbse_04_009', 'c12_phy_cbse_05_003', 'c12_phy_cbse_04_001', 'c12_phy_cbse_02_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: a comb run through dry hair attracts tiny paper bits.', goal: 'Master Electric Dipole.' },
    discovery: {
        question: 'Design a simple experiment using only a bar magnet, a small compass needle, a sheet of paper, and a pencil to plot the magnetic field lines of the bar magnet.',
        options: ['**Procedure:** 1', 'sprinkle iron filings', 'compass points to geographic north'],
        answer: '**Procedure:** 1',
        hook: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a.',
    },
    teaching: [
        { title: 'An electric dipole consists of two equal and.', text: 'An electric dipole consists of two equal and opposite point charges (+q and –q) separated by a small distance 2a. Its dipole moment **p** is a vector of magnitude p = q × 2a directed from –q to +q.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_011', title: 'An electric dipole consists of two.',
          scaffold: { problem: 'A water molecule (H₂O) has a permanent dipole moment of 6.2×10⁻³⁰ C·m.',
            steps: [
            { text: 'Identify given: p = 6.2×10⁻³⁰ C·m, E = 1.0×10⁴ N/C, I = 1.9×10⁻⁴⁷ kg·m². Maximum torque occurs at θ = 90°.' },
            { text: 'Use τ_max = pE sin90° = pE. Substitute: τ_max = (6.2×10⁻³⁰)(1.0×10⁴) = 6.2×10⁻²⁶ N·m.' },
            { text: 'Relate torque to angular acceleration: τ = Iα → α_max = τ_max / I.' },
            { text: 'Compute α_max = (6.2×10⁻²⁶) / (1.9×10⁻⁴⁷) = 3.26×10²¹ rad/s².' },
            { text: 'Check units: N·m / (kg·m²) = (kg·m/s²)·m / (kg·m²) = 1/s² = rad/s².', faded: true, blankAnswer: 'τ_max = 6.2×10⁻²⁶ N·m; α_max = 3.3×10²¹ rad/s² (approx).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_001', title: 'A bar magnet is a rectangular piece of.',
          scaffold: { problem: 'A bar magnet of magnetic moment 0.40 A·m² is placed in a uniform magnetic field of 0.25 T.',
            steps: [
            { text: 'Identify given: m = 0.40 A·m², B = 0.25 T, θ_i = 0°, θ_f = 60°. Zero of U at θ = 90°.' },
            { text: 'Work done by external torque = change in potential energy = U_f – U_i. U = –mB cosθ.' },
            { text: 'U_i = –(0.40)(0.25) cos 0° = –0.10 J. U_f = –(0.40)(0.25) cos 60° = –0.10 × 0.5 = –0.050 J.' },
            { text: 'Work done = U_f – U_i = (–0.050) – (–0.10) = +0.050 J. (Positive work needed to rotate away from stable equilibrium.)' },
            { text: 'Torque at θ = 60°: τ = mB sinθ = (0.40)(0.25) sin 60° = 0.10 × (√3/2) = 0.0866 N·m.' },
            { text: 'Potential energy at θ = 60°: U = –0.050 J (already computed). Units check: A·m² × T = A·m² × N/(A·m) = N·m = J. Correct.', faded: true, blankAnswer: '(a) 0.050 J, (b) 0.0866 N·m (restoring), (c) –0.050 J' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_012', title: 'Continuous charge distribution.',
          scaffold: { problem: 'A thin glass rod of length 30 cm is rubbed with silk and acquires a uniform positive charge of 12 μC.',
            steps: [
            { text: 'Identify given quantities: L = 0.30 m, Q = 12 × 10⁻⁶ C, y = 0.10 m. Find λ = Q/L = (12 × 10⁻⁶)/(0.30) = 4.0 × 10⁻⁵ C/m.' },
            { text: 'Set up the integral. Place rod along x-axis from -L/2 to +L/2. Element at position x has charge dq = λ dx.' },
            { text: 'Integrate from x = -L/2 to +L/2. E_y = (λ y / 4πε₀) ∫_{-L/2}^{L/2} dx/(x² + y²)^(3/2).' },
            { text: 'Evaluate: E_y = (λ y / 4πε₀) [ x/(y²√(x² + y²)) ]_{-L/2}^{L/2} = (λ / 4πε₀ y) [ (L/2)/√((L/2)² + y²) - (-L/2)/√((L/2)².' },
            { text: 'Substitute values: L/2 = 0.15 m, y = 0.10 m. √(0.15² + 0.10²) = √(0.0225 + 0.01) = √0.0325 = 0.1803 m.', faded: true, blankAnswer: '6.0 × 10⁶ N/C directed perpendicularly away from the rod.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_006', title: 'The potential energy of an electric.',
          scaffold: { problem: 'An HCl molecule has a permanent dipole moment of \\(3.4 \\times 10^{-30}\\,\\text{C·m}\\).',
            steps: [
            { text: 'Identify given quantities: \\(p = 3.4 \\times 10^{-30}\\,\\text{C·m}\\), \\(E = 5 \\times 10^4\\,\\text{N/C}\\).' },
            { text: 'For (a) aligned: \\(\\theta = 0^\\circ\\), \\(\\cos 0^\\circ = 1\\). \\(U_a = -pE = -(3.4 \\times 10^{-30})(5 \\times 10^4) = -1.7.' },
            { text: 'For (b) perpendicular: \\(\\theta = 90^\\circ\\), \\(\\cos 90^\\circ = 0\\). \\(U_b = 0\\,\\text{J}\\) (by convention).' },
            { text: 'For (c) anti-parallel: \\(\\theta = 180^\\circ\\), \\(\\cos 180^\\circ = -1\\).' },
            { text: 'Work to rotate from aligned to anti-parallel = \\(\\Delta U = U_c - U_a = 1.7 \\times 10^{-25} - (-1.7 \\times 10^{-25}) =.', faded: true, blankAnswer: '(a) \\(-1.7 \\times 10^{-25}\\,\\text{J}\\); (b).' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Electric Dipole', spots: [
            { id: 's1', label: 'An electric dipole consists of', prompt: 'Which idea is this? — An electric dipole consists of two equal and opposite point charges (+q and –q) separated.', answer: 'An electric dipole consists of', options: ['An electric dipole consists of', 'A bar magnet is a', 'Electric field at a point', 'Continuous charge distribution describes a'] },
            { id: 's2', label: 'A bar magnet is a', prompt: 'Which idea is this? — A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or.', answer: 'A bar magnet is a', options: ['A bar magnet is a', 'An electric dipole consists of', 'Electric field at a point', 'Continuous charge distribution describes a'] },
            { id: 's3', label: 'Electric field at a point', prompt: 'Which idea is this? — Electric field at a point in space is defined as the electrostatic force per unit.', answer: 'Electric field at a point', options: ['Electric field at a point', 'An electric dipole consists of', 'A bar magnet is a', 'Continuous charge distribution describes a'] },
            { id: 's4', label: 'Continuous charge distribution describes a', prompt: 'Which idea is this? — Continuous charge distribution describes a macroscopic charge configuration where charge.', answer: 'Continuous charge distribution describes a', options: ['Continuous charge distribution describes a', 'An electric dipole consists of', 'A bar magnet is a', 'Electric field at a point'] },
            { id: 's5', label: 'The potential energy of an', prompt: 'Which idea is this? — The potential energy of an electric dipole in a uniform external electric field is the.', answer: 'The potential energy of an', options: ['The potential energy of an', 'An electric dipole consists of', 'A bar magnet is a', 'Electric field at a point'] },
            { id: 's6', label: 'An equipotential surface is a', prompt: 'Which idea is this? — An equipotential surface is a three-dimensional surface in an electrostatic field where.', answer: 'An equipotential surface is a', options: ['An equipotential surface is a', 'An electric dipole consists of', 'A bar magnet is a', 'Electric field at a point'] }
          ] } }
    ],
    explore: { component: C12_PhysicsElectricDipoleSim, prompt: 'Explore the interactive — Electric Dipole' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_011', difficulty: 'standard',
          question: 'An electric dipole consists of two equal and opposite point charges (+q and –q).',
          hint: 'If stuck on dipole field derivation, revisit Coulomb\'s law for a point charge.',
          misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric dipole consists of two equal and opposite point charges (+q and –q) separated',
                  options: ['An electric dipole consists of two equal and opposite point charges (+q and –q) separated', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Continuous charge distribution describes a macroscopic charge configuration where charge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the maximum torque formula.' }
          ],
            remediations: { 'the-torque-on-a-dipole': { steps: ['If a student cannot derive the 1/r³ dependence, have them revisit the superposition principle (c12_phy_cbse_01_003) and.', 'For torque direction errors, practice the right-hand rule for cross product using **τ** = **p** × **E** with physical.', 'For sign convention of **p**, explicitly memorise: **p** points from negative to positive charge.', 'Do a quick re-diagnostic: ask the student to draw the dipole, label **p**, and write the torque vector for **p** at 30°.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a charged rod, a light neutral object (e.g., a small piece of aluminium foil), and a stand to demonstrate that a neutral.', answer: 'Steps: (1) Charge a plastic rod by rubbing with wool',
                  options: ['Steps: (1) Charge a plastic rod by rubbing with wool', 'the foil gets charged by induction and then attracts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the maximum torque formula.' }
          ],
            remediations: { 'the-torque-on-a-dipole': { steps: ['If a student cannot derive the 1/r³ dependence, have them revisit the superposition principle (c12_phy_cbse_01_003) and.', 'For torque direction errors, practice the right-hand rule for cross product using **τ** = **p** × **E** with physical.', 'For sign convention of **p**, explicitly memorise: **p** points from negative to positive charge.', 'Do a quick re-diagnostic: ask the student to draw the dipole, label **p**, and write the torque vector for **p** at 30°.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_001', difficulty: 'standard',
          question: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron,.',
          hint: 'If stuck on vector products, revisit c11_phy_cbse_03_007 and c11_phy_cbse_03_008; if.',
          misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or',
                  options: ['A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'An electric dipole consists of two equal and opposite point charges (+q and –q) separated', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Continuous charge distribution describes a macroscopic charge configuration where charge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a magnetic pole.".' }
          ],
            remediations: { 'misconception-magnetic-field-lines-are': { steps: ['If the student holds the "lines of force" misconception: 1.', '**Revisit Class 10 node c10_phy_cbse_02_001** — review the definition of magnetic field lines as "visual representation.', '**Do a quick demo:** Use a cathode ray tube (or simulation) — electrons move in a circle perpendicular to B.', 'Ask: "Is the force along the field line?" No, it\'s radial.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only a bar magnet, a small compass needle, a sheet of paper, and a pencil to plot the magnetic field lines of the bar magnet.', answer: '**Procedure:** 1',
                  options: ['**Procedure:** 1', 'sprinkle iron filings', 'compass points to geographic north'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a magnetic pole.".' }
          ],
            remediations: { 'misconception-magnetic-field-lines-are': { steps: ['If the student holds the "lines of force" misconception: 1.', '**Revisit Class 10 node c10_phy_cbse_02_001** — review the definition of magnetic field lines as "visual representation.', '**Do a quick demo:** Use a cathode ray tube (or simulation) — electrons move in a circle perpendicular to B.', 'Ask: "Is the force along the field line?" No, it\'s radial.'] } } },
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_012', difficulty: 'standard',
          question: 'Continuous charge distribution describes a macroscopic charge configuration.',
          hint: 'If stuck, revisit node c12_phy_cbse_01_003 (Superposition Principle) and practice vector.',
          misconception: 'Students often write the electric field integral as E = (1/4πε₀) ∫ (dq/r²) without the unit vector r̂, treating E as a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Continuous charge distribution describes a macroscopic charge configuration where charge',
                  options: ['Continuous charge distribution describes a macroscopic charge configuration where charge', 'An electric dipole consists of two equal and opposite point charges (+q and –q) separated', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Electric field at a point in space is defined as the electrostatic force per unit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the electric field integral as E = (1/4πε₀) ∫ (dq/r²) without the unit vector r̂, treating E as a scalar.' }
          ],
            remediations: { 'students-often-write-the-electric': { steps: ['Revisit node c12_phy_cbse_01_004 (Electric Field: Definition) to reinforce that E is a vector defined as force per unit.', 'Review node c12_phy_cbse_01_003 (Superposition Principle) — practice adding two electric field vectors graphically.', 'Do a quick vector addition drill: Two charges +q at (±a, 0); find E at (0, y).', 'Show that x-components cancel, y-components add.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_006', difficulty: 'standard',
          question: 'The potential energy of an electric dipole in a uniform external electric field.',
          hint: 'If stuck, review the derivation of torque on a dipole (Class 11, Ch.',
          misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy,.',
          parts: [
                { id: 'a', prompt: 'State the formula for the potential energy of an electric dipole of dipole moment \\(\\vec{p}\\) placed in a uniform electric field \\(\\vec{E}\\).', answer: '\\(U = -\\vec{p} \\cdot \\vec{E} = -pE\\cos\\theta\\)',
                  options: ['\\(U = -\\vec{p} \\cdot \\vec{E} = -pE\\cos\\theta\\)', 'potential energy should be positive when aligned with the field', '"potential energy should be positive when aligned with the field"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy, or they think.' },
                { id: 'b', prompt: 'A dipole is placed in a uniform electric field. The torque on it is \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\).', answer: 'For a conservative torque, \\(\\tau = -\\frac{dU}{d\\theta}\\)',
                  options: ['For a conservative torque, \\(\\tau = -\\frac{dU}{d\\theta}\\)', 'potential energy should be positive when aligned with the field', '"potential energy should be positive when aligned with the field"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy, or they think.' },
                { id: 'c', prompt: 'An electric dipole of moment \\(p = 4 \\times 10^{-29}\\,\\text{C·m}\\) is placed in a uniform electric field \\(E = 2 \\times 10^5\\,\\text{N/C}\\).', answer: 'Given: \\(p = 4 \\times 10^{-29}\\,\\text{C·m}\\), \\(E = 2 \\times 10^5\\,\\text{N/C}\\),',
                  options: ['Given: \\(p = 4 \\times 10^{-29}\\,\\text{C·m}\\), \\(E = 2 \\times 10^5\\,\\text{N/C}\\),', 'potential energy should be positive when aligned with the field', '"potential energy should be positive when aligned with the field"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy, or they think.' }
          ],
            remediations: { 'students-often-write-u-pe': { steps: ['Revisit the definition of potential energy for a conservative force: \\(\\Delta U = -W_{\\text{conservative}}\\) and \\(\\tau.', 'Practice the integration: \\(\\tau = pE\\sin\\theta \\Rightarrow U = -\\int \\tau\\,d\\theta = -pE\\cos\\theta + C\\).', 'Choose \\(C\\) by setting \\(U=0\\) at \\(\\theta=\\pi/2\\) (standard convention).', 'Verify stable equilibrium at \\(\\theta=0\\) (minimum \\(U\\)).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy,.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The potential energy of a dipole in a uniform field is \\(U = pE\\cos\\theta\\).', answer: 'Errors: (1) Formula sign is wrong: correct is \\(U = -pE\\cos\\theta\\)',
                  options: ['Errors: (1) Formula sign is wrong: correct is \\(U = -pE\\cos\\theta\\)', 'potential energy should be positive when aligned with the field', '"potential energy should be positive when aligned with the field"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy, or they think.' },
                { id: 'b', prompt: 'Design a thought experiment to measure the dipole moment of an unknown polar molecule using a uniform electric field and a device that can measure the work.', answer: 'Place a sample of the polar molecules in a uniform electric field \\(E\\)',
                  options: ['Place a sample of the polar molecules in a uniform electric field \\(E\\)', 'potential energy should be positive when aligned with the field', '"potential energy should be positive when aligned with the field"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(U = +pE\\cos\\theta\\) because they confuse the torque formula \\(\\tau = pE\\sin\\theta\\) with energy, or they think.' }
          ],
            remediations: { 'students-often-write-u-pe': { steps: ['Revisit the definition of potential energy for a conservative force: \\(\\Delta U = -W_{\\text{conservative}}\\) and \\(\\tau.', 'Practice the integration: \\(\\tau = pE\\sin\\theta \\Rightarrow U = -\\int \\tau\\,d\\theta = -pE\\cos\\theta + C\\).', 'Choose \\(C\\) by setting \\(U=0\\) at \\(\\theta=\\pi/2\\) (standard convention).', 'Verify stable equilibrium at \\(\\theta=0\\) (minimum \\(U\\)).'] } } },
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
            remediations: { 'equipotential-surfaces-are-always-spherical': { steps: ['If a student draws spherical equipotentials for a uniform field or thinks E is tangent to the surface: (1) Revisit the.', '(2) For a uniform field E = E₀î, V = -E₀x + constant → x = constant planes.', '(3) Use the work argument: W = q∫E·dl = 0 for any dl on the surface → E·dl = 0 → E ⟂ dl.', '(4) Practice sketching: parallel plates → parallel planes; dipole → curved surfaces pinching at the centre.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
