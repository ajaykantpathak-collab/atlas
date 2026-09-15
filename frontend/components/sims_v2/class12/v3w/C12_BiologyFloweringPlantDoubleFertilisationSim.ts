import type { SimDef } from '../../engine/types';
import C12_BiologyFloweringPlantDoubleFertilisationSim from '../../../simulations/c6_12/C12_BiologyFloweringPlantDoubleFertilisationSim';

/** v3 wrapped master — C12_BiologyFloweringPlantDoubleFertilisationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyfloweringplantdoublefertilisationsim: SimDef = {
    id: 'v3w_c12_biologyfloweringplantdoublefertilisationsim',
    title: 'Flowering Plant Double Fertilisation',
    subtitle: 'Covers wind (anemophily), water (hydrophily – both hypohydrophily and epihydrophily), and.',
    classLevel: 12, subject: 'biology', topic: 'Agents of Pollination: Wind, Water, Insects',
    chapters: [],
    nodeIds: ['c12_bio_cbse_02_007', 'c12_bio_cbse_02_005', 'c12_bio_cbse_02_008', 'c12_bio_cbse_02_009', 'c12_bio_cbse_02_010', 'c12_bio_cbse_02_012', 'c12_bio_cbse_01_004', 'c12_bio_cbse_01_006', 'c12_bio_cbse_01_007', 'c12_bio_cbse_02_001', 'c12_bio_cbse_01_002', 'c12_bio_cbse_02_002', 'c12_bio_cbse_02_003', 'c12_bio_cbse_02_004', 'c12_bio_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a maize field on a breezy day: clouds of yellow dust rise when you shake the tassels – that is wind.', goal: 'Master Flowering Plant Double Fertilisation.' },
    discovery: {
        question: 'Name the three major agents of pollination covered in the NCERT Class 12 syllabus and give the technical term for each.',
        options: ['Wind – anemophily', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
        answer: 'Wind – anemophily',
        hook: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are.',
    },
    teaching: [
        { title: 'Agents of pollination are biotic (insects,.', text: 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors that transfer pollen grains from the anther to the stigma of a flower, enabling fertilisation in flowering.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_007', title: 'Agents of pollination are biotic.',
          scaffold: { problem: 'A botanist finds a new grass species in the Western Ghats. Its flowers have no perianth, versatile anthers dangling on long filaments,.',
            steps: [
            { text: 'List all observed floral traits – absent perianth, versatile anthers, long filaments, feathery stigma, huge pollen.' },
            { text: 'Recall the anemophily syndrome from NCERT: flowers are small, inconspicuous, lack nectar/scent, have exposed stamens.' },
            { text: 'Match each trait: absent perianth = no investment in attraction; versatile anthers + long filaments = pollen released.' },
            { text: 'Conclude the agent is wind (anemophily) because every trait aligns with wind-pollination adaptations and N/A matches.' },
            { text: 'Verify by checking that no trait contradicts anemophily (e.g., sticky pollen would contradict).', faded: true, blankAnswer: 'The species is anemophilous (wind-pollinated). The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_005', title: 'Megasporogenesis is the process of.',
          scaffold: { problem: 'In a flowering plant with 2n = 24 chromosomes, a student observes an ovule at the 4-nucleate stage of embryo sac development.',
            steps: [
            { text: 'Identify the starting ploidy. The megaspore mother cell (MMC) is diploid (2n = 24) in G1, so it has 24 chromosomes (2C.' },
            { text: 'Trace meiosis. MMC undergoes meiosis I (reductional) → two haploid (n = 12) secondary megaspores (each 1C DNA).' },
            { text: 'Identify the functional megaspore. It is haploid (n = 12 chromosomes, 1C DNA).' },
            { text: 'Trace mitotic divisions. The functional megaspore undergoes mitosis *without cytokinesis*.' },
            { text: 'Determine chromosome number per nucleus. After each mitosis, daughter nuclei have the *same* chromosome number as the.' },
            { text: 'Determine DNA content per nucleus. After S phase of first mitosis: 2C DNA per nucleus (but still n=12 chromosomes, each.', faded: true, blankAnswer: 'Each nucleus has 12 chromosomes (n = 12) and 1C DNA.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_008', title: 'Outbreeding devices are structural,.',
          scaffold: { problem: 'In a population of maize (Zea mays), the tassel (male inflorescence) sheds pollen 2-3 days before the silk (female stigma) emerges from the.',
            steps: [
            { text: 'Identify the outbreeding device — maize exhibits protandry (a type of dichogamy) where male function precedes female.' },
            { text: 'Determine the flowering sequence — tassel matures first, releases pollen; silks emerge later.' },
            { text: 'Assess pollen availability — in a single row, pollen from early plants may reach silks of later plants.' },
            { text: 'Consider geitonogamy — pollen from one plant can fertilize silks of another plant in the same row, so kernels will form.' },
            { text: 'Conclusion — the row will produce kernels, but each plant is primarily outcrossed; self-pollination within a plant is.', faded: true, blankAnswer: 'Yes, kernels will form because pollen from early-flowering.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_009', title: 'Double fertilization is a unique.',
          scaffold: { problem: 'In a flowering plant with 2n = 24 chromosomes, a pollen grain lands on a compatible stigma.',
            steps: [
            { text: 'Identify the somatic chromosome number (2n = 24) → haploid number n = 12.' },
            { text: 'Recall that male gametes are formed by mitosis of the generative cell (haploid) → each male gamete has n = 12.' },
            { text: 'The embryo sac is formed by megasporogenesis (meiosis) → egg cell and polar nuclei are haploid → each has n = 12.' },
            { text: 'Syngamy = fusion of male gamete (n=12) + egg (n=12) → zygote chromosome number = 2n = 24.' },
            { text: 'Triple fusion = fusion of male gamete (n=12) + polar nucleus 1 (n=12) + polar nucleus 2 (n=12) → primary endosperm.', faded: true, blankAnswer: '(a) 12, (b) 12, (c) 12, (d) 24, (e) 36.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_010', title: 'Post-fertilization events in flowering.',
          scaffold: { problem: 'A researcher observes that in a certain angiosperm, the primary endosperm nucleus undergoes several free-nuclear divisions before cell.',
            steps: [
            { text: 'Recognize that free-nuclear divisions without immediate cytokinesis characterize nuclear endosperm development.' },
            { text: 'Note that subsequent cellularization yields a solid, starchy endosperm (not liquid like coconut).' },
            { text: 'Recall common examples: maize (Zea mays), wheat (Triticum aestivum), and other cereals.' },
            { text: 'Conclude the type is nuclear endosperm development.', faded: true, blankAnswer: 'Nuclear endosperm development; examples: maize, wheat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_012', title: 'Parthenocarpy is the development of.',
          scaffold: { problem: 'A horticulture student wants to produce seedless tomatoes for a greenhouse trial. She has access to NAA (synthetic auxin) and GA3.',
            steps: [
            { text: 'Identify that tomato is facultatively parthenocarpic — ovary responds to exogenous auxins.' },
            { text: 'Recall that auxin (NAA) stimulates pericarp cell division; GA3 promotes cell expansion — they act synergistically.' },
            { text: 'Protocol: Spray 50 ppm NAA + 50 ppm GA3 on emasculated flowers at anthesis; repeat after 48h.' },
            { text: 'Predict: (a) NAA alone → small, misshapen fruits (cell division without expansion); (b) GA3 alone → poor set (needs.' },
            { text: 'Verify: Seedless fruits confirm parthenocarpy; compare size/weight with pollinated control.', faded: true, blankAnswer: 'Combined NAA+GA3 treatment yields marketable seedless.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_02_005', title: 'Identify each idea',
          dissect: { specimen: 'Flowering Plant Double Fertilisation', spots: [
            { id: 's1', label: 'Agents of pollination are biotic', prompt: 'Which idea is this? — Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors.', answer: 'Agents of pollination are biotic', options: ['Agents of pollination are biotic', 'Megasporogenesis is the process of', 'Outbreeding devices are structural temporal', 'Double fertilization is a unique'] },
            { id: 's2', label: 'Megasporogenesis is the process of', prompt: 'Which idea is this? — Megasporogenesis is the process of formation of haploid megaspores from a diploid.', answer: 'Megasporogenesis is the process of', options: ['Megasporogenesis is the process of', 'Agents of pollination are biotic', 'Outbreeding devices are structural temporal', 'Double fertilization is a unique'] },
            { id: 's3', label: 'Outbreeding devices are structural temporal', prompt: 'Which idea is this? — Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in.', answer: 'Outbreeding devices are structural temporal', options: ['Outbreeding devices are structural temporal', 'Agents of pollination are biotic', 'Megasporogenesis is the process of', 'Double fertilization is a unique'] },
            { id: 's4', label: 'Double fertilization is a unique', prompt: 'Which idea is this? — Double fertilization is a unique process in flowering plants (angiosperms) where two male.', answer: 'Double fertilization is a unique', options: ['Double fertilization is a unique', 'Agents of pollination are biotic', 'Megasporogenesis is the process of', 'Outbreeding devices are structural temporal'] },
            { id: 's5', label: 'Post-fertilization events in flowering plants', prompt: 'Which idea is this? — Post-fertilization events in flowering plants encompass the development of endosperm from.', answer: 'Post-fertilization events in flowering plants', options: ['Post-fertilization events in flowering plants', 'Agents of pollination are biotic', 'Megasporogenesis is the process of', 'Outbreeding devices are structural temporal'] },
            { id: 's6', label: 'Parthenocarpy is the development of', prompt: 'Which idea is this? — Parthenocarpy is the development of fruit without fertilization of ovules, resulting in.', answer: 'Parthenocarpy is the development of', options: ['Parthenocarpy is the development of', 'Agents of pollination are biotic', 'Megasporogenesis is the process of', 'Outbreeding devices are structural temporal'] }
          ] } }
    ],
    explore: { component: C12_BiologyFloweringPlantDoubleFertilisationSim, prompt: 'Explore the interactive — Flowering Plant Double Fertilisation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_007', difficulty: 'standard',
          question: 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind,.',
          hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination.',
          misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are.',
          parts: [
                { id: 'a', prompt: 'Name the three major agents of pollination covered in the NCERT Class 12 syllabus and give the technical term for each.', answer: 'Wind – anemophily',
                  options: ['Wind – anemophily', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' },
                { id: 'b', prompt: 'Why are anemophilous flowers typically small, inconspicuous, and lacking nectar or scent?', answer: 'Wind is a non-directional, non-selective agent',
                  options: ['Wind is a non-directional, non-selective agent', 'wind cannot see colour', 'hydrophily means pollen floats on water like a boat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' },
                { id: 'c', prompt: 'A student examines a flower with long, sticky stigmas, mucilaginous pollen grains, and no nectar.', answer: 'Water (hydrophily)',
                  options: ['Water (hydrophily)', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' }
          ],
            remediations: { 'hydrophily-means-pollen-floats-on': { steps: ['Revisit c12_bio_cbse_02_001 (Flower Structure) to recall basic floral parts.', 'Watch a 5-minute video of Vallisneria male flower detachment and Zostera underwater pollen release (search “hydrophily.', 'Make a two-column table: “Epihydrophily vs. Hypohydrophily” with columns for pollen shape, stigma position, and example.', 'Re-attempt Diagnostic Question 3 and 5; if still incorrect, ask teacher for a fresh flower of Vallisneria or Hydrilla.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are.',
          parts: [
                { id: 'a', prompt: 'Design a simple field observation to distinguish whether a common roadside weed (e.g., Parthenium) is wind- or insect-pollinated.', answer: 'Steps: (1) Watch the plant for 15 min during peak flowering',
                  options: ['Steps: (1) Watch the plant for 15 min during peak flowering', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' }
          ],
            remediations: { 'hydrophily-means-pollen-floats-on': { steps: ['Revisit c12_bio_cbse_02_001 (Flower Structure) to recall basic floral parts.', 'Watch a 5-minute video of Vallisneria male flower detachment and Zostera underwater pollen release (search “hydrophily.', 'Make a two-column table: “Epihydrophily vs. Hypohydrophily” with columns for pollen shape, stigma position, and example.', 'Re-attempt Diagnostic Question 3 and 5; if still incorrect, ask teacher for a fresh flower of Vallisneria or Hydrilla.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_005', difficulty: 'standard',
          question: 'Megasporogenesis is the process of formation of haploid megaspores from a.',
          hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus on.',
          misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms.',
          parts: [
                { id: 'a', prompt: 'Name the cell that undergoes meiosis to initiate megasporogenesis and state its ploidy. Where is this cell located within the ovule?', answer: 'The megaspore mother cell (MMC) or megasporocyte',
                  options: ['The megaspore mother cell (MMC) or megasporocyte', 'functional megaspore', 'nucellar cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms *directly* from it by.' },
                { id: 'b', prompt: 'A functional megaspore undergoes three successive mitotic divisions.', answer: 'With cytokinesis after each mitosis: 1 → 2 → 4 → 8 cells (8 cells total)',
                  options: ['With cytokinesis after each mitosis: 1 → 2 → 4 → 8 cells (8 cells total)', '8 cells form directly', 'functional megaspore'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms *directly* from it by.' }
          ],
            remediations: { 'the-functional-megaspore-is-the': { steps: ['If the student draws cellular divisions at each mitotic step: (1) Revisit c11_bio_cbse_10_006 (Meiosis I) and.', '(2) Watch an animation of *Polygonum*-type embryo sac development showing free nuclear migration.', '(3) Re-draw the stages labeling "nuclei" not "cells" until the final cellularization step.', '(4) Self-test: "At the 4-nucleate stage, how many cells exist?" Answer: 1 cell with 4 nuclei.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The central cell of the mature embryo sac is diploid (2n) because it contains two polar nuclei." Evaluate this statement and correct it if.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'functional megaspore'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms *directly* from it by.' }
          ],
            remediations: { 'the-functional-megaspore-is-the': { steps: ['If the student draws cellular divisions at each mitotic step: (1) Revisit c11_bio_cbse_10_006 (Meiosis I) and.', '(2) Watch an animation of *Polygonum*-type embryo sac development showing free nuclear migration.', '(3) Re-draw the stages labeling "nuclei" not "cells" until the final cellularization step.', '(4) Self-test: "At the 4-nucleate stage, how many cells exist?" Answer: 1 cell with 4 nuclei.'] } } },
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
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_009', difficulty: 'standard',
          question: 'Double fertilization is a unique process in flowering plants (angiosperms).',
          hint: 'Review megasporogenesis (c12_bio_cbse_02_005) for embryo sac structure and.',
          misconception: 'Students often think the two male gametes are identical and either can fuse with the egg or polar nuclei randomly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double fertilization is a unique process in flowering plants (angiosperms) where two male',
                  options: ['Double fertilization is a unique process in flowering plants (angiosperms) where two male', 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors', 'Megasporogenesis is the process of formation of haploid megaspores from a diploid', 'Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the two male gametes are identical and either can fuse with the egg or polar nuclei randomly.' }
          ],
            remediations: { 'the-two-male-gametes-are': { steps: ['If the student holds this misconception: (1) Revisit c12_bio_cbse_02_005 (embryo sac structure) and identify the egg.', '(2) Watch an animation of pollen tube discharge and gamete migration (e.g., from NCERT e-content).', '(3) Draw a labeled diagram showing the two male gametes with arrows to their specific targets, writing the molecular.', '(4) Re-attempt Diagnostic Question 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_010', difficulty: 'standard',
          question: 'Post-fertilization events in flowering plants encompass the development of.',
          hint: 'If stuck, review the animation of double fertilization in c12_bio_cbse_02_009 and the.',
          misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Post-fertilization events in flowering plants encompass the development of endosperm from',
                  options: ['Post-fertilization events in flowering plants encompass the development of endosperm from', 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors', 'Megasporogenesis is the process of formation of haploid megaspores from a diploid', 'Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).' }
          ],
            remediations: { 'the-suspensor-becomes-part-of': { steps: ['Revisit node c12_bio_cbse_02_009 (Double Fertilization) to reinforce the origin of zygote and primary endosperm nucleus.', 'Then review the worked examples below, focusing on the asymmetric first division and the distinct fates of basal vs.', 'Use a prepared slide of Capsella embryo stages to visually confirm the suspensor’s degeneration.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).',
          parts: [
                { id: 'a', prompt: 'A student claims: "In albuminous seeds like castor, the endosperm persists and nourishes the germinating seedling; in exalbuminous seeds like pea, the.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'the suspensor becomes part of the mature embryo (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).' },
                { id: 'b', prompt: 'Design a simple experiment using a dissecting microscope to observe the stages of embryo development in a cleistogamous flower (e.g., Oxalis) at different days.', answer: 'Collect flowers at 1, 3, 5, 7, 10 days after pollination',
                  options: ['Collect flowers at 1, 3, 5, 7, 10 days after pollination', 'the suspensor becomes part of the mature embryo (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).' }
          ],
            remediations: { 'the-suspensor-becomes-part-of': { steps: ['Revisit node c12_bio_cbse_02_009 (Double Fertilization) to reinforce the origin of zygote and primary endosperm nucleus.', 'Then review the worked examples below, focusing on the asymmetric first division and the distinct fates of basal vs.', 'Use a prepared slide of Capsella embryo stages to visually confirm the suspensor’s degeneration.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_012', difficulty: 'standard',
          question: 'Parthenocarpy is the development of fruit without fertilization of ovules,.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 2 section "Fruit and Seed Formation" and Class.',
          misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast parthenocarpy and apomixis in terms of: (i) process, (ii) genetic makeup of offspring, (iii) commercial utility.', answer: '(i) Parthenocarpy: fruit without fertilization → no seeds',
                  options: ['(i) Parthenocarpy: fruit without fertilization → no seeds', 'seedless', 'Parthenocarpy is formation of seeds without fertilization'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.' }
          ],
            remediations: { 'parthenocarpy-and-apomixis-are-the': { steps: ['Revisit c12_bio_cbse_02_009 (Double Fertilization) — confirm that normal fruit requires zygote+endosperm formation.', 'Review c11_bio_cbse_13_003/13_004 (Auxins, Gibberellins) — list hormone functions in fruit set.', 'Draw a 2-column table: Parthenocarpy vs Apomixis with rows for trigger, product, genetic consequence, examples.', 'Re-attempt Diagnostic Q4 — if still confused, watch NCERT video on "Parthenocarpy and Apomixis" and redo table from.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment to test whether a new cucumber variety is facultatively parthenocarpic (sets fruit without pollination but also with pollination).', answer: 'Control: flowers bagged before anthesis, hand-pollinated with viable pollen',
                  options: ['Control: flowers bagged before anthesis, hand-pollinated with viable pollen', 'seedless', 'Parthenocarpy is formation of seeds without fertilization', 'parthenocarpy and apomixis are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.' },
                { id: 'b', prompt: 'Compare and contrast parthenocarpy and apomixis in terms of: (i) process, (ii) genetic makeup of offspring, (iii) commercial utility.', answer: '(i) Parthenocarpy: fruit without fertilization → no seeds',
                  options: ['(i) Parthenocarpy: fruit without fertilization → no seeds', 'seedless', 'Parthenocarpy is formation of seeds without fertilization', 'parthenocarpy and apomixis are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.' }
          ],
            remediations: { 'parthenocarpy-and-apomixis-are-the': { steps: ['Revisit c12_bio_cbse_02_009 (Double Fertilization) — confirm that normal fruit requires zygote+endosperm formation.', 'Review c11_bio_cbse_13_003/13_004 (Auxins, Gibberellins) — list hormone functions in fruit set.', 'Draw a 2-column table: Parthenocarpy vs Apomixis with rows for trigger, product, genetic consequence, examples.', 'Re-attempt Diagnostic Q4 — if still confused, watch NCERT video on "Parthenocarpy and Apomixis" and redo table from.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
