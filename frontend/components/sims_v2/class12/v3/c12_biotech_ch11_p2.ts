import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch11_p2: SimDef = {
    id: 'v3_c12_biotech_ch11_p2',
    title: 'Biotechnology in Agriculture · Part 2/2',
    subtitle: 'A bacterium that engineers plants for a living — we just hired it.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology in Agriculture · Part 2/2',
    chapters: ['c12_biotech_ch11'],
    nodeIds: ['c12_biotech_cbse_11_007', 'c12_biotech_cbse_11_008', 'c12_biotech_cbse_11_009', 'c12_biotech_cbse_11_010', 'c12_biotech_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant transformation specialist', intro: 'Plant cells wear walls that reject DNA — getting a gene inside takes either a natural courier or a gun.', goal: 'Compare Agrobacterium-mediated transformation with biolistic gene delivery.' },
    discovery: {
        question: 'A tumour-like growth on a rose stem turns out to be nature\'s own genetic engineering — a bacterium inserted its DNA into the plant. Which bacterium, and what did it transfer?',
        options: ['Agrobacterium tumefaciens — it transfers T-DNA from its Ti plasmid into the plant genome', 'E. coli — it injects plasmid DNA through its cell wall', 'Rhizobium — it swaps nitrogen-fixation genes with the host', 'A virus — it coats plant cells in foreign protein'],
        answer: 'Agrobacterium tumefaciens — it transfers T-DNA from its Ti plasmid into the plant genome',
        hook: 'Crown gall disease is proof that cross-kingdom gene transfer happens in nature — biotechnology didn\'t invent gene transfer, it domesticated a bacterium that had perfected it millions of years earlier.',
    },
    teaching: [
        { title: 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', text: 'Coat protein-mediated resistance is a pathogen-derived resistance strategy where the gene encoding the viral coat protein (CP) is introduced into a plant genome; the expressed coat protein interferes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_11_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Get a drought-tolerance gene into wheat: choose between Agrobacterium\'s natural T-DNA delivery and the gene gun\'s physical bombardment — matching the method to the plant\'s cell wall and genome.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_007', title: 'Virus-Resistant Crops via Coat Protein-Mediated Resistance',
          caseStudy: { intro: 'Imagine a farmer loses 80% of his papaya crop to Papaya ringspot virus (PRSV) — spraying insecticides doesn\'t help because aphids transmit the virus.',
            decisions: [{ prompt: 'What is the source of the coat protein gene used in coat protein-mediated resistance, and where is it expressed?', options: [
                { text: 'The coat protein gene is isolated from the target virus (e.g., TMV, PRSV) and expressed', outcome: 'The coat protein gene is isolated from the target virus (e.g., TMV, PRSV) and expressed in the.' },
                { text: 'from the plant\'s own genome', outcome: 'Not quite — Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune.', reveals: 'the-plant-recognizes-the-viral' },
                { text: 'expressed in chloroplasts', outcome: 'Not quite — Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune.', reveals: 'the-plant-recognizes-the-viral' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_008', title: 'Abiotic Stress-Tolerant Transgenic Crops',
          caseStudy: { intro: 'Imagine a farmer in Rajasthan watching his wheat crop wither under 45°C heat and saline groundwater — conventional irrigation fails, and yields crash.',
            decisions: [{ prompt: 'Name two abiotic stresses and one transgenic gene used to confer tolerance for each stress.', options: [
                { text: 'Correct answer: Drought', outcome: 'Correct answer: Drought — DREB1A (transcription factor activating dehydration-responsive genes).' },
                { text: 'Bt gene for drought', outcome: 'Not quite — Students often think "abiotic stress tolerance = just add one gene like Bt toxin." They write.', reveals: 'abiotic-stress-tolerance-just-add' },
                { text: 'abiotic stress tolerance = just add one gene like Bt toxin', outcome: 'Not quite — Students often think "abiotic stress tolerance = just add one gene like Bt toxin." They write.', reveals: 'abiotic-stress-tolerance-just-add' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_009', title: 'Biofertilizers: Rhizobium, Azotobacter, and Mycorrhiza',
          caseStudy: { intro: 'Imagine a farmer in Punjab who grows wheat after harvesting rice — he notices declining yields despite adding urea.',
            decisions: [{ prompt: 'Name the three biofertilizers discussed in this node and state one key difference in their nitrogen-fixing ability.', options: [
                { text: 'The three biofertilizers are Rhizobium, Azotobacter, and Mycorrhiza', outcome: 'The three biofertilizers are Rhizobium, Azotobacter, and Mycorrhiza.' },
                { text: 'Mycorrhiza fixes nitrogen', outcome: 'Not quite — Students often write "Rhizobium fixes nitrogen in the soil for all plants" — they treat Rhizobium.', reveals: 'students-often-write-rhizobium-fixes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_010', title: 'Biopesticides: Bacillus thuringiensis and Trichoderma',
          caseStudy: { intro: 'Imagine a cotton farmer in Maharashtra who sprays synthetic pyrethroids every week, yet bollworms keep returning and beneficial insects disappear.',
            decisions: [{ prompt: 'What is the primary form in which *Bacillus thuringiensis* delivers its insecticidal toxin, and where in the insect body does this form.', options: [
                { text: 'The toxin is produced as an inactive crystalline (Cry) protein (δ‑endotoxin) during', outcome: 'The toxin is produced as an inactive crystalline (Cry) protein (δ‑endotoxin) during sporulation.' },
                { text: 'toxin is secreted into soil', outcome: 'Not quite — Students often think that *Bacillus thuringiensis* kills insects on contact like a chemical.', reveals: 'bacillus-thuringiensis-kills-insects-on' },
                { text: 'activation occurs in the insect haemolymph', outcome: 'Not quite — Students often think that *Bacillus thuringiensis* kills insects on contact like a chemical.', reveals: 'bacillus-thuringiensis-kills-insects-on' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_011', title: 'Flavr Savr Tomato: Antisense RNA Technology',
          caseStudy: { intro: 'Imagine you buy tomatoes that stay firm for weeks instead of turning mushy in days — how could scientists "switch off" the softening process?',
            decisions: [{ prompt: 'What is the specific target gene suppressed in Flavr Savr tomato, and what is the normal function of its protein product in fruit ripening?', options: [
                { text: 'The target gene is polygalacturonase (PG)', outcome: 'The target gene is polygalacturonase (PG), which encodes an enzyme that hydrolyzes α-1,4-glycosidic.' },
                { text: 'pectinase', outcome: 'Not quite — Students often think antisense RNA "edits" or "mutates" the target gene\'s DNA sequence.', reveals: 'antisense-rna-edits-or-mutates' },
                { text: 'cellulase', outcome: 'Not quite — Students often think antisense RNA "edits" or "mutates" the target gene\'s DNA sequence.', reveals: 'antisense-rna-edits-or-mutates' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology in Agriculture · Part 2/2', spots: [
            { id: 's1', label: 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', prompt: 'Which idea is this? — Coat protein-mediated resistance is a pathogen-derived resistance strategy where the gene.', answer: 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', options: ['Virus-Resistant Crops via Coat Protein-Mediated Resistance', 'Abiotic Stress-Tolerant Transgenic Crops', 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza', 'Biopesticides Bacillus thuringiensis and Trichoderma'] },
            { id: 's2', label: 'Abiotic Stress-Tolerant Transgenic Crops', prompt: 'Which idea is this? — Abiotic stress-tolerant transgenic crops are genetically engineered plants that express.', answer: 'Abiotic Stress-Tolerant Transgenic Crops', options: ['Abiotic Stress-Tolerant Transgenic Crops', 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza', 'Biopesticides Bacillus thuringiensis and Trichoderma'] },
            { id: 's3', label: 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza', prompt: 'Which idea is this? — Biofertilizers are microorganisms that enhance soil fertility by fixing atmospheric.', answer: 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza', options: ['Biofertilizers Rhizobium Azotobacter and Mycorrhiza', 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', 'Abiotic Stress-Tolerant Transgenic Crops', 'Biopesticides Bacillus thuringiensis and Trichoderma'] },
            { id: 's4', label: 'Biopesticides Bacillus thuringiensis and Trichoderma', prompt: 'Which idea is this? — Biopesticides are microorganisms or their products used to control agricultural pests.', answer: 'Biopesticides Bacillus thuringiensis and Trichoderma', options: ['Biopesticides Bacillus thuringiensis and Trichoderma', 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', 'Abiotic Stress-Tolerant Transgenic Crops', 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza'] },
            { id: 's5', label: 'Flavr Savr Tomato Antisense RNA Technology', prompt: 'Which idea is this? — Flavr Savr tomato is the first commercially approved genetically modified food crop.', answer: 'Flavr Savr Tomato Antisense RNA Technology', options: ['Flavr Savr Tomato Antisense RNA Technology', 'Virus-Resistant Crops via Coat Protein-Mediated Resistance', 'Abiotic Stress-Tolerant Transgenic Crops', 'Biofertilizers Rhizobium Azotobacter and Mycorrhiza'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_007', title: 'A real-world call',
          caseStudy: { intro: 'Agricultural biotechnology can grow more food on less land with less water — and concentrates seed ownership in a few companies who control what farmers plant.',
            decisions: [{ prompt: 'Is feeding more people worth concentrating control of food?', options: [
                { text: 'Yes — hunger is the emergency, ownership is secondary', outcome: 'The food-security answer; true until the concentrated ownership itself creates the next emergency.' },
                { text: 'No — who controls seeds controls everything after', outcome: 'The sovereignty answer; refusing the technology has costs too — yields that don\'t rise as populations do.' },
                { text: 'Yes with public seeds — the tech in public hands', outcome: 'The structural answer — public-sector breeding keeps the yield without the lock; requires funding public research adequately.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At an agri-biotech internship, the team must put a drought-tolerance gene into wheat. A colleague insists on Agrobacterium-mediated transformation because \'it always gives clean, single-copy inserts\' — but weeks of co-cultivation keep failing.',
            decisions: [{ prompt: 'How should they deliver the gene?', options: [
                { text: 'Switch to biolistics — wheat is a monocot that poorly induces Agrobacterium\'s vir genes, so the gene gun\'s physical DNA delivery bypasses the host-range barrier, accepting messier, multi-copy inserts as the trade-off.', outcome: 'Agrobacterium\'s clean T-DNA transfer is preferred for dicots; monocots\' weak wound response makes particle bombardment the practical route.' },
                { text: 'Persist with Agrobacterium — it always produces single-copy inserts and single copy is what regulators demand.', outcome: 'The biological block isn\'t about insert quality — monocots barely trigger vir induction, so T-DNA transfer barely happens; biolistics exists precisely for this.', reveals: 'agrobacterium-always-works' },
                { text: 'Agrobacterium injects its whole Ti plasmid into the plant, so moving the gene to a different spot on the plasmid will fix it.', outcome: 'Only the T-DNA segment between the border repeats is transferred; the vir genes and backbone stay in the bacterium — repositioning outside the borders won\'t help.', reveals: 'whole-ti-plasmid-transfers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You now know the two roads into a plant genome — biological courier and particle gun. Gene transfer methods are standard board fare and the first real choice in any crop-engineering project.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_007', difficulty: 'standard',
          question: 'Coat protein-mediated resistance is a pathogen-derived resistance strategy.',
          hint: 'If stuck, review c11_biotech_cbse_07_001 (Central Dogma) and c11_bio_cbse_02_009 (Virus.',
          misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like.',
          parts: [
                { id: 'a', prompt: 'A transgenic tomato plant expresses the coat protein of Tobacco mosaic virus (TMV). It is challenged with TMV and with Cucumber mosaic virus (CMV).', answer: 'The plant will show strong resistance to TMV (homologous virus)',
                  options: ['The plant will show strong resistance to TMV (homologous virus)', 'recognizes'],
                  hint: 'If stuck, review c11_biotech_cbse_07_001 (Central Dogma) and c11_bio_cbse_02_009 (Virus structure).',
                  misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like antibodies).' },
                { id: 'b', prompt: 'Compare coat protein-mediated resistance with RNAi-mediated virus resistance in terms of (a) the molecule that confers resistance, (b) the stage of viral life.', answer: 'the molecule that confers resistance, (',
                  options: ['the molecule that confers resistance, (', 'recognizes'],
                  hint: 'If stuck, review c11_biotech_cbse_07_001 (Central Dogma) and c11_bio_cbse_02_009 (Virus structure).',
                  misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like antibodies).' }
          ],
            remediations: { 'the-plant-recognizes-the-viral': { steps: ['Revisit c11_biotech_cbse_07_001 (Central Dogma) to recall that a nuclear transgene is transcribed to mRNA and.', 'Revisit c11_bio_cbse_02_009 (Viruses and Viroids) to review viral structure: RNA genome + coat protein = nucleocapsid.', 'Draw a stepwise cartoon: virus enters cell → uncoating releases RNA → transgenic CP binds RNA → RNA cannot.', 'Re-attempt Diagnostic Question 2 with this cartoon.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Coat protein-mediated resistance is a form of genetic vaccination because the plant produces antibodies against the virus."', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'recognizes'],
                  hint: 'If stuck, review c11_biotech_cbse_07_001 (Central Dogma) and c11_bio_cbse_02_009 (Virus structure).',
                  misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like antibodies).' },
                { id: 'b', prompt: 'Design a transgenic strategy to confer resistance to a new virus, "Zeta virus", in soybean.', answer: '(i) Zeta virus coat protein gene',
                  options: ['(i) Zeta virus coat protein gene', 'recognizes'],
                  hint: 'If stuck, review c11_biotech_cbse_07_001 (Central Dogma) and c11_bio_cbse_02_009 (Virus structure).',
                  misconception: 'Students often think the plant "recognizes" the viral coat protein as foreign and mounts an immune response (like antibodies).' }
          ],
            remediations: { 'the-plant-recognizes-the-viral': { steps: ['Revisit c11_biotech_cbse_07_001 (Central Dogma) to recall that a nuclear transgene is transcribed to mRNA and.', 'Revisit c11_bio_cbse_02_009 (Viruses and Viroids) to review viral structure: RNA genome + coat protein = nucleocapsid.', 'Draw a stepwise cartoon: virus enters cell → uncoating releases RNA → transgenic CP binds RNA → RNA cannot.', 'Re-attempt Diagnostic Question 2 with this cartoon.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_008', difficulty: 'standard',
          question: 'Abiotic stress-tolerant transgenic crops are genetically engineered plants that.',
          hint: 'Revisit c12_biotech_cbse_11_004 (Bt Cotton) and c11_bio_cbse_13_005 (ABA) to contrast.',
          misconception: 'Students often think "abiotic stress tolerance = just add one gene like Bt toxin." They write: "Introduce *DREB1A* and.',
          parts: [
                { id: 'a', prompt: 'Name two abiotic stresses and one transgenic gene used to confer tolerance for each stress.', answer: 'Correct answer: Drought',
                  options: ['Correct answer: Drought', 'Bt gene for drought', 'abiotic stress tolerance = just add one gene like Bt toxin', 'Introduce *DREB1A* and the crop becomes drought-proof'],
                  hint: 'Revisit c12_biotech_cbse_11_004 (Bt Cotton) and c11_bio_cbse_13_005 (ABA) to contrast.',
                  misconception: 'Students often think "abiotic stress tolerance = just add one gene like Bt toxin." They write: "Introduce *DREB1A* and the crop becomes.' },
                { id: 'b', prompt: 'Explain why over-expressing a single antioxidant enzyme like superoxide dismutase (SOD) alone may not improve oxidative stress tolerance and can sometimes.', answer: 'Correct answer: SOD converts superoxide (O₂⁻) to H₂O₂',
                  options: ['Correct answer: SOD converts superoxide (O₂⁻) to H₂O₂', 'SOD removes all ROS', 'abiotic stress tolerance = just add one gene like Bt toxin', 'Introduce *DREB1A* and the crop becomes drought-proof'],
                  hint: 'Revisit c12_biotech_cbse_11_004 (Bt Cotton) and c11_bio_cbse_13_005 (ABA) to contrast.',
                  misconception: 'Students often think "abiotic stress tolerance = just add one gene like Bt toxin." They write: "Introduce *DREB1A* and the crop becomes.' }
          ],
            remediations: { 'abiotic-stress-tolerance-just-add': { steps: ['If the student conflates abiotic and biotic transgenics: (1) Have them make a two-column table: Biotic Stress (Bt, coat.', 'Abiotic Stress (DREB, NHX, mtlD, SOD) — list gene, target, mechanism for each.', '(2) Assign a 15-minute re-read of c12_biotech_cbse_11_004 (Bt Cotton) and c12_biotech_cbse_11_006 (Herbicide.', 'multi-pathway regulatory networks.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_009', difficulty: 'standard',
          question: 'Biofertilizers are microorganisms that enhance soil fertility by fixing.',
          hint: 'If stuck, review Class 11 Biology Chapter 12 (Mineral Nutrition) section on biological.',
          misconception: 'Students often write "Rhizobium fixes nitrogen in the soil for all plants" — they treat Rhizobium as a general soil.',
          parts: [
                { id: 'a', prompt: 'Name the three biofertilizers discussed in this node and state one key difference in their nitrogen-fixing ability.', answer: 'The three biofertilizers are Rhizobium, Azotobacter, and Mycorrhiza',
                  options: ['The three biofertilizers are Rhizobium, Azotobacter, and Mycorrhiza', 'Mycorrhiza fixes nitrogen'],
                  hint: 'If stuck, review Class 11 Biology Chapter 12 (Mineral Nutrition) section on biological nitrogen.',
                  misconception: 'Students often write "Rhizobium fixes nitrogen in the soil for all plants" — they treat Rhizobium as a general soil fertilizer like urea.' },
                { id: 'b', prompt: 'A farmer applies Rhizobium inoculant to a wheat field. Will it increase soil nitrogen? Explain why or why not.', answer: 'No, Rhizobium will not increase soil nitrogen in wheat',
                  options: ['No, Rhizobium will not increase soil nitrogen in wheat', 'Rhizobium works on all crops'],
                  hint: 'If stuck, review Class 11 Biology Chapter 12 (Mineral Nutrition) section on biological nitrogen.',
                  misconception: 'Students often write "Rhizobium fixes nitrogen in the soil for all plants" — they treat Rhizobium as a general soil fertilizer like urea.' },
                { id: 'c', prompt: 'Compare the survival challenges of Rhizobium vs. Azotobacter when applied to acidic soil (pH 5.0). Which is more tolerant and why?', answer: 'Rhizobium is highly sensitive to low pH; most strains die below pH 6.0',
                  options: ['Rhizobium is highly sensitive to low pH; most strains die below pH 6.0', 'both die equally'],
                  hint: 'If stuck, review Class 11 Biology Chapter 12 (Mineral Nutrition) section on biological nitrogen.',
                  misconception: 'Students often write "Rhizobium fixes nitrogen in the soil for all plants" — they treat Rhizobium as a general soil fertilizer like urea.' }
          ],
            remediations: { 'students-often-write-rhizobium-fixes': { steps: ['Revisit c11_bio_cbse_09_007 (nitrogen cycle) to see where biological nitrogen fixation occurs.', 'Watch a 5-min video of root nodule formation (search "Rhizobium nodulation time-lapse").', 'Make a table: Biofertilizer | Host Range | Nutrient Fixed/Mobilized | Application Method.', 'Re-attempt Diagnostic Question 2 — if still wrong, ask teacher to explain "cross-inoculation groups" of Rhizobium.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_010', difficulty: 'standard',
          question: 'Biopesticides are microorganisms or their products used to control agricultural.',
          hint: 'If stuck, revisit Class 11 nodes c11_bio_cbse_02_002 (bacterial sporulation) and.',
          misconception: 'Students often think that *Bacillus thuringiensis* kills insects on contact like a chemical insecticide.',
          parts: [
                { id: 'a', prompt: 'A student claims: “*Trichoderma* controls plant diseases only by secreting antibiotics that kill the pathogen.” Explain why this statement is incomplete and.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'Bt toxin enters through the cuticle', 'Bt kills on contact', '*Bacillus thuringiensis* kills insects on contact like a chemical insecticide'],
                  hint: 'If stuck, revisit Class 11 nodes c11_bio_cbse_02_002 (bacterial sporulation) and.',
                  misconception: 'Students often think that *Bacillus thuringiensis* kills insects on contact like a chemical insecticide.' },
                { id: 'b', prompt: 'Compare the specificity of *Bacillus thuringiensis* and *Trichoderma* at the taxonomic level.', answer: 'Bt Cry toxins are highly specific',
                  options: ['Bt Cry toxins are highly specific', 'both are broad‑spectrum', 'both are narrow‑spectrum', 'Bt toxin enters through the cuticle'],
                  hint: 'If stuck, revisit Class 11 nodes c11_bio_cbse_02_002 (bacterial sporulation) and.',
                  misconception: 'Students often think that *Bacillus thuringiensis* kills insects on contact like a chemical insecticide.' }
          ],
            remediations: { 'bacillus-thuringiensis-kills-insects-on': { steps: ['Re‑watch the 3‑minute animation of Bt toxin activation (search “Bt toxin mode of action NCERT”).', 'Draw a 4‑panel flowchart: Sporulation → Crystal ingestion → Alkaline solubilisation + trypsin activation → Receptor.', 'Label pH and enzyme at each step.', 'For *Trichoderma*, make a 4‑column table: Mechanism | Key Enzymes/Metabolites | Target Pathogen Stage | Evidence of ISR.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_011', difficulty: 'standard',
          question: 'Flavr Savr tomato is the first commercially approved genetically modified food.',
          hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_03_007 (RNA.',
          misconception: 'Students often think antisense RNA "edits" or "mutates" the target gene\'s DNA sequence.',
          parts: [
                { id: 'a', prompt: 'What is the specific target gene suppressed in Flavr Savr tomato, and what is the normal function of its protein product in fruit ripening?', answer: 'The target gene is polygalacturonase (PG)',
                  options: ['The target gene is polygalacturonase (PG)', 'pectinase', 'cellulase', 'mutates'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_03_007 (RNA structure).',
                  misconception: 'Students often think antisense RNA "edits" or "mutates" the target gene\'s DNA sequence.' }
          ],
            remediations: { 'antisense-rna-edits-or-mutates': { steps: ['If the student believes antisense RNA alters DNA, guide them through a step-by-step comparison: (1) Draw the central.', '(2) Mark where antisense RNA acts (RNA level).', '(3) Contrast with CRISPR (DNA level).', '(4) Use the Flavr Savr example: the PG gene is still present in the genome; only its mRNA is targeted.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
