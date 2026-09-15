import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch10_p1: SimDef = {
    id: 'v3_c12_bio_ch10_p1',
    title: 'Microbes in Human Welfare · Part 1/2',
    subtitle: 'Your kitchen runs on microbes — that spoonful of dahi is a starter culture.',
    classLevel: 12, subject: 'biology', topic: 'Microbes in Human Welfare · Part 1/2',
    chapters: ['c12_bio_ch10'],
    nodeIds: ['c12_bio_cbse_10_001', 'c12_bio_cbse_10_002', 'c12_bio_cbse_10_003', 'c12_bio_cbse_10_004', 'c12_bio_cbse_10_005', 'c12_bio_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Food microbiologist', intro: 'Long before labs existed, humans were running biotech in their kitchens — here\'s the science behind it.', goal: 'Explain microbial roles in household products, antibiotics and industrial enzymes.' },
    discovery: {
        question: 'A spoonful of yesterday\'s curd turns a pot of warm milk into dahi by morning. What did that spoonful actually carry?',
        options: ['A starter culture of Lactobacillus that ferments milk sugar into lactic acid', 'Enzymes left over from yesterday that digest the new milk directly', 'Vitamins that thicken the milk proteins overnight', 'Nothing — curd forms spontaneously in any warm milk'],
        answer: 'A starter culture of Lactobacillus that ferments milk sugar into lactic acid',
        hook: 'It looks like magic or chemistry — it\'s inoculation. That spoonful is a living workforce, and the same principle scales from your kitchen to industrial fermenters producing antibiotics and enzymes.',
    },
    teaching: [
        { title: 'Microbes in Household Products: Curd, Cheese, Bread', text: 'Microbes in household products refer to the beneficial microorganisms (bacteria, fungi, yeast) intentionally used in everyday food preparation to transform raw substrates into nutritionally enhanced.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_10_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Trace microbes through your home and industry: explain curd-setting and cheese-making at household scale, then connect the same fermentation logic to antibiotic and enzyme production in fermenters.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_001', title: 'Microbes in Household Products: Curd, Cheese, Bread',
          caseStudy: { intro: 'Think about the last time you saw your mother set curd overnight — a spoonful of yesterday\'s curd mixed into warm milk, and by morning it\'s thick and tangy.',
            decisions: [{ prompt: 'Name the genus of bacteria primarily responsible for converting milk into curd and state the key metabolic product that causes milk.', options: [
                { text: '**Correct answer:** *Lactobacillus* (lactic acid bacteria)', outcome: '**Correct answer:** *Lactobacillus* (lactic acid bacteria); the key metabolic product is **lactic.' },
                { text: 'alcohol', outcome: 'Not quite — **Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce.', reveals: 'misconception-yeast-respires-aerobically-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_002', title: 'Microbes in Industrial Products: Antibiotics and Enzymes',
          caseStudy: { intro: 'Observe a strip of antibiotic tablets at home — each tablet contains a compound originally made by a fungus growing in a giant fermenter.',
            decisions: [{ prompt: 'Name the fungus that produces penicillin and the bacterial genus that produces streptomycin. State one medical use for each.', options: [
                { text: 'Penicillin is produced by *Penicillium notatum* (now *P', outcome: 'Penicillin is produced by *Penicillium notatum* (now *P. chrysogenum*); streptomycin is produced.' },
                { text: 'to help humans', outcome: 'Not quite — Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are.', reveals: 'antibiotics-are-produced-by-microbes' },
                { text: '*Aspergillus* for penicillin', outcome: 'Not quite — Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are.', reveals: 'antibiotics-are-produced-by-microbes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_003', title: 'Microbes in Beverage Production: Alcohol and Wine',
          caseStudy: { intro: 'Imagine biting into a ripe grape — it tastes sweet because of glucose and fructose.',
            decisions: [{ prompt: 'What is the specific biochemical role of pyruvate decarboxylase and alcohol dehydrogenase in the conversion of glucose to ethanol.', options: [
                { text: 'Pyruvate decarboxylase converts pyruvate to acetaldehyde (releasing CO₂), and alcohol', outcome: 'Pyruvate decarboxylase converts pyruvate to acetaldehyde (releasing CO₂), and alcohol dehydrogenase.' },
                { text: 'yeast breathes out alcohol', outcome: 'Not quite — Students believe that "yeast produces alcohol as a waste product it wants to get rid of".', reveals: 'yeast-produces-alcohol-as-a' },
                { text: 'pyruvate directly becomes ethanol', outcome: 'Not quite — Students believe that "yeast produces alcohol as a waste product it wants to get rid of".', reveals: 'yeast-produces-alcohol-as-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_004', title: 'Microbes in Sewage Treatment: Primary and Secondary',
          scaffold: { problem: 'A sewage treatment plant receives wastewater with BOD 300 mg/L. After primary treatment, BOD reduces to 200 mg/L.',
            steps: [
            { text: 'Identify initial BOD (300 mg/L), BOD after primary (200 mg/L), BOD after secondary (20 mg/L).' },
            { text: 'Calculate primary removal: (300-200)/300 × 100 = 33.3%.' },
            { text: 'Calculate secondary removal: (200-20)/200 × 100 = 90%.' },
            { text: 'Calculate overall removal: (300-20)/300 × 100 = 93.3%.' },
            { text: 'Interpret: Primary treatment removes settleable solids (33% BOD), secondary treatment removes dissolved organic matter.', faded: true, blankAnswer: 'Primary: 33.3%, Secondary: 90%, Overall: 93.3%.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_005', title: 'Microbes in Production of Biogas: Methanogens',
          caseStudy: { intro: 'Imagine a rural household in Punjab where cattle dung is collected daily and fed into an underground brick tank; after a few weeks, a gas pipe connected to the.',
            decisions: [{ prompt: 'Name the specific group of archaebacteria responsible for methane production in a biogas digester and state their oxygen requirement.', options: [
                { text: 'Correct answer: Methanogens (e.g., Methanobacterium, Methanococcus)', outcome: 'Correct answer: Methanogens (e.g., Methanobacterium, Methanococcus); they are strict anaerobes.' },
                { text: 'eat dung and breathe out methane', outcome: 'Not quite — Students often think methanogens are bacteria that "eat dung and breathe out methane" like animals.', reveals: 'methanogens-are-bacteria-that-eat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_006', title: 'Microbes as Biocontrol Agents: Pest Management',
          caseStudy: { intro: 'Imagine a farmer in Punjab spraying a white powder on his cotton crop — it’s not a chemical pesticide but a formulation of Bacillus thuringiensis spores.',
            decisions: [{ prompt: 'Name the bacterium that produces crystal (Cry) proteins used as a bioinsecticide, and state the specific insect orders it primarily targets.', options: [
                { text: 'Bacillus thuringiensis (Bt) produces Cry proteins that primarily target Lepidoptera', outcome: 'Bacillus thuringiensis (Bt) produces Cry proteins that primarily target Lepidoptera (caterpillars).' },
                { text: 'Bt cotton', outcome: 'Not quite — Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.', reveals: 'bacillus-thuringiensis-and-bt-cotton' },
                { text: 'Name the microbe used as biocontrol agent', outcome: 'Not quite — Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.', reveals: 'bacillus-thuringiensis-and-bt-cotton' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Microbes in Human Welfare · Part 1/2', spots: [
            { id: 's1', label: 'Microbes in Household Products Curd Cheese Bread', prompt: 'Which idea is this? — Microbes in household products refer to the beneficial microorganisms (bacteria, fungi.', answer: 'Microbes in Household Products Curd Cheese Bread', options: ['Microbes in Household Products Curd Cheese Bread', 'Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Beverage Production Alcohol and Wine', 'Microbes in Sewage Treatment Primary and Secondary'] },
            { id: 's2', label: 'Microbes in Industrial Products Antibiotics and Enzymes', prompt: 'Which idea is this? — Antibiotics are chemical substances produced by microorganisms (bacteria, fungi.', answer: 'Microbes in Industrial Products Antibiotics and Enzymes', options: ['Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Household Products Curd Cheese Bread', 'Microbes in Beverage Production Alcohol and Wine', 'Microbes in Sewage Treatment Primary and Secondary'] },
            { id: 's3', label: 'Microbes in Beverage Production Alcohol and Wine', prompt: 'Which idea is this? — Microbes in beverage production refers to the controlled use of specific microorganisms.', answer: 'Microbes in Beverage Production Alcohol and Wine', options: ['Microbes in Beverage Production Alcohol and Wine', 'Microbes in Household Products Curd Cheese Bread', 'Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Sewage Treatment Primary and Secondary'] },
            { id: 's4', label: 'Microbes in Sewage Treatment Primary and Secondary', prompt: 'Which idea is this? — Sewage treatment is the process of removing contaminants from wastewater using physical.', answer: 'Microbes in Sewage Treatment Primary and Secondary', options: ['Microbes in Sewage Treatment Primary and Secondary', 'Microbes in Household Products Curd Cheese Bread', 'Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Beverage Production Alcohol and Wine'] },
            { id: 's5', label: 'Microbes in Production of Biogas Methanogens', prompt: 'Which idea is this? — Methanogens are obligate anaerobic archaebacteria that produce methane (CH₄) as.', answer: 'Microbes in Production of Biogas Methanogens', options: ['Microbes in Production of Biogas Methanogens', 'Microbes in Household Products Curd Cheese Bread', 'Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Beverage Production Alcohol and Wine'] },
            { id: 's6', label: 'Microbes as Biocontrol Agents Pest Management', prompt: 'Which idea is this? — Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses, protozoa).', answer: 'Microbes as Biocontrol Agents Pest Management', options: ['Microbes as Biocontrol Agents Pest Management', 'Microbes in Household Products Curd Cheese Bread', 'Microbes in Industrial Products Antibiotics and Enzymes', 'Microbes in Beverage Production Alcohol and Wine'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_001', title: 'A real-world call',
          caseStudy: { intro: 'Bacteria evolve antibiotic resistance because we overuse antibiotics — in medicine AND in farm animals raised for meat. Stopping farm use helps everyone\'s future; it raises food prices now.',
            decisions: [{ prompt: 'Who pays for antibiotic stewardship?', options: [
                { text: 'Ban farm use — resistance is a shared emergency', outcome: 'The public-health answer; the cost lands on farmers and on the price of food — someone absorbs it either way.' },
                { text: 'Regulate, don\'t ban — target misuse not use', outcome: 'The surgical answer — treatment stays, growth-promotion goes; only works if enforcement is real.' },
                { text: 'Let the market decide — consumers pay for antibiotic-free', outcome: 'The market answer; the poorest consumers can\'t pay the premium, so the cheapest meat keeps the practice alive.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two students run a kitchen experiment: identical milk and starter curd, one bowl kept at 15°C and one at 35°C. After 8 hours the warm bowl is firm and tangy while the cold bowl is still liquid — the cold-batch student concludes \'the Lactobacillus died\'.',
            decisions: [{ prompt: 'What actually explains the difference?', options: [
                { text: 'Lactobacillus is mesophilic with an optimum around 30–40°C — at 15°C it grows but far more slowly, so too little lactic acid accumulates to coagulate casein in 8 hours; it isn\'t dead, just slow.', outcome: 'Growth rate, not survival, is the limit — give the cold batch more time or warmer conditions and the same starter still sets curd.' },
                { text: 'He\'s right — 15°C kills the starter bacteria, which is why no curd formed.', outcome: 'Suboptimal temperature only stretches generation time; the population creeps up instead of crashing.', reveals: 'cold-kills-starter' },
                { text: 'The cold bowl just needed no starter at all — milk left at room temperature curdles on its own anyway.', outcome: 'Without a starter, random contaminants dominate and spoil the milk; the inoculum is what drives clean lactic fermentation.', reveals: 'milk-self-curdles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now recognise the invisible workforce in your kitchen. Microbial products are quick board marks — and the entry point to food science and industrial microbiology careers.',
            decisions: [{ prompt: 'What comes next? Microbes in Human Welfare · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Microbes in Human Welfare · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_001', difficulty: 'standard',
          question: 'Microbes in household products refer to the beneficial microorganisms.',
          hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002**.',
          misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Name the genus of bacteria primarily responsible for converting milk into curd and state the key metabolic product that causes milk coagulation.', answer: '**Correct answer:** *Lactobacillus* (lactic acid bacteria)',
                  options: ['**Correct answer:** *Lactobacillus* (lactic acid bacteria)', 'alcohol'],
                  hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002** (Glycolysis).',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is.' },
                { id: 'b', prompt: 'A student sets curd at 15°C and another at 35°C using identical starter and milk.', answer: '**Correct answer:** *Lactobacillus* is mesophilic (optimum 30–40°C)',
                  options: ['**Correct answer:** *Lactobacillus* is mesophilic (optimum 30–40°C)', 'bacteria die at 15°C'],
                  hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002** (Glycolysis).',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is.' },
                { id: 'c', prompt: 'Compare the microbial basis of hole formation in Swiss cheese versus the blue veins in Roquefort cheese.', answer: '**Correct answer:** - **Swiss cheese:** *Propionibacterium freudenreichii* subsp',
                  options: ['**Correct answer:** - **Swiss cheese:** *Propionibacterium freudenreichii* subsp', 'gas from bacteria'],
                  hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002** (Glycolysis).',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is.' }
          ],
            remediations: { 'misconception-yeast-respires-aerobically-in': { steps: ['** Revisit **c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration)** — focus on the biochemical pathway: glucose →.', '** Revisit **c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking, Fermentation)** — recall the Class 8 observation.', '** Do the **lime water test** (Diagnostic Q6) physically. Seeing the milky precipitate converts abstract "CO₂" into.', '** Re-attempt Diagnostic Q3 and Q5 — they directly test the anaerobic fermentation concept.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Adding more yeast to bread dough will always make the bread rise faster and higher." Identify two biological constraints that limit this.', answer: '**Correct answer:** The claim is **false**',
                  options: ['**Correct answer:** The claim is **false**', 'yeast dies at high temperature'],
                  hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002** (Glycolysis).',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is.' }
          ],
            remediations: { 'misconception-yeast-respires-aerobically-in': { steps: ['** Revisit **c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration)** — focus on the biochemical pathway: glucose →.', '** Revisit **c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking, Fermentation)** — recall the Class 8 observation.', '** Do the **lime water test** (Diagnostic Q6) physically. Seeing the milky precipitate converts abstract "CO₂" into.', '** Re-attempt Diagnostic Q3 and Q5 — they directly test the anaerobic fermentation concept.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_002', difficulty: 'standard',
          question: 'Antibiotics are chemical substances produced by microorganisms (bacteria.',
          hint: 'Review Class 11 node c11_bio_cbse_10_001 (Cell Cycle) for growth phases, and.',
          misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons.',
          parts: [
                { id: 'a', prompt: 'Name the fungus that produces penicillin and the bacterial genus that produces streptomycin. State one medical use for each.', answer: 'Penicillin is produced by *Penicillium notatum* (now *P',
                  options: ['Penicillin is produced by *Penicillium notatum* (now *P', 'to help humans', '*Aspergillus* for penicillin'],
                  hint: 'Review Class 11 node c11_bio_cbse_10_001 (Cell Cycle) for growth phases, and.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' },
                { id: 'b', prompt: 'Why are antibiotics like penicillin called secondary metabolites, and how does this affect the timing of harvest in industrial fermentation?', answer: 'Secondary metabolites are not essential for growth',
                  options: ['Secondary metabolites are not essential for growth', 'to help humans'],
                  hint: 'Review Class 11 node c11_bio_cbse_10_001 (Cell Cycle) for growth phases, and.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' }
          ],
            remediations: { 'antibiotics-are-produced-by-microbes': { steps: ['Revisit Class 11 node c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) to recall enzyme classification and.', 'Watch a 5-min video of penicillin fermentation showing growth curve and idiophase.', 'Draw a timeline: lag → log → stationary → death; mark primary vs secondary metabolite production.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_003', difficulty: 'standard',
          question: 'Microbes in beverage production refers to the controlled use of specific.',
          hint: 'If unclear on NAD⁺ role, revisit c11_bio_cbse_12_003 Step 3–4: "NADH from glycolysis must.',
          misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising.',
          parts: [
                { id: 'a', prompt: 'A winemaker observes that fermentation stops at 12% ABV (alcohol by volume) even though residual sugar remains.', answer: 'Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes',
                  options: ['Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes', 'add more yeast', 'add more sugar'],
                  hint: 'If unclear on NAD⁺ role, revisit c11_bio_cbse_12_003 Step 3–4: "NADH from glycolysis must.',
                  misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising metabolism.' },
                { id: 'b', prompt: 'Compare and contrast the carbon source, primary microbe, and the necessity of distillation in the production of wine, beer, and whisky.', answer: 'Wine: grape juice (glucose/fructose), *S',
                  options: ['Wine: grape juice (glucose/fructose), *S', 'beer uses grapes', 'whisky doesn\'t need distillation'],
                  hint: 'If unclear on NAD⁺ role, revisit c11_bio_cbse_12_003 Step 3–4: "NADH from glycolysis must.',
                  misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising metabolism.' }
          ],
            remediations: { 'yeast-produces-alcohol-as-a': { steps: ['Revisit c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration) — redraw the glycolysis → pyruvate → acetaldehyde →.', 'Perform the "balloon on bottle" demo (Diagnostic Q6) with two conditions: one with glucose, one with starch — observe.', 'Re-attempt Diagnostic Q2 and Q3; if still stuck, review c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_004', difficulty: 'standard',
          question: 'Sewage treatment is the process of removing contaminants from wastewater using.',
          hint: 'Review Class 8 decomposition (c8_bio_ch1_10) and Class 11 bacterial metabolism.',
          misconception: 'Students often think that primary treatment involves microbes (like bacteria) breaking down waste, but it is purely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sewage treatment is the process of removing contaminants from wastewater using physical,',
                  options: ['Sewage treatment is the process of removing contaminants from wastewater using physical,', 'Microbes in household products refer to the beneficial microorganisms (bacteria, fungi,', 'Antibiotics are chemical substances produced by microorganisms (bacteria, fungi,', 'Microbes in beverage production refers to the controlled use of specific microorganisms,'],
                  hint: 'Review Class 8 decomposition (c8_bio_ch1_10) and Class 11 bacterial metabolism.',
                  misconception: 'Students often think that primary treatment involves microbes (like bacteria) breaking down waste, but it is purely physical.' }
          ],
            remediations: { 'primary-treatment-involves-microbes-like': { steps: ['If the student confuses primary and secondary treatment, have them revisit Class 8 node c8_bio_ch1_10 (Beneficial.', 'Then use a flowchart: draw the sewage treatment steps, label each as physical or biological, and identify where.', 'Re-diagnostic: ask them to explain what happens in the aeration tank vs.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_005', difficulty: 'standard',
          question: 'Methanogens are obligate anaerobic archaebacteria that produce methane (CH₄).',
          hint: 'If stuck, review the difference between fermentation and anaerobic respiration.',
          misconception: 'Students often think methanogens are bacteria that "eat dung and breathe out methane" like animals breathe out CO₂.',
          parts: [
                { id: 'a', prompt: 'Name the specific group of archaebacteria responsible for methane production in a biogas digester and state their oxygen requirement.', answer: 'Correct answer: Methanogens (e.g., Methanobacterium, Methanococcus)',
                  options: ['Correct answer: Methanogens (e.g., Methanobacterium, Methanococcus)', 'eat dung and breathe out methane'],
                  hint: 'If stuck, review the difference between fermentation and anaerobic respiration.',
                  misconception: 'Students often think methanogens are bacteria that "eat dung and breathe out methane" like animals breathe out CO₂.' },
                { id: 'b', prompt: 'Why does a biogas plant stop producing gas if the slurry temperature drops below 15°C in winter, even though the digester is sealed?', answer: 'Correct answer: Methanogens are mesophilic (optimum 30–40°C)',
                  options: ['Correct answer: Methanogens are mesophilic (optimum 30–40°C)', 'lack of oxygen', 'eat dung and breathe out methane', 'anaerobiosis alone is sufficient, ignoring temperature-dependent enzyme kinetics'],
                  hint: 'If stuck, review the difference between fermentation and anaerobic respiration.',
                  misconception: 'Students often think methanogens are bacteria that "eat dung and breathe out methane" like animals breathe out CO₂.' },
                { id: 'c', prompt: 'A farmer adds fresh cattle dung to a biogas digester daily but notices the gas flame becomes yellow and smoky after two weeks.', answer: 'Correct answer: The gas now contains higher CO₂ and H₂S (yellow, smoky flame)',
                  options: ['Correct answer: The gas now contains higher CO₂ and H₂S (yellow, smoky flame)', 'air leakage', 'eat dung and breathe out methane'],
                  hint: 'If stuck, review the difference between fermentation and anaerobic respiration.',
                  misconception: 'Students often think methanogens are bacteria that "eat dung and breathe out methane" like animals breathe out CO₂.' }
          ],
            remediations: { 'methanogens-are-bacteria-that-eat': { steps: ['Revisit c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration) to contrast fermentation vs. anaerobic respiration.', 'Review c11_bio_cbse_02_002 (Kingdom Monera: Bacteria and Archaea) to recall archaeal cell wall/membrane differences.', 'Draw the four-stage anaerobic digestion flowchart (hydrolysis → acidogenesis → acetogenesis → methanogenesis) labeling.', 'Re-attempt Diagnostic Question 4 to verify understanding of energy conservation in methanogenesis.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_006', difficulty: 'standard',
          question: 'Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses.',
          hint: 'If stuck, review c11_bio_cbse_02_002 (Monera), c11_bio_cbse_02_005 (Fungi), and.',
          misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A farmer applies a Trichoderma-based biofungicide to soil infected with Rhizoctonia solani (causing root rot).', answer: '1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere',
                  options: ['1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere', 'competition', 'antibiotics', 'Bacillus thuringiensis'],
                  hint: 'If stuck, review c11_bio_cbse_02_002 (Monera), c11_bio_cbse_02_005 (Fungi), and c11_bio_cbse_02_009.',
                  misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.' }
          ],
            remediations: { 'bacillus-thuringiensis-and-bt-cotton': { steps: ['Revisit c11_bio_cbse_02_003 (Bacteria: Structure and Reproduction) to recall bacterial spore formation and protein.', 'Re-read the NCERT box on "Bt toxin" in the Microbes in Human Welfare chapter (not the Biotechnology chapter) and make.', 'Attempt Diagnostic Question 1 and 2 again; if still incorrect, watch a 5-min animation of Bt toxin activation in insect.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
