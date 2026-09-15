import type { SimDef } from '../../engine/types';
import C10_ChemistrySulphuricacidContactprocessSim from '../../../simulations/c6_12/C10_ChemistrySulphuricacidContactprocessSim';

/** v3 wrapped master — C10_ChemistrySulphuricacidContactprocessSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_chemistrysulphuricacidcontactprocesssim: SimDef = {
    id: 'v3w_c10_chemistrysulphuricacidcontactprocesssim',
    title: 'Sulphuricacid Contactprocess',
    subtitle: 'Covers physical properties, chemical reactions (with sodium, sodium hydroxide, sodium.',
    classLevel: 10, subject: 'chemistry', topic: 'Important Carbon Compounds: Ethanol and Ethanoic Acid (Properties)',
    chapters: [],
    nodeIds: ['c10_chem_cbse_04_011', 'c10_chem_cbse_04_012', 'c10_chem_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe how a few drops of ethanol on your palm evaporate quickly leaving a cooling sensation, while vinegar.', goal: 'Master Sulphuricacid Contactprocess.' },
    discovery: {
        question: 'A student takes 5 g of castor oil (a triglyceride) and adds 20 mL of 20% NaOH solution. The mixture is heated and then common salt (NaCl) is added.',
        options: ['Process: Saponification', 'dissolves', 'oil dissolves in the tail'],
        answer: 'Process: Saponification',
        hook: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
    },
    teaching: [
        { title: 'Ethanol (C₂H₅OH) is a two-carbon alcohol.', text: 'Ethanol (C₂H₅OH) is a two-carbon alcohol with a hydroxyl (–OH) functional group, and ethanoic acid (CH₃COOH) is a two-carbon carboxylic acid with a carboxyl (–COOH) functional group; both are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_011', title: 'Ethanol (C₂H₅OH) is a two-carbon.',
          scaffold: { problem: 'A student adds 2 mL of ethanol to a test tube, followed by a small piece of sodium metal (approx. 0.1 g). Effervescence occurs.',
            steps: [
            { text: 'Identify the reactants in each test — Reaction 1: Ethanol (CH₃CH₂OH) + Sodium (Na).' },
            { text: 'Recall the reaction type — Active metals (Na) react with compounds having acidic hydrogen (–OH in alcohols, –COOH in.' },
            { text: 'Write skeleton equations and balance — (i) 2CH₃CH₂OH + 2Na → 2CH₃CH₂ONa + H₂↑. (ii) 2CH₃COOH + 2Na → 2CH₃COONa + H₂↑.' },
            { text: 'Explain the difference in NaHCO₃ reactivity — Ethanoic acid (pKa ≈ 4.76) is stronger than carbonic acid (H₂CO₃, pKa₁ ≈.' },
            { text: 'Verify atom balance and states — All equations balanced: Na: 2 each side; C: 2, 2, 2, 2; H: 6+2=8 vs 5+3=8 (eq i), etc.', faded: true, blankAnswer: '(i) 2CH₃CH₂OH(l) + 2Na(s) → 2CH₃CH₂ONa(aq) + H₂(g)↑' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_012', title: 'Soaps are sodium or potassium salts of.',
          scaffold: { problem: '10 g of a fat (triglyceride with three identical stearic acid chains, C₁₇H₃₅COOH) is completely saponified using excess NaOH.',
            steps: [
            { text: 'Write the balanced chemical equation for saponification of the triglyceride.' },
            { text: 'Calculate molar masses. Molar mass of glyceryl tristearate = 3×(C₁₈H₃₆O₂) + C₃H₅O₃ - 3H₂O?' },
            { text: 'Use stoichiometry. 1 mol triglyceride (890 g) gives 3 mol sodium stearate (3×306 = 918 g). So 890 g fat → 918 g soap.' },
            { text: 'Verify limiting reagent. NaOH is in excess, so fat is limiting. Calculation is correct.' },
            { text: 'Interpret result. The mass of soap is slightly more than the fat taken because Na (23) replaces H (1) in each chain,.', faded: true, blankAnswer: '10.31 g of sodium stearate soap.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_02_011', title: 'The chlor-alkali process is the.',
          scaffold: { problem: 'In a chlor-alkali cell, 585 g of NaCl is electrolyzed using concentrated brine.',
            steps: [
            { text: 'Identify the balanced overall equation: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂.' },
            { text: 'Calculate moles of NaCl used: mass / molar mass = 585 g / 58.5 g/mol = 10 mol.' },
            { text: 'Use stoichiometry from balanced equation: 2 mol NaCl produce 2 mol NaOH, 1 mol Cl₂, 1 mol H₂.' },
            { text: 'Calculate mass of NaOH = moles × molar mass = 10 mol × 40 g/mol = 400 g.' },
            { text: 'Calculate gas volumes at STP: Volume = moles × 22.4 L/mol. Cl₂ = 5 × 22.4 = 112 L. H₂ = 5 × 22.4 = 112 L.', faded: true, blankAnswer: 'NaOH = 400 g; Cl₂ = 112 L at STP; H₂ = 112 L at STP.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_04_012', title: 'Identify each idea',
          dissect: { specimen: 'Sulphuricacid Contactprocess', spots: [
            { id: 's1', label: 'Ethanol CHOH is a two-carbon', prompt: 'Which idea is this? — Ethanol (C₂H₅OH) is a two-carbon alcohol with a hydroxyl (–OH) functional group, and.', answer: 'Ethanol CHOH is a two-carbon', options: ['Ethanol CHOH is a two-carbon', 'Soaps are sodium or potassium', 'The chlor-alkali process is the'] },
            { id: 's2', label: 'Soaps are sodium or potassium', prompt: 'Which idea is this? — Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty acids) with the.', answer: 'Soaps are sodium or potassium', options: ['Soaps are sodium or potassium', 'Ethanol CHOH is a two-carbon', 'The chlor-alkali process is the'] },
            { id: 's3', label: 'The chlor-alkali process is the', prompt: 'Which idea is this? — The chlor-alkali process is the industrial electrolysis of concentrated aqueous sodium.', answer: 'The chlor-alkali process is the', options: ['The chlor-alkali process is the', 'Ethanol CHOH is a two-carbon', 'Soaps are sodium or potassium'] }
          ] } }
    ],
    explore: { component: C10_ChemistrySulphuricacidContactprocessSim, prompt: 'Explore the interactive — Sulphuricacid Contactprocess' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_011', difficulty: 'standard',
          question: 'Ethanol (C₂H₅OH) is a two-carbon alcohol with a hydroxyl (–OH) functional.',
          hint: 'If stuck, revisit c10_chem_cbse_04_006 (Functional Groups) and c9_chem_ch3_6 (Writing.',
          misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is.',
          parts: [
                { id: 'a', prompt: 'Ethanol reacts with sodium metal to give hydrogen gas. Ethanoic acid also reacts with sodium metal to give hydrogen gas.', answer: 'Both react with Na',
                  options: ['Both react with Na', 'both are equally acidic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is a *catalyst and.' },
                { id: 'b', prompt: 'Compare the oxidation of ethanol and ethanoic acid using alkaline KMnO₄ or acidified K₂Cr₂O₇. What products form?', answer: 'Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)',
                  options: ['Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)', 'ethanoic acid oxidises to CO₂ and H₂O'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is a *catalyst and.' }
          ],
            remediations: { 'students-write-the-esterification-equation': { steps: ['Revisit c10_chem_cbse_04_006 (Functional Groups) — draw the –COOH and –OH groups side by side, circle the atoms.', 'Write the mechanism mentally: protonation of carbonyl O by H₂SO₄, nucleophilic attack by alcohol O, proton transfer,.', 'Practise writing the equation *with conditions above arrow* five times: CH₃COOH + CH₃CH₂OH ⇌[conc.', 'Test yourself — can you explain why the reaction is reversible and how Le Chatelier\'s principle applies (remove water.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is.',
          parts: [
                { id: 'a', prompt: 'Compare the oxidation of ethanol and ethanoic acid using alkaline KMnO₄ or acidified K₂Cr₂O₇. What products form?', answer: 'Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)',
                  options: ['Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)', 'ethanoic acid oxidises to CO₂ and H₂O'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is a *catalyst and.' }
          ],
            remediations: { 'students-write-the-esterification-equation': { steps: ['Revisit c10_chem_cbse_04_006 (Functional Groups) — draw the –COOH and –OH groups side by side, circle the atoms.', 'Write the mechanism mentally: protonation of carbonyl O by H₂SO₄, nucleophilic attack by alcohol O, proton transfer,.', 'Practise writing the equation *with conditions above arrow* five times: CH₃COOH + CH₃CH₂OH ⇌[conc.', 'Test yourself — can you explain why the reaction is reversible and how Le Chatelier\'s principle applies (remove water.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_012', difficulty: 'standard',
          question: 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty.',
          hint: 'If stuck, revise c10_chem_cbse_04_006 (Functional Groups) and c10_chem_cbse_04_010.',
          misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
          parts: [
                { id: 'a', prompt: 'A student takes 5 g of castor oil (a triglyceride) and adds 20 mL of 20% NaOH solution. The mixture is heated and then common salt (NaCl) is added.', answer: 'Process: Saponification',
                  options: ['Process: Saponification', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' },
                { id: 'b', prompt: 'Compare the cleansing action of soap and detergent in (i) soft water, (ii) hard water, and (iii) acidic water. Explain the chemical reason for each case.', answer: '(i) Soft water: Both work well',
                  options: ['(i) Soft water: Both work well', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' }
          ],
            remediations: { 'the-hydrophobic-tail-of-soap': { steps: ['Revisit the concept of "like dissolves like" from Class 9 (c9_chem_ch1_2 — Solutions) and colloids (c9_chem_ch1_10 —.', 'Draw a soap molecule on paper: label head (–COO⁻Na⁺) and tail (–CH₂–CH₂–).', 'Simulate micelle formation: draw a circle (micelle) with heads on the outside facing water, tails inside forming a.', 'Watch a 2-minute animation of micelle formation (search "soap micelle animation" on YouTube).', 'Write the difference between *dissolving* (true solution) and *emulsifying* (colloidal suspension) in your own words.', 'Attempt Diagnostic Question 2 again.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Soaps are better than detergents because they are biodegradable and do not cause water pollution." Evaluate this statement.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' },
                { id: 'b', prompt: 'Compare the cleansing action of soap and detergent in (i) soft water, (ii) hard water, and (iii) acidic water. Explain the chemical reason for each case.', answer: '(i) Soft water: Both work well',
                  options: ['(i) Soft water: Both work well', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' }
          ],
            remediations: { 'the-hydrophobic-tail-of-soap': { steps: ['Revisit the concept of "like dissolves like" from Class 9 (c9_chem_ch1_2 — Solutions) and colloids (c9_chem_ch1_10 —.', 'Draw a soap molecule on paper: label head (–COO⁻Na⁺) and tail (–CH₂–CH₂–).', 'Simulate micelle formation: draw a circle (micelle) with heads on the outside facing water, tails inside forming a.', 'Watch a 2-minute animation of micelle formation (search "soap micelle animation" on YouTube).', 'Write the difference between *dissolving* (true solution) and *emulsifying* (colloidal suspension) in your own words.', 'Attempt Diagnostic Question 2 again.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_011', difficulty: 'standard',
          question: 'The chlor-alkali process is the industrial electrolysis of concentrated aqueous.',
          hint: 'If stuck, revisit the electrolysis of water (Class 10 Physics) and the reactivity series.',
          misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation.',
          parts: [
                { id: 'a', prompt: 'What is the name of the industrial process used to produce sodium hydroxide from common salt, and what are the three main products formed?', answer: 'The process is called the chlor-alkali process',
                  options: ['The process is called the chlor-alkali process', 'electrolysis of water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' }
          ],
            remediations: { 'students-often-write-the-anode': { steps: ['Revisit the reactivity series (Class 9, c9_chem_ch3_5) — Na⁺ is very low, so it cannot be reduced by water; H₂O reduces.', 'Review competitive electrode discharge (Class 10, this chapter\'s electrolysis concept) — compare concentration and.', 'Write the two half-reactions side by side on paper: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode: 2Cl⁻ → Cl₂ + 2e⁻.', 'Add them, cancel electrons, and verify atoms/charge balance.', 'Say aloud: "Concentrated brine gives Cl₂, not O₂; water gives H₂, not Na." Repeat until automatic.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation.',
          parts: [
                { id: 'a', prompt: 'A student writes the overall equation for the chlor-alkali process as: NaCl(aq) + H₂O(l) → NaOH(aq) + HCl(aq). Evaluate this equation.', answer: 'The equation is incorrect for the industrial chlor-alkali process',
                  options: ['The equation is incorrect for the industrial chlor-alkali process', 'it\'s correct because NaCl and water react'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the anode reaction as 4OH⁻ → O₂ + 2H₂O + 4e⁻ (like in water electrolysis) and the overall equation as 2NaCl + 2H₂O →.' }
          ],
            remediations: { 'students-often-write-the-anode': { steps: ['Revisit the reactivity series (Class 9, c9_chem_ch3_5) — Na⁺ is very low, so it cannot be reduced by water; H₂O reduces.', 'Review competitive electrode discharge (Class 10, this chapter\'s electrolysis concept) — compare concentration and.', 'Write the two half-reactions side by side on paper: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻; Anode: 2Cl⁻ → Cl₂ + 2e⁻.', 'Add them, cancel electrons, and verify atoms/charge balance.', 'Say aloud: "Concentrated brine gives Cl₂, not O₂; water gives H₂, not Na." Repeat until automatic.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
