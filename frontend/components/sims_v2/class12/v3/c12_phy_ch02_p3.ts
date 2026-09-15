import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch02_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch02_p3: SimDef = {
    id: 'v3_c12_phy_ch02_p3',
    title: 'Electrostatic Potential and Capacitance · Part 3/3',
    subtitle: 'Move it slowly or the number isn\'t potential',
    classLevel: 12, subject: 'physics', topic: 'Electrostatic Potential and Capacitance · Part 3/3',
    chapters: ['c12_phy_ch02'],
    nodeIds: ['c12_phy_cbse_02_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field measurer', intro: 'Like a porter lifting a suitcase onto a shelf — the work per kilogram is gravitational potential; per coulomb, it\'s volts.', goal: 'Define electrostatic potential operationally — V = W/q, scalar, measured against infinity.' },
    discovery: {
        question: 'Why does a bird sitting on a high-voltage wire survive unharmed?',
        options: ['No potential difference exists across its body', 'Its feathers insulate it', 'The current takes the wire instead', 'Birds are immune to electricity'],
        answer: 'No potential difference exists across its body',
        hook: 'It is not voltage that hurts — it is voltage *difference*. That distinction is this whole chapter.',
    },
    teaching: [
        { title: 'Van de Graaff Generator: Principle and Working', text: 'A Van de Graaff generator is an electrostatic device that uses a moving insulating belt to continuously transport charge to a large hollow spherical conductor, building up very high potentials.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_02_013', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Define potential the operational way: work per unit charge from infinity, no acceleration allowed; then read field direction as the direction potential falls, not \'flows.\'',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_013', title: 'Van de Graaff Generator: Principle and Working',
          scaffold: { problem: 'A Van de Graaff generator in a school laboratory has a spherical dome of radius 30 cm. The dielectric strength of air is 3 × 10⁶ V/m.',
            steps: [
            { text: 'Identify given: R = 0.30 m, E_breakdown = 3 × 10⁶ V/m, ε₀ = 8.85 × 10⁻¹² C²/N·m². Find: V_max, Q, U.' },
            { text: 'Use V_max = E_breakdown × R for (a). Substitute: V_max = (3 × 10⁶ V/m) × (0.30 m) = 9 × 10⁵ V = 900 kV.' },
            { text: 'For (b), use Q = 4πε₀R V_max. Substitute: Q = 4π(8.85 × 10⁻¹²)(0.30)(9 × 10⁵) = 3.0 × 10⁻⁵ C = 30 μC.' },
            { text: 'For (c), use U = ½ Q V_max = ½ (3.0 × 10⁻⁵)(9 × 10⁵) = 13.5 J. Alternatively U = ½ C V² with C = 4πε₀R.' },
            { text: 'Verify: 900 kV on 30 cm sphere is realistic for a demo generator; 30 μC and 13.5 J are reasonable energies.', faded: true, blankAnswer: '(a) 9 × 10⁵ V (900 kV), (b) 3.0 × 10⁻⁵ C (30 μC), (c) 13.5 J' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab report asks for the total potential at a point near two charges, +5 μC and −3 μC. Your teammate adds the magnitudes: \'field arrows point, so potential must point too — and negatives just mean weaker.\'',
            decisions: [{ prompt: 'How do you correct the method?', options: [
                { text: 'Potential is a scalar — it\'s work per unit charge, so you add signed values algebraically: +5 μC contributes +V₁, −3 μC contributes −V₂, and the total is the difference, not the sum of magnitudes.', outcome: 'The chapter\'s key contrast: field is a vector and potential is the scalar it descends from — a negative source charge lowers potential exactly the way a debt lowers a balance.' },
                { text: 'He\'s right — anything derived from a force law is a vector by inheritance.', outcome: 'That reverses the relationship — the field is the gradient OF the scalar potential; work is force dotted with displacement, a scalar, so V can only add with signs, never arrows.', reveals: 'potential-is-a-vector' },
                { text: 'Drop the negative charge\'s contribution — potential counts only positive sources.', outcome: 'Negative charges contribute negative potential — erasing V₂ changes the answer as surely as erasing the charge would change the experiment; superposition is algebraic, not optimistic.', reveals: 'ignore-negative-sources' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_02_013', title: 'You made it',
          caseStudy: { intro: 'Potential, capacitance, stored energy — you now think in terms of difference, not absolute charge. That is the mental shift this chapter demands.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_013', difficulty: 'standard',
          question: 'A Van de Graaff generator is an electrostatic device that uses a moving.',
          hint: 'If stuck, revisit c12_phy_cbse_02_007 (Conductors and Insulators) for the shielding.',
          misconception: 'Students often believe the Van de Graaff generator\'s high voltage comes from the belt acting like a capacitor.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Van de Graaff generator is an electrostatic device that uses a moving insulating belt',
                  options: ['A Van de Graaff generator is an electrostatic device that uses a moving insulating belt', 'Electrostatic potential at a point in an electric field is the work done by an external', 'The electrostatic potential at a point due to a point charge Q is the work done per unit', 'The electrostatic potential at a point due to an electric dipole is the work done per'],
                  hint: 'If stuck, revisit c12_phy_cbse_02_007 (Conductors and Insulators) for the shielding property, and.',
                  misconception: 'Students often believe the Van de Graaff generator\'s high voltage comes from the belt acting like a capacitor dielectric or from "static.' }
          ],
            remediations: { 'the-van-de-graaff-generator': { steps: ['If the student holds the capacitor misconception: (1) Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to review.', '(2) Revisit c12_phy_cbse_02_002 (Potential Due to Point Charge) to recalculate V = kQ/R for a 1 m sphere with 1 μC.', 'a 1 mm gap capacitor with same charge (much higher field, but tiny capacitance).', '(3) Re-diagnostic: Ask "If the belt were a capacitor dielectric, why would making the sphere larger increase the.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Van de Graaff generator\'s high voltage comes from the belt acting like a capacitor.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Van de Graaff generator works like a capacitor — the belt acts as a dielectric between the two combs." Evaluate this statement.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'static electricity buildup'],
                  hint: 'If stuck, revisit c12_phy_cbse_02_007 (Conductors and Insulators) for the shielding property, and.',
                  misconception: 'Students often believe the Van de Graaff generator\'s high voltage comes from the belt acting like a capacitor dielectric or from "static.' }
          ],
            remediations: { 'the-van-de-graaff-generator': { steps: ['If the student holds the capacitor misconception: (1) Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to review.', '(2) Revisit c12_phy_cbse_02_002 (Potential Due to Point Charge) to recalculate V = kQ/R for a 1 m sphere with 1 μC.', 'a 1 mm gap capacitor with same charge (much higher field, but tiny capacitance).', '(3) Re-diagnostic: Ask "If the belt were a capacitor dielectric, why would making the sphere larger increase the.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
