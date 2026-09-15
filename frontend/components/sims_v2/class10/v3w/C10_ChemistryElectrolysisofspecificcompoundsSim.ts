import type { SimDef } from '../../engine/types';
import C10_ChemistryElectrolysisofspecificcompoundsSim from '../../../simulations/c6_12/C10_ChemistryElectrolysisofspecificcompoundsSim';

/** v3 wrapped master — C10_ChemistryElectrolysisofspecificcompoundsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_chemistryelectrolysisofspecificcompoundssim: SimDef = {
    id: 'v3w_c10_chemistryelectrolysisofspecificcompoundssim',
    title: 'Electrolysisofspecificcompounds',
    subtitle: 'This node covers the three main types of decomposition reactions (thermal, electrolytic,.',
    classLevel: 10, subject: 'chemistry', topic: 'Types of Reactions: Decomposition Reactions (Thermal, Electrolytic, Photo)',
    chapters: [],
    nodeIds: ['c10_chem_cbse_01_004', 'c10_chem_cbse_01_009', 'c10_chem_cbse_03_010', 'c10_chem_cbse_03_011', 'c10_chem_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Start with a real-world observation: When you heat green ferrous sulphate crystals in a test tube, they turn.', goal: 'Master Electrolysisofspecificcompounds.' },
    discovery: {
        question: 'Define corrosion and write the chemical formula of rust. State the two essential conditions required for rusting of iron.',
        options: ['Corrosion is the gradual destruction of metals by electrochemical reaction with', 'rust is Fe₂O₃ only', 'only air is needed'],
        answer: 'Corrosion is the gradual destruction of metals by electrochemical reaction with',
        hook: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple.',
    },
    teaching: [
        { title: 'A decomposition reaction is a chemical.', text: 'A decomposition reaction is a chemical reaction in which a single compound breaks down into two or more simpler substances (elements or compounds) under the influence of heat, light, or electricity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_004', title: 'A decomposition reaction is a chemical.',
          scaffold: { problem: 'A student heats 10 g of calcium carbonate (CaCO₃) in a test tube. The reaction is: CaCO₃(s) → CaO(s) + CO₂(g).',
            steps: [
            { text: 'Identify the given mass of reactant (10 g CaCO₃) and the balanced equation (already balanced: 1:1:1 mole ratio).' },
            { text: 'Calculate moles of CaCO₃ = mass / molar mass = 10 g / 100 g/mol = 0.1 mol.' },
            { text: 'Use stoichiometry: 1 mol CaCO₃ produces 1 mol CaO, so 0.1 mol CaCO₃ produces 0.1 mol CaO.' },
            { text: 'Calculate mass of CaO = moles × molar mass = 0.1 mol × 56 g/mol = 5.6 g.' },
            { text: 'Verify using law of conservation of mass: Mass of CO₂ = 0.1 mol × 44 g/mol = 4.4 g; total products = 5.6 + 4.4 = 10 g.', faded: true, blankAnswer: '5.6 g of calcium oxide.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_009', title: 'Corrosion is the gradual deterioration.',
          scaffold: { problem: 'Write the step-by-step derivation of the balanced overall chemical equation for rust formation starting from the half-reactions.',
            steps: [
            { text: 'Identify the oxidation half-reaction at the anode: Iron metal loses electrons to form iron(II) ions.' },
            { text: 'Identify the reduction half-reaction at the cathode: Dissolved oxygen gains electrons in water to form hydroxide ions.' },
            { text: 'Balance electrons: Multiply oxidation half-reaction by 2 so electrons lost = electrons gained (4e⁻).' },
            { text: 'Add the two half-reactions and cancel electrons: 2Fe(s) + O₂(g) + 2H₂O(l) → 2Fe²⁺(aq) + 4OH⁻(aq)' },
            { text: 'Combine ions to form iron(II) hydroxide precipitate: 2Fe²⁺(aq) + 4OH⁻(aq) → 2Fe(OH)₂(s)' },
            { text: 'Iron(II) hydroxide is further oxidized by atmospheric oxygen to iron(III) hydroxide, which dehydrates to rust:.', faded: true, blankAnswer: '4Fe(s) + 3O₂(g) + 6H₂O(l) → 2Fe₂O₃·3H₂O(s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_010', title: 'Extraction of metals from their ores.',
          scaffold: { problem: 'Zinc is extracted from its sulfide ore, zinc blende (ZnS). Write the sequence of chemical reactions with balanced equations for: (i).',
            steps: [
            { text: 'Identify the ore and its type. Zinc blende is ZnS, a sulfide ore.' },
            { text: 'Write the roasting reaction. ZnS reacts with O₂ to form ZnO and SO₂. Balance: 2ZnS + 3O₂ → 2ZnO + 2SO₂.' },
            { text: 'Identify the reduction step. The roasted product is ZnO. Zinc is in the middle of the reactivity series (below carbon),.' },
            { text: 'Write the reduction reaction. ZnO + C → Zn + CO (at high T, Zn distills off as vapour). Balance: ZnO + C → Zn + CO.' },
            { text: 'Verify atom balance and oxidation states. Roasting: Zn (+2), S (-2) → Zn (+2), S (+4) in SO₂.', faded: true, blankAnswer: '(i) Roasting: 2ZnS(s) + 3O₂(g) → 2ZnO(s) + 2SO₂(g) (ii).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_011', title: 'Electrolytic refining is the process of.',
          scaffold: { problem: 'In an electrolytic refining cell for copper, the impure anode contains 5% iron and 2% silver by mass.',
            steps: [
            { text: 'Identify the behaviour of each impurity using reactivity series.' },
            { text: 'Calculate mass of each impurity in 10 kg anode. Mass of Fe = 5% of 10 kg = 0.5 kg = 500 g.' },
            { text: 'Determine fate. All 500 g Fe oxidises to Fe²⁺ and enters solution.' },
            { text: 'Verify charge balance. The electrons from Fe oxidation (500 g / 56 g/mol × 2 mol e⁻/mol = 17.86 mol e⁻) and Cu.' },
            { text: 'State final answer with units and reasoning.', faded: true, blankAnswer: '(a) 500 g of iron enters solution as Fe²⁺ ions. (b) 200 g.' }
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
        { type: 'dissect', nodeId: 'c10_chem_cbse_01_009', title: 'Identify each idea',
          dissect: { specimen: 'Electrolysisofspecificcompounds', spots: [
            { id: 's1', label: 'A decomposition reaction is a', prompt: 'Which idea is this? — A decomposition reaction is a chemical reaction in which a single compound breaks down.', answer: 'A decomposition reaction is a', options: ['A decomposition reaction is a', 'Corrosion is the gradual deterioration', 'Extraction of metals from their', 'Electrolytic refining is the process'] },
            { id: 's2', label: 'Corrosion is the gradual deterioration', prompt: 'Which idea is this? — Corrosion is the gradual deterioration of a metal due to electrochemical reaction with.', answer: 'Corrosion is the gradual deterioration', options: ['Corrosion is the gradual deterioration', 'A decomposition reaction is a', 'Extraction of metals from their', 'Electrolytic refining is the process'] },
            { id: 's3', label: 'Extraction of metals from their', prompt: 'Which idea is this? — Extraction of metals from their ores involves three main sequential steps: enrichment.', answer: 'Extraction of metals from their', options: ['Extraction of metals from their', 'A decomposition reaction is a', 'Corrosion is the gradual deterioration', 'Electrolytic refining is the process'] },
            { id: 's4', label: 'Electrolytic refining is the process', prompt: 'Which idea is this? — Electrolytic refining is the process of purifying impure metal by using it as the anode.', answer: 'Electrolytic refining is the process', options: ['Electrolytic refining is the process', 'A decomposition reaction is a', 'Corrosion is the gradual deterioration', 'Extraction of metals from their'] },
            { id: 's5', label: 'The chlor-alkali process is the', prompt: 'Which idea is this? — The chlor-alkali process is the industrial electrolysis of concentrated aqueous sodium.', answer: 'The chlor-alkali process is the', options: ['The chlor-alkali process is the', 'A decomposition reaction is a', 'Corrosion is the gradual deterioration', 'Extraction of metals from their'] }
          ] } }
    ],
    explore: { component: C10_ChemistryElectrolysisofspecificcompoundsSim, prompt: 'Explore the interactive — Electrolysisofspecificcompounds' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_004', difficulty: 'standard',
          question: 'A decomposition reaction is a chemical reaction in which a single compound.',
          hint: 'If stuck, revisit writing chemical formulae using valency cross method (c9_chem_ch3_6).',
          misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.',
          parts: [
                { id: 'a', prompt: 'Why does the decomposition of silver chloride require light, while calcium carbonate requires heat? Explain the difference in energy sources.', answer: 'Silver chloride decomposes via photolytic decomposition',
                  options: ['Silver chloride decomposes via photolytic decomposition', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' },
                { id: 'b', prompt: 'Balance the following equation for the thermal decomposition of lead nitrate: Pb(NO₃)₂(s) → PbO(s) + NO₂(g) + O₂(g). Identify the type of decomposition.', answer: 'Balanced equation: 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)',
                  options: ['Balanced equation: 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' },
                { id: 'c', prompt: 'Compare the products of thermal decomposition of metal carbonates (e.g., CaCO₃) and metal nitrates (e.g., Cu(NO₃)₂).', answer: 'Metal carbonates decompose to metal oxide and CO₂',
                  options: ['Metal carbonates decompose to metal oxide and CO₂', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' }
          ],
            remediations: { 'any-reaction-producing-a-gas': { steps: ['If a student makes this error, show them side-by-side: decomposition (CaCO₃ → CaO + CO₂) vs.', 'single displacement (Zn + 2HCl → ZnCl₂ + H₂).', 'Have them count reactants: one vs.', 'Then practice identifying reaction type from given equations, emphasizing the number of reactants.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.',
          parts: [
                { id: 'a', prompt: 'A student writes the electrolytic decomposition of water as: H₂O(l) → H₂(g) + O₂(g). Is this equation correct? Justify your answer.', answer: 'The equation is not balanced',
                  options: ['The equation is not balanced', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate photolytic decomposition of silver bromide. List materials, procedure, and expected observation.', answer: 'Materials: Silver bromide (AgBr), watch glass, sunlight',
                  options: ['Materials: Silver bromide (AgBr), watch glass, sunlight', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' }
          ],
            remediations: { 'any-reaction-producing-a-gas': { steps: ['If a student makes this error, show them side-by-side: decomposition (CaCO₃ → CaO + CO₂) vs.', 'single displacement (Zn + 2HCl → ZnCl₂ + H₂).', 'Have them count reactants: one vs.', 'Then practice identifying reaction type from given equations, emphasizing the number of reactants.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_009', difficulty: 'standard',
          question: 'Corrosion is the gradual deterioration of a metal due to electrochemical.',
          hint: 'Revisit the definitions of oxidation and reduction in terms of electron transfer.',
          misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple.',
          parts: [
                { id: 'a', prompt: 'Define corrosion and write the chemical formula of rust. State the two essential conditions required for rusting of iron.', answer: 'Corrosion is the gradual destruction of metals by electrochemical reaction with',
                  options: ['Corrosion is the gradual destruction of metals by electrochemical reaction with', 'rust is Fe₂O₃ only', 'only air is needed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple combination reaction.' },
                { id: 'b', prompt: 'Explain why rusting is classified as an oxidation reaction. Why does an iron nail rust faster in salt water than in pure water?', answer: 'Rusting is oxidation',
                  options: ['Rusting is oxidation', 'salt reacts with iron', 'rusting is not redox'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple combination reaction.' }
          ],
            remediations: { 'students-write-the-rust-formula': { steps: ['Revisit the classic 3-test-tube rusting experiment (c7_chem_ch02_005) — perform it physically or watch a video,.', 'Write the two half-reactions (Fe → Fe²⁺ + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻) and combine them step-by-step to derive the.', 'Compare a rusted nail (flaky) with an aluminium foil (shiny) — discuss why Al₂O₃ protects but Fe₂O₃ doesn\'t.', 'For galvanization, draw a diagram of scratched galvanized iron showing Zn²⁺ ions entering solution and electrons.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_010', difficulty: 'standard',
          question: 'Extraction of metals from their ores involves three main sequential steps:.',
          hint: 'If stuck, revise the reactivity series node (c10_chem_cbse_03_007) and the displacement.',
          misconception: 'Students often write the reduction of haematite (Fe₂O₃) in a blast furnace as a single-step reaction: Fe₂O₃ + 3C → 2Fe.',
          parts: [
                { id: 'a', prompt: 'Name the process used to convert zinc carbonate (calamine) ore into zinc oxide. Write the balanced chemical equation.', answer: 'Calcination is the process',
                  options: ['Calcination is the process', 'roasting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the reduction of haematite (Fe₂O₃) in a blast furnace as a single-step reaction: Fe₂O₃ + 3C → 2Fe + 3CO.' }
          ],
            remediations: { 'students-often-write-the-reduction': { steps: ['Draw a labelled diagram of a blast furnace with temperature zones (500 K, 800 K, 1200 K, 1500 K).', 'Write the three reduction steps on sticky notes: Fe₂O₃ → Fe₃O₄ → FeO → Fe.', 'Place each sticky note on the correct temperature zone of the diagram.', 'For each step, write the balanced equation with CO (upper zones) or C (lower zone).', 'Practice writing the overall reaction as the sum of steps, verifying atom balance.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_011', difficulty: 'standard',
          question: 'Electrolytic refining is the process of purifying impure metal by using it as.',
          hint: 'If stuck, review the reactivity series (c10_chem_cbse_03_007) and practice writing.',
          misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.',
          parts: [
                { id: 'a', prompt: 'During electrolytic refining of copper, a current of 2.0 A is passed for 30 minutes through the cell.', answer: 'Step 1: Charge Q = I × t = 2.0 A × (30 × 60) s = 3600 C',
                  options: ['Step 1: Charge Q = I × t = 2.0 A × (30 × 60) s = 3600 C', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' },
                { id: 'b', prompt: 'Compare the anode reaction in electrolytic refining of copper with the anode reaction in the electrolysis of aqueous copper sulphate using INERT (platinum).', answer: 'In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)',
                  options: ['In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)', 'both produce O₂', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' }
          ],
            remediations: { 'during-electrolytic-refining': { steps: ['Revisit the reactivity series (c10_chem_cbse_03_007) and identify which metals are above copper (Fe, Zn, Al, Mg) and.', 'Recall the rule: "Metal higher in series = more reactive = oxidises easily = stays in solution." "Metal lower in series.', 'Practice writing anode half-reactions for Fe, Zn, Cu, Ag.', 'Draw a table: Impurity | Position in reactivity series vs Cu | Behaviour at anode | Final location.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.',
          parts: [
                { id: 'a', prompt: 'A student sets up electrolytic refining of copper but accidentally uses a pure copper anode and an impure copper cathode.', answer: 'No, it will not work',
                  options: ['No, it will not work', 'yes, pure copper deposits', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' },
                { id: 'b', prompt: 'Compare the anode reaction in electrolytic refining of copper with the anode reaction in the electrolysis of aqueous copper sulphate using INERT (platinum).', answer: 'In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)',
                  options: ['In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)', 'both produce O₂', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' }
          ],
            remediations: { 'during-electrolytic-refining': { steps: ['Revisit the reactivity series (c10_chem_cbse_03_007) and identify which metals are above copper (Fe, Zn, Al, Mg) and.', 'Recall the rule: "Metal higher in series = more reactive = oxidises easily = stays in solution." "Metal lower in series.', 'Practice writing anode half-reactions for Fe, Zn, Cu, Ag.', 'Draw a table: Impurity | Position in reactivity series vs Cu | Behaviour at anode | Final location.'] } } },
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
