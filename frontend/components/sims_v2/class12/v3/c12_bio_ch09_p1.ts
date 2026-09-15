import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch09_p1: SimDef = {
    id: 'v3_c12_bio_ch09_p1',
    title: 'Strategies for Enhancement in Food Production · Part 1/2',
    subtitle: 'Same cows, double the milk — the difference is science, not luck.',
    classLevel: 12, subject: 'biology', topic: 'Strategies for Enhancement in Food Production · Part 1/2',
    chapters: ['c12_bio_ch09'],
    nodeIds: ['c12_bio_cbse_09_001', 'c12_bio_cbse_09_002', 'c12_bio_cbse_09_003', 'c12_bio_cbse_09_004', 'c12_bio_cbse_09_005', 'c12_bio_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Dairy farm consultant', intro: 'India became the world\'s largest milk producer on management science, not better cows — learn how.', goal: 'Apply principles of animal husbandry and scientific dairy farm management.' },
    discovery: {
        question: 'Two dairy farms own identical cows — yet one yields twice the milk. What is the most likely difference?',
        options: ['Management — balanced feeding, hygienic housing, veterinary care and breeding records drive yield', 'Luck — milk yield is fixed by the cow\'s genetics and cannot be managed', 'Climate — only farms in cold regions produce high yields', 'Breed alone — identical cows means identical yield regardless of care'],
        answer: 'Management — balanced feeding, hygienic housing, veterinary care and breeding records drive yield',
        hook: 'We credit the animal and blame the breed — but animal husbandry is a science precisely because yield is engineered through feeding, housing, health and records, not inherited wholesale.',
    },
    teaching: [
        { title: 'Animal Husbandry: Management of Farm Animals', text: 'Animal husbandry is the scientific practice of breeding, feeding, managing, and providing health care to domesticated farm animals (such as cattle, buffaloes, sheep, goats, pigs, and poultry).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_09_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Audit a struggling dairy farm: redesign its feeding ration, housing hygiene and health protocol, and justify each change by the yield and welfare gains it produces.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_001', title: 'Animal Husbandry: Management of Farm Animals',
          caseStudy: { intro: 'Imagine visiting a dairy farm in rural Punjab early in the morning: you see cows being fed a mixture of green fodder, dry straw, and concentrate; calves housed.',
            decisions: [{ prompt: 'Define animal husbandry and name any four farm animals commonly managed in India.', options: [
                { text: 'Animal husbandry is the scientific management of domesticated animals for products like', outcome: 'Animal husbandry is the scientific management of domesticated animals for products like milk, meat.' },
                { text: 'feeding animals on time', outcome: 'Not quite — Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook.', reveals: 'animal-husbandry-is-synonymous-with' },
                { text: 'animal husbandry is synonymous with “feeding animals on time', outcome: 'Not quite — Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook.', reveals: 'animal-husbandry-is-synonymous-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_002', title: 'Dairy Farm Management: Key Principles',
          scaffold: { problem: 'A farmer has a 500 kg Holstein-Friesian crossbred cow in early lactation (60 days in milk) yielding 30 kg milk with 3.8% fat and 3.2%.',
            steps: [
            { text: 'Calculate DMI and nutrient supply from each ingredient. Maize silage: 15×0.30 = 4.5 kg DM, NE_L = 4.5×0.65 = 2.925.' },
            { text: 'Total DMI = 4.5+4.5+5.4 = 14.4 kg DM (2.88% BW — slightly low for 30 L yielder, target 3.5% = 17.5 kg).' },
            { text: 'Calculate requirement. Maintenance NE_L (500 kg) = 0.08×BW^0.75 = 0.08×105.7 = 8.46 Mcal.' },
            { text: 'MP requirement: Maintenance MP = 3.0×BW^0.75 = 317 g. Milk MP = 30 kg × (32g CP/kg milk × 0.67 efficiency) = 641 g.' },
            { text: 'Conclusion: Ration severely energy-deficient. Cow will lose body condition (mobilize fat → NEFA → ketosis risk).', faded: true, blankAnswer: 'Ration provides 14.4 kg DMI (deficit 3.1 kg), 14.4 Mcal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_003', title: 'Poultry Farm Management',
          scaffold: { problem: 'A layer farm has 10,000 birds. Daily feed consumption is 11,500 kg. Daily egg production is 9,200 eggs with average weight 58 g.',
            steps: [
            { text: 'Calculate daily egg mass = 9,200 eggs × 0.058 kg/egg = 533.6 kg.' },
            { text: 'Current FCR = Feed Intake / Egg Mass = 11,500 kg / 533.6 kg = 21.55 (this is feed per kg egg mass?' },
            { text: 'Current FCR = 11,500 / 533.6 = 21.55 kg feed/kg egg mass.' },
            { text: 'Reduce feed wastage by 5%: New feed intake = 11,500 × 0.95 = 10,925 kg.' },
            { text: 'New FCR = 10,925 / 533.6 = 20.47.' },
            { text: 'Improvement = 21.55 - 20.47 = 1.08 units, or 5% reduction in FCR.', faded: true, blankAnswer: 'Current FCR = 21.55 kg feed/kg egg mass. New FCR after 5%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_004', title: 'Artificial Insemination and Superovulation',
          scaffold: { problem: 'A dairy cooperative plans to implement AI using a progeny-tested Holstein bull (EBV for milk yield = +1200 kg, reliability = 85%).',
            steps: [
            { text: 'Write the genetic gain formula for male and female pathways separately: ΔG/yr = (i_m × r_m × σ_A)/L_m + (i_f × r_f.' },
            { text: 'Compute male pathway gain for AI: i_m = 2.4, r_m = 0.85, σ_A = 800, L_m = 5 → (2.4 × 0.85 × 800)/5 = 1632/5 = 326.4.' },
            { text: 'Compute male pathway gain for natural service: i_m = 1.0, r_m = 0.5, σ_A = 800, L_m = 6 → (1.0 × 0.5 × 800)/6 = 400/6.' },
            { text: 'Compute female pathway gain (identical both): i_f = 1.0, r_f = 0.5 (cow EBV reliability), σ_A = 800, L_f = 4 → (1.0.' },
            { text: 'Total gain AI = 326.4 + 100 = 426.4 kg/yr; Natural = 66.7 + 100 = 166.7 kg/yr.', faded: true, blankAnswer: 'AI programme: 426.4 kg/yr genetic gain; Natural service.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_005', title: 'Bee-Keeping (Apiculture): Honey Production',
          scaffold: { problem: 'A beekeeper in Punjab manages 20 *Apis mellifera* colonies in standard Langstroth hives.',
            steps: [
            { text: 'Calculate initial forager population per colony. 8 brood frames × 7,000 cells = 56,000 brood cells.' },
            { text: 'Daily nectar collection before spray. 28,000 foragers × 10 trips × 30 mg × 0.40 sugar = 33,600,000 mg sugar = 33.6.' },
            { text: 'Adjust for pesticide loss on day 14. Foragers drop to 70% = 19,600 from day 14–21.' },
            { text: 'Convert sugar to harvestable honey. Nectar collected = sugar / 0.40 = 1,562.4 kg nectar.' },
            { text: 'For 20 colonies: 20 × 40 = 800 kg harvestable surplus. Key insight: pesticide loss on day 14 reduced yield by ~15% vs.', faded: true, blankAnswer: '~800 kg total harvestable surplus (40 kg/colony) after.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_006', title: 'Fisheries: Inland and Marine',
          caseStudy: { intro: 'Begin with a visit to your local fish market (machli bazaar) early morning — observe the variety: rohu, catla, mrigal (freshwater), pomfret, surmai, prawns.',
            decisions: [{ prompt: 'Name the three Indian major carps (IMC) and state one distinct feeding habit for each that makes them compatible for composite culture.', options: [
                { text: 'Correct: Catla catla (surface feeder, zooplankton), Labeo rohita (column feeder,', outcome: 'Correct: Catla catla (surface feeder, zooplankton), Labeo rohita (column feeder, omnivorous).' },
                { text: 'rohu, catla, mrigal', outcome: 'Not quite — Students believe "marine fisheries are only about catching fish from the sea" and ignore.', reveals: 'marine-fisheries-are-only-about' },
                { text: 'marine fisheries are only about catching fish from the sea', outcome: 'Not quite — Students believe "marine fisheries are only about catching fish from the sea" and ignore.', reveals: 'marine-fisheries-are-only-about' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Strategies for Enhancement in Food Production · Part 1/2', spots: [
            { id: 's1', label: 'Animal Husbandry Management of Farm Animals', prompt: 'Which idea is this? — Animal husbandry is the scientific practice of breeding, feeding, managing, and providing.', answer: 'Animal Husbandry Management of Farm Animals', options: ['Animal Husbandry Management of Farm Animals', 'Dairy Farm Management Key Principles', 'Poultry Farm Management', 'Artificial Insemination and Superovulation'] },
            { id: 's2', label: 'Dairy Farm Management Key Principles', prompt: 'Which idea is this? — Dairy farm management is the systematic application of scientific principles to housing.', answer: 'Dairy Farm Management Key Principles', options: ['Dairy Farm Management Key Principles', 'Animal Husbandry Management of Farm Animals', 'Poultry Farm Management', 'Artificial Insemination and Superovulation'] },
            { id: 's3', label: 'Poultry Farm Management', prompt: 'Which idea is this? — Poultry farm management is the scientific practice of raising domesticated birds.', answer: 'Poultry Farm Management', options: ['Poultry Farm Management', 'Animal Husbandry Management of Farm Animals', 'Dairy Farm Management Key Principles', 'Artificial Insemination and Superovulation'] },
            { id: 's4', label: 'Artificial Insemination and Superovulation', prompt: 'Which idea is this? — Artificial Insemination (AI) is a reproductive biotechnology where semen collected from.', answer: 'Artificial Insemination and Superovulation', options: ['Artificial Insemination and Superovulation', 'Animal Husbandry Management of Farm Animals', 'Dairy Farm Management Key Principles', 'Poultry Farm Management'] },
            { id: 's5', label: 'Bee-Keeping Apiculture Honey Production', prompt: 'Which idea is this? — Apiculture is the scientific management of honey bee colonies (primarily *Apis.', answer: 'Bee-Keeping Apiculture Honey Production', options: ['Bee-Keeping Apiculture Honey Production', 'Animal Husbandry Management of Farm Animals', 'Dairy Farm Management Key Principles', 'Poultry Farm Management'] },
            { id: 's6', label: 'Fisheries Inland and Marine', prompt: 'Which idea is this? — Fisheries refer to the scientific management, capture, processing, and marketing of fish.', answer: 'Fisheries Inland and Marine', options: ['Fisheries Inland and Marine', 'Animal Husbandry Management of Farm Animals', 'Dairy Farm Management Key Principles', 'Poultry Farm Management'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A dairy farmer brags that his shed is so clean he has stopped vaccinating the herd and skipped deworming \'to save money\'. The vet-college student interning with him is asked whether that\'s sound management.',
            decisions: [{ prompt: 'Can spotless housing replace preventive health care?', options: [
                { text: 'No — hygiene cuts pathogen load but can\'t break every cycle: worm eggs persist in soil for years and airborne or vector-borne diseases arrive regardless; vaccination primes immunity and deworming interrupts parasite cycles.', outcome: 'Husbandry is four interdependent pillars — feeding, breeding, health and housing; excellent housing can\'t substitute for the health pillar.' },
                { text: 'Yes — a clean shed removes the source of disease, so vaccines and dewormers become redundant.', outcome: 'Cleanliness lowers exposure but can\'t stop wind-borne FMD or nematode eggs lying dormant in pasture soil for years.', reveals: 'hygiene-replaces-vaccines' },
                { text: 'Yes — and the money saved can go to extra calories, since feed quantity alone decides milk yield.', outcome: 'Milk synthesis needs a balanced ration — protein, minerals, fibre, not just calories — and a sick or wormy cow won\'t convert feed to milk anyway.', reveals: 'calories-equal-balanced-ration' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see farms as systems, not just animals. Animal husbandry principles score easy board marks — and India\'s dairy economy runs on exactly this knowledge.',
            decisions: [{ prompt: 'What comes next? Strategies for Enhancement in Food Production · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Strategies for Enhancement in Food Production · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_001', difficulty: 'standard',
          question: 'Animal husbandry is the scientific practice of breeding, feeding, managing, and.',
          hint: 'If stuck, revisit the ruminant stomach compartments and volatile fatty acid absorption.',
          misconception: 'Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook that breeding.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Animal husbandry is the scientific practice of breeding, feeding, managing, and providing',
                  options: ['Animal husbandry is the scientific practice of breeding, feeding, managing, and providing', 'Dairy farm management is the systematic application of scientific principles to housing,', 'Poultry farm management is the scientific practice of raising domesticated birds', 'Artificial Insemination (AI) is a reproductive biotechnology where semen collected from a'],
                  hint: 'If stuck, revisit the ruminant stomach compartments and volatile fatty acid absorption.',
                  misconception: 'Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook that breeding decisions (selection.' }
          ],
            remediations: { 'animal-husbandry-is-synonymous-with': { steps: ['Revisit the digestive system of ruminants vs.', 'non‑ruminants (c6_biology_ch09_001, c6_biology_ch09_003) to understand why nutrient balance differs across species.', 'Review sexual reproduction in vertebrates (c9_bio_ch3_8) to grasp how breeding cycles affect management timing.', 'Create a concept map linking the four pillars (feeding, breeding, health, housing) with arrows showing interactions.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook that breeding.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Regular deworming and vaccination are unnecessary if farm hygiene is excellent.” Provide a biological justification for your.', answer: 'The statement is false',
                  options: ['The statement is false', 'feeding animals on time', 'animal husbandry is synonymous with “feeding animals on time'],
                  hint: 'If stuck, revisit the ruminant stomach compartments and volatile fatty acid absorption.',
                  misconception: 'Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook that breeding decisions (selection.' },
                { id: 'b', prompt: 'Design a simple monthly health‑monitoring checklist for a small goat farm (20 does) that a farmer with basic literacy can use.', answer: 'A good checklist includes: (1) Body condition score (BCS)',
                  options: ['A good checklist includes: (1) Body condition score (BCS)', 'feeding animals on time', 'animal husbandry is synonymous with “feeding animals on time'],
                  hint: 'If stuck, revisit the ruminant stomach compartments and volatile fatty acid absorption.',
                  misconception: 'Students often think animal husbandry is synonymous with “feeding animals on time.” They overlook that breeding decisions (selection.' }
          ],
            remediations: { 'animal-husbandry-is-synonymous-with': { steps: ['Revisit the digestive system of ruminants vs.', 'non‑ruminants (c6_biology_ch09_001, c6_biology_ch09_003) to understand why nutrient balance differs across species.', 'Review sexual reproduction in vertebrates (c9_bio_ch3_8) to grasp how breeding cycles affect management timing.', 'Create a concept map linking the four pillars (feeding, breeding, health, housing) with arrows showing interactions.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_002', difficulty: 'standard',
          question: 'Dairy farm management is the systematic application of scientific principles.',
          hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and.',
          misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
          parts: [
                { id: 'a', prompt: 'A dairy farmer feeds his crossbred cow 30 kg green maize fodder, 4 kg wheat straw, and 2 kg concentrate mixture daily. The cow yields 15 L milk with 3.5% fat.', answer: 'DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM',
                  options: ['DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM', 'more concentrate = more milk', 'energy density of diet', 'energy available to cow'],
                  hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and c11_bio_cbse_09_007.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'b', prompt: 'Why is it physiologically harmful to milk a cow with full udder without pre-milking teat stimulation (fore-stripping, udder wash, massage) for at least 60-90.', answer: 'Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →',
                  options: ['Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →', 'cleaning teats', 'more concentrate = more milk', 'energy density of diet'],
                  hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and c11_bio_cbse_09_007.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'c', prompt: 'A farmer switches his 10 Holstein-Friesian crossbred cows from individual stall feeding to a loose housing system with group feeding of TMR.', answer: 'Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing',
                  options: ['Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing', 'stress', 'more concentrate = more milk', 'energy density of diet'],
                  hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and c11_bio_cbse_09_007.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' }
          ],
            remediations: { 'more-concentrate-more-milk-and': { steps: ['Revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) — understand enzyme pH optimum (cellulases denature at.', 'Revisit c11_bio_cbse_12_005 (Krebs Cycle) — trace how rumen VFA (acetate, propionate, butyrate) enter host metabolism.', 'Use ICAR feeding standard tables to formulate a 15 kg DM ration for 20 L yielder with 40% NDF, 16% CP — calculate.', 'Re-diagnostic: Given a cow with milk fat 2.8%, rumen pH 5.5, suggest 3 specific ration changes with physiological.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_003', difficulty: 'standard',
          question: 'Poultry farm management is the scientific practice of raising domesticated.',
          hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
          misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.',
          parts: [
                { id: 'a', prompt: 'List the four major categories of poultry breeds used commercially in India with one example each, and state the primary selection criterion for layer vs.', answer: 'Correct answer: 1) Egg-type (layers) e.g., White Leghorn',
                  options: ['Correct answer: 1) Egg-type (layers) e.g., White Leghorn', 'chicken breeds', 'broilers are injected with hormones to grow fast', 'only "chicken breeds" without categorization or confusing selection criteria'],
                  hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'b', prompt: 'Explain why deep litter system is preferred over cage system for broiler production in India, but cage system dominates layer farming.', answer: 'Correct answer: Broilers are reared for only 6-7 weeks',
                  options: ['Correct answer: Broilers are reared for only 6-7 weeks', 'broilers are injected with hormones to grow fast'],
                  hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'c', prompt: 'A farmer switches from mash to pelleted feed for his 20,000-bird layer farm.', answer: 'Correct answer: (a) FCR improves (decreases)',
                  options: ['Correct answer: (a) FCR improves (decreases)', 'FCR worsens because pellets are expensive', 'broilers are injected with hormones to grow fast'],
                  hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' },
                { id: 'd', prompt: 'Compare the vaccination schedule for Ranikhet disease (Newcastle disease) in layers vs. broilers.', answer: 'Correct answer: Layers receive 4-5 doses: day 1 (lasota), day 7 (lasota), day 21',
                  options: ['Correct answer: Layers receive 4-5 doses: day 1 (lasota), day 7 (lasota), day 21', 'broilers are injected with hormones to grow fast'],
                  hint: 'Review c11_bio_cbse_09_001 and c11_bio_cbse_09_002 for nutrient biochemistry, and.',
                  misconception: 'Students believe "broilers are injected with hormones to grow fast" — this is biologically impossible and illegal.' }
          ],
            remediations: { 'broilers-are-injected-with-hormones': { steps: ['Revisit c12_bio_cbse_09_001 (Animal Husbandry) to understand domestication and selection principles.', 'Review c11_bio_cbse_09_001 (Carbohydrates) and c11_bio_cbse_09_002 (Proteins) for nutrient roles in growth.', 'Watch a 10-minute video of commercial broiler farm (YouTube: "Indian poultry farm management") to visualize housing.', 'Re-attempt Diagnostic Questions 2 and 3, focusing on linking bird physiology to management decisions.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_004', difficulty: 'standard',
          question: 'Artificial Insemination (AI) is a reproductive biotechnology where semen.',
          hint: 'Review c11_bio_cbse_19_005 (Gonads: Testis and Ovary Hormones) focusing on follicular.',
          misconception: '**Misconception**: "Superovulation means giving FSH to make the cow ovulate more eggs — the more FSH, the more.',
          parts: [
                { id: 'a', prompt: 'Compare the genetic gain per year achievable by (a) natural mating of one elite bull to 40 cows, (b) AI using the same bull on 10,000 cows, (c) MOET from one.', answer: 'Genetic gain per year (ΔG/yr) = (Selection intensity × Accuracy × Genetic SD) /',
                  options: ['Genetic gain per year (ΔG/yr) = (Selection intensity × Accuracy × Genetic SD) /', 'AI gives more calves so more gain', 'superovulation', 'superstimulation'],
                  hint: 'Review c11_bio_cbse_19_005 (Gonads: Testis and Ovary Hormones) focusing on follicular wave.',
                  misconception: '**Misconception**: "Superovulation means giving FSH to make the cow ovulate more eggs — the more FSH, the more embryos." **Why it\'s.' }
          ],
            remediations: { 'misconception-superovulation-means-giving-fsh': { steps: ['**Step 1**: Revisit **c11_bio_cbse_19_005 (Gonads: Testis and Ovary Hormones)** — specifically the follicular wave.', 'Draw the 21-day estrous cycle with follicular waves, marking FSH/LH/progesterone/estradiol profiles.', '**Step 2**: Rewatch/Re-read the **MOET protocol animation** (NCERT Fig 9.17 or equivalent) — pause at each hormone.', '**Step 3**: Solve this re-diagnostic: "A cow given FSH on Day 12 of cycle (mid-luteal) yields 2 embryos.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_005', difficulty: 'standard',
          question: 'Apiculture is the scientific management of honey bee colonies (primarily *Apis.',
          hint: 'Revisit c11_bio_cbse_04_009 (insect morphology) and c11_bio_cbse_07_001 (glandular.',
          misconception: 'Students believe that **honey is simply "bee vomit" or regurgitated nectar**, ignoring the enzymatic transformation.',
          parts: [
                { id: 'a', prompt: 'Explain why a beekeeper must replace the queen in an *Apis mellifera* colony every 1–2 years, linking this to the queen\'s pheromonal control over worker ovary.', answer: 'The queen secretes queen mandibular pheromone (QMP) that suppresses worker ovary',
                  options: ['The queen secretes queen mandibular pheromone (QMP) that suppresses worker ovary', 'egg-laying capacity', 'bee vomit', 'honey is just concentrated nectar'],
                  hint: 'Revisit c11_bio_cbse_04_009 (insect morphology) and c11_bio_cbse_07_001 (glandular epithelium).',
                  misconception: 'Students believe that **honey is simply "bee vomit" or regurgitated nectar**, ignoring the enzymatic transformation: foragers add invertase.' },
                { id: 'b', prompt: 'Compare the economic viability of stationary *Apis cerana indica* beekeeping in the Western Ghats versus migratory *Apis mellifera* beekeeping following.', answer: '| Factor | Stationary *A',
                  options: ['| Factor | Stationary *A', 'bee vomit', 'honey is just concentrated nectar'],
                  hint: 'Revisit c11_bio_cbse_04_009 (insect morphology) and c11_bio_cbse_07_001 (glandular epithelium).',
                  misconception: 'Students believe that **honey is simply "bee vomit" or regurgitated nectar**, ignoring the enzymatic transformation: foragers add invertase.' }
          ],
            remediations: { 'honey-is-simply-bee-vomit': { steps: ['If the student holds the "bee vomit" misconception: (1) Revisit c11_bio_cbse_09_005 (Enzyme kinetics) — run a simple.', '(2) Observe a hive (or video) — note house bees repeatedly exposing nectar droplets to air on mandibles (evaporation).', '(3) Re-diagnose with: "Explain why unripe honey (water >20%) ferments but ripe honey does not" — correct answer must.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_006', difficulty: 'standard',
          question: 'Fisheries refer to the scientific management, capture, processing, and.',
          hint: 'If stuck, revisit **c6_biology_ch09_006 (The Food Chain: Energy Flow in Nature)** for the.',
          misconception: 'Students believe "marine fisheries are only about catching fish from the sea" and ignore **mariculture** (cultivation.',
          parts: [
                { id: 'a', prompt: 'Name the three Indian major carps (IMC) and state one distinct feeding habit for each that makes them compatible for composite culture.', answer: 'Correct: Catla catla (surface feeder, zooplankton), Labeo rohita (column feeder,',
                  options: ['Correct: Catla catla (surface feeder, zooplankton), Labeo rohita (column feeder,', 'rohu, catla, mrigal', 'marine fisheries are only about catching fish from the sea', 'induced breeding'],
                  hint: 'If stuck, revisit **c6_biology_ch09_006 (The Food Chain: Energy Flow in Nature)** for the 10%.',
                  misconception: 'Students believe "marine fisheries are only about catching fish from the sea" and ignore **mariculture** (cultivation of marine organisms.' },
                { id: 'b', prompt: 'Design a composite fish culture stocking ratio for a 0.5-ha seasonal pond in West Bengal using IMC + two exotic carps.', answer: 'Correct: Example ratio (total 5000 fingerlings/ha → 2500 for 0.5 ha): Catla 1.5',
                  options: ['Correct: Example ratio (total 5000 fingerlings/ha → 2500 for 0.5 ha): Catla 1.5', 'marine fisheries are only about catching fish from the sea', 'induced breeding', 'artificial fertilization'],
                  hint: 'If stuck, revisit **c6_biology_ch09_006 (The Food Chain: Energy Flow in Nature)** for the 10%.',
                  misconception: 'Students believe "marine fisheries are only about catching fish from the sea" and ignore **mariculture** (cultivation of marine organisms.' }
          ],
            remediations: { 'marine-fisheries-are-only-about': { steps: ['Revisit **c11_bio_cbse_04_014 (Classes of Vertebrates: Fish to Mammals)** to recall fish classification (Chondrichthyes.', 'Watch a 10-min video of composite fish culture in a West Bengal pond (search "ICAR CIFA composite culture").', 'Draw a trophic niche diagram (surface/column/bottom) with 3 IMC + 2 exotics — label food items.', 'Re-attempt Diagnostic Q2 and Q3. If still stuck, review **c9_bio_ch4_1 (Biodiversity)** for the concept of resource.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
