import type { SimDef } from '../../engine/types';
import C12_BiologyEvolutionNaturalSelectionSim from '../../../simulations/c6_12/C12_BiologyEvolutionNaturalSelectionSim';

/** v3 wrapped master — C12_BiologyEvolutionNaturalSelectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyevolutionnaturalselectionsim: SimDef = {
    id: 'v3w_c12_biologyevolutionnaturalselectionsim',
    title: 'Evolution Natural Selection',
    subtitle: 'Covers Darwin\'s four postulates (overproduction, variation, struggle for existence,.',
    classLevel: 12, subject: 'biology', topic: 'Theory of Natural Selection: Darwin\'s Postulates',
    chapters: [],
    nodeIds: ['c12_bio_cbse_07_002', 'c12_bio_cbse_07_006', 'c12_bio_cbse_07_007', 'c12_bio_cbse_13_003', 'c12_bio_cbse_07_005', 'c12_bio_cbse_07_008', 'c12_bio_cbse_04_002', 'c12_bio_cbse_11_005', 'c12_bio_cbse_07_001', 'c12_bio_cbse_07_003', 'c12_bio_cbse_07_004', 'c12_bio_cbse_07_009', 'c12_bio_cbse_13_006', 'c12_bio_cbse_09_004', 'c12_bio_cbse_01_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a bacterial culture on an agar plate with an antibiotic gradient: most bacteria die near the.', goal: 'Master Evolution Natural Selection.' },
    discovery: {
        question: 'A population of mosquitoes is exposed to a new insecticide. After 10 generations, 95% are resistant.',
        options: ['Step 1: Overproduction', 'mosquitoes developed resistance', 'survival of the fittest'],
        answer: 'Step 1: Overproduction',
        hook: 'Students believe "survival of the fittest" means the strongest/biggest individuals survive.',
    },
    teaching: [
        { title: 'Darwin\'s theory of natural selection.', text: 'Darwin\'s theory of natural selection proposes that evolution occurs through the differential survival and reproduction of individuals due to variations in heritable traits, where organisms with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_002', title: 'Darwin\'s theory of natural selection.',
          scaffold: { problem: 'In a population of 1000 deer, a harsh winter kills 800 individuals. The survivors have thicker fur on average.',
            steps: [
            { text: 'Identify overproduction — deer produce more offspring than winter resources support (Postulate 1).' },
            { text: 'Identify variation — fur thickness varies genetically among individuals (Postulate 2).' },
            { text: 'Identify struggle — limited food/shelter causes differential mortality (Postulate 3).' },
            { text: 'Identify selection — thicker-furred deer survive better, reproduce more, pass alleles for thick fur (Postulate 4).' },
            { text: 'Clarify misconception — individuals did not grow thicker fur in response to cold; the allele frequency shifted because.', faded: true, blankAnswer: 'Natural selection occurred because heritable variation in.' }
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
        { type: 'scaffold', nodeId: 'c12_bio_cbse_13_003', title: 'An adaptation is a heritable trait —.',
          scaffold: { problem: 'The Indian desert plant *Calotropis procera* (ak) has thick, leathery leaves with a waxy cuticle and sunken stomata.',
            steps: [
            { text: 'Identify the abiotic stress — high temperature, low humidity, strong wind → steep water vapor gradient from leaf.' },
            { text: 'Recall transpiration drivers — open stomata, large surface area, thin cuticle, direct exposure to moving air.' },
            { text: 'Analyze thick leathery leaf — reduces surface-area-to-volume ratio, limiting evaporative surface.' },
            { text: 'Analyze waxy cuticle — hydrophobic barrier minimizing cuticular transpiration (non-stomatal water loss).' },
            { text: 'Analyze sunken stomata — creates a humid microclimate in the stomatal pit, reducing vapor pressure gradient and.' },
            { text: 'Synthesize — these traits collectively lower transpiration rate while allowing CO2 uptake for photosynthesis, a.', faded: true, blankAnswer: 'Thick leaf reduces surface area; waxy cuticle blocks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_005', title: 'The Hardy-Weinberg principle states.',
          scaffold: { problem: 'In a rural Indian population, 9% of individuals express a recessive genetic disorder (homozygous recessive).',
            steps: [
            { text: 'Identify the known phenotype frequency. Recessive disorder phenotype = homozygous recessive (aa) = q² = 0.09.' },
            { text: 'Solve for recessive allele frequency q. q = √q² = √0.09 = 0.3.' },
            { text: 'Solve for dominant allele frequency p using p + q = 1. p = 1 - q = 1 - 0.3 = 0.7.' },
            { text: 'Calculate heterozygote (carrier) frequency 2pq. 2pq = 2 × 0.7 × 0.3 = 0.42.' },
            { text: 'Interpret: 42% of the population are asymptomatic carriers. Verify: p² = 0.49 (normal non-carriers), 2pq = 0.42.', faded: true, blankAnswer: 'Carrier frequency = 0.42 (42%).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_008', title: 'Adaptive radiation is the process by.',
          scaffold: { problem: 'On Daphne Major island, a drought in 1977 caused small, soft seeds to become scarce; only large, hard seeds remained.',
            steps: [
            { text: 'Identify the selective pressure: drought eliminated small seeds, leaving only large, hard seeds.' },
            { text: 'Note existing variation: beak depth in the population varied from ~8 mm to ~10 mm.' },
            { text: 'Determine which phenotype is favored: birds with deeper, stronger beaks can crack hard seeds and survive; those with.' },
            { text: 'Apply differential survival and reproduction: survivors (deeper beaks) reproduce, passing on alleles for deeper beaks.' },
            { text: 'Conclude that the population\'s average beak depth increased due to natural selection acting on heritable variation.', faded: true, blankAnswer: 'The drought selected for deeper beaks because only birds.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_07_006', title: 'Identify each idea',
          dissect: { specimen: 'Evolution Natural Selection', spots: [
            { id: 's1', label: 'Darwins theory of natural selection', prompt: 'Which idea is this? — Darwin\'s theory of natural selection proposes that evolution occurs through the.', answer: 'Darwins theory of natural selection', options: ['Darwins theory of natural selection', 'Microevolution is the change in', 'Speciation is the evolutionary process', 'An adaptation is a heritable'] },
            { id: 's2', label: 'Microevolution is the change in', prompt: 'Which idea is this? — Microevolution is the change in allele frequencies within a population over successive.', answer: 'Microevolution is the change in', options: ['Microevolution is the change in', 'Darwins theory of natural selection', 'Speciation is the evolutionary process', 'An adaptation is a heritable'] },
            { id: 's3', label: 'Speciation is the evolutionary process', prompt: 'Which idea is this? — Speciation is the evolutionary process by which populations of a single species diverge.', answer: 'Speciation is the evolutionary process', options: ['Speciation is the evolutionary process', 'Darwins theory of natural selection', 'Microevolution is the change in', 'An adaptation is a heritable'] },
            { id: 's4', label: 'An adaptation is a heritable', prompt: 'Which idea is this? — An adaptation is a heritable trait — morphological, physiological, or behavioral — that.', answer: 'An adaptation is a heritable', options: ['An adaptation is a heritable', 'Darwins theory of natural selection', 'Microevolution is the change in', 'Speciation is the evolutionary process'] },
            { id: 's5', label: 'The Hardy-Weinberg principle states that', prompt: 'Which idea is this? — The Hardy-Weinberg principle states that in an infinitely large, randomly mating.', answer: 'The Hardy-Weinberg principle states that', options: ['The Hardy-Weinberg principle states that', 'Darwins theory of natural selection', 'Microevolution is the change in', 'Speciation is the evolutionary process'] },
            { id: 's6', label: 'Adaptive radiation is the process', prompt: 'Which idea is this? — Adaptive radiation is the process by which a single ancestral species rapidly diversifies.', answer: 'Adaptive radiation is the process', options: ['Adaptive radiation is the process', 'Darwins theory of natural selection', 'Microevolution is the change in', 'Speciation is the evolutionary process'] }
          ] } }
    ],
    explore: { component: C12_BiologyEvolutionNaturalSelectionSim, prompt: 'Explore the interactive — Evolution Natural Selection' },
    challenges: [
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
            remediations: { 'geographic-isolation-alone-instantly-creates': { steps: ['If the student holds this misconception, have them revisit c12_bio_cbse_07_006 (Microevolution: Change in Allele.', 'Then do a stepwise exercise: (1) Draw a timeline showing barrier formation → zero gene flow → mutation/selection/drift.', '(2) Identify at which point the biological species concept would recognize two species.', '(3) Use the "ring species" example (e.g., Ensatina salamanders) to show that geographic separation alone does not.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_13_003', difficulty: 'standard',
          question: 'An adaptation is a heritable trait — morphological, physiological, or.',
          hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s natural selection) and c9_bio_ch4_6 (basic.',
          misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.',
          parts: [
                { id: 'a', prompt: 'A desert lizard basks in the sun to raise its body temperature and retreats into a burrow during peak heat.', answer: 'Behavioral adaptation',
                  options: ['Behavioral adaptation', 'physiological because it involves temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.' },
                { id: 'b', prompt: 'The kangaroo rat (North American desert) never drinks water; it survives on metabolic water from seeds. Its kidneys produce extremely concentrated urine.', answer: 'metabolic water production, (',
                  options: ['metabolic water production, (', 'morphological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate "adaptation" with any useful trait, ignoring heritability and evolutionary history.' }
          ],
            remediations: { 'students-frequently-equate-adaptation-with': { steps: ['Revisit c9_bio_ch4_6 (Class 9: Adaptations: Structural and Behavioural) to re-learn the three categories with basic.', 'Watch a 5-min video on "acclimatization vs adaptation" (e.g., high-altitude natives vs.', 'Write three Indian examples for each category without notes.', 'Re-attempt Diagnostic Questions 1 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_005', difficulty: 'standard',
          question: 'The Hardy-Weinberg principle states that in an infinitely large, randomly.',
          hint: 'If stuck on p²/2pq/q² derivation, revisit c10_bio_cbse_04_002 (monohybrid cross Punnett.',
          misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium.',
          parts: [
                { id: 'a', prompt: 'In a population at Hardy-Weinberg equilibrium, the frequency of allele A is 0.7. A student calculates the frequency of heterozygotes as 0.21.', answer: 'The student likely computed pq (0.7 × 0.3 = 0.21) instead of 2pq',
                  options: ['The student likely computed pq (0.7 × 0.3 = 0.21) instead of 2pq', 'Hardy-Weinberg equilibrium means no evolution is occurring at all', '"Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' },
                { id: 'b', prompt: 'A small island population of 50 birds is founded by 10 migrants from a mainland where allele frequency p = 0.6.', answer: 'The "large population size" (no genetic drift) condition was violated',
                  options: ['The "large population size" (no genetic drift) condition was violated', 'natural selection', 'mutation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' },
                { id: 'c', prompt: 'In a human population, the genotype frequencies for a locus are: AA = 0.36, Aa = 0.48, aa = 0.16.', answer: 'The claim is correct but the reasoning is incomplete',
                  options: ['The claim is correct but the reasoning is incomplete', 'Hardy-Weinberg equilibrium means no evolution is occurring at all', '"Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' }
          ],
            remediations: { 'hardy-weinberg-equilibrium-means-no': { steps: ['If the student confuses H-W equilibrium with "no evolution anywhere": 1.', 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) to recall evolution is change in allele frequencies over time.', 'Revisit c11_biotech_cbse_06_005 (Meiosis I) to recall independent assortment means each locus segregates independently.', 'Do a mini-activity: Take two loci (e.g., seed shape and colour).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium.',
          parts: [
                { id: 'a', prompt: 'A researcher studies a locus with three alleles (A₁, A₂, A₃) in a population. She writes the equilibrium equation as p² + 2pq + q² = 1.', answer: 'The equation p² + 2pq + q² = 1 only applies to two alleles',
                  options: ['The equation p² + 2pq + q² = 1 only applies to two alleles', 'Hardy-Weinberg equilibrium means no evolution is occurring at all', '"Hardy-Weinberg equilibrium means no evolution is occurring at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Hardy-Weinberg equilibrium means no evolution is occurring at all." In reality, H-W equilibrium applies to a *single.' }
          ],
            remediations: { 'hardy-weinberg-equilibrium-means-no': { steps: ['If the student confuses H-W equilibrium with "no evolution anywhere": 1.', 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) to recall evolution is change in allele frequencies over time.', 'Revisit c11_biotech_cbse_06_005 (Meiosis I) to recall independent assortment means each locus segregates independently.', 'Do a mini-activity: Take two loci (e.g., seed shape and colour).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_008', difficulty: 'standard',
          question: 'Adaptive radiation is the process by which a single ancestral species rapidly.',
          hint: 'If stuck, review c12_bio_cbse_07_002 (Darwin\'s postulates) and c12_bio_cbse_07_007.',
          misconception: 'Students often think adaptive radiation happens because organisms "try" to adapt to new niches (Lamarckian view).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adaptive radiation is the process by',
                  options: ['Adaptive radiation is the process by', 'Darwin\'s theory of natural selection proposes that evolution occurs through the', 'Microevolution is the change in allele frequencies within a population over successive', 'Speciation is the evolutionary process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think adaptive radiation happens because organisms "try" to adapt to new niches (Lamarckian view).' }
          ],
            remediations: { 'adaptive-radiation-happens-because-organisms': { steps: ['If the student holds the Lamarckian misconception, have them revisit c12_bio_cbse_07_002 (Darwin\'s postulates) and.', 'Then conduct a thought experiment: "If a finch stretches its beak to reach insects, will its offspring inherit a longer.', 'Re-diagnose with DIAGNOSTIC_QUESTION_2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
