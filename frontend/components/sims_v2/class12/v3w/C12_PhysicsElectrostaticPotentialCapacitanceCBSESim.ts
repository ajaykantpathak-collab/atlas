import type { SimDef } from '../../engine/types';
import C12_PhysicsElectrostaticPotentialCapacitanceCBSESim from '../../../simulations/c6_12/C12_PhysicsElectrostaticPotentialCapacitanceCBSESim';

/** v3 wrapped master — C12_PhysicsElectrostaticPotentialCapacitanceCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicselectrostaticpotentialcapacitancecbsesim: SimDef = {
    id: 'v3w_c12_physicselectrostaticpotentialcapacitancecbsesim',
    title: 'Electrostatic Potential Capacitance CBSE',
    subtitle: 'Covers electrostatic properties of conductors (field inside, surface field, potential.',
    classLevel: 12, subject: 'physics', topic: 'Conductors and Insulators: Charge Distribution',
    chapters: [],
    nodeIds: ['c12_phy_cbse_02_007', 'c12_phy_cbse_02_012', 'c12_phy_cbse_02_008', 'c12_phy_cbse_02_009', 'c12_phy_cbse_02_010', 'c12_phy_cbse_02_011', 'c12_phy_cbse_02_001', 'c12_phy_cbse_02_002', 'c12_phy_cbse_02_003', 'c12_phy_cbse_02_004', 'c12_phy_cbse_02_005', 'c12_phy_cbse_02_006', 'c12_phy_cbse_02_013', 'c12_phy_cbse_05_001', 'c12_phy_cbse_05_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine touching a metal car door after sliding across the seat on a dry day — you feel a spark.', goal: 'Master Electrostatic Potential Capacitance CBSE.' },
    discovery: {
        question: 'State the value of the electrostatic electric field inside a conductor in static equilibrium and give the physical reason in one sentence.',
        options: ['The electric field inside a conductor in electrostatic equilibrium is zero', 'E is non-zero but small', 'reduce'],
        answer: 'The electric field inside a conductor in electrostatic equilibrium is zero',
        hook: '**Misconception:** "If a conductor has a cavity with no charge inside, the electric field in the cavity is zero **only.',
    },
    teaching: [
        { title: 'In electrostatic equilibrium, a.', text: 'In electrostatic equilibrium, a **conductor** is a material containing mobile charge carriers (free electrons in metals) that redistribute themselves such that the electric field inside the conductor.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_007', title: 'In electrostatic equilibrium, a.',
          scaffold: { problem: 'A solid copper sphere of radius 5.0 cm is given a charge of +2.0 μC.',
            steps: [
            { text: 'Identify given: R = 5.0 cm = 0.050 m, Q = +2.0 μC = 2.0×10⁻⁶ C, r_inside = 2.0 cm = 0.020 m < R.' },
            { text: 'Surface charge density σ = Q / (4πR²) = (2.0×10⁻⁶ C) / [4π(0.050 m)²] = 2.0×10⁻⁶ / (4π×0.0025) = 2.0×10⁻⁶ / 0.031416 ≈.' },
            { text: 'Electric field just outside surface: E = σ/ε₀ = (6.37×10⁻⁵ C/m²) / (8.85×10⁻¹² C²/N·m²) = 7.20×10⁶ N/C.' },
            { text: 'Potential of sphere (same everywhere on/in conductor): V = kQ/R = (9×10⁹ N·m²/C²)(2.0×10⁻⁶ C) / 0.050 m = 18×10³ /.' },
            { text: 'Check units: σ in C/m², ε₀ in C²/N·m² → σ/ε₀ = N/C. V = kQ/R → (N·m²/C²)(C)/m = N·m/C = J/C = V. All consistent.', faded: true, blankAnswer: '(a) 0 N/C; (b) 6.37×10⁻⁵ C/m²; (c) 7.20×10⁶ N/C radially.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_012', title: 'Energy stored in a capacitor is the.',
          scaffold: { problem: '** A parallel-plate capacitor has plates of area 0.02 m² separated by 1 mm of air. It is connected to a 12 V battery.',
            steps: [
            { text: 'Identify given quantities: A = 0.02 m², d = 1 mm = 0.001 m, V = 12 V, ε₀ = 8.85 × 10⁻¹² F/m.' },
            { text: 'Compute capacitance using parallel-plate formula \\( C = \\varepsilon_0 A/d \\).' },
            { text: 'Compute charge \\( Q = CV = 1.77 \\times 10^{-10} \\times 12 = 2.124 \\times 10^{-9} \\, \\text{C} \\).' },
            { text: 'Compute stored energy \\( U = \\frac{1}{2}CV^2 = 0.5 \\times 1.77 \\times 10^{-10} \\times 144 = 1.274 \\times 10^{-8} \\,.' },
            { text: 'Electric field \\( E = V/d = 12 / 0.001 = 12,000 \\, \\text{V/m} \\).' },
            { text: 'Verify: Volume between plates = A × d = 0.02 × 0.001 = 2 × 10⁻⁵ m³.', faded: true, blankAnswer: '** (a) 177 pF, (b) 2.12 nC, (c) 12.7 nJ, (d) 6.37 × 10⁻⁴.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_008', title: 'A dielectric is an insulating material.',
          scaffold: { problem: 'A parallel plate capacitor with plate area 100 cm² and plate separation 2.0 mm is filled with a dielectric of dielectric constant K = 5.',
            steps: [
            { text: 'Identify given quantities with units: A = 100 cm² = 100 × 10⁻⁴ m² = 0.01 m²; d = 2.0 mm = 2.0 × 10⁻³ m; K = 5; V = 12.' },
            { text: 'Identify formulas: C = Kε₀A/d; Q = CV; E = V/d (since V is fixed by battery); P = ε₀(K-1)E.' },
            { text: 'Substitute values: C = 5 × 8.85×10⁻¹² × 0.01 / (2.0×10⁻³) = 2.2125 × 10⁻¹⁰ F = 221 pF.' },
            { text: 'Q = (2.2125×10⁻¹⁰) × 12 = 2.655 × 10⁻⁹ C = 2.66 nC.' },
            { text: 'E = 12 / (2.0×10⁻³) = 6000 V/m.' },
            { text: 'P = 8.85×10⁻¹² × (5-1) × 6000 = 2.124 × 10⁻⁷ C/m².' },
            { text: 'Verify: E = 6000 V/m is reasonable (well below dielectric strength of typical dielectrics ~10⁷ V/m).', faded: true, blankAnswer: '(a) C = 221 pF, (b) Q = 2.66 nC, (c) E = 6000 V/m, (d) P =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_009', title: 'A capacitor is a system of two.',
          scaffold: { problem: 'A capacitor in a camera flash unit has a capacitance of \\(200 \\mu\\text{F}\\).',
            steps: [
            { text: 'Identify given quantities: \\(C = 200 \\mu\\text{F} = 200 \\times 10^{-6} \\text{ F}\\), \\(V = 300 \\text{ V}\\).' },
            { text: 'Use the capacitance formula \\(C = Q/V\\). Rearrange to \\(Q = C V\\).' },
            { text: 'Substitute values with units: \\(Q = (200 \\times 10^{-6} \\text{ F}) \\times (300 \\text{ V})\\).' },
            { text: 'Compute: \\(200 \\times 300 = 60,000\\). \\(60,000 \\times 10^{-6} = 6.0 \\times 10^{-2} \\text{ C}\\).' },
            { text: 'Convert to milli-coulombs: \\(6.0 \\times 10^{-2} \\text{ C} = 60 \\text{ mC}\\).', faded: true, blankAnswer: '\\(Q = 6.0 \\times 10^{-2} \\text{ C} = 60 \\text{ mC}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_010', title: 'A parallel plate capacitor consists of.',
          scaffold: { problem: 'A parallel plate capacitor in a school lab has circular plates of radius 10 cm separated by 2.0 mm of air.',
            steps: [
            { text: 'Identify given quantities: radius r = 0.10 m, so area \\( A = \\pi r^2 = \\pi \\times (0.10)^2 = 0.0314 \\, \\text{m}^2 \\).' },
            { text: 'Choose formula: \\( C = \\varepsilon_0 A / d \\) for air (K ≈ 1).' },
            { text: 'Substitute: \\( C = (8.85 \\times 10^{-12} \\times 0.0314) / 0.0020 = 1.39 \\times 10^{-10} \\, \\text{F} = 139 \\, \\text{pF}.' },
            { text: 'Charge \\( Q = C V = 1.39 \\times 10^{-10} \\times 12 = 1.67 \\times 10^{-9} \\, \\text{C} \\).' },
            { text: 'Electric field \\( E = V/d = 12 / 0.0020 = 6000 \\, \\text{V/m} \\).' },
            { text: 'Energy \\( U = \\frac{1}{2} C V^2 = 0.5 \\times 1.39 \\times 10^{-10} \\times 144 = 1.00 \\times 10^{-8} \\, \\text{J} \\).', faded: true, blankAnswer: '(a) 139 pF, (b) 1.67 nC, (c) 6000 V/m, (d) 10.0 nJ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_011', title: 'The equivalent capacitance of a.',
          scaffold: { problem: 'A household inverter uses a capacitor bank made of three capacitors: 4 μF, 6 μF, and 12 μF.',
            steps: [
            { text: 'Identify given: C₁ = 4 μF, C₂ = 6 μF (series), C₃ = 12 μF (parallel with series combo), V_total = 240 V.' },
            { text: 'Compute series equivalent of C₁ and C₂: 1/C₁₂ = 1/4 + 1/6 = (3+2)/12 = 5/12 → C₁₂ = 12/5 = 2.4 μF. Units: μF⁻¹ → μF.' },
            { text: 'Compute total equivalent capacitance: C_eq = C₁₂ + C₃ = 2.4 μF + 12 μF = 14.4 μF. Units: μF + μF = μF.' },
            { text: 'Total charge from battery: Q_total = C_eq × V = 14.4 μF × 240 V = 3456 μC. (1 μF × V = 1 μC).' },
            { text: 'Voltage across parallel branch = 240 V (same as supply). So V₃ = 240 V.' },
            { text: 'Charge on series branch = Q_total - Q₃ = 3456 - 2880 = 576 μC. This is the charge on C₁ and C₂ (series → same Q).' },
            { text: 'Voltage across C₁: V₁ = Q/C₁ = 576 μC / 4 μF = 144 V. Voltage across C₂: V₂ = Q/C₂ = 576 μC / 6 μF = 96 V.', faded: true, blankAnswer: '(a) C_eq = 14.4 μF, (b) Q₁ = Q₂ = 576 μC, Q₃ = 2880 μC, (c).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_02_012', title: 'Identify each idea',
          dissect: { specimen: 'Electrostatic Potential Capacitance CBSE', spots: [
            { id: 's1', label: 'In electrostatic equilibrium a conductor', prompt: 'Which idea is this? — In electrostatic equilibrium, a **conductor** is a material containing mobile charge.', answer: 'In electrostatic equilibrium a conductor', options: ['In electrostatic equilibrium a conductor', 'Energy stored in a capacitor', 'A dielectric is an insulating', 'A capacitor is a system'] },
            { id: 's2', label: 'Energy stored in a capacitor', prompt: 'Which idea is this? — Energy stored in a capacitor is the electrostatic potential energy accumulated when work.', answer: 'Energy stored in a capacitor', options: ['Energy stored in a capacitor', 'In electrostatic equilibrium a conductor', 'A dielectric is an insulating', 'A capacitor is a system'] },
            { id: 's3', label: 'A dielectric is an insulating', prompt: 'Which idea is this? — A dielectric is an insulating material with no free charge carriers that, when placed in.', answer: 'A dielectric is an insulating', options: ['A dielectric is an insulating', 'In electrostatic equilibrium a conductor', 'Energy stored in a capacitor', 'A capacitor is a system'] },
            { id: 's4', label: 'A capacitor is a system', prompt: 'Which idea is this? — A capacitor is a system of two conductors separated by an insulating medium (or vacuum).', answer: 'A capacitor is a system', options: ['A capacitor is a system', 'In electrostatic equilibrium a conductor', 'Energy stored in a capacitor', 'A dielectric is an insulating'] },
            { id: 's5', label: 'A parallel plate capacitor consists', prompt: 'Which idea is this? — A parallel plate capacitor consists of two large, flat, parallel conducting plates of.', answer: 'A parallel plate capacitor consists', options: ['A parallel plate capacitor consists', 'In electrostatic equilibrium a conductor', 'Energy stored in a capacitor', 'A dielectric is an insulating'] },
            { id: 's6', label: 'The equivalent capacitance of a', prompt: 'Which idea is this? — The equivalent capacitance of a combination of capacitors is the single capacitance that.', answer: 'The equivalent capacitance of a', options: ['The equivalent capacitance of a', 'In electrostatic equilibrium a conductor', 'Energy stored in a capacitor', 'A dielectric is an insulating'] }
          ] } }
    ],
    explore: { component: C12_PhysicsElectrostaticPotentialCapacitanceCBSESim, prompt: 'Explore the interactive — Electrostatic Potential Capacitance CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_007', difficulty: 'standard',
          question: 'In electrostatic equilibrium, a **conductor** is a material containing mobile.',
          hint: 'If stuck, revisit Gauss\'s law applications (Class 11 Chapter 1, not in provided nodes but.',
          misconception: '**Misconception:** "If a conductor has a cavity with no charge inside, the electric field in the cavity is zero **only.',
          parts: [
                { id: 'a', prompt: 'State the value of the electrostatic electric field inside a conductor in static equilibrium and give the physical reason in one sentence.', answer: 'The electric field inside a conductor in electrostatic equilibrium is zero',
                  options: ['The electric field inside a conductor in electrostatic equilibrium is zero', 'E is non-zero but small', 'reduce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If a conductor has a cavity with no charge inside, the electric field in the cavity is zero **only if the conductor is.' },
                { id: 'b', prompt: 'A solid conducting sphere of radius R carries a net charge +Q.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'solid conductor', 'uniform volume charge distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If a conductor has a cavity with no charge inside, the electric field in the cavity is zero **only if the conductor is.' }
          ],
            remediations: { 'misconception-if-a-conductor-has': { steps: ['If the student holds the spherical-only misconception: (1) Revisit **c12_phy_cbse_02_004** (Equipotential Surfaces) to.', '(2) Revisit **c11_phy_cbse_01_006** (Dimensional Analysis) and **c11_phy_cbse_03_007** (Scalar Product) to understand.', '(3) Perform the "Faraday cage" thought experiment: a metal box of any shape in a uniform field — free charges move to.', '(4) Re-diagnostic: Ask "Why is the field inside a **rectangular** metal box zero when placed in a uniform electric.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_012', difficulty: 'standard',
          question: 'Energy stored in a capacitor is the electrostatic potential energy accumulated.',
          hint: 'Review the integration derivation in c11_phy_cbse_05_002 and the capacitance definition.',
          misconception: 'Students often think the energy stored in a capacitor is \\( QV \\) (or \\( CV^2 \\)) because they use the formula \\( W =.',
          parts: [
                { id: 'a', prompt: 'A parallel-plate capacitor with plate area A and separation d is charged to a potential difference V and then disconnected from the battery.', answer: 'The stored energy **increases**',
                  options: ['The stored energy **increases**', 'energy stays the same', 'energy decreases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy stored in a capacitor is \\( QV \\) (or \\( CV^2 \\)) because they use the formula \\( W = QV \\) for work done.' }
          ],
            remediations: { 'the-energy-stored-in-a': { steps: ['If a student cannot derive the 1/2 factor or makes the \\( QV \\) error: 1.', 'Revisit **c11_phy_cbse_05_002** (Work Done by Variable Force) and re-derive \\( W = \\int_0^Q \\frac{q}{C}\\,dq \\) step by.', 'Draw a graph of V vs q (straight line through origin) and show that the area under the curve (work) is the area of a.', 'Perform the two-capacitor connection experiment (Diagnostic 6) and measure the energy loss; discuss where the missing.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the energy stored in a capacitor is \\( QV \\) (or \\( CV^2 \\)) because they use the formula \\( W =.',
          parts: [
                { id: 'a', prompt: 'A parallel-plate capacitor with plate area A and separation d is charged to a potential difference V and then disconnected from the battery.', answer: 'The stored energy **increases**',
                  options: ['The stored energy **increases**', 'energy stays the same', 'energy decreases', 'constant voltage or ignores the work done by the external agent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy stored in a capacitor is \\( QV \\) (or \\( CV^2 \\)) because they use the formula \\( W = QV \\) for work done.' }
          ],
            remediations: { 'the-energy-stored-in-a': { steps: ['If a student cannot derive the 1/2 factor or makes the \\( QV \\) error: 1.', 'Revisit **c11_phy_cbse_05_002** (Work Done by Variable Force) and re-derive \\( W = \\int_0^Q \\frac{q}{C}\\,dq \\) step by.', 'Draw a graph of V vs q (straight line through origin) and show that the area under the curve (work) is the area of a.', 'Perform the two-capacitor connection experiment (Diagnostic 6) and measure the energy loss; discuss where the missing.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_008', difficulty: 'standard',
          question: 'A dielectric is an insulating material with no free charge carriers that, when.',
          hint: 'If stuck, review Gauss\'s law application to a conductor (c12_phy_cbse_02_007) and the.',
          misconception: 'Students often think that the dielectric constant K is the ratio of the induced bound charge density to the free charge.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dielectric is an insulating material with no free charge carriers that, when placed in',
                  options: ['A dielectric is an insulating material with no free charge carriers that, when placed in', 'In electrostatic equilibrium, a **conductor** is a material containing mobile charge', 'Energy stored in a capacitor is the electrostatic potential energy accumulated when work', 'A capacitor is a system of two conductors separated by an insulating medium (or vacuum)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the dielectric constant K is the ratio of the induced bound charge density to the free charge density (σₚ/σ).' }
          ],
            remediations: { 'the-dielectric-constant-k-is': { steps: ['If the student cannot distinguish bound vs free charges or derive E = E₀/K: 1.', 'Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to recall free charges in conductors vs bound charges in.', 'Draw the Gaussian pillbox at the dielectric surface (NCERT Fig 2.23) and apply Gauss\'s law to D = ε₀E + P to show D =.', 'Practice Example 2.8 from NCERT (slab of thickness 3d/4) step-by-step, tracking units.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_009', difficulty: 'standard',
          question: 'A capacitor is a system of two conductors separated by an insulating medium (or.',
          hint: 'If stuck, review c12_phy_cbse_02_001 (potential difference definition) and.',
          misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\).',
          parts: [
                { id: 'a', prompt: 'A student says: "If I double the charge on a capacitor, its capacitance doubles because \\(C = Q/V\\)." Explain why this reasoning is incorrect.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'V stays the same', 'C doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\) contains those.' },
                { id: 'b', prompt: 'Two identical parallel-plate capacitors are built. Capacitor A has air between plates; Capacitor B has a dielectric with constant \\(K = 4\\) filling the space.', answer: 'Since \\(C = Q/V\\) and \\(Q\\) is the same, \\(V \\propto 1/C\\)',
                  options: ['Since \\(C = Q/V\\) and \\(Q\\) is the same, \\(V \\propto 1/C\\)', 'V_B = V_A', 'C_B = C_A'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\) contains those.' }
          ],
            remediations: { 'capacitance-c-depends-on-the': { steps: ['If the student cannot distinguish \\(C\\) from \\(Q\\) or \\(V\\): 1.', 'Revisit c12_phy_cbse_02_001 (Electrostatic Potential) to reinforce that \\(V \\propto Q\\) for a fixed geometry.', 'Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to recall that conductors are equipotential surfaces.', 'Perform a PhET simulation "Capacitor Lab: Basics" — vary voltage, observe charge, compute \\(C = Q/V\\) at each step to.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\).',
          parts: [
                { id: 'a', prompt: 'Design a simple capacitor using household materials (aluminum foil, paper, plastic wrap) that can store enough charge to light a small LED briefly when.', answer: 'A good answer: Use two sheets of aluminum foil separated by paper (dielectric)',
                  options: ['A good answer: Use two sheets of aluminum foil separated by paper (dielectric)', 'add more charge', 'use a higher voltage battery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\) contains those.' },
                { id: 'b', prompt: 'Two identical parallel-plate capacitors are built. Capacitor A has air between plates; Capacitor B has a dielectric with constant \\(K = 4\\) filling the space.', answer: 'Since \\(C = Q/V\\) and \\(Q\\) is the same, \\(V \\propto 1/C\\)',
                  options: ['Since \\(C = Q/V\\) and \\(Q\\) is the same, \\(V \\propto 1/C\\)', 'V_B = V_A', 'C_B = C_A'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe capacitance \\(C\\) depends on the charge \\(Q\\) or voltage \\(V\\) because the formula \\(C = Q/V\\) contains those.' }
          ],
            remediations: { 'capacitance-c-depends-on-the': { steps: ['If the student cannot distinguish \\(C\\) from \\(Q\\) or \\(V\\): 1.', 'Revisit c12_phy_cbse_02_001 (Electrostatic Potential) to reinforce that \\(V \\propto Q\\) for a fixed geometry.', 'Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to recall that conductors are equipotential surfaces.', 'Perform a PhET simulation "Capacitor Lab: Basics" — vary voltage, observe charge, compute \\(C = Q/V\\) at each step to.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_010', difficulty: 'standard',
          question: 'A parallel plate capacitor consists of two large, flat, parallel conducting.',
          hint: 'If stuck, review Gauss\'s law application to infinite sheet (Class 12 Chapter 1) and the.',
          misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.',
          parts: [
                { id: 'a', prompt: 'Compare the electric field, potential difference, and capacitance for two identical parallel plate capacitors: one with vacuum, one with a dielectric of.', answer: 'Both have the same potential difference V (fixed by battery)',
                  options: ['Both have the same potential difference V (fixed by battery)', 'E decreases by K', 'inserting a dielectric always increases the energy stored in a capacitor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.' }
          ],
            remediations: { 'inserting-a-dielectric-always-increases': { steps: ['If the student confuses constant-Q vs constant-V scenarios, have them revisit c12_phy_cbse_02_009 (Capacitor:.', 'Then do a guided comparison: take a charged capacitor, disconnect battery, insert dielectric, measure V drop.', 'Then recharge to same V, keep battery connected, insert dielectric, measure charge increase (via ammeter in series.', 'Explicitly track Q, V, C, E, U in a table for both cases.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.',
          parts: [
                { id: 'a', prompt: 'A student claims: "When a dielectric is inserted into a capacitor connected to a battery, the energy stored increases by a factor of K." Evaluate this.', answer: 'The statement is true only for a capacitor connected to a battery (constant V)',
                  options: ['The statement is true only for a capacitor connected to a battery (constant V)', 'energy always increases', 'inserting a dielectric always increases the energy stored in a capacitor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.' },
                { id: 'b', prompt: 'Design a simple experiment using a parallel plate capacitor (two aluminum plates), a battery, a dielectric sheet (e.g., plastic), and a high-resistance.', answer: 'Step 1: Charge the capacitor with battery to voltage V, then disconnect battery',
                  options: ['Step 1: Charge the capacitor with battery to voltage V, then disconnect battery', 'inserting a dielectric always increases the energy stored in a capacitor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.' },
                { id: 'c', prompt: 'Compare the electric field, potential difference, and capacitance for two identical parallel plate capacitors: one with vacuum, one with a dielectric of.', answer: 'Both have the same potential difference V (fixed by battery)',
                  options: ['Both have the same potential difference V (fixed by battery)', 'E decreases by K', 'inserting a dielectric always increases the energy stored in a capacitor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that inserting a dielectric always increases the energy stored in a capacitor.' }
          ],
            remediations: { 'inserting-a-dielectric-always-increases': { steps: ['If the student confuses constant-Q vs constant-V scenarios, have them revisit c12_phy_cbse_02_009 (Capacitor:.', 'Then do a guided comparison: take a charged capacitor, disconnect battery, insert dielectric, measure V drop.', 'Then recharge to same V, keep battery connected, insert dielectric, measure charge increase (via ammeter in series.', 'Explicitly track Q, V, C, E, U in a table for both cases.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_011', difficulty: 'standard',
          question: 'The equivalent capacitance of a combination of capacitors is the single.',
          hint: 'If stuck, revisit c12_phy_cbse_02_009 (Capacitor: Definition and Capacitance) and.',
          misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add.',
          parts: [
                { id: 'a', prompt: 'State the formula for equivalent capacitance of three capacitors C₁, C₂, C₃ connected in series. What is the SI unit of equivalent capacitance?', answer: '1/C_eq = 1/C₁ + 1/C₂ + 1/C₃',
                  options: ['1/C_eq = 1/C₁ + 1/C₂ + 1/C₃', 'capacitors in series add like resistors in series (C_eq = C₁ + C₂)', 'capacitors in parallel add reciprocally like resistors in parallel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add reciprocally like.' },
                { id: 'b', prompt: 'Two capacitors of 4 μF and 6 μF are connected in parallel across a 12 V battery.', answer: 'In parallel, V is same across both capacitors',
                  options: ['In parallel, V is same across both capacitors', 'charge is same in parallel', 'capacitors in series add like resistors in series (C_eq = C₁ + C₂)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add reciprocally like.' },
                { id: 'c', prompt: 'A 10 μF capacitor and a 20 μF capacitor are connected in series across a 300 V supply.', answer: 'equivalent capacitance, (',
                  options: ['equivalent capacitance, (', 'capacitors in series add like resistors in series (C_eq = C₁ + C₂)', 'capacitors in parallel add reciprocally like resistors in parallel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add reciprocally like.' }
          ],
            remediations: { 'capacitors-in-series-add-like': { steps: ['Revisit Class 10 resistor combinations (c10_phy_cbse_01_006, c10_phy_cbse_01_007) and explicitly write the analogy.', 'Derive capacitor series formula from Q = C·V and V = V₁+V₂ (same Q). Derive parallel from Q = Q₁+Q₂ (same V).', 'Solve 5 simple two-capacitor problems (3 series, 2 parallel) with numerical values, checking units at each step.', 'Take the diagnostic question 3 again — if charge on series capacitors comes out different, go back to step 2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add.',
          parts: [
                { id: 'a', prompt: 'A student solves a mixed capacitor network and gets equivalent capacitance 15 μF. The network has a 10 μF and a 20 μF capacitor.', answer: 'The student\'s reasoning is incorrect',
                  options: ['The student\'s reasoning is incorrect', 'capacitors in series add like resistors in series (C_eq = C₁ + C₂)', 'capacitors in parallel add reciprocally like resistors in parallel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "capacitors in series add like resistors in series (C_eq = C₁ + C₂)" and "capacitors in parallel add reciprocally like.' }
          ],
            remediations: { 'capacitors-in-series-add-like': { steps: ['Revisit Class 10 resistor combinations (c10_phy_cbse_01_006, c10_phy_cbse_01_007) and explicitly write the analogy.', 'Derive capacitor series formula from Q = C·V and V = V₁+V₂ (same Q). Derive parallel from Q = Q₁+Q₂ (same V).', 'Solve 5 simple two-capacitor problems (3 series, 2 parallel) with numerical values, checking units at each step.', 'Take the diagnostic question 3 again — if charge on series capacitors comes out different, go back to step 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
