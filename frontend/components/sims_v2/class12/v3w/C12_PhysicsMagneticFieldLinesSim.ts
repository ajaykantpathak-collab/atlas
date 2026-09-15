import type { SimDef } from '../../engine/types';
import C12_PhysicsMagneticFieldLinesSim from '../../../simulations/c6_12/C12_PhysicsMagneticFieldLinesSim';

/** v3 wrapped master — C12_PhysicsMagneticFieldLinesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsmagneticfieldlinessim: SimDef = {
    id: 'v3w_c12_physicsmagneticfieldlinessim',
    title: 'Magnetic Field Lines',
    subtitle: 'This node covers: (a) properties of a bar magnet (poles, dipole nature, cutting a.',
    classLevel: 12, subject: 'physics', topic: 'Bar Magnet: Properties and Magnetic Field Lines',
    chapters: [],
    nodeIds: ['c12_phy_cbse_05_001', 'c12_phy_cbse_05_003', 'c12_phy_cbse_04_006', 'c12_phy_cbse_02_004', 'c12_phy_cbse_05_002', 'c12_phy_cbse_05_004', 'c12_phy_cbse_05_005', 'c12_phy_cbse_05_006', 'c12_phy_cbse_05_007', 'c12_phy_cbse_08_001', 'c12_phy_cbse_08_002', 'c12_phy_cbse_08_004', 'c12_phy_cbse_08_005', 'c12_phy_cbse_04_001', 'c12_phy_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: take a bar magnet from the school physics lab, place it on a table, and.', goal: 'Master Magnetic Field Lines.' },
    discovery: {
        question: 'Design a simple experiment using only a bar magnet, a small compass needle, a sheet of paper, and a pencil to plot the magnetic field lines of the bar magnet.',
        options: ['**Procedure:** 1', 'sprinkle iron filings', 'compass points to geographic north'],
        answer: '**Procedure:** 1',
        hook: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a.',
    },
    teaching: [
        { title: 'A bar magnet is a rectangular piece of.', text: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or alnico) that exhibits permanent magnetic properties with two distinct poles — a north pole and a south pole —.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_003', title: 'The magnetic field due to a bar magnet.',
          scaffold: { problem: 'A short bar magnet of magnetic moment \\(0.50 \\, \\text{A·m}^2\\) is placed with its axis along the magnetic north-south direction.',
            steps: [
            { text: 'Identify given quantities: \\(m = 0.50 \\, \\text{A·m}^2\\), \\(r = 0.15 \\, \\text{m}\\).' },
            { text: 'Write formulas: \\(B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2m}{r^3}\\), \\(B_{\\text{eq}} = \\frac{\\mu_0}{4\\pi}.' },
            { text: 'Substitute values: \\(r^3 = (0.15)^3 = 0.003375 \\, \\text{m}^3\\).' },
            { text: 'Compute: \\(B_{\\text{axial}} = 10^{-7} \\times \\frac{2 \\times 0.50}{0.003375} = 10^{-7} \\times \\frac{1.0}{0.003375} =.' },
            { text: 'Direction: Axial field is along \\(\\vec{m}\\) (towards magnetic north if \\(\\vec{m}\\) points north).', faded: true, blankAnswer: '(a) \\(2.96 \\times 10^{-5} \\, \\text{T}\\) along magnetic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_006', title: 'Ampere\'s circuital law states that for.',
          scaffold: { problem: '** A long straight copper wire of radius 2.5 mm in a household wiring carries a steady current of 15 A.',
            steps: [
            { text: 'Identify given quantities: wire radius **a** = 2.5 mm = 2.5 × 10⁻³ m, total current **I** = 15 A.' },
            { text: 'Choose the formula. For a long straight wire with uniform current density, use Ampere\'s law in simplified form **B** ×.' },
            { text: 'Substitute values for (a): **Iₑₙc** = 15 × (1.0/2.5)² = 15 × 0.16 = 2.4 A.' },
            { text: 'Substitute for (b): **Iₑₙc** = 15 A. **B** = (4π×10⁻⁷ × 15) / (2π × 5.0×10⁻³) = (60π×10⁻⁷) / (10π×10⁻³) = 6.0 × 10⁻⁴ T.' },
            { text: 'Check continuity at surface **r** = **a** = 2.5 mm: **B** = μ₀**I**/(2π**a**) = (4π×10⁻⁷×15)/(2π×2.5×10⁻³) = 1.2 × 10⁻³.', faded: true, blankAnswer: '** (a) 4.8 × 10⁻⁴ T (0.48 mT) directed tangentially.' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_002', title: 'Magnetic dipole moment (𝐦) is a vector.',
          scaffold: { problem: 'A circular coil of 100 turns and radius 5 cm carries a current of 2 A.',
            steps: [
            { text: 'Identify given quantities: 𝑁 = 100, 𝑟 = 5 cm = 0.05 m, 𝐼 = 2 A, 𝐵 = 0.5 T, angle between plane and field = 30°.' },
            { text: 'Compute area 𝐴 = 𝜋𝑟² = 3.14 × (0.05)² = 3.14 × 0.0025 = 0.00785 m².' },
            { text: 'Torque magnitude 𝜏 = 𝑚𝐵 sin𝜃 = 1.57 × 0.5 × sin60° = 0.785 × (√3/2) ≈ 0.785 × 0.866 = 0.680 N·m.' },
            { text: 'Potential energy 𝑈 = −𝑚𝐵 cos𝜃 = −1.57 × 0.5 × cos60° = −0.785 × 0.5 = −0.3925 J.' },
            { text: 'Verify units: 𝑚 in A·m², 𝐵 in T = N/(A·m), so 𝑚𝐵 in N·m = J.', faded: true, blankAnswer: '(a) 1.57 A·m² (b) 0.680 N·m (c) −0.393 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_004', title: 'Earth\'s magnetic field at any location.',
          scaffold: { problem: 'At a location in India, the horizontal component of Earth\'s magnetic field is 0.36 G and the angle of dip is 60°.',
            steps: [
            { text: 'Identify given quantities with units: H_E = 0.36 G = 3.6 × 10⁻⁵ T, δ = 60°, magnetic bearing = 20° E of N, true bearing.' },
            { text: 'Select formulas: V_E = H_E tan δ; B_E = H_E / cos δ; Declination D = True bearing - Magnetic bearing (east positive).' },
            { text: 'Substitute values: V_E = 0.36 × tan 60° = 0.36 × 1.732 = 0.6235 G; B_E = 0.36 / cos 60° = 0.36 / 0.5 = 0.72 G; D = 22°.' },
            { text: 'Convert to SI: V_E = 6.235 × 10⁻⁵ T, B_E = 7.2 × 10⁻⁵ T.' },
            { text: 'Verify: tan δ = V_E/H_E = 0.6235/0.36 = 1.732 = tan 60° ✓; B_E² = H_E² + V_E² = 0.1296 + 0.3888 = 0.5184 → B_E = 0.72 G.', faded: true, blankAnswer: '(a) V_E = 0.624 G = 6.24 × 10⁻⁵ T; (b) B_E = 0.72 G = 7.2 ×.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_05_003', title: 'Identify each idea',
          dissect: { specimen: 'Magnetic Field Lines', spots: [
            { id: 's1', label: 'A bar magnet is a', prompt: 'Which idea is this? — A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or.', answer: 'A bar magnet is a', options: ['A bar magnet is a', 'The magnetic field due to', 'Amperes circuital law states that', 'An equipotential surface is a'] },
            { id: 's2', label: 'The magnetic field due to', prompt: 'Which idea is this? — The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg.', answer: 'The magnetic field due to', options: ['The magnetic field due to', 'A bar magnet is a', 'Amperes circuital law states that', 'An equipotential surface is a'] },
            { id: 's3', label: 'Amperes circuital law states that', prompt: 'Which idea is this? — Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a.', answer: 'Amperes circuital law states that', options: ['Amperes circuital law states that', 'A bar magnet is a', 'The magnetic field due to', 'An equipotential surface is a'] },
            { id: 's4', label: 'An equipotential surface is a', prompt: 'Which idea is this? — An equipotential surface is a three-dimensional surface in an electrostatic field where.', answer: 'An equipotential surface is a', options: ['An equipotential surface is a', 'A bar magnet is a', 'The magnetic field due to', 'Amperes circuital law states that'] },
            { id: 's5', label: 'Magnetic dipole moment is', prompt: 'Which idea is this? — Magnetic dipole moment (𝐦) is a vector quantity that characterizes the magnetic strength.', answer: 'Magnetic dipole moment is', options: ['Magnetic dipole moment is', 'A bar magnet is a', 'The magnetic field due to', 'Amperes circuital law states that'] },
            { id: 's6', label: 'Earths magnetic field at any', prompt: 'Which idea is this? — Earth\'s magnetic field at any location is completely described by three independent.', answer: 'Earths magnetic field at any', options: ['Earths magnetic field at any', 'A bar magnet is a', 'The magnetic field due to', 'Amperes circuital law states that'] }
          ] } }
    ],
    explore: { component: C12_PhysicsMagneticFieldLinesSim, prompt: 'Explore the interactive — Magnetic Field Lines' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_001', difficulty: 'standard',
          question: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron,.',
          hint: 'If stuck on vector products, revisit c11_phy_cbse_03_007 and c11_phy_cbse_03_008; if.',
          misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or',
                  options: ['A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg', 'Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a', 'An equipotential surface is a three-dimensional surface in an electrostatic field where'],
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_003', difficulty: 'standard',
          question: 'The magnetic field due to a bar magnet at a point far from its centre (distance.',
          hint: 'If stuck, review the magnetic dipole moment definition (c12_phy_cbse_05_002) and the.',
          misconception: 'Students often treat the bar magnet’s field as exactly like a point charge’s Coulomb field (\\(1/r^2\\)) because they see.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg',
                  options: ['The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a', 'An equipotential surface is a three-dimensional surface in an electrostatic field where'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the bar magnet’s field as exactly like a point charge’s Coulomb field (\\(1/r^2\\)) because they see “poles”.' }
          ],
            remediations: { 'students-often-treat-the-bar': { steps: ['Revisit c12_phy_cbse_05_002 (Magnetic Dipole Moment) to reinforce that a bar magnet is a dipole, not two monopoles.', 'Re-read the solenoid equivalence in c12_phy_cbse_05_001 (Bar Magnet: Properties and Magnetic Field Lines) and the.', 'Practice drawing field lines for a bar magnet and a solenoid side-by-side; note the continuous loops.', 'Solve Exercise 5.7 step-by-step, explicitly converting cm to m and tracking the factor of 2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_006', difficulty: 'standard',
          question: 'Ampere\'s circuital law states that for any closed loop (called an Amperian.',
          hint: 'If stuck, review the Biot-Savart law derivation for an infinite straight wire (node.',
          misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a',
                  options: ['Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg', 'An equipotential surface is a three-dimensional surface in an electrostatic field where'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of whether it passes through.' }
          ],
            remediations: { 'the-current-i-in-ampere': { steps: ['If the student makes the enclosed-current error: (1) Revisit the definition of **Iₑₙc** in the NCERT text (Section 4.6,.', '(2) Draw a cross-section of the wire, shade the area enclosed by the Amperian loop, and compute the fraction of total.', '(3) Practice with a diagnostic: "A wire of radius 6 mm carries 10 A uniformly.', 'Find B at r = 3 mm." The correct **Iₑₙc** = 10 × (3/6)² = 2.5 A.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of.',
          parts: [
                { id: 'a', prompt: 'In the derivation of the magnetic field inside a long solenoid using Ampere\'s law, we use a rectangular Amperian loop **abcd** where side **ab** is inside the.', answer: 'The assumption that the magnetic field **outside** the solenoid is zero is an',
                  options: ['The assumption that the magnetic field **outside** the solenoid is zero is an', 'both are exact for any solenoid', 'the internal field assumption is the approximation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of whether it passes through.' }
          ],
            remediations: { 'the-current-i-in-ampere': { steps: ['If the student makes the enclosed-current error: (1) Revisit the definition of **Iₑₙc** in the NCERT text (Section 4.6,.', '(2) Draw a cross-section of the wire, shade the area enclosed by the Amperian loop, and compute the fraction of total.', '(3) Practice with a diagnostic: "A wire of radius 6 mm carries 10 A uniformly.', 'Find B at r = 3 mm." The correct **Iₑₙc** = 10 × (3/6)² = 2.5 A.'] } } },
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_002', difficulty: 'standard',
          question: 'Magnetic dipole moment (𝐦) is a vector quantity that characterizes the.',
          hint: 'If stuck on torque/energy calculations, review c11_phy_cbse_03_007 and.',
          misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of magnetic dipole moment and write its dimensional formula.', answer: 'SI unit: A·m² (ampere meter squared) or J/T (joule per tesla)',
                  options: ['SI unit: A·m² (ampere meter squared) or J/T (joule per tesla)', 'magnetic moment is a scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' },
                { id: 'b', prompt: 'A bar magnet of magnetic moment 0.5 A·m² is placed in a uniform magnetic field of 0.2 T. The magnet’s axis makes an angle of 30° with the field.', answer: '𝜏 = 𝑚𝐵 sin𝜃 = (0.5)(0.2) sin30° = 0.1 × 0.5 = 0.05 N·m',
                  options: ['𝜏 = 𝑚𝐵 sin𝜃 = (0.5)(0.2) sin30° = 0.1 × 0.5 = 0.05 N·m', 'magnetic moment is a scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' },
                { id: 'c', prompt: 'A closely wound solenoid of 500 turns, cross-sectional area 2.0 × 10⁻⁴ m², carries a current of 1.5 A. Calculate its magnetic moment.', answer: 'Step 1: 𝑚 = 𝑁𝐼𝐴 = 500 × 1.5 × 2.0×10⁻⁴ = 0.15 A·m²',
                  options: ['Step 1: 𝑚 = 𝑁𝐼𝐴 = 500 × 1.5 × 2.0×10⁻⁴ = 0.15 A·m²', 'magnetic moment is a scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' }
          ],
            remediations: { 'magnetic-moment-is-a-scalar': { steps: ['Revisit c11_phy_cbse_03_008 (cross product) and c11_phy_cbse_03_007 (dot product) — practice computing 𝐀 × 𝐁 and.', 'Use a physical compass and a circular loop of wire with a battery; observe deflection direction vs current direction to.', 'Re-derive 𝜏 = 𝐦 × 𝐁 from force on current element 𝑑𝐅 = 𝐼 𝑑𝐥 × 𝐁 for a rectangular loop (NCERT Class 12 Section.', 'Re-attempt Diagnostic Questions 2 and 4 after 24 hours.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.',
          parts: [
                { id: 'a', prompt: 'A student writes: “The magnetic moment of a bar magnet points from its south pole to its north pole.” Evaluate this statement. Is it correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'magnetic moment is a scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' },
                { id: 'b', prompt: 'Design a simple experiment using a compass needle, a battery, and a coil of wire to demonstrate that a current loop behaves as a magnetic dipole.', answer: 'Wind insulated copper wire (~20 turns) on a cardboard tube',
                  options: ['Wind insulated copper wire (~20 turns) on a cardboard tube', 'magnetic moment is a scalar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' }
          ],
            remediations: { 'magnetic-moment-is-a-scalar': { steps: ['Revisit c11_phy_cbse_03_008 (cross product) and c11_phy_cbse_03_007 (dot product) — practice computing 𝐀 × 𝐁 and.', 'Use a physical compass and a circular loop of wire with a battery; observe deflection direction vs current direction to.', 'Re-derive 𝜏 = 𝐦 × 𝐁 from force on current element 𝑑𝐅 = 𝐼 𝑑𝐥 × 𝐁 for a rectangular loop (NCERT Class 12 Section.', 'Re-attempt Diagnostic Questions 2 and 4 after 24 hours.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_004', difficulty: 'standard',
          question: 'Earth\'s magnetic field at any location is completely described by three.',
          hint: 'Revisit Class 11 vector resolution (c11_phy_cbse_03_004) and Class 10 heights/distances.',
          misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with.',
          parts: [
                { id: 'a', prompt: 'At a certain place, the horizontal component of Earth\'s magnetic field is √3 times the vertical component. What is the angle of dip?', answer: 'Given H_E = √3 V_E',
                  options: ['Given H_E = √3 V_E', 'angle with north', 'angle of Earth\'s field'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with north" or "angle of.' }
          ],
            remediations: { 'magnetic-declination-and-angle-of': { steps: ['If student confuses D and δ: (1) Draw two diagrams: top view (horizontal plane) showing geographic N, magnetic N, and.', '(2) Use a physical compass: rotate it horizontally — the needle tracks magnetic meridian (declination); then tilt it.', '(3) Revisit Class 11 vector resolution: H_E = B_E cos δ, V_E = B_E sin δ.', '(4) Practice: Given B_E = 0.5 G, δ = 30°, find H_E, V_E.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Given δ = 45°, H_E = 0.4 G, find B_E." They write: B_E = H_E × cos 45° = 0.4 × 0.707 = 0.283 G.', answer: 'Error: Used B_E = H_E cos δ instead of B_E = H_E / cos δ',
                  options: ['Error: Used B_E = H_E cos δ instead of B_E = H_E / cos δ', 'angle with north', 'angle of Earth\'s field'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with north" or "angle of.' }
          ],
            remediations: { 'magnetic-declination-and-angle-of': { steps: ['If student confuses D and δ: (1) Draw two diagrams: top view (horizontal plane) showing geographic N, magnetic N, and.', '(2) Use a physical compass: rotate it horizontally — the needle tracks magnetic meridian (declination); then tilt it.', '(3) Revisit Class 11 vector resolution: H_E = B_E cos δ, V_E = B_E sin δ.', '(4) Practice: Given B_E = 0.5 G, δ = 30°, find H_E, V_E.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
