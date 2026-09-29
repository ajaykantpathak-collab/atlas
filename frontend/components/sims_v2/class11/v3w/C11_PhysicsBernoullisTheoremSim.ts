import type { SimDef } from '../../engine/types';
import C11_PhysicsBernoullisTheoremSim from '../../../simulations/c6_12/C11_PhysicsBernoullisTheoremSim';

/** v3 wrapped master — C11_PhysicsBernoullisTheoremSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsbernoullistheoremsim: SimDef = {
    id: 'v3w_c11_physicsbernoullistheoremsim',
    title: 'Bernoulli\'s Principle: Statement and Derivation',
    subtitle: 'This node covers the statement and derivation of Bernoulli\'s principle for ideal fluids.',
    classLevel: 11, subject: 'physics', topic: 'Bernoulli\'s Principle: Statement and Derivation',
    chapters: [],
    nodeIds: ['c11_phy_cbse_09_007', 'c11_phy_cbse_09_002', 'c11_phy_cbse_09_003', 'c11_phy_cbse_09_005', 'c11_phy_cbse_09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe water flowing from a garden hose: when you partially cover the opening with your thumb, the water.', goal: 'Master Bernoulli\'s Principle: Statement and Derivation.' },
    discovery: {
        question: 'Water flows through a horizontal pipe that narrows from cross-sectional area A₁ to A₂ (A₂ < A₁).',
        options: ['By continuity, v₂ > v₁', 'pressure increases', 'pressure stays the same'],
        answer: 'By continuity, v₂ > v₁',
        hook: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.',
    },
    teaching: [
        { title: 'Bernoulli\'s principle states that for a.', text: 'Bernoulli\'s principle states that for a steady, incompressible, non-viscous fluid flow along a streamline, the sum of pressure energy per unit volume (P), kinetic energy per unit volume (½ρv²), and.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_007', title: 'Bernoulli\'s principle states that for a.',
          scaffold: { problem: 'Water flows through a horizontal pipe of varying cross-section. At point A, the diameter is 4.0 cm and the pressure is 3.0 × 10⁵ Pa.',
            steps: [
            { text: 'Identify given quantities with units: d_A = 4.0 cm = 0.040 m, d_B = 2.0 cm = 0.020 m, P_A = 3.0 × 10⁵ Pa, Q = 2.0 ×.' },
            { text: 'Calculate cross-sectional areas: A_A = π(d_A/2)² = π(0.020)² = 1.257 × 10⁻³ m²; A_B = π(0.010)² = 3.142 × 10⁻⁴ m².' },
            { text: 'Use flow rate Q = A·v to find velocities: v_A = Q/A_A = (2.0 × 10⁻³)/(1.257 × 10⁻³) = 1.59 m/s; v_B = Q/A_B = (2.0 ×.' },
            { text: 'Apply Bernoulli\'s equation (horizontal): P_A + ½ρv_A² = P_B + ½ρv_B². Solve for P_B: P_B = P_A + ½ρ(v_A² - v_B²).' },
            { text: 'Substitute: P_B = 3.0×10⁵ + ½(1000)(1.59² - 6.37²) = 3.0×10⁵ + 500(2.53 - 40.58) = 3.0×10⁵ - 19,025 = 2.81 × 10⁵ Pa.' },
            { text: 'Verify: v_B = 4×v_A (since area ratio 4:1), KE/volume increases 16×, pressure drops by ~19 kPa - physically consistent.', faded: true, blankAnswer: 'P_B = 2.81 × 10⁵ Pa' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_002', title: 'Pascal\'s Law states that when an.',
          scaffold: { problem: 'A hydraulic lift in a garage has a small piston of diameter 2.0 cm and a large piston of diameter 30.0 cm.',
            steps: [
            { text: 'Identify given quantities: m_car = 1400 kg, d₁ = 2.0 cm = 0.02 m, d₂ = 30.0 cm = 0.30 m, Δx₁ = 50 cm = 0.50 m.' },
            { text: 'Calculate areas: A₁ = π(d₁/2)² = 3.14 × (0.01)² = 3.14×10⁻⁴ m². A₂ = π(d₂/2)² = 3.14 × (0.15)² = 7.065×10⁻² m².' },
            { text: 'Output force F₂ = weight of car = m_car × g = 1400 × 9.8 = 13720 N.' },
            { text: 'Apply Pascal\'s Law: F₁/A₁ = F₂/A₂ → F₁ = F₂ × (A₁/A₂) = 13720 × (3.14×10⁻⁴ / 7.065×10⁻²) = 13720 × (1/225) = 61.0 N.' },
            { text: 'Volume conservation: A₁Δx₁ = A₂Δx₂ → Δx₂ = Δx₁ × (A₁/A₂) = 0.50 × (1/225) = 2.22×10⁻³ m = 0.222 cm.' },
            { text: 'Pressure P = F₁/A₁ = 61.0 / 3.14×10⁻⁴ = 1.94×10⁵ Pa. Check: P = F₂/A₂ = 13720 / 7.065×10⁻² = 1.94×10⁵ Pa. Matches.', faded: true, blankAnswer: '(a) F₁ = 61.0 N (b) Car rises 0.222 cm (c) Pressure =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_003', title: 'Hydrostatic pressure at a depth \\(h\\).',
          scaffold: { problem: 'A rectangular water tank in a house has a base area of \\(2\\ \\text{m}^2\\) and is filled to a height of \\(3\\ \\text{m}\\).',
            steps: [
            { text: 'Identify given: \\(h = 3\\ \\text{m}\\), \\(\\rho = 1000\\ \\text{kg·m}^{-3}\\), \\(g = 9.8\\ \\text{m·s}^{-2}\\), \\(P_{\\text{atm}}.' },
            { text: 'Gauge pressure formula: \\(P_g = \\rho gh\\). Check units: \\((\\text{kg·m}^{-3})(\\text{m·s}^{-2})(\\text{m}) =.' },
            { text: 'Compute \\(P_g = 1000 \\times 9.8 \\times 3 = 29,400\\ \\text{Pa} = 2.94 \\times 10^4\\ \\text{Pa}\\).' },
            { text: 'Absolute pressure: \\(P = P_{\\text{atm}} + P_g = 1.01 \\times 10^5 + 2.94 \\times 10^4 = 1.304 \\times 10^5\\ \\text{Pa}\\).' },
            { text: 'Force on base: \\(F = P \\times A\\). Use absolute pressure because atmosphere also pushes down on the water surface,.' },
            { text: 'Verify reasonableness: Gauge pressure ~0.3 atm, absolute ~1.3 atm, force ~26 tonnes weight equivalent.', faded: true, blankAnswer: '(a) \\(2.94 \\times 10^4\\ \\text{Pa}\\), (b) \\(1.304 \\times.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_005', title: 'A hydraulic machine is a device that.',
          scaffold: { problem: 'A hydraulic car lift in a garage has a small piston of diameter 5.0 cm and a large piston of diameter 40.0 cm.',
            steps: [
            { text: 'Identify given quantities: m_car = 1800 kg, d₁ = 5.0 cm = 0.05 m, d₂ = 40.0 cm = 0.40 m, Δx₁ = 50 cm = 0.50 m.' },
            { text: 'Compute areas: A₁ = π(d₁/2)² = π(0.025)² = 1.96×10⁻³ m²; A₂ = π(0.20)² = 0.126 m².' },
            { text: 'Use Pascal\'s law: P = F₂/A₂ = F₁/A₁ → F₁ = (A₁/A₂) F₂ = (1.96×10⁻³ / 0.126) × 17,640 = 274 N.' },
            { text: 'Volume conservation: A₁Δx₁ = A₂Δx₂ → Δx₂ = (A₁/A₂)Δx₁ = (1.96×10⁻³ / 0.126) × 0.50 = 7.78×10⁻³ m = 7.78 mm.' },
            { text: 'Verify work: W_in = F₁Δx₁ = 274 × 0.50 = 137 J; W_out = F₂Δx₂ = 17,640 × 0.00778 ≈ 137 J. Matches.', faded: true, blankAnswer: '(a) F₁ = 274 N, (b) Δx₂ = 7.8 mm, (c) P = 1.40 × 10⁵ Pa.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_008', title: 'Bernoulli\'s principle states that for.',
          scaffold: { problem: 'A cylindrical tank of cross-section 0.5 m² is filled with water to a height of 3.0 m. A small hole of area 2.0 cm² is opened at the bottom.',
            steps: [
            { text: 'Identify given: A_tank = 0.5 m², h_initial = 3.0 m, h_final = 1.5 m, A_hole = 2.0 cm² = 2.0 × 10⁻⁴ m², g = 9.8 m/s².' },
            { text: 'Use Torricelli\'s law for (a): v = √(2gh). Since the tank is large, the speed of the water surface is negligible.' },
            { text: '(a) v = √(2 × 9.8 × 3.0) = √58.8 = 7.67 m/s. (b) Q = A_hole × v = (2.0 × 10⁻⁴) × 7.67 = 1.53 × 10⁻³ m³/s.' },
            { text: 'For (c), the flow rate changes as h decreases. Use differential approach: dV/dt = -A_hole × √(2gh).' },
            { text: 'Integrate from h=3.0 to h=1.5: 2(√h_final - √h_initial) = -(A_hole/A_tank)√(2g) t.', faded: true, blankAnswer: '(a) 7.67 m/s, (b) 1.53 × 10⁻³ m³/s, (c) 572 s (≈ 9.5 min)' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Bernoulli\'s Principle: Statement and Derivation', spots: [
            { id: 's1', label: 'Bernoullis principle states that for', prompt: 'Which idea is this? — Bernoulli\'s principle states that for a steady, incompressible, non-viscous fluid flow.', answer: 'Bernoullis principle states that for', options: ['Bernoullis principle states that for', 'Pascals Law states that when', 'Hydrostatic pressure at a depth', 'A hydraulic machine is a'] },
            { id: 's2', label: 'Pascals Law states that when', prompt: 'Which idea is this? — Pascal\'s Law states that when an external pressure is applied to an enclosed fluid at.', answer: 'Pascals Law states that when', options: ['Pascals Law states that when', 'Bernoullis principle states that for', 'Hydrostatic pressure at a depth', 'A hydraulic machine is a'] },
            { id: 's3', label: 'Hydrostatic pressure at a depth', prompt: 'Which idea is this? — Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is the.', answer: 'Hydrostatic pressure at a depth', options: ['Hydrostatic pressure at a depth', 'Bernoullis principle states that for', 'Pascals Law states that when', 'A hydraulic machine is a'] },
            { id: 's4', label: 'A hydraulic machine is a', prompt: 'Which idea is this? — A hydraulic machine is a device that uses an incompressible fluid to transmit pressure.', answer: 'A hydraulic machine is a', options: ['A hydraulic machine is a', 'Bernoullis principle states that for', 'Pascals Law states that when', 'Hydrostatic pressure at a depth'] }
          ] } }
    ],
    explore: { component: C11_PhysicsBernoullisTheoremSim, prompt: 'Explore the interactive — Bernoulli\'s Principle: Statement and Derivation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_007', difficulty: 'standard',
          question: 'Bernoulli\'s principle states that for a steady, incompressible, non-viscous.',
          hint: 'If stuck, revisit c9_physics_ch4_8 (work-energy theorem) and c11_phy_cbse_09_003.',
          misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.',
          parts: [
                { id: 'a', prompt: 'State Bernoulli\'s equation for an ideal fluid flowing along a streamline. Identify each term by name, symbol, and SI unit.', answer: 'Bernoulli\'s equation: P + ½ρv² + ρgh = constant',
                  options: ['Bernoulli\'s equation: P + ½ρv² + ρgh = constant', 'faster flow always means lower pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.' },
                { id: 'b', prompt: 'Water flows through a horizontal pipe that narrows from cross-sectional area A₁ to A₂ (A₂ < A₁).', answer: 'By continuity, v₂ > v₁',
                  options: ['By continuity, v₂ > v₁', 'pressure increases', 'pressure stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.' },
                { id: 'c', prompt: 'A fluid flows through a pipe that rises vertically. At the lower point (h₁ = 0), pressure is P₁ = 3.0 × 10⁵ Pa and speed is v₁ = 4 m/s.', answer: 'Since cross-section is same, continuity gives v₂ = v₁ = 4 m/s',
                  options: ['Since cross-section is same, continuity gives v₂ = v₁ = 4 m/s', 'P₂ = P₁', 'P₂ = P₁ + ρgh₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.' }
          ],
            remediations: { 'bernoulli-s-principle-means-faster': { steps: ['List the five assumptions of Bernoulli\'s equation on a flashcard.', 'For any new problem, explicitly check each assumption before writing the equation.', 'Practice identifying which assumption fails in real scenarios: (a) honey pouring - viscosity; (b) waterfall -.', 'Re-derive the equation from work-energy theorem (W = ΔK + ΔU) to internalise that it is energy conservation, not a.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Bernoulli\'s equation can be used to calculate the pressure difference between the top and bottom of a waterfall because water is flowing.".', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'faster flow always means lower pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.' },
                { id: 'b', prompt: 'Design a simple classroom experiment using household items to demonstrate Bernoulli\'s principle.', answer: 'Materials: Two empty light cans (or paper cups), drinking straw, thread, tape',
                  options: ['Materials: Two empty light cans (or paper cups), drinking straw, thread, tape', 'faster flow always means lower pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Bernoulli\'s principle means "faster flow always means lower pressure" in all situations.' }
          ],
            remediations: { 'bernoulli-s-principle-means-faster': { steps: ['List the five assumptions of Bernoulli\'s equation on a flashcard.', 'For any new problem, explicitly check each assumption before writing the equation.', 'Practice identifying which assumption fails in real scenarios: (a) honey pouring - viscosity; (b) waterfall -.', 'Re-derive the equation from work-energy theorem (W = ΔK + ΔU) to internalise that it is energy conservation, not a.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_002', difficulty: 'standard',
          question: 'Pascal\'s Law states that when an external pressure is applied to an enclosed.',
          hint: 'If stuck, revisit Class 8 Pressure (c8_physics_ch4_1, c8_physics_ch4_2) and practice unit.',
          misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at.',
          parts: [
                { id: 'a', prompt: 'In a hydraulic lift, the input piston has area 5 cm² and the output piston has area 500 cm².', answer: 'The student ignores displacement: Work input = F₁d₁, Work output = F₂d₂',
                  options: ['The student ignores displacement: Work input = F₁d₁, Work output = F₂d₂', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' },
                { id: 'b', prompt: 'A hydraulic brake system has a master cylinder piston of diameter 1.0 cm and four wheel cylinders each of diameter 2.5 cm.', answer: 'Step 1: Areas: A_master = π(0.5 cm)² = 0.785 cm² = 7.85×10⁻⁵ m²',
                  options: ['Step 1: Areas: A_master = π(0.5 cm)² = 0.785 cm² = 7.85×10⁻⁵ m²', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' }
          ],
            remediations: { 'pascal-s-law-means-pressure': { steps: ['If a student states "pressure is same everywhere", do this remediation: (1) Take a tall transparent tube with three.', 'Show readings differ by ρgh.', '(2) Re-state Pascal\'s Law: "Change in pressure applied at one point is transmitted undiminished" — emphasize *change in.', '(3) Solve a problem: "A hydraulic lift has pistons at different heights.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at.',
          parts: [
                { id: 'a', prompt: 'Design a simple classroom demonstration of Pascal\'s Law using two syringes of different sizes (e.g., 5 mL and 50 mL), a rubber tube, and water.', answer: 'Procedure: Fill syringes and tube with water (no air bubbles)',
                  options: ['Procedure: Fill syringes and tube with water (no air bubbles)', 'pressure is the same everywhere in a fluid', 'at the same horizontal level (same depth) in a static fluid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Pascal\'s Law means "pressure is the same everywhere in a fluid" without the critical condition "at the same horizontal.' }
          ],
            remediations: { 'pascal-s-law-means-pressure': { steps: ['If a student states "pressure is same everywhere", do this remediation: (1) Take a tall transparent tube with three.', 'Show readings differ by ρgh.', '(2) Re-state Pascal\'s Law: "Change in pressure applied at one point is transmitted undiminished" — emphasize *change in.', '(3) Solve a problem: "A hydraulic lift has pistons at different heights.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_003', difficulty: 'standard',
          question: 'Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is.',
          hint: 'Review Newton\'s second law for static equilibrium (Class 9, Chapter 3) and density.',
          misconception: 'Students often believe that pressure at the bottom of a container equals the total weight of the fluid divided by the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is the',
                  options: ['Hydrostatic pressure at a depth \\(h\\) in a fluid of uniform density \\(\\rho\\) is the', 'Bernoulli\'s principle states that for a steady, incompressible, non-viscous fluid flow', 'Pascal\'s Law states that when an external pressure is applied to an enclosed fluid at', 'A hydraulic machine is a device that uses an incompressible fluid to transmit pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that pressure at the bottom of a container equals the total weight of the fluid divided by the bottom area (\\(P =.' }
          ],
            remediations: { 'pressure-at-the-bottom-of': { steps: ['If the student holds the weight/area misconception: 1.', 'Draw a free-body diagram of the fluid in a V-shaped vessel, showing forces on the slanted walls.', 'Resolve the normal reaction from the walls into vertical components; show they add upward force on the fluid.', 'Apply equilibrium: \\(P_{\\text{bottom}} A_{\\text{bottom}} = \\text{weight of fluid} + \\text{vertical wall forces}\\).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_005', difficulty: 'standard',
          question: 'A hydraulic machine is a device that uses an incompressible fluid to transmit.',
          hint: 'If stuck, review Pascal\'s law (c11_phy_cbse_09_002) and pressure definition.',
          misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.',
          parts: [
                { id: 'a', prompt: 'In a hydraulic lift, the small piston has a diameter of 2.0 cm and the large piston has a diameter of 30.0 cm. A force of 150 N is applied to the small piston.', answer: 'the pressure in the fluid, (',
                  options: ['the pressure in the fluid, (', 'creates', 'displacement is same on both sides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' },
                { id: 'b', prompt: 'A hydraulic press has a mechanical advantage of 40. The large piston has a radius of 20 cm.', answer: 'Mechanical advantage MA = A₂/A₁ = 40',
                  options: ['Mechanical advantage MA = A₂/A₁ = 40', 'creates', 'the hydraulic lift "creates" energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' }
          ],
            remediations: { 'the-hydraulic-lift-creates-energy': { steps: ['Revisit the syringe experiment: push the small plunger 10 cm, measure the large plunger\'s movement — it\'s tiny.', 'Calculate work: F₁×d₁ vs F₂×d₂ using spring balances.', 'Explicitly derive A₁d₁ = A₂d₂ from incompressibility.', 'Compare to a lever: small force × large distance = large force × small distance.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In a hydraulic lift, we get more force out than we put in, so it violates conservation of energy." Evaluate this claim using the work-energy.', answer: 'The claim is false',
                  options: ['The claim is false', 'creates', 'the hydraulic lift "creates" energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' },
                { id: 'b', prompt: 'A hydraulic press has a mechanical advantage of 40. The large piston has a radius of 20 cm.', answer: 'Mechanical advantage MA = A₂/A₁ = 40',
                  options: ['Mechanical advantage MA = A₂/A₁ = 40', 'creates', 'the hydraulic lift "creates" energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the hydraulic lift "creates" energy because a small force lifts a heavy weight.' }
          ],
            remediations: { 'the-hydraulic-lift-creates-energy': { steps: ['Revisit the syringe experiment: push the small plunger 10 cm, measure the large plunger\'s movement — it\'s tiny.', 'Calculate work: F₁×d₁ vs F₂×d₂ using spring balances.', 'Explicitly derive A₁d₁ = A₂d₂ from incompressibility.', 'Compare to a lever: small force × large distance = large force × small distance.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_008', difficulty: 'standard',
          question: 'Bernoulli\'s principle states that for an incompressible, non-viscous fluid in.',
          hint: 'Review the derivation of Bernoulli\'s equation from work-energy theorem (node.',
          misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply.',
          parts: [
                { id: 'a', prompt: 'State Bernoulli\'s equation for an incompressible, non-viscous fluid in steady flow along a streamline, defining each term and its SI unit.', answer: 'Bernoulli\'s equation: P + ½ρv² + ρgh = constant',
                  options: ['Bernoulli\'s equation: P + ½ρv² + ρgh = constant', 'fast moving air has low pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply it incorrectly to a.' },
                { id: 'b', prompt: 'A horizontal pipe narrows from cross-section A₁ to A₂ (A₂ < A₁). Water flows steadily.', answer: 'By continuity, A₁v₁ = A₂v₂, so v₂ > v₁',
                  options: ['By continuity, A₁v₁ = A₂v₂, so v₂ > v₁', 'pressure increases', 'fast moving air has low pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply it incorrectly to a.' },
                { id: 'c', prompt: 'Water flows out of a small hole 2.0 m below the free surface of a large open tank. The hole\'s cross-section is 1.0 cm².', answer: 'Calculate the efflux speed using Torricelli\'s law',
                  options: ['Calculate the efflux speed using Torricelli\'s law', 'fast moving air has low pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply it incorrectly to a.' }
          ],
            remediations: { 'bernoulli-s-principle-says-fast': { steps: ['Re-read the derivation of Bernoulli\'s equation (node c11_phy_cbse_09_007) and note the assumptions: steady,.', 'Perform the "paper strip" demo: hold a strip of paper to your lower lip and blow *over* the top.', 'Then blow *under* it — it also lifts!', 'This disproves the naive "fast air = low pressure" idea.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a Venturi meter, the pressure at the throat is lower than at the entrance because the fluid speeds up, and by Bernoulli\'s principle,.', answer: 'The claim is partially correct but physically limited',
                  options: ['The claim is partially correct but physically limited', 'fast moving air has low pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bernoulli\'s principle says "fast moving air has low pressure" as an absolute statement, and apply it incorrectly to a.' }
          ],
            remediations: { 'bernoulli-s-principle-says-fast': { steps: ['Re-read the derivation of Bernoulli\'s equation (node c11_phy_cbse_09_007) and note the assumptions: steady,.', 'Perform the "paper strip" demo: hold a strip of paper to your lower lip and blow *over* the top.', 'Then blow *under* it — it also lifts!', 'This disproves the naive "fast air = low pressure" idea.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
