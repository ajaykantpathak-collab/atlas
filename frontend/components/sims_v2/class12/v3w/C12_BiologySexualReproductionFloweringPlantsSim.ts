import type { SimDef } from '../../engine/types';
import C12_BiologySexualReproductionFloweringPlantsSim from '../../../simulations/c6_12/C12_BiologySexualReproductionFloweringPlantsSim';

/** v3 wrapped master — C12_BiologySexualReproductionFloweringPlantsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologysexualreproductionfloweringplantssim: SimDef = {
    id: 'v3w_c12_biologysexualreproductionfloweringplantssim',
    title: 'Outbreeding Devices: Preventing Self-Pollination',
    subtitle: 'This node covers outbreeding devices (dichogamy, herkogamy, self-incompatibility, male.',
    classLevel: 12, subject: 'biology', topic: 'Outbreeding Devices: Preventing Self-Pollination',
    chapters: [],
    nodeIds: ['c12_bio_cbse_02_008', 'c12_bio_cbse_01_003', 'c12_bio_cbse_01_004', 'c12_bio_cbse_02_001', 'c12_bio_cbse_07_007', 'c12_bio_cbse_02_002', 'c12_bio_cbse_02_004', 'c12_bio_cbse_02_010', 'c12_bio_cbse_01_001', 'c12_bio_cbse_01_002', 'c12_bio_cbse_02_003', 'c12_bio_cbse_02_005', 'c12_bio_cbse_02_006', 'c12_bio_cbse_02_007', 'c12_bio_cbse_02_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a mustard field in Punjab where a farmer notices that isolated plants produce very few seeds, but.', goal: 'Master Outbreeding Devices: Preventing Self-Pollination.' },
    discovery: {
        question: 'A plant breeder working with Brassica napus (rapeseed) finds that self-pollination fails to set seeds even though pollen is viable and stigma is receptive.',
        options: ['The device is sporophytic self-incompatibility (SSI)', 'outbreeding devices', 'pollination agents'],
        answer: 'The device is sporophytic self-incompatibility (SSI)',
        hook: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.',
    },
    teaching: [
        { title: 'Outbreeding devices are structural,.', text: 'Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in flowering plants that prevent self-pollination and promote cross-pollination, thereby increasing genetic diversity.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_008', title: 'Outbreeding devices are structural,.',
          scaffold: { problem: 'In a population of maize (Zea mays), the tassel (male inflorescence) sheds pollen 2-3 days before the silk (female stigma) emerges from the.',
            steps: [
            { text: 'Identify the outbreeding device — maize exhibits protandry (a type of dichogamy) where male function precedes female.' },
            { text: 'Determine the flowering sequence — tassel matures first, releases pollen; silks emerge later.' },
            { text: 'Assess pollen availability — in a single row, pollen from early plants may reach silks of later plants.' },
            { text: 'Consider geitonogamy — pollen from one plant can fertilize silks of another plant in the same row, so kernels will form.' },
            { text: 'Conclusion — the row will produce kernels, but each plant is primarily outcrossed; self-pollination within a plant is.', faded: true, blankAnswer: 'Yes, kernels will form because pollen from early-flowering.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_01_003', title: 'Vegetative propagation is a mode of.',
          scaffold: { problem: 'A farmer wants to propagate a high-yielding, disease-resistant mango variety \'Amrapali\' on a large scale.',
            steps: [
            { text: 'Identify the biological constraint — mango is recalcitrant to adventitious rooting (low auxin sensitivity, high.' },
            { text: 'Recall grafting principle — scion genotype retained entirely; rootstock (e.g., \'Olour\') confers dwarfing, early.' },
            { text: 'Recall micropropagation principle — axillary bud proliferation on cytokinin-rich medium (BAP 2–5 mg/L) → shoots → root.' },
            { text: 'Evaluate scalability — grafting: limited by rootstock seedling availability and skilled grafters (~500.' },
            { text: 'Time to fruiting — grafted plants fruit in 2–3 years (mature scion physiology); micropropagated plants show juvenile.' },
            { text: 'Synthesize — for 10,000 plants/year with early fruiting, grafting on dwarfing rootstock is commercially preferred;.', faded: true, blankAnswer: 'Grafting is superior for commercial mango propagation:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_01_004', title: 'Sexual reproduction is a biological.',
          scaffold: { problem: 'A farmer grows a new variety of wheat that produces abundant pollen but sets very few grains.',
            steps: [
            { text: 'Recognize that pollen production (microsporogenesis) and release are normal → pre-fertilization gametogenesis is.' },
            { text: 'Note that pollen lands on stigma (pollination occurs) but pollen tube growth is impaired → the failure is in.' },
            { text: 'Recall that pollen tube growth delivers male gametes to the embryo sac; slow growth means gametes don\'t reach the egg.' },
            { text: 'Without fertilization, no zygote forms → no embryo, no endosperm → ovule aborts → no seed (grain) develops.' },
            { text: 'Conclude: The affected phase is pre-fertilization (specifically pollen-pistil interaction / pollen tube growth), and.', faded: true, blankAnswer: 'Affected phase: Pre-fertilization. Specific process:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_001', title: 'A flower is the specialized.',
          scaffold: { problem: 'A student observes a flower with 5 sepals (free), 5 petals (free), 10 stamens (diadelphous, 9+1), and a single carpel with a superior.',
            steps: [
            { text: 'Identify symmetry — flower can be divided into two equal halves in one vertical plane only → zygomorphic (↑).' },
            { text: 'Identify sexuality — both stamens and carpel present → bisexual (♂♀).' },
            { text: 'Record whorls: K5 (5 free sepals), C5 (5 free petals), A(9)+1 (diadelphous stamens), G1 (monocarpellary, superior.' },
            { text: 'Write formula: ↑ ♂♀ K5 C5 A(9)+1 G1.' },
            { text: 'Match to family — Fabaceae (Papilionoideae). Diadelphous stamens form a keel that encloses reproductive parts; when a.', faded: true, blankAnswer: 'Floral formula: ↑ ♂♀ K5 C5 A(9)+1 G1. Family: Fabaceae..' }
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
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_002', title: 'The stamen is the male reproductive.',
          scaffold: { problem: 'A botanist examines a transverse section of a young anther from a tomato plant (Solanum lycopersicum) and observes that the middle layers.',
            steps: [
            { text: 'Identify the structure — transverse section of anther showing wall layers and central sporogenous tissue.' },
            { text: 'Recall developmental sequence — in young anther, all four wall layers are distinct; middle layers degenerate early (1–2.' },
            { text: 'Match observation — crushed middle layers + dense tapetal cytoplasm = early microsporangium development, just before or.' },
            { text: 'Link tapetal density to function — dense cytoplasm = high ER, dictyosomes, mitochondria → active synthesis of enzymes.' },
            { text: 'Conclude — specimen is at pre-meiotic/meiotic stage; tapetum is in secretory phase, preparing to support.', faded: true, blankAnswer: 'The anther is at the pre-meiotic to meiotic stage.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_01_003', title: 'Identify each idea',
          dissect: { specimen: 'Outbreeding Devices: Preventing Self-Pollination', spots: [
            { id: 's1', label: 'Outbreeding devices are structural temporal', prompt: 'Which idea is this? — Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in.', answer: 'Outbreeding devices are structural temporal', options: ['Outbreeding devices are structural temporal', 'Vegetative propagation is a mode', 'Sexual reproduction is a biological', 'A flower is the specialized'] },
            { id: 's2', label: 'Vegetative propagation is a mode', prompt: 'Which idea is this? — Vegetative propagation is a mode of asexual reproduction in plants where new individuals.', answer: 'Vegetative propagation is a mode', options: ['Vegetative propagation is a mode', 'Outbreeding devices are structural temporal', 'Sexual reproduction is a biological', 'A flower is the specialized'] },
            { id: 's3', label: 'Sexual reproduction is a biological', prompt: 'Which idea is this? — Sexual reproduction is a biological process involving the formation and fusion of male.', answer: 'Sexual reproduction is a biological', options: ['Sexual reproduction is a biological', 'Outbreeding devices are structural temporal', 'Vegetative propagation is a mode', 'A flower is the specialized'] },
            { id: 's4', label: 'A flower is the specialized', prompt: 'Which idea is this? — A flower is the specialized reproductive shoot of an angiosperm, composed of four.', answer: 'A flower is the specialized', options: ['A flower is the specialized', 'Outbreeding devices are structural temporal', 'Vegetative propagation is a mode', 'Sexual reproduction is a biological'] },
            { id: 's5', label: 'Speciation is the evolutionary process', prompt: 'Which idea is this? — Speciation is the evolutionary process by which populations of a single species diverge.', answer: 'Speciation is the evolutionary process', options: ['Speciation is the evolutionary process', 'Outbreeding devices are structural temporal', 'Vegetative propagation is a mode', 'Sexual reproduction is a biological'] },
            { id: 's6', label: 'The stamen is the male', prompt: 'Which idea is this? — The stamen is the male reproductive organ of a flowering plant, consisting of a.', answer: 'The stamen is the male', options: ['The stamen is the male', 'Outbreeding devices are structural temporal', 'Vegetative propagation is a mode', 'Sexual reproduction is a biological'] }
          ] } }
    ],
    explore: { component: C12_BiologySexualReproductionFloweringPlantsSim, prompt: 'Explore the interactive — Outbreeding Devices: Preventing Self-Pollination' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_008', difficulty: 'standard',
          question: 'Outbreeding devices are structural, temporal, biochemical, or genetic.',
          hint: 'If stuck, review c12_bio_cbse_02_006 (Pollination Types) and c12_bio_cbse_02_001 (Flower.',
          misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A plant breeder working with Brassica napus (rapeseed) finds that self-pollination fails to set seeds even though pollen is viable and stigma is receptive.', answer: 'The device is sporophytic self-incompatibility (SSI)',
                  options: ['The device is sporophytic self-incompatibility (SSI)', 'outbreeding devices', 'pollination agents'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.' }
          ],
            remediations: { 'outbreeding-devices-and-pollination-agents': { steps: ['If a student confuses outbreeding devices with pollination agents, have them revisit c12_bio_cbse_02_007 (Agents of.', 'For self-incompatibility confusion, review the S-locus genetics in c11_biotech_cbse_06_006 (Multiple Alleles: ABO Blood.', 'Then re-attempt Diagnostic Questions 3 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Male sterility is the most effective outbreeding device because it completely eliminates the possibility of self-pollination." Provide.', answer: 'First, male sterility only prevents the plant from acting as a male parent',
                  options: ['First, male sterility only prevents the plant from acting as a male parent', 'outbreeding devices', 'pollination agents', '"outbreeding devices" and "pollination agents" are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.' },
                { id: 'b', prompt: 'Design a simple field experiment to test whether a newly discovered flowering plant species relies primarily on dichogamy or herkogamy for outbreeding.', answer: 'Tag 20 flowers at bud stage',
                  options: ['Tag 20 flowers at bud stage', 'outbreeding devices', 'pollination agents', '"outbreeding devices" and "pollination agents" are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.' }
          ],
            remediations: { 'outbreeding-devices-and-pollination-agents': { steps: ['If a student confuses outbreeding devices with pollination agents, have them revisit c12_bio_cbse_02_007 (Agents of.', 'For self-incompatibility confusion, review the S-locus genetics in c11_biotech_cbse_06_006 (Multiple Alleles: ABO Blood.', 'Then re-attempt Diagnostic Questions 3 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_003', difficulty: 'standard',
          question: 'Vegetative propagation is a mode of asexual reproduction in plants where new.',
          hint: 'If stuck on why cuttings root: revisit c11_bio_cbse_13_003 (auxin transport and root.',
          misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always.',
          parts: [
                { id: 'a', prompt: 'Name the type of vegetative propagule in each: (a) Offset of water hyacinth, (b) Bulbil of Dioscorea, (c) Runner of strawberry, (d) Tuber of potato.', answer: 'Offset of water hyacinth, (',
                  options: ['Offset of water hyacinth, (', 'vegetative propagation produces exact genetic clones with zero variation', 'tissue culture always yields true-to-type plants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always yields true-to-type.' }
          ],
            remediations: { 'vegetative-propagation-produces-exact-genetic': { steps: ['If the student confuses stem vs root tubers: revisit c11_bio_cbse_05_001 (Root: Types and Modifications) and.', 'If auxin role is unclear: review c11_bio_cbse_13_003 (Plant Growth Regulators: Auxins) — perform the classic oat.', 'Re-diagnostic: take a potato and sweet potato, slice longitudinally, draw and label nodes/internodes — which has them?'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Vegetative propagation is evolutionarily disadvantageous because it produces genetically identical offspring, eliminating variation.', answer: 'Counterargument 1: **Rapid colonization of stable, favorable habitats**',
                  options: ['Counterargument 1: **Rapid colonization of stable, favorable habitats**', 'vegetative propagation produces exact genetic clones with zero variation', 'tissue culture always yields true-to-type plants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always yields true-to-type.' }
          ],
            remediations: { 'vegetative-propagation-produces-exact-genetic': { steps: ['If the student confuses stem vs root tubers: revisit c11_bio_cbse_05_001 (Root: Types and Modifications) and.', 'If auxin role is unclear: review c11_bio_cbse_13_003 (Plant Growth Regulators: Auxins) — perform the classic oat.', 'Re-diagnostic: take a potato and sweet potato, slice longitudinally, draw and label nodes/internodes — which has them?'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_004', difficulty: 'standard',
          question: 'Sexual reproduction is a biological process involving the formation and fusion.',
          hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_008 (Significance.',
          misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that.',
          parts: [
                { id: 'a', prompt: 'Name the three sequential phases of sexual reproduction and state the defining event of each phase.', answer: 'The three phases are: (1) Pre-fertilization',
                  options: ['The three phases are: (1) Pre-fertilization', 'pollination, fertilization, seed formation', 'meiosis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that gametogenesis.' }
          ],
            remediations: { 'pre-fertilization-only-means-pollination': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to recall that meiosis produces haploid.', 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) to connect flower parts to gamete-producing structures.', 'Draw a flowchart: Diploid sporophyte → (meiosis) → Haploid spores → (mitosis) → Gametophytes → Gametes →.', 'Self-test: "In which phase does meiosis occur? What is the ploidy of cells entering meiosis?'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Pre-fertilization events in flowering plants and humans are fundamentally different because plants are sessile and humans are.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'no similarities', 'plants don\'t have pre-fertilization phase', 'pre-fertilization'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that gametogenesis.' },
                { id: 'b', prompt: 'Design a simple observation-based activity to demonstrate that pre-fertilization, fertilization, and post-fertilization are sequential and interdependent.', answer: 'Use a hibiscus plant in your garden',
                  options: ['Use a hibiscus plant in your garden', 'pre-fertilization'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that gametogenesis.' }
          ],
            remediations: { 'pre-fertilization-only-means-pollination': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to recall that meiosis produces haploid.', 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) to connect flower parts to gamete-producing structures.', 'Draw a flowchart: Diploid sporophyte → (meiosis) → Haploid spores → (mitosis) → Gametophytes → Gametes →.', 'Self-test: "In which phase does meiosis occur? What is the ploidy of cells entering meiosis?'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_001', difficulty: 'standard',
          question: 'A flower is the specialized reproductive shoot of an angiosperm, composed of.',
          hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
          misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
          parts: [
                { id: 'a', prompt: 'Name the four whorls of a typical angiosperm flower in correct acropetal order (from base to apex) and state the primary function of each whorl in one phrase.', answer: 'Calyx (sepals) – protection of bud',
                  options: ['Correct answer: Calyx (sepals) – protection of bud', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'In a longitudinal section of a flower, you observe that the thalamus is cup-shaped and the ovary sits at the bottom of the cup with sepals, petals, and stamens.', answer: 'The ovary is inferior (epigynous flower)',
                  options: ['Correct answer: The ovary is inferior (epigynous flower)', 'superior ovary', 'fruit type unchanged'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'c', prompt: 'Compare the floral formulae of Brassicaceae (⊕ ♂♀ K4 C4 A2+4 G(2)) and Fabaceae (↑ ♂♀ K(5) C1+2+(2) A(9)+1 G1).', answer: 'Brassicaceae has tetradynamous stamens (2+4) and a syncarpous',
                  options: ['Correct answer: Brassicaceae has tetradynamous stamens (2+4) and a syncarpous', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' }
          ],
            remediations: { 'complete-flower-bisexual-flower-and': { steps: ['Revisit Class 11 node c11_bio_cbse_05_005 (Flower: Structure and Parts) and c11_bio_cbse_05_006 (Androecium and.', 'Draw four flowers: (a) complete bisexual, (b) incomplete bisexual, (c) complete unisexual (impossible — explain why),.', 'Write floral formulae for each.', 'Re-attempt Diagnostic Question 2. If still wrong, watch a 5-min video on "floral morphology terms" and redo step 2 with.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In a zygomorphic flower, the calyx is always bilabiate and the corolla is always papilionaceous." Is it correct?', answer: 'The statement is false',
                  options: ['Correct answer: The statement is false', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'Design a simple field observation to distinguish between a hypogynous, perigynous, and epigynous flower using only a hand lens and a scalpel.', answer: 'Expected answer: Step 1: Pick a fresh flower',
                  options: ['Expected answer: Step 1: Pick a fresh flower', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' }
          ],
            remediations: { 'complete-flower-bisexual-flower-and': { steps: ['Revisit Class 11 node c11_bio_cbse_05_005 (Flower: Structure and Parts) and c11_bio_cbse_05_006 (Androecium and.', 'Draw four flowers: (a) complete bisexual, (b) incomplete bisexual, (c) complete unisexual (impossible — explain why),.', 'Write floral formulae for each.', 'Re-attempt Diagnostic Question 2. If still wrong, watch a 5-min video on "floral morphology terms" and redo step 2 with.'] } } },
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
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_002', difficulty: 'standard',
          question: 'The stamen is the male reproductive organ of a flowering plant, consisting of a.',
          hint: 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) — focus on anther types,.',
          misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stamen is the male reproductive organ of a flowering plant, consisting of a',
                  options: ['The stamen is the male reproductive organ of a flowering plant, consisting of a', 'Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in', 'Vegetative propagation is a mode of asexual reproduction in plants where new individuals', 'Sexual reproduction is a biological process involving the formation and fusion of male'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.' }
          ],
            remediations: { 'the-tapetum-is-haploid-because': { steps: ['Revisit c11_bio_cbse_05_006 (Androecium and Gynoecium) to re-learn stamen parts and anther types (dithecous vs.', 'Watch a video of anther transverse section (search "anther TS tapetum") to visualise the four wall layers in 3D.', 'Make a table comparing each wall layer: position, ploidy, key feature, fate, function.', 'Re-attempt Diagnostic Questions 2 and 5 — they test the exact tapetum misconceptions.', 'If still stuck, ask your teacher to show a permanent slide of young vs mature anther TS under the microscope.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The tapetum is the only anther wall layer that contributes directly to the pollen wall (exine)." Is this true or false?', answer: 'TRUE',
                  options: ['Correct answer: TRUE', 'False, endothecium also contributes', 'inside'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.' }
          ],
            remediations: { 'the-tapetum-is-haploid-because': { steps: ['Revisit c11_bio_cbse_05_006 (Androecium and Gynoecium) to re-learn stamen parts and anther types (dithecous vs.', 'Watch a video of anther transverse section (search "anther TS tapetum") to visualise the four wall layers in 3D.', 'Make a table comparing each wall layer: position, ploidy, key feature, fate, function.', 'Re-attempt Diagnostic Questions 2 and 5 — they test the exact tapetum misconceptions.', 'If still stuck, ask your teacher to show a permanent slide of young vs mature anther TS under the microscope.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
