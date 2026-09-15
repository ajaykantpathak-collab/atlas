import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch09_p1: SimDef = {
    id: 'v3_c11_chem_ch09_p1',
    title: 'Hydrogen · Part 1/2',
    subtitle: 'Judge hydrogen\'s split personality and what really separates its three isotopes.',
    classLevel: 11, subject: 'chemistry', topic: 'Hydrogen · Part 1/2',
    chapters: ['c11_chem_ch09'],
    nodeIds: ['c11_chem_cbse_09_001', 'c11_chem_cbse_09_002', 'c11_chem_cbse_09_003', 'c11_chem_cbse_09_004', 'c11_chem_cbse_09_005', 'c11_chem_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a classification referee deciding hydrogen\'s address', intro: 'Every group claims hydrogen for one property and rejects it for another — hear the evidence and rule.', goal: 'Evaluate hydrogen\'s resemblance to Groups 1 and 17 and distinguish the properties of its isotopes.' },
    discovery: {
        question: 'Hydrogen forms H+ like an alkali metal, yet its ionisation enthalpy (1312 kJ/mol) sits near fluorine\'s, far above lithium\'s 520. Where does it belong in the periodic table?',
        options: ['Apart — it borrows one feature from Group 1 and another from Group 17 but fits neither', 'Group 1 — forming H+ settles it', 'Group 17 — the high ionisation enthalpy settles it', 'Group 14 — because it is a gas like no metal'],
        answer: 'Apart — it borrows one feature from Group 1 and another from Group 17 but fits neither',
        hook: 'A bare proton is no stable cation like Na+ — it has no electron cloud and must hitchhike on water as H3O+.',
    },
    teaching: [
        { title: 'Position of Hydrogen in Periodic Table', text: 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits dual character: it can lose its single electron to form H⁺ (resembling alkali metals, Group 1) or gain one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_09_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Pit hydrogen\'s ionisation and electron-gain data against lithium and fluorine, then separate how protium, deuterium and tritium actually behave.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_001', title: 'Position of Hydrogen in Periodic Table',
          caseStudy: { intro: 'Start with a kitchen observation: when you drop a piece of sodium metal in water, it catches fire producing H₂ gas; when you pass electricity through water, H₂.',
            decisions: [{ prompt: 'Write the electronic configuration of hydrogen and state the two ions it can form by losing or gaining one electron.', options: [
                { text: 'Electronic configuration: 1s¹', outcome: 'Electronic configuration: 1s¹. Losing 1e⁻ gives H⁺ (oxidation state +1); gaining 1e⁻ gives H⁻.' },
                { text: 'hydrogen is a metal', outcome: 'Not quite — Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal.', reveals: 'hydrogen-is-a-metal-because' },
                { text: 'hydrogen is a non-metal', outcome: 'Not quite — Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal.', reveals: 'hydrogen-is-a-metal-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_002', title: 'Isotopes of Hydrogen: Protium, Deuterium, Tritium',
          scaffold: { problem: 'A sample of hydrogen gas collected from a laboratory reaction contains 99.98% protium (¹H, mass = 1.0078 u) and 0.02% deuterium (²H, mass.',
            steps: [
            { text: 'Identify the isotopes and their fractional abundances: protium fraction = 99.98/100 = 0.9998; deuterium fraction.' },
            { text: 'Write the weighted average formula: M_avg = (f₁ × m₁) + (f₂ × m₂)' },
            { text: 'Substitute values: M_avg = (0.9998 × 1.0078) + (0.0002 × 2.0141)' },
            { text: 'Calculate each term: 0.9998 × 1.0078 = 1.0076; 0.0002 × 2.0141 = 0.0004028' },
            { text: 'Sum and round to 4 decimal places: M_avg = 1.0076 + 0.0004 = 1.0080 g/mol', faded: true, blankAnswer: '1.0080 g/mol' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_003', title: 'Preparation of Dihydrogen: Laboratory and Industrial',
          scaffold: { problem: 'In a laboratory preparation, 6.5 g of pure zinc granules react with excess dilute HCl.',
            steps: [
            { text: 'Identify the reaction: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g). Note 1 mol Zn gives 1 mol H₂.' },
            { text: 'Calculate moles of Zn used: mass/molar mass = 6.5 g / 65 g/mol = 0.1 mol.' },
            { text: 'Use stoichiometry: moles of H₂ produced = 0.1 mol.' },
            { text: 'Convert moles to volume at STP: volume = moles × molar volume = 0.1 mol × 22.4 L/mol = 2.24 L.' },
            { text: 'Verify: The gas is collected over water? Problem says dry gas at STP, so no water vapour correction needed.', faded: true, blankAnswer: '2.24 L of dry dihydrogen gas at STP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_004', title: 'Properties of Dihydrogen',
          scaffold: { problem: 'A fuel cell uses dihydrogen and oxygen to generate electricity.',
            steps: [
            { text: 'Write balanced equation: 2H₂(g) + O₂(g) → 2H₂O(l). Identify molar ratio H₂:O₂ = 2:1.' },
            { text: 'Calculate moles of H₂ = mass / molar mass = 4.00 g / 2.016 g mol⁻¹ = 1.984 mol.' },
            { text: 'Moles of O₂ required = 1.984 mol H₂ × (1 mol O₂ / 2 mol H₂) = 0.992 mol. At STP (0°C, 1 atm), 1 mol = 22.4 L.' },
            { text: 'Maximum electrical work = –ΔG° × moles of H₂O formed. Moles H₂O = moles H₂ = 1.984 mol.' },
            { text: 'Actual energy at 80% efficiency = 0.80 × 470.4 kJ = 376.3 kJ. Convert to kWh: 376.3 kJ / 3600 = 0.1045 kWh.', faded: true, blankAnswer: '(a) 22.2 L O₂ at STP; (b) 376 kJ or 0.105 kWh electrical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_005', title: 'Uses of Dihydrogen',
          scaffold: { problem: 'An industrial plant produces 1.70 × 10³ kg of ammonia per day via the Haber process operating at 15% yield per pass.',
            steps: [
            { text: 'Calculate theoretical moles of NH₃ at 100% yield: actual mass = 1.70×10⁶ g; theoretical mass = 1.70×10⁶ / 0.15.' },
            { text: 'Use stoichiometry N₂ + 3H₂ → 2NH₃: moles H₂ required = (3/2) × moles NH₃ = 1.5 × 6.667×10⁵ = 1.00×10⁶ mol H₂' },
            { text: 'Convert to mass: mass H₂ = 1.00×10⁶ mol × 2 g mol⁻¹ = 2.00×10⁶ g = 2000 kg' },
            { text: 'Verify with N₂ requirement: moles N₂ = (1/2) × 6.667×10⁵ = 3.33×10⁵ mol; mass N₂ = 3.33×10⁵ × 28 = 9.33×10⁶ g = 9330.' },
            { text: 'Interpret: 2000 kg H₂/day feed needed; in practice recycle reduces fresh feed to ~300 kg/day', faded: true, blankAnswer: '2000 kg H₂ per day' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_006', title: 'Hydrides: Ionic, Covalent and Metallic',
          caseStudy: { intro: 'Observe how sodium reacts violently with hydrogen gas at 673 K to form a white crystalline solid (NaH), while carbon forms methane (CH₄) - a gas at room.',
            decisions: [{ prompt: 'What is the oxidation state of hydrogen in sodium hydride (NaH) and why does it differ from hydrogen\'s oxidation state in methane (CH₄)?', options: [
                { text: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)', outcome: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻) because sodium (Group 1) is more.' },
                { text: 'metallic hydrides are alloys', outcome: 'Not quite — Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as.', reveals: 'metallic-hydrides-are-alloys-and' },
                { text: 'H is +1 in both', outcome: 'Not quite — Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as.', reveals: 'metallic-hydrides-are-alloys-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_001', title: 'A real-world call',
          caseStudy: { intro: 'Hydrogen fuel promises clean energy — but most hydrogen today is made from natural gas, and \'green\' hydrogen needs enormous renewable electricity that could power homes directly.',
            decisions: [{ prompt: 'Is hydrogen the future or a detour?', options: [
                { text: 'The future — hard-to-electrify sectors need it', outcome: 'True for steel, shipping, fertiliser — where batteries can\'t reach; the risk is spending scarce renewables on hydrogen where direct electrification works.' },
                { text: 'A detour — electrify what you can first', outcome: 'The efficiency argument — every electron into green hydrogen loses ~30% of its work; but some sectors have no electric path at all.' },
                { text: 'Both — the honest question is WHERE hydrogen goes', outcome: 'The engineering answer — hydrogen for what can\'t electrify, wires for what can; the fight is about which is which.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates where hydrogen belongs on the periodic table poster for the lab wall. Team A wants it atop Group 1 (\'it loses one electron like sodium and acids give H⁺\'). Team B wants it atop Group 17 (\'it gains one electron like fluorine and exists as H₂ gas\'). The teacher asks for the deciding data.',
            decisions: [{ prompt: 'What does the evidence say?', options: [
                { text: 'Neither group fully — that\'s why hydrogen sits alone. Its ionization enthalpy (1312 kJ/mol) is far above lithium\'s (520), so it\'s a poor metal; its electron-gain enthalpy (−73) is far below fluorine\'s (−328), so it\'s a weak halogen; and its H–H bond (436 kJ/mol) is nearly triple F–F\'s. It mimics both families superficially but matches neither\'s intrinsic atomic properties.', outcome: 'Periodic placement follows gas-phase atomic properties — IE, electron-gain enthalpy, bond energy — not one-off reaction behaviour like \'acids give H⁺\'.' },
                { text: 'Group 1 — forming H⁺ in acid solutions proves it\'s an alkali metal.', outcome: 'H⁺ is a bare proton with astronomically higher charge density than Na⁺ — it can\'t exist free; the aqueous behaviour doesn\'t reflect hydrogen\'s intrinsic atomic properties.', reveals: 'hplus-makes-it-alkali' },
                { text: 'Group 17 — it\'s a diatomic gas like F₂ and Cl₂, so it must be a halogen.', outcome: 'Diatomicity is superficial; hydrogen\'s electron-gain enthalpy is a fraction of a halogen\'s and its bond is far stronger — halogen-like shape, non-halogen energetics.', reveals: 'diatomic-means-halogen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Hydrogen is the periodic table\'s orphan — one electron, two borrowed identities, no true home group.',
            decisions: [{ prompt: 'What comes next? Hydrogen · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hydrogen · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'standard',
          question: 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas.',
          parts: [
                { id: 'a', prompt: 'Write the electronic configuration of hydrogen and state the two ions it can form by losing or gaining one electron.', answer: 'Electronic configuration: 1s¹',
                  options: ['Electronic configuration: 1s¹', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10 "Modern.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Compare the following pairs and identify which property shows hydrogen behaving like an alkali metal and which shows halogen-like behavior: (a) Reaction with.', answer: 'Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl',
                  options: ['Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10 "Modern.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Hydrogen should be placed in Group 1 because it forms H⁺ ions in acids like HCl, H₂SO₄, just as Na forms Na⁺ in NaCl." Evaluate this.', answer: 'The statement is chemically incomplete',
                  options: ['The statement is chemically incomplete', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10 "Modern.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Design a thought experiment: If you could measure the "metallic character index" M = (Ionization Enthalpy)⁻¹ × (Electron Gain Enthalpy) for H, Li, Na, F,.', answer: 'Calculate M = (1/IE) × |EG| (using absolute EG for index)',
                  options: ['Calculate M = (1/IE) × |EG| (using absolute EG for index)', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10 "Modern.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_002', difficulty: 'standard',
          question: 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but.',
          hint: 'If stuck on nuclear notation, review c9_chem_ch2_5; if stuck on weighted average, review.',
          misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number.',
          parts: [
                { id: 'a', prompt: 'Write the complete nuclear symbol (with atomic number and mass number) for each hydrogen isotope and state the number of protons, neutrons, and electrons in.', answer: 'Protium: ¹₁H (1p, 0n, 1e⁻)',
                  options: ['Protium: ¹₁H (1p, 0n, 1e⁻)', 'it has 2 protons'],
                  hint: 'If stuck on nuclear notation, review c9_chem_ch2_5; if stuck on weighted average, review.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' },
                { id: 'b', prompt: 'The bond dissociation energy of H–H is 436 kJ/mol, while D–D is 439 kJ/mol.', answer: 'Deuterium forms a stronger bond (higher BDE)',
                  options: ['Deuterium forms a stronger bond (higher BDE)', 'D–D is weaker because deuterium is heavier', 'it has 2 protons'],
                  hint: 'If stuck on nuclear notation, review c9_chem_ch2_5; if stuck on weighted average, review.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' }
          ],
            remediations: { 'students-write-the-nuclear-symbol': { steps: ['Revisit c9_chem_ch2_5 (Atomic Number and Mass Number) — draw 3 nuclei side by side, label p⁺ and n⁰, count each.', 'Use a periodic table to confirm hydrogen\'s atomic number is always 1.', 'Practice writing ¹₁H, ²₁H, ³₁H until the notation is automatic.', 'For compound confusion, write H₂O and D₂O structural formulas — show identical connectivity, only mass labels differ.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_003', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn.',
          hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and.',
          misconception: 'Students often think that any metal reacts with any acid to give H₂.',
          parts: [
                { id: 'a', prompt: 'Name the gas evolved when zinc granules react with dilute sulphuric acid. Write the balanced chemical equation.', answer: 'The gas is dihydrogen (H₂)',
                  options: ['The gas is dihydrogen (H₂)', 'oxygen or writing Zn + H₂SO₄ → ZnSO₄ + H₂O', 'any metal reacts with any acid to give H₂'],
                  hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and c10_chem_cbse_01_007.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'b', prompt: 'Balance the equation for steam reforming of methane: CH₄(g) + H₂O(g) → CO(g) + H₂(g).', answer: 'Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)',
                  options: ['Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)', 'any metal reacts with any acid to give H₂'],
                  hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and c10_chem_cbse_01_007.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'c', prompt: 'Compare the purity of dihydrogen obtained from (a) Zn + dilute HCl and (b) electrolysis of acidified water. Which method gives higher purity and why?', answer: 'Electrolysis gives higher purity (99.9%)',
                  options: ['Electrolysis gives higher purity (99.9%)', 'any metal reacts with any acid to give H₂'],
                  hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and c10_chem_cbse_01_007.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' }
          ],
            remediations: { 'any-metal-reacts-with-any': { steps: ['Review the reactivity series from Class 10 (c10_chem_cbse_03_007) and identify metals above hydrogen.', 'Write the half-reactions for Zn → Zn²⁺ + 2e⁻ and 2H⁺ + 2e⁻ → H₂ to see the redox requirement.', 'Practice balancing the Zn/NaOH reaction with water molecules to form the tetrahydroxozincate ion.', 'For industrial methods, create a table comparing temperature, catalyst, and purity for each method.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_004', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as.',
          hint: 'Review c10_chem_cbse_01_007 (Oxidation and Reduction Reactions) and practice oxidation.',
          misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion.',
          parts: [
                { id: 'a', prompt: 'When dihydrogen reacts with copper(II) oxide, the products are copper and water. Write the balanced equation and identify the oxidation state changes.', answer: 'CuO(s) + H₂(g) → Cu(s) + H₂O(g)',
                  options: ['CuO(s) + H₂(g) → Cu(s) + H₂O(g)', 'CuO + H₂ → Cu + H₂O without states, or claiming no heating needed'],
                  hint: 'Review c10_chem_cbse_01_007 (Oxidation and Reduction Reactions) and practice oxidation state.',
                  misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion at room temperature.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit the concept of equilibrium constants and Le Chatelier\'s principle from Class 11 Equilibrium chapter.', 'Plot ΔG° vs T for N₂ + 3H₂ ⇌ 2NH₃ using ΔH° = –92.2 kJ mol⁻¹ and ΔS° = –198 J K⁻¹ mol⁻¹ to see why low T favors yield.', 'Practice writing the balanced equation with state symbols and reversible arrow until automatic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_005', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as.',
          hint: 'Review Class 10 redox balancing (c10_chem_cbse_01_008) and Class 11 equilibrium (not.',
          misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing',
                  options: ['Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing', 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits', 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but different mass', 'Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn, Fe) with'],
                  hint: 'Review Class 10 redox balancing (c10_chem_cbse_01_008) and Class 11 equilibrium (not in this.',
                  misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail to recognize that the.' }
          ],
            remediations: { 'students-write-the-hydrogenation-of': { steps: ['Draw the structure of a typical triglyceride with three oleic acid chains (one C=C each).', 'Count C=C bonds = 3 per molecule.', 'Write addition of H₂ across each C=C: –CH=CH– + H₂ → –CH₂–CH₂–.', 'Balance: 1 mol triglyceride + 3 mol H₂ → fully saturated triglyceride.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'standard',
          question: 'Hydrides are binary compounds of hydrogen with other elements (except noble.',
          hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'What is the oxidation state of hydrogen in sodium hydride (NaH) and why does it differ from hydrogen\'s oxidation state in methane (CH₄)?', answer: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)',
                  options: ['In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)', 'metallic hydrides are alloys', 'H is +1 in both'],
                  hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and electronegativity.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Explain why beryllium hydride (BeH₂) is covalent while magnesium hydride (MgH₂) is ionic, even though both are Group 2 elements.', answer: 'BeH₂ is covalent',
                  options: ['BeH₂ is covalent', 'both are ionic because Group 2', 'metallic hydrides are alloys'],
                  hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and electronegativity.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'c', prompt: 'Write balanced chemical equations for the reaction of (a) CaH₂ with water, (b) B₂H₆ with water, and (c) TiH₂ with water.', answer: 'CaH₂ with water, (',
                  options: ['CaH₂ with water, (', 'metallic hydrides are alloys'],
                  hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and electronegativity.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
