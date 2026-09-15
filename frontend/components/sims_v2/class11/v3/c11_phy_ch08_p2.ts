import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch08_p2: SimDef = {
    id: 'v3_c11_phy_ch08_p2',
    title: 'Mechanical Properties of Solids · Part 2/2',
    subtitle: 'Measure deformation in fractions, not millimetres.',
    classLevel: 11, subject: 'physics', topic: 'Mechanical Properties of Solids · Part 2/2',
    chapters: ['c11_phy_ch08'],
    nodeIds: ['c11_phy_cbse_08_007', 'c11_phy_cbse_08_008', 'c11_phy_cbse_08_009', 'c11_phy_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an engineer reading what a rubber band is really saying', intro: 'The band stretches 0.5 cm on 10 cm — that 5% number, not the millimetres, is what the material actually feels.', goal: 'Define stress relative to surface orientation and strain as fractional deformation.' },
    discovery: {
        question: '\'Strain is dimensionless, so it\'s just a mathematical ratio with no physical meaning.\' Fair?',
        options: ['No — the fractional change decides bending, stretching and failure; dimensionless doesn\'t mean inconsequential', 'Yes — no units means no physics', 'Yes — it\'s bookkeeping only', 'No — because strain actually has units of mm'],
        answer: 'No — the fractional change decides bending, stretching and failure; dimensionless doesn\'t mean inconsequential',
        hook: 'Stress isn\'t a vector wearing a force\'s clothes — it\'s defined relative to a surface\'s orientation, and it isn\'t interchangeable with pressure.',
    },
    teaching: [
        { title: 'Poisson\'s Ratio', text: 'Poisson\'s ratio (σ) is the ratio of lateral strain (fractional change in diameter perpendicular to applied force) to longitudinal strain (fractional change in length parallel to applied force) within.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_08_007', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Tell tensile, shearing and hydraulic stress apart with a spring, a book-slide and a sunk balloon, then compute a real strain as ΔL/L.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_007', title: 'Poisson\'s Ratio',
          scaffold: { problem: 'A steel wire of length 3.0 m and diameter 2.0 mm is used to lift a 50 kg load in a construction site.',
            steps: [
            { text: 'Identify given quantities with units. L = 3.0 m, d = 2.0 mm = 2.0 × 10⁻³ m, ΔL = 2.5 mm = 2.5 × 10⁻³ m, m = 50 kg,.' },
            { text: 'Compute longitudinal strain ε_long = ΔL/L = (2.5 × 10⁻³ m) / (3.0 m) = 8.333 × 10⁻⁴ (dimensionless).' },
            { text: 'Compute lateral strain ε_lat = σ × ε_long = 0.29 × 8.333 × 10⁻⁴ = 2.417 × 10⁻⁴ (dimensionless).' },
            { text: 'Compute change in diameter Δd = ε_lat × d = (2.417 × 10⁻⁴) × (2.0 × 10⁻³ m) = 4.83 × 10⁻⁷ m = 0.483 μm.' },
            { text: 'Compute tensile stress from strain: stress = Y × ε_long = (2.0 × 10¹¹ Pa) × (8.333 × 10⁻⁴) = 1.667 × 10⁸ Pa.' },
            { text: 'Compute stress from load/area: F = mg = 50 × 9.8 = 490 N. Area A = πd²/4 = π(2.0×10⁻³)²/4 = 3.142 × 10⁻⁶ m².' },
            { text: 'Compare: 1.667 × 10⁸ Pa vs 1.56 × 10⁸ Pa — difference ~6.6% due to rounding in given ΔL (likely measured value).', faded: true, blankAnswer: '(a) ε_long = 8.33 × 10⁻⁴, (b) ε_lat = 2.42 × 10⁻⁴, (c) Δd.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_008', title: 'Elastic Potential Energy in a Stretched Wire',
          scaffold: { problem: 'A copper wire of length 3.0 m and diameter 1.0 mm is stretched by a force of 200 N. Young\'s modulus of copper is 1.1 × 10¹¹ Pa.',
            steps: [
            { text: 'Identify given quantities with units: L = 3.0 m, d = 1.0 mm = 1.0 × 10⁻³ m, so radius r = 0.5 × 10⁻³ m.' },
            { text: 'Calculate stress σ = F/A = 200 / (7.85 × 10⁻⁷) = 2.55 × 10⁸ Pa. Check: N/m² = Pa ✓.' },
            { text: 'Calculate strain ε = σ/Y = (2.55 × 10⁸) / (1.1 × 10¹¹) = 2.32 × 10⁻³ (dimensionless). Check: Pa/Pa = dimensionless ✓.' },
            { text: 'Calculate elongation l = εL = (2.32 × 10⁻³) × 3.0 = 6.96 × 10⁻³ m = 6.96 mm. Check: dimensionless × m = m ✓.' },
            { text: 'Calculate elastic potential energy U = ½ F l = ½ × 200 × 6.96 × 10⁻³ = 0.696 J.', faded: true, blankAnswer: '(a) 2.55 × 10⁸ Pa, (b) 2.32 × 10⁻³, (c) 6.96 × 10⁻³ m (6.96.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_009', title: 'Applications of Elastic Behaviour of Materials',
          scaffold: { problem: 'A bridge crane in a factory must lift a maximum load of 8 metric tons (1 metric ton = 1000 kg).',
            steps: [
            { text: 'Identify given quantities: M = 8000 kg, σ_y = 250 × 10⁶ N/m², SF = 8, g = 9.8 m/s². Total wires = 6 × 19 = 114.' },
            { text: 'Formula for minimum area with safety factor: A_min = (M × g × SF) / σ_y.' },
            { text: 'Substitute values: A_min = (8000 × 9.8 × 8) / (250 × 10⁶) = 627200 / 250000000 = 2.5088 × 10⁻³ m².' },
            { text: 'Area per wire = A_min / 114 = 2.5088 × 10⁻³ / 114 = 2.20 × 10⁻⁵ m².' },
            { text: 'Verify reasonableness: Total area ~25 cm², rope diameter ~5.6 cm (since A = πD²/4 → D = √(4×2.5×10⁻³/π) = 0.056 m).', faded: true, blankAnswer: '(a) Minimum total cross-sectional area = 2.51 × 10⁻³ m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_010', title: 'Relation Between Elastic Constants',
          scaffold: { problem: 'A cylindrical rod of unknown material is tested in tension and torsion.',
            steps: [
            { text: 'Identify given quantities with units. Tension: F = 50 kN = 5×10⁴ N, ΔL = 0.2 mm = 2×10⁻⁴ m, L = 2 m, A = 400 mm².' },
            { text: 'Compute Y from tension: Y = (F/A)/(ΔL/L) = FL/(AΔL) = (5×10⁴ × 2)/(4×10⁻⁴ × 2×10⁻⁴) = 10⁵/(8×10⁻⁸) = 1.25×10¹².' },
            { text: 'Check physical reasonableness: Y = 1250 GPa, G = 2550 GPa → G > Y.' },
            { text: 'Re-examine units: A = 400 mm² = 400×10⁻⁶ m² = 4×10⁻⁴ m² ✓. J = πd⁴/32 = π(20×10⁻³)⁴/32 = π×16×10⁻¹²/32 = 1.57×10⁻¹² m⁴.' },
            { text: 'Identify error: Torque 200 N·m on 20 mm shaft is unrealistic for elastic twist of 0.05 rad.' },
            { text: 'For learning purposes, use consistent data: Assume Y = 200 GPa, σ = 0.3 → G = 76.9 GPa, B = 166.7 GPa.', faded: true, blankAnswer: 'Given data is physically inconsistent (G > Y violates G <.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a materials lab, a student reports \'stress on the rod is a vector pointing along the pull, same as pressure\' and records strain as \'0.5 mm\' — with units \'since it\'s the extension.\'',
            decisions: [{ prompt: 'How are stress and strain properly defined?', options: [
                { text: 'Redefine both: stress is internal restoring force per unit area on a specified plane — a scalar defined relative to the plane\'s orientation (normal vs tangential), not a force-direction vector; pressure and compressive stress aren\'t synonyms. Strain is the fractional change — ΔL/L — a dimensionless ratio, so \'0.5 mm\' is extension, not strain; the strain is 5×10⁻⁴.', outcome: 'The lab report gains precision: stress is force-per-area relative to a plane, strain is change-per-original — neither carries the units or direction he assumed.' },
                { text: 'Keep stress as a vector — it comes from force, so it must have direction.', outcome: 'Stress is defined on a plane, not along a line: one loading produces tensile stress on one face and shear on another — it\'s a state, not an arrow.', reveals: 'stress-is-a-vector' },
                { text: 'Keep \'0.5 mm\' — strain IS the amount the material stretched.', outcome: 'That\'s the extension; strain normalises it by original length — the ratio makes it comparable across specimens, and it\'s unitless.', reveals: 'strain-has-units' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'ΔL alone lies — 1 mm of stretch is trivial for a rope and catastrophic for a hair; the ratio to the original is what matters.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_007', difficulty: 'standard',
          question: 'Poisson\'s ratio (σ) is the ratio of lateral strain (fractional change.',
          hint: 'Revisit node c11_phy_cbse_08_002 (Strain: Definition and Types) — specifically the.',
          misconception: 'Students believe Poisson\'s ratio describes the ratio of "width change to length change" in absolute terms (Δd/ΔL).',
          parts: [
                { id: 'a', prompt: 'Explain why Poisson\'s ratio is a dimensionless quantity even though it is a ratio of two strains.', answer: 'The student\'s reasoning is mathematically correct but physically incomplete',
                  options: ['The student\'s reasoning is mathematically correct but physically incomplete', 'width change to length change'],
                  hint: 'Revisit node c11_phy_cbse_08_002 (Strain: Definition and Types) — specifically the distinction.',
                  misconception: 'Students believe Poisson\'s ratio describes the ratio of "width change to length change" in absolute terms (Δd/ΔL) rather than the ratio.' }
          ],
            remediations: { 'poisson-s-ratio-describes-the': { steps: ['If a student confuses absolute changes with strains: (1) Have them compute longitudinal strain and lateral strain.', '(2) Show that ΔL and Δd differ but ε_long and ε_lat are identical.', '(3) Derive σ = (Δd/d)/(ΔL/L) = (Δd/ΔL)×(L/d) step by step, emphasizing that Δd/ΔL alone is not a material constant —.', '(4) Use the analogy of percentage change: a 1 cm elongation in a 1 m rod (1% strain) vs 1 cm in a 10 cm rod (10%.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Poisson\'s ratio describes the ratio of "width change to length change" in absolute terms (Δd/ΔL).',
          parts: [
                { id: 'a', prompt: 'A student performs an experiment to determine Poisson\'s ratio of a metal wire.', answer: 'The method is flawed',
                  options: ['The method is flawed', 'width change to length change'],
                  hint: 'Revisit node c11_phy_cbse_08_002 (Strain: Definition and Types) — specifically the distinction.',
                  misconception: 'Students believe Poisson\'s ratio describes the ratio of "width change to length change" in absolute terms (Δd/ΔL) rather than the ratio.' }
          ],
            remediations: { 'poisson-s-ratio-describes-the': { steps: ['If a student confuses absolute changes with strains: (1) Have them compute longitudinal strain and lateral strain.', '(2) Show that ΔL and Δd differ but ε_long and ε_lat are identical.', '(3) Derive σ = (Δd/d)/(ΔL/L) = (Δd/ΔL)×(L/d) step by step, emphasizing that Δd/ΔL alone is not a material constant —.', '(4) Use the analogy of percentage change: a 1 cm elongation in a 1 m rod (1% strain) vs 1 cm in a 10 cm rod (10%.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_008', difficulty: 'standard',
          question: 'Elastic potential energy in a stretched wire is the energy stored in a wire.',
          hint: 'If the ½ factor is confusing, revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and.',
          misconception: 'Students believe that elastic potential energy stored in a wire is U = F × l (force × elongation), treating the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Elastic potential energy in a stretched wire is the energy stored in a wire when it is',
                  options: ['Elastic potential energy in a stretched wire is the energy stored in a wire when it is', 'Stress is the internal restoring force per unit cross-sectional area developed within a', 'Strain is the dimensionless measure of deformation representing the fractional change in', 'Hooke\'s Law states that within the elastic limit of a material, the stress developed is'],
                  hint: 'If the ½ factor is confusing, revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and the.',
                  misconception: 'Students believe that elastic potential energy stored in a wire is U = F × l (force × elongation), treating the stretching force.' }
          ],
            remediations: { 'elastic-potential-energy-stored-in': { steps: ['Have the student plot a graph of Force (y-axis) vs Elongation (x-axis) for a spring using 5-6 data points within.', 'Ask them to identify the shape (straight line through origin).', 'Shade the area under the graph from 0 to l and ask "What does this area represent?" (Work done).', 'Calculate area of the triangle = ½ × base × height = ½ l × F.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_009', difficulty: 'standard',
          question: 'Applications of elastic behaviour involve using the elastic moduli (Young\'s.',
          hint: 'Revisit Hooke\'s law (c11_phy_cbse_08_003) and the stress-strain curve.',
          misconception: 'Students believe that a beam\'s load-bearing capacity depends primarily on its cross-sectional area (A = b × d).',
          parts: [
                { id: 'a', prompt: 'A beam with a solid rectangular cross-section (breadth b, depth d) is replaced by an I-beam with the same cross-sectional area and same depth d.', answer: 'The I-beam will have less depression',
                  options: ['The I-beam will have less depression', 'same depression because b and d are same'],
                  hint: 'Revisit Hooke\'s law (c11_phy_cbse_08_003) and the stress-strain curve (c11_phy_cbse_08_004).',
                  misconception: 'Students believe that a beam\'s load-bearing capacity depends primarily on its cross-sectional area (A = b × d).' }
          ],
            remediations: { 'a-beam-s-load-bearing': { steps: ['Take a 30 cm plastic ruler.', 'Support it at both ends on two books.', 'Press down at the centre with your finger — it bends easily.', 'Now rotate it 90° so its thickness (small dimension) is vertical and press again — it barely bends.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_010', difficulty: 'standard',
          question: 'The relationship between elastic constants describes the mathematical.',
          hint: 'If stuck, revisit c11_phy_cbse_08_007 (Poisson\'s ratio) and c11_phy_cbse_08_006 (Shear.',
          misconception: 'Students believe that if Young\'s modulus Y is known, the other moduli B and G are automatically fixed — they don\'t.',
          parts: [
                { id: 'a', prompt: 'Two isotropic materials A and B have the same Young\'s modulus Y = 70 GPa. Material A has σ = 0.1, Material B has σ = 0.4.', answer: 'For A (σ=0.1): G_A = 70/[2(1.1)] = 31.8 GPa, B_A = 70/[3(0.8)] = 29.2 GPa',
                  options: ['For A (σ=0.1): G_A = 70/[2(1.1)] = 31.8 GPa, B_A = 70/[3(0.8)] = 29.2 GPa', 'same Y means same G and B'],
                  hint: 'If stuck, revisit c11_phy_cbse_08_007 (Poisson\'s ratio) and c11_phy_cbse_08_006 (Shear and Bulk.',
                  misconception: 'Students believe that if Young\'s modulus Y is known, the other moduli B and G are automatically fixed — they don\'t realize Poisson\'s ratio.' }
          ],
            remediations: { 'if-young-s-modulus-y': { steps: ['Revisit the definitions of Y, B, G from nodes c11_phy_cbse_08_005 and c11_phy_cbse_08_006 — ensure you can state each.', 'Review Poisson\'s ratio definition (c11_phy_cbse_08_007) — understand it as the ratio of lateral to longitudinal strain.', 'Derive Y = 2G(1+σ) yourself: consider a cube under shear stress τ, rotate axes by 45° to find principal stresses ±τ.', 'Practice with numerical values: take Y = 100, σ = 0.25 → compute G, B, then verify Y = 9BG/(3B+G).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
