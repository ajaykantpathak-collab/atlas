import type { SimDef } from '../../engine/types';
import C10_ScienceChemicalReactionsAndEquationsSim from '../../../simulations/c6_12/C10_ScienceChemicalReactionsAndEquationsSim';

/** v3 wrapped master — C10_ScienceChemicalReactionsAndEquationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencechemicalreactionsandequationssim: SimDef = {
    id: 'v3w_c10_sciencechemicalreactionsandequationssim',
    title: 'Chemical Reactions And Equations',
    subtitle: 'Covers the five classic signs of a chemical change (gas evolution, precipitate formation,.',
    classLevel: 10, subject: 'science', topic: 'Chemical Reactions: Identifying a Chemical Change (Signs)',
    chapters: [],
    nodeIds: ['c10_chem_cbse_01_001', 'c10_chem_cbse_01_002', 'c10_chem_cbse_01_003', 'c10_chem_cbse_01_004', 'c10_chem_cbse_01_005', 'c10_chem_cbse_01_006', 'c10_chem_cbse_01_007', 'c10_chem_cbse_01_008', 'c10_chem_cbse_01_009', 'c10_bio_cbse_01_002', 'c10_bio_cbse_01_003', 'c10_chem_cbse_02_004', 'c10_chem_cbse_02_005', 'c10_chem_cbse_02_006', 'c10_chem_cbse_02_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Begin with a real-world observation: a student notices a white deposit on the bathroom tiles (limescale) that.', goal: 'Master Chemical Reactions And Equations.' },
    discovery: {
        question: 'Why is the reaction CaO(s) + H₂O(l) → Ca(OH)₂(aq) classified as a combination reaction, even though one reactant is a compound and the product is a solution?',
        options: ['It is a combination reaction', 'because it produces heat', 'because CaO is a solid and water is liquid'],
        answer: 'It is a combination reaction',
        hook: '**Exact error:** Students believe combination reactions ONLY occur between two elements.',
    },
    teaching: [
        { title: 'A chemical change (chemical reaction) is a.', text: 'A chemical change (chemical reaction) is a process in which one or more substances (reactants) undergo a transformation to form one or more new substances (products) with different chemical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_001', title: 'A chemical change (chemical reaction).',
          scaffold: { problem: 'A student performs three experiments: (A) Adds dilute HCl to zinc granules. (B) Heats copper sulphate crystals.',
            steps: [
            { text: 'Identify the reactants and conditions for each experiment. (A) Zn(s) + 2HCl(aq); (B) CuSO₄·5H₂O(s) heated; (C).' },
            { text: 'Recall the expected observations for each from textbook activities. (A) Bubbles of gas (H₂), test tube becomes warm.' },
            { text: 'Classify each observation as a sign of chemical change. (A) Gas evolution + temperature rise → chemical change.' },
            { text: 'Write balanced chemical equations for the chemical changes. (A) Zn + 2HCl → ZnCl₂ + H₂↑.' },
            { text: 'Verify atom balance and states. For (A): Zn:1, H:2, Cl:2 on both sides.', faded: true, blankAnswer: '(A) Chemical change: gas evolution (H₂), temperature rise..' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_002', title: 'A chemical equation is a symbolic.',
          scaffold: { problem: 'Solid potassium chlorate decomposes on heating to give solid potassium chloride and oxygen gas.',
            steps: [
            { text: 'Identify reactants and products from word equation. Reactant: potassium chlorate (KClO₃).' },
            { text: 'Write skeleton equation with correct formulas and states: KClO₃(s) → KCl(s) + O₂(g).' },
            { text: 'Count atoms: Left: K=1, Cl=1, O=3. Right: K=1, Cl=1, O=2. Oxygen unbalanced (3 vs 2).' },
            { text: 'Balance O by finding LCM of 3 and 2 = 6. Put 2 before KClO₃ (gives 6 O) and 3 before O₂ (gives 6 O): 2KClO₃(s) → KCl(s).' },
            { text: 'Re-check K and Cl: Left K=2, Cl=2. Right K=1, Cl=1. Balance by putting 2 before KCl: 2KClO₃(s) → 2KCl(s) + 3O₂(g).' },
            { text: 'Final verification: K=2, Cl=2, O=6 on both sides. Equation balanced.', faded: true, blankAnswer: '2KClO₃(s) → 2KCl(s) + 3O₂(g)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_003', title: 'A combination reaction is a chemical.',
          scaffold: { problem: '** When a magnesium ribbon is burnt in air, it forms magnesium oxide. Write the balanced chemical equation with physical states.',
            steps: [
            { text: 'Identify reactants and product. Reactants: Magnesium (Mg, solid) and Oxygen (O₂, gas).' },
            { text: 'Write skeletal equation: Mg(s) + O₂(g) → MgO(s).' },
            { text: 'Balance the equation. Balance Mg: 2 Mg on left → 2 MgO on right. Now 2 O on right, so O₂ on left is balanced.' },
            { text: 'Calculate molar masses: Mg = 24 g/mol, O₂ = 32 g/mol, MgO = 40 g/mol. Moles of Mg used = 12 g / 24 g/mol = 0.5 mol.' },
            { text: 'Stoichiometry: 2 mol Mg produce 2 mol MgO → 1:1 ratio. So 0.5 mol Mg produces 0.5 mol MgO.' },
            { text: 'Verify with conservation of mass: Mass of O₂ consumed = 0.25 mol × 32 g/mol = 8 g.', faded: true, blankAnswer: '** Balanced equation: 2Mg(s) + O₂(g) → 2MgO(s). Mass of MgO.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_004', title: 'A decomposition reaction is a chemical.',
          scaffold: { problem: 'A student heats 10 g of calcium carbonate (CaCO₃) in a test tube. The reaction is: CaCO₃(s) → CaO(s) + CO₂(g).',
            steps: [
            { text: 'Identify the given mass of reactant (10 g CaCO₃) and the balanced equation (already balanced: 1:1:1 mole ratio).' },
            { text: 'Calculate moles of CaCO₃ = mass / molar mass = 10 g / 100 g/mol = 0.1 mol.' },
            { text: 'Use stoichiometry: 1 mol CaCO₃ produces 1 mol CaO, so 0.1 mol CaCO₃ produces 0.1 mol CaO.' },
            { text: 'Calculate mass of CaO = moles × molar mass = 0.1 mol × 56 g/mol = 5.6 g.' },
            { text: 'Verify using law of conservation of mass: Mass of CO₂ = 0.1 mol × 44 g/mol = 4.4 g; total products = 5.6 + 4.4 = 10 g.', faded: true, blankAnswer: '5.6 g of calcium oxide.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_005', title: 'A displacement reaction is a chemical.',
          scaffold: { problem: 'An iron nail is dipped in copper(II) sulphate solution for 15 minutes.',
            steps: [
            { text: 'Identify reactants — Iron (Fe) solid and copper(II) sulphate (CuSO₄) aqueous solution.' },
            { text: 'Consult reactivity series — Iron (Fe) is above Copper (Cu), so Fe is more reactive and can displace Cu from its salt.' },
            { text: 'Predict products — Fe displaces Cu, forming iron(II) sulphate (FeSO₄) and copper metal (Cu).' },
            { text: 'Write unbalanced equation — Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).' },
            { text: 'Check balancing — Fe: 1 on both sides; Cu: 1 on both sides; S: 1 on both sides; O: 4 on both sides.' },
            { text: 'Interpret observation — Blue colour fades because Cu²⁺ (blue) is replaced by Fe²⁺ (light green, often appears.', faded: true, blankAnswer: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s) — Single displacement.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_006', title: 'A double displacement reaction is a.',
          scaffold: { problem: 'When aqueous solutions of lead(II) nitrate and potassium iodide are mixed, a bright yellow precipitate forms.',
            steps: [
            { text: 'Identify the reactants and their ions. Lead(II) nitrate = Pb(NO₃)₂ (Pb²⁺ and NO₃⁻). Potassium iodide = KI (K⁺ and I⁻).' },
            { text: 'Predict the ion exchange. Pb²⁺ will pair with I⁻ to form PbI₂. K⁺ will pair with NO₃⁻ to form KNO₃.' },
            { text: 'Write formulae using valency cross method. Pb²⁺ + I⁻ → PbI₂ (lead(II) iodide). K⁺ + NO₃⁻ → KNO₃ (potassium nitrate).' },
            { text: 'Write unbalanced equation: Pb(NO₃)₂(aq) + KI(aq) → PbI₂ + KNO₃.' },
            { text: 'Balance the equation. Two KI needed for two I⁻ and two NO₃⁻: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq).' },
            { text: 'Assign state symbols. PbI₂ is insoluble (yellow precipitate) → (s). KNO₃ is soluble → (aq).', faded: true, blankAnswer: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq); Yellow.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Chemical Reactions And Equations', spots: [
            { id: 's1', label: 'A chemical change chemical reaction', prompt: 'Which idea is this? — A chemical change (chemical reaction) is a process in which one or more substances.', answer: 'A chemical change chemical reaction', options: ['A chemical change chemical reaction', 'A chemical equation is a', 'A combination reaction is a', 'A decomposition reaction is a'] },
            { id: 's2', label: 'A chemical equation is a', prompt: 'Which idea is this? — A chemical equation is a symbolic representation of a chemical reaction where reactants.', answer: 'A chemical equation is a', options: ['A chemical equation is a', 'A chemical change chemical reaction', 'A combination reaction is a', 'A decomposition reaction is a'] },
            { id: 's3', label: 'A combination reaction is a', prompt: 'Which idea is this? — A combination reaction is a chemical reaction in which two or more reactants (elements or.', answer: 'A combination reaction is a', options: ['A combination reaction is a', 'A chemical change chemical reaction', 'A chemical equation is a', 'A decomposition reaction is a'] },
            { id: 's4', label: 'A decomposition reaction is a', prompt: 'Which idea is this? — A decomposition reaction is a chemical reaction in which a single compound breaks down.', answer: 'A decomposition reaction is a', options: ['A decomposition reaction is a', 'A chemical change chemical reaction', 'A chemical equation is a', 'A combination reaction is a'] },
            { id: 's5', label: 'A displacement reaction is a', prompt: 'Which idea is this? — A displacement reaction is a chemical reaction in which a more reactive element displaces.', answer: 'A displacement reaction is a', options: ['A displacement reaction is a', 'A chemical change chemical reaction', 'A chemical equation is a', 'A combination reaction is a'] },
            { id: 's6', label: 'A double displacement reaction is', prompt: 'Which idea is this? — A double displacement reaction is a chemical reaction in which two ionic compounds in.', answer: 'A double displacement reaction is', options: ['A double displacement reaction is', 'A chemical change chemical reaction', 'A chemical equation is a', 'A combination reaction is a'] }
          ] } }
    ],
    explore: { component: C10_ScienceChemicalReactionsAndEquationsSim, prompt: 'Explore the interactive — Chemical Reactions And Equations' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_001', difficulty: 'standard',
          question: 'A chemical change (chemical reaction) is a process in which one or more.',
          hint: 'Revisit c7_chem_ch02_012 (Indicators of Chemical Change: Colour, Gas, Heat) and.',
          misconception: 'Students often think a colour change ALWAYS means a chemical change.',
          parts: [
                { id: 'a', prompt: 'A student adds dilute hydrochloric acid to zinc granules in a test tube. Bubbles of a gas evolve.', answer: 'No, the student is incorrect',
                  options: ['No, the student is incorrect', 'a colour change ALWAYS means a chemical change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a colour change ALWAYS means a chemical change.' }
          ],
            remediations: { 'a-colour-change-always-means': { steps: ['Show the student two test tubes — one with KMnO₄ crystals dissolving in water (purple solution), another with KMnO₄.', 'Ask: "In which tube did the purple substance disappear because it reacted?"', 'Explain that in dissolution, the purple particles are still KMnO₄ (just separated); in reaction, KMnO₄ is consumed and.', 'Practice with 5 more examples (e.g., CuSO₄ dissolution vs CuSO₄ + Fe) until the student can articulate: "Colour change.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a colour change ALWAYS means a chemical change.',
          parts: [
                { id: 'a', prompt: 'A student writes: "When magnesium ribbon burns in air, it forms magnesium oxide. The white ash weighs more than the original ribbon.', answer: 'The student\'s conclusion is incorrect',
                  options: ['The student\'s conclusion is incorrect', 'a colour change ALWAYS means a chemical change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a colour change ALWAYS means a chemical change.' }
          ],
            remediations: { 'a-colour-change-always-means': { steps: ['Show the student two test tubes — one with KMnO₄ crystals dissolving in water (purple solution), another with KMnO₄.', 'Ask: "In which tube did the purple substance disappear because it reacted?"', 'Explain that in dissolution, the purple particles are still KMnO₄ (just separated); in reaction, KMnO₄ is consumed and.', 'Practice with 5 more examples (e.g., CuSO₄ dissolution vs CuSO₄ + Fe) until the student can articulate: "Colour change.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_002', difficulty: 'standard',
          question: 'A chemical equation is a symbolic representation of a chemical reaction where.',
          hint: 'If stuck, revisit c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross.',
          misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O,.',
          parts: [
                { id: 'a', prompt: 'Balance the following skeleton equation by inspection: Fe(s) + H₂O(g) → Fe₃O₄(s) + H₂(g). Show all steps and verify the final atom count.', answer: 'Step 1: Count atoms: Fe: 1 vs 3, H: 2 vs 2, O: 1 vs 4',
                  options: ['Step 1: Count atoms: Fe: 1 vs 3, H: 2 vs 2, O: 1 vs 4', 'start over'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O, or changing Fe₃O₄.' },
                { id: 'b', prompt: 'Compare the balancing approach for these two reactions: (i) Na(s) + Cl₂(g) → NaCl(s) and (ii) P₄(s) + Cl₂(g) → PCl₃(l).', answer: 'Reaction (ii) requires balancing the diatomic element (Cl₂) first',
                  options: ['Reaction (ii) requires balancing the diatomic element (Cl₂) first', 'left to right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O, or changing Fe₃O₄.' }
          ],
            remediations: { 'students-change-subscripts-inside-chemical': { steps: ['Use coloured molecular model kits or paper cutouts — red for O, white for H, black for C.', 'Count atoms of each colour on left.', 'Build product molecules one by one, adding whole units only (never break a molecule).', 'If atoms don\'t match, add another whole reactant or product unit.', 'Record how many units of each were used — those are coefficients.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O,.',
          parts: [
                { id: 'a', prompt: 'Compare the balancing approach for these two reactions: (i) Na(s) + Cl₂(g) → NaCl(s) and (ii) P₄(s) + Cl₂(g) → PCl₃(l).', answer: 'Reaction (ii) requires balancing the diatomic element (Cl₂) first',
                  options: ['Reaction (ii) requires balancing the diatomic element (Cl₂) first', 'left to right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O, or changing Fe₃O₄.' }
          ],
            remediations: { 'students-change-subscripts-inside-chemical': { steps: ['Use coloured molecular model kits or paper cutouts — red for O, white for H, black for C.', 'Count atoms of each colour on left.', 'Build product molecules one by one, adding whole units only (never break a molecule).', 'If atoms don\'t match, add another whole reactant or product unit.', 'Record how many units of each were used — those are coefficients.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_003', difficulty: 'standard',
          question: 'A combination reaction is a chemical reaction in which two or more reactants.',
          hint: 'If stuck, review the valency cross-method (c9_chem_ch3_6) for formula writing and the.',
          misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.',
          parts: [
                { id: 'a', prompt: 'Why is the reaction CaO(s) + H₂O(l) → Ca(OH)₂(aq) classified as a combination reaction, even though one reactant is a compound and the product is a solution?', answer: 'It is a combination reaction',
                  options: ['It is a combination reaction', 'because it produces heat', 'because CaO is a solid and water is liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' },
                { id: 'b', prompt: 'Balance the following combination reaction and identify the type of each reactant (element/compound): Fe(s) + S(s) → FeS(s) Then, if 56 g of iron reacts with.', answer: '**Step 1:** Identify reactants: Fe (element), S (element)',
                  options: ['**Step 1:** Identify reactants: Fe (element), S (element)', 'combination reactions ONLY occur between two elements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' },
                { id: 'c', prompt: 'Compare the reactions: (A) 2H₂(g) + O₂(g) → 2H₂O(l) (B) NH₃(g) + HCl(g) → NH₄Cl(s) (C) 2KClO₃(s) → 2KCl(s) + 3O₂(g) Which are combination reactions?', answer: '(A) and (B) are combination reactions',
                  options: ['(A) and (B) are combination reactions', 'it has oxygen', 'combination reactions ONLY occur between two elements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' }
          ],
            remediations: { 'exact-error-students-believe-combination': { steps: ['** Revisit the definition: "Two or more reactants → ONE product".', '** Practice balancing 5 combination equations where the product formula is given but coefficients are missing.', '** For product prediction, review valency cross-method (c9_chem_ch3_6).', '** Take a 5-question self-test: identify reaction type, balance, predict product. Check against answer key.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.',
          parts: [
                { id: 'a', prompt: 'A student writes the equation for the reaction of ammonia with hydrogen chloride as: NH₃ + HCl → NH₄Cl and states: "This is not a combination reaction because.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'combination reactions ONLY occur between two elements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' },
                { id: 'b', prompt: 'Design a simple classroom activity to demonstrate a combination reaction using materials available in a school lab.', answer: '**Activity:** Burning a magnesium ribbon in air',
                  options: ['**Activity:** Burning a magnesium ribbon in air', 'combination reactions ONLY occur between two elements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' }
          ],
            remediations: { 'exact-error-students-believe-combination': { steps: ['** Revisit the definition: "Two or more reactants → ONE product".', '** Practice balancing 5 combination equations where the product formula is given but coefficients are missing.', '** For product prediction, review valency cross-method (c9_chem_ch3_6).', '** Take a 5-question self-test: identify reaction type, balance, predict product. Check against answer key.'] } } },
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
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_005', difficulty: 'standard',
          question: 'A displacement reaction is a chemical reaction in which a more reactive element.',
          hint: 'If stuck, review **valency cross-method for writing formulae (c9_chem_ch3_6)** and.',
          misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the reaction when chlorine gas is bubbled through potassium iodide solution.', answer: '**Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq)**',
                  options: ['**Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq)**', 'iron(III) is more common', 'iron always forms Fe³⁺'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).' }
          ],
            remediations: { 'students-often-write-fe-cuso': { steps: ['Revisit the **reactivity series** (c7_chem_ch01_012) and memorise the order: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn.', 'Practice writing formulae using **valency cross-method** (c9_chem_ch3_6): Fe²⁺ + SO₄²⁻ → FeSO₄; Fe³⁺ + SO₄²⁻ →.', 'Do the **iron nail in CuSO₄** experiment: observe the *light green* colour of FeSO₄ forming (not yellow/brown of.', 'Solve 5 displacement equations daily, checking each product\'s valency.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).',
          parts: [
                { id: 'a', prompt: 'A student writes the following equation for the reaction of iron with copper sulphate: **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu**. Evaluate this equation.', answer: 'The equation is **incorrect**',
                  options: ['The equation is **incorrect**', 'iron(III) is more common', 'iron always forms Fe³⁺'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).' }
          ],
            remediations: { 'students-often-write-fe-cuso': { steps: ['Revisit the **reactivity series** (c7_chem_ch01_012) and memorise the order: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn.', 'Practice writing formulae using **valency cross-method** (c9_chem_ch3_6): Fe²⁺ + SO₄²⁻ → FeSO₄; Fe³⁺ + SO₄²⁻ →.', 'Do the **iron nail in CuSO₄** experiment: observe the *light green* colour of FeSO₄ forming (not yellow/brown of.', 'Solve 5 displacement equations daily, checking each product\'s valency.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_006', difficulty: 'standard',
          question: 'A double displacement reaction is a chemical reaction in which two ionic.',
          hint: 'If stuck, immediately revisit c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency.',
          misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃.',
          parts: [
                { id: 'a', prompt: 'What is the general chemical equation for a double displacement reaction, and what are the three common observable outcomes that drive this reaction forward?', answer: 'The general equation is AB(aq) + CD(aq) → AD + CB',
                  options: ['The general equation is AB(aq) + CD(aq) → AD + CB', 'formation of a soluble product', 'change in colour only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃ + NaCl, they write.' },
                { id: 'b', prompt: 'Compare the following two reactions and classify each. Explain the fundamental difference in terms of ion exchange and oxidation states.', answer: '(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺',
                  options: ['(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺', 'displacement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃ + NaCl, they write.' }
          ],
            remediations: { 'students-often-write-the-products': { steps: ['Revisit Class 9 node c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency Cross Method" to practice writing.', 'Use ion cards (cation/anion cards) to physically model the exchange: pick up cation A and anion D, check charges, cross.', 'Practice 5 double displacement reactions where the only task is to write correct formulae of products before balancing.', 'Verify each product\'s charge neutrality. This concrete manipulative approach fixes the "letter swap" habit by enforcing.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃.',
          parts: [
                { id: 'a', prompt: 'Compare the following two reactions and classify each. Explain the fundamental difference in terms of ion exchange and oxidation states.', answer: '(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺',
                  options: ['(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺', 'displacement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃ + NaCl, they write.' }
          ],
            remediations: { 'students-often-write-the-products': { steps: ['Revisit Class 9 node c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency Cross Method" to practice writing.', 'Use ion cards (cation/anion cards) to physically model the exchange: pick up cation A and anion D, check charges, cross.', 'Practice 5 double displacement reactions where the only task is to write correct formulae of products before balancing.', 'Verify each product\'s charge neutrality. This concrete manipulative approach fixes the "letter swap" habit by enforcing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
