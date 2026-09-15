import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch07_p3: SimDef = {
    id: 'v3_c11_chem_ch07_p3',
    title: 'Equilibrium · Part 3/3',
    subtitle: 'See why equilibrium means equal rates — and why Kc ignores concentration shoves.',
    classLevel: 11, subject: 'chemistry', topic: 'Equilibrium · Part 3/3',
    chapters: ['c11_chem_ch07'],
    nodeIds: ['c11_chem_cbse_07_013', 'c11_chem_cbse_07_014', 'c11_chem_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reaction engineer steering a reversible process', intro: 'The reaction looks finished; the molecules disagree. Prove the traffic still runs both ways.', goal: 'Describe dynamic equilibrium and distinguish the equilibrium position from the equilibrium constant.' },
    discovery: {
        question: 'A sealed bottle of soda never \'finishes\' reacting — the reaction just seems to stop. What is really happening?',
        options: ['Forward and reverse reactions run at equal rates', 'All reactants are used up', 'The catalyst deactivates', 'Temperature drops to zero reaction'],
        answer: 'Forward and reverse reactions run at equal rates',
        hook: 'Equilibrium is not stillness — it is two rivers flowing in opposite directions at exactly the same speed.',
    },
    teaching: [
        { title: 'Buffer Solutions: Acidic and Basic', text: 'A buffer solution is a system that resists changes in pH upon addition of small amounts of strong acid or strong base, or upon dilution.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_07_013', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Add more reactant — which way does the balance shift?',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_013', title: 'Buffer Solutions: Acidic and Basic',
          scaffold: { problem: 'A biochemist needs to prepare 1.0 L of an acetate buffer of pH 5.20.',
            steps: [
            { text: 'Use Henderson-Hasselbalch to find required ratio: 5.20 = 4.74 + log([salt]/[acid]) → log([salt]/[acid]) = 0.46 →.' },
            { text: 'Let Vₐ = volume of 1.0 M acid used (in L). Then moles acid = Vₐ × 1.0 = Vₐ mol.' },
            { text: 'The acid and salt together make 1 L. The salt is solid, so its volume is negligible. Thus Vₐ ≈ 1.0 L?' },
            { text: 'Ratio = [salt]/[acid] = (moles salt / 1.0) / Vₐ = 2.884 → moles salt = 2.884 Vₐ.' },
            { text: 'Procedure: Pipette 100 mL of 1.0 M CH₃COOH into a 1 L volumetric flask.', faded: true, blankAnswer: 'Use 100 mL of 1.0 M CH₃COOH and 39.2 g of CH₃COONa·3H₂O.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_014', title: 'Solubility Product: Ksp and Common Ion Effect',
          scaffold: { problem: 'The molar solubility of lead(II) iodide (PbI₂) in pure water at 298 K is 1.3 × 10⁻³ mol L⁻¹. Calculate its Ksp.',
            steps: [
            { text: 'Write the balanced dissolution equation for PbI₂: PbI₂(s) ⇌ Pb²⁺(aq) + 2I⁻(aq).' },
            { text: 'Write the Ksp expression: Ksp = [Pb²⁺][I⁻]².' },
            { text: 'In pure water, let molar solubility = s. Then [Pb²⁺] = s, [I⁻] = 2s. Substitute into Ksp: Ksp = s(2s)² = 4s³.' },
            { text: 'In 0.10 M KI, common ion I⁻ is present. Initial [I⁻] = 0.10 M. Let new solubility = s\'.' },
            { text: 'Verify approximation: 2s\' = 1.76×10⁻⁶ << 0.10, valid. Interpret: Solubility decreases from 1.3×10⁻³ M to 8.8×10⁻⁷ M,.', faded: true, blankAnswer: 'Ksp = 8.8 × 10⁻⁹ (dimensionless, but effectively M³). Molar.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_015', title: 'Hydrolysis of Salts: pH of Salt Solutions',
          scaffold: { problem: 'Calculate the pH of 0.02 M sodium benzoate (C₆H₅COONa) solution. Given: Ka(benzoic acid) = 6.3 × 10⁻⁵, Kw = 1.0 × 10⁻¹⁴ at 298 K.',
            steps: [
            { text: 'Identify salt type - sodium benzoate is salt of weak acid (benzoic acid) and strong base (NaOH) → anionic hydrolysis.' },
            { text: 'Write hydrolysis equilibrium: C₆H₅COO⁻ + H₂O ⇌ C₆H₅COOH + OH⁻.' },
            { text: 'Calculate Kh = Kw/Ka = 1.0×10⁻¹⁴ / 6.3×10⁻⁵ = 1.587×10⁻¹⁰.' },
            { text: 'Set up ICE table: Initial [C₆H₅COO⁻] = 0.02 M, change = -x, equilibrium = 0.02-x ≈ 0.02 (since Kh small). [OH⁻] = x.' },
            { text: 'Kh = x²/0.02 → x = √(1.587×10⁻¹⁰ × 0.02) = √(3.174×10⁻¹²) = 1.782×10⁻⁶ M = [OH⁻].' },
            { text: 'pOH = -log(1.782×10⁻⁶) = 5.749; pH = 14 - 5.749 = 8.251.' },
            { text: 'Verify approximation: x/0.02 = 8.9×10⁻⁵ << 5%, valid.', faded: true, blankAnswer: 'pH = 8.25' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a science-club demo you show a sealed bottle of fizzy drink: no bubbles rise, the liquid looks still. A first-year says: \'At equilibrium the CO2 has stopped escaping — the reaction is finished, nothing is moving any more.\'',
            decisions: [{ prompt: 'What is actually happening inside the sealed bottle?', options: [
                { text: 'A dynamic equilibrium: CO2 molecules are dissolving into the liquid and escaping into the headspace at equal rates — that\'s why pressure stays constant yet the process never stops. The stillness is macroscopic; molecular traffic across the interface continues nonstop. Open the cap and the balance breaks — hence the sudden fizz.', outcome: 'Equilibrium means equal opposing rates, not zero activity; constant vapour pressure is the signature of continuous molecular exchange.' },
                { text: 'The first-year is right — equilibrium means all molecular motion across the surface has ceased.', outcome: 'That confuses \'no net change\' with \'no process\'; at equilibrium evaporation and condensation (or dissolving and escaping) both run at equal nonzero rates.', reveals: 'equilibrium-means-static' },
                { text: 'The gas is \'trapped\' permanently — it will never come out even when opened.', outcome: 'Equilibrium holds only while the bottle stays closed at constant temperature; opening it removes the opposing condensation side and CO2 rushes out.', reveals: 'sealed-equilibrium-is-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'Kc, Kp, Le Chatelier — you now predict which way a reaction runs before it even starts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_013', difficulty: 'standard',
          question: 'A buffer solution is a system that resists changes in pH upon addition of small.',
          hint: 'Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) for Kₐ/K_b and degree.',
          misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.',
          parts: [
                { id: 'a', prompt: 'Explain why a mixture of HCl and NaCl does NOT act as a buffer, while CH₃COOH and CH₃COONa does. Use the concept of equilibrium and conjugate pairs.', answer: 'HCl is a strong acid, fully dissociated',
                  options: ['HCl is a strong acid, fully dissociated', 'a buffer can be made from any acid and its salt, e'],
                  hint: 'Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) for Kₐ/K_b and degree of ionisation.',
                  misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.' },
                { id: 'b', prompt: 'Calculate the pH of a buffer solution containing 0.10 M CH₃COOH and 0.15 M CH₃COONa. Given Kₐ for CH₃COOH = 1.8 × 10⁻⁵ at 298 K.', answer: 'Step 1: pKₐ = -log(1.8 × 10⁻⁵) = 4.7447',
                  options: ['Step 1: pKₐ = -log(1.8 × 10⁻⁵) = 4.7447', 'a buffer can be made from any acid and its salt, e'],
                  hint: 'Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) for Kₐ/K_b and degree of ionisation.',
                  misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.' },
                { id: 'c', prompt: 'A buffer is prepared by mixing 100 mL of 0.2 M NH₄OH (K_b = 1.8 × 10⁻⁵) with 50 mL of 0.2 M NH₄Cl.', answer: 'First buffer: total volume 150 mL',
                  options: ['First buffer: total volume 150 mL', 'a buffer can be made from any acid and its salt, e'],
                  hint: 'Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) for Kₐ/K_b and degree of ionisation.',
                  misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.' }
          ],
            remediations: { 'a-buffer-can-be-made': { steps: ['If the student confuses strong/weak acid buffers: Have them write the dissociation equation for HCl and CH₃COOH side.', 'Ask: "Which one has an equilibrium arrow?" Then show that adding acetate to acetic acid creates a common-ion effect (Le.', 'If they use initial concentrations after addition: Give a step-by-step scaffold: (1) Write the reaction of added H⁺.', '(2) Do stoichiometry (ICE table) to find new moles.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Adding 0.01 mol HCl to 1 L of a buffer (0.1 M CH₃COOH / 0.1 M CH₃COONa) will change the pH by the same amount as adding 0.01 mol NaOH.".', answer: 'Initial pH = pKₐ + log(0.1/0.1) = 4.74',
                  options: ['Initial pH = pKₐ + log(0.1/0.1) = 4.74', 'a buffer can be made from any acid and its salt, e'],
                  hint: 'Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) for Kₐ/K_b and degree of ionisation.',
                  misconception: 'Students often think a buffer can be made from any acid and its salt, e.g., HCl + NaCl.' }
          ],
            remediations: { 'a-buffer-can-be-made': { steps: ['If the student confuses strong/weak acid buffers: Have them write the dissociation equation for HCl and CH₃COOH side.', 'Ask: "Which one has an equilibrium arrow?" Then show that adding acetate to acetic acid creates a common-ion effect (Le.', 'If they use initial concentrations after addition: Give a step-by-step scaffold: (1) Write the reaction of added H⁺.', '(2) Do stoichiometry (ICE table) to find new moles.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_014', difficulty: 'standard',
          question: 'The solubility product (Ksp) is the equilibrium constant for the dissolution.',
          hint: 'Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for writing Kc expressions, and.',
          misconception: 'Students often write Ksp = [Ag⁺][Cl⁻] for Ag₂CrO₄, ignoring the stoichiometric coefficient 2 for Ag⁺.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The solubility product (Ksp) is the equilibrium constant for the dissolution of a',
                  options: ['The solubility product (Ksp) is the equilibrium constant for the dissolution of a', 'Equilibrium in physical processes is a dynamic state in a closed system where opposing', 'Dynamic equilibrium in a chemical process is a state in a reversible reaction where the', 'The Law of Chemical Equilibrium states that for a reversible reaction at constant'],
                  hint: 'Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for writing Kc expressions, and.',
                  misconception: 'Students often write Ksp = [Ag⁺][Cl⁻] for Ag₂CrO₄, ignoring the stoichiometric coefficient 2 for Ag⁺.' }
          ],
            remediations: { 'students-often-write-ksp-ag': { steps: ['If a student makes the stoichiometry error, have them write the balanced dissolution equation for three salts: AgCl.', 'Then ask: "How many Ag⁺ ions does one formula unit of Ag₂CrO₄ produce?" (Answer: 2).', 'Then derive Ksp from the equation step by step: Ksp = [Ag⁺]²[CrO₄²⁻].', 'For the common ion error, give a numerical problem: "Calculate solubility of BaSO₄ in 0.01 M Na₂SO₄." Make them write.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_015', difficulty: 'standard',
          question: 'Hydrolysis of salts is the reaction of cations or anions of a salt with water.',
          hint: 'If stuck, immediately review c11_chem_cbse_07_011 (Ka, Kb calculations) and.',
          misconception: 'Students write the hydrolysis reaction for NH₄Cl as NH₄Cl + H₂O → NH₄OH + HCl, treating it as molecular dissociation.',
          parts: [
                { id: 'a', prompt: 'Explain why the hydrolysis constant Kh for CH₃COONa is Kw/Ka(CH₃COOH) and not Kw/Kb(CH₃COO⁻). Write the hydrolysis equilibrium and derive Kh from Ka and Kw.', answer: 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻',
                  options: ['CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻', 'Kb of acetate'],
                  hint: 'If stuck, immediately review c11_chem_cbse_07_011 (Ka, Kb calculations) and c11_chem_cbse_07_012.',
                  misconception: 'Students write the hydrolysis reaction for NH₄Cl as NH₄Cl + H₂O → NH₄OH + HCl, treating it as molecular dissociation rather than ionic.' }
          ],
            remediations: { 'students-write-the-hydrolysis-reaction': { steps: ['Revisit c11_chem_cbse_07_009 (Ionic Equilibrium: Acids and Bases) to confirm that salts dissociate completely into ions.', 'Write the dissociation equation for the salt first (e.g., NH₄Cl(s) → NH₄⁺(aq) + Cl⁻(aq)).', 'Identify which ion is the conjugate acid of a weak base or conjugate base of a weak acid.', 'Write the hydrolysis equilibrium for THAT ion only with water.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
