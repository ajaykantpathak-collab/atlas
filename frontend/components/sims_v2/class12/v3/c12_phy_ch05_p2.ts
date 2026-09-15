import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch05_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch05_p2: SimDef = {
    id: 'v3_c12_phy_ch05_p2',
    title: 'Magnetism and Matter · Part 2/2',
    subtitle: 'You can\'t cut a magnet down to one pole',
    classLevel: 12, subject: 'physics', topic: 'Magnetism and Matter · Part 2/2',
    chapters: ['c12_phy_ch05'],
    nodeIds: ['c12_phy_cbse_05_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Magnetic-field mapper', intro: 'Iron filings draw the pattern; the physics says the lines never start or stop — they loop through the magnet itself.', goal: 'Read bar-magnet field lines and dipole behaviour — closed loops, torque and potential energy.' },
    discovery: {
        question: 'Cut a bar magnet in half to isolate its north pole — and you get two complete dipoles instead. What does that refusal tell you?',
        options: ['Magnetic field lines are closed loops — they continue S→N inside the magnet, so no isolated pole can ever exist', 'The cut was uneven', 'Poles hide inside', 'Iron is stubborn'],
        answer: 'Magnetic field lines are closed loops — they continue S→N inside the magnet, so no isolated pole can ever exist',
        hook: 'Field lines aren\'t lines of force — the magnetic force is qv×B, perpendicular to the line. And two lines crossing would mean B has two directions at one point: impossible. Crowding shows strength; tangents show direction.',
    },
    teaching: [
        { title: 'Hysteresis Curve and Magnetic Susceptibility', text: 'Magnetic susceptibility (χ) is a dimensionless measure of how much a material becomes magnetised in response to an applied magnetic field H, defined as χ = M/H where M is the magnetisation (magnetic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_05_007', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'Map a magnet honestly: sketch the closed loops inside and out, place a dipole in a field and compute both torque (mB sinθ) and energy (−mB cosθ) without swapping them.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_007', title: 'Hysteresis Curve and Magnetic Susceptibility',
          scaffold: { problem: 'A transformer core made of silicon steel is subjected to an alternating magnetic field of frequency 50 Hz.',
            steps: [
            { text: 'Identify given: loop area = energy loss per cycle per unit volume = 250 J/m³; frequency f = 50 Hz; core volume.' },
            { text: 'Recall formula: Power loss per unit volume = (energy loss per cycle per unit volume) × frequency = (∮ H dB) × f.' },
            { text: 'Compute power loss per unit volume = 250 J/m³ × 50 s⁻¹ = 12,500 W/m³.' },
            { text: 'Total hysteresis loss = power loss per unit volume × volume = 12,500 W/m³ × 0.002 m³ = 25 W.' },
            { text: 'Verify units: J/m³ × Hz = J/(m³·s) = W/m³; W/m³ × m³ = W. Physically reasonable: a small transformer core losing 25.', faded: true, blankAnswer: 'Hysteresis power loss per unit volume = 12.5 kW/m³; Total.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Calibrating a magnetometer, a junior notes the needle settles aligned with the field, then tries to \'park it backwards — anti-aligned is also an equilibrium, so it should hold.\'',
            decisions: [{ prompt: 'What does U = −m·B predict?', options: [
                { text: 'Anti-aligned is the unstable equilibrium — U is maximum at θ = 180°, so the tiniest nudge produces a torque that swings it further off; only the aligned position (minimum U) restores after disturbance.', outcome: 'The chapter\'s map: same alignment axis, opposite stability — balanced and balanced-against are both equilibria, but only one survives contact with reality.' },
                { text: 'He\'s right — torque is zero at both 0° and 180°, so both hold.', outcome: 'Zero torque names equilibrium, not stability — the energy curve separates them: minimum at 0° restores, maximum at 180° amplifies any nudge into a swing.', reveals: 'zero-torque-equals-stable' },
                { text: 'Neither holds — a needle in a field always keeps oscillating.', outcome: 'Compasses do settle — at the potential minimum; oscillation is what happens on the way there, not the endpoint the physics predicts.', reveals: 'equilibrium-never-settles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_05_007', title: 'You made it',
          caseStudy: { intro: 'You can now read field lines as a vector field\'s portrait — loops that never end, density that means strength.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_007', difficulty: 'standard',
          question: 'Magnetic susceptibility (χ) is a dimensionless measure of how much a material.',
          hint: 'Revisit c12_phy_cbse_05_005 for M, H, χ definitions and the classification table (Table.',
          misconception: 'Students often think the hysteresis loop area represents power loss (watts) rather than energy loss per cycle per unit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Magnetic susceptibility (χ) is a dimensionless measure of how much a material becomes',
                  options: ['Magnetic susceptibility (χ) is a dimensionless measure of how much a material becomes', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Magnetic dipole moment (𝐦) is a vector quantity that characterizes the magnetic strength', 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg'],
                  hint: 'Revisit c12_phy_cbse_05_005 for M, H, χ definitions and the classification table (Table 5.2.',
                  misconception: 'Students often think the hysteresis loop area represents power loss (watts) rather than energy loss per cycle per unit volume (joules/m³).' }
          ],
            remediations: { 'the-hysteresis-loop-area-represents': { steps: ['If the student confuses hysteresis loss units or misidentifies loop parameters: 1.', 'Revisit node c12_phy_cbse_05_005 to review M, H, B definitions and the classification of magnetic materials.', 'Draw a large B-H loop on graph paper; label B_r, H_c, B_sat.', 'Physically trace the loop with a finger while saying "magnetising → saturation → demagnetising → reverse saturation →.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the hysteresis loop area represents power loss (watts) rather than energy loss per cycle per unit.',
          parts: [
                { id: 'a', prompt: 'A student calculates the hysteresis loss per cycle per unit volume for a material by measuring the area of its M-H loop (instead of B-H loop) and multiplying.', answer: 'Incorrect',
                  options: ['Incorrect', 'area of M-H loop directly gives energy loss'],
                  hint: 'Revisit c12_phy_cbse_05_005 for M, H, χ definitions and the classification table (Table 5.2.',
                  misconception: 'Students often think the hysteresis loop area represents power loss (watts) rather than energy loss per cycle per unit volume (joules/m³).' }
          ],
            remediations: { 'the-hysteresis-loop-area-represents': { steps: ['If the student confuses hysteresis loss units or misidentifies loop parameters: 1.', 'Revisit node c12_phy_cbse_05_005 to review M, H, B definitions and the classification of magnetic materials.', 'Draw a large B-H loop on graph paper; label B_r, H_c, B_sat.', 'Physically trace the loop with a finger while saying "magnetising → saturation → demagnetising → reverse saturation →.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
