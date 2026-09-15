import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch05_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch05_p3: SimDef = {
    id: 'v3_c11_chem_ch05_p3',
    title: 'States of Matter · Part 3/3',
    subtitle: 'Separate London, dipole-dipole and hydrogen-bond contributions and predict who boils first.',
    classLevel: 11, subject: 'chemistry', topic: 'States of Matter · Part 3/3',
    chapters: ['c11_chem_ch05'],
    nodeIds: ['c11_chem_cbse_05_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physical chemist explaining anomalous boiling points', intro: 'A gecko walks up glass and iodine leaps straight to vapour — name the invisible grip behind both.', goal: 'Distinguish London dispersion from dipole-dipole forces and use polarizability to predict boiling trends.' },
    discovery: {
        question: 'Nonpolar iodine (I2) boils at 184°C while polar HCl boils at -85°C. If dipole-dipole forces always beat London forces, this is backwards. What actually decides it?',
        options: ['I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces', 'HCl\'s dipole is too weak to matter at any temperature', 'Iodine secretly hydrogen-bonds like water does', 'Molar mass directly sets boiling point regardless of forces'],
        answer: 'I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces',
        hook: 'Every molecule has London forces — a permanent dipole is a bonus on top, and a big electron cloud can outmuscle polarity.',
    },
    teaching: [
        { title: 'Liquid State: Surface Tension and Viscosity', text: 'Surface tension is the force per unit length acting perpendicular to a line drawn on the liquid surface (or energy per unit area required to increase the surface area), arising from unbalanced.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_05_013', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Rank the Group 14 hydrides by boiling point using polarizability, then explain why nonpolar I2 outboils polar HCl.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_013', title: 'Liquid State: Surface Tension and Viscosity',
          scaffold: { problem: 'A capillary tube of radius 0.15 mm is dipped in a liquid of density 850 kg/m³. The liquid rises to a height of 4.2 cm.',
            steps: [
            { text: 'Identify knowns: r = 0.15 mm = 1.5 × 10⁻⁴ m, ρ = 850 kg/m³, h = 4.2 cm = 0.042 m, θ = 15°, g = 9.8 m/s². Unknown: γ.' },
            { text: 'Use capillary rise formula: h = 2γcosθ / rρg. Rearrange for γ: γ = h·r·ρ·g / (2cosθ).' },
            { text: 'Substitute values: γ = (0.042 × 1.5×10⁻⁴ × 850 × 9.8) / (2 × cos15°). cos15° = 0.9659.' },
            { text: 'Calculate numerator: 0.042 × 1.5×10⁻⁴ = 6.3×10⁻⁶; × 850 = 5.355×10⁻³; × 9.8 = 0.052479.' },
            { text: 'For spherical droplet, excess pressure ΔP = 2γ/r_droplet. r_droplet = 1.0 mm = 1.0×10⁻³ m.' },
            { text: 'Verify units: γ in N/m, ΔP in N/m² = Pa. Result is physically plausible (γ between organic liquids and water; ΔP small.', faded: true, blankAnswer: 'Surface tension = 0.0272 N/m (27.2 mN/m); Excess pressure.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-fair demo on \'why some liquids evaporate faster\', you place equal drops of water, acetone and hexane on a glass plate and time them. Your partner predicts the order purely by molecular weight: \'Water is lightest, so it vanishes first; and all intermolecular attraction is just London dispersion anyway.\'',
            decisions: [{ prompt: 'What order will you actually observe, and which forces explain it?', options: [
                { text: 'Hexane evaporates first, then acetone, then water: hexane (nonpolar) has only London dispersion; acetone adds dipole-dipole attraction; water\'s hydrogen bonding is strongest. Van der Waals forces are a family — London, dipole-dipole, dipole-induced — and hydrogen bonding is a stronger, separate category requiring H bonded to N/O/F.', outcome: 'Evaporation rate reads intermolecular-force strength, not molar mass — water is light but H-bonded hard.' },
                { text: 'Water first — lowest molar mass means molecules escape easiest; all three liquids share the same London forces.', outcome: 'That ignores the force ladder: water\'s hydrogen bonds hold it back while nonpolar hexane escapes first despite being the heaviest molecule.', reveals: 'lighter-evaporates-first' },
                { text: 'The order is random — intermolecular forces are all \'van der Waals\' and too weak to matter.', outcome: 'Weak is relative: dispersion, dipole and hydrogen-bonding differences are exactly what boiling points and evaporation rates measure.', reveals: 'intermolecular-forces-negligible' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_013', title: 'You made it',
          caseStudy: { intro: 'Intermolecular attraction isn\'t a loyalty test — the biggest, most distortable electron cloud usually wins.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_013', difficulty: 'standard',
          question: 'Surface tension is the force per unit length acting perpendicular to a line.',
          hint: 'If stuck, revisit c11_chem_cbse_05_003 (hydrogen bonding) for why water has anomalously.',
          misconception: 'Students often confuse surface tension and viscosity as "the same property" because both arise from intermolecular.',
          parts: [
                { id: 'a', prompt: 'Two liquids A and B have the same molar mass (60 g/mol) but different intermolecular forces: A has only London dispersion forces, while B has hydrogen bonding.', answer: 'Both properties are higher for B',
                  options: ['Both properties are higher for B', 'the same property'],
                  hint: 'If stuck, revisit c11_chem_cbse_05_003 (hydrogen bonding) for why water has anomalously high γ and.',
                  misconception: 'Students often confuse surface tension and viscosity as "the same property" because both arise from intermolecular forces, leading.' }
          ],
            remediations: { 'students-often-confuse-surface-tension': { steps: ['If a student conflates surface tension and viscosity: Step 1 - Perform the "coin float" experiment: gently place.', 'drop it in honey (sinks slowly due to viscosity).', 'Step 2 - Measure capillary rise of water (high γ, low η) and honey (moderate γ, very high η) in identical tubes - water.', 'Step 3 - Plot γ vs T and η vs T for water using literature data - show γ(T) is nearly linear while ln η vs 1/T.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse surface tension and viscosity as "the same property" because both arise from intermolecular.',
          parts: [
                { id: 'a', prompt: 'A soap bubble of radius 2.0 cm is formed in air. The surface tension of the soap solution is 0.030 N/m. Calculate the excess pressure inside the bubble.', answer: 'For a soap bubble (two surfaces): ΔP = 4γ/r = 4(0.030)/(0.020) = 6.0 Pa',
                  options: ['For a soap bubble (two surfaces): ΔP = 4γ/r = 4(0.030)/(0.020) = 6.0 Pa', 'the same property'],
                  hint: 'If stuck, revisit c11_chem_cbse_05_003 (hydrogen bonding) for why water has anomalously high γ and.',
                  misconception: 'Students often confuse surface tension and viscosity as "the same property" because both arise from intermolecular forces, leading.' }
          ],
            remediations: { 'students-often-confuse-surface-tension': { steps: ['If a student conflates surface tension and viscosity: Step 1 - Perform the "coin float" experiment: gently place.', 'drop it in honey (sinks slowly due to viscosity).', 'Step 2 - Measure capillary rise of water (high γ, low η) and honey (moderate γ, very high η) in identical tubes - water.', 'Step 3 - Plot γ vs T and η vs T for water using literature data - show γ(T) is nearly linear while ln η vs 1/T.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
