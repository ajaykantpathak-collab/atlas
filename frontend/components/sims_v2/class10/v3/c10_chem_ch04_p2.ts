import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch04_p2: SimDef = {
    id: 'v3_c10_chem_ch04_p2',
    title: 'Carbon and Its Compounds · Part 2/2',
    subtitle: 'Draw, branch and count the millions of shapes carbon can take',
    classLevel: 10, subject: 'chemistry', topic: 'Carbon and Its Compounds · Part 2/2',
    chapters: ['c10_chem_ch04'],
    nodeIds: ['c10_chem_cbse_04_007', 'c10_chem_cbse_04_008', 'c10_chem_cbse_04_009', 'c10_chem_cbse_04_010', 'c10_chem_cbse_04_011', 'c10_chem_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an organic chemist sketching never-before-seen molecules', intro: 'The gas in your stove, the vinegar in your kitchen and the cotton on your back are all carbon compounds — held together by one quiet rule: share, don\'t steal, electrons.', goal: 'Draw correct electron-dot structures, apply tetravalency, and explain catenation and isomerism.' },
    discovery: {
        question: 'A diamond and a pencil tip are both 100% pure carbon. One is the hardest natural substance and can\'t conduct; the other is soft, slippery, and lights an LED. How can identical atoms produce opposites?',
        options: ['The carbon atoms are bonded in different 3-D networks — bonding pattern, not atom type, sets the properties', 'Diamond has hidden impurities that make it hard', 'Graphite is partly metallic, which is why it conducts', 'Diamond is older, so its atoms had time to harden'],
        answer: 'The carbon atoms are bonded in different 3-D networks — bonding pattern, not atom type, sets the properties',
        hook: 'Carbon\'s superpower isn\'t the atom — it\'s the architecture. Share electrons four ways in a rigid lattice and you get diamond; in sliding sheets and you get graphite.',
    },
    teaching: [
        { title: 'Homologous Series: Properties and Trends Down the Series', text: 'A homologous series is a family of organic compounds having the same functional group, similar chemical properties, and a gradation in physical properties, where each successive member differs from.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_04_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Build carbon\'s molecules yourself: draw electron-dot structures that respect tetravalency, then hunt down every structural isomer hiding inside C₅H₁₂.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_007', title: 'Homologous Series: Properties and Trends Down the Series',
          scaffold: { problem: 'In a laboratory, a student has four unlabelled bottles containing the first four liquid alkanes: pentane (C₅H₁₂), hexane (C₆H₁₄), heptane.',
            steps: [
            { text: 'Identify the homologous series — these are alkanes with general formula CₙH₂ₙ₊₂.' },
            { text: 'Recall the trend — boiling point increases with increasing molecular mass (more CH₂ units) due to stronger London.' },
            { text: 'Calculate molecular masses: C₅H₁₂ = 5×12 + 12×1 = 72; C₆H₁₄ = 86; C₇H₁₆ = 100; C₈H₁₈ = 114 g/mol.' },
            { text: 'Match lowest mass (pentane, 72) to lowest BP (36°C), next (hexane, 86) to 69°C, then heptane (100) to 98°C, highest.' },
            { text: 'Verify the increment in BP is roughly consistent (~30°C per CH₂) and conclude the assignment is chemically logical.', faded: true, blankAnswer: 'Pentane = 36°C, Hexane = 69°C, Heptane = 98°C, Octane.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_008', title: 'Nomenclature of Carbon Compounds (IUPAC Naming)',
          caseStudy: { intro: 'Imagine you are reading the label of a medicine bottle — "Paracetamol" is its common name, but its systematic name is *N-(4-hydroxyphenyl)acetamide*.',
            decisions: [{ prompt: 'What is the correct IUPAC name for the compound with the structural formula CH₃-CH₂-CH₂-CH₃?', options: [
                { text: 'Butane', outcome: 'Butane. A wrong answer like "Butylene" or "C4H10" reveals the student confuses the suffix for.' },
                { text: 'Butylene', outcome: 'Not quite — Students **always number the carbon chain from the end nearest to the first alkyl substituent.', reveals: 'students-always-number-the-carbon' },
                { text: 'the molecular formula is the name', outcome: 'Not quite — Students **always number the carbon chain from the end nearest to the first alkyl substituent.', reveals: 'students-always-number-the-carbon' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_009', title: 'Chemical Properties: Combustion of Carbon Compounds',
          scaffold: { problem: 'A typical LPG cylinder contains mostly n-butane (C₄H₁₀). Write the balanced equation for its complete combustion.',
            steps: [
            { text: 'Identify reactants and products. Fuel = C₄H₁₀, oxidiser = O₂. Products = CO₂ and H₂O (complete combustion).' },
            { text: 'Write unbalanced equation: C₄H₁₀ + O₂ → CO₂ + H₂O.' },
            { text: 'Balance C: 4 CO₂ on right. Balance H: 5 H₂O on right (10 H). Now O atoms on right = 4×2 + 5×1 = 13.' },
            { text: 'Molar mass C₄H₁₀ = 4×12 + 10×1 = 58 g/mol. Moles butane = 11.6/58 = 0.2 mol.' },
            { text: 'From equation, 2 mol C₄H₁₀ give 8 mol CO₂ → 1 mol C₄H₁₀ gives 4 mol CO₂. So 0.2 mol butane gives 0.8 mol CO₂.', faded: true, blankAnswer: 'Balanced equation: 2C₄H₁₀(g) + 13O₂(g) → 8CO₂(g).' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_010', title: 'Chemical Properties: Oxidation, Addition and Substitution Reactions',
          caseStudy: { intro: 'Observe how cooking oil (unsaturated fat) is converted to solid vanaspati ghee (saturated fat) in Indian kitchens — this is industrial hydrogenation,.',
            decisions: [{ prompt: 'Name the oxidizing agent commonly used in the laboratory to oxidize ethanol to ethanoic acid.', options: [
                { text: 'Alkaline potassium permanganate (KMnO₄) or acidified potassium dichromate (K₂Cr₂O₇) are', outcome: 'Alkaline potassium permanganate (KMnO₄) or acidified potassium dichromate (K₂Cr₂O₇) are used.' },
                { text: 'concentrated H₂SO₄', outcome: 'Not quite — Students often think "oxidation" only means addition of oxygen.', reveals: 'oxidation-only-means-addition-of' },
                { text: 'no color change', outcome: 'Not quite — Students often think "oxidation" only means addition of oxygen.', reveals: 'oxidation-only-means-addition-of' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_012', title: 'Soaps and Detergents: Structure, Action and Difference',
          caseStudy: { intro: 'Observe a greasy plate after eating oily Indian food like parathas or pakoras.',
            decisions: [{ prompt: 'What is the general formula of a soap molecule? Name the two distinct parts of the molecule and state the nature (hydrophilic/hydrophobic).', options: [
                { text: 'General formula: RCOO⁻Na⁺ (or RCOO⁻K⁺), where R is a long hydrocarbon chain (C₁₂–C₁₈)', outcome: 'General formula: RCOO⁻Na⁺ (or RCOO⁻K⁺), where R is a long hydrocarbon chain (C₁₂–C₁₈).' },
                { text: 'dissolves', outcome: 'Not quite — Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head.', reveals: 'the-hydrophobic-tail-of-soap' },
                { text: 'oil dissolves in the tail', outcome: 'Not quite — Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head.', reveals: 'the-hydrophobic-tail-of-soap' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Plastics transformed medicine, food safety and daily life — and are now in the oceans, the food chain, and human blood. Banning them helps the environment; it also raises costs for the poorest.',
            decisions: [{ prompt: 'Can a material be both a miracle and a mistake?', options: [
                { text: 'Ban single-use first — keep it where it matters', outcome: 'The surgical approach — plastic in hospitals, not in grocery bags; requires alternatives to actually exist affordably.' },
                { text: 'Ban broadly — half-measures haven\'t worked', outcome: 'The urgency argument; honest that bans without substitutes shift cost to those least able to pay.' },
                { text: 'Fix recycling instead of banning', outcome: 'Technically appealing — but decades of \'recyclable\' plastic have mostly not been recycled; the honest question is whether this time is different.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science exhibition, a student builds a simple conductivity tester — a bulb, a battery and two wires — and dips it into salt water, pure water, and a bottle of cooking spirit (ethanol). The bulb glows brightly only in the salt water. A classmate concludes the tester is broken \'because all clear liquids should behave the same.\'',
            decisions: [{ prompt: 'What explains why only the salt water lights the bulb?', options: [
                { text: 'Salt water contains free-moving ions — sodium and chloride — which carry charge through the liquid and complete the circuit. Pure water has almost no ions, and ethanol is a covalent compound that stays as neutral molecules in solution, so neither can conduct.', outcome: 'Conduction needs mobile charged particles. Ionic compounds supply them when dissolved; covalent molecules like ethanol do not ionise, so they stay non-conducting.' },
                { text: 'The classmate is right — any clear liquid conducts equally, so the tester must be faulty.', outcome: 'Clarity has nothing to do with it — conductivity depends on whether dissolved particles carry charge, and ethanol and pure water lack ions.', reveals: 'clear-liquids-conduct' },
                { text: 'The salt water conducts because salt makes water thicker, and thicker liquids carry electricity better.', outcome: 'Thickness is irrelevant — it is the presence of free ions, not viscosity, that lets the liquid carry current.', reveals: 'thickness-means-conduction' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'Four bonds plus the ability to chain with itself — that\'s how one element fills the world with petrol, plastic, cotton, medicine and you.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_007', difficulty: 'standard',
          question: 'A homologous series is a family of organic compounds having the same functional.',
          hint: 'Review functional groups (c10_chem_cbse_04_006) and practice writing general formulas for.',
          misconception: 'Students often write that "chemical properties change gradually down a homologous series" — this is incorrect.',
          parts: [
                { id: 'a', prompt: 'Explain why the boiling points of alkanes increase steadily as we go down the homologous series from methane to decane, even though their chemical properties.', answer: 'Boiling points increase',
                  options: ['Boiling points increase', 'stronger covalent bonds', 'change in functional group'],
                  hint: 'Review functional groups (c10_chem_cbse_04_006) and practice writing general formulas for each.',
                  misconception: 'Students often write that "chemical properties change gradually down a homologous series" — this is incorrect.' }
          ],
            remediations: { 'students-often-write-that-chemical': { steps: ['Revisit functional groups (c10_chem_cbse_04_006) — make a table: Series | Functional Group | General Formula.', 'Use molecular model kits or paper cutouts to physically add a CH₂ unit to methane, ethane, propane; count atoms each.', 'Practice: "Write the next homologue of C₄H₉OH" → C₅H₁₁OH.', 'Check: Did you add C and 2H?'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_008', difficulty: 'standard',
          question: 'IUPAC nomenclature is a systematic method for naming organic compounds.',
          hint: 'If stuck, immediately review **c10_chem_cbse_04_006 (Functional Groups)** to memorize the.',
          misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead.',
          parts: [
                { id: 'a', prompt: 'What is the correct IUPAC name for the compound with the structural formula CH₃-CH₂-CH₂-CH₃?', answer: 'Butane',
                  options: ['Butane', 'Butylene', 'the molecular formula is the name'],
                  hint: 'If stuck, immediately review **c10_chem_cbse_04_006 (Functional Groups)** to memorize the 6.',
                  misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of from the end nearest.' }
          ],
            remediations: { 'students-always-number-the-carbon': { steps: ['**Revisit the Priority Order Rule** from node **c10_chem_cbse_04_006**: Functional group > Double bond > Triple bond >.', 'Write this hierarchy on a sticky note.', '**Practice the "Arrow Technique"**: Draw the carbon skeleton.', 'Put an arrow from the LEFT end pointing right, and from the RIGHT end pointing left.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead.',
          parts: [
                { id: 'a', prompt: 'A student names the compound CH₃-CH₂-CH(CH₃)-CH₂-CH₃ as "3-Methylpentane". Evaluate if this is correct.', answer: 'The name **3-Methylpentane is correct**',
                  options: ['The name **3-Methylpentane is correct**', '2-Ethylbutane'],
                  hint: 'If stuck, immediately review **c10_chem_cbse_04_006 (Functional Groups)** to memorize the 6.',
                  misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of from the end nearest.' }
          ],
            remediations: { 'students-always-number-the-carbon': { steps: ['**Revisit the Priority Order Rule** from node **c10_chem_cbse_04_006**: Functional group > Double bond > Triple bond >.', 'Write this hierarchy on a sticky note.', '**Practice the "Arrow Technique"**: Draw the carbon skeleton.', 'Put an arrow from the LEFT end pointing right, and from the RIGHT end pointing left.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_009', difficulty: 'standard',
          question: 'Combustion of carbon compounds is an exothermic oxidation reaction where.',
          hint: 'If stuck on balancing, revisit c9_chem_ch3_6 (Writing Chemical Formulae) and practise the.',
          misconception: 'Students write the general combustion formula as CₓHᵧ + O₂ → xCO₂ + (y/2)H₂O and then balance by putting coefficient (x.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Combustion of carbon compounds is an exothermic oxidation reaction where a',
                  options: ['Combustion of carbon compounds is an exothermic oxidation reaction where a', 'Covalent bonding in carbon compounds is the chemical bond formed when carbon atoms share', 'Carbon\'s tetravalency is its ability to form four covalent bonds by sharing its four', 'Allotropes are different structural forms of the same element in the same physical state,'],
                  hint: 'If stuck on balancing, revisit c9_chem_ch3_6 (Writing Chemical Formulae) and practise the "atom.',
                  misconception: 'Students write the general combustion formula as CₓHᵧ + O₂ → xCO₂ + (y/2)H₂O and then balance by putting coefficient (x + y/4) for O₂, but.' }
          ],
            remediations: { 'students-write-the-general-combustion': { steps: ['Revisit c9_chem_ch3_6 (Writing Chemical Formulae) to practise counting atoms in formulas with oxygen.', 'For any oxygenated fuel, first write the unbalanced equation with O₂, then count total O atoms on product side (2x.', 'Practise with methanol (CH₃OH), methanal (HCHO), and ethanoic acid (CH₃COOH) using this systematic method.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_010', difficulty: 'standard',
          question: 'Oxidation in carbon compounds is a reaction where a carbon atom gains oxygen.',
          hint: 'Review hydrocarbon structures (c10_chem_cbse_04_004) and functional groups.',
          misconception: 'Students often think "oxidation" only means addition of oxygen.',
          parts: [
                { id: 'a', prompt: 'Ethene (C₂H₄) reacts with bromine water (Br₂ in H₂O). What type of reaction is this? Why does the reddish-brown color of bromine water disappear?', answer: 'This is an addition reaction',
                  options: ['This is an addition reaction', 'substitution', 'oxidation', 'bromine water is an oxidizing agent like KMnO₄'],
                  hint: 'Review hydrocarbon structures (c10_chem_cbse_04_004) and functional groups (c10_chem_cbse_04_006).',
                  misconception: 'Students often think "oxidation" only means addition of oxygen.' },
                { id: 'b', prompt: 'Write the balanced chemical equation for the reaction of methane with chlorine in presence of sunlight.', answer: 'CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g) (in presence of sunlight/UV light)',
                  options: ['CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g) (in presence of sunlight/UV light)', 'oxidation', '"oxidation" only means addition of oxygen'],
                  hint: 'Review hydrocarbon structures (c10_chem_cbse_04_004) and functional groups (c10_chem_cbse_04_006).',
                  misconception: 'Students often think "oxidation" only means addition of oxygen.' }
          ],
            remediations: { 'oxidation-only-means-addition-of': { steps: ['Revisit the definition of oxidation in terms of oxygen gain/hydrogen loss using the ethanol → ethanoic acid equation.', 'For substitution, draw the free radical mechanism initiation step (Cl₂ → 2Cl•) on paper to see why sunlight is needed.', 'Practice writing products for CH₃CH₂OH + [O] (alkaline KMnO₄) and CH₄ + Cl₂ (sunlight) until valency rules are.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_011', difficulty: 'standard',
          question: 'Ethanol (C₂H₅OH) is a two-carbon alcohol with a hydroxyl (–OH) functional.',
          hint: 'If stuck, revisit c10_chem_cbse_04_006 (Functional Groups) and c9_chem_ch3_6 (Writing.',
          misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄.',
          parts: [
                { id: 'a', prompt: 'Ethanol reacts with sodium metal to give hydrogen gas. Ethanoic acid also reacts with sodium metal to give hydrogen gas.', answer: 'Both react with Na',
                  options: ['Both react with Na', 'both are equally acidic'],
                  hint: 'If stuck, revisit c10_chem_cbse_04_006 (Functional Groups) and c9_chem_ch3_6 (Writing Chemical.',
                  misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is a *catalyst and.' },
                { id: 'b', prompt: 'Compare the oxidation of ethanol and ethanoic acid using alkaline KMnO₄ or acidified K₂Cr₂O₇. What products form?', answer: 'Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)',
                  options: ['Ethanol oxidises first to ethanal (CH₃CHO) then to ethanoic acid (CH₃COOH)', 'ethanoic acid oxidises to CO₂ and H₂O'],
                  hint: 'If stuck, revisit c10_chem_cbse_04_006 (Functional Groups) and c9_chem_ch3_6 (Writing Chemical.',
                  misconception: 'Students write the esterification equation as CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O but forget that concentrated H₂SO₄ is a *catalyst and.' }
          ],
            remediations: { 'students-write-the-esterification-equation': { steps: ['Revisit c10_chem_cbse_04_006 (Functional Groups) — draw the –COOH and –OH groups side by side, circle the atoms.', 'Write the mechanism mentally: protonation of carbonyl O by H₂SO₄, nucleophilic attack by alcohol O, proton transfer.', 'Practise writing the equation *with conditions above arrow* five times: CH₃COOH + CH₃CH₂OH ⇌[conc.', 'Test yourself — can you explain why the reaction is reversible and how Le Chatelier\'s principle applies (remove water.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_012', difficulty: 'standard',
          question: 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty.',
          hint: 'If stuck, revise c10_chem_cbse_04_006 (Functional Groups) and c10_chem_cbse_04_010.',
          misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves".',
          parts: [
                { id: 'a', prompt: 'A student takes 5 g of castor oil (a triglyceride) and adds 20 mL of 20% NaOH solution. The mixture is heated and then common salt (NaCl) is added.', answer: 'Process: Saponification',
                  options: ['Process: Saponification', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'If stuck, revise c10_chem_cbse_04_006 (Functional Groups) and c10_chem_cbse_04_010 (Chemical.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' },
                { id: 'b', prompt: 'Compare the cleansing action of soap and detergent in (i) soft water, (ii) hard water, and (iii) acidic water. Explain the chemical reason for each case.', answer: '(i) Soft water: Both work well',
                  options: ['(i) Soft water: Both work well', 'dissolves', 'oil dissolves in the tail', 'detergent also fails in acidic water'],
                  hint: 'If stuck, revise c10_chem_cbse_04_006 (Functional Groups) and c10_chem_cbse_04_010 (Chemical.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' }
          ],
            remediations: { 'the-hydrophobic-tail-of-soap': { steps: ['Revisit the concept of "like dissolves like" from Class 9 (c9_chem_ch1_2 — Solutions) and colloids (c9_chem_ch1_10.', 'Draw a soap molecule on paper: label head (–COO⁻Na⁺) and tail (–CH₂–CH₂–).', 'Simulate micelle formation: draw a circle (micelle) with heads on the outside facing water, tails inside forming.', 'Watch a 2-minute animation of micelle formation (search "soap micelle animation" on YouTube).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
