import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch09_p2: SimDef = {
    id: 'v3_c11_chem_ch09_p2',
    title: 'Hydrogen · Part 2/2',
    subtitle: 'Judge hydrogen\'s split personality and what really separates its three isotopes.',
    classLevel: 11, subject: 'chemistry', topic: 'Hydrogen · Part 2/2',
    chapters: ['c11_chem_ch09'],
    nodeIds: ['c11_chem_cbse_09_007', 'c11_chem_cbse_09_008', 'c11_chem_cbse_09_009', 'c11_chem_cbse_09_010', 'c11_chem_cbse_09_011', 'c11_chem_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a classification referee deciding hydrogen\'s address', intro: 'Every group claims hydrogen for one property and rejects it for another — hear the evidence and rule.', goal: 'Evaluate hydrogen\'s resemblance to Groups 1 and 17 and distinguish the properties of its isotopes.' },
    discovery: {
        question: 'Hydrogen forms H+ like an alkali metal, yet its ionisation enthalpy (1312 kJ/mol) sits near fluorine\'s, far above lithium\'s 520. Where does it belong in the periodic table?',
        options: ['Apart — it borrows one feature from Group 1 and another from Group 17 but fits neither', 'Group 1 — forming H+ settles it', 'Group 17 — the high ionisation enthalpy settles it', 'Group 14 — because it is a gas like no metal'],
        answer: 'Apart — it borrows one feature from Group 1 and another from Group 17 but fits neither',
        hook: 'A bare proton is no stable cation like Na+ — it has no electron cloud and must hitchhike on water as H3O+.',
    },
    teaching: [
        { title: 'Water: Structure and Properties', text: 'Water (H₂O) is a bent covalent molecule with sp³ hybridised oxygen (bond angle 104.5°) that exhibits extensive hydrogen bonding, giving it anomalous physical properties (high boiling point, density.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_09_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Pit hydrogen\'s ionisation and electron-gain data against lithium and fluorine, then separate how protium, deuterium and tritium actually behave.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_007', title: 'Water: Structure and Properties',
          scaffold: { problem: 'A 500 mL sample of pure water is heated from 298 K to 310 K. At 310 K, Kw = 2.92 × 10⁻¹⁴.',
            steps: [
            { text: 'Recognise that pure water remains neutral at any temperature, so [H₃O⁺] = [OH⁻] = √Kw.' },
            { text: 'Calculate [H₃O⁺] = √(2.92 × 10⁻¹⁴) = 1.7088 × 10⁻⁷ mol L⁻¹.' },
            { text: 'Compute pH = –log₁₀(1.7088 × 10⁻⁷) = 6.767 ≈ 6.77.' },
            { text: 'Find moles of H₃O⁺ in 500 mL = (1.7088 × 10⁻⁷ mol L⁻¹) × 0.500 L = 8.544 × 10⁻⁸ mol.' },
            { text: 'Convert to number of ions using Avogadro\'s number: (8.544 × 10⁻⁸ mol) × (6.022 × 10²³ mol⁻¹) = 5.15 × 10¹⁶ ions.', faded: true, blankAnswer: '(a) [H₃O⁺] = [OH⁻] = 1.71 × 10⁻⁷ M; (b) pH = 6.77; (c) 5.15.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_008', title: 'Hardness of Water: Temporary and Permanent',
          scaffold: { problem: 'Groundwater in a village in Rajasthan contains 200 mg/L of Ca(HCO₃)₂ and 120 mg/L of MgSO₄.',
            steps: [
            { text: 'Identify the salts causing temporary and permanent hardness. Ca(HCO₃)₂ → temporary; MgSO₄ → permanent.' },
            { text: 'Calculate moles per litre of each salt. Moles Ca(HCO₃)₂ = 200 mg / 162 g/mol = 1.2346 mmol/L.' },
            { text: 'Convert to CaCO₃ equivalent mass. Each mole of salt gives 1 mole CaCO₃ equivalent.' },
            { text: 'Temporary hardness = 123.46 ppm; Permanent hardness = 100 ppm.' },
            { text: 'Total hardness = 123.46 + 100 = 223.46 ppm.' },
            { text: 'Express in degrees Clark and French. Clark = 223.46 / 14.3 = 15.63° Clark; French = 223.46 / 10 = 22.35° French.', faded: true, blankAnswer: 'Temporary hardness = 123.5 ppm, Permanent hardness = 100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_009', title: 'Removal of Hardness: Softening Methods',
          scaffold: { problem: 'Groundwater in a village has temporary hardness equivalent to 300 ppm of CaCO₃ due to Ca(HCO₃)₂. The village tank holds 5000 L.',
            steps: [
            { text: 'Understand ppm means mg/L. Total hardness = 300 mg/L × 5000 L = 1,500,000 mg = 1500 g as CaCO₃ equivalent.' },
            { text: 'Clark\'s method reaction: Ca(HCO₃)₂ + CaO → 2CaCO₃↓ + H₂O. But hardness is expressed as CaCO₃ equivalent.' },
            { text: 'Moles of CaCO₃ equivalent = 1500 g / 100 g/mol = 15 mol. Since 2 mol CaCO₃ ≡ 1 mol CaO, moles CaO needed = 15/2 = 7.5.' },
            { text: 'Mass of pure CaO = 7.5 mol × 56 g/mol = 420 g. Adjust for 90% purity: 420 g / 0.90 = 466.67 g.' },
            { text: 'Verify: 466.67 g × 0.90 = 420 g pure CaO → 7.5 mol CaO → 15 mol CaCO₃ = 1500 g CaCO₃ equivalent. Matches.', faded: true, blankAnswer: '467 g (approx) of 90% pure quicklime required.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_010', title: 'Heavy Water: Properties and Uses',
          scaffold: { problem: 'Calculate the density of D₂O at 298 K given that the molar volume of D₂O is 18.07 cm³ mol⁻¹ (same as H₂O within 0.2%).',
            steps: [
            { text: 'Identify the formula for density: ρ = M / V_m where M = molar mass, V_m = molar volume.' },
            { text: 'Compute molar mass of D₂O: M = 2 × 2.014 + 16.00 = 20.028 g mol⁻¹.' },
            { text: 'Use given molar volume V_m = 18.07 cm³ mol⁻¹.' },
            { text: 'Calculate density: ρ = 20.028 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 1.108 g cm⁻³.' },
            { text: 'Compare with H₂O density (18.015 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 0.997 g cm⁻³) and note 11% increase due solely to mass.', faded: true, blankAnswer: 'ρ(D₂O) = 1.108 g cm⁻³ at 298 K (literature value 1.107.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_011', title: 'Hydrogen Peroxide: Preparation and Uses',
          scaffold: { problem: 'Calculate the volume of oxygen gas (at STP) liberated when 50 mL of \'20 volume\' H₂O₂ solution decomposes completely.',
            steps: [
            { text: 'Interpret \'20 volume\' – 1 mL solution gives 20 mL O₂ at STP. So 50 mL gives 50 × 20 = 1000 mL = 1 L O₂.' },
            { text: 'Use stoichiometry: 2H₂O₂ → 2H₂O + O₂. 2 mol H₂O₂ (68 g) give 1 mol O₂ (22.4 L at STP).' },
            { text: 'Moles O₂ produced = 1 L / 22.4 L mol⁻¹ = 0.04464 mol.' },
            { text: 'Moles H₂O₂ = 2 × 0.04464 = 0.08929 mol. Mass H₂O₂ = 0.08929 × 34 = 3.036 g.' },
            { text: 'Verify: 3.036 g in 50 mL → 60.7 g/L → Molarity = 60.7/34 = 1.785 M. Volume strength = 11.2 × 1.785 ≈ 20 vol. Consistent.', faded: true, blankAnswer: 'O₂ volume = 1 L at STP; Mass H₂O₂ = 3.04 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_012', title: 'Dihydrogen as a Fuel: Hydrogen Economy',
          scaffold: { problem: 'A hydrogen fuel cell car requires 5 kg of H₂ for a 500 km range.',
            steps: [
            { text: 'Identify given data: mass H₂ = 5 kg = 5000 g, system density = 40 g/L, HHV = 143 kJ/g, efficiency = 60%.' },
            { text: 'Calculate tank volume = mass / density = 5000 g / 40 g/L = 125 L.' },
            { text: 'Calculate total chemical energy = mass × HHV = 5000 g × 143 kJ/g = 715,000 kJ = 715 MJ.' },
            { text: 'Calculate usable energy = total energy × efficiency = 715 MJ × 0.60 = 429 MJ.' },
            { text: 'Convert to kWh = 429 MJ / 3.6 MJ/kWh = 119.2 kWh.', faded: true, blankAnswer: '(a) 125 L, (b) 715 MJ (198.6 kWh), (c) 119.2 kWh usable.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_007', title: 'A real-world call',
          caseStudy: { intro: 'Hydrogen fuel promises clean energy — but most hydrogen today is made from natural gas, and \'green\' hydrogen needs enormous renewable electricity that could power homes directly.',
            decisions: [{ prompt: 'Is hydrogen the future or a detour?', options: [
                { text: 'The future — hard-to-electrify sectors need it', outcome: 'True for steel, shipping, fertiliser — where batteries can\'t reach; the risk is spending scarce renewables on hydrogen where direct electrification works.' },
                { text: 'A detour — electrify what you can first', outcome: 'The efficiency argument — every electron into green hydrogen loses ~30% of its work; but some sectors have no electric path at all.' },
                { text: 'Both — the honest question is WHERE hydrogen goes', outcome: 'The engineering answer — hydrogen for what can\'t electrify, wires for what can; the fight is about which is which.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates where hydrogen belongs on the periodic table poster for the lab wall. Team A wants it atop Group 1 (\'it loses one electron like sodium and acids give H⁺\'). Team B wants it atop Group 17 (\'it gains one electron like fluorine and exists as H₂ gas\'). The teacher asks for the deciding data.',
            decisions: [{ prompt: 'What does the evidence say?', options: [
                { text: 'Neither group fully — that\'s why hydrogen sits alone. Its ionization enthalpy (1312 kJ/mol) is far above lithium\'s (520), so it\'s a poor metal; its electron-gain enthalpy (−73) is far below fluorine\'s (−328), so it\'s a weak halogen; and its H–H bond (436 kJ/mol) is nearly triple F–F\'s. It mimics both families superficially but matches neither\'s intrinsic atomic properties.', outcome: 'Periodic placement follows gas-phase atomic properties — IE, electron-gain enthalpy, bond energy — not one-off reaction behaviour like \'acids give H⁺\'.' },
                { text: 'Group 1 — forming H⁺ in acid solutions proves it\'s an alkali metal.', outcome: 'H⁺ is a bare proton with astronomically higher charge density than Na⁺ — it can\'t exist free; the aqueous behaviour doesn\'t reflect hydrogen\'s intrinsic atomic properties.', reveals: 'hplus-makes-it-alkali' },
                { text: 'Group 17 — it\'s a diatomic gas like F₂ and Cl₂, so it must be a halogen.', outcome: 'Diatomicity is superficial; hydrogen\'s electron-gain enthalpy is a fraction of a halogen\'s and its bond is far stronger — halogen-like shape, non-halogen energetics.', reveals: 'diatomic-means-halogen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'Hydrogen is the periodic table\'s orphan — one electron, two borrowed identities, no true home group.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_007', difficulty: 'standard',
          question: 'Water (H₂O) is a bent covalent molecule with sp³ hybridised oxygen (bond angle.',
          hint: 'If stuck on shape/polarity, revisit c9_chem_ch3_4 (VSEPR for H₂O).',
          misconception: 'Students draw H₂O as linear (O in centre, H–O–H 180°) because they apply "two electron domains = linear" from CO₂.',
          parts: [
                { id: 'a', prompt: 'At 310 K, Kw = 2.92 × 10⁻¹⁴. Calculate the pH of neutral water at this temperature. Is the water acidic, basic, or neutral? Show all steps.', answer: 'Neutral ⇒ [H⁺] = [OH⁻] = √Kw = √(2.92 × 10⁻¹⁴) = 1.71 × 10⁻⁷ M',
                  options: ['Neutral ⇒ [H⁺] = [OH⁻] = √Kw = √(2.92 × 10⁻¹⁴) = 1.71 × 10⁻⁷ M', 'acidic'],
                  hint: 'If stuck on shape/polarity, revisit c9_chem_ch3_4 (VSEPR for H₂O).',
                  misconception: 'Students draw H₂O as linear (O in centre, H–O–H 180°) because they apply "two electron domains = linear" from CO₂, forgetting oxygen has.' },
                { id: 'b', prompt: 'Compare the density anomaly of water (maximum density at 4°C) with the behaviour of a typical liquid like ethanol.', answer: 'Typical liquids contract monotonically on cooling',
                  options: ['Typical liquids contract monotonically on cooling', 'hydrogen bonding makes water heavier'],
                  hint: 'If stuck on shape/polarity, revisit c9_chem_ch3_4 (VSEPR for H₂O).',
                  misconception: 'Students draw H₂O as linear (O in centre, H–O–H 180°) because they apply "two electron domains = linear" from CO₂, forgetting oxygen has.' }
          ],
            remediations: { 'students-draw-h-o-as': { steps: ['Revisit VSEPR for four electron domains (c9_chem_ch3_4) – build ball-and-stick model of H₂O, measure 104.5°.', 'Draw dipole vectors for two O–H bonds, show resultant net dipole → polar molecule.', 'Sketch four H-bonds per H₂O in ice (tetrahedral), then show partial collapse on melting → density maximum.', 'Write autoionisation with hydronium ion, derive Kw = [H₃O⁺][OH⁻], practise pH = –log[H₃O⁺] at 298 K and 310 K.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_008', difficulty: 'standard',
          question: 'Hardness of water is the property that prevents lather formation with soap due.',
          hint: 'If stuck, revisit Class 10 chapter "Acids, Bases and Salts" (neutralisation and salt.',
          misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.',
          parts: [
                { id: 'a', prompt: 'Define temporary hardness of water and write the chemical equation for its removal by boiling.', answer: 'Temporary hardness is due to dissolved calcium and magnesium bicarbonates',
                  options: ['Temporary hardness is due to dissolved calcium and magnesium bicarbonates', 'hardness', '"hardness" means high TDS (total dissolved solids) and confuse it with salinity'],
                  hint: 'If stuck, revisit Class 10 chapter "Acids, Bases and Salts" (neutralisation and salt formation) and.',
                  misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.' },
                { id: 'b', prompt: 'Explain why soap does not lather in hard water but forms a white precipitate (scum). Write the ionic equation.', answer: 'Soap (sodium stearate, C₁₇H₃₅COONa) reacts with Ca²⁺/Mg²⁺ to form insoluble',
                  options: ['Soap (sodium stearate, C₁₇H₃₅COONa) reacts with Ca²⁺/Mg²⁺ to form insoluble', 'soap reacts with Cl⁻', 'hardness', '"hardness" means high TDS (total dissolved solids) and confuse it with salinity'],
                  hint: 'If stuck, revisit Class 10 chapter "Acids, Bases and Salts" (neutralisation and salt formation) and.',
                  misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.' },
                { id: 'c', prompt: 'A water sample contains 162 mg of Ca(HCO₃)₂ per litre. Calculate its temporary hardness in ppm (parts per million) of CaCO₃ equivalent.', answer: 'Step 1: Moles of Ca(HCO₃)₂ = 162 mg / 162 g/mol = 1 mmol per litre',
                  options: ['Step 1: Moles of Ca(HCO₃)₂ = 162 mg / 162 g/mol = 1 mmol per litre', 'hardness', '"hardness" means high TDS (total dissolved solids) and confuse it with salinity'],
                  hint: 'If stuck, revisit Class 10 chapter "Acids, Bases and Salts" (neutralisation and salt formation) and.',
                  misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.' }
          ],
            remediations: { 'hardness-means-high-tds-total': { steps: ['List the four main hardness-causing salts: Ca(HCO₃)₂, Mg(HCO₃)₂, CaCl₂, MgCl₂, CaSO₄, MgSO₄.', 'Write the thermal decomposition reaction for each bicarbonate.', 'Attempt to write a similar decomposition for chloride/sulphate – realize no reaction occurs.', 'Perform a soap test on boiled vs unboiled groundwater and rainwater to see the difference.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment to distinguish between temporary and permanent hardness in two unknown water samples using only soap solution, a burner, and test.', answer: 'Take equal volumes of each sample in separate test tubes',
                  options: ['Take equal volumes of each sample in separate test tubes', 'hardness', '"hardness" means high TDS (total dissolved solids) and confuse it with salinity'],
                  hint: 'If stuck, revisit Class 10 chapter "Acids, Bases and Salts" (neutralisation and salt formation) and.',
                  misconception: 'Students often think that "hardness" means high TDS (total dissolved solids) and confuse it with salinity.' }
          ],
            remediations: { 'hardness-means-high-tds-total': { steps: ['List the four main hardness-causing salts: Ca(HCO₃)₂, Mg(HCO₃)₂, CaCl₂, MgCl₂, CaSO₄, MgSO₄.', 'Write the thermal decomposition reaction for each bicarbonate.', 'Attempt to write a similar decomposition for chloride/sulphate – realize no reaction occurs.', 'Perform a soap test on boiled vs unboiled groundwater and rainwater to see the difference.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_009', difficulty: 'standard',
          question: 'Water softening is the process of removing dissolved calcium (Ca²⁺) and.',
          hint: 'Revisit c11_chem_cbse_09_008 for hardness classification and c9_chem_ch1_3 for solubility.',
          misconception: 'Students write the Clark\'s method equation as Ca(HCO₃)₂ + Ca(OH)₂ → 2CaCO₃ + 2H₂O using slaked lime [Ca(OH)₂] instead.',
          parts: [
                { id: 'a', prompt: 'A water sample contains only Ca(HCO₃)₂. Which single method from the following will completely remove its hardness?', answer: 'Correct answer: (b) Boiling',
                  options: ['Correct answer: (b) Boiling', 'washing soda'],
                  hint: 'Revisit c11_chem_cbse_09_008 for hardness classification and c9_chem_ch1_3 for solubility rules.',
                  misconception: 'Students write the Clark\'s method equation as Ca(HCO₃)₂ + Ca(OH)₂ → 2CaCO₃ + 2H₂O using slaked lime [Ca(OH)₂] instead of quicklime (CaO).' },
                { id: 'b', prompt: 'Explain why adding a calculated amount of washing soda (Na₂CO₃) removes permanent hardness caused by CaSO₄, but adding excess washing soda makes the water.', answer: 'Correct explanation: Na₂CO₃ + CaSO₄ → CaCO₃↓ + Na₂SO₄',
                  options: ['Correct explanation: Na₂CO₃ + CaSO₄ → CaCO₃↓ + Na₂SO₄', 'excess causes more precipitation'],
                  hint: 'Revisit c11_chem_cbse_09_008 for hardness classification and c9_chem_ch1_3 for solubility rules.',
                  misconception: 'Students write the Clark\'s method equation as Ca(HCO₃)₂ + Ca(OH)₂ → 2CaCO₃ + 2H₂O using slaked lime [Ca(OH)₂] instead of quicklime (CaO).' }
          ],
            remediations: { 'students-write-the-clark-s': { steps: ['Make a table with four columns: Method Name, Reagent Used, Hardness Type Removed, Key Reaction.', 'Fill only Clark\'s method row: "Clark\'s method | Quicklime (CaO) | Temporary | Ca(HCO₃)₂ + CaO → 2CaCO₃↓ + H₂O".', 'Practice writing this exact equation 5 times from memory.', 'Contrast with "Lime-soda process" (industrial, uses both CaO and Na₂CO₃) to cement the distinction.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_010', difficulty: 'standard',
          question: 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen.',
          hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007.',
          misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.',
          parts: [
                { id: 'a', prompt: 'State the molecular formula and molar mass of heavy water. How does its molar mass differ from that of ordinary water?', answer: 'Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)',
                  options: ['Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)', 'radioactive', 'heavy water toxicity', 'heavy water is "radioactive"'],
                  hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007 for water\'s.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'b', prompt: 'During electrolysis of ordinary water, the gas evolved at the cathode is richer in H₂ than D₂.', answer: 'Given x₀ = 0.000156, α = 1.05, f = 0.5',
                  options: ['Given x₀ = 0.000156, α = 1.05, f = 0.5', 'radioactive', 'heavy water toxicity', 'heavy water is "radioactive"'],
                  hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007 for water\'s.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'c', prompt: 'Compare the density of D₂O (1.107 g cm⁻³ at 298 K) and H₂O (0.997 g cm⁻³ at 298 K).', answer: 'The statement is partially correct in outcome but wrong in mechanism',
                  options: ['The statement is partially correct in outcome but wrong in mechanism', 'packing', 'radioactive', 'heavy water toxicity'],
                  hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007 for water\'s.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' }
          ],
            remediations: { 'heavy-water-is-radioactive-because': { steps: ['Revisit c11_chem_cbse_09_002 (Isotopes of Hydrogen) and explicitly list the nuclear composition (p, n) and stability.', 'Write the nuclear equations: ¹H(n,γ)²H (stable), ²H(n,γ)³H (radioactive, t½=12.3 yr).', 'Complete a table comparing "Radioactive?" for H₂O, D₂O, T₂O.', 'Read the NCERT sidebar on heavy water toxicity (Class 11 Ch 9) to replace fear with quantitative fact.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_011', difficulty: 'standard',
          question: 'Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as.',
          hint: 'Revisit c10_chem_cbse_01_007 and c10_chem_cbse_01_008; practice oxidation state of O.',
          misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.',
          parts: [
                { id: 'a', prompt: 'Explain why hydrogen peroxide acts as an oxidizing agent in acidic medium but can act as a reducing agent in the presence of strong oxidizers like KMnO₄.', answer: 'In H₂O₂, oxygen is –1',
                  options: ['In H₂O₂, oxygen is –1', 'it only oxidizes'],
                  hint: 'Revisit c10_chem_cbse_01_007 and c10_chem_cbse_01_008; practice oxidation state of O in H₂O, H₂O₂.',
                  misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.' }
          ],
            remediations: { 'students-often-write-the-disproportionation': { steps: ['Review oxidation state rules (c10_chem_cbse_01_007) using H₂O₂ as practice: let x be O.S.', 'of O, 2(+1) + 2x = 0 → x = –1.', 'Write both half-reactions for H₂O₂ in acidic medium: reduction to H₂O and oxidation to O₂.', 'Watch a video of H₂O₂ decomposition catalyzed by MnO₂ (black solid) to visualize O₂ evolution.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_012', difficulty: 'standard',
          question: 'Dihydrogen (H₂) as a fuel refers to the use of hydrogen gas as an energy.',
          hint: 'Review Class 10 redox (c10_chem_cbse_01_007, c10_chem_cbse_01_008) and Class 11.',
          misconception: 'Students believe hydrogen fuel cells "burn" hydrogen like an engine.',
          parts: [
                { id: 'a', prompt: 'Write the balanced thermochemical equation for the combustion of dihydrogen gas to form liquid water at standard conditions, including the standard enthalpy.', answer: '2H₂(g) + O₂(g) → 2H₂O(l)',
                  options: ['2H₂(g) + O₂(g) → 2H₂O(l)', 'hydrogen fuel cells "burn" hydrogen like an engine'],
                  hint: 'Review Class 10 redox (c10_chem_cbse_01_007, c10_chem_cbse_01_008) and Class 11 thermodynamics.',
                  misconception: 'Students believe hydrogen fuel cells "burn" hydrogen like an engine.' },
                { id: 'b', prompt: 'Calculate the volume of dihydrogen gas at STP required to produce the same amount of energy as 1 kg of LPG (calorific value 50 kJ/g).', answer: 'Step 1: Energy from 1 kg LPG = 1000 g × 50 kJ/g = 50,000 kJ',
                  options: ['Step 1: Energy from 1 kg LPG = 1000 g × 50 kJ/g = 50,000 kJ', 'hydrogen fuel cells "burn" hydrogen like an engine'],
                  hint: 'Review Class 10 redox (c10_chem_cbse_01_007, c10_chem_cbse_01_008) and Class 11 thermodynamics.',
                  misconception: 'Students believe hydrogen fuel cells "burn" hydrogen like an engine.' }
          ],
            remediations: { 'hydrogen-fuel-cells-burn-hydrogen': { steps: ['Revisit the electrochemistry chapter (Class 12, but concept introduced in Class 11 Redox) – write the half-reactions.', 'Use a Hoffman voltameter to generate H₂ and O₂, then connect the electrodes through a multimeter to show voltage.', 'Calculate ΔG° = –nFE° = –2 × 96485 × 1.23 = –237 kJ/mol and compare to ΔH° = –286 kJ/mol to see the "lost" energy.', 'Read the NCERT box on fuel cells in Chapter 9 and identify the electrolyte (KOH or PEM) and catalyst (Pt).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
