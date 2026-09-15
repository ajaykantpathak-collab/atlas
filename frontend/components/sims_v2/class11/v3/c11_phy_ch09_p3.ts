import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch09_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch09_p3: SimDef = {
    id: 'v3_c11_phy_ch09_p3',
    title: 'Mechanical Properties of Fluids · Part 3/3',
    subtitle: 'Discover that the hydraulic lift trades distance for force, not energy for nothing.',
    classLevel: 11, subject: 'physics', topic: 'Mechanical Properties of Fluids · Part 3/3',
    chapters: ['c11_phy_ch09'],
    nodeIds: ['c11_phy_cbse_09_013', 'c11_phy_cbse_09_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mechanic questioning a too-good force multiplier', intro: 'One thumb on a narrow piston lifts a 1500 kg car — the fluid transmitted pressure, but it kept the energy ledger balanced.', goal: 'Define fluid pressure as scalar, apply Pascal\'s law, and spot the energy limit on force multiplication.' },
    discovery: {
        question: 'A hydraulic press: 50 N on 2 cm² lifts 5000 N on 200 cm². So keep enlarging the piston and lift anything for free?',
        options: ['No — pressure transmits equally but energy doesn\'t multiply; the big piston rises only a fraction as far', 'Yes — area ratio is free force', 'Yes — Pascal\'s law guarantees it', 'No — fluid pressure has a maximum of 1 atm'],
        answer: 'No — pressure transmits equally but energy doesn\'t multiply; the big piston rises only a fraction as far',
        hook: 'Pressure has no direction — the force it exerts is normal to the wall, but pressure itself is a scalar at a point, and \'same pressure\' only holds at the same depth.',
    },
    teaching: [
        { title: 'Capillary Rise: Ascent Formula', text: 'Capillary rise is the phenomenon where a liquid ascends or descends in a narrow tube (capillary) due to the pressure difference across a curved meniscus caused by surface tension.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_09_013', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Push a drawing pin to feel force-per-area, verify 76 cm Hg against 1.013 × 10⁵ Pa, then expose the free-lunch flaw in the ever-bigger piston.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_014', title: 'Angle of Contact and Shape of Meniscus',
          scaffold: { problem: 'Water (surface tension = 0.072 N/m, density = 1000 kg/m³) rises in a clean glass capillary of radius 0.1 mm to a height of 5.0 cm.',
            steps: [
            { text: 'Identify given: S_la = 0.072 N/m, ρ = 1000 kg/m³, r = 0.1 mm = 1.0×10⁻⁴ m, h = 5.0 cm = 0.050 m, g = 9.8 m/s². Find θ.' },
            { text: 'Use capillary rise formula: h = (2 S_la cos θ) / (ρ g r). Rearrange for cos θ: cos θ = (h ρ g r) / (2 S_la).' },
            { text: 'Substitute values with units: cos θ = (0.050 × 1000 × 9.8 × 1.0×10⁻⁴) / (2 × 0.072) = (0.049) / (0.144) = 0.3403.' },
            { text: 'Compute θ = cos⁻¹(0.3403) ≈ 70.1°. Check: θ < 90°, acute, consistent with water wetting glass.' },
            { text: 'Verify units: (m × kg/m³ × m/s² × m) / (N/m) = (kg·m/s²) / (N) = N/N = dimensionless.', faded: true, blankAnswer: 'θ ≈ 70° (acute angle)' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a hydraulic lift, a student claims: \'Pressure at the top piston equals pressure at the cylinder\'s bottom — Pascal\'s law says pressure is same everywhere. And pressure pushes downward, so the wall pressure differs from the floor pressure.\'',
            decisions: [{ prompt: 'What do pressure and Pascal\'s law actually say?', options: [
                { text: 'Add the missing condition and fix the direction: Pascal\'s law transmits an APPLIED pressure change undiminished, but equality holds only at the same depth — the fluid\'s own weight adds ρgh with depth, so the bottom exceeds the top. And pressure is a scalar: it exerts force normal to whatever surface it meets — floor, wall or piston alike.', outcome: 'He sees the lift correctly: F₁/A₁ = F₂/A₂ works because transmitted pressure is equal at equal depth — the depth gradient is separate hydrostatics.' },
                { text: 'Keep \'same everywhere\' — that\'s what transmission undiminished means.', outcome: 'Transmission applies to the applied pressure change; the ρgh term from the fluid\'s weight still stacks with depth — the two effects are separate.', reveals: 'pressure-same-everywhere' },
                { text: 'Keep \'pressure pushes down\' — gravity gives pressure its direction.', outcome: 'Pressure has no direction; the force it exerts is always normal to the surface — that\'s why walls and floors at equal depth feel equal pressure.', reveals: 'pressure-has-direction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_09_014', title: 'You made it',
          caseStudy: { intro: 'F₁/A₁ = F₂/A₂ buys force with distance — the small piston travels far so the big one barely moves; no energy is created.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_013', difficulty: 'standard',
          question: 'Capillary rise is the phenomenon where a liquid ascends or descends in a narrow.',
          hint: 'Revisit the derivation of excess pressure for a spherical surface (Surface Tension node).',
          misconception: '**Misconception:** "Capillary rise depends on the *length* of the tube immersed in the liquid or the *total length*.',
          parts: [
                { id: 'a', prompt: 'Water rises in a clean glass capillary tube, but mercury falls in the same tube.', answer: 'For water-glass, \\( \\theta \\approx 0^\\circ \\) (acute), so \\( \\cos\\theta > 0 \\)',
                  options: ['For water-glass, \\( \\theta \\approx 0^\\circ \\) (acute), so \\( \\cos\\theta > 0 \\)', 'mercury is heavier so it falls'],
                  hint: 'Revisit the derivation of excess pressure for a spherical surface (Surface Tension node) and the.',
                  misconception: '**Misconception:** "Capillary rise depends on the *length* of the tube immersed in the liquid or the *total length* of the tube." **Wrong.' }
          ],
            remediations: { 'misconception-capillary-rise-depends-on': { steps: ['If a student believes tube length matters: (1) Perform a demo with two tubes of same radius but different lengths.', 'Show the water rises to the *same height* in both.', '(2) Derive the formula again from force balance: Upward force = \\( 2\\pi r S \\cos\\theta \\) (acts only at the contact.', 'Downward force = weight of column = \\( \\pi r^2 h \\rho g \\).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_014', difficulty: 'standard',
          question: 'The angle of contact (θ) is the angle measured inside the liquid between the.',
          hint: 'If stuck, review c11_phy_cbse_09_012 (Surface Tension and Surface Energy) for the.',
          misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the.',
          parts: [
                { id: 'a', prompt: 'Using Young\'s equation (S_la cos θ = S_sa - S_sl), explain why a liquid with θ > 90° does not wet the solid surface.', answer: 'For θ > 90°, cos θ is negative, so S_sa - S_sl < 0 → S_sl > S_sa',
                  options: ['For θ > 90°, cos θ is negative, so S_sa - S_sl < 0 → S_sl > S_sa', 'θ > 90° means non-wetting', 'the angle of contact is the angle the meniscus makes with the horizontal (i'],
                  hint: 'If stuck, review c11_phy_cbse_09_012 (Surface Tension and Surface Energy) for the definition and.',
                  misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the curved surface at the.' },
                { id: 'b', prompt: 'Two liquids A and B have the same surface tension (0.05 N/m) but different contact angles on the same solid: θ_A = 30°, θ_B = 120°.', answer: 'Step 1: Capillary height h = (2 S cos θ) / (ρ g r)',
                  options: ['Step 1: Capillary height h = (2 S cos θ) / (ρ g r)', 'the angle of contact is the angle the meniscus makes with the horizontal (i'],
                  hint: 'If stuck, review c11_phy_cbse_09_012 (Surface Tension and Surface Energy) for the definition and.',
                  misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the curved surface at the.' }
          ],
            remediations: { 'the-angle-of-contact-is': { steps: ['Re-draw the three-phase boundary diagram: solid horizontal line, liquid-air interface meeting it.', 'Mark the tangent at the contact point.', 'Use a protractor to measure the angle inside the liquid – that is θ.', 'Practice with two extreme cases: water on clean glass (θ ≈ 0°, tangent almost vertical) and mercury on glass (θ ≈ 140°.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we increase the temperature of water in a glass capillary, the contact angle will decrease because surface tension decreases." Evaluate.', answer: 'The statement is NOT necessarily true',
                  options: ['The statement is NOT necessarily true', 'the angle of contact is the angle the meniscus makes with the horizontal (i'],
                  hint: 'If stuck, review c11_phy_cbse_09_012 (Surface Tension and Surface Energy) for the definition and.',
                  misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the curved surface at the.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that the angle of contact for water on a clean glass surface is acute, while for mercury it.', answer: 'Procedure: (1) Take a clean glass beaker and a small test tube',
                  options: ['Procedure: (1) Take a clean glass beaker and a small test tube', 'the angle of contact is the angle the meniscus makes with the horizontal (i'],
                  hint: 'If stuck, review c11_phy_cbse_09_012 (Surface Tension and Surface Energy) for the definition and.',
                  misconception: 'Students often think the angle of contact is the angle the meniscus makes with the horizontal (i.e., the slope of the curved surface at the.' }
          ],
            remediations: { 'the-angle-of-contact-is': { steps: ['Re-draw the three-phase boundary diagram: solid horizontal line, liquid-air interface meeting it.', 'Mark the tangent at the contact point.', 'Use a protractor to measure the angle inside the liquid – that is θ.', 'Practice with two extreme cases: water on clean glass (θ ≈ 0°, tangent almost vertical) and mercury on glass (θ ≈ 140°.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
