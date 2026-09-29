import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch03_p2: SimDef = {
    id: 'v3_c10_chem_ch03_p2',
    title: 'Metals and Non-metals · Part 2/2',
    subtitle: 'Sort metals from non-metals — including the ones that break the rules',
    classLevel: 10, subject: 'chemistry', topic: 'Metals and Non-metals · Part 2/2',
    chapters: ['c10_chem_ch03'],
    nodeIds: ['c10_chem_cbse_03_007', 'c10_chem_cbse_03_008', 'c10_chem_cbse_03_009', 'c10_chem_cbse_03_010', 'c10_chem_cbse_03_011', 'c10_chem_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials engineer picking metals for real jobs', intro: 'A goldsmith hammers a sheet thinner than paper, an electrician pulls copper wire, and a pencil somehow lights an LED. One property at a time, the periodic table starts making sense.', goal: 'Link metallic properties to electron behaviour and handle the classic exceptions — graphite, mercury, diamond — without flinching.' },
    discovery: {
        question: 'A pencil \'lead\' completes a circuit and the LED glows. A classmate declares: \'It conducts, so graphite must be a metal.\' Your move?',
        options: ['Graphite is a non-metal that conducts — its delocalised electrons are a famous exception', 'He\'s right — anything that conducts electricity is a metal', 'It\'s neither — pencil lead isn\'t really carbon', 'Graphite conducts only because of clay mixed into the pencil'],
        answer: 'Graphite is a non-metal that conducts — its delocalised electrons are a famous exception',
        hook: 'One property never defines a class. Mercury is a liquid metal; graphite is a conducting non-metal; diamond is a non-metal harder than any steel. Check the whole profile.',
    },
    teaching: [
        { title: 'Reactivity Series: Ordering Metals by Reactivity', text: 'The reactivity series is a vertical arrangement of metals in decreasing order of their chemical reactivity, determined by their tendency to lose electrons and form positive ions, as observed through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_03_007', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Given three mystery samples — a slippery black conductor, a brittle yellow powder, a shiny grey liquid — identify each and justify the call with properties, not guesses.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_009', title: 'Properties of Ionic Compounds: Physical State, Solubility, Conductivity',
          caseStudy: { intro: 'Observe a student sprinkling table salt (NaCl) on food — it\'s a white crystalline solid that dissolves instantly in water but not in oil.',
            decisions: [{ prompt: 'State the physical state of ionic compounds at room temperature and give one reason based on their structure.', options: [
                { text: 'Ionic compounds are solids at room temperature', outcome: 'Ionic compounds are solids at room temperature because their oppositely charged ions are held in.' },
                { text: 'they are gases', outcome: 'Not quite — Students often write "ionic compounds conduct electricity because they have free electrons".', reveals: 'students-often-write-ionic-compounds' },
                { text: 'weak forces', outcome: 'Not quite — Students often write "ionic compounds conduct electricity because they have free electrons".', reveals: 'students-often-write-ionic-compounds' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_010', title: 'Extraction of Metals: Enrichment, Roasting, Calcination and Reduction',
          caseStudy: { intro: 'Observe a piece of rusted iron gate (common in Indian monsoons) — the reddish-brown flaky rust is Fe₂O₃·nH₂O, essentially an ore of iron.',
            decisions: [{ prompt: 'Name the process used to convert zinc carbonate (calamine) ore into zinc oxide. Write the balanced chemical equation.', options: [
                { text: 'Calcination is the process', outcome: 'Calcination is the process. ZnCO₃(s) → ZnO(s) + CO₂(g) (heated in limited air).' },
                { text: 'roasting', outcome: 'Not quite — Students often write the reduction of haematite (Fe₂O₃) in a blast furnace as a single-step.', reveals: 'students-often-write-the-reduction' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_011', title: 'Refining of Metals: Electrolytic Refining',
          scaffold: { problem: 'In an electrolytic refining cell for copper, the impure anode contains 5% iron and 2% silver by mass.',
            steps: [
            { text: 'Identify the behaviour of each impurity using reactivity series.' },
            { text: 'Calculate mass of each impurity in 10 kg anode. Mass of Fe = 5% of 10 kg = 0.5 kg = 500 g.' },
            { text: 'Determine fate. All 500 g Fe oxidises to Fe²⁺ and enters solution.' },
            { text: 'Verify charge balance. The electrons from Fe oxidation (500 g / 56 g/mol × 2 mol e⁻/mol = 17.86 mol e⁻) and.' },
            { text: 'State final answer with units and reasoning.', faded: true, blankAnswer: '(a) 500 g of iron enters solution as Fe²⁺ ions. (b) 200.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_03_012', title: 'Corrosion: Rusting of Iron and Methods of Prevention',
          scaffold: { problem: 'An iron gate of mass 20 kg is left exposed to rain and air. After a year, it gains 2.5 kg due to rust formation.',
            steps: [
            { text: 'Determine the molar mass of rust (Fe₂O₃·3H₂O) = 2×56 + 3×16 + 3×(2×1+16) = 112 + 48 + 54 = 214 g/mol.' },
            { text: 'Determine the mass of iron in one mole of rust: 2 moles Fe = 112 g.' },
            { text: 'Calculate the fraction of iron in rust = 112/214 = 56/107 ≈ 0.523.' },
            { text: 'Mass of rust formed = 2.5 kg = 2500 g. Mass of iron corroded = 2500 g × (112/214) = 2500 × 0.52336 ≈ 1308.4 g ≈ 1.31 kg.' },
            { text: 'Verify: The mass gain is due to addition of oxygen and water; the iron mass corroded is less than the rust mass, which.', faded: true, blankAnswer: 'Approximately 1.31 kg of iron corroded.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a jewellery shop, a family is choosing bangles. The salesman offers 24-carat pure gold at a higher price and 22-carat gold — gold mixed with copper — for everyday wear. A cousin insists pure gold must be better for everything because \'purer means stronger.\'',
            decisions: [{ prompt: 'Why does the jeweller actually recommend 22-carat for bangles worn daily?', options: [
                { text: 'Pure gold is extremely malleable but very soft — daily wear would bend and scratch it. Mixing in copper makes the alloy harder and more durable while keeping enough malleability to shape into ornaments.', outcome: 'Alloying deliberately trades a little purity for hardness — the foreign atoms disturb the metal\'s crystal layers so they do not slide as easily, which is exactly why 22-carat survives daily wear.' },
                { text: 'The cousin is right — 24-carat is best for bangles because the purest metal is always the strongest.', outcome: 'In metals, purity often means softness — pure gold\'s uniform atomic layers slide over each other easily, which is why it can be beaten thin but also dents easily.', reveals: 'purity-equals-strength' },
                { text: '22-carat gold is recommended only because it is cheaper and the jeweller wants a quicker sale.', outcome: 'The price difference is real, but the functional reason is hardness — the copper alloy resists scratches and keeps its shape far better than soft pure gold.', reveals: 'alloying-is-only-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'Metals shine, bend and conduct because of how their electrons pool; non-metals break the pattern wherever bonding allows it. Learn the reasons and the exceptions stop being exceptions.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_007', difficulty: 'standard',
          question: 'The reactivity series is a vertical arrangement of metals in decreasing order.',
          hint: 'If stuck, review c10_chem_cbse_03_006 (displacement reactions) and practice writing net.',
          misconception: 'Students often believe the reactivity series is a fixed, absolute ranking that applies identically under all.',
          parts: [
                { id: 'a', prompt: 'Why is hydrogen placed in the reactivity series of metals even though it is a non-metal? Explain using the concept of electron loss.', answer: 'Hydrogen is included',
                  options: ['Hydrogen is included', 'hydrogen is a gas so it shouldn\'t be there'],
                  hint: 'If stuck, review c10_chem_cbse_03_006 (displacement reactions) and practice writing net ionic.',
                  misconception: 'Students often believe the reactivity series is a fixed, absolute ranking that applies identically under all conditions.' },
                { id: 'b', prompt: 'A student adds zinc granules to four test tubes containing: (i) MgSO₄, (ii) FeSO₄, (iii) CuSO₄, (iv) Al₂(SO₄)₃.', answer: 'Step 1: Locate Zn in the series: Zn is above Fe and Cu but below Mg and Al',
                  options: ['Step 1: Locate Zn in the series: Zn is above Fe and Cu but below Mg and Al', 'any metal reacts with any salt, ignoring the series order'],
                  hint: 'If stuck, review c10_chem_cbse_03_006 (displacement reactions) and practice writing net ionic.',
                  misconception: 'Students often believe the reactivity series is a fixed, absolute ranking that applies identically under all conditions.' },
                { id: 'c', prompt: 'Compare the reactivity of aluminium and zinc using their positions in the series and their reactions with (a) steam and (b) dilute hydrochloric acid.', answer: 'Al is above Zn in the series, so Al is more reactive',
                  options: ['Al is above Zn in the series, so Al is more reactive', 'Zn is more reactive'],
                  hint: 'If stuck, review c10_chem_cbse_03_006 (displacement reactions) and practice writing net ionic.',
                  misconception: 'Students often believe the reactivity series is a fixed, absolute ranking that applies identically under all conditions.' }
          ],
            remediations: { 'the-reactivity-series-is-a': { steps: ['Revisit c10_chem_cbse_03_004 (reaction with water) and c10_chem_cbse_03_005 (reaction with acids) to see the.', 'Perform a quick lab demo: clean Al foil with sandpaper (removes oxide layer) and add to dilute HCl — vigorous H₂.', 'Create a two-column table: "Metal" vs "Condition for Reaction" (cold water, hot water, steam, dilute acid).', 'Practice writing "Metal X reacts with [condition] to give [products]" statements for board answers.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_008', difficulty: 'standard',
          question: 'When a metal (typically from Groups 1, 2, or 13) reacts with a non-metal.',
          hint: 'Review Class 9 nodes c9_chem_ch2_6 (Electron Distribution) and c9_chem_ch2_7 (Valency).',
          misconception: 'Students often write the formula of ionic compounds by simply swapping valencies (criss-cross method) without.',
          parts: [
                { id: 'a', prompt: 'Why does calcium chloride have the formula CaCl₂ and not CaCl or CaCl₃? Explain using the concept of electron transfer and charge neutrality.', answer: 'Calcium (Group 2) loses 2 electrons to form Ca²⁺',
                  options: ['Calcium (Group 2) loses 2 electrons to form Ca²⁺', 'CaCl because both have valency 1', 'chlorine can accept 3 electrons, violating the octet rule'],
                  hint: 'Review Class 9 nodes c9_chem_ch2_6 (Electron Distribution) and c9_chem_ch2_7 (Valency) — practice.',
                  misconception: 'Students often write the formula of ionic compounds by simply swapping valencies (criss-cross method) without understanding the electron.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['Revisit Class 9 node c9_chem_ch3_5 (Ionic Bonding: Transfer of Electrons) and c9_chem_ch3_6 (Writing Chemical.', 'Use the "charge balance" rule: total positive charge = total negative charge.', 'For diatomic non-metals, always write the balanced equation with O₂, N₂, Cl₂, etc.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_009', difficulty: 'standard',
          question: 'Ionic compounds are crystalline solids composed of positively charged cations.',
          hint: 'Revisit c10_chem_cbse_03_008 (formation of ionic compounds) and c9_chem_ch3_5 (ionic.',
          misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic.',
          parts: [
                { id: 'a', prompt: 'State the physical state of ionic compounds at room temperature and give one reason based on their structure.', answer: 'Ionic compounds are solids at room temperature',
                  options: ['Ionic compounds are solids at room temperature', 'they are gases', 'weak forces', 'ionic compounds conduct electricity'],
                  hint: 'Revisit c10_chem_cbse_03_008 (formation of ionic compounds) and c9_chem_ch3_5 (ionic bonding).',
                  misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic conduction (mobile ions) with.' }
          ],
            remediations: { 'students-often-write-ionic-compounds': { steps: ['Show a video of molten NaCl electrolysis (chlorine at anode, sodium at cathode) — ask "what carries current?".', 'Use a conductivity tester with solid NaCl, then aqueous, then molten — student records bulb brightness.', 'Have student draw ion positions in solid vs molten lattice.', 'Practice writing "mobile ions" not "free electrons" in three board-style questions.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using school lab equipment to prove that an unknown white crystalline solid is ionic. List steps, observations, and conclusions.', answer: '(1) Test physical state',
                  options: ['(1) Test physical state', 'ionic compounds conduct electricity'],
                  hint: 'Revisit c10_chem_cbse_03_008 (formation of ionic compounds) and c9_chem_ch3_5 (ionic bonding).',
                  misconception: 'Students often write "ionic compounds conduct electricity because they have free electrons" — confusing ionic conduction (mobile ions) with.' }
          ],
            remediations: { 'students-often-write-ionic-compounds': { steps: ['Show a video of molten NaCl electrolysis (chlorine at anode, sodium at cathode) — ask "what carries current?".', 'Use a conductivity tester with solid NaCl, then aqueous, then molten — student records bulb brightness.', 'Have student draw ion positions in solid vs molten lattice.', 'Practice writing "mobile ions" not "free electrons" in three board-style questions.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_010', difficulty: 'standard',
          question: 'Extraction of metals from their ores involves three main sequential steps.',
          hint: 'If stuck, revise the reactivity series node (c10_chem_cbse_03_007) and the displacement.',
          misconception: 'Students often write the reduction of haematite (Fe₂O₃) in a blast furnace as a single-step reaction: Fe₂O₃ + 3C → 2Fe.',
          parts: [
                { id: 'a', prompt: 'Name the process used to convert zinc carbonate (calamine) ore into zinc oxide. Write the balanced chemical equation.', answer: 'Calcination is the process',
                  options: ['Calcination is the process', 'roasting'],
                  hint: 'If stuck, revise the reactivity series node (c10_chem_cbse_03_007) and the displacement reactions.',
                  misconception: 'Students often write the reduction of haematite (Fe₂O₃) in a blast furnace as a single-step reaction: Fe₂O₃ + 3C → 2Fe + 3CO.' }
          ],
            remediations: { 'students-often-write-the-reduction': { steps: ['Draw a labelled diagram of a blast furnace with temperature zones (500 K, 800 K, 1200 K, 1500 K).', 'Write the three reduction steps on sticky notes: Fe₂O₃ → Fe₃O₄ → FeO → Fe.', 'Place each sticky note on the correct temperature zone of the diagram.', 'For each step, write the balanced equation with CO (upper zones) or C (lower zone).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_011', difficulty: 'standard',
          question: 'Electrolytic refining is the process of purifying impure metal by using it.',
          hint: 'If stuck, review the reactivity series (c10_chem_cbse_03_007) and practice writing.',
          misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.',
          parts: [
                { id: 'a', prompt: 'During electrolytic refining of copper, a current of 2.0 A is passed for 30 minutes through the cell.', answer: 'Step 1: Charge Q = I × t = 2.0 A × (30 × 60) s = 3600 C',
                  options: ['Step 1: Charge Q = I × t = 2.0 A × (30 × 60) s = 3600 C', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'If stuck, review the reactivity series (c10_chem_cbse_03_007) and practice writing oxidation.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' },
                { id: 'b', prompt: 'Compare the anode reaction in electrolytic refining of copper with the anode reaction in the electrolysis of aqueous copper sulphate using INERT (platinum).', answer: 'In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)',
                  options: ['In refining (active Cu anode): Cu(s) → Cu²⁺(aq) + 2e⁻ (anode dissolves)', 'both produce O₂', 'during electrolytic refining, ALL impurities fall as anode mud'],
                  hint: 'If stuck, review the reactivity series (c10_chem_cbse_03_007) and practice writing oxidation.',
                  misconception: 'Students think that during electrolytic refining, ALL impurities fall as anode mud.' }
          ],
            remediations: { 'during-electrolytic-refining': { steps: ['Revisit the reactivity series (c10_chem_cbse_03_007) and identify which metals are above copper (Fe, Zn, Al, Mg) and.', 'Recall the rule: "Metal higher in series = more reactive = oxidises easily = stays in solution." "Metal lower in series.', 'Practice writing anode half-reactions for Fe, Zn, Cu, Ag.', 'Draw a table: Impurity | Position in reactivity series vs Cu | Behaviour at anode | Final location.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_03_012', difficulty: 'standard',
          question: 'Corrosion is the gradual destruction of metals by chemical or electrochemical.',
          hint: 'If stuck, review the reactivity series (node c10_chem_cbse_03_007) and the concept.',
          misconception: 'Students often think that rust is simply Fe₂O₃ (iron(III) oxide) and write the equation as 4Fe + 3O₂ → 2Fe₂O₃, ignoring.',
          parts: [
                { id: 'a', prompt: 'Explain why rusting is considered an electrochemical process. What happens at the anode and cathode during rusting?', answer: 'Rusting is electrochemical',
                  options: ['Rusting is electrochemical', 'it\'s just a chemical reaction without electron transfer'],
                  hint: 'If stuck, review the reactivity series (node c10_chem_cbse_03_007) and the concept of electron.',
                  misconception: 'Students often think that rust is simply Fe₂O₃ (iron(III) oxide) and write the equation as 4Fe + 3O₂ → 2Fe₂O₃, ignoring the role of water.' },
                { id: 'b', prompt: 'Compare galvanization and painting as methods to prevent rusting. Which method provides sacrificial protection and why?', answer: 'Galvanization coats iron with zinc',
                  options: ['Galvanization coats iron with zinc', 'painting is sacrificial'],
                  hint: 'If stuck, review the reactivity series (node c10_chem_cbse_03_007) and the concept of electron.',
                  misconception: 'Students often think that rust is simply Fe₂O₃ (iron(III) oxide) and write the equation as 4Fe + 3O₂ → 2Fe₂O₃, ignoring the role of water.' }
          ],
            remediations: { 'rust-is-simply-fe-o': { steps: ['If the student cannot write the correct rust formula or mechanism: (1) Revisit the electrochemical series from node.', '(2) Perform the classic three-test-tube experiment (as in Diagnostic 6) to observe conditions.', '(3) Write the half-reactions step by step, emphasizing electron transfer.', '(4) Use a diagram of a galvanic cell with iron and zinc to visualize sacrificial protection.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
