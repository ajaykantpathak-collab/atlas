import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch06_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch06_p2: SimDef = {
    id: 'v3_c12_phy_ch06_p2',
    title: 'Electromagnetic Induction',
    subtitle: 'The discovery that powers the grid — motion becoming electricity.',
    classLevel: 12, subject: 'physics', topic: 'Electromagnetic Induction',
    chapters: ['c12_phy_ch06'],
    nodeIds: ['c12_phy_cbse_06_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a power-grid engineer designing a generator', intro: 'A city needs electricity that doesn\'t come from batteries. Your job: figure out how moving a magnet near a coil creates current from nothing.', goal: 'Predict when induction happens, which way current flows, and why changing flux is everything.' },
    discovery: {
        question: 'A magnet sits perfectly still inside a coil — nothing happens. Move it, and current flows. Where does the electricity come from?',
        options: ['The changing magnetic field — motion is the source', 'The magnet contains charge that jumps', 'The coil stores static from the air', 'Friction between magnet and coil'],
        answer: 'The changing magnetic field — motion is the source',
        hook: 'A still magnet creates nothing — induction needs change. It\'s not the field that generates current; it\'s the field CHANGING.',
    },
    teaching: [
        { title: 'Eddy Currents: Applications and Disadvantages', text: 'Eddy currents are circulating currents induced in bulk conductors (like metal plates, cores, or pipes) when they experience a changing magnetic flux, either due to a time-varying magnetic field.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_06_007', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'On the induction lab: move the magnet faster and slower — watch how the current tracks the RATE of change, not the position.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_007', title: 'Eddy Currents: Applications and Disadvantages',
          scaffold: { problem: 'A rectangular copper plate (length L = 0.2 m, width w = 0.1 m, thickness t = 2 mm) falls vertically through a uniform horizontal magnetic.',
            steps: [
            { text: 'Identify given quantities: B = 0.5 T, v = 2 m/s, L = 0.2 m, w = 0.1 m, t = 0.002 m, ρ = 1.7×10⁻⁸ Ω·m.' },
            { text: 'The motional emf across the width w is ε = B·w·v (since the vertical sides cut flux). ε = 0.5 × 0.1 × 2 = 0.1 V.' },
            { text: 'Resistance of the eddy current loop: path length l ≈ 2(L+w) = 2(0.2+0.1) = 0.6 m.' },
            { text: 'Eddy current I = ε/R = 0.1 / 5.1×10⁻⁵ ≈ 1960 A. (Large because copper\'s resistivity is very low.)' },
            { text: 'Magnetic damping force on the two vertical sides (length L) carrying current I: F = 2·B·I·L (forces on top/bottom.', faded: true, blankAnswer: 'Eddy current I ≈ 1960 A; Magnetic damping force F ≈ 392.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In an induction demo, a teammate proposes wiring the coil \'helpfully\': \'let the induced current\'s field pull the approaching magnet in — free acceleration, bigger emf.\'',
            decisions: [{ prompt: 'What does Lenz\'s law say that design would violate?', options: [
                { text: 'Energy conservation — an induced current can only oppose the flux change that created it; if it aided the magnet\'s approach, motion would generate current that generates motion — free energy — so the induced field must push back, not pull in.', outcome: 'The chapter\'s minus sign is physics, not convention: \'oppose the change\' is what makes you do mechanical work to induce a current — that\'s where the electrical energy comes from.' },
                { text: 'Nothing — induced current direction is a convention, so wire it whichever way helps.', outcome: 'The negative sign in Faraday\'s law encodes the direction, and it isn\'t negotiable: aiding the change would mean current without work — the law forbids it precisely so the energy audit closes.', reveals: 'direction-is-convention' },
                { text: 'It already opposes the field, so opposing the magnet\'s approach is the same thing.', outcome: 'Oppose the CHANGE, not the field — when the magnet recedes, the induced current builds a field in the same direction to resist the loss; opposing the field itself would flip direction mid-demo.', reveals: 'oppose-field-not-change' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_06_007', title: 'You made it',
          caseStudy: { intro: 'Faraday moved a magnet in a coil and lit the world — every generator in every dam, coal plant and wind farm is still running his experiment.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_007', difficulty: 'standard',
          question: 'Eddy currents are circulating currents induced in bulk conductors (like metal.',
          hint: 'If stuck, revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s.',
          misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with.',
          parts: [
                { id: 'a', prompt: 'An induction furnace uses a high-frequency alternating magnetic field (f = 10 kHz) to melt a cylindrical iron ingot (radius r = 5 cm, height h = 20.', answer: 'Given: B₀ = 0.5 T, f = 10⁴ Hz, r = 0.05 m, ρ = 10⁻⁷ Ω·m',
                  options: ['Given: B₀ = 0.5 T, f = 10⁴ Hz, r = 0.05 m, ρ = 10⁻⁷ Ω·m', 'more insulation'],
                  hint: 'If stuck, revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law).',
                  misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with transformer cores.' }
          ],
            remediations: { 'eddy-currents-only-occur-in': { steps: ['If the student confuses eddy currents with induced current in a coil: Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and.', 'Then, replace the coil with a solid aluminum plate and observe the damping (no galvanometer needed).', 'If the student cannot apply Lenz\'s law to bulk conductors: Use the "pendulum in magnet" demo (c12_phy_cbse_06_003.', 'If the student thinks laminations work by "adding insulation": Calculate the resistance of a solid core vs.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a transformer, eddy currents are completely eliminated by using a laminated core." Evaluate this statement and correct it if necessary.', answer: 'The statement is false',
                  options: ['The statement is false', 'more insulation'],
                  hint: 'If stuck, revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law).',
                  misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with transformer cores.' }
          ],
            remediations: { 'eddy-currents-only-occur-in': { steps: ['If the student confuses eddy currents with induced current in a coil: Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and.', 'Then, replace the coil with a solid aluminum plate and observe the damping (no galvanometer needed).', 'If the student cannot apply Lenz\'s law to bulk conductors: Use the "pendulum in magnet" demo (c12_phy_cbse_06_003.', 'If the student thinks laminations work by "adding insulation": Calculate the resistance of a solid core vs.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
