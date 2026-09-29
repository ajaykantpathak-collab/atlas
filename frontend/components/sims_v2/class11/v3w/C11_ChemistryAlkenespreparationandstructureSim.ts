import type { SimDef } from '../../engine/types';
import C11_ChemistryAlkenespreparationandstructureSim from '../../../simulations/c6_12/C11_ChemistryAlkenespreparationandstructureSim';

/** v3 wrapped master — C11_ChemistryAlkenespreparationandstructureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryalkenespreparationandstructuresim: SimDef = {
    id: 'v3w_c11_chemistryalkenespreparationandstructuresim',
    title: 'Hydrides: Ionic, Covalent and Metallic',
    subtitle: 'Covers classification, preparation, properties, and structures of ionic (saline),.',
    classLevel: 11, subject: 'chemistry', topic: 'Hydrides: Ionic, Covalent and Metallic',
    chapters: [],
    nodeIds: ['c11_chem_cbse_09_006', 'c11_chem_cbse_09_010', 'c11_chem_cbse_09_011', 'c11_chem_cbse_09_001', 'c11_chem_cbse_09_003', 'c11_chem_cbse_09_005', 'c11_chem_cbse_01_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe how sodium reacts violently with hydrogen gas at 673 K to form a white crystalline solid (NaH), while.', goal: 'Master Hydrides: Ionic, Covalent and Metallic.' },
    discovery: {
        question: 'Explain why beryllium hydride (BeH₂) is covalent while magnesium hydride (MgH₂) is ionic, even though both are Group 2 elements.',
        options: ['BeH₂ is covalent', 'both are ionic because Group 2', 'metallic hydrides are alloys'],
        answer: 'BeH₂ is covalent',
        hook: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
    },
    teaching: [
        { title: 'Hydrides are binary compounds of hydrogen.', text: 'Hydrides are binary compounds of hydrogen with other elements (except noble gases), classified into three types based on bonding nature: ionic hydrides formed with highly electropositive s-block.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_006', title: 'Hydrides are binary compounds of.',
          scaffold: { problem: '2.5 g of an unknown alkaline earth metal hydride MH₂ reacts completely with water to produce 1.12 L of H₂ gas at STP.',
            steps: [
            { text: 'Calculate moles of H₂ gas produced at STP: 1.12 L / 22.4 L/mol = 0.05 mol H₂' },
            { text: 'From hydrolysis stoichiometry MH₂ + 2H₂O → M(OH)₂ + 2H₂, 1 mol MH₂ produces 2 mol H₂.' },
            { text: 'Calculate molar mass of MH₂: mass / moles = 2.5 g / 0.025 mol = 100 g/mol' },
            { text: 'Molar mass of M = 100 - 2(1) = 98 g/mol. From periodic table, alkaline earth metal with atomic mass ~98 is Strontium.' },
            { text: 'Balanced equation: SrH₂ + 2H₂O → Sr(OH)₂ + 2H₂↑. Verify: Sr(OH)₂ is strong base → basic solution.', faded: true, blankAnswer: 'Metal is Strontium (Sr), assuming experimental mass was.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_010', title: 'Heavy water (D₂O) is the oxide of.',
          scaffold: { problem: 'Calculate the density of D₂O at 298 K given that the molar volume of D₂O is 18.07 cm³ mol⁻¹ (same as H₂O within 0.2%).',
            steps: [
            { text: 'Identify the formula for density: ρ = M / V_m where M = molar mass, V_m = molar volume.' },
            { text: 'Compute molar mass of D₂O: M = 2 × 2.014 + 16.00 = 20.028 g mol⁻¹.' },
            { text: 'Use given molar volume V_m = 18.07 cm³ mol⁻¹.' },
            { text: 'Calculate density: ρ = 20.028 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 1.108 g cm⁻³.' },
            { text: 'Compare with H₂O density (18.015 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 0.997 g cm⁻³) and note 11% increase due solely to mass.', faded: true, blankAnswer: 'ρ(D₂O) = 1.108 g cm⁻³ at 298 K (literature value 1.107 g.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_011', title: 'Hydrogen peroxide (H₂O₂) is a pale.',
          scaffold: { problem: 'Calculate the volume of oxygen gas (at STP) liberated when 50 mL of \'20 volume\' H₂O₂ solution decomposes completely.',
            steps: [
            { text: 'Interpret \'20 volume\' – 1 mL solution gives 20 mL O₂ at STP. So 50 mL gives 50 × 20 = 1000 mL = 1 L O₂.' },
            { text: 'Use stoichiometry: 2H₂O₂ → 2H₂O + O₂. 2 mol H₂O₂ (68 g) give 1 mol O₂ (22.4 L at STP).' },
            { text: 'Moles O₂ produced = 1 L / 22.4 L mol⁻¹ = 0.04464 mol.' },
            { text: 'Moles H₂O₂ = 2 × 0.04464 = 0.08929 mol. Mass H₂O₂ = 0.08929 × 34 = 3.036 g.' },
            { text: 'Verify: 3.036 g in 50 mL → 60.7 g/L → Molarity = 60.7/34 = 1.785 M. Volume strength = 11.2 × 1.785 ≈ 20 vol. Consistent.', faded: true, blankAnswer: 'O₂ volume = 1 L at STP; Mass H₂O₂ = 3.04 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_001', title: 'Hydrogen (H, Z=1) is the only element.',
          scaffold: { problem: 'A student claims "Hydrogen is an alkali metal because it has 1 valence electron and forms +1 oxidation state." Using quantitative periodic.',
            steps: [
            { text: 'Identify the claim to test - "hydrogen is an alkali metal" based on valence electron count and +1 oxidation state.' },
            { text: 'Select quantitative criteria for metallic character - low ionization enthalpy (easy electron loss), low electron gain.' },
            { text: 'Compare ionization enthalpies - H (1312 kJ/mol) is 2.5× Li (520) and 2.6× Na (496), meaning H holds its electron much.' },
            { text: 'Compare electron gain enthalpies - H (-73 kJ/mol) is similar to Li (-60) and Na (-53), but all are small; this doesn\'t.' },
            { text: 'Compare reduction potentials - H⁺/H₂ (0.00 V) is far less negative than Li⁺/Li (-3.04 V) and Na⁺/Na (-2.71 V), meaning.' },
            { text: 'Synthesize - Hydrogen matches alkali metals only in valence electron count (+1 oxidation state) but differs.', faded: true, blankAnswer: 'Hydrogen is NOT an alkali metal. It shares only the ns¹.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_003', title: 'Dihydrogen (H₂) is prepared in the.',
          scaffold: { problem: 'In a laboratory preparation, 6.5 g of pure zinc granules react with excess dilute HCl.',
            steps: [
            { text: 'Identify the reaction: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g). Note 1 mol Zn gives 1 mol H₂.' },
            { text: 'Calculate moles of Zn used: mass/molar mass = 6.5 g / 65 g/mol = 0.1 mol.' },
            { text: 'Use stoichiometry: moles of H₂ produced = 0.1 mol.' },
            { text: 'Convert moles to volume at STP: volume = moles × molar volume = 0.1 mol × 22.4 L/mol = 2.24 L.' },
            { text: 'Verify: The gas is collected over water? Problem says dry gas at STP, so no water vapour correction needed.', faded: true, blankAnswer: '2.24 L of dry dihydrogen gas at STP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_005', title: 'Dihydrogen (H₂) is the molecular form.',
          scaffold: { problem: 'An industrial plant produces 1.70 × 10³ kg of ammonia per day via the Haber process operating at 15% yield per pass.',
            steps: [
            { text: 'Calculate theoretical moles of NH₃ at 100% yield: actual mass = 1.70×10⁶ g; theoretical mass = 1.70×10⁶ / 0.15 =.' },
            { text: 'Use stoichiometry N₂ + 3H₂ → 2NH₃: moles H₂ required = (3/2) × moles NH₃ = 1.5 × 6.667×10⁵ = 1.00×10⁶ mol H₂' },
            { text: 'Convert to mass: mass H₂ = 1.00×10⁶ mol × 2 g mol⁻¹ = 2.00×10⁶ g = 2000 kg' },
            { text: 'Verify with N₂ requirement: moles N₂ = (1/2) × 6.667×10⁵ = 3.33×10⁵ mol; mass N₂ = 3.33×10⁵ × 28 = 9.33×10⁶ g = 9330.' },
            { text: 'Interpret: 2000 kg H₂/day feed needed; in practice recycle reduces fresh feed to ~300 kg/day', faded: true, blankAnswer: '2000 kg H₂ per day' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_09_010', title: 'Identify each idea',
          dissect: { specimen: 'Hydrides: Ionic, Covalent and Metallic', spots: [
            { id: 's1', label: 'Hydrides are binary compounds of', prompt: 'Which idea is this? — Hydrides are binary compounds of hydrogen with other elements (except noble gases),.', answer: 'Hydrides are binary compounds of', options: ['Hydrides are binary compounds of', 'Heavy water DO is the', 'Hydrogen peroxide HO is a', 'Hydrogen H Z1 is the'] },
            { id: 's2', label: 'Heavy water DO is the', prompt: 'Which idea is this? — Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen containing.', answer: 'Heavy water DO is the', options: ['Heavy water DO is the', 'Hydrides are binary compounds of', 'Hydrogen peroxide HO is a', 'Hydrogen H Z1 is the'] },
            { id: 's3', label: 'Hydrogen peroxide HO is a', prompt: 'Which idea is this? — Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as a versatile.', answer: 'Hydrogen peroxide HO is a', options: ['Hydrogen peroxide HO is a', 'Hydrides are binary compounds of', 'Heavy water DO is the', 'Hydrogen H Z1 is the'] },
            { id: 's4', label: 'Hydrogen H Z1 is the', prompt: 'Which idea is this? — Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits.', answer: 'Hydrogen H Z1 is the', options: ['Hydrogen H Z1 is the', 'Hydrides are binary compounds of', 'Heavy water DO is the', 'Hydrogen peroxide HO is a'] },
            { id: 's5', label: 'Dihydrogen H is prepared in', prompt: 'Which idea is this? — Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn, Fe) with.', answer: 'Dihydrogen H is prepared in', options: ['Dihydrogen H is prepared in', 'Hydrides are binary compounds of', 'Heavy water DO is the', 'Hydrogen peroxide HO is a'] },
            { id: 's6', label: 'Dihydrogen H is the molecular', prompt: 'Which idea is this? — Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing.', answer: 'Dihydrogen H is the molecular', options: ['Dihydrogen H is the molecular', 'Hydrides are binary compounds of', 'Heavy water DO is the', 'Hydrogen peroxide HO is a'] }
          ] } }
    ],
    explore: { component: C11_ChemistryAlkenespreparationandstructureSim, prompt: 'Explore the interactive — Hydrides: Ionic, Covalent and Metallic' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'standard',
          question: 'Hydrides are binary compounds of hydrogen with other elements (except noble.',
          hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'What is the oxidation state of hydrogen in sodium hydride (NaH) and why does it differ from hydrogen\'s oxidation state in methane (CH₄)?', answer: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)',
                  options: ['In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Explain why beryllium hydride (BeH₂) is covalent while magnesium hydride (MgH₂) is ionic, even though both are Group 2 elements.', answer: 'BeH₂ is covalent',
                  options: ['BeH₂ is covalent', 'both are ionic because Group 2', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'c', prompt: 'Write balanced chemical equations for the reaction of (a) CaH₂ with water, (b) B₂H₆ with water, and (c) TiH₂ with water.', answer: 'CaH₂ with water, (',
                  options: ['CaH₂ with water, (', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'A student claims: "All metallic hydrides are non-stoichiometric because hydrogen atoms randomly occupy interstitial sites in the metal lattice, so the.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Design a simple laboratory experiment to distinguish between an unknown ionic hydride (e.g., NaH) and an unknown covalent hydride (e.g., SiH₄) using only.', answer: 'Add small amounts of each solid/liquid hydride to separate test tubes with water',
                  options: ['Add small amounts of each solid/liquid hydride to separate test tubes with water', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_010', difficulty: 'standard',
          question: 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen.',
          hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007.',
          misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.',
          parts: [
                { id: 'a', prompt: 'State the molecular formula and molar mass of heavy water. How does its molar mass differ from that of ordinary water?', answer: 'Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)',
                  options: ['Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)', 'radioactive', 'heavy water toxicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'b', prompt: 'During electrolysis of ordinary water, the gas evolved at the cathode is richer in H₂ than D₂.', answer: 'Given x₀ = 0.000156, α = 1.05, f = 0.5',
                  options: ['Given x₀ = 0.000156, α = 1.05, f = 0.5', 'radioactive', 'heavy water toxicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'c', prompt: 'Compare the density of D₂O (1.107 g cm⁻³ at 298 K) and H₂O (0.997 g cm⁻³ at 298 K).', answer: 'The statement is partially correct in outcome but wrong in mechanism',
                  options: ['The statement is partially correct in outcome but wrong in mechanism', 'packing', 'radioactive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' }
          ],
            remediations: { 'heavy-water-is-radioactive-because': { steps: ['Revisit c11_chem_cbse_09_002 (Isotopes of Hydrogen) and explicitly list the nuclear composition (p, n) and stability of.', 'Write the nuclear equations: ¹H(n,γ)²H (stable), ²H(n,γ)³H (radioactive, t½=12.3 yr).', 'Complete a table comparing "Radioactive?" for H₂O, D₂O, T₂O.', 'Read the NCERT sidebar on heavy water toxicity (Class 11 Ch 9) to replace fear with quantitative fact.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_011', difficulty: 'standard',
          question: 'Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as a.',
          hint: 'Revisit c10_chem_cbse_01_007 and c10_chem_cbse_01_008; practice oxidation state of O in.',
          misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as a versatile',
                  options: ['Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as a versatile', 'Hydrides are binary compounds of hydrogen with other elements (except noble gases),', 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen containing', 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.' }
          ],
            remediations: { 'students-often-write-the-disproportionation': { steps: ['Review oxidation state rules (c10_chem_cbse_01_007) using H₂O₂ as practice: let x be O.S.', 'of O, 2(+1) + 2x = 0 → x = –1.', 'Write both half-reactions for H₂O₂ in acidic medium: reduction to H₂O and oxidation to O₂.', 'Watch a video of H₂O₂ decomposition catalyzed by MnO₂ (black solid) to visualize O₂ evolution.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.',
          parts: [
                { id: 'a', prompt: 'A student stores H₂O₂ in a clear glass bottle on a sunny windowsill. After a week, the solution no longer bleaches litmus.', answer: 'Errors: (1) Clear bottle allows UV light to catalyze decomposition',
                  options: ['Errors: (1) Clear bottle allows UV light to catalyze decomposition', 'it evaporated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the disproportionation of H₂O₂ as H₂O₂ → H₂O + O (atomic oxygen) instead of 2H₂O₂ → 2H₂O + O₂.' }
          ],
            remediations: { 'students-often-write-the-disproportionation': { steps: ['Review oxidation state rules (c10_chem_cbse_01_007) using H₂O₂ as practice: let x be O.S.', 'of O, 2(+1) + 2x = 0 → x = –1.', 'Write both half-reactions for H₂O₂ in acidic medium: reduction to H₂O and oxidation to O₂.', 'Watch a video of H₂O₂ decomposition catalyzed by MnO₂ (black solid) to visualize O₂ evolution.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'standard',
          question: 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at.',
          parts: [
                { id: 'a', prompt: 'Write the electronic configuration of hydrogen and state the two ions it can form by losing or gaining one electron.', answer: 'Electronic configuration: 1s¹',
                  options: ['Electronic configuration: 1s¹', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Compare the following pairs and identify which property shows hydrogen behaving like an alkali metal and which shows halogen-like behavior: (a) Reaction with.', answer: 'Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl',
                  options: ['Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.', 'Practice writing the three similarities/differences table with quantitative data (IE, EG, bond energy) for both groups.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Hydrogen should be placed in Group 1 because it forms H⁺ ions in acids like HCl, H₂SO₄, just as Na forms Na⁺ in NaCl." Evaluate this.', answer: 'The statement is chemically incomplete',
                  options: ['The statement is chemically incomplete', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Design a thought experiment: If you could measure the "metallic character index" M = (Ionization Enthalpy)⁻¹ × (Electron Gain Enthalpy) for H, Li, Na, F, Cl,.', answer: 'Calculate M = (1/IE) × |EG| (using absolute EG for index)',
                  options: ['Calculate M = (1/IE) × |EG| (using absolute EG for index)', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'c', prompt: 'Compare the following pairs and identify which property shows hydrogen behaving like an alkali metal and which shows halogen-like behavior: (a) Reaction with.', answer: 'Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl',
                  options: ['Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.', 'Practice writing the three similarities/differences table with quantitative data (IE, EG, bond energy) for both groups.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_003', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn,.',
          hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and.',
          misconception: 'Students often think that any metal reacts with any acid to give H₂.',
          parts: [
                { id: 'a', prompt: 'Name the gas evolved when zinc granules react with dilute sulphuric acid. Write the balanced chemical equation.', answer: 'The gas is dihydrogen (H₂)',
                  options: ['The gas is dihydrogen (H₂)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'b', prompt: 'Balance the equation for steam reforming of methane: CH₄(g) + H₂O(g) → CO(g) + H₂(g).', answer: 'Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)',
                  options: ['Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'c', prompt: 'Compare the purity of dihydrogen obtained from (a) Zn + dilute HCl and (b) electrolysis of acidified water. Which method gives higher purity and why?', answer: 'Electrolysis gives higher purity (99.9%)',
                  options: ['Electrolysis gives higher purity (99.9%)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' }
          ],
            remediations: { 'any-metal-reacts-with-any': { steps: ['Review the reactivity series from Class 10 (c10_chem_cbse_03_007) and identify metals above hydrogen.', 'Write the half-reactions for Zn → Zn²⁺ + 2e⁻ and 2H⁺ + 2e⁻ → H₂ to see the redox requirement.', 'Practice balancing the Zn/NaOH reaction with water molecules to form the tetrahydroxozincate ion.', 'For industrial methods, create a table comparing temperature, catalyst, and purity for each method.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any metal reacts with any acid to give H₂.',
          parts: [
                { id: 'a', prompt: 'A student writes the reaction of zinc with NaOH as: Zn + 2NaOH → Na₂ZnO₂ + H₂. Identify the error and write the correct equation with state symbols.', answer: 'Error: sodium zincate is Na₂[Zn(OH)₄] (or Na₂ZnO₂·2H₂O), not Na₂ZnO₂ alone',
                  options: ['Error: sodium zincate is Na₂[Zn(OH)₄] (or Na₂ZnO₂·2H₂O), not Na₂ZnO₂ alone', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' }
          ],
            remediations: { 'any-metal-reacts-with-any': { steps: ['Review the reactivity series from Class 10 (c10_chem_cbse_03_007) and identify metals above hydrogen.', 'Write the half-reactions for Zn → Zn²⁺ + 2e⁻ and 2H⁺ + 2e⁻ → H₂ to see the redox requirement.', 'Practice balancing the Zn/NaOH reaction with water molecules to form the tetrahydroxozincate ion.', 'For industrial methods, create a table comparing temperature, catalyst, and purity for each method.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_005', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a.',
          hint: 'Review Class 10 redox balancing (c10_chem_cbse_01_008) and Class 11 equilibrium (not in.',
          misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing',
                  options: ['Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing', 'Hydrides are binary compounds of hydrogen with other elements (except noble gases),', 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen containing', 'Hydrogen peroxide (H₂O₂) is a pale blue, viscous liquid that acts as a versatile'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail to recognize that the.' }
          ],
            remediations: { 'students-write-the-hydrogenation-of': { steps: ['Draw the structure of a typical triglyceride with three oleic acid chains (one C=C each).', 'Count C=C bonds = 3 per molecule.', 'Write addition of H₂ across each C=C: –CH=CH– + H₂ → –CH₂–CH₂–.', 'Balance: 1 mol triglyceride + 3 mol H₂ → fully saturated triglyceride.', 'Practice with simpler alkene: CH₃CH=CHCH₃ + H₂ → CH₃CH₂CH₂CH₃ (1:1 ratio), then scale to three double bonds.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
