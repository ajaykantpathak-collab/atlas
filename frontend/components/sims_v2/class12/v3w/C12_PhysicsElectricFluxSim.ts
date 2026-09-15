import type { SimDef } from '../../engine/types';
import C12_PhysicsElectricFluxSim from '../../../simulations/c6_12/C12_PhysicsElectricFluxSim';

/** v3 wrapped master — C12_PhysicsElectricFluxSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicselectricfluxsim: SimDef = {
    id: 'v3w_c12_physicselectricfluxsim',
    title: 'Electric Flux',
    subtitle: 'This node covers the definition of electric field, its calculation for a point charge,.',
    classLevel: 12, subject: 'physics', topic: 'Electric Field: Definition and Calculation',
    chapters: [],
    nodeIds: ['c12_phy_cbse_01_004', 'c12_phy_cbse_01_006', 'c12_phy_cbse_01_007', 'c12_phy_cbse_01_008', 'c12_phy_cbse_01_009', 'c12_phy_cbse_01_010', 'c12_phy_cbse_08_001', 'c12_phy_cbse_06_005', 'c12_phy_cbse_07_009', 'c12_phy_cbse_11_003', 'c12_phy_cbse_06_001', 'c12_phy_cbse_06_002', 'c12_phy_cbse_06_003', 'c12_phy_cbse_06_007', 'c12_phy_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you rub a plastic ruler against your dry hair and hold it near tiny bits of paper — the paper jumps.', goal: 'Master Electric Flux.' },
    discovery: {
        question: 'What is the SI unit of electric field, and how is it derived from the definition \\(\\vec{E} = \\vec{F}/q\\)?',
        options: ['The SI unit is newton per coulomb (N/C)', 'without realizing it is equivalent', 'which inverts the definition'],
        answer: 'The SI unit is newton per coulomb (N/C)',
        hook: 'Students often think the electric field at a point depends on the test charge used to measure it, writing \\(E = F/q\\).',
    },
    teaching: [
        { title: 'Electric field at a point in space is.', text: 'Electric field at a point in space is defined as the electrostatic force per unit positive test charge placed at that point, without disturbing the source charge distribution.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_006', title: 'Electric field lines are imaginary.',
          scaffold: { problem: 'Draw the electric field line pattern for an isolated positive point charge +Q.',
            steps: [
            { text: 'Place the point charge +Q at the center of the paper. By definition, field lines start on positive charges.' },
            { text: 'To show direction: At any point P, the tangent to the radial line is exactly along the radial direction.' },
            { text: 'To show 1/r² decrease: Consider two concentric circles of radii r and 2r.' },
            { text: 'To show constant total lines: Any sphere centered on +Q is crossed by exactly the same 8 lines (in this drawing).' },
            { text: 'Verify: The pattern is radially symmetric, arrows point outward, spacing increases with distance.', faded: true, blankAnswer: 'Radial lines outward with arrowheads; density decreases as.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_007', title: 'Electric flux is a scalar measure of.',
          scaffold: { problem: 'A uniform electric field \\(\\mathbf{E} = 400\\,\\text{N/C}\\) is directed at \\(30^\\circ\\) to the horizontal.',
            steps: [
            { text: 'Identify given quantities: \\(E = 400\\,\\text{N/C}\\), area \\(A = 0.20 \\times 0.30 = 0.060\\,\\text{m}^2\\), \\(\\theta =.' },
            { text: 'Formula: \\(\\phi = EA\\cos\\theta\\).' },
            { text: 'Substitute: \\(\\phi = 400 \\times 0.060 \\times \\cos30^\\circ\\).' },
            { text: 'Compute: \\(\\cos30^\\circ = \\sqrt{3}/2 \\approx 0.866\\); \\(\\phi = 24 \\times 0.866 = 20.784\\).' },
            { text: 'Verify: Maximum possible flux is \\(EA = 24\\); at \\(30^\\circ\\) we expect a positive value less than 24.', faded: true, blankAnswer: '\\(20.8\\,\\text{N·m}^2/\\text{C}\\) (or \\(20.8\\,\\text{V·m}\\))' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_008', title: 'Gauss\'s Law states that the total.',
          scaffold: { problem: 'A point charge of 5.0 μC is placed at the center of a spherical Gaussian surface of radius 15 cm.',
            steps: [
            { text: 'Identify given: q = 5.0 μC = 5.0 × 10⁻⁶ C, r = 15 cm = 0.15 m (not needed for flux). Target: Φ_total.' },
            { text: 'Apply Gauss\'s Law: Φ = q_enclosed / ε₀. Note: q_enclosed = 5.0 × 10⁻⁶ C regardless of position inside.' },
            { text: 'Substitute: Φ = (5.0 × 10⁻⁶ C) / (8.85 × 10⁻¹² C²/N·m²).' },
            { text: 'Compute: Φ = 5.65 × 10⁵ N·m²/C. (Unit check: C / (C²/N·m²) = N·m²/C ✓)' },
            { text: 'When charge moves off-center, q_enclosed unchanged → Φ unchanged = 5.65 × 10⁵ N·m²/C.', faded: true, blankAnswer: 'Φ = 5.65 × 10⁵ N·m²/C in both cases.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_009', title: 'The electric field due to an infinitely.',
          scaffold: { problem: 'An infinitely long straight wire has a uniform linear charge density of 5.0 × 10⁻⁶ C/m.',
            steps: [
            { text: 'Identify given quantities: λ = 5.0 × 10⁻⁶ C/m, r = 0.10 m, ε₀ = 8.85 × 10⁻¹² C²/N·m². Find E.' },
            { text: 'Write the formula for infinite wire: E = λ/(2πε₀r). Check units: λ/(ε₀r) → (C/m) / (C²/N·m² × m) = N/C. Correct.' },
            { text: 'Substitute values: E = (5.0 × 10⁻⁶) / (2π × 8.85 × 10⁻¹² × 0.10)' },
            { text: 'Compute denominator: 2π × 8.85 × 10⁻¹² × 0.10 = 5.56 × 10⁻¹². Then E = 5.0 × 10⁻⁶ / 5.56 × 10⁻¹² = 8.99 × 10⁵ N/C.' },
            { text: 'Direction is radially outward (λ > 0). Answer is physically reasonable (field ~10⁶ N/C at 10 cm for μC/m charge.', faded: true, blankAnswer: 'E = 9.0 × 10⁵ N/C radially outward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_010', title: 'The electric field due to an infinitely.',
          scaffold: { problem: 'A large non-conducting plastic sheet of dimensions 2 m × 2 m is uniformly charged with a total charge of 8.0 μC.',
            steps: [
            { text: 'Identify given quantities. Total charge Q = 8.0 μC = 8.0 × 10⁻⁶ C. Sheet area A = 2 m × 2 m = 4 m².' },
            { text: 'Compute surface charge density σ = Q/A = (8.0 × 10⁻⁶ C) / (4 m²) = 2.0 × 10⁻⁶ C/m².' },
            { text: 'Apply infinite sheet formula E = σ/(2ε₀) = (2.0 × 10⁻⁶) / (2 × 8.85 × 10⁻¹²) = 1.13 × 10⁵ N/C.' },
            { text: 'Force on electron F = eE = (1.6 × 10⁻¹⁹)(1.13 × 10⁵) = 1.81 × 10⁻¹⁴ N.' },
            { text: 'Acceleration a = F/m_e = (1.81 × 10⁻¹⁴) / (9.11 × 10⁻³¹) = 1.99 × 10¹⁶ m/s² toward the sheet.' },
            { text: 'Verify reasonableness: Field is uniform, so distance 5 cm does not appear in answer.', faded: true, blankAnswer: 'E = 1.13 × 10⁵ N/C away from sheet; electron acceleration =.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_01_006', title: 'Identify each idea',
          dissect: { specimen: 'Electric Flux', spots: [
            { id: 's1', label: 'Electric field at a point', prompt: 'Which idea is this? — Electric field at a point in space is defined as the electrostatic force per unit.', answer: 'Electric field at a point', options: ['Electric field at a point', 'Electric field lines are imaginary', 'Electric flux is a scalar', 'Gausss Law states that the'] },
            { id: 's2', label: 'Electric field lines are imaginary', prompt: 'Which idea is this? — Electric field lines are imaginary curves drawn in an electric field such that the.', answer: 'Electric field lines are imaginary', options: ['Electric field lines are imaginary', 'Electric field at a point', 'Electric flux is a scalar', 'Gausss Law states that the'] },
            { id: 's3', label: 'Electric flux is a scalar', prompt: 'Which idea is this? — Electric flux is a scalar measure of the number of electric field lines penetrating a.', answer: 'Electric flux is a scalar', options: ['Electric flux is a scalar', 'Electric field at a point', 'Electric field lines are imaginary', 'Gausss Law states that the'] },
            { id: 's4', label: 'Gausss Law states that the', prompt: 'Which idea is this? — Gauss\'s Law states that the total electric flux through any closed surface (Gaussian.', answer: 'Gausss Law states that the', options: ['Gausss Law states that the', 'Electric field at a point', 'Electric field lines are imaginary', 'Electric flux is a scalar'] },
            { id: 's5', label: 'The electric field due to', prompt: 'Which idea is this? — The electric field due to an infinitely long straight wire with uniform linear charge.', answer: 'The electric field due to', options: ['The electric field due to', 'Electric field at a point', 'Electric field lines are imaginary', 'Electric flux is a scalar'] }
          ] } }
    ],
    explore: { component: C12_PhysicsElectricFluxSim, prompt: 'Explore the interactive — Electric Flux' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_006', difficulty: 'standard',
          question: 'Electric field lines are imaginary curves drawn in an electric field such that.',
          hint: 'If stuck, revisit node c12_phy_cbse_01_004 (Electric Field: Definition and Calculation).',
          misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a.',
          parts: [
                { id: 'a', prompt: 'Why can two electric field lines never cross each other? Explain using the definition of electric field at a point.', answer: 'If two field lines crossed, the tangent at the intersection point would have two',
                  options: ['If two field lines crossed, the tangent at the intersection point would have two', 'they repel each other', 'it\'s just a drawing rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' },
                { id: 'b', prompt: 'A student draws electric field lines for a single positive point charge. They draw 8 lines radiating outward.', answer: 'At distance *r*, arc length = *rθ* (for a given angular spread θ)',
                  options: ['At distance *r*, arc length = *rθ* (for a given angular spread θ)', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' },
                { id: 'c', prompt: 'Consider the electric field lines for an electric dipole (+q and -q separated by distance *2a*).', answer: 'For a point charge, field lines spread radially in 3D',
                  options: ['For a point charge, field lines spread radially in 3D', 'dipole field also falls as 1/*r²*', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' }
          ],
            remediations: { 'electric-field-lines-are-physical': { steps: ['If the student holds the "physical lines" misconception: (1) Have them draw field lines for a +2 μC charge using 8.', 'Ask: "Did the field change?', 'So the absolute number is not physical." (2) Use a PhET simulation "Charges and Fields" — place a +1 nC charge, observe.', 'The field vectors don\'t change; only the drawing changes.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a.',
          parts: [
                { id: 'a', prompt: 'A diagram shows uniform, parallel, equally spaced electric field lines pointing to the right.', answer: 'Partially correct',
                  options: ['Partially correct', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' },
                { id: 'b', prompt: 'Design a simple classroom activity using only a glass plate, castor oil, grass seeds (or semolina), and two metal electrodes connected to a high-voltage DC.', answer: 'Procedure: Place the glass plate on an insulating support',
                  options: ['Procedure: Place the glass plate on an insulating support', 'a 1 C charge has exactly 6×10¹⁸ lines'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe electric field lines are *physical* entities that "flow" from positive to negative like water in a pipe, and that the.' }
          ],
            remediations: { 'electric-field-lines-are-physical': { steps: ['If the student holds the "physical lines" misconception: (1) Have them draw field lines for a +2 μC charge using 8.', 'Ask: "Did the field change?', 'So the absolute number is not physical." (2) Use a PhET simulation "Charges and Fields" — place a +1 nC charge, observe.', 'The field vectors don\'t change; only the drawing changes.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_007', difficulty: 'standard',
          question: 'Electric flux is a scalar measure of the number of electric field lines.',
          hint: 'If stuck, revisit the scalar product of vectors (c11_math_cbse_10_007) and the concept of.',
          misconception: 'Students frequently treat electric flux as a vector because the definition involves the area vector.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electric flux is a scalar measure of the number of electric field lines penetrating a',
                  options: ['Electric flux is a scalar measure of the number of electric field lines penetrating a', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Electric field lines are imaginary curves drawn in an electric field such that the', 'Gauss\'s Law states that the total electric flux through any closed surface (Gaussian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently treat electric flux as a vector because the definition involves the area vector.' }
          ],
            remediations: { 'students-frequently-treat-electric-flux': { steps: ['If a student thinks flux is a vector, revisit the dot product (c11_math_cbse_10_007 or c11_phy_cbse_03_007) and.', 'If they use the wrong angle, draw a diagram showing the area vector perpendicular to the surface and the field vector;.', 'Practice calculating flux for a square loop at \\(\\theta = 0^\\circ, 60^\\circ, 90^\\circ, 180^\\circ\\) to reinforce.', 'If they assume closed-surface flux is always zero, remind them of Gauss\'s law preview: \\(\\phi_{\\text{net}} =.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_008', difficulty: 'standard',
          question: 'Gauss\'s Law states that the total electric flux through any closed surface.',
          hint: 'If stuck on flux integral, revisit c12_phy_cbse_01_007 (Electric Flux) for Φ =.',
          misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian.',
          parts: [
                { id: 'a', prompt: 'A point charge +q is placed at the center of a cube of side a.', answer: 'Yes, the reasoning is correct **only',
                  options: ['Yes, the reasoning is correct **only', 'always q/(6ε₀) for any charge position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian surface." They write.' }
          ],
            remediations: { 'the-electric-field-e-in': { steps: ['If the student holds this misconception: (1) Revisit node c12_phy_cbse_01_007 (Electric Flux) — verify that flux = ∮.', '(2) Do the "cylinder in uniform field" example from NCERT Fig 1.23: uniform **E** (from distant charges) gives zero net.', '(3) Solve NCERT Example 1.11: uniform field for x>0, opposite for x<0, cylinder centered at origin — net flux = 3.14.', 'The field is from external sources (plates at infinity), yet flux ≠ 0 because net enclosed charge ≠ 0.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a gold-leaf electroscope and a hollow metal sphere to demonstrate that the electric flux through a closed surface depends only.', answer: 'Procedure: (1) Charge a hollow metal sphere +Q using a known source',
                  options: ['Procedure: (1) Charge a hollow metal sphere +Q using a known source', 'measure field at different distances'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian surface." They write.' }
          ],
            remediations: { 'the-electric-field-e-in': { steps: ['If the student holds this misconception: (1) Revisit node c12_phy_cbse_01_007 (Electric Flux) — verify that flux = ∮.', '(2) Do the "cylinder in uniform field" example from NCERT Fig 1.23: uniform **E** (from distant charges) gives zero net.', '(3) Solve NCERT Example 1.11: uniform field for x>0, opposite for x<0, cylinder centered at origin — net flux = 3.14.', 'The field is from external sources (plates at infinity), yet flux ≠ 0 because net enclosed charge ≠ 0.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_009', difficulty: 'standard',
          question: 'The electric field due to an infinitely long straight wire with uniform linear.',
          hint: 'Revisit Gauss\'s law (c12_phy_cbse_01_008) and electric flux (c12_phy_cbse_01_007) with.',
          misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the.',
          parts: [
                { id: 'a', prompt: 'An infinitely long straight wire carries a uniform linear charge density of 8.0 × 10⁻⁶ C/m. Calculate the electric field at a point 5.0 cm from the wire.', answer: 'Given: λ = 8.0 × 10⁻⁶ C/m, r = 0.050 m, ε₀ = 8.85 × 10⁻¹² C²/N·m²',
                  options: ['Given: λ = 8.0 × 10⁻⁶ C/m, r = 0.050 m, ε₀ = 8.85 × 10⁻¹² C²/N·m²', 'the wire is infinite in both directions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite in.' },
                { id: 'b', prompt: 'Compare the distance dependence of the electric field for: (a) a point charge, (b) an infinite line charge, and (c) an infinite plane sheet.', answer: 'a point charge, (',
                  options: ['a point charge, (', 'the wire is infinite in both directions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite in.' }
          ],
            remediations: { 'the-electric-field-of-an': { steps: ['Revisit the symmetry argument: draw the wire and field lines; convince yourself the field must be radial and uniform.', 'Review the Gaussian surface selection: list all possible surfaces (sphere, cube, cylinder) and eliminate those where E.', 'Re-derive the formula step-by-step from Gauss\'s law, explicitly writing flux = ∫E·dS = E(2πrl) and q_enclosed = λl.', 'Practice Exercise 1.22 from NCERT (given E, find λ) to reinforce algebraic manipulation.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the.',
          parts: [
                { id: 'a', prompt: 'A student uses a spherical Gaussian surface to find the field of an infinite wire and writes: Flux = E × 4πr² = λl/ε₀. They conclude E = λl/(4πε₀r²).', answer: 'Error 1: The electric field of an infinite wire is not spherically symmetric',
                  options: ['Error 1: The electric field of an infinite wire is not spherically symmetric', 'the wire is infinite in both directions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite in.' },
                { id: 'b', prompt: 'Design a thought experiment to verify the 1/r dependence of the electric field of an infinite line charge using only a test charge, a force sensor, and a.', answer: 'Procedure: Fix the infinite wire vertically',
                  options: ['Procedure: Fix the infinite wire vertically', 'the wire is infinite in both directions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite in.' },
                { id: 'c', prompt: 'Compare the distance dependence of the electric field for: (a) a point charge, (b) an infinite line charge, and (c) an infinite plane sheet.', answer: 'a point charge, (',
                  options: ['a point charge, (', 'the wire is infinite in both directions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite in.' }
          ],
            remediations: { 'the-electric-field-of-an': { steps: ['Revisit the symmetry argument: draw the wire and field lines; convince yourself the field must be radial and uniform.', 'Review the Gaussian surface selection: list all possible surfaces (sphere, cube, cylinder) and eliminate those where E.', 'Re-derive the formula step-by-step from Gauss\'s law, explicitly writing flux = ∫E·dS = E(2πrl) and q_enclosed = λl.', 'Practice Exercise 1.22 from NCERT (given E, find λ) to reinforce algebraic manipulation.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_010', difficulty: 'standard',
          question: 'The electric field due to an infinitely large, uniformly charged plane sheet.',
          hint: 'If stuck, review the symmetry argument for the infinite plane sheet: the field must be.',
          misconception: 'Students often write E = σ/ε₀ for an infinite plane sheet, forgetting the factor of 1/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The electric field due to an infinitely large, uniformly charged plane sheet with surface',
                  options: ['The electric field due to an infinitely large, uniformly charged plane sheet with surface', 'Electric field at a point in space is defined as the electrostatic force per unit', 'Electric field lines are imaginary curves drawn in an electric field such that the', 'Electric flux is a scalar measure of the number of electric field lines penetrating a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write E = σ/ε₀ for an infinite plane sheet, forgetting the factor of 1/2.' }
          ],
            remediations: { 'students-often-write-e-for': { steps: ['If the student cannot derive E = σ/(2ε₀) correctly: (1) Revisit c12_phy_cbse_01_007 (Electric Flux) to practice.', '(2) Revisit c12_phy_cbse_01_008 (Gauss\'s Law) to review the statement and the requirement that the Gaussian surface.', '(3) Draw the infinite sheet and field lines explicitly: arrows perpendicular on both sides.', 'Then draw a cylindrical Gaussian surface straddling the sheet.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
