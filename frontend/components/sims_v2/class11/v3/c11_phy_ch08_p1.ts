import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch08_p1: SimDef = {
    id: 'v3_c11_phy_ch08_p1',
    title: 'Mechanical Properties of Solids · Part 1/2',
    subtitle: 'Measure deformation in fractions, not millimetres.',
    classLevel: 11, subject: 'physics', topic: 'Mechanical Properties of Solids · Part 1/2',
    chapters: ['c11_phy_ch08'],
    nodeIds: ['c11_phy_cbse_08_001', 'c11_phy_cbse_08_002', 'c11_phy_cbse_08_003', 'c11_phy_cbse_08_004', 'c11_phy_cbse_08_005', 'c11_phy_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an engineer reading what a rubber band is really saying', intro: 'The band stretches 0.5 cm on 10 cm — that 5% number, not the millimetres, is what the material actually feels.', goal: 'Define stress relative to surface orientation and strain as fractional deformation.' },
    discovery: {
        question: '\'Strain is dimensionless, so it\'s just a mathematical ratio with no physical meaning.\' Fair?',
        options: ['No — the fractional change decides bending, stretching and failure; dimensionless doesn\'t mean inconsequential', 'Yes — no units means no physics', 'Yes — it\'s bookkeeping only', 'No — because strain actually has units of mm'],
        answer: 'No — the fractional change decides bending, stretching and failure; dimensionless doesn\'t mean inconsequential',
        hook: 'Stress isn\'t a vector wearing a force\'s clothes — it\'s defined relative to a surface\'s orientation, and it isn\'t interchangeable with pressure.',
    },
    teaching: [
        { title: 'Stress: Definition and Types', text: 'Stress is the internal restoring force per unit cross-sectional area developed within a material when an external deforming force is applied, measured in pascals (Pa) or N·m⁻².', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_08_001', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Tell tensile, shearing and hydraulic stress apart with a spring, a book-slide and a sunk balloon, then compute a real strain as ΔL/L.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_001', title: 'Stress: Definition and Types',
          scaffold: { problem: 'A steel wire of length 2.5 m and diameter 2.0 mm is used to lift a 50 kg load vertically upward with an acceleration of 2 m/s².',
            steps: [
            { text: 'Identify given quantities: mass m = 50 kg, acceleration a = 2 m/s² upward, g = 9.8 m/s², diameter d = 2.0 mm = 2.0.' },
            { text: 'Determine tension in wire using Newton\'s second law. T - mg = ma → T = m(g + a) = 50 × (9.8 + 2) = 50 × 11.8 = 590 N.' },
            { text: 'Calculate cross-sectional area A = πd²/4 = π × (2.0 × 10⁻³)² / 4 = π × 4.0 × 10⁻⁶ / 4 = π × 10⁻⁶ m² ≈ 3.142 × 10⁻⁶ m².' },
            { text: 'Compute stress σ = F/A = 590 N / (3.142 × 10⁻⁶ m²) = 1.878 × 10⁸ Pa.' },
            { text: 'Verify: 590 N on ~3 mm² area gives ~2 × 10⁸ Pa, reasonable for steel (yield ~2.5 × 10⁸ Pa).', faded: true, blankAnswer: '1.88 × 10⁸ Pa' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_002', title: 'Strain: Definition and Types',
          scaffold: { problem: 'A steel wire of length 3.50 m and diameter 2.0 mm stretches by 1.2 mm when a 50 kg mass is hung from it.',
            steps: [
            { text: 'Identify given quantities: original length L = 3.50 m, extension ΔL = 1.2 mm = 1.2 × 10⁻³ m, mass m = 50 kg (not needed.' },
            { text: 'Recall formula for longitudinal strain: ε = ΔL/L. Check units: both lengths must be in same unit (meters).' },
            { text: 'Convert ΔL to meters: 1.2 mm = 1.2 × 10⁻³ m. L is already in meters.' },
            { text: 'Substitute: ε = (1.2 × 10⁻³ m) / (3.50 m) = 3.42857 × 10⁻⁴. Unit cancellation: m/m = dimensionless.' },
            { text: 'Express in scientific notation: 3.43 × 10⁻⁴ (3 significant figures). As percentage: (3.43 × 10⁻⁴) × 100% = 0.0343%.', faded: true, blankAnswer: 'Longitudinal strain = 3.43 × 10⁻⁴ (dimensionless) = 0.0343%' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_003', title: 'Hooke\'s Law: Stress-Strain Curve',
          scaffold: { problem: 'A tensile test on an aluminium alloy wire of diameter 1.2 mm and gauge length 50 cm yields the following data in the initial loading stage.',
            steps: [
            { text: 'Identify given quantities with units. Diameter d = 1.2 mm = 1.2 × 10⁻³ m, so cross-sectional area A = πd²/4 = π(1.2.' },
            { text: 'Convert extensions to metres: 0.12 mm = 1.2 × 10⁻⁴ m, 0.24 mm = 2.4 × 10⁻⁴ m, 0.36 mm = 3.6 × 10⁻⁴ m, 0.49 mm = 4.9.' },
            { text: 'Compute stress σ = F/A and strain ε = ΔL/L for each pair. For 100 N: σ = 100 / 1.131×10⁻⁶ = 8.84 × 10⁷ Pa, ε = 1.2×10⁻⁴.' },
            { text: 'Check proportionality by computing σ/ε for each point. 100 N: 8.84×10⁷ / 2.4×10⁻⁴ = 3.68 × 10¹¹ Pa.' },
            { text: 'The ratio σ/ε is constant (3.68 × 10¹¹ Pa) for the first three points (up to 300 N), then decreases.' },
            { text: 'Verify physical reasonableness: Typical Young\'s modulus for aluminium alloys is 70 GPa.', faded: true, blankAnswer: '(a) Hooke\'s law is obeyed up to 300 N (proportional limit).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_004', title: 'Stress-Strain Curve: Elastic Limit and Yield Point',
          scaffold: { problem: 'A tensile test on a mild steel rod of diameter 12 mm yields the following data: at the yield point, the load is 45 kN.',
            steps: [
            { text: 'Identify given quantities: diameter d = 12 mm = 0.012 m, yield load F_y = 45 kN = 45,000 N, proportional limit load F_p.' },
            { text: 'Compute cross-sectional area A = πd²/4 = π × (0.012 m)² / 4 = 1.131 × 10⁻⁴ m².' },
            { text: 'Calculate yield strength σ_y = F_y / A = 45,000 N / 1.131 × 10⁻⁴ m² = 3.98 × 10⁸ Pa = 398 MPa.' },
            { text: 'Calculate proportional limit stress σ_p = F_p / A = 30,000 N / 1.131 × 10⁻⁴ m² = 2.65 × 10⁸ Pa = 265 MPa.' },
            { text: 'Working stress = 0.60 × σ_y = 0.60 × 398 MPa = 239 MPa. Factor of safety = σ_y / working stress = 398 / 239 = 1.67 (or.', faded: true, blankAnswer: '(a) Yield strength = 398 MPa, (b) Proportional limit stress.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_005', title: 'Young\'s Modulus: Definition and Formula',
          scaffold: { problem: 'A copper wire of length 3.0 m and diameter 1.0 mm is used to lift a load of 50 kg in a construction site.',
            steps: [
            { text: 'Identify given quantities: L = 3.0 m, d = 1.0 mm = 1.0 × 10⁻³ m, so radius r = 0.5 × 10⁻³ m.' },
            { text: 'Compute cross-sectional area A = πr² = 3.14 × (0.5 × 10⁻³)² = 3.14 × 0.25 × 10⁻⁶ = 7.85 × 10⁻⁷ m².' },
            { text: 'Use formula ΔL = (F × L) / (A × Y). Check units: (N × m) / (m² × N/m²) = m.' },
            { text: 'Substitute: ΔL = (490 × 3.0) / (7.85 × 10⁻⁷ × 1.1 × 10¹¹) = 1470 / (8.635 × 10⁴) = 1.70 × 10⁻² m.' },
            { text: 'Convert to mm: 1.70 × 10⁻² m = 17.0 mm. This is a reasonable elongation for a 3 m wire under 50 kg load.', faded: true, blankAnswer: '1.70 × 10⁻² m (or 17.0 mm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_08_006', title: 'Shear Modulus and Bulk Modulus',
          scaffold: { problem: 'A copper cube of side 4.0 cm is subjected to a shearing force of 2.5 × 10⁴ N applied tangentially to its top face while the bottom face.',
            steps: [
            { text: 'Identify given quantities: side length L = 4.0 cm = 0.040 m, F = 2.5 × 10⁴ N, G = 42 GPa = 42 × 10⁹ Pa.' },
            { text: 'Calculate shearing stress = F/A = (2.5 × 10⁴) / (1.6 × 10⁻³) = 1.5625 × 10⁷ Pa = 15.6 MPa.' },
            { text: 'Calculate shearing strain = stress/G = (1.5625 × 10⁷) / (42 × 10⁹) = 3.72 × 10⁻⁴ (dimensionless).' },
            { text: 'Calculate displacement Δx = strain × L = (3.72 × 10⁻⁴) × 0.040 = 1.49 × 10⁻⁵ m = 14.9 μm.' },
            { text: 'Verify units: stress (N/m²), strain (m/m = dimensionless), displacement (m).', faded: true, blankAnswer: '(a) 1.56 × 10⁷ Pa, (b) 3.72 × 10⁻⁴, (c) 14.9 μm' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a materials lab, a student reports \'stress on the rod is a vector pointing along the pull, same as pressure\' and records strain as \'0.5 mm\' — with units \'since it\'s the extension.\'',
            decisions: [{ prompt: 'How are stress and strain properly defined?', options: [
                { text: 'Redefine both: stress is internal restoring force per unit area on a specified plane — a scalar defined relative to the plane\'s orientation (normal vs tangential), not a force-direction vector; pressure and compressive stress aren\'t synonyms. Strain is the fractional change — ΔL/L — a dimensionless ratio, so \'0.5 mm\' is extension, not strain; the strain is 5×10⁻⁴.', outcome: 'The lab report gains precision: stress is force-per-area relative to a plane, strain is change-per-original — neither carries the units or direction he assumed.' },
                { text: 'Keep stress as a vector — it comes from force, so it must have direction.', outcome: 'Stress is defined on a plane, not along a line: one loading produces tensile stress on one face and shear on another — it\'s a state, not an arrow.', reveals: 'stress-is-a-vector' },
                { text: 'Keep \'0.5 mm\' — strain IS the amount the material stretched.', outcome: 'That\'s the extension; strain normalises it by original length — the ratio makes it comparable across specimens, and it\'s unitless.', reveals: 'strain-has-units' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'ΔL alone lies — 1 mm of stretch is trivial for a rope and catastrophic for a hair; the ratio to the original is what matters.',
            decisions: [{ prompt: 'What comes next? Mechanical Properties of Solids · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mechanical Properties of Solids · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_001', difficulty: 'standard',
          question: 'Stress is the internal restoring force per unit cross-sectional area developed.',
          hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
          misconception: 'Students often think stress is a vector quantity because it comes from force.',
          parts: [
                { id: 'a', prompt: 'A steel rod of cross-sectional area 2.5 cm² is subjected to a tensile force of 10 kN. What is the magnitude of stress developed in the rod?', answer: '4.0 × 10⁷ Pa',
                  options: ['4.0 × 10⁷ Pa', 'stress', 'pressure', 'stress is a vector quantity'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' },
                { id: 'b', prompt: 'Why is stress considered a scalar quantity even though it originates from a vector force?', answer: 'Stress is scalar',
                  options: ['Stress is scalar', 'stress is a vector', 'stress', 'pressure'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' },
                { id: 'c', prompt: 'A cylindrical aluminum rod of radius 4 mm and length 50 cm is compressed by a force of 500 N along its axis. Calculate the compressive stress in the rod.', answer: 'Compressive stress = 9.95 × 10⁶ Pa',
                  options: ['Compressive stress = 9.95 × 10⁶ Pa', 'stress', 'pressure', 'the area changes with force direction'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' },
                { id: 'd', prompt: 'Compare the stress developed in two wires of the same material and length: Wire A has radius 1 mm, Wire B has radius 2 mm.', answer: 'Wire A experiences 4 times greater stress than Wire B',
                  options: ['Wire A experiences 4 times greater stress than Wire B', 'same stress because same force', 'stress', 'pressure'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' }
          ],
            remediations: { 'stress-is-a-vector-quantity': { steps: ['Hold a rectangular eraser. Push on the top face horizontally while bottom is fixed — feel the resistance.', 'Pull the same eraser from both ends — feel resistance. This is tensile stress (normal).', 'Push both ends — compressive stress.', 'Submerge a sealed plastic bag with air in water — uniform squeeze from all sides is hydraulic stress.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think stress is a vector quantity because it comes from force.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Hydraulic stress is just compressive stress applied from all sides, so it\'s the same as compressive stress." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'stress', 'pressure', 'stress is a vector quantity'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate the difference between shearing stress and tensile stress.', answer: 'Materials: Rubber eraser, two wooden blocks, heavy book, spring balance',
                  options: ['Materials: Rubber eraser, two wooden blocks, heavy book, spring balance', 'stress', 'pressure', 'stress is a vector quantity'],
                  hint: 'Revisit Class 8 Pressure (c8_physics_ch4_1) and Class 9 Newton\'s Laws (c9_physics_ch3_4.',
                  misconception: 'Students often think stress is a vector quantity because it comes from force.' }
          ],
            remediations: { 'stress-is-a-vector-quantity': { steps: ['Hold a rectangular eraser. Push on the top face horizontally while bottom is fixed — feel the resistance.', 'Pull the same eraser from both ends — feel resistance. This is tensile stress (normal).', 'Push both ends — compressive stress.', 'Submerge a sealed plastic bag with air in water — uniform squeeze from all sides is hydraulic stress.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_002', difficulty: 'standard',
          question: 'Strain is the dimensionless measure of deformation representing the fractional.',
          hint: 'If stuck on unit conversion, review c9_math_ch1_4 (distance/measurement) and practice.',
          misconception: 'Students often confuse "strain" with "change in dimension" (ΔL, Δx, ΔV) and treat strain as having units of length.',
          parts: [
                { id: 'a', prompt: 'A cylindrical rod is subjected to a tangential force on its top face while the bottom face is fixed.', answer: 'The calculation is incorrect',
                  options: ['The calculation is incorrect', 'strain', 'change in dimension'],
                  hint: 'If stuck on unit conversion, review c9_math_ch1_4 (distance/measurement) and practice converting.',
                  misconception: 'Students often confuse "strain" with "change in dimension" (ΔL, Δx, ΔV) and treat strain as having units of length or volume.' },
                { id: 'b', prompt: 'A solid copper cube of side 4.0 cm is subjected to hydraulic pressure, causing its volume to decrease by 0.064 cm³. Calculate the volumetric strain.', answer: 'Original volume V₁ = (4.0 cm)³ = 64 cm³',
                  options: ['Original volume V₁ = (4.0 cm)³ = 64 cm³', 'strain', 'change in dimension'],
                  hint: 'If stuck on unit conversion, review c9_math_ch1_4 (distance/measurement) and practice converting.',
                  misconception: 'Students often confuse "strain" with "change in dimension" (ΔL, Δx, ΔV) and treat strain as having units of length or volume.' },
                { id: 'c', prompt: 'Three identical rods are subjected to: (A) tensile force along length, (B) compressive force along length, (C) tangential force on top face.', answer: '(A) Tensile force → longitudinal strain, positive (ΔL > 0, length increases)',
                  options: ['(A) Tensile force → longitudinal strain, positive (ΔL > 0, length increases)', 'strain', 'change in dimension'],
                  hint: 'If stuck on unit conversion, review c9_math_ch1_4 (distance/measurement) and practice converting.',
                  misconception: 'Students often confuse "strain" with "change in dimension" (ΔL, Δx, ΔV) and treat strain as having units of length or volume.' }
          ],
            remediations: { 'students-often-confuse-strain-with': { steps: ['Revisit the definition — strain is a RATIO, not a difference. Write "strain = (change)/(original)" three times with.', 'Practice unit cancellation explicitly: take ΔL = 2 mm, L = 1 m → convert both to meters (0.002 m / 1 m) → m/m cancels →.', 'For shearing strain, draw a right triangle with opposite side Δx = 1 mm, adjacent L = 100 mm → tan θ = 0.01 → θ ≈ 0.01.', 'Solve 5 numerical problems where you must convert units before dividing.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_003', difficulty: 'standard',
          question: 'Hooke\'s Law states that within the elastic limit of a material, the stress.',
          hint: 'If stuck, revisit c11_phy_cbse_08_001 for stress calculation practice and.',
          misconception: 'Students believe that Hooke\'s law (stress ∝ strain) holds all the way up to the fracture point, or that the "elastic.',
          parts: [
                { id: 'a', prompt: 'State Hooke\'s law in words and write its mathematical form. What is the name and SI unit of the proportionality constant?', answer: 'Hooke\'s law: Within the elastic limit, stress is directly proportional to strain',
                  options: ['Hooke\'s law: Within the elastic limit, stress is directly proportional to strain', 'elastic limit', 'proportional limit', 'F = kx without converting to stress/strain, or giving unit as N/m'],
                  hint: 'If stuck, revisit c11_phy_cbse_08_001 for stress calculation practice and c11_phy_cbse_08_002 for.',
                  misconception: 'Students believe that Hooke\'s law (stress ∝ strain) holds all the way up to the fracture point, or that the "elastic limit" and.' }
          ],
            remediations: { 'hooke-s-law-stress-strain': { steps: ['Revisit the definitions of stress (F/A) and strain (ΔL/L) from nodes c11_phy_cbse_08_001 and c11_phy_cbse_08_002.', 'Plot a rough stress-strain graph by hand for a ductile metal using the NCERT Fig.', '8.2 as reference; label O, A, B, D, E and shade the linear region OA.', 'Practice computing σ/ε for 3-4 data points from a table to test constancy of the ratio — this trains the.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_004', difficulty: 'standard',
          question: 'The elastic limit is the maximum stress a material can withstand while still.',
          hint: 'If unsure, revisit the worked examples in c11_phy_cbse_08_001 (stress calculation).',
          misconception: 'Students often think the "elastic limit" and "yield point" are identical because textbooks sometimes use them.',
          parts: [
                { id: 'a', prompt: 'Define yield strength and state its SI unit. How does it differ from the elastic limit?', answer: 'Yield strength (σ_y) is the stress at',
                  options: ['Yield strength (σ_y) is the stress at', 'elastic limit', 'yield point'],
                  hint: 'If unsure, revisit the worked examples in c11_phy_cbse_08_001 (stress calculation).',
                  misconception: 'Students often think the "elastic limit" and "yield point" are identical because textbooks sometimes use them interchangeably.' },
                { id: 'b', prompt: 'A stress-strain curve for a metal shows a linear region OA, a non-linear but elastic region AB, a yield plateau BC, and a strain-hardening region CD.', answer: 'In region AB the material is still elastic',
                  options: ['In region AB the material is still elastic', 'elastic limit', 'yield point'],
                  hint: 'If unsure, revisit the worked examples in c11_phy_cbse_08_001 (stress calculation).',
                  misconception: 'Students often think the "elastic limit" and "yield point" are identical because textbooks sometimes use them interchangeably.' },
                { id: 'c', prompt: 'A mild steel wire of cross-sectional area 2.5 mm² is subjected to a tensile test. The force at the yield point is recorded as 7500 N.', answer: 'Given: A = 2.5 mm² = 2.5 × 10⁻⁶ m², F_y = 7500 N',
                  options: ['Given: A = 2.5 mm² = 2.5 × 10⁻⁶ m², F_y = 7500 N', 'elastic limit', 'yield point'],
                  hint: 'If unsure, revisit the worked examples in c11_phy_cbse_08_001 (stress calculation).',
                  misconception: 'Students often think the "elastic limit" and "yield point" are identical because textbooks sometimes use them interchangeably.' }
          ],
            remediations: { 'the-elastic-limit-and-yield': { steps: ['If a student conflates elastic limit and yield point, have them sketch the stress-strain curve for mild steel and label.', 'Then ask: "If you unload from a point between A and B, does the strain return to zero?" (Yes, so it\'s still elastic.).', 'Next, show an aluminium alloy curve with no sharp B and explain the 0.2% offset method.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_005', difficulty: 'standard',
          question: 'Young\'s modulus (Y) is the ratio of longitudinal stress (tensile.',
          hint: 'Review the definitions of longitudinal stress (F/A) and longitudinal strain (ΔL/L) from.',
          misconception: 'Students often think Young\'s modulus depends on the length or thickness of the wire because the formula contains L and.',
          parts: [
                { id: 'a', prompt: 'The stress-strain graph for two materials A and B are straight lines through the origin. The slope of A is steeper than B.', answer: 'Material A has higher Young\'s modulus',
                  options: ['Material A has higher Young\'s modulus', 'steeper means more deformation'],
                  hint: 'Review the definitions of longitudinal stress (F/A) and longitudinal strain (ΔL/L) from the Stress.',
                  misconception: 'Students often think Young\'s modulus depends on the length or thickness of the wire because the formula contains L and A.' }
          ],
            remediations: { 'young-s-modulus-depends-on': { steps: ['Revisit the definitions of stress (F/A) and strain (ΔL/L) from nodes c11_phy_cbse_08_001 and c11_phy_cbse_08_002.', 'Perform a thought experiment: Take two wires of same material, one long/thin, one short/thick.', 'Compute stress and strain for each.', 'Show that stress/strain ratio is identical.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_08_006', difficulty: 'standard',
          question: 'Shear modulus (G), also called modulus of rigidity, is the ratio of shearing.',
          hint: 'Revisit c11_phy_cbse_08_001 (stress types) and c11_phy_cbse_08_002 (strain types).',
          misconception: 'Students often think "shear modulus applies to fluids too because fluids can flow" — they confuse shear stress (which.',
          parts: [
                { id: 'a', prompt: 'Compare the fractional volume change (ΔV/V) of water (B = 2.2 GPa) and steel (B = 160 GPa) when both are subjected to the same hydraulic pressure of 100 atm (1.', answer: 'p = 100 × 1.013×10⁵ = 1.013×10⁷ Pa',
                  options: ['p = 100 × 1.013×10⁵ = 1.013×10⁷ Pa', 'more compressible', 'shear modulus applies to fluids too'],
                  hint: 'Revisit c11_phy_cbse_08_001 (stress types) and c11_phy_cbse_08_002 (strain types) — practice.',
                  misconception: 'Students often think "shear modulus applies to fluids too because fluids can flow" — they confuse shear stress (which requires a static.' }
          ],
            remediations: { 'shear-modulus-applies-to-fluids': { steps: ['If a student confuses shear modulus applicability: (1) Show a fluid (water) in a container — apply tangential force.', 'Contrast with a solid (eraser) — same force produces fixed tilt angle.', '(2) For gas bulk modulus: derive B_isothermal = p from pV = constant, and B_adiabatic = γp from pV^γ = constant.', 'Emphasize that for solids/liquids, B is nearly constant over large pressure ranges, but for gases it varies with.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
