import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch12_p1: SimDef = {
    id: 'v3_c12_bio_ch12_p1',
    title: 'Biotechnology and Its Applications · Part 1/2',
    subtitle: 'The pesticide is inside the plant — how Bt cotton outsmarted the bollworm.',
    classLevel: 12, subject: 'biology', topic: 'Biotechnology and Its Applications · Part 1/2',
    chapters: ['c12_bio_ch12'],
    nodeIds: ['c12_bio_cbse_12_001', 'c12_bio_cbse_12_002', 'c12_bio_cbse_12_003', 'c12_bio_cbse_12_004', 'c12_bio_cbse_12_005', 'c12_bio_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Agricultural biotechnologist', intro: 'The best pesticide is one the plant makes itself — biotechnology turned that idea into India\'s cotton fields.', goal: 'Explain Bt cotton\'s Cry toxin mechanism and RNA interference for pest resistance.' },
    discovery: {
        question: 'A Maharashtra farmer stops spraying 15-20 times a season, yet his bolls survive the bollworm. What did Bt cotton change inside the plant?',
        options: ['The plant now produces a Cry toxin from Bacillus thuringiensis that kills larvae that eat it', 'The plant was coated permanently with a pesticide that never washes off', 'The cotton\'s taste changed so insects simply avoid it', 'The plant attracts predator insects that eat all the bollworms'],
        answer: 'The plant now produces a Cry toxin from Bacillus thuringiensis that kills larvae that eat it',
        hook: 'Bt cotton isn\'t sprayed — it\'s armed. The insecticide moved inside the plant\'s own cells, which is why the protection can\'t wash off and why only pests that bite the plant are harmed.',
    },
    teaching: [
        { title: 'Genetically Modified Crops: Bt Cotton', text: 'Bt cotton is a genetically modified crop created by introducing cry genes from the bacterium *Bacillus thuringiensis* into the cotton genome, enabling the plant to produce insecticidal Cry proteins.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_12_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Engineer pest resistance two ways: trace how the Cry toxin protects Bt cotton, then design an RNAi crop that silences an essential gene inside any nematode that feeds on it.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_12_001', title: 'Genetically Modified Crops: Bt Cotton',
          scaffold: { problem: 'A cotton farmer in Telangana observes that despite planting Bt cotton (Bollgard II), 15% of bolls show pink bollworm (*Pectinophora.',
            steps: [
            { text: 'Identify that pink bollworm is controlled by Cry2Ab (cryIIAb) in Bollgard II, but resistance can evolve if selection.' },
            { text: 'Recall that without refuge, resistant homozygous (rr) and heterozygous (Rr) larvae survive on Bt cotton, while.' },
            { text: 'Use the single-locus selection model: q₁ = q₀ / (1 - s·q₀) for recessive resistance (simplified).' },
            { text: 'Iterate for 3 generations: q₂ ≈ 0.0010016, q₃ ≈ 0.0010024. The frequency increases slowly initially because q is very.' },
            { text: 'Conclude that while 3 generations show minimal change, the lack of refuge allows steady accumulation; after ~20.', faded: true, blankAnswer: 'Resistance evolution due to absent refuge; q increases from.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_002', title: 'Pest-Resistant Plants: RNA Interference',
          caseStudy: { intro: 'Observe a tobacco field where root-knot nematodes (*Meloidogyne incognita*) form galls on roots, stunting growth — a farmer\'s nightmare.',
            decisions: [{ prompt: 'State the two key enzymatic components of the RNAi pathway and their sequential roles in converting long dsRNA into a functional silencing.', options: [
                { text: 'Correct answer: Dicer (an RNase III endonuclease) cleaves long dsRNA into 21–23', outcome: 'Correct answer: Dicer (an RNase III endonuclease) cleaves long dsRNA into 21–23 nucleotide siRNA.' },
                { text: 'the plant makes siRNA directly', outcome: 'Not quite — Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested.', reveals: 'the-plant-makes-sirna-directly' },
                { text: 'siRNA is the molecule ingested by the pest', outcome: 'Not quite — Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested.', reveals: 'the-plant-makes-sirna-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_003', title: 'Gene Therapy: SCID Treatment',
          caseStudy: { intro: 'Imagine a newborn who catches every passing cold, develops chronic diarrhea, and fails to thrive — doctors diagnose ADA-SCID, a "bubble baby" disease where.',
            decisions: [{ prompt: 'Name the enzyme deficient in the most common form of SCID treated by gene therapy in India, and state the type of viral vector currently.', options: [
                { text: 'Adenosine deaminase (ADA)', outcome: 'Adenosine deaminase (ADA); self-inactivating (SIN) lentiviral vector.' },
                { text: 'purine nucleoside phosphorylase', outcome: 'Not quite — Students think gene therapy "cures SCID in one injection" like a vaccine.', reveals: 'gene-therapy-cures-scid-in' },
                { text: 'retroviral vector without SIN modification', outcome: 'Not quite — Students think gene therapy "cures SCID in one injection" like a vaccine.', reveals: 'gene-therapy-cures-scid-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_004', title: 'Insulin Production Using Recombinant DNA Technology',
          caseStudy: { intro: 'Imagine a diabetic patient in 1980 injecting porcine insulin — it works but sometimes triggers allergic reactions because pig insulin differs by one amino.',
            decisions: [{ prompt: 'What are the two polypeptide chains of mature human insulin and how many amino acids does each chain contain?', options: [
                { text: 'Mature human insulin consists of an A chain of 21 amino acids and a B chain of 30 amino', outcome: 'Mature human insulin consists of an A chain of 21 amino acids and a B chain of 30 amino acids.' },
                { text: 'A chain 30, B chain 21', outcome: 'Not quite — Students often believe that recombinant human insulin is produced by inserting the *entire human.', reveals: 'recombinant-human-insulin-is-produced' },
                { text: 'both 51 amino acids', outcome: 'Not quite — Students often believe that recombinant human insulin is produced by inserting the *entire human.', reveals: 'recombinant-human-insulin-is-produced' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_12_005', title: 'Molecular Diagnosis: ELISA and PCR',
          scaffold: { problem: 'A diagnostic lab receives 50 serum samples for HIV screening. They use indirect ELISA (anti-human IgG-HRP conjugate).',
            steps: [
            { text: 'Calculate cut-off value. Mean negative OD = (0.08+0.09+0.07+0.10+0.06)/5 = 0.08. Cut-off = 0.08 + 0.15 = 0.23.' },
            { text: 'Compare sample ODs to cut-off. Sample A (0.15) < 0.23 → Negative. Sample B (1.85) > 0.23 → Positive.' },
            { text: 'Recall indirect ELISA principle. Patient antibodies (if HIV+) bind HIV antigens coated on well → anti-human IgG-HRP.' },
            { text: 'Interpret biologically. Sample A: No detectable anti-HIV antibodies (either uninfected or in window period).' },
            { text: 'Verify logic. High OD = more antibody-enzyme complexes = more substrate conversion = stronger signal. Consistent.', faded: true, blankAnswer: 'Sample A = HIV negative (OD 0.15 < cut-off 0.23). Sample.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_006', title: 'Transgenic Animals: Uses and Applications',
          caseStudy: { intro: 'Imagine a diabetic patient who needs insulin — earlier we learned human insulin is made in bacteria (c12_bio_cbse_12_004).',
            decisions: [{ prompt: 'Define a transgenic animal and give one specific example from the NCERT textbook with the product it produces.', options: [
                { text: 'A transgenic animal carries a stably integrated foreign gene (transgene) in its genome', outcome: 'A transgenic animal carries a stably integrated foreign gene (transgene) in its genome that.' },
                { text: 'the foreign protein is simply injected into the animal', outcome: 'Not quite — **Exact error:** *"Transgenic animals are made by injecting the desired human protein into the.', reveals: 'exact-error-transgenic-animals-are' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology and Its Applications · Part 1/2', spots: [
            { id: 's1', label: 'Genetically Modified Crops Bt Cotton', prompt: 'Which idea is this? — Bt cotton is a genetically modified crop created by introducing cry genes from the.', answer: 'Genetically Modified Crops Bt Cotton', options: ['Genetically Modified Crops Bt Cotton', 'Pest-Resistant Plants RNA Interference', 'Gene Therapy SCID Treatment', 'Insulin Production Using Recombinant DNA Technology'] },
            { id: 's2', label: 'Pest-Resistant Plants RNA Interference', prompt: 'Which idea is this? — RNA interference (RNAi) is a conserved eukaryotic gene-silencing mechanism where.', answer: 'Pest-Resistant Plants RNA Interference', options: ['Pest-Resistant Plants RNA Interference', 'Genetically Modified Crops Bt Cotton', 'Gene Therapy SCID Treatment', 'Insulin Production Using Recombinant DNA Technology'] },
            { id: 's3', label: 'Gene Therapy SCID Treatment', prompt: 'Which idea is this? — Gene therapy for SCID (Severe Combined Immunodeficiency) is a medical intervention that.', answer: 'Gene Therapy SCID Treatment', options: ['Gene Therapy SCID Treatment', 'Genetically Modified Crops Bt Cotton', 'Pest-Resistant Plants RNA Interference', 'Insulin Production Using Recombinant DNA Technology'] },
            { id: 's4', label: 'Insulin Production Using Recombinant DNA Technology', prompt: 'Which idea is this? — Insulin production using recombinant DNA technology is the biotechnological process.', answer: 'Insulin Production Using Recombinant DNA Technology', options: ['Insulin Production Using Recombinant DNA Technology', 'Genetically Modified Crops Bt Cotton', 'Pest-Resistant Plants RNA Interference', 'Gene Therapy SCID Treatment'] },
            { id: 's5', label: 'Molecular Diagnosis ELISA and PCR', prompt: 'Which idea is this? — Molecular diagnosis refers to the use of molecular biology techniques — specifically.', answer: 'Molecular Diagnosis ELISA and PCR', options: ['Molecular Diagnosis ELISA and PCR', 'Genetically Modified Crops Bt Cotton', 'Pest-Resistant Plants RNA Interference', 'Gene Therapy SCID Treatment'] },
            { id: 's6', label: 'Transgenic Animals Uses and Applications', prompt: 'Which idea is this? — Transgenic animals are organisms whose genome has been deliberately modified by the.', answer: 'Transgenic Animals Uses and Applications', options: ['Transgenic Animals Uses and Applications', 'Genetically Modified Crops Bt Cotton', 'Pest-Resistant Plants RNA Interference', 'Gene Therapy SCID Treatment'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_001', title: 'A real-world call',
          caseStudy: { intro: 'A genetically modified mosquito could collapse a malaria-carrying population. Release it and a disease that kills children could shrink. Release it and you can\'t call it back.',
            decisions: [{ prompt: 'Is irreversible prevention better than preventable deaths?', options: [
                { text: 'Release it — children are dying now', outcome: 'The urgent-compassion answer; the risk is ecological effects that only appear years after the decision.' },
                { text: 'Wait — \'can\'t be recalled\' demands certainty', outcome: 'The precautionary answer; each year of waiting is a year of deaths that certainty didn\'t prevent.' },
                { text: 'Release it in stages — contained first, wild only after data', outcome: 'The staged answer — slower, but \'irreversible\' isn\'t a reason to skip the reversible steps.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer switching to Bt cotton hears two rumours at the mandi: \'the plant\'s own poison kills every insect including the bees\' and \'once you plant Bt you never spray again\'. He asks the agri-science student what\'s actually true.',
            decisions: [{ prompt: 'How does Bt toxin really behave?', options: [
                { text: 'It\'s narrowly specific: the Cry protoxin activates only in the alkaline gut of lepidopteran larvae and binds receptors bees and humans lack — but sucking pests like aphids and whitefly escape, so spraying for them continues.', outcome: 'Bt cotton cuts bollworm sprays drastically without harming pollinators — yet it\'s not broad-spectrum, so integrated pest management still applies.' },
                { text: 'First rumour is right — a plant that makes insecticide poisons every insect that touches it, including bees and ladybirds.', outcome: 'Bees lack the alkaline midgut and cadherin receptors the protoxin needs; field studies show pollinator and predator populations unharmed.', reveals: 'bt-kills-all-insects' },
                { text: 'Second rumour is right — the plant produces its own insecticide, so all pesticide use ends.', outcome: 'Cry proteins hit only caterpillars; aphids, jassids and whiteflies still attack the crop and must be managed separately.', reveals: 'bt-is-broad-spectrum' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ve now engineered immunity into a plant — conceptually at least. Bt cotton and RNAi are board favourites and the flagship proof that biotechnology can feed and protect crops.',
            decisions: [{ prompt: 'What comes next? Biotechnology and Its Applications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biotechnology and Its Applications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_001', difficulty: 'standard',
          question: 'Bt cotton is a genetically modified crop created by introducing cry genes from.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and c11_biotech_cbse_07_001.',
          misconception: 'Students often believe that Bt cotton kills *all* insects visiting the field, including beneficial pollinators like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bt cotton is a genetically modified crop created by introducing cry genes from the',
                  options: ['Bt cotton is a genetically modified crop created by introducing cry genes from the', 'RNA interference (RNAi) is a conserved eukaryotic gene-silencing mechanism where', 'Gene therapy for SCID (Severe Combined Immunodeficiency) is a medical intervention that', 'Insulin production using recombinant DNA technology is the biotechnological process of'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and c11_biotech_cbse_07_001 (Central.',
                  misconception: 'Students often believe that Bt cotton kills *all* insects visiting the field, including beneficial pollinators like bees and natural.' }
          ],
            remediations: { 'bt-cotton-kills-all-insects': { steps: ['If the student holds this misconception, have them: (1) Revisit c11_bio_cbse_02_002 (Kingdom Monera) to recall.', '(2) Review c11_biotech_cbse_09_005 (Enzyme mechanism) to understand protease activation is pH-dependent.', '(3) Perform a simple bioassay: place 10 bollworm larvae and 10 ladybird beetles on Bt cotton leaves and non-Bt cotton.', 'The beetles will survive on both, demonstrating specificity.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_002', difficulty: 'standard',
          question: 'RNA interference (RNAi) is a conserved eukaryotic gene-silencing mechanism.',
          hint: 'If stuck on vector design, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology.',
          misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest.".',
          parts: [
                { id: 'a', prompt: 'State the two key enzymatic components of the RNAi pathway and their sequential roles in converting long dsRNA into a functional silencing complex.', answer: 'Correct answer: Dicer (an RNase III endonuclease) cleaves long dsRNA into 21–23',
                  options: ['Correct answer: Dicer (an RNase III endonuclease) cleaves long dsRNA into 21–23', 'the plant makes siRNA directly', 'siRNA is the molecule ingested by the pest', 'siRNA directly binds mRNA without RISC maturation'],
                  hint: 'If stuck on vector design, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
                  misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest." In reality, the plant.' },
                { id: 'b', prompt: 'Compare and contrast the molecular mode of action of Bt toxin (Cry protein) and RNAi-based pest resistance.', answer: 'Correct answer: (a) Bt: Cry protoxin protein',
                  options: ['Correct answer: (a) Bt: Cry protoxin protein', 'both make pores in gut', 'the plant makes siRNA directly', 'siRNA is the molecule ingested by the pest'],
                  hint: 'If stuck on vector design, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
                  misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest." In reality, the plant.' }
          ],
            remediations: { 'the-plant-makes-sirna-directly': { steps: ['Re-watch the RNAi pathway animation (Class 11 node c11_biotech_cbse_07_010) focusing on Dicer → siRNA → RISC loading →.', 'Draw the pathway from memory, labeling each enzyme and RNA species.', 'Re-read the NCERT box on "RNAi in tobacco against *Meloidogyne incognita*" and trace: transgene design (sense-antisense.', 'Take the re-diagnostic: "Explain why the plant does not silence its own *unc-87* ortholog" — if you cannot answer.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest.".',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "RNAi-based pest resistance is superior to Bt because pests cannot evolve resistance to RNAi since it targets essential genes that cannot.', answer: 'Correct answer: The claim is FALSE',
                  options: ['Correct answer: The claim is FALSE', 'the plant makes siRNA directly', 'siRNA is the molecule ingested by the pest'],
                  hint: 'If stuck on vector design, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
                  misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest." In reality, the plant.' },
                { id: 'b', prompt: 'Design a laboratory experiment to test whether dsRNA expressed in transgenic tomato roots moves systemically to silence a reporter gene in feeding whiteflies.', answer: 'Expected answer: 1',
                  options: ['Expected answer: 1', 'the plant makes siRNA directly', 'siRNA is the molecule ingested by the pest'],
                  hint: 'If stuck on vector design, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
                  misconception: 'Students believe that "the plant makes siRNA directly" and that "siRNA is the molecule ingested by the pest." In reality, the plant.' }
          ],
            remediations: { 'the-plant-makes-sirna-directly': { steps: ['Re-watch the RNAi pathway animation (Class 11 node c11_biotech_cbse_07_010) focusing on Dicer → siRNA → RISC loading →.', 'Draw the pathway from memory, labeling each enzyme and RNA species.', 'Re-read the NCERT box on "RNAi in tobacco against *Meloidogyne incognita*" and trace: transgene design (sense-antisense.', 'Take the re-diagnostic: "Explain why the plant does not silence its own *unc-87* ortholog" — if you cannot answer.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_003', difficulty: 'standard',
          question: 'Gene therapy for SCID (Severe Combined Immunodeficiency) is a medical.',
          hint: 'If vector design is unclear, re-watch c11_biotech_cbse_12_008 animation of lentiviral.',
          misconception: 'Students think gene therapy "cures SCID in one injection" like a vaccine.',
          parts: [
                { id: 'a', prompt: 'Name the enzyme deficient in the most common form of SCID treated by gene therapy in India, and state the type of viral vector currently preferred for its.', answer: 'Adenosine deaminase (ADA)',
                  options: ['Adenosine deaminase (ADA)', 'purine nucleoside phosphorylase', 'retroviral vector without SIN modification', 'cures SCID in one injection'],
                  hint: 'If vector design is unclear, re-watch c11_biotech_cbse_12_008 animation of lentiviral integration.',
                  misconception: 'Students think gene therapy "cures SCID in one injection" like a vaccine.' },
                { id: 'b', prompt: 'Why are hematopoietic stem cells (CD34+), not mature T lymphocytes, the preferred target for ex vivo gene therapy in SCID?', answer: 'HSCs self-renew and differentiate into all lymphoid lineages, providing lifelong',
                  options: ['HSCs self-renew and differentiate into all lymphoid lineages, providing lifelong', 'T cells are easier to transduce', 'cures SCID in one injection', 'gene therapy "cures SCID in one injection" like a vaccine'],
                  hint: 'If vector design is unclear, re-watch c11_biotech_cbse_12_008 animation of lentiviral integration.',
                  misconception: 'Students think gene therapy "cures SCID in one injection" like a vaccine.' },
                { id: 'c', prompt: 'Compare the long-term immune reconstitution achieved by (i) PEG-ADA enzyme replacement, (ii) matched-sibling HSCT, and (iii) autologous HSC gene therapy for.', answer: 'Gene therapy ≈ HSCT > PEG-ADA',
                  options: ['Gene therapy ≈ HSCT > PEG-ADA', 'cures SCID in one injection', 'gene therapy "cures SCID in one injection" like a vaccine'],
                  hint: 'If vector design is unclear, re-watch c11_biotech_cbse_12_008 animation of lentiviral integration.',
                  misconception: 'Students think gene therapy "cures SCID in one injection" like a vaccine.' }
          ],
            remediations: { 'gene-therapy-cures-scid-in': { steps: ['Revisit c11_biotech_cbse_12_008 (viral vectors) and c11_bio_cbse_10_001 (cell cycle) to understand why dividing HSCs.', 'Draw the ex vivo protocol flowchart: apheresis → CD34+ selection → transduction → culture → QC → infusion → engraftment.', 'Redo Diagnostic Questions 2 and 5 until you can explain why AAV fails in HSCs and why conditioning is needed.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_004', difficulty: 'standard',
          question: 'Insulin production using recombinant DNA technology is the biotechnological.',
          hint: 'If stuck, revisit c11_biotech_cbse_07_005 (introns/exons), c11_biotech_cbse_07_009.',
          misconception: 'Students often believe that recombinant human insulin is produced by inserting the *entire human insulin gene.',
          parts: [
                { id: 'a', prompt: 'Why is human insulin not expressed as a single proinsulin polypeptide in the cytoplasm of *E. coli* in the classic two-chain production method?', answer: 'The cytoplasm of *E',
                  options: ['The cytoplasm of *E', 'because proinsulin is too large', 'because bacteria cannot translate human codons', 'reads the gene and makes insulin exactly like human cells do'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_005 (introns/exons), c11_biotech_cbse_07_009.',
                  misconception: 'Students often believe that recombinant human insulin is produced by inserting the *entire human insulin gene (including introns)* into.' },
                { id: 'b', prompt: 'Compare the yield and immunogenicity of recombinant human insulin produced in *E. coli* versus porcine insulin extracted from pig pancreas.', answer: 'Recombinant human insulin is superior on both parameters: (1) Yield',
                  options: ['Recombinant human insulin is superior on both parameters: (1) Yield', 'natural', 'reads the gene and makes insulin exactly like human cells do'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_005 (introns/exons), c11_biotech_cbse_07_009.',
                  misconception: 'Students often believe that recombinant human insulin is produced by inserting the *entire human insulin gene (including introns)* into.' }
          ],
            remediations: { 'recombinant-human-insulin-is-produced': { steps: ['If the student holds the above misconception: Step 1 — Revisit c11_biotech_cbse_07_005 (RNA Splicing: Introns and.', 'Step 2 — Review c11_biotech_cbse_03_003 (Levels of Protein Structure) and c11_biotech_cbse_07_009 (Post-Translational.', 'Step 3 — Re-read the NCERT box "Production of Human Insulin" (Ch 12) and draw a flowchart contrasting the eukaryotic.', 'the bacterial two-chain cytoplasmic strategy.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_005', difficulty: 'standard',
          question: 'Molecular diagnosis refers to the use of molecular biology techniques.',
          hint: 'If stuck on ELISA: revisit antibody structure (c11_bio_cbse_09_002) and Western blot.',
          misconception: 'Students think **ELISA and PCR are interchangeable** for pathogen detection — e.g., "use PCR for everything because.',
          parts: [
                { id: 'a', prompt: 'Why can conventional PCR not directly detect SARS-CoV-2 (an RNA virus) from a nasopharyngeal swab without an additional step?', answer: 'Conventional PCR uses DNA-dependent DNA polymerase (Taq)',
                  options: ['Conventional PCR uses DNA-dependent DNA polymerase (Taq)', 'Taq polymerase can use RNA', 'use PCR for everything', '**ELISA and PCR are interchangeable** for pathogen detection'],
                  hint: 'If stuck on ELISA: revisit antibody structure (c11_bio_cbse_09_002) and Western blot principle.',
                  misconception: 'Students think **ELISA and PCR are interchangeable** for pathogen detection — e.g., "use PCR for everything because it\'s more sensitive.".' }
          ],
            remediations: { 'elisa-and-pcr-are-interchangeable': { steps: ['Revisit **c11_biotech_cbse_12_005 (PCR principle)** — re-derive the 3-step cycle with temperatures and enzyme role.', 'Revisit **c11_bio_cbse_09_002 (Protein structure)** — draw antibody Y-shape, label Fab/Fc, explain antigen binding.', 'Do a **table comparison**: rows = ELISA vs PCR; columns = Target, Principle, Quantification, Window period utility.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3 — they test the exact misconception.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_12_006', difficulty: 'standard',
          question: 'Transgenic animals are organisms whose genome has been deliberately modified.',
          hint: 'Re‑read c12_bio_cbse_12_004 (bacterial insulin) and c11_biotech_cbse_07_009.',
          misconception: '**Exact error:** *"Transgenic animals are made by injecting the desired human protein into the animal\'s blood/eggs,.',
          parts: [
                { id: 'a', prompt: 'Why are transgenic mammals (e.g., goats, cows) preferred over *E. coli* for producing therapeutic human proteins like Factor VIII or erythropoietin (EPO)?', answer: 'Mammalian cells perform essential **post‑translational modifications**',
                  options: ['Mammalian cells perform essential **post‑translational modifications**', 'it is only about yield or cost, or claims bacteria *can* glycosylate proteins'],
                  hint: 'Re‑read c12_bio_cbse_12_004 (bacterial insulin) and c11_biotech_cbse_07_009 (glycosylation.',
                  misconception: '**Exact error:** *"Transgenic animals are made by injecting the desired human protein into the animal\'s blood/eggs, so the animal starts.' }
          ],
            remediations: { 'exact-error-transgenic-animals-are': { steps: ['Revisit **c11_biotech_cbse_07_007** (Translation) and **c11_biotech_cbse_07_009** (Post‑Translational Modifications).', 'Draw a flowchart: **Gene (DNA) → mRNA → Protein (with PTMs)**.', 'Highlight that only DNA integrates into chromosomes.', 'Watch a 5‑min animation of **pronuclear microinjection** (DNA into male pronucleus) vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
