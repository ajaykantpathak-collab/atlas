import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch07_p1: SimDef = {
    id: 'v3_c12_bio_ch07_p1',
    title: 'Evolution · Part 1/2',
    subtitle: 'A spark in a flask, a farm of finches — two experiments that explain all of life.',
    classLevel: 12, subject: 'biology', topic: 'Evolution · Part 1/2',
    chapters: ['c12_bio_ch07'],
    nodeIds: ['c12_bio_cbse_07_001', 'c12_bio_cbse_07_002', 'c12_bio_cbse_07_003', 'c12_bio_cbse_07_004', 'c12_bio_cbse_07_005', 'c12_bio_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Evolutionary biologist reconstructing origins', intro: 'Where life came from and how it changes are different questions — great scientists keep them separate.', goal: 'Explain the Oparin-Haldane/Miller-Urey chemical evolution model and Darwinian natural selection.' },
    discovery: {
        question: 'Giraffes have long necks — Lamarck said they stretched, Darwin said something else. What?',
        options: ['Long-necked giraffes survived and reproduced more', 'Necks grew longer each generation through use', 'Mutation pushed every giraffe\'s neck longer', 'Trees grew taller so giraffes adapted'],
        answer: 'Long-necked giraffes survived and reproduced more',
        hook: 'Evolution does not try — it selects. That one word changes how you read this entire chapter.',
    },
    teaching: [
        { title: 'Origin of Life: Oparin-Haldane Theory', text: 'The Oparin-Haldane theory proposes that life originated on early Earth through a gradual process of chemical evolution: simple inorganic molecules (CH₄, NH₃, H₂O, H₂, CO₂) combined under energy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_07_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Reconstruct the origin-of-life argument stepwise — reducing atmosphere, energy sources, organic monomers, protocells — then connect it to Darwin\'s natural selection using the antibiotic-resistance plate as your model.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_001', title: 'Origin of Life: Oparin-Haldane Theory',
          caseStudy: { intro: 'Observe a droplet of oil in water — it forms a sphere with a boundary separating inside from outside, yet it has no membrane.',
            decisions: [{ prompt: 'State the composition of Earth\'s primitive atmosphere as proposed by Oparin and Haldane, and explain why the absence of free oxygen was.', options: [
                { text: 'The primitive atmosphere was reducing, containing CH₄ (methane), NH₃ (ammonia), H₂', outcome: 'The primitive atmosphere was reducing, containing CH₄ (methane), NH₃ (ammonia), H₂ (hydrogen), H₂O.' },
                { text: 'atmosphere had O₂', outcome: 'Not quite — Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living.', reveals: 'the-oparin-haldane-theory-says' },
                { text: 'O₂ helped form organics', outcome: 'Not quite — Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living.', reveals: 'the-oparin-haldane-theory-says' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_002', title: 'Theory of Natural Selection: Darwin\'s Postulates',
          caseStudy: { intro: 'Observe a bacterial culture on an agar plate with an antibiotic gradient: most bacteria die near the antibiotic source, but a few colonies survive and.',
            decisions: [{ prompt: 'State the four postulates of Darwin\'s theory of natural selection in the correct logical order.', options: [
                { text: 'Correct order: (1) Overproduction / prodigality of reproduction, (2) Existence of', outcome: 'Correct order: (1) Overproduction / prodigality of reproduction, (2) Existence of variation among.' },
                { text: 'survival of the fittest', outcome: 'Not quite — Students believe "survival of the fittest" means the strongest/biggest individuals survive.', reveals: 'survival-of-the-fittest-means' },
                { text: '"survival of the fittest" means the strongest/biggest individuals survive', outcome: 'Not quite — Students believe "survival of the fittest" means the strongest/biggest individuals survive.', reveals: 'survival-of-the-fittest-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_003', title: 'Evidences for Evolution: Paleontological, Anatomical',
          caseStudy: { intro: 'Start with a real-world observation: when you visit a natural history museum in Delhi or Mumbai, you see fossilized bones of dinosaurs and ancient horses.',
            decisions: [{ prompt: 'A student claims: "The wing of a bird and the wing of a butterfly are homologous organs because both are used for flying." Is this.', options: [
                { text: 'Incorrect', outcome: 'Incorrect. Homologous organs share similar structural plan and embryonic origin but may perform.' },
                { text: 'same function = homology', outcome: 'Not quite — Students believe "homologous organs always look similar" — they expect whale flipper and human arm.', reveals: 'homologous-organs-always-look-similar' },
                { text: 'same origin = homology', outcome: 'Not quite — Students believe "homologous organs always look similar" — they expect whale flipper and human arm.', reveals: 'homologous-organs-always-look-similar' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_004', title: 'Evidences: Biochemical and Molecular',
          scaffold: { problem: 'Researchers sequenced a 300-amino-acid conserved metabolic enzyme from three species: A, B, and C.',
            steps: [
            { text: 'Convert amino acid differences to proportions: p_AB = 12/300 = 0.04, p_AC = 24/300 = 0.08, p_BC = 30/300 = 0.10.' },
            { text: 'Apply Jukes-Cantor correction for multiple hits (simplified): D = -¾ ln(1 - 4p/3). For small p, D ≈ p.' },
            { text: 'The smallest distance is A-B (0.04), so A and B are sister taxa. C is the outgroup.' },
            { text: 'In a rooted tree with molecular clock, distance from root to A = distance from root to B = distance from root to C = T.' },
            { text: 'Conclude tree: ((A,B),C) with A-B divergence at 0.02 units, root at 0.06 units.', faded: true, blankAnswer: 'Tree topology: ((A,B),C). Relative divergence: A and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_005', title: 'Hardy-Weinberg Principle: Equation and Conditions',
          scaffold: { problem: 'In a rural Indian population, 9% of individuals express a recessive genetic disorder (homozygous recessive).',
            steps: [
            { text: 'Identify the known phenotype frequency. Recessive disorder phenotype = homozygous recessive (aa) = q² = 0.09.' },
            { text: 'Solve for recessive allele frequency q. q = √q² = √0.09 = 0.3.' },
            { text: 'Solve for dominant allele frequency p using p + q = 1. p = 1 - q = 1 - 0.3 = 0.7.' },
            { text: 'Calculate heterozygote (carrier) frequency 2pq. 2pq = 2 × 0.7 × 0.3 = 0.42.' },
            { text: 'Interpret: 42% of the population are asymptomatic carriers. Verify: p² = 0.49 (normal non-carriers), 2pq = 0.42.', faded: true, blankAnswer: 'Carrier frequency = 0.42 (42%).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_006', title: 'Microevolution: Change in Allele Frequencies',
          scaffold: { problem: 'In a population of 1,000 beetles, allele B (black) has frequency 0.7, allele b (brown) has frequency 0.3.',
            steps: [
            { text: 'Establish initial genotype frequencies under H-W: BB = p² = 0.49, Bb = 2pq = 0.42, bb = q² = 0.09.' },
            { text: 'Assign fitness values: w_BB = 1.0, w_Bb = 1.0 (assuming complete dominance), w_bb = 0.8 (20% lower survival).' },
            { text: 'Calculate mean fitness w̄ = (0.49×1.0) + (0.42×1.0) + (0.09×0.8) = 0.49 + 0.42 + 0.072 = 0.982.' },
            { text: 'Compute post-selection genotype frequencies: BB\' = 0.49/0.982 = 0.499, Bb\' = 0.42/0.982 = 0.428, bb\' = 0.072/0.982.' },
            { text: 'New allele frequency p\' = freq(BB\') + ½freq(Bb\') = 0.499 + 0.214 = 0.713.', faded: true, blankAnswer: 'p\' = 0.713 (frequency of B increases from 0.700 to 0.713.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Evolution · Part 1/2', spots: [
            { id: 's1', label: 'Origin of Life Oparin-Haldane Theory', prompt: 'Which idea is this? — The Oparin-Haldane theory proposes that life originated on early Earth through a gradual.', answer: 'Origin of Life Oparin-Haldane Theory', options: ['Origin of Life Oparin-Haldane Theory', 'Theory of Natural Selection Darwins Postulates', 'Evidences for Evolution Paleontological Anatomical', 'Evidences Biochemical and Molecular'] },
            { id: 's2', label: 'Theory of Natural Selection Darwins Postulates', prompt: 'Which idea is this? — Darwin\'s theory of natural selection proposes that evolution occurs through the.', answer: 'Theory of Natural Selection Darwins Postulates', options: ['Theory of Natural Selection Darwins Postulates', 'Origin of Life Oparin-Haldane Theory', 'Evidences for Evolution Paleontological Anatomical', 'Evidences Biochemical and Molecular'] },
            { id: 's3', label: 'Evidences for Evolution Paleontological Anatomical', prompt: 'Which idea is this? — Evidences for evolution from paleontology and anatomy demonstrate that present-day.', answer: 'Evidences for Evolution Paleontological Anatomical', options: ['Evidences for Evolution Paleontological Anatomical', 'Origin of Life Oparin-Haldane Theory', 'Theory of Natural Selection Darwins Postulates', 'Evidences Biochemical and Molecular'] },
            { id: 's4', label: 'Evidences Biochemical and Molecular', prompt: 'Which idea is this? — Biochemical and molecular evidences for evolution refer to the similarities in DNA.', answer: 'Evidences Biochemical and Molecular', options: ['Evidences Biochemical and Molecular', 'Origin of Life Oparin-Haldane Theory', 'Theory of Natural Selection Darwins Postulates', 'Evidences for Evolution Paleontological Anatomical'] },
            { id: 's5', label: 'Hardy-Weinberg Principle Equation and Conditions', prompt: 'Which idea is this? — The Hardy-Weinberg principle states that in an infinitely large, randomly mating.', answer: 'Hardy-Weinberg Principle Equation and Conditions', options: ['Hardy-Weinberg Principle Equation and Conditions', 'Origin of Life Oparin-Haldane Theory', 'Theory of Natural Selection Darwins Postulates', 'Evidences for Evolution Paleontological Anatomical'] },
            { id: 's6', label: 'Microevolution Change in Allele Frequencies', prompt: 'Which idea is this? — Microevolution is the change in allele frequencies within a population over successive.', answer: 'Microevolution Change in Allele Frequencies', options: ['Microevolution Change in Allele Frequencies', 'Origin of Life Oparin-Haldane Theory', 'Theory of Natural Selection Darwins Postulates', 'Evidences for Evolution Paleontological Anatomical'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student\'s origin-of-life project ends with the claim: \'Miller and Urey proved life began exactly as Oparin and Haldane described — lightning in a pond made the first cell.\'',
            decisions: [{ prompt: 'What did the 1953 spark experiment actually establish?', options: [
                { text: 'Only stage two — that inorganic gases (CH₄, NH₃, H₂, H₂O) under sparking can abiotically yield amino acids; polymerisation into macromolecules and bounded protocells remained undemonstrated.', outcome: 'Chemical evolution is multi-stage: showing monomers can form isn\'t showing a living cell arose — the claim overgeneralises partial evidence.' },
                { text: 'The claim stands — amino acids appeared, so the whole pathway to the first cell is proven.', outcome: 'Finding bricks isn\'t building the house: stages 3 and 4 (polymers, protocells with metabolism and heredity) were never part of that apparatus.', reveals: 'miller-urey-proved-everything' },
                { text: 'It failed anyway — without free oxygen in the gas mix, no organic molecules could form.', outcome: 'Backwards: the reducing, oxygen-free atmosphere was essential — free O₂ would have oxidised and destroyed nascent organics.', reveals: 'oxygen-needed-for-organics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Variation, selection, drift, speciation — you now hold the framework that explains all of biology.',
            decisions: [{ prompt: 'What comes next? Evolution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Evolution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_001', difficulty: 'standard',
          question: 'The Oparin-Haldane theory proposes that life originated on early Earth through.',
          hint: 'If stuck on monomer structures or condensation reactions, revisit c11_bio_cbse_09_002.',
          misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "Miller-Urey proved life originated exactly as Oparin-Haldane described." Evaluate this statement.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'necessary condition demonstrated', 'sufficient mechanism proven', 'lightning struck a pond and created a living cell in one step'],
                  hint: 'If stuck on monomer structures or condensation reactions, revisit c11_bio_cbse_09_002 (proteins).',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' }
          ],
            remediations: { 'the-oparin-haldane-theory-says': { steps: ['If the student cannot sequence the four stages or misattributes Miller-Urey results: 1.', 'Revisit c11_bio_cbse_09_001 (carbohydrates), c11_bio_cbse_09_002 (proteins), c11_bio_cbse_09_004 (nucleic acids).', 'Rewatch a 5-min animation of Miller-Urey apparatus (NCERT e-pathshala) and label each component\'s geological analogue.', 'Draw a flowchart: Inorganic gases → (energy) → Monomers → (clay/heat) → Polymers → (self-assembly) → Protocells →.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step.".',
          parts: [
                { id: 'a', prompt: 'If the early atmosphere were weakly oxidising (containing some CO₂ and N₂ but little CH₄/NH₃), how would the yield and variety of amino acids in a Miller-Urey.', answer: 'Yield and variety would DECREASE significantly',
                  options: ['Yield and variety would DECREASE significantly', 'same yield, just slower', 'more variety because CO₂ has more carbon', 'lightning struck a pond and created a living cell in one step'],
                  hint: 'If stuck on monomer structures or condensation reactions, revisit c11_bio_cbse_09_002 (proteins).',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' },
                { id: 'b', prompt: 'Design a modern follow-up experiment to test whether clay minerals (e.g., montmorillonite) could have catalysed the polymerisation of amino acids into peptides.', answer: 'reactants, (',
                  options: ['reactants, (', 'lightning struck a pond and created a living cell in one step', 'hot dilute soup'],
                  hint: 'If stuck on monomer structures or condensation reactions, revisit c11_bio_cbse_09_002 (proteins).',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' }
          ],
            remediations: { 'the-oparin-haldane-theory-says': { steps: ['If the student cannot sequence the four stages or misattributes Miller-Urey results: 1.', 'Revisit c11_bio_cbse_09_001 (carbohydrates), c11_bio_cbse_09_002 (proteins), c11_bio_cbse_09_004 (nucleic acids).', 'Rewatch a 5-min animation of Miller-Urey apparatus (NCERT e-pathshala) and label each component\'s geological analogue.', 'Draw a flowchart: Inorganic gases → (energy) → Monomers → (clay/heat) → Polymers → (self-assembly) → Protocells →.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_002', difficulty: 'standard',
          question: 'Darwin\'s theory of natural selection proposes that evolution occurs through the.',
          hint: 'If stuck, revisit c11_biotech_cbse_06_007 (meiosis variation) and c10_bio_cbse_04_007.',
          misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.',
          parts: [
                { id: 'a', prompt: 'A population of mosquitoes is exposed to a new insecticide. After 10 generations, 95% are resistant.', answer: 'Step 1: Overproduction',
                  options: ['Step 1: Overproduction', 'mosquitoes developed resistance', 'survival of the fittest', '"survival of the fittest" means the strongest/biggest individuals survive'],
                  hint: 'If stuck, revisit c11_biotech_cbse_06_007 (meiosis variation) and c10_bio_cbse_04_007 (Darwin.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' },
                { id: 'b', prompt: 'Compare Darwin\'s natural selection with Lamarck\'s inheritance of acquired characters using the example of giraffe neck elongation.', answer: 'Darwin: Ancestral giraffes had variation in neck length',
                  options: ['Darwin: Ancestral giraffes had variation in neck length', 'both explain long necks equally', 'survival of the fittest', '"survival of the fittest" means the strongest/biggest individuals survive'],
                  hint: 'If stuck, revisit c11_biotech_cbse_06_007 (meiosis variation) and c10_bio_cbse_04_007 (Darwin.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' }
          ],
            remediations: { 'survival-of-the-fittest-means': { steps: ['If student confuses fitness with physical strength: 1) Revisit c10_bio_cbse_04_007 (Darwin\'s theory basics) and define.', 'Ask "Which is fitter?" 3) Re-attempt Diagnostic Question 3 with explicit fitness calculation.', '4) If still stuck, review c11_biotech_cbse_06_007 (Significance of Meiosis: Genetic Variation) to reinforce that.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_003', difficulty: 'standard',
          question: 'Evidences for evolution from paleontology and anatomy demonstrate that.',
          hint: 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) and c9_bio_ch2_10 (Human.',
          misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The wing of a bird and the wing of a butterfly are homologous organs because both are used for flying." Is this statement correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'same function = homology', 'same origin = homology', 'homologous organs always look similar'],
                  hint: 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) and c9_bio_ch2_10 (Human Skeleton).',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' },
                { id: 'b', prompt: 'A fossil is found in a sedimentary rock layer dated to 150 million years ago.', answer: 'Archaeopteryx lithographica',
                  options: ['Archaeopteryx lithographica', 'homologous organs always look similar'],
                  hint: 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) and c9_bio_ch2_10 (Human Skeleton).',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' },
                { id: 'c', prompt: 'Compare the forelimb bones of a human, whale, and bat in terms of: (a) bone identity (name each bone), (b) functional adaptation, and (c) what this pattern.', answer: 'bone identity (name each bon',
                  options: ['bone identity (name each bon', 'homologous organs always look similar'],
                  hint: 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) and c9_bio_ch2_10 (Human Skeleton).',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' }
          ],
            remediations: { 'homologous-organs-always-look-similar': { steps: ['Revisit c9_bio_ch4_9 (Fossils: Formation and Significance) — verify you can explain how sedimentary layers provide.', 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) — confirm you can identify forelimb bones (humerus, radius.', 'Draw the forelimb skeleton of human, bird, whale, bat side-by-side — label every homologous bone.', 'Re-attempt Diagnostic Question 4. If still stuck, watch the NCERT "Evidences for Evolution" animation on DIKSHA portal.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_004', difficulty: 'standard',
          question: 'Biochemical and molecular evidences for evolution refer to the similarities.',
          hint: 'If stuck on sequence alignment or molecular clock, revisit c11_biotech_cbse_09_006.',
          misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional.',
          parts: [
                { id: 'a', prompt: 'A researcher sequences the beta-globin gene in humans, gorillas, and orangutans.', answer: 'Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup',
                  options: ['Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'If stuck on sequence alignment or molecular clock, revisit c11_biotech_cbse_09_006 (alignment.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' },
                { id: 'b', prompt: 'Compare and contrast: (a) homologous genes vs. analogous genes, (b) pseudogenes vs. functional genes as evolutionary evidence. Give one example of each.', answer: 'homologous genes vs',
                  options: ['homologous genes vs', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'If stuck on sequence alignment or molecular clock, revisit c11_biotech_cbse_09_006 (alignment.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' }
          ],
            remediations: { 'high-percentage-dna-similarity-recent': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids) and c11_bio_cbse_07_006 (Genetic Code) to reinforce that DNA sequence.', 'Review c11_bio_cbse_07_001 (Central Dogma) to understand how DNA → protein conservation works.', 'Do a guided BLAST exercise: search human cytochrome c against NCBI, record % identity for chimp, mouse, chicken, yeast.', 'Re-attempt Diagnostic Question 3 with the BLAST data.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_005', difficulty: 'standard',
          question: 'The Hardy-Weinberg principle states that in an infinitely large, randomly.',
          hint: 'If stuck on p²/2pq/q² derivation, revisit c10_bio_cbse_04_002 (monohybrid cross Punnett.',
          misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium.',
          parts: [
                { id: 'a', prompt: 'In a population at Hardy-Weinberg equilibrium, the frequency of allele A is 0.7. A student calculates the frequency of heterozygotes as 0.21.', answer: 'The student likely computed pq (0.7 × 0.3 = 0.21) instead of 2pq',
                  options: ['The student likely computed pq (0.7 × 0.3 = 0.21) instead of 2pq', 'Hardy-Weinberg equilibrium means no evolution is occurring at all', '"Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'If stuck on p²/2pq/q² derivation, revisit c10_bio_cbse_04_002 (monohybrid cross Punnett square) and.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' },
                { id: 'b', prompt: 'A small island population of 50 birds is founded by 10 migrants from a mainland where allele frequency p = 0.6.', answer: 'The "large population size" (no genetic drift) condition was violated',
                  options: ['The "large population size" (no genetic drift) condition was violated', 'natural selection', 'mutation', 'Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'If stuck on p²/2pq/q² derivation, revisit c10_bio_cbse_04_002 (monohybrid cross Punnett square) and.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' },
                { id: 'c', prompt: 'In a human population, the genotype frequencies for a locus are: AA = 0.36, Aa = 0.48, aa = 0.16.', answer: 'The claim is correct but the reasoning is incomplete',
                  options: ['The claim is correct but the reasoning is incomplete', 'Hardy-Weinberg equilibrium means no evolution is occurring at all', '"Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'If stuck on p²/2pq/q² derivation, revisit c10_bio_cbse_04_002 (monohybrid cross Punnett square) and.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' }
          ],
            remediations: { 'hardy-weinberg-equilibrium-means-no': { steps: ['If the student confuses H-W equilibrium with "no evolution anywhere": 1.', 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) to recall evolution is change in allele frequencies over time.', 'Revisit c11_biotech_cbse_06_005 (Meiosis I) to recall independent assortment means each locus segregates independently.', 'Do a mini-activity: Take two loci (e.g., seed shape and colour).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_006', difficulty: 'standard',
          question: 'Microevolution is the change in allele frequencies within a population over.',
          hint: 'If stuck, revisit c12_bio_cbse_07_005 worked examples on H-W calculations and the "five.',
          misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency.',
          parts: [
                { id: 'a', prompt: 'In a small island population of 50 birds, a neutral allele has frequency 0.5. After 10 generations, the frequency is 0.7.', answer: 'Genetic drift',
                  options: ['Genetic drift', 'natural selection', 'mutation', 'evolution by natural selection'],
                  hint: 'If stuck, revisit c12_bio_cbse_07_005 worked examples on H-W calculations and the "five.',
                  misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency change implies.' }
          ],
            remediations: { 'evolution-by-natural-selection-and': { steps: ['Revisit c12_bio_cbse_07_005 (Hardy-Weinberg) — verify you can calculate genotype frequencies from allele frequencies.', 'Do the "bean bag" drift simulation: take 100 beads (50 red, 50 blue), randomly draw 20 without replacement to form the.', 'Compare variance across 5 independent runs.', 'Re-attempt Diagnostic Question 3 — if still wrong, review the formula σ² = pq/2N and simulate in Excel.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
