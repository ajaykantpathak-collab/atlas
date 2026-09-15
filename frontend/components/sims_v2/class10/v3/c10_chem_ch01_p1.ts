import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch01_p1: SimDef = {
    id: 'v3_c10_chem_ch01_p1',
    title: 'Chemical Reactions and Equations',
    subtitle: 'Learn to read reactions like sentences — and balance them so no atom goes missing.',
    classLevel: 10, subject: 'chemistry', topic: 'Chemical Reactions and Equations · Part 1/2',
    chapters: ['c10_chem_ch01'],
    nodeIds: ['c10_chem_cbse_01_001', 'c10_chem_cbse_01_002', 'c10_chem_cbse_01_003', 'c10_chem_cbse_01_004', 'c10_chem_cbse_01_005', 'c10_chem_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab chemist documenting an experiment', intro: 'Your iron nail left in copper sulphate turned coppery brown overnight. Your job: write the equation that explains where the copper came from.', goal: 'Identify reaction types on sight and balance any equation without losing an atom.' },
    discovery: {
        question: 'You burn 10g of magnesium and the ash weighs MORE than 10g. Where did the extra mass come from?',
        options: ['Oxygen from the air joined the magnesium', 'Burning creates matter', 'The scale is wrong', 'Heat adds weight'],
        answer: 'Oxygen from the air joined the magnesium',
        hook: 'Most students think burning makes things disappear. Mass is never created or destroyed — the missing mass was in the air all along.',
    },
    teaching: [
        { title: 'Chemical Reactions: Identifying a Chemical Change (Signs)', text: 'A chemical change (chemical reaction) is a process in which one or more substances (reactants) undergo a transformation to form one or more new substances (products) with different chemical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_01_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Balance three equations in the lab — start with the unbalanced skeleton and place coefficients until every atom counts.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_001', title: 'Chemical Reactions: Identifying a Chemical Change (Signs)',
          caseStudy: { intro: 'Begin with a real-world observation: a student notices a white deposit on the bathroom tiles (limescale) that fizzes when vinegar is poured on it — bubbles.',
            decisions: [{ prompt: 'A student adds dilute hydrochloric acid to zinc granules in a test tube. Bubbles of a gas evolve.', options: [
                { text: 'No, the student is incorrect', outcome: 'No, the student is incorrect. The evolution of gas bubbles (hydrogen) indicates a new substance.' },
                { text: 'a colour change ALWAYS means a chemical change', outcome: 'Not quite — Students often think a colour change ALWAYS means a chemical change.', reveals: 'a-colour-change-always-means' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_002', title: 'Chemical Equations: Writing and Balancing by Inspection',
          scaffold: { problem: 'Solid potassium chlorate decomposes on heating to give solid potassium chloride and oxygen gas.',
            steps: [
            { text: 'Identify reactants and products from word equation. Reactant: potassium chlorate (KClO₃).' },
            { text: 'Write skeleton equation with correct formulas and states: KClO₃(s) → KCl(s) + O₂(g).' },
            { text: 'Count atoms: Left: K=1, Cl=1, O=3. Right: K=1, Cl=1, O=2. Oxygen unbalanced (3 vs 2).' },
            { text: 'Balance O by finding LCM of 3 and 2 = 6. Put 2 before KClO₃ (gives 6 O) and 3 before O₂ (gives 6 O): 2KClO₃(s) → KCl(s).' },
            { text: 'Re-check K and Cl: Left K=2, Cl=2. Right K=1, Cl=1. Balance by putting 2 before KCl: 2KClO₃(s) → 2KCl(s) + 3O₂(g).' },
            { text: 'Final verification: K=2, Cl=2, O=6 on both sides. Equation balanced.', faded: true, blankAnswer: '2KClO₃(s) → 2KCl(s) + 3O₂(g)' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_003', title: 'Types of Reactions: Combination Reactions',
          caseStudy: { intro: 'Begin with a real-world observation: a student lighting a magnesium ribbon in the school laboratory sees an intense white flame and a white powdery ash (MgO).',
            decisions: [{ prompt: 'Define a combination reaction and give the general symbolic representation.', options: [
                { text: 'A combination reaction is a reaction where two or more substances combine to form a', outcome: 'A combination reaction is a reaction where two or more substances combine to form a single product.' },
                { text: 'A + B → C + D', outcome: 'Not quite — **Exact error:** Students believe combination reactions ONLY occur between two elements.', reveals: 'exact-error-students-believe-combination' },
                { text: 'combination reactions ONLY occur between two elements', outcome: 'Not quite — **Exact error:** Students believe combination reactions ONLY occur between two elements.', reveals: 'exact-error-students-believe-combination' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_004', title: 'Types of Reactions: Decomposition Reactions (Thermal, Electrolytic, Photo)',
          caseStudy: { intro: 'Start with a real-world observation: When you heat green ferrous sulphate crystals in a test tube, they turn reddish-brown and release a gas with a choking.',
            decisions: [{ prompt: 'What is the general representation of a decomposition reaction? Write the symbolic equation.', options: [
                { text: 'The general representation is AB → A + B, where a single compound AB decomposes into', outcome: 'The general representation is AB → A + B, where a single compound AB decomposes into simpler.' },
                { text: 'any reaction producing a gas is a decomposition reaction', outcome: 'Not quite — Students often think that any reaction producing a gas is a decomposition reaction.', reveals: 'any-reaction-producing-a-gas' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_005', title: 'Types of Reactions: Displacement Reactions',
          caseStudy: { intro: 'Imagine dropping an iron nail into a blue copper sulphate solution — within minutes, the blue colour fades and a reddish-brown coating appears on the nail.',
            decisions: [{ prompt: 'What is the general chemical equation pattern for a single displacement reaction, and which element must be more reactive for the reaction.', options: [
                { text: 'The general pattern is **A + BC → AC + B**, where element **A must be more reactive than', outcome: 'The general pattern is **A + BC → AC + B**, where element **A must be more reactive than element.' },
                { text: 'iron(III) is more common', outcome: 'Not quite — Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄.', reveals: 'students-often-write-fe-cuso' },
                { text: 'iron always forms Fe³⁺', outcome: 'Not quite — Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄.', reveals: 'students-often-write-fe-cuso' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_006', title: 'Types of Reactions: Double Displacement Reactions',
          caseStudy: { intro: 'Imagine you add a few drops of colourless silver nitrate solution to a colourless sodium chloride solution in a test tube — you instantly see a white curdy.',
            decisions: [{ prompt: 'What is the general chemical equation for a double displacement reaction, and what are the three common observable outcomes that drive this.', options: [
                { text: 'The general equation is AB(aq) + CD(aq) → AD + CB', outcome: 'The general equation is AB(aq) + CD(aq) → AD + CB. The three common driving forces are: (1).' },
                { text: 'formation of a soluble product', outcome: 'Not quite — Students often write the products of a double displacement reaction by simply swapping the metal.', reveals: 'students-often-write-the-products' },
                { text: 'change in colour only', outcome: 'Not quite — Students often write the products of a double displacement reaction by simply swapping the metal.', reveals: 'students-often-write-the-products' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school project, Kavya leaves an iron nail standing in blue copper sulphate solution overnight. In the morning the blue has faded to pale green and the nail has a reddish-brown coat. Her lab partner says the colour just \'soaked into the nail\' like dye.',
            decisions: [{ prompt: 'What actually happened, and how can she prove it was a chemical change?', options: [
                { text: 'Iron displaced copper from the solution — iron is more reactive, so it went into solution as iron sulphate (the green tint) while copper metal deposited on the nail (the reddish-brown coat). A new substance formed on the nail and the solution\'s composition changed — both signs of chemical change, plus the tube warms slightly.', outcome: 'The colour change, the deposited new metal, and the heat given off together confirm a displacement reaction, not staining.' },
                { text: 'Her partner is right — only colours moved around, which is a physical change like mixing paint.', outcome: 'A physical change makes no new substance; here copper metal actually left the solution and iron entered it, so the reaction is chemical.', reveals: 'colour-change-is-physical' },
                { text: 'The nail simply rusted in the water overnight, and the colour fading is a coincidence.', outcome: 'Rust is iron oxide, which needs oxygen and would not explain copper appearing on the nail or the solution turning green.', reveals: 'all-discolouration-is-rust' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'A balanced equation is a promise: atoms are never lost, only rearranged. Every industry from steel to medicine runs on that promise.',
            decisions: [{ prompt: 'What comes next? Chemical Reactions and Equations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chemical Reactions and Equations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_001', difficulty: 'standard',
          question: 'A chemical change (chemical reaction) is a process in which one or more.',
          hint: 'Revisit c7_chem_ch02_012 (Indicators of Chemical Change: Colour, Gas, Heat) and.',
          misconception: 'Students often think a colour change ALWAYS means a chemical change.',
          parts: [
                { id: 'a', prompt: 'A student adds dilute hydrochloric acid to zinc granules in a test tube. Bubbles of a gas evolve.', answer: 'No, the student is incorrect',
                  options: ['No, the student is incorrect', 'a colour change ALWAYS means a chemical change'],
                  hint: 'Revisit c7_chem_ch02_012 (Indicators of Chemical Change: Colour, Gas, Heat) and.',
                  misconception: 'Students often think a colour change ALWAYS means a chemical change.' }
          ],
            remediations: { 'a-colour-change-always-means': { steps: ['Show the student two test tubes — one with KMnO₄ crystals dissolving in water (purple solution), another with KMnO₄.', 'Ask: "In which tube did the purple substance disappear because it reacted?"', 'Explain that in dissolution, the purple particles are still KMnO₄ (just separated); in reaction, KMnO₄ is consumed and.', 'Practice with 5 more examples (e.g., CuSO₄ dissolution vs CuSO₄ + Fe) until the student can articulate: "Colour change.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a colour change ALWAYS means a chemical change.',
          parts: [
                { id: 'a', prompt: 'A student writes: "When magnesium ribbon burns in air, it forms magnesium oxide. The white ash weighs more than the original ribbon.', answer: 'The student\'s conclusion is incorrect',
                  options: ['The student\'s conclusion is incorrect', 'a colour change ALWAYS means a chemical change'],
                  hint: 'Revisit c7_chem_ch02_012 (Indicators of Chemical Change: Colour, Gas, Heat) and.',
                  misconception: 'Students often think a colour change ALWAYS means a chemical change.' }
          ],
            remediations: { 'a-colour-change-always-means': { steps: ['Show the student two test tubes — one with KMnO₄ crystals dissolving in water (purple solution), another with KMnO₄.', 'Ask: "In which tube did the purple substance disappear because it reacted?"', 'Explain that in dissolution, the purple particles are still KMnO₄ (just separated); in reaction, KMnO₄ is consumed and.', 'Practice with 5 more examples (e.g., CuSO₄ dissolution vs CuSO₄ + Fe) until the student can articulate: "Colour change.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_002', difficulty: 'standard',
          question: 'A chemical equation is a symbolic representation of a chemical reaction where.',
          hint: 'If stuck, revisit c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross.',
          misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O.',
          parts: [
                { id: 'a', prompt: 'Balance the following skeleton equation by inspection: Fe(s) + H₂O(g) → Fe₃O₄(s) + H₂(g). Show all steps and verify the final atom count.', answer: 'Step 1: Count atoms: Fe: 1 vs 3, H: 2 vs 2, O: 1 vs 4',
                  options: ['Step 1: Count atoms: Fe: 1 vs 3, H: 2 vs 2, O: 1 vs 4', 'start over'],
                  hint: 'If stuck, revisit c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross Method) and.',
                  misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O, or changing Fe₃O₄.' },
                { id: 'b', prompt: 'Compare the balancing approach for these two reactions: (i) Na(s) + Cl₂(g) → NaCl(s) and (ii) P₄(s) + Cl₂(g) → PCl₃(l).', answer: 'Reaction (ii) requires balancing the diatomic element (Cl₂) first',
                  options: ['Reaction (ii) requires balancing the diatomic element (Cl₂) first', 'left to right'],
                  hint: 'If stuck, revisit c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross Method) and.',
                  misconception: 'Students change subscripts inside chemical formulas to balance equations (e.g., writing H₂ + O₂ → H₂O₂ instead of 2H₂O, or changing Fe₃O₄.' }
          ],
            remediations: { 'students-change-subscripts-inside-chemical': { steps: ['Use coloured molecular model kits or paper cutouts — red for O, white for H, black for C.', 'Count atoms of each colour on left.', 'Build product molecules one by one, adding whole units only (never break a molecule).', 'If atoms don\'t match, add another whole reactant or product unit.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_003', difficulty: 'standard',
          question: 'A combination reaction is a chemical reaction in which two or more reactants.',
          hint: 'If stuck, review the valency cross-method (c9_chem_ch3_6) for formula writing and the.',
          misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.',
          parts: [
                { id: 'a', prompt: 'Why is the reaction CaO(s) + H₂O(l) → Ca(OH)₂(aq) classified as a combination reaction, even though one reactant is a compound and the product is a solution?', answer: 'It is a combination reaction',
                  options: ['It is a combination reaction', 'because it produces heat', 'because CaO is a solid and water is liquid', 'combination reactions ONLY occur between two elements'],
                  hint: 'If stuck, review the valency cross-method (c9_chem_ch3_6) for formula writing and the step-by-step.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' },
                { id: 'b', prompt: 'Balance the following combination reaction and identify the type of each reactant (element/compound): Fe(s) + S(s) → FeS(s) Then, if 56 g of iron reacts with.', answer: '**Step 1:** Identify reactants: Fe (element), S (element)',
                  options: ['**Step 1:** Identify reactants: Fe (element), S (element)', 'combination reactions ONLY occur between two elements'],
                  hint: 'If stuck, review the valency cross-method (c9_chem_ch3_6) for formula writing and the step-by-step.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' },
                { id: 'c', prompt: 'Compare the reactions: (A) 2H₂(g) + O₂(g) → 2H₂O(l) (B) NH₃(g) + HCl(g) → NH₄Cl(s) (C) 2KClO₃(s) → 2KCl(s) + 3O₂(g) Which are combination reactions?', answer: '(A) and (B) are combination reactions',
                  options: ['(A) and (B) are combination reactions', 'it has oxygen', 'combination reactions ONLY occur between two elements'],
                  hint: 'If stuck, review the valency cross-method (c9_chem_ch3_6) for formula writing and the step-by-step.',
                  misconception: '**Exact error:** Students believe combination reactions ONLY occur between two elements.' }
          ],
            remediations: { 'exact-error-students-believe-combination': { steps: ['** Revisit the definition: "Two or more reactants → ONE product".', '** Practice balancing 5 combination equations where the product formula is given but coefficients are missing.', '** For product prediction, review valency cross-method (c9_chem_ch3_6).', '** Take a 5-question self-test: identify reaction type, balance, predict product. Check against answer key.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_004', difficulty: 'standard',
          question: 'A decomposition reaction is a chemical reaction in which a single compound.',
          hint: 'If stuck, revisit writing chemical formulae using valency cross method (c9_chem_ch3_6).',
          misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.',
          parts: [
                { id: 'a', prompt: 'Why does the decomposition of silver chloride require light, while calcium carbonate requires heat? Explain the difference in energy sources.', answer: 'Silver chloride decomposes via photolytic decomposition',
                  options: ['Silver chloride decomposes via photolytic decomposition', 'says both need heat shows misunderstanding of photolytic reactions', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'If stuck, revisit writing chemical formulae using valency cross method (c9_chem_ch3_6) and.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' },
                { id: 'b', prompt: 'Balance the following equation for the thermal decomposition of lead nitrate: Pb(NO₃)₂(s) → PbO(s) + NO₂(g) + O₂(g). Identify the type of decomposition.', answer: 'Balanced equation: 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)',
                  options: ['Balanced equation: 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g)', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'If stuck, revisit writing chemical formulae using valency cross method (c9_chem_ch3_6) and.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' },
                { id: 'c', prompt: 'Compare the products of thermal decomposition of metal carbonates (e.g., CaCO₃) and metal nitrates (e.g., Cu(NO₃)₂).', answer: 'Metal carbonates decompose to metal oxide and CO₂',
                  options: ['Metal carbonates decompose to metal oxide and CO₂', 'says both give CO₂ shows lack of analysis of anion influence', 'any reaction producing a gas is a decomposition reaction'],
                  hint: 'If stuck, revisit writing chemical formulae using valency cross method (c9_chem_ch3_6) and.',
                  misconception: 'Students often think that any reaction producing a gas is a decomposition reaction.' }
          ],
            remediations: { 'any-reaction-producing-a-gas': { steps: ['If a student makes this error, show them side-by-side: decomposition (CaCO₃ → CaO + CO₂) vs.', 'single displacement (Zn + 2HCl → ZnCl₂ + H₂).', 'Have them count reactants: one vs.', 'Then practice identifying reaction type from given equations, emphasizing the number of reactants.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_005', difficulty: 'standard',
          question: 'A displacement reaction is a chemical reaction in which a more reactive element.',
          hint: 'If stuck, review **valency cross-method for writing formulae (c9_chem_ch3_6)** and.',
          misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the reaction when chlorine gas is bubbled through potassium iodide solution.', answer: '**Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq)**',
                  options: ['**Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq)**', 'iron(III) is more common', 'iron always forms Fe³⁺'],
                  hint: 'If stuck, review **valency cross-method for writing formulae (c9_chem_ch3_6)** and **reactivity.',
                  misconception: 'Students often write **Fe + CuSO₄ → Fe₂(SO₄)₃ + Cu** (using Fe³⁺) instead of **Fe + CuSO₄ → FeSO₄ + Cu** (Fe²⁺).' }
          ],
            remediations: { 'students-often-write-fe-cuso': { steps: ['Revisit the **reactivity series** (c7_chem_ch01_012) and memorise the order: K > Na > Ca > Mg > Al > Zn > Fe > Ni >.', 'Practice writing formulae using **valency cross-method** (c9_chem_ch3_6): Fe²⁺ + SO₄²⁻ → FeSO₄; Fe³⁺ + SO₄²⁻ →.', 'Do the **iron nail in CuSO₄** experiment: observe the *light green* colour of FeSO₄ forming (not yellow/brown.', 'Solve 5 displacement equations daily, checking each product\'s valency.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_006', difficulty: 'standard',
          question: 'A double displacement reaction is a chemical reaction in which two ionic.',
          hint: 'If stuck, immediately revisit c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency.',
          misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃.',
          parts: [
                { id: 'a', prompt: 'What is the general chemical equation for a double displacement reaction, and what are the three common observable outcomes that drive this reaction forward?', answer: 'The general equation is AB(aq) + CD(aq) → AD + CB',
                  options: ['The general equation is AB(aq) + CD(aq) → AD + CB', 'formation of a soluble product', 'change in colour only'],
                  hint: 'If stuck, immediately revisit c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency Cross.',
                  misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃ + NaCl, they write.' },
                { id: 'b', prompt: 'Compare the following two reactions and classify each. Explain the fundamental difference in terms of ion exchange and oxidation states.', answer: '(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺',
                  options: ['(i) is a displacement reaction (single displacement): Zn displaces Cu²⁺', 'displacement'],
                  hint: 'If stuck, immediately revisit c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency Cross.',
                  misconception: 'Students often write the products of a double displacement reaction by simply swapping the metal atoms (e.g., for AgNO₃ + NaCl, they write.' }
          ],
            remediations: { 'students-often-write-the-products': { steps: ['Revisit Class 9 node c9_chem_ch3_6 "Writing Chemical Formulae: Rules and Valency Cross Method" to practice writing.', 'Use ion cards (cation/anion cards) to physically model the exchange: pick up cation A and anion D, check charges, cross.', 'Practice 5 double displacement reactions where the only task is to write correct formulae of products before balancing.', 'Verify each product\'s charge neutrality. This concrete manipulative approach fixes the "letter swap" habit by enforcing.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
