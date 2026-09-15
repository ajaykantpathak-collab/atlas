import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch09_p1: SimDef = {
    id: 'v3_c11_phy_ch09_p1',
    title: 'Mechanical Properties of Fluids · Part 1/3',
    subtitle: 'Discover that the hydraulic lift trades distance for force, not energy for nothing.',
    classLevel: 11, subject: 'physics', topic: 'Mechanical Properties of Fluids · Part 1/3',
    chapters: ['c11_phy_ch09'],
    nodeIds: ['c11_phy_cbse_09_001', 'c11_phy_cbse_09_002', 'c11_phy_cbse_09_003', 'c11_phy_cbse_09_004', 'c11_phy_cbse_09_005', 'c11_phy_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mechanic questioning a too-good force multiplier', intro: 'One thumb on a narrow piston lifts a 1500 kg car — the fluid transmitted pressure, but it kept the energy ledger balanced.', goal: 'Define fluid pressure as scalar, apply Pascal\'s law, and spot the energy limit on force multiplication.' },
    discovery: {
        question: 'A hydraulic press: 50 N on 2 cm² lifts 5000 N on 200 cm². So keep enlarging the piston and lift anything for free?',
        options: ['No — pressure transmits equally but energy doesn\'t multiply; the big piston rises only a fraction as far', 'Yes — area ratio is free force', 'Yes — Pascal\'s law guarantees it', 'No — fluid pressure has a maximum of 1 atm'],
        answer: 'No — pressure transmits equally but energy doesn\'t multiply; the big piston rises only a fraction as far',
        hook: 'Pressure has no direction — the force it exerts is normal to the wall, but pressure itself is a scalar at a point, and \'same pressure\' only holds at the same depth.',
    },
    teaching: [
        { title: 'Pressure: Definition and Units', text: 'Pressure is the normal force exerted by a fluid per unit area of the surface in contact, defined as the limit of the ratio of the normal force ΔF to the area ΔA as the area approaches zero:.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_09_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Push a drawing pin to feel force-per-area, verify 76 cm Hg against 1.013 × 10⁵ Pa, then expose the free-lunch flaw in the ever-bigger piston.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_001', title: 'Pressure: Definition and Units',
          scaffold: { problem: 'A woman of mass 55 kg wears high-heeled shoes. Each heel has a circular cross-section of radius 0.5 cm. She stands momentarily on one heel.',
            steps: [
            { text: 'Identify given quantities: mass m = 55 kg, g = 9.8 m/s², radius r = 0.5 cm = 0.5 × 10⁻² m.' },
            { text: 'Calculate normal force (weight): F = mg = 55 kg × 9.8 m/s² = 539 N.' },
            { text: 'Apply pressure formula: P = F/A = 539 N / (7.854 × 10⁻⁵ m²) = 6.86 × 10⁶ Pa.' },
            { text: 'Convert to atm: P = (6.86 × 10⁶ Pa) / (1.013 × 10⁵ Pa/atm) = 67.7 atm.' },
            { text: 'Verify reasonableness: High heel concentrates weight on tiny area → very high pressure (~68 atm), plausible for.', faded: true, blankAnswer: 'P = 6.86 × 10⁶ Pa ≈ 67.7 atm' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_002', title: 'Pascal\'s Law: Transmission of Pressure',
          scaffold: { problem: 'A hydraulic lift in a garage has a small piston of diameter 2.0 cm and a large piston of diameter 30.0 cm.',
            steps: [
            { text: 'Identify given quantities: m_car = 1400 kg, d₁ = 2.0 cm = 0.02 m, d₂ = 30.0 cm = 0.30 m, Δx₁ = 50 cm = 0.50 m.' },
            { text: 'Calculate areas: A₁ = π(d₁/2)² = 3.14 × (0.01)² = 3.14×10⁻⁴ m². A₂ = π(d₂/2)² = 3.14 × (0.15)² = 7.065×10⁻² m².' },
            { text: 'Output force F₂ = weight of car = m_car × g = 1400 × 9.8 = 13720 N.' },
            { text: 'Apply Pascal\'s Law: F₁/A₁ = F₂/A₂ → F₁ = F₂ × (A₁/A₂) = 13720 × (3.14×10⁻⁴ / 7.065×10⁻²) = 13720 × (1/225) = 61.0 N.' },
            { text: 'Volume conservation: A₁Δx₁ = A₂Δx₂ → Δx₂ = Δx₁ × (A₁/A₂) = 0.50 × (1/225) = 2.22×10⁻³ m = 0.222 cm.' },
            { text: 'Pressure P = F₁/A₁ = 61.0 / 3.14×10⁻⁴ = 1.94×10⁵ Pa. Check: P = F₂/A₂ = 13720 / 7.065×10⁻² = 1.94×10⁵ Pa. Matches.', faded: true, blankAnswer: '(a) F₁ = 61.0 N (b) Car rises 0.222 cm (c) Pressure.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_003', title: 'Variation of Pressure with Depth',
          scaffold: { problem: 'A rectangular water tank in a house has a base area of \\(2\\ \\text{m}^2\\) and is filled to a height of \\(3\\ \\text{m}\\).',
            steps: [
            { text: 'Identify given: \\(h = 3\\ \\text{m}\\), \\(\\rho = 1000\\ \\text{kg·m}^{-3}\\), \\(g = 9.8\\ \\text{m·s}^{-2}\\), \\(P_{\\text{atm}}.' },
            { text: 'Gauge pressure formula: \\(P_g = \\rho gh\\). Check units: \\((\\text{kg·m}^{-3})(\\text{m·s}^{-2})(\\text{m}).' },
            { text: 'Compute \\(P_g = 1000 \\times 9.8 \\times 3 = 29,400\\ \\text{Pa} = 2.94 \\times 10^4\\ \\text{Pa}\\).' },
            { text: 'Absolute pressure: \\(P = P_{\\text{atm}} + P_g = 1.01 \\times 10^5 + 2.94 \\times 10^4 = 1.304 \\times 10^5\\ \\text{Pa}\\).' },
            { text: 'Force on base: \\(F = P \\times A\\). Use absolute pressure because atmosphere also pushes down on the water surface.' },
            { text: 'Verify reasonableness: Gauge pressure ~0.3 atm, absolute ~1.3 atm, force ~26 tonnes weight equivalent.', faded: true, blankAnswer: '(a) \\(2.94 \\times 10^4\\ \\text{Pa}\\), (b) \\(1.304 \\times.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_004', title: 'Atmospheric Pressure and Gauge Pressure',
          scaffold: { problem: 'A mercury barometer in a physics laboratory shows a mercury column height of 74.2 cm.',
            steps: [
            { text: 'Identify given: h_Hg = 74.2 cm = 0.742 m, ρ_Hg = 13,600 kg/m³, g = 9.8 m/s². Find P_atm.' },
            { text: 'Use barometer formula P_atm = ρ_Hg g h_Hg. Check units: (kg/m³)(m/s²)(m) = kg/(m·s²) = N/m² = Pa.' },
            { text: 'Substitute: P_atm = (13,600)(9.8)(0.742) = 98,860.16 Pa ≈ 9.89 × 10⁴ Pa.' },
            { text: 'Convert to atm: P_atm = (9.886 × 10⁴ Pa) / (1.013 × 10⁵ Pa/atm) = 0.976 atm.' },
            { text: 'Verify: Standard atmospheric pressure supports 76 cm Hg; 74.2 cm is slightly less, so pressure should be slightly below.', faded: true, blankAnswer: 'P_atm = 9.89 × 10⁴ Pa (or 0.976 atm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_005', title: 'Hydraulic Machines: Principle and Applications',
          scaffold: { problem: 'A hydraulic car lift in a garage has a small piston of diameter 5.0 cm and a large piston of diameter 40.0 cm.',
            steps: [
            { text: 'Identify given quantities: m_car = 1800 kg, d₁ = 5.0 cm = 0.05 m, d₂ = 40.0 cm = 0.40 m, Δx₁ = 50 cm = 0.50 m.' },
            { text: 'Compute areas: A₁ = π(d₁/2)² = π(0.025)² = 1.96×10⁻³ m²; A₂ = π(0.20)² = 0.126 m².' },
            { text: 'Use Pascal\'s law: P = F₂/A₂ = F₁/A₁ → F₁ = (A₁/A₂) F₂ = (1.96×10⁻³ / 0.126) × 17,640 = 274 N.' },
            { text: 'Volume conservation: A₁Δx₁ = A₂Δx₂ → Δx₂ = (A₁/A₂)Δx₁ = (1.96×10⁻³ / 0.126) × 0.50 = 7.78×10⁻³ m = 7.78 mm.' },
            { text: 'Verify work: W_in = F₁Δx₁ = 274 × 0.50 = 137 J; W_out = F₂Δx₂ = 17,640 × 0.00778 ≈ 137 J. Matches.', faded: true, blankAnswer: '(a) F₁ = 274 N, (b) Δx₂ = 7.8 mm, (c) P = 1.40 × 10⁵.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_006', title: 'Archimedes\' Principle: Buoyant Force',
          scaffold: { problem: 'A solid cylindrical rod of iron (density 7800 kg/m³) has length 1.0 m and radius 0.02 m.',
            steps: [
            { text: 'Identify given quantities with units. ρ_iron = 7800 kg/m³, L = 1.0 m, r = 0.02 m, ρ_water = 1000 kg/m³, g = 9.8 m/s².' },
            { text: 'Compute volume of rod. V = πr²L = π × (0.02)² × 1.0 = π × 0.0004 = 1.2566×10⁻³ m³.' },
            { text: 'Calculate actual weight. W = ρ_iron V g = 7800 × 1.2566×10⁻³ × 9.8 = 96.1 N.' },
            { text: 'Calculate buoyant force (fully submerged). F_b = ρ_water V g = 1000 × 1.2566×10⁻³ × 9.8 = 12.3 N.' },
            { text: 'Calculate apparent weight. W_app = W - F_b = 96.1 - 12.3 = 83.8 N. This is the spring balance reading.' },
            { text: 'Minimum force to hold just below surface. At the surface, the rod is fully submerged but top face is at water level.', faded: true, blankAnswer: '(a) W = 96.1 N, (b) F_b = 12.3 N, (c) W_app = 83.8 N, (d).' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a hydraulic lift, a student claims: \'Pressure at the top piston equals pressure at the cylinder\'s bottom — Pascal\'s law says pressure is same everywhere. And pressure pushes downward, so the wall pressure differs from the floor pressure.\'',
            decisions: [{ prompt: 'What do pressure and Pascal\'s law actually say?', options: [
                { text: 'Add the missing condition and fix the direction: Pascal\'s law transmits an APPLIED pressure change undiminished, but equality holds only at the same depth — the fluid\'s own weight adds ρgh with depth, so the bottom exceeds the top. And pressure is a scalar: it exerts force normal to whatever surface it meets — floor, wall or piston alike.', outcome: 'He sees the lift correctly: F₁/A₁ = F₂/A₂ works because transmitted pressure is equal at equal depth — the depth gradient is separate hydrostatics.' },
                { text: 'Keep \'same everywhere\' — that\'s what transmission undiminished means.', outcome: 'Transmission applies to the applied pressure change; the ρgh term from the fluid\'s weight still stacks with depth — the two effects are separate.', reveals: 'pressure-same-everywhere' },
                { text: 'Keep \'pressure pushes down\' — gravity gives pressure its direction.', outcome: 'Pressure has no direction; the force it exerts is always normal to the surface — that\'s why walls and floors at equal depth feel equal pressure.', reveals: 'pressure-has-direction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'F₁/A₁ = F₂/A₂ buys force with distance — the small piston travels far so the big one barely moves; no energy is created.',
            decisions: [{ prompt: 'What comes next? Mechanical Properties of Fluids · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mechanical Properties of Fluids · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_001', difficulty: 'standard',
          question: 'Pressure is the normal force exerted by a fluid per unit area of the surface.',
          hint: 'Review Class 8 Physics nodes c8_physics_ch4_1 to c8_physics_ch4_3 for pressure basics.',
          misconception: 'Students think "pressure at a point in a fluid has direction because force has direction." They incorrectly believe.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of pressure and its equivalent in base SI units (kg, m, s). Write the dimensional formula of pressure.', answer: 'The SI unit of pressure is pascal (Pa)',
                  options: ['The SI unit of pressure is pascal (Pa)', 'pressure at a point in a fluid has direction', '"pressure at a point in a fluid has direction'],
                  hint: 'Review Class 8 Physics nodes c8_physics_ch4_1 to c8_physics_ch4_3 for pressure basics, and Class 6.',
                  misconception: 'Students think "pressure at a point in a fluid has direction because force has direction." They incorrectly believe pressure acts.' },
                { id: 'b', prompt: 'A hydraulic press has a small piston of cross-sectional area 2.5 cm² and a large piston of area 350 cm².', answer: 'Step 1: Convert area to m²: A₁ = 2.5 cm² = 2.5 × 10⁻⁴ m²',
                  options: ['Step 1: Convert area to m²: A₁ = 2.5 cm² = 2.5 × 10⁻⁴ m²', 'pressure at a point in a fluid has direction', '"pressure at a point in a fluid has direction'],
                  hint: 'Review Class 8 Physics nodes c8_physics_ch4_1 to c8_physics_ch4_3 for pressure basics, and Class 6.',
                  misconception: 'Students think "pressure at a point in a fluid has direction because force has direction." They incorrectly believe pressure acts.' },
                { id: 'c', prompt: 'Two surfaces of different areas (A₁ = 10 cm² and A₂ = 50 cm²) experience the same normal force F = 200 N. Compare the average pressures on them.', answer: 'P₁ = 200 N / (10 × 10⁻⁴ m²) = 2 × 10⁵ Pa',
                  options: ['P₁ = 200 N / (10 × 10⁻⁴ m²) = 2 × 10⁵ Pa', 'pressure at a point in a fluid has direction', '"pressure at a point in a fluid has direction'],
                  hint: 'Review Class 8 Physics nodes c8_physics_ch4_1 to c8_physics_ch4_3 for pressure basics, and Class 6.',
                  misconception: 'Students think "pressure at a point in a fluid has direction because force has direction." They incorrectly believe pressure acts.' }
          ],
            remediations: { 'pressure-at-a-point-in': { steps: ['Take a small inflated balloon and press it against a flat table, then against a vertical wall, then against the.', 'Draw a free-body diagram of a fluid element at rest — show forces on all faces are equal in magnitude (Pascal\'s law.', 'Re-read the NCERT definition: "Pressure is a scalar quantity... it is the component of the force normal to the area...', 'Practice: "At a point 10 m deep in water, pressure is 2 atm. What is the force on a 1 cm² area oriented horizontally?'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_002', difficulty: 'standard',
          question: 'Pascal\'s Law states that when an external pressure is applied to an enclosed.',
          hint: 'If stuck, revisit Class 8 Pressure (c8_physics_ch4_1, c8_physics_ch4_2) and practice unit.',
          misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at.',
          parts: [
                { id: 'a', prompt: 'In a hydraulic lift, the input piston has area 5 cm² and the output piston has area 500 cm².', answer: 'The student ignores displacement: Work input = F₁d₁, Work output = F₂d₂',
                  options: ['The student ignores displacement: Work input = F₁d₁, Work output = F₂d₂', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'If stuck, revisit Class 8 Pressure (c8_physics_ch4_1, c8_physics_ch4_2) and practice unit.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' },
                { id: 'b', prompt: 'A hydraulic brake system has a master cylinder piston of diameter 1.0 cm and four wheel cylinders each of diameter 2.5 cm.', answer: 'Step 1: Areas: A_master = π(0.5 cm)² = 0.785 cm² = 7.85×10⁻⁵ m²',
                  options: ['Step 1: Areas: A_master = π(0.5 cm)² = 0.785 cm² = 7.85×10⁻⁵ m²', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'If stuck, revisit Class 8 Pressure (c8_physics_ch4_1, c8_physics_ch4_2) and practice unit.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' }
          ],
            remediations: { 'pascal-s-law-means-pressure': { steps: ['If a student states "pressure is same everywhere", do this remediation: (1) Take a tall transparent tube with three.', 'Show readings differ by ρgh.', '(2) Re-state Pascal\'s Law: "Change in pressure applied at one point is transmitted undiminished" — emphasize *change.', '(3) Solve a problem: "A hydraulic lift has pistons at different heights.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at.',
          parts: [
                { id: 'a', prompt: 'Design a simple classroom demonstration of Pascal\'s Law using two syringes of different sizes (e.g., 5 mL and 50 mL), a rubber tube, and water.', answer: 'Procedure: Fill syringes and tube with water (no air bubbles)',
                  options: ['Procedure: Fill syringes and tube with water (no air bubbles)', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'If stuck, revisit Class 8 Pressure (c8_physics_ch4_1, c8_physics_ch4_2) and practice unit.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' }
          ],
            remediations: { 'pascal-s-law-means-pressure': { steps: ['If a student states "pressure is same everywhere", do this remediation: (1) Take a tall transparent tube with three.', 'Show readings differ by ρgh.', '(2) Re-state Pascal\'s Law: "Change in pressure applied at one point is transmitted undiminished" — emphasize *change.', '(3) Solve a problem: "A hydraulic lift has pistons at different heights.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_003', difficulty: 'standard',
          question: 'Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\).',
          hint: 'Review Newton\'s second law for static equilibrium (Class 9, Chapter 3) and density.',
          misconception: 'Students often believe that pressure at the bottom of a container equals the total weight of the fluid divided by the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is the',
                  options: ['Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is the', 'Pressure is the normal force exerted by a fluid per unit area of the surface in contact,', 'Pascal\'s Law states that when an external pressure is applied to an enclosed fluid at', 'Atmospheric pressure is the pressure exerted by the weight of the air column extending'],
                  hint: 'Review Newton\'s second law for static equilibrium (Class 9, Chapter 3) and density definition.',
                  misconception: 'Students often believe that pressure at the bottom of a container equals the total weight of the fluid divided by the bottom area (\\(P.' }
          ],
            remediations: { 'pressure-at-the-bottom-of': { steps: ['If the student holds the weight/area misconception: 1.', 'Draw a free-body diagram of the fluid in a V-shaped vessel, showing forces on the slanted walls.', 'Resolve the normal reaction from the walls into vertical components; show they add upward force on the fluid.', 'Apply equilibrium: \\(P_{\\text{bottom}} A_{\\text{bottom}} = \\text{weight of fluid} + \\text{vertical wall forces}\\).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_004', difficulty: 'standard',
          question: 'Atmospheric pressure is the pressure exerted by the weight of the air column.',
          hint: 'Revisit the derivation of P = P₀ + ρgh from force balance on a fluid column and the.',
          misconception: 'Students often think that the height of the liquid column in a barometer or manometer directly gives the absolute.',
          parts: [
                { id: 'a', prompt: 'A mercury barometer reads 760 mm Hg at sea level. If the same barometer is taken to a hill station where the atmospheric pressure is lower, will the height.', answer: 'The height will decrease',
                  options: ['The height will decrease', 'increase'],
                  hint: 'Revisit the derivation of P = P₀ + ρgh from force balance on a fluid column and the concept that.',
                  misconception: 'Students often think that the height of the liquid column in a barometer or manometer directly gives the absolute pressure in pascals.' }
          ],
            remediations: { 'the-height-of-the-liquid': { steps: ['Demonstrate atmospheric pressure acting in all directions using a suction cup on a wall — it sticks because atmospheric.', 'Use a simple water barometer (a long tube filled with water, inverted in a beaker) to show the water column height.', 'Practice converting between gauge and absolute pressure with a table: given P_atm = 1.01×10⁵ Pa, fill in missing values.', 'Solve a manometer problem where the gas pressure is below atmospheric (negative gauge pressure) to solidify the concept.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_005', difficulty: 'standard',
          question: 'A hydraulic machine is a device that uses an incompressible fluid to transmit.',
          hint: 'If stuck, review Pascal\'s law (c11_phy_cbse_09_002) and pressure definition.',
          misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.',
          parts: [
                { id: 'a', prompt: 'In a hydraulic lift, the small piston has a diameter of 2.0 cm and the large piston has a diameter of 30.0 cm. A force of 150 N is applied to the small piston.', answer: 'the pressure in the fluid, (',
                  options: ['the pressure in the fluid, (', 'creates', 'displacement is same on both sides', 'the hydraulic lift "creates" energy'],
                  hint: 'If stuck, review Pascal\'s law (c11_phy_cbse_09_002) and pressure definition (c11_phy_cbse_09_001).',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' },
                { id: 'b', prompt: 'A hydraulic press has a mechanical advantage of 40. The large piston has a radius of 20 cm.', answer: 'Mechanical advantage MA = A₂/A₁ = 40',
                  options: ['Mechanical advantage MA = A₂/A₁ = 40', 'creates', 'the hydraulic lift "creates" energy'],
                  hint: 'If stuck, review Pascal\'s law (c11_phy_cbse_09_002) and pressure definition (c11_phy_cbse_09_001).',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' }
          ],
            remediations: { 'the-hydraulic-lift-creates-energy': { steps: ['Revisit the syringe experiment: push the small plunger 10 cm, measure the large plunger\'s movement — it\'s tiny.', 'Calculate work: F₁×d₁ vs F₂×d₂ using spring balances.', 'Explicitly derive A₁d₁ = A₂d₂ from incompressibility.', 'Compare to a lever: small force × large distance = large force × small distance.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_006', difficulty: 'standard',
          question: 'Archimedes\' principle states that when a body is partially or fully immersed.',
          hint: 'If stuck, review c11_phy_cbse_09_003 (Variation of Pressure with Depth) and practice.',
          misconception: 'Students believe the buoyant force on a partially submerged floating object equals the weight of the object\'s total.',
          parts: [
                { id: 'a', prompt: 'A solid iron cube (density 7800 kg/m³) and a hollow iron shell of the same outer dimensions are both fully submerged in water.', answer: 'Both experience the same buoyant force',
                  options: ['Both experience the same buoyant force', 'solid cube has more buoyant force'],
                  hint: 'If stuck, review c11_phy_cbse_09_003 (Variation of Pressure with Depth) and practice calculating.',
                  misconception: 'Students believe the buoyant force on a partially submerged floating object equals the weight of the object\'s total volume times fluid.' }
          ],
            remediations: { 'the-buoyant-force-on-a': { steps: ['If the student holds this misconception: (1) Have them draw a free-body diagram of a floating block showing weight (mg.', 'Ask: "If the block is in equilibrium, what must be true about these two forces?" (2) Submerge the same block fully.', 'Ask: "Did the buoyant force increase?', 'Why?" (3) Guide them to see that buoyant force increased because submerged volume increased, proving F_b depends.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
