import type { SimDef } from '../../engine/types';
import C12_BiologyEvolutionSim from '../../../simulations/c6_12/C12_BiologyEvolutionSim';

/** v3 wrapped master — C12_BiologyEvolutionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyevolutionsim: SimDef = {
    id: 'v3w_c12_biologyevolutionsim',
    title: 'Origin of Life: Oparin-Haldane Theory',
    subtitle: 'Covers the Oparin-Haldane hypothesis, Miller-Urey experiment, and the concept of.',
    classLevel: 12, subject: 'biology', topic: 'Origin of Life: Oparin-Haldane Theory',
    chapters: [],
    nodeIds: ['c12_bio_cbse_07_001', 'c12_bio_cbse_07_002', 'c12_bio_cbse_07_003', 'c12_bio_cbse_07_004', 'c12_bio_cbse_07_006', 'c12_bio_cbse_07_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a droplet of oil in water — it forms a sphere with a boundary separating inside from outside, yet it.', goal: 'Master Origin of Life: Oparin-Haldane Theory.' },
    discovery: {
        question: 'A student claims: "Miller-Urey proved life originated exactly as Oparin-Haldane described." Evaluate this statement.',
        options: ['The statement is FALSE', 'necessary condition demonstrated', 'sufficient mechanism proven'],
        answer: 'The statement is FALSE',
        hook: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step.".',
    },
    teaching: [
        { title: 'The Oparin-Haldane theory proposes that life.', text: 'The Oparin-Haldane theory proposes that life originated on early Earth through a gradual process of chemical evolution: simple inorganic molecules (CH₄, NH₃, H₂O, H₂, CO₂) combined under energy.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_001', title: 'The Oparin-Haldane theory proposes that.',
          scaffold: { problem: 'A research team simulates early Earth conditions using a gas mixture of CO₂, N₂, H₂O, and H₂ (no CH₄, no NH₃) with electrical discharge.',
            steps: [
            { text: 'Identify the carbon and nitrogen sources in each experiment. Classic: CH₄ (C oxidation state -4) and NH₃ (N oxidation.' },
            { text: 'Determine the oxidation state changes needed to form glycine (NH₂CH₂COOH).' },
            { text: 'Assess the reducing power available. Classic experiment: CH₄ and H₂ provide abundant electrons (reducing power).' },
            { text: 'Evaluate the thermodynamic barrier. Reducing CO₂ to organic molecules requires high energy input (e.g., FeS catalysis.' },
            { text: 'Conclude. The classic experiment\'s high yield comes from starting with pre-reduced C and N.', faded: true, blankAnswer: 'The yield is lower because CO₂ (C⁺⁴) and N₂ (N⁰) are.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_002', title: 'Darwin\'s theory of natural selection.',
          scaffold: { problem: 'In a population of 1000 deer, a harsh winter kills 800 individuals. The survivors have thicker fur on average.',
            steps: [
            { text: 'Identify overproduction — deer produce more offspring than winter resources support (Postulate 1).' },
            { text: 'Identify variation — fur thickness varies genetically among individuals (Postulate 2).' },
            { text: 'Identify struggle — limited food/shelter causes differential mortality (Postulate 3).' },
            { text: 'Identify selection — thicker-furred deer survive better, reproduce more, pass alleles for thick fur (Postulate 4).' },
            { text: 'Clarify misconception — individuals did not grow thicker fur in response to cold; the allele frequency shifted because.', faded: true, blankAnswer: 'Natural selection occurred because heritable variation in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_003', title: 'Evidences for evolution from.',
          scaffold: { problem: 'A paleontologist discovers a new fossil in a 375-million-year-old Devonian rock layer in the Himalayas.',
            steps: [
            { text: 'Note the geological age — Devonian (375 MYA) matches the known fish-to-tetrapod transition window.' },
            { text: 'Analyze feature (1) — scales and gills = ancestral fish traits (aquatic respiration, protection).' },
            { text: 'Analyze feature (2) — flat skull with dorsal eyes = adaptation for seeing above water while submerged (like modern.' },
            { text: 'Analyze features (3) and (4) — pectoral fin with humerus-radius-ulna and wrist joint = homologous to tetrapod forelimb;.' },
            { text: 'Analyze feature (5) — overlapping ribs = support body against gravity out of water (fish rely on buoyancy).' },
            { text: 'Synthesize — this matches Tiktaalik roseae, a stem tetrapod bridging lobe-finned fish (Sarcopterygii) and early.', faded: true, blankAnswer: 'Tiktaalik (or similar stem tetrapod like.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_004', title: 'Biochemical and molecular evidences for.',
          scaffold: { problem: 'Researchers sequenced a 300-amino-acid conserved metabolic enzyme from three species: A, B, and C.',
            steps: [
            { text: 'Convert amino acid differences to proportions: p_AB = 12/300 = 0.04, p_AC = 24/300 = 0.08, p_BC = 30/300 = 0.10.' },
            { text: 'Apply Jukes-Cantor correction for multiple hits (simplified): D = -¾ ln(1 - 4p/3). For small p, D ≈ p.' },
            { text: 'The smallest distance is A-B (0.04), so A and B are sister taxa. C is the outgroup.' },
            { text: 'In a rooted tree with molecular clock, distance from root to A = distance from root to B = distance from root to C = T.' },
            { text: 'Conclude tree: ((A,B),C) with A-B divergence at 0.02 units, root at 0.06 units.', faded: true, blankAnswer: 'Tree topology: ((A,B),C). Relative divergence: A and B.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_006', title: 'Microevolution is the change in allele.',
          scaffold: { problem: 'In a population of 1,000 beetles, allele B (black) has frequency 0.7, allele b (brown) has frequency 0.3.',
            steps: [
            { text: 'Establish initial genotype frequencies under H-W: BB = p² = 0.49, Bb = 2pq = 0.42, bb = q² = 0.09.' },
            { text: 'Assign fitness values: w_BB = 1.0, w_Bb = 1.0 (assuming complete dominance), w_bb = 0.8 (20% lower survival).' },
            { text: 'Calculate mean fitness w̄ = (0.49×1.0) + (0.42×1.0) + (0.09×0.8) = 0.49 + 0.42 + 0.072 = 0.982.' },
            { text: 'Compute post-selection genotype frequencies: BB\' = 0.49/0.982 = 0.499, Bb\' = 0.42/0.982 = 0.428, bb\' = 0.072/0.982 =.' },
            { text: 'New allele frequency p\' = freq(BB\') + ½freq(Bb\') = 0.499 + 0.214 = 0.713.', faded: true, blankAnswer: 'p\' = 0.713 (frequency of B increases from 0.700 to 0.713 in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_007', title: 'Speciation is the evolutionary process.',
          scaffold: { problem: 'A population of flowering plants in the Himalayas is split by a glacier advance.',
            steps: [
            { text: 'Identify the initial barrier — glacier = geographic isolation → allopatric speciation.' },
            { text: 'Note divergent selection pressures — different pollinators (prezygotic: pollinator isolation) and soil pH (ecological.' },
            { text: 'Recognize that 10,000 years allows accumulation of genetic differences (drift + selection).' },
            { text: 'Secondary contact reveals postzygotic barrier (low pollen viability = hybrid sterility).' },
            { text: 'Conclude: Allopatric speciation completed with both prezygotic (pollinator preference) and postzygotic (hybrid.', faded: true, blankAnswer: 'Allopatric speciation with prezygotic (pollinator.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Origin of Life: Oparin-Haldane Theory', spots: [
            { id: 's1', label: 'The Oparin-Haldane theory proposes that', prompt: 'Which idea is this? — The Oparin-Haldane theory proposes that life originated on early Earth through a gradual.', answer: 'The Oparin-Haldane theory proposes that', options: ['The Oparin-Haldane theory proposes that', 'Darwins theory of natural selection', 'Evidences for evolution from paleontology', 'Biochemical and molecular evidences for'] },
            { id: 's2', label: 'Darwins theory of natural selection', prompt: 'Which idea is this? — Darwin\'s theory of natural selection proposes that evolution occurs through the.', answer: 'Darwins theory of natural selection', options: ['Darwins theory of natural selection', 'The Oparin-Haldane theory proposes that', 'Evidences for evolution from paleontology', 'Biochemical and molecular evidences for'] },
            { id: 's3', label: 'Evidences for evolution from paleontology', prompt: 'Which idea is this? — Evidences for evolution from paleontology and anatomy demonstrate that present-day.', answer: 'Evidences for evolution from paleontology', options: ['Evidences for evolution from paleontology', 'The Oparin-Haldane theory proposes that', 'Darwins theory of natural selection', 'Biochemical and molecular evidences for'] },
            { id: 's4', label: 'Biochemical and molecular evidences for', prompt: 'Which idea is this? — Biochemical and molecular evidences for evolution refer to the similarities in DNA.', answer: 'Biochemical and molecular evidences for', options: ['Biochemical and molecular evidences for', 'The Oparin-Haldane theory proposes that', 'Darwins theory of natural selection', 'Evidences for evolution from paleontology'] },
            { id: 's5', label: 'Microevolution is the change in', prompt: 'Which idea is this? — Microevolution is the change in allele frequencies within a population over successive.', answer: 'Microevolution is the change in', options: ['Microevolution is the change in', 'The Oparin-Haldane theory proposes that', 'Darwins theory of natural selection', 'Evidences for evolution from paleontology'] },
            { id: 's6', label: 'Speciation is the evolutionary process', prompt: 'Which idea is this? — Speciation is the evolutionary process by which populations of a single species diverge.', answer: 'Speciation is the evolutionary process', options: ['Speciation is the evolutionary process', 'The Oparin-Haldane theory proposes that', 'Darwins theory of natural selection', 'Evidences for evolution from paleontology'] }
          ] } }
    ],
    explore: { component: C12_BiologyEvolutionSim, prompt: 'Explore the interactive — Origin of Life: Oparin-Haldane Theory' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_001', difficulty: 'standard',
          question: 'The Oparin-Haldane theory proposes that life originated on early Earth through.',
          hint: 'If stuck on monomer structures or condensation reactions, revisit c11_bio_cbse_09_002.',
          misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "Miller-Urey proved life originated exactly as Oparin-Haldane described." Evaluate this statement.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'necessary condition demonstrated', 'sufficient mechanism proven'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' }
          ],
            remediations: { 'the-oparin-haldane-theory-says': { steps: ['If the student cannot sequence the four stages or misattributes Miller-Urey results: 1.', 'Revisit c11_bio_cbse_09_001 (carbohydrates), c11_bio_cbse_09_002 (proteins), c11_bio_cbse_09_004 (nucleic acids) to.', 'Rewatch a 5-min animation of Miller-Urey apparatus (NCERT e-pathshala) and label each component\'s geological analogue.', 'Draw a flowchart: Inorganic gases → (energy) → Monomers → (clay/heat) → Polymers → (self-assembly) → Protocells →.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step.".',
          parts: [
                { id: 'a', prompt: 'If the early atmosphere were weakly oxidising (containing some CO₂ and N₂ but little CH₄/NH₃), how would the yield and variety of amino acids in a Miller-Urey.', answer: 'Yield and variety would DECREASE significantly',
                  options: ['Yield and variety would DECREASE significantly', 'same yield, just slower', 'more variety because CO₂ has more carbon', 'lightning struck a pond and created a living cell in one step'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' },
                { id: 'b', prompt: 'Design a modern follow-up experiment to test whether clay minerals (e.g., montmorillonite) could have catalysed the polymerisation of amino acids into peptides.', answer: 'reactants, (',
                  options: ['reactants, (', 'lightning struck a pond and created a living cell in one step', 'hot dilute soup'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Oparin-Haldane theory says "lightning struck a pond and created a living cell in one step." The theory actually.' }
          ],
            remediations: { 'the-oparin-haldane-theory-says': { steps: ['If the student cannot sequence the four stages or misattributes Miller-Urey results: 1.', 'Revisit c11_bio_cbse_09_001 (carbohydrates), c11_bio_cbse_09_002 (proteins), c11_bio_cbse_09_004 (nucleic acids) to.', 'Rewatch a 5-min animation of Miller-Urey apparatus (NCERT e-pathshala) and label each component\'s geological analogue.', 'Draw a flowchart: Inorganic gases → (energy) → Monomers → (clay/heat) → Polymers → (self-assembly) → Protocells →.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_002', difficulty: 'standard',
          question: 'Darwin\'s theory of natural selection proposes that evolution occurs through the.',
          hint: 'If stuck, revisit c11_biotech_cbse_06_007 (meiosis variation) and c10_bio_cbse_04_007.',
          misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.',
          parts: [
                { id: 'a', prompt: 'A population of mosquitoes is exposed to a new insecticide. After 10 generations, 95% are resistant.', answer: 'Step 1: Overproduction',
                  options: ['Step 1: Overproduction', 'mosquitoes developed resistance', 'survival of the fittest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' },
                { id: 'b', prompt: 'Compare Darwin\'s natural selection with Lamarck\'s inheritance of acquired characters using the example of giraffe neck elongation.', answer: 'Darwin: Ancestral giraffes had variation in neck length',
                  options: ['Darwin: Ancestral giraffes had variation in neck length', 'both explain long necks equally', 'survival of the fittest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' }
          ],
            remediations: { 'survival-of-the-fittest-means': { steps: ['If student confuses fitness with physical strength: 1) Revisit c10_bio_cbse_04_007 (Darwin\'s theory basics) and define.', 'Ask "Which is fitter?" 3) Re-attempt Diagnostic Question 3 with explicit fitness calculation.', '4) If still stuck, review c11_biotech_cbse_06_007 (Significance of Meiosis: Genetic Variation) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using fast-growing plants (e.g., mustard) to demonstrate natural selection in a classroom over 3-4 generations.', answer: 'Selective pressure: Drought (water once a week vs daily)',
                  options: ['Selective pressure: Drought (water once a week vs daily)', 'survival of the fittest', '"survival of the fittest" means the strongest/biggest individuals survive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' },
                { id: 'b', prompt: 'Compare Darwin\'s natural selection with Lamarck\'s inheritance of acquired characters using the example of giraffe neck elongation.', answer: 'Darwin: Ancestral giraffes had variation in neck length',
                  options: ['Darwin: Ancestral giraffes had variation in neck length', 'both explain long necks equally', 'survival of the fittest', '"survival of the fittest" means the strongest/biggest individuals survive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.' }
          ],
            remediations: { 'survival-of-the-fittest-means': { steps: ['If student confuses fitness with physical strength: 1) Revisit c10_bio_cbse_04_007 (Darwin\'s theory basics) and define.', 'Ask "Which is fitter?" 3) Re-attempt Diagnostic Question 3 with explicit fitness calculation.', '4) If still stuck, review c11_biotech_cbse_06_007 (Significance of Meiosis: Genetic Variation) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_003', difficulty: 'standard',
          question: 'Evidences for evolution from paleontology and anatomy demonstrate that.',
          hint: 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) and c9_bio_ch2_10 (Human.',
          misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The wing of a bird and the wing of a butterfly are homologous organs because both are used for flying." Is this statement correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'same function = homology', 'same origin = homology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' },
                { id: 'b', prompt: 'A fossil is found in a sedimentary rock layer dated to 150 million years ago.', answer: 'Archaeopteryx lithographica',
                  options: ['Archaeopteryx lithographica', 'homologous organs always look similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' },
                { id: 'c', prompt: 'Compare the forelimb bones of a human, whale, and bat in terms of: (a) bone identity (name each bone), (b) functional adaptation, and (c) what this pattern.', answer: 'bone identity (name each bon',
                  options: ['bone identity (name each bon', 'homologous organs always look similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' }
          ],
            remediations: { 'homologous-organs-always-look-similar': { steps: ['Revisit c9_bio_ch4_9 (Fossils: Formation and Significance) — verify you can explain how sedimentary layers provide.', 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) — confirm you can identify forelimb bones (humerus, radius,.', 'Draw the forelimb skeleton of human, bird, whale, bat side-by-side — label every homologous bone.', 'Re-attempt Diagnostic Question 4. If still stuck, watch the NCERT "Evidences for Evolution" animation on DIKSHA portal.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Vestigial organs like the human appendix and whale pelvic bones are useless leftovers that prove evolution is wasteful and imperfect.".', answer: 'Flaw: assumes vestigial = functionless',
                  options: ['Flaw: assumes vestigial = functionless', 'homologous organs always look similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' },
                { id: 'b', prompt: 'Design a simple investigation using only museum specimens or photographs to distinguish whether the streamlined body shape of a shark (fish) and dolphin.', answer: 'Compare: (1) Skeletal structure',
                  options: ['Compare: (1) Skeletal structure', 'homologous organs always look similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "homologous organs always look similar" — they expect whale flipper and human arm to look alike externally.' }
          ],
            remediations: { 'homologous-organs-always-look-similar': { steps: ['Revisit c9_bio_ch4_9 (Fossils: Formation and Significance) — verify you can explain how sedimentary layers provide.', 'Review c11_bio_cbse_04_013 (Phylum Chordata: Vertebrates) — confirm you can identify forelimb bones (humerus, radius,.', 'Draw the forelimb skeleton of human, bird, whale, bat side-by-side — label every homologous bone.', 'Re-attempt Diagnostic Question 4. If still stuck, watch the NCERT "Evidences for Evolution" animation on DIKSHA portal.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_004', difficulty: 'standard',
          question: 'Biochemical and molecular evidences for evolution refer to the similarities in.',
          hint: 'If stuck on sequence alignment or molecular clock, revisit c11_biotech_cbse_09_006.',
          misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional.',
          parts: [
                { id: 'a', prompt: 'A researcher sequences the beta-globin gene in humans, gorillas, and orangutans.', answer: 'Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup',
                  options: ['Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' },
                { id: 'b', prompt: 'Compare and contrast: (a) homologous genes vs. analogous genes, (b) pseudogenes vs. functional genes as evolutionary evidence. Give one example of each.', answer: 'homologous genes vs',
                  options: ['homologous genes vs', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' }
          ],
            remediations: { 'high-percentage-dna-similarity-recent': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids) and c11_bio_cbse_07_006 (Genetic Code) to reinforce that DNA sequence is.', 'Review c11_bio_cbse_07_001 (Central Dogma) to understand how DNA → protein conservation works.', 'Do a guided BLAST exercise: search human cytochrome c against NCBI, record % identity for chimp, mouse, chicken, yeast;.', 'Re-attempt Diagnostic Question 3 with the BLAST data.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Endogenous retroviruses (ERVs) in the same chromosomal position in humans and chimpanzees are the strongest molecular evidence for common.', answer: 'The claim is mostly correct but overstates "strongest" — ERVs are compelling',
                  options: ['The claim is mostly correct but overstates "strongest" — ERVs are compelling', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' },
                { id: 'b', prompt: 'Compare and contrast: (a) homologous genes vs. analogous genes, (b) pseudogenes vs. functional genes as evolutionary evidence. Give one example of each.', answer: 'homologous genes vs',
                  options: ['homologous genes vs', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' }
          ],
            remediations: { 'high-percentage-dna-similarity-recent': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids) and c11_bio_cbse_07_006 (Genetic Code) to reinforce that DNA sequence is.', 'Review c11_bio_cbse_07_001 (Central Dogma) to understand how DNA → protein conservation works.', 'Do a guided BLAST exercise: search human cytochrome c against NCBI, record % identity for chimp, mouse, chicken, yeast;.', 'Re-attempt Diagnostic Question 3 with the BLAST data.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_006', difficulty: 'standard',
          question: 'Microevolution is the change in allele frequencies within a population over.',
          hint: 'If stuck, revisit c12_bio_cbse_07_005 worked examples on H-W calculations and the "five.',
          misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency.',
          parts: [
                { id: 'a', prompt: 'In a small island population of 50 birds, a neutral allele has frequency 0.5. After 10 generations, the frequency is 0.7.', answer: 'Genetic drift',
                  options: ['Genetic drift', 'natural selection', 'mutation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency change implies.' }
          ],
            remediations: { 'evolution-by-natural-selection-and': { steps: ['Revisit c12_bio_cbse_07_005 (Hardy-Weinberg) — verify you can calculate genotype frequencies from allele frequencies.', 'Do the "bean bag" drift simulation: take 100 beads (50 red, 50 blue), randomly draw 20 without replacement to form the.', 'Compare variance across 5 independent runs.', 'Re-attempt Diagnostic Question 3 — if still wrong, review the formula σ² = pq/2N and simulate in Excel.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Microevolution always leads to adaptation because natural selection is the strongest evolutionary force." Provide a counterexample using.', answer: 'The claim is false',
                  options: ['The claim is false', 'evolution by natural selection', 'microevolution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "evolution by natural selection" and "microevolution" are synonyms, and that every allele frequency change implies.' }
          ],
            remediations: { 'evolution-by-natural-selection-and': { steps: ['Revisit c12_bio_cbse_07_005 (Hardy-Weinberg) — verify you can calculate genotype frequencies from allele frequencies.', 'Do the "bean bag" drift simulation: take 100 beads (50 red, 50 blue), randomly draw 20 without replacement to form the.', 'Compare variance across 5 independent runs.', 'Re-attempt Diagnostic Question 3 — if still wrong, review the formula σ² = pq/2N and simulate in Excel.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_007', difficulty: 'standard',
          question: 'Speciation is the evolutionary process by which populations of a single species.',
          hint: 'If stuck, review c12_bio_cbse_07_006 (Microevolution) for how allele frequencies change.',
          misconception: 'Students often think that geographic isolation alone instantly creates a new species.',
          parts: [
                { id: 'a', prompt: 'Define allopatric speciation and name the initial isolating mechanism.', answer: 'Allopatric speciation is the formation of new species from populations that are',
                  options: ['Allopatric speciation is the formation of new species from populations that are', 'speciation due to polyploidy', 'geographic isolation alone instantly creates a new species'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' },
                { id: 'b', prompt: 'Explain why polyploidy leads to instant reproductive isolation in plants but rarely in animals.', answer: 'Polyploidy creates immediate postzygotic isolation',
                  options: ['Polyploidy creates immediate postzygotic isolation', 'animals don\'t have chromosomes', 'geographic isolation alone instantly creates a new species'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' },
                { id: 'c', prompt: 'A population of frogs is split by a newly formed highway. After 50 generations, the two groups are brought together in a lab and produce viable but sterile.', answer: 'This is allopatric speciation (geographic isolation by the highway)',
                  options: ['This is allopatric speciation (geographic isolation by the highway)', 'sympatric speciation with prezygotic barrier', 'geographic isolation alone instantly creates a new species'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' }
          ],
            remediations: { 'geographic-isolation-alone-instantly-creates': { steps: ['If the student holds this misconception, have them revisit c12_bio_cbse_07_006 (Microevolution: Change in Allele.', 'Then do a stepwise exercise: (1) Draw a timeline showing barrier formation → zero gene flow → mutation/selection/drift.', '(2) Identify at which point the biological species concept would recognize two species.', '(3) Use the "ring species" example (e.g., Ensatina salamanders) to show that geographic separation alone does not.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that geographic isolation alone instantly creates a new species.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Sympatric speciation is impossible because gene flow always homogenizes populations in the same area."', answer: 'The statement is false',
                  options: ['The statement is false', 'allopatry-only', 'geographic isolation alone instantly creates a new species'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that geographic isolation alone instantly creates a new species.' }
          ],
            remediations: { 'geographic-isolation-alone-instantly-creates': { steps: ['If the student holds this misconception, have them revisit c12_bio_cbse_07_006 (Microevolution: Change in Allele.', 'Then do a stepwise exercise: (1) Draw a timeline showing barrier formation → zero gene flow → mutation/selection/drift.', '(2) Identify at which point the biological species concept would recognize two species.', '(3) Use the "ring species" example (e.g., Ensatina salamanders) to show that geographic separation alone does not.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
