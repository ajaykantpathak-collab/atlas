import type { SimDef } from '../../engine/types';
import C11_PhysicsViscosityTerminalVelocitySim from '../../../simulations/c6_12/C11_PhysicsViscosityTerminalVelocitySim';

/** v3 wrapped master — C11_PhysicsViscosityTerminalVelocitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsviscosityterminalvelocitysim: SimDef = {
    id: 'v3w_c11_physicsviscosityterminalvelocitysim',
    title: 'Viscosity Terminal Velocity',
    subtitle: 'Covers Stokes\' Law for viscous drag on a sphere, derivation of terminal velocity using.',
    classLevel: 11, subject: 'physics', topic: 'Stokes\' Law and Terminal Velocity',
    chapters: [],
    nodeIds: ['c11_phy_cbse_09_010', 'c11_phy_cbse_09_009', 'c11_phy_cbse_09_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Watch a raindrop falling on a window pane during monsoon — it doesn\'t accelerate indefinitely but reaches a.', goal: 'Master Viscosity Terminal Velocity.' },
    discovery: {
        question: 'A student measures terminal velocity of a 2 mm radius glass bead (\\(\\rho = 2500\\) kg/m³) in a liquid of unknown viscosity. They get \\(v_t = 4.2\\) cm/s.',
        options: ['The calculated viscosity is an OVERESTIMATE (incorrectly high)', 'underestimate', 'no effect'],
        answer: 'The calculated viscosity is an OVERESTIMATE (incorrectly high)',
        hook: 'Students believe Stokes\' Law (\\(F = 6\\pi\\eta a v\\)) applies to ALL objects falling through fluids, including skydivers,.',
    },
    teaching: [
        { title: 'Stokes\' Law states that the viscous drag.', text: 'Stokes\' Law states that the viscous drag force \\(F\\) on a small sphere of radius \\(a\\) moving with velocity \\(v\\) through a fluid of coefficient of viscosity \\(\\eta\\) under laminar flow conditions is.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_010', title: 'Stokes\' Law states that the viscous.',
          scaffold: { problem: 'A spherical pollen grain of radius 25 μm and density 1200 kg/m³ falls through air at 25°C.',
            steps: [
            { text: 'Identify given quantities with units: \\(a = 25 \\times 10^{-6}\\) m, \\(\\rho = 1200\\) kg/m³, \\(\\sigma = 1.18\\) kg/m³,.' },
            { text: 'Write terminal velocity formula: \\(v_t = \\frac{2a^2(\\rho - \\sigma)g}{9\\eta}\\).' },
            { text: 'Substitute values: \\(a^2 = (25\\times10^{-6})^2 = 6.25\\times10^{-10}\\) m². \\(\\rho - \\sigma \\approx 1198.82\\) kg/m³.' },
            { text: 'Compute \\(v_t = \\frac{1.464\\times10^{-5}}{1.665\\times10^{-4}} = 0.0879\\) m/s = 8.79 cm/s.' },
            { text: 'Check Reynolds number: Re = \\(\\frac{\\sigma v_t a}{\\eta} = \\frac{1.18 \\times 0.0879 \\times.' },
            { text: 'Since Re = 0.14 < 1, Stokes\' Law is valid. The pollen grain reaches terminal velocity quickly and falls slowly, which.', faded: true, blankAnswer: '\\(v_t = 0.088\\) m/s (or 8.8 cm/s). Stokes\' Law is valid (Re.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_009', title: 'The coefficient of viscosity (η) is a.',
          scaffold: { problem: 'A horizontal force of 0.02 N is required to move a glass plate of area 100 cm² at a constant velocity of 5 cm/s over a fixed glass plate.',
            steps: [
            { text: 'Identify given quantities with units: F = 0.02 N, A = 100 cm² = 100 × 10⁻⁴ m² = 0.01 m², v = 5 cm/s = 0.05 m/s, l = 0.2.' },
            { text: 'Write the formula for coefficient of viscosity: η = F l / (A v). Check units: N·m / (m²·m/s) = N·s/m² = Pa·s. Correct.' },
            { text: 'Substitute values: η = (0.02 × 2 × 10⁻⁴) / (0.01 × 0.05) = (4 × 10⁻⁶) / (5 × 10⁻⁴) = 0.8 × 10⁻² = 8 × 10⁻³ Pa·s.' },
            { text: 'Convert to poise: 1 Pa·s = 10 poise, so η = 8 × 10⁻³ × 10 = 0.08 poise.' },
            { text: 'Verify reasonableness: Castor oil viscosity at room temperature is ~0.8 Pa·s? Wait, typical value is ~0.95 Pa·s.', faded: true, blankAnswer: 'η = 8 × 10⁻³ Pa·s = 0.08 poise.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_011', title: 'Reynolds number (Re) is a dimensionless.',
          scaffold: { problem: 'Water at 20°C (ρ = 998 kg/m³, η = 1.002 × 10⁻³ Pa·s) flows through a copper pipe of inner diameter 15 mm at a volume flow rate of 2.5.',
            steps: [
            { text: 'Identify given quantities with units: ρ = 998 kg/m³, η = 1.002 × 10⁻³ Pa·s, D = 15 mm = 0.015 m, Q = 2.5 L/min = 2.5 ×.' },
            { text: 'Calculate cross-sectional area A = πD²/4 = π × (0.015)² / 4 = 1.767 × 10⁻⁴ m².' },
            { text: 'Calculate average velocity v = Q/A = (4.167 × 10⁻⁵) / (1.767 × 10⁻⁴) = 0.236 m/s.' },
            { text: 'Compute Reynolds number Re = ρvD/η = (998 × 0.236 × 0.015) / (1.002 × 10⁻³) = 3518.' },
            { text: 'Compare with regime boundaries: 2000 < 3518 < 4000 → transitional flow.' },
            { text: 'Verify physical reasonableness: Water in a 1.5 cm pipe at ~14 L/min is a typical household tap flow —.', faded: true, blankAnswer: 'Re ≈ 3520 (transitional flow, tending toward turbulent)' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_09_009', title: 'Identify each idea',
          dissect: { specimen: 'Viscosity Terminal Velocity', spots: [
            { id: 's1', label: 'Stokes Law states that the', prompt: 'Which idea is this? — Stokes\' Law states that the viscous drag force \\(F\\) on a small sphere of radius \\(a\\).', answer: 'Stokes Law states that the', options: ['Stokes Law states that the', 'The coefficient of viscosity', 'Reynolds number Re is a'] },
            { id: 's2', label: 'The coefficient of viscosity', prompt: 'Which idea is this? — The coefficient of viscosity (η) is a scalar physical quantity that measures a fluid\'s.', answer: 'The coefficient of viscosity', options: ['The coefficient of viscosity', 'Stokes Law states that the', 'Reynolds number Re is a'] },
            { id: 's3', label: 'Reynolds number Re is a', prompt: 'Which idea is this? — Reynolds number (Re) is a dimensionless quantity that predicts the flow regime of a fluid.', answer: 'Reynolds number Re is a', options: ['Reynolds number Re is a', 'Stokes Law states that the', 'The coefficient of viscosity'] }
          ] } }
    ],
    explore: { component: C11_PhysicsViscosityTerminalVelocitySim, prompt: 'Explore the interactive — Viscosity Terminal Velocity' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_010', difficulty: 'standard',
          question: 'Stokes\' Law states that the viscous drag force \\(F\\) on a small sphere of.',
          hint: 'Revisit c11_phy_cbse_09_009: focus on the velocity profile in a pipe (parabolic) and the.',
          misconception: 'Students believe Stokes\' Law (\\(F = 6\\pi\\eta a v\\)) applies to ALL objects falling through fluids, including skydivers,.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Terminal velocity formula has \\(g\\) in it, so if we do the experiment on the Moon where \\(g\\) is 1/6th, terminal velocity will also become.', answer: 'The reasoning is partially correct but incomplete',
                  options: ['The reasoning is partially correct but incomplete', 'exactly 1/6th'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Stokes\' Law (\\(F = 6\\pi\\eta a v\\)) applies to ALL objects falling through fluids, including skydivers, cars, or raindrops.' }
          ],
            remediations: { 'stokes-law-f-6-pi': { steps: ['If student applies Stokes\' Law blindly: (1) Have them compute Reynolds number Re = \\(\\frac{\\rho_{fluid} v a}{\\eta}\\).', '(2) Show that Re > 1 means turbulent flow — use the "cream in coffee" analogy: stir slowly (laminar, Stokes regime) vs.', '(3) Give a worked example: 1 mm steel ball in glycerine (Re ~ 0.01, valid) vs 1 cm ball in air (Re ~ 1000, invalid).', '(4) Make them redo the problem using the condition check as Step 0.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Stokes\' Law (\\(F = 6\\pi\\eta a v\\)) applies to ALL objects falling through fluids, including skydivers,.',
          parts: [
                { id: 'a', prompt: 'A student measures terminal velocity of a 2 mm radius glass bead (\\(\\rho = 2500\\) kg/m³) in a liquid of unknown viscosity. They get \\(v_t = 4.2\\) cm/s.', answer: 'The calculated viscosity is an OVERESTIMATE (incorrectly high)',
                  options: ['The calculated viscosity is an OVERESTIMATE (incorrectly high)', 'underestimate', 'no effect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Stokes\' Law (\\(F = 6\\pi\\eta a v\\)) applies to ALL objects falling through fluids, including skydivers, cars, or raindrops.' }
          ],
            remediations: { 'stokes-law-f-6-pi': { steps: ['If student applies Stokes\' Law blindly: (1) Have them compute Reynolds number Re = \\(\\frac{\\rho_{fluid} v a}{\\eta}\\).', '(2) Show that Re > 1 means turbulent flow — use the "cream in coffee" analogy: stir slowly (laminar, Stokes regime) vs.', '(3) Give a worked example: 1 mm steel ball in glycerine (Re ~ 0.01, valid) vs 1 cm ball in air (Re ~ 1000, invalid).', '(4) Make them redo the problem using the condition check as Step 0.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_009', difficulty: 'standard',
          question: 'The coefficient of viscosity (η) is a scalar physical quantity that measures a.',
          hint: 'If stuck on the formula η = Fl/(Av), review the definition of pressure.',
          misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of coefficient of viscosity and write its dimensional formula.', answer: 'SI unit: pascal-second (Pa·s) or N·s·m⁻²',
                  options: ['SI unit: pascal-second (Pa·s) or N·s·m⁻²', 'thickness', 'stickiness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.' },
                { id: 'b', prompt: 'Two identical horizontal plates of area 0.02 m² are separated by 2 mm of glycerine.', answer: 'η = Fl/(Av) = (0.5 × 0.002) / (0.02 × 0.1) = 0.5 Pa·s',
                  options: ['η = Fl/(Av) = (0.5 × 0.002) / (0.02 × 0.1) = 0.5 Pa·s', 'thickness', 'stickiness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.' },
                { id: 'c', prompt: 'A metal block of area 0.10 m² is connected to a 0.010 kg mass via a string over an ideal pulley.', answer: 'Step 1: Tension T = mg = 0.010 × 9.8 = 0.098 N',
                  options: ['Step 1: Tension T = mg = 0.010 × 9.8 = 0.098 N', 'thickness', 'stickiness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.' }
          ],
            remediations: { 'viscosity-is-thickness-or-stickiness': { steps: ['Revisit the molecular origin of viscosity: liquids — momentum transfer via intermolecular forces; gases — momentum.', 'Perform the "race" experiment: pour equal volumes of water, oil, and honey down a tilted tray.', 'Measure densities separately (mass/volume) to disprove density-viscosity correlation.', 'Derive the parabolic velocity profile for pipe flow from force balance on a cylindrical fluid element (requires.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Viscosity of a liquid decreases with temperature because molecules move faster and slip past each other more easily.', answer: 'The statement is essentially correct but incomplete',
                  options: ['The statement is essentially correct but incomplete', 'thickness', 'stickiness', 'viscosity is "thickness" or "stickiness" and confuse it with density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to compare the viscosities of cooking oil, water, and honey at room temperature.', answer: 'Use a tall transparent bottle (e.g., 1 L soda bottle) filled with each liquid',
                  options: ['Use a tall transparent bottle (e.g., 1 L soda bottle) filled with each liquid', 'thickness', 'stickiness', 'viscosity is "thickness" or "stickiness" and confuse it with density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think viscosity is "thickness" or "stickiness" and confuse it with density.' }
          ],
            remediations: { 'viscosity-is-thickness-or-stickiness': { steps: ['Revisit the molecular origin of viscosity: liquids — momentum transfer via intermolecular forces; gases — momentum.', 'Perform the "race" experiment: pour equal volumes of water, oil, and honey down a tilted tray.', 'Measure densities separately (mass/volume) to disprove density-viscosity correlation.', 'Derive the parabolic velocity profile for pipe flow from force balance on a cylindrical fluid element (requires.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_011', difficulty: 'standard',
          question: 'Reynolds number (Re) is a dimensionless quantity that predicts the flow regime.',
          hint: 'If stuck, revisit c11_phy_cbse_09_009 (Viscosity: Coefficient of Viscosity) — focus on.',
          misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of Reynolds number, and why is it dimensionless?', answer: 'Reynolds number has no SI unit',
                  options: ['Reynolds number has no SI unit', 'turbulent flow means fast flow', 'laminar flow means slow flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.' },
                { id: 'b', prompt: 'Water flows through a horizontal pipe of diameter 2.0 cm at 0.5 m/s.', answer: 'Reynolds number remains unchanged',
                  options: ['Reynolds number remains unchanged', 'stays same', 'doubles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.' },
                { id: 'c', prompt: 'Glycerine (density 1.26 × 10³ kg/m³, viscosity 0.83 Pa·s) flows through a horizontal tube of radius 1.0 cm.', answer: 'Given: ρ = 1.26 × 10³ kg/m³, η = 0.83 Pa·s, r = 0.01 m, ṁ = 4.0 × 10⁻³ kg/s',
                  options: ['Given: ρ = 1.26 × 10³ kg/m³, η = 0.83 Pa·s, r = 0.01 m, ṁ = 4.0 × 10⁻³ kg/s', 'turbulent flow means fast flow', 'laminar flow means slow flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.' }
          ],
            remediations: { 'turbulent-flow-means-fast-flow': { steps: ['If the student holds this misconception: (1) Have them calculate Re for honey (η ≈ 10 Pa·s, ρ ≈ 1400 kg/m³) at v = 0.1.', '(2) Calculate Re for water (η ≈ 10⁻³ Pa·s, ρ ≈ 1000 kg/m³) at same v, D → Re ≈ 1000 (laminar).', '(3) Increase water pipe diameter to 0.1 m → Re ≈ 10,000 (turbulent).', '(4) Emphasize: it is the COMBINATION ρvD/η that matters, not v alone.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since Reynolds number is dimensionless, its value is the same in SI and CGS units for the same physical flow." Evaluate this claim.', answer: 'The claim is TRUE',
                  options: ['The claim is TRUE', 'dimensionless', 'unitless but system-dependent', 'turbulent flow means fast flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "turbulent flow means fast flow" and "laminar flow means slow flow" in absolute terms.' }
          ],
            remediations: { 'turbulent-flow-means-fast-flow': { steps: ['If the student holds this misconception: (1) Have them calculate Re for honey (η ≈ 10 Pa·s, ρ ≈ 1400 kg/m³) at v = 0.1.', '(2) Calculate Re for water (η ≈ 10⁻³ Pa·s, ρ ≈ 1000 kg/m³) at same v, D → Re ≈ 1000 (laminar).', '(3) Increase water pipe diameter to 0.1 m → Re ≈ 10,000 (turbulent).', '(4) Emphasize: it is the COMBINATION ρvD/η that matters, not v alone.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
