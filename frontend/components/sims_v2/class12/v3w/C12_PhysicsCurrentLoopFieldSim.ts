import type { SimDef } from '../../engine/types';
import C12_PhysicsCurrentLoopFieldSim from '../../../simulations/three/C12_PhysicsCurrentLoopFieldSim';

/** v3 wrapped master — C12_PhysicsCurrentLoopFieldSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicscurrentloopfieldsim: SimDef = {
    id: 'v3w_c12_physicscurrentloopfieldsim',
    title: 'Current Loop Field',
    subtitle: 'This node covers the statement of Biot-Savart law, its vector nature, the constant µ₀,.',
    classLevel: 12, subject: 'physics', topic: 'Biot-Savart Law: Statement and Applications',
    chapters: [],
    nodeIds: ['c12_phy_cbse_04_004', 'c12_phy_cbse_04_005', 'c12_phy_cbse_04_001', 'c12_phy_cbse_04_007', 'c12_phy_cbse_04_008', 'c12_phy_cbse_04_006', 'c12_phy_cbse_04_002', 'c12_phy_cbse_04_009', 'c12_phy_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a compass needle placed near a straight wire carrying current from a battery — the needle deflects.', goal: 'Master Current Loop Field.' },
    discovery: {
        question: 'State the formula for the magnetic force on a charge \\(q\\) moving with velocity \\(\\vec{v}\\) in a magnetic field \\(\\vec{B}\\). What is its SI unit?',
        options: ['**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
        answer: '**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)',
        hook: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle".',
    },
    teaching: [
        { title: 'The Biot-Savart law gives the magnetic field.', text: 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal current element I dl.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_004', title: 'The Biot-Savart law gives the magnetic.',
          scaffold: { problem: 'A wire carrying a current of 8.0 A is bent into a quarter-circle arc of radius 10 cm.',
            steps: [
            { text: 'Identify contributions. The two straight sections are along radial lines through O, so for each element dl, the vector.' },
            { text: 'For the arc, every element dl is perpendicular to r (radius), so sinθ = 1.' },
            { text: 'Integrate dl over the arc length. Arc length = (1/4) × 2πR = πR/2.' },
            { text: 'B = (µ₀/4π) I (πR/2) / R² = (µ₀ I) / (8 R).' },
            { text: 'Substitute values: µ₀ = 4π × 10⁻⁷, I = 8.0 A, R = 0.10 m. B = (4π × 10⁻⁷ × 8.0) / (8 × 0.10) = (4π × 10⁻⁷) / 0.10 = 4π.', faded: true, blankAnswer: '1.26 × 10⁻⁵ T into the plane of the arc.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_005', title: 'The magnetic field on the axis of a.',
          scaffold: { problem: 'A circular coil of 200 turns and mean radius 15 cm is connected to a 12 V battery. The total resistance of the circuit is 6.0 Ω.',
            steps: [
            { text: 'Identify given quantities: \\( N = 200 \\), \\( R = 0.15 \\, \\text{m} \\), \\( V = 12 \\, \\text{V} \\), \\( R_{\\text{circuit}} =.' },
            { text: 'Find current using Ohm’s law: \\( I = V/R = 12/6.0 = 2.0 \\, \\text{A} \\).' },
            { text: 'Use centre field formula: \\( B = \\frac{\\mu_0 N I}{2R} \\). \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\).' },
            { text: 'Substitute: \\( B = \\frac{(4\\pi \\times 10^{-7}) \\times 200 \\times 2.0}{2 \\times 0.15} = \\frac{4\\pi \\times 10^{-7} \\times.' },
            { text: 'Check units: \\( \\frac{\\text{T·m/A} \\times \\text{A}}{\\text{m}} = \\text{T} \\).', faded: true, blankAnswer: '\\( 1.68 \\times 10^{-3} \\, \\text{T} \\) (or 1.68 mT) directed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_001', title: 'The Lorentz force is the total.',
          scaffold: { problem: '** In a cathode-ray tube (like an old TV picture tube), an electron moves horizontally from south to north with a speed of \\(3.0 \\times.',
            steps: [
            { text: 'Identify given quantities with units. \\(q = -1.6 \\times 10^{-19} \\, \\text{C}\\), \\(v = 3.0 \\times 10^7 \\, \\text{m/s}\\).' },
            { text: 'Choose formula. Magnitude: \\(F = |q| v B \\sin\\theta\\). Direction: right-hand rule for \\(\\vec{v} \\times \\vec{B}\\), then.' },
            { text: 'Substitute values. \\(F = (1.6 \\times 10^{-19}) \\times (3.0 \\times 10^7) \\times 0.02 \\times \\sin 90^\\circ\\).' },
            { text: 'Compute with unit tracking. \\(\\sin 90^\\circ = 1\\). \\(F = 1.6 \\times 10^{-19} \\times 3.0 \\times 10^7 \\times 0.02 = 1.6.' },
            { text: 'Verify reasonableness. Force is tiny (\\(\\sim 10^{-13} \\, \\text{N}\\)), typical for single electron.', faded: true, blankAnswer: '** Magnitude \\(9.6 \\times 10^{-14} \\, \\text{N}\\), direction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_007', title: 'The magnetic field inside a long.',
          scaffold: { problem: 'A solenoid used in a school physics lab is 50 cm long, has a radius of 1.5 cm, and is wound with 5 layers of 200 turns each.',
            steps: [
            { text: 'Identify given quantities with units. \\( l = 0.50 \\, \\text{m} \\), radius = 0.015 m (not needed for B inside), layers =.' },
            { text: 'Compute turn density \\( n = N/l = 1000 / 0.50 = 2000 \\, \\text{m}^{-1} \\).' },
            { text: 'Apply solenoid formula \\( B = \\mu_0 n I = (4\\pi \\times 10^{-7}) \\times 2000 \\times 4.0 = 32\\pi \\times 10^{-4} \\,.' },
            { text: 'Check approximation: \\( l / \\text{diameter} = 0.50 / 0.03 \\approx 16.7 \\).' },
            { text: 'For toroid, use \\( B = \\frac{\\mu_0 N I}{2\\pi r} = \\frac{(4\\pi \\times 10^{-7}) \\times 1000 \\times 4.0}{2\\pi \\times 0.10}.' },
            { text: 'Verify units: \\( \\mu_0 \\) (T·m/A) × \\( n \\) (m\\(^{-1}\\)) × \\( I \\) (A) = T.', faded: true, blankAnswer: '(a) \\( 1.0 \\times 10^{-2} \\, \\text{T} \\) (or \\( 10.0 \\,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_04_008', title: 'The force between two parallel.',
          scaffold: { problem: 'Two overhead power lines run parallel to each other along a street, separated by 40 cm.',
            steps: [
            { text: 'Identify given quantities: \\(I_1 = 250\\,\\text{A}\\), \\(I_2 = 180\\,\\text{A}\\), \\(d = 40\\,\\text{cm} = 0.40\\,\\text{m}\\).' },
            { text: 'Write the formula for force per unit length: \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\).' },
            { text: 'Substitute values: \\(f = \\frac{(4\\pi \\times 10^{-7}) \\times 250 \\times 180}{2\\pi \\times 0.40}\\).' },
            { text: 'Simplify: Cancel \\(\\pi\\): \\(\\frac{4 \\times 10^{-7} \\times 250 \\times 180}{2 \\times 0.40} = \\frac{4 \\times 10^{-7}.' },
            { text: 'Since currents are parallel, the force is attractive. The magnitude \\(0.0225\\,\\text{N/m}\\) is small but measurable; for.', faded: true, blankAnswer: '\\(2.25 \\times 10^{-2}\\,\\text{N/m}\\) attractive.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_04_005', title: 'Identify each idea',
          dissect: { specimen: 'Current Loop Field', spots: [
            { id: 's1', label: 'The Biot-Savart law gives the', prompt: 'Which idea is this? — The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal.', answer: 'The Biot-Savart law gives the', options: ['The Biot-Savart law gives the', 'The magnetic field on the', 'The Lorentz force is the', 'The magnetic field inside a'] },
            { id: 's2', label: 'The magnetic field on the', prompt: 'Which idea is this? — The magnetic field on the axis of a circular current loop is the vector sum of.', answer: 'The magnetic field on the', options: ['The magnetic field on the', 'The Biot-Savart law gives the', 'The Lorentz force is the', 'The magnetic field inside a'] },
            { id: 's3', label: 'The Lorentz force is the', prompt: 'Which idea is this? — The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving.', answer: 'The Lorentz force is the', options: ['The Lorentz force is the', 'The Biot-Savart law gives the', 'The magnetic field on the', 'The magnetic field inside a'] },
            { id: 's4', label: 'The magnetic field inside a', prompt: 'Which idea is this? — The magnetic field inside a long solenoid is uniform, directed along its axis, and has.', answer: 'The magnetic field inside a', options: ['The magnetic field inside a', 'The Biot-Savart law gives the', 'The magnetic field on the', 'The Lorentz force is the'] },
            { id: 's5', label: 'The force between two parallel', prompt: 'Which idea is this? — The force between two parallel current-carrying conductors is the magnetic force per unit.', answer: 'The force between two parallel', options: ['The force between two parallel', 'The Biot-Savart law gives the', 'The magnetic field on the', 'The Lorentz force is the'] },
            { id: 's6', label: 'Amperes circuital law states that', prompt: 'Which idea is this? — Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a.', answer: 'Amperes circuital law states that', options: ['Amperes circuital law states that', 'The Biot-Savart law gives the', 'The magnetic field on the', 'The Lorentz force is the'] }
          ] } }
    ],
    explore: { component: C12_PhysicsCurrentLoopFieldSim, prompt: 'Explore the interactive — Current Loop Field' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_004', difficulty: 'standard',
          question: 'The Biot-Savart law gives the magnetic field dB produced at a point P by an.',
          hint: 'Review cross product (c11_phy_cbse_03_008) and integration of variable forces.',
          misconception: 'Students often think the Biot-Savart law gives the total magnetic field of a wire directly, forgetting that it only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal',
                  options: ['The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal', 'The magnetic field on the axis of a circular current loop is the vector sum of', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic field inside a long solenoid is uniform, directed along its axis, and has'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Biot-Savart law gives the total magnetic field of a wire directly, forgetting that it only gives the contribution.' }
          ],
            remediations: { 'the-biot-savart-law-gives': { steps: ['Revisit the cross product rule: practice finding direction of A × B for various vector pairs using the right-hand screw.', 'Review the concept of superposition and integration for continuous distributions (c11_phy_cbse_05_002).', 'Work through the derivation of B on the axis of a circular loop step by step, explicitly showing how perpendicular.', 'Re-attempt Diagnostic Questions 2 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_005', difficulty: 'standard',
          question: 'The magnetic field on the axis of a circular current loop is the vector sum of.',
          hint: 'If stuck, revisit the Biot–Savart law derivation for a straight wire.',
          misconception: 'Students often apply the right‑hand thumb rule for a straight wire (thumb along current, fingers curl around wire) to a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The magnetic field on the axis of a circular current loop is the vector sum of',
                  options: ['The magnetic field on the axis of a circular current loop is the vector sum of', 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving', 'The magnetic field inside a long solenoid is uniform, directed along its axis, and has'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the right‑hand thumb rule for a straight wire (thumb along current, fingers curl around wire) to a circular loop,.' }
          ],
            remediations: { 'students-often-apply-the-right': { steps: ['Re‑watch the right‑hand thumb rule demonstration for a circular loop (Class 10 video or teacher demo).', 'Practice the rule with a physical loop: hold a circular wire, point fingers along current, observe thumb direction.', 'Re‑derive the axial field from Biot–Savart law step‑by‑step (node c12_phy_cbse_04_004) focusing on the cross product \\(.', 'Solve three numerical problems: one at centre, one on axis, one with multiple turns, checking units at each step.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_001', difficulty: 'standard',
          question: 'The Lorentz force is the total electromagnetic force experienced by a charge.',
          hint: 'If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by.',
          misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle".',
          parts: [
                { id: 'a', prompt: 'State the formula for the magnetic force on a charge \\(q\\) moving with velocity \\(\\vec{v}\\) in a magnetic field \\(\\vec{B}\\). What is its SI unit?', answer: '**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)',
                  options: ['**Correct answer:** \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' },
                { id: 'b', prompt: 'A proton (\\(q = +1.6 \\times 10^{-19} \\, \\text{C}\\)) moves with speed \\(5 \\times 10^5 \\, \\text{m/s}\\) at an angle of \\(30^\\circ\\) to a uniform magnetic field of.', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' },
                { id: 'c', prompt: 'Compare the magnetic force on a proton and an electron moving with the **same velocity** in the **same magnetic field**.', answer: '**Correct answer:** Magnitudes are equal: \\(|q|\\) is same (\\(e\\)), \\(v\\), \\(B\\),',
                  options: ['**Correct answer:** Magnitudes are equal: \\(|q|\\) is same (\\(e\\)), \\(v\\), \\(B\\),', 'magnetic force can increase or decrease the speed of a charged particle', 'aligned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-step remediation:** 1.', '**Revisit vector cross product** (c11_phy_cbse_03_008): Practice \\(\\vec{a} \\times \\vec{b}\\) with simple vectors (e.g.,.', 'Use the right-hand rule physically: fingers from first vector to second, thumb gives direction.', '**Drill the sign rule**: For 5 different \\((\\vec{v}, \\vec{B})\\) pairs, compute \\(\\vec{v} \\times \\vec{B}\\) direction,.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle".',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a charged particle moves parallel to a uniform magnetic field, it experiences the maximum magnetic force because the field lines are.', answer: '**Correct answer:** The statement is **false**',
                  options: ['**Correct answer:** The statement is **false**', 'parallel', 'perpendicular', 'magnetic force can increase or decrease the speed of a charged particle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-step remediation:** 1.', '**Revisit vector cross product** (c11_phy_cbse_03_008): Practice \\(\\vec{a} \\times \\vec{b}\\) with simple vectors (e.g.,.', 'Use the right-hand rule physically: fingers from first vector to second, thumb gives direction.', '**Drill the sign rule**: For 5 different \\((\\vec{v}, \\vec{B})\\) pairs, compute \\(\\vec{v} \\times \\vec{B}\\) direction,.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_007', difficulty: 'standard',
          question: 'The magnetic field inside a long solenoid is uniform, directed along its axis,.',
          hint: 'Revisit c12_phy_cbse_04_006 (Ampere\'s Circuital Law) – focus on Example 4.7 (field.',
          misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so.',
          parts: [
                { id: 'a', prompt: 'State the formula for the magnetic field inside a long solenoid and give the SI unit of each quantity.', answer: '\\( B = \\mu_0 n I \\), where \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\)',
                  options: ['\\( B = \\mu_0 n I \\), where \\( \\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T·m/A} \\)', 'the toroid is a closed loop with no ends, so no magnetic poles, hence no field'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so no magnetic poles,.' }
          ],
            remediations: { 'the-magnetic-field-inside-a': { steps: ['If the student holds this misconception: (1) Revisit Ampere\'s law (c12_phy_cbse_04_006) – draw three Amperian loops for.', '(2) For each, compute \\( I_{\\text{enc}} \\): cavity = 0, windings = \\( N I \\), outside = 0.', '(3) Apply \\( \\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enc}} \\) to get \\( B \\) in each region.', '(4) Re-do Diagnostic Question 5.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The magnetic field inside a toroid is uniform, just like in a long solenoid." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the toroid is a closed loop with no ends, so no magnetic poles, hence no field'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so no magnetic poles,.' }
          ],
            remediations: { 'the-magnetic-field-inside-a': { steps: ['If the student holds this misconception: (1) Revisit Ampere\'s law (c12_phy_cbse_04_006) – draw three Amperian loops for.', '(2) For each, compute \\( I_{\\text{enc}} \\): cavity = 0, windings = \\( N I \\), outside = 0.', '(3) Apply \\( \\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enc}} \\) to get \\( B \\) in each region.', '(4) Re-do Diagnostic Question 5.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_008', difficulty: 'standard',
          question: 'The force between two parallel current-carrying conductors is the magnetic.',
          hint: 'If stuck, revisit c12_phy_cbse_04_006 (Ampere\'s circuital law) to review the derivation.',
          misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between.',
          parts: [
                { id: 'a', prompt: 'State the formula for the force per unit length between two long parallel current-carrying conductors in vacuum.', answer: 'The force per unit length is \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\)',
                  options: ['The force per unit length is \\(f = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\)', 'like charges repel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' },
                { id: 'b', prompt: 'Two parallel wires carry currents in the same direction. Using the right-hand rule for magnetic field and the Lorentz force, explain why the force between them.', answer: 'Wire 1 produces a magnetic field \\(\\vec{B}_1\\) that circles around it',
                  options: ['Wire 1 produces a magnetic field \\(\\vec{B}_1\\) that circles around it', 'like charges repel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' },
                { id: 'c', prompt: 'Two long parallel wires are separated by 5.0 cm. Wire A carries 12 A upward, wire B carries 8.0 A downward.', answer: 'Given: \\(I_1 = 12\\,\\text{A}\\), \\(I_2 = 8.0\\,\\text{A}\\), \\(d = 0.050\\,\\text{m}\\)',
                  options: ['Given: \\(I_1 = 12\\,\\text{A}\\), \\(I_2 = 8.0\\,\\text{A}\\), \\(d = 0.050\\,\\text{m}\\)', 'like charges repel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the force between parallel currents follows an inverse-square law like Coulomb\'s force between charges, writing \\(f.' }
          ],
            remediations: { 'the-force-between-parallel-currents': { steps: ['If a student exhibits the \\(1/d^2\\) misconception, have them re-derive the force step by step: (1) Write the magnetic.', '(2) Write the force on a length \\(L\\) of wire 2: \\(F = I_2 L B_1 \\sin 90^\\circ\\).', '(3) Substitute \\(B_1\\) and simplify to \\(F = \\frac{\\mu_0 I_1 I_2 L}{2\\pi d}\\).', '(4) Divide by \\(L\\) to get \\(f\\).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_04_006', difficulty: 'standard',
          question: 'Ampere\'s circuital law states that for any closed loop (called an Amperian.',
          hint: 'If stuck, review the Biot-Savart law derivation for an infinite straight wire (node.',
          misconception: 'Students often think that the current **I** in Ampere\'s law is the *total* current in the circuit, regardless of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a',
                  options: ['Ampere\'s circuital law states that for any closed loop (called an Amperian loop) in a', 'The Biot-Savart law gives the magnetic field dB produced at a point P by an infinitesimal', 'The magnetic field on the axis of a circular current loop is the vector sum of', 'The Lorentz force is the total electromagnetic force experienced by a charge \\(q\\) moving'],
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
            remediations: { 'the-current-i-in-ampere': { steps: ['If the student makes the enclosed-current error: (1) Revisit the definition of **Iₑₙc** in the NCERT text (Section 4.6,.', '(2) Draw a cross-section of the wire, shade the area enclosed by the Amperian loop, and compute the fraction of total.', '(3) Practice with a diagnostic: "A wire of radius 6 mm carries 10 A uniformly.', 'Find B at r = 3 mm." The correct **Iₑₙc** = 10 × (3/6)² = 2.5 A.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
