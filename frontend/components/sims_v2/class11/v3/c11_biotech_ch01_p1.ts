import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch01_p1: SimDef = {
    id: 'v3_c11_biotech_ch01_p1',
    title: 'Introduction to Biotechnology · Part 1/2',
    subtitle: 'Map the scope of biotechnology — from recombinant DNA to industrial fermentation.',
    classLevel: 11, subject: 'biotechnology', topic: 'Introduction to Biotechnology · Part 1/2',
    chapters: ['c11_biotech_ch01'],
    nodeIds: ['c11_biotech_cbse_01_001', 'c11_biotech_cbse_01_002', 'c11_biotech_cbse_01_003', 'c11_biotech_cbse_01_004', 'c11_biotech_cbse_01_005', 'c11_biotech_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biotech intern touring a modern insulin plant', intro: 'A pharmacy shelf full of biotech products, each one a cell tricked into working for us.', goal: 'Define biotechnology, distinguish classical from modern methods, and outline major application areas.' },
    discovery: {
        question: 'Insulin for diabetics was once extracted from pig pancreases — tonnes of tissue for grams of hormone. Today bacteria in a steel tank do the job. What actually changed?',
        options: ['The human insulin gene was moved into bacteria, turning them into protein factories', 'Bacteria naturally produce human insulin when fed sugar', 'Pig insulin was chemically edited to match human insulin', 'Fermentation tanks simply scale up pancreas extraction'],
        answer: 'The human insulin gene was moved into bacteria, turning them into protein factories',
        hook: 'Biotechnology isn\'t just brewing microbes — it\'s rewriting their instructions to build molecules they never made.',
    },
    teaching: [
        { title: 'Biotechnology: Definition and Scope', text: 'Biotechnology is the interdisciplinary application of scientific and engineering principles to process materials using living organisms, cells, cellular components, or biological molecules (such.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_01_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Trace how a gene becomes a product: identify where recombinant DNA, fermentation and downstream processing each fit in the biotech pipeline.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_001', title: 'Biotechnology: Definition and Scope',
          caseStudy: { intro: 'Begin by asking: "You eat dahi (curd) daily and take insulin if diabetic — what single scientific framework connects these two?" Guide students to recognize.',
            decisions: [{ prompt: 'Define biotechnology as per the NCERT Class 11 textbook. Your answer must include the three key components: the biological entity used, the.', options: [
                { text: 'Correct answer: "Biotechnology refers to the different technologies that make use of', outcome: 'Correct answer: "Biotechnology refers to the different technologies that make use of living cells.' },
                { text: 'A wrong answer that omits', outcome: 'Not quite — **Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the.', reveals: 'misconception-biotechnology-genetic-engineering-' },
                { text: 'benefit of mankind', outcome: 'Not quite — **Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the.', reveals: 'misconception-biotechnology-genetic-engineering-' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_002', title: 'Historical Development of Biotechnology',
          caseStudy: { intro: 'Imagine you find a 5,000-year-old Egyptian jar with residue analysis showing it contained beer. How did they make it without knowing about yeast?',
            decisions: [{ prompt: 'A student writes: "Biotechnology began in 1917 when Karl Ereky coined the term." What critical historical error does this statement contain?', options: [
                { text: 'The error is conflating the *term* with the *practice*', outcome: 'The error is conflating the *term* with the *practice*. Biotechnology practice began ~10,000 BCE.' },
                { text: 'march of progress', outcome: 'Not quite — Students believe the historical development is a linear "march of progress" where each discovery.', reveals: 'the-historical-development-is-a' },
                { text: 'Watson and Crick discovered DNA', outcome: 'Not quite — Students believe the historical development is a linear "march of progress" where each discovery.', reveals: 'the-historical-development-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_003', title: 'Traditional vs Modern Biotechnology',
          caseStudy: { intro: 'Imagine your grandmother making dahi (curd) by adding a spoonful of yesterday\'s dahi to warm milk — she knows it works but not *why* it works.',
            decisions: [{ prompt: 'A student writes: "Traditional biotechnology uses bacteria and yeast, while modern biotechnology uses only plants and animals." Is this.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Traditional biotechnology uses microorganisms (yeast for bread/beer.' },
                { text: 'traditional', outcome: 'Not quite — Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech".', reveals: 'traditional-biotechnology-old-low-tech' },
                { text: 'microbial fermentation only', outcome: 'Not quite — Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech".', reveals: 'traditional-biotechnology-old-low-tech' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_004', title: 'Branches of Biotechnology: Blue, Green, Red and White',
          caseStudy: { intro: 'Imagine you walk into a supermarket and see four products: a packet of Bt cotton seeds, a vial of recombinant insulin, a bottle of detergent with "enzymes for.',
            decisions: [{ prompt: 'Name the four colour-coded branches of biotechnology and give one textbook example for each.', options: [
                { text: 'Blue Biotechnology – marine/freshwater applications (e.g., algal biofuels, anticancer', outcome: 'Blue Biotechnology – marine/freshwater applications (e.g., algal biofuels, anticancer compounds.' },
                { text: 'Red uses rDNA, White uses fermentation', outcome: 'Not quite — Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White.', reveals: 'the-colour-code-indicates-the' },
                { text: 'the colour code indicates the *technique* used (e', outcome: 'Not quite — Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White.', reveals: 'the-colour-code-indicates-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_005', title: 'Biotechnology in Agriculture: GM Crops',
          caseStudy: { intro: 'Imagine a cotton farmer in Vidarbha who spends ₹15,000 per acre on pesticide sprays yet loses 30% yield to pink bollworm.',
            decisions: [{ prompt: 'Define "Genetically Modified (GM) crop" and name the soil bacterium that is the source of the insecticidal protein in Bt cotton.', options: [
                { text: 'A GM crop is a plant whose genome has been altered by inserting one or more genes from', outcome: 'A GM crop is a plant whose genome has been altered by inserting one or more genes from another.' },
                { text: 'Bt toxin remains active in soil after harvest and destroys soil fertility', outcome: 'Not quite — **Misconception:** "Bt cotton produces a chemical pesticide inside the plant that poisons the soil.', reveals: 'misconception-bt-cotton-produces-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Biotechnology · Part 1/2', spots: [
            { id: 's1', label: 'Biotechnology Definition and Scope', prompt: 'Which idea is this? — Biotechnology is the interdisciplinary application of scientific and engineering.', answer: 'Biotechnology Definition and Scope', options: ['Biotechnology Definition and Scope', 'Historical Development of Biotechnology', 'Traditional vs Modern Biotechnology', 'Branches of Biotechnology Blue Green Red and White'] },
            { id: 's2', label: 'Historical Development of Biotechnology', prompt: 'Which idea is this? — Historical Development of Biotechnology is the chronological progression from ancient.', answer: 'Historical Development of Biotechnology', options: ['Historical Development of Biotechnology', 'Biotechnology Definition and Scope', 'Traditional vs Modern Biotechnology', 'Branches of Biotechnology Blue Green Red and White'] },
            { id: 's3', label: 'Traditional vs Modern Biotechnology', prompt: 'Which idea is this? — Traditional biotechnology refers to the historical application of biological processes.', answer: 'Traditional vs Modern Biotechnology', options: ['Traditional vs Modern Biotechnology', 'Biotechnology Definition and Scope', 'Historical Development of Biotechnology', 'Branches of Biotechnology Blue Green Red and White'] },
            { id: 's4', label: 'Branches of Biotechnology Blue Green Red and White', prompt: 'Which idea is this? — Biotechnology is categorized into four major branches based on the application domain.', answer: 'Branches of Biotechnology Blue Green Red and White', options: ['Branches of Biotechnology Blue Green Red and White', 'Biotechnology Definition and Scope', 'Historical Development of Biotechnology', 'Traditional vs Modern Biotechnology'] },
            { id: 's5', label: 'Biotechnology in Agriculture GM Crops', prompt: 'Which idea is this? — Genetically Modified (GM) crops are transgenic plants created by inserting specific.', answer: 'Biotechnology in Agriculture GM Crops', options: ['Biotechnology in Agriculture GM Crops', 'Biotechnology Definition and Scope', 'Historical Development of Biotechnology', 'Traditional vs Modern Biotechnology'] },
            { id: 's6', label: 'Biotechnology in Medicine Vaccines and Therapeutics', prompt: 'Which idea is this? — Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant.', answer: 'Biotechnology in Medicine Vaccines and Therapeutics', options: ['Biotechnology in Medicine Vaccines and Therapeutics', 'Biotechnology Definition and Scope', 'Historical Development of Biotechnology', 'Traditional vs Modern Biotechnology'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a class field trip to a biotech park you visit three units: a unit making curd cultures and traditional fermented foods, a unit mass-producing penicillin from a Penicillium strain improved by decades of strain selection, and a unit making recombinant insulin in engineered E. coli. Your friend labels all three \'modern biotechnology\' because all use microbes.',
            decisions: [{ prompt: 'Which units are actually \'modern biotechnology\'?', options: [
                { text: 'Only the recombinant insulin unit — modern biotechnology is defined by rDNA technology, i.e., deliberately cutting and rejoining DNA. The curd unit is ancient/classical fermentation and penicillin from a selected (not engineered) strain is classical, even though microbes are used.', outcome: 'The classifier is the technology, not the product: no constructed recombinant DNA means not modern biotechnology.' },
                { text: 'All three — biotechnology means using living organisms for products, and all three use microbes, so all are modern.', outcome: 'That erases the field\'s own history: ancient (domestication), classical (fermentation without genetic manipulation), modern (rDNA). Using a microbe is not the same as engineering its genome.', reveals: 'biotech-equals-genetic-engineering' },
                { text: 'Only the penicillin and insulin units — fermentation of curd is too simple to count as biotechnology at all.', outcome: 'Dahi-making is the classical phase of biotechnology; excluding it shows the definition was memorised as \'high-tech only\' rather than \'processing materials using living systems\'.', reveals: 'fermentation-not-biotech' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Biotechnology is engineering with biology\'s own toolkit — cells become factories once you can edit their code.',
            decisions: [{ prompt: 'What comes next? Introduction to Biotechnology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Biotechnology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_001', difficulty: 'standard',
          question: 'Biotechnology is the interdisciplinary application of scientific and.',
          hint: 'Revisit **c10_bio_cbse_04_001** (DNA as genetic material) and **c10_bio_cbse_01_007**.',
          misconception: '**Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the *entire field* with its.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Making dahi (curd) at home is modern biotechnology because we use a specific starter culture (Lactobacillus) to transform milk." Explain why.', answer: 'Correct explanation: Dahi production is **classical biotechnology**',
                  options: ['Correct explanation: Dahi production is **classical biotechnology**', 'modern', 'known culture'],
                  hint: 'Revisit **c10_bio_cbse_04_001** (DNA as genetic material) and **c10_bio_cbse_01_007** (fermentation.',
                  misconception: '**Misconception:** "Biotechnology = Genetic Engineering (rDNA technology)." Students equate the *entire field* with its *modern subset*.' }
          ],
            remediations: { 'misconception-biotechnology-genetic-engineering-': { steps: ['** Draw a 3-column table on paper: **Ancient | Classical | Modern**. **', '** In each column, write the **defining technology** (not the product): *Ancient: Selective breeding/domestication (no.', '** Take 5 products (dahi, wine, penicillin, Humulin, Bt cotton) and place each in the correct column by asking: *"Was.', '** Verbalize the rule: **"If no recombinant DNA was constructed → Not Modern Biotechnology."** Repeat until automatic.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_002', difficulty: 'standard',
          question: 'Historical Development of Biotechnology is the chronological progression from.',
          hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s.',
          misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Biotechnology began in 1917 when Karl Ereky coined the term." What critical historical error does this statement contain?', answer: 'The error is conflating the *term* with the *practice*',
                  options: ['The error is conflating the *term* with the *practice*', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s Experiments) — these.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'b', prompt: 'Explain why Louis Pasteur\'s work (1850s-1860s) represents a fundamental epistemological break from all prior fermentation practices, using the phrase "black.', answer: 'Prior to Pasteur, fermentation was a "black box"',
                  options: ['Prior to Pasteur, fermentation was a "black box"', 'Pasteur invented pasteurization', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s Experiments) — these.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'c', prompt: 'A textbook claims: "Eduard Buchner\'s 1896 cell-free fermentation extract proved that life is not necessary for biochemical reactions." Design a 3-step.', answer: 'Step 1: Prepare yeast extract by grinding yeast with sand and pressing',
                  options: ['Step 1: Prepare yeast extract by grinding yeast with sand and pressing', 'use PCR to check for DNA', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s Experiments) — these.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' }
          ],
            remediations: { 'the-historical-development-is-a': { steps: ['If a student cannot sequence milestones or explain conceptual shifts: 1) Give them 10 index cards with one milestone.', '2) Ask them to physically arrange cards on a timeline *without dates visible*, using only logical dependency (e.g.', '3) For each adjacent pair, demand: "What did the earlier one make possible for the later one?" 4) Finally, reveal dates.', 'This forces causal reasoning over rote memorization.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Modern biotechnology is just faster, more precise traditional biotechnology." Use the distinction between *selective breeding* and.', answer: 'The claim is false',
                  options: ['The claim is false', 'both change genes', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s Experiments) — these.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' },
                { id: 'b', prompt: 'Create a 6-panel storyboard illustrating the conceptual evolution from "fermentation as divine gift" (ancient) to "fermentation as enzyme catalysis" (Buchner).', answer: 'Panel 1: "Mystery: Gods make wine" (ancient)',
                  options: ['Panel 1: "Mystery: Gods make wine" (ancient)', 'march of progress', 'Watson and Crick discovered DNA'],
                  hint: 'If stuck, revisit c9_bio_ch1_2 (Cell Theory) and c10_bio_cbse_04_002 (Mendel\'s Experiments) — these.',
                  misconception: 'Students believe the historical development is a linear "march of progress" where each discovery immediately enabled the next.' }
          ],
            remediations: { 'the-historical-development-is-a': { steps: ['If a student cannot sequence milestones or explain conceptual shifts: 1) Give them 10 index cards with one milestone.', '2) Ask them to physically arrange cards on a timeline *without dates visible*, using only logical dependency (e.g.', '3) For each adjacent pair, demand: "What did the earlier one make possible for the later one?" 4) Finally, reveal dates.', 'This forces causal reasoning over rote memorization.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_003', difficulty: 'standard',
          question: 'Traditional biotechnology refers to the historical application of biological.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 4 (Mendel\'s laws) for gene concept and Class 8.',
          misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" —.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Traditional biotechnology uses bacteria and yeast, while modern biotechnology uses only plants and animals." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'traditional', 'microbial fermentation only', 'modern'],
                  hint: 'If stuck, revisit Class 10 Biology Chapter 4 (Mendel\'s laws) for gene concept and Class 8 Biology.',
                  misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a temporal/technological misconception.' }
          ],
            remediations: { 'traditional-biotechnology-old-low-tech': { steps: ['If the student persists in the temporal misconception: (1) Present two side-by-side fermenters: 1945 penicillin (random.', 'Ask: "In which fermenter do we *know the exact DNA change*?" (2) Have them read the NCERT definition: "Modern.', '(3) Assign: "Classify these 5 practices as traditional/modern with justification: (a) Bt cotton, (b) Sourdough starter.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_004', difficulty: 'standard',
          question: 'Biotechnology is categorized into four major branches based on the application.',
          hint: 'Revisit Node 001 (definition) and Node 003 (rDNA technology as the core tool of modern.',
          misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
          parts: [
                { id: 'a', prompt: 'Classify the following into the correct branch and justify in one sentence each: (a) Production of human growth hormone in E.', answer: 'Production of human growth hormone in E',
                  options: ['Production of human growth hormone in E', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Revisit Node 001 (definition) and Node 003 (rDNA technology as the core tool of modern.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'b', prompt: 'Compare Red and White biotechnology on three parameters: (i) primary host system, (ii) regulatory stringency, (iii) typical product purification challenge.', answer: '| Parameter | Red Biotechnology | White Biotechnology |',
                  options: ['| Parameter | Red Biotechnology | White Biotechnology |', 'Red uses rDNA, White uses fermentation', 'both use E', 'the colour code indicates the *technique* used (e'],
                  hint: 'Revisit Node 001 (definition) and Node 003 (rDNA technology as the core tool of modern.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' }
          ],
            remediations: { 'the-colour-code-indicates-the': { steps: ['Ask the student to list the *source organism* for each example (insulin → E.', 'Have them group by organism type: microbes for industry (White), plants for farm (Green), human proteins in microbes.', 'Explicitly state: "The colour tells you WHERE the biology comes from and WHERE the product goes, not HOW it\'s made."', 'Give a new scenario: "A company engineers yeast to produce a coral reef sunscreen compound." Student classifies: marine.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_005', difficulty: 'standard',
          question: 'Genetically Modified (GM) crops are transgenic plants created by inserting.',
          hint: 'Review the "Overview of modern biotechnology" figure (Fig 1.1) in node.',
          misconception: '**Misconception:** "Bt cotton produces a chemical pesticide inside the plant that poisons the soil and kills all.',
          parts: [
                { id: 'a', prompt: 'Explain why the Cry1Ac protein kills cotton bollworm larvae but is harmless to humans and non-target insects like bees.', answer: 'Cry1Ac is produced as an inactive protoxin',
                  options: ['Cry1Ac is produced as an inactive protoxin', 'Bt toxin remains active in soil after harvest and destroys soil fertility'],
                  hint: 'Review the "Overview of modern biotechnology" figure (Fig 1.1) in node c11_biotech_cbse_01_001 and.',
                  misconception: '**Misconception:** "Bt cotton produces a chemical pesticide inside the plant that poisons the soil and kills all beneficial insects." **Why.' }
          ],
            remediations: { 'misconception-bt-cotton-produces-a': { steps: ['**Show the specificity triangle:** Draw a 3-panel diagram: (i) Lepidopteran gut: pH 10 + specific protease + cadherin.', '(ii) Human gut: pH 2 + pepsin → rapid denaturation → no receptors → safe.', '(iii) Bee gut: pH neutral + no cadherin receptor → no binding → safe.', '**Contrast with chemical pesticide:** Sprayed synthetic pyrethroid: contact action, broad-spectrum, persists weeks.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_006', difficulty: 'standard',
          question: 'Biotechnology in medicine (Red Biotechnology) encompasses the application.',
          hint: 'Revisit the rDNA technology flowchart (isolation → vector → host → expression) from.',
          misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant',
                  options: ['Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant', 'Biotechnology is the interdisciplinary application of scientific and engineering', 'Historical Development of Biotechnology is the chronological progression from ancient', 'Traditional biotechnology refers to the historical application of biological processes'],
                  hint: 'Revisit the rDNA technology flowchart (isolation → vector → host → expression) from.',
                  misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are essentially the same.' }
          ],
            remediations: { 'misconception-recombinant-vaccines-and-gene': { steps: ['**Clarify the "gene" destination:** Draw a T-table: Vaccine = gene stays in *production cell* (yeast/E.', 'coli) → protein purified → injected.', 'Gene therapy = gene enters *patient\'s cell* (via vector) → protein made *in vivo*.', 'ADA" analogy:** Recombinant insulin = bakery makes bread (protein), you eat it.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
