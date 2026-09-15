import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch02_p2: SimDef = {
    id: 'v3_c12_bio_ch02_p2',
    title: 'Sexual Reproduction in Flowering Plants · Part 2/2',
    subtitle: 'Inside a hibiscus: four whorls, four pollen sacs, one precise machine.',
    classLevel: 12, subject: 'biology', topic: 'Sexual Reproduction in Flowering Plants · Part 2/2',
    chapters: ['c12_bio_ch02'],
    nodeIds: ['c12_bio_cbse_02_007', 'c12_bio_cbse_02_008', 'c12_bio_cbse_02_009', 'c12_bio_cbse_02_010', 'c12_bio_cbse_02_011', 'c12_bio_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant anatomist mapping a flower', intro: 'Every fruit you eat began as a flower executing a sequence older than humans — here\'s its blueprint.', goal: 'Identify floral whorls and trace microsporogenesis in the anther.' },
    discovery: {
        question: 'Tap a hibiscus anther over dark paper and yellow dust falls — pollen. Inside that anther, what actually produced each grain?',
        options: ['Microspore mother cells in the pollen sacs underwent meiosis to form haploid microspores', 'The stigma secreted pollen onto the anther during pollination', 'Petals shed cells that matured into pollen grains on the anther surface', 'Pollen mother cells divided by mitosis, keeping the diploid number'],
        answer: 'Microspore mother cells in the pollen sacs underwent meiosis to form haploid microspores',
        hook: 'Pollen feels like powder, not biology — but each grain is a meiotic product carrying half the genome, made inside the anther\'s microsporangia long before any pollinator arrives.',
    },
    teaching: [
        { title: 'Agents of Pollination: Wind, Water, Insects', text: 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors that transfer pollen grains from the anther to the stigma of a flower, enabling fertilisation in flowering.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_02_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Dissect a flower layer by layer: identify all four whorls on the thalamus, slice a young anther to expose its four microsporangia, and trace pollen from meiosis to the stigma.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_007', title: 'Agents of Pollination: Wind, Water, Insects',
          caseStudy: { intro: 'Observe a maize field on a breezy day: clouds of yellow dust rise when you shake the tassels – that is wind doing the work of a pollinator.',
            decisions: [{ prompt: 'Name the three major agents of pollination covered in the NCERT Class 12 syllabus and give the technical term for each.', options: [
                { text: 'Wind – anemophily', outcome: 'Wind – anemophily; Water – hydrophily; Insects – entomophily. A wrong answer (e.g., listing birds.' },
                { text: 'hydrophily means pollen floats on water like a boat', outcome: 'Not quite — Students often think “hydrophily means pollen floats on water like a boat” and assume all.', reveals: 'hydrophily-means-pollen-floats-on' },
                { text: 'birds or bats', outcome: 'Not quite — Students often think “hydrophily means pollen floats on water like a boat” and assume all.', reveals: 'hydrophily-means-pollen-floats-on' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_008', title: 'Outbreeding Devices: Preventing Self-Pollination',
          caseStudy: { intro: 'Imagine a mustard field in Punjab where a farmer notices that isolated plants produce very few seeds, but plants growing in dense patches set abundant pods.',
            decisions: [{ prompt: 'Define dichogamy and give one example each of protandry and protogyny from flowering plants.', options: [
                { text: 'Dichogamy is the temporal separation of anther dehiscence (pollen release) and stigma', outcome: 'Dichogamy is the temporal separation of anther dehiscence (pollen release) and stigma receptivity.' },
                { text: 'outbreeding devices', outcome: 'Not quite — Students often think "outbreeding devices" and "pollination agents" are the same thing.', reveals: 'outbreeding-devices-and-pollination-agents' },
                { text: 'pollination agents', outcome: 'Not quite — Students often think "outbreeding devices" and "pollination agents" are the same thing.', reveals: 'outbreeding-devices-and-pollination-agents' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_009', title: 'Double Fertilization: Syngamy and Triple Fusion',
          scaffold: { problem: 'In a flowering plant with 2n = 24 chromosomes, a pollen grain lands on a compatible stigma.',
            steps: [
            { text: 'Identify the somatic chromosome number (2n = 24) → haploid number n = 12.' },
            { text: 'Recall that male gametes are formed by mitosis of the generative cell (haploid) → each male gamete has n = 12.' },
            { text: 'The embryo sac is formed by megasporogenesis (meiosis) → egg cell and polar nuclei are haploid → each has n = 12.' },
            { text: 'Syngamy = fusion of male gamete (n=12) + egg (n=12) → zygote chromosome number = 2n = 24.' },
            { text: 'Triple fusion = fusion of male gamete (n=12) + polar nucleus 1 (n=12) + polar nucleus 2 (n=12) → primary endosperm.', faded: true, blankAnswer: '(a) 12, (b) 12, (c) 12, (d) 24, (e) 36.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_010', title: 'Post-fertilization Events: Endosperm and Embryo Development',
          caseStudy: { intro: 'Observe a developing pea pod or maize cob in a kitchen garden: the tiny ovules inside the ovary swell into seeds after fertilization.',
            decisions: [{ prompt: 'What is the ploidy of the primary endosperm nucleus and how is it formed?', options: [
                { text: 'The primary endosperm nucleus is triploid (3n), formed by the fusion of one male gamete', outcome: 'The primary endosperm nucleus is triploid (3n), formed by the fusion of one male gamete with the.' },
                { text: 'the suspensor becomes part of the mature embryo (e', outcome: 'Not quite — Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).', reveals: 'the-suspensor-becomes-part-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_011', title: 'Seed Development and Dormancy',
          caseStudy: { intro: 'Begin with a real-world observation: a farmer stores wheat grains for months but they sprout only after the monsoon rains — why don\'t they germinate.',
            decisions: [{ prompt: 'What are the three structures that develop from the ovule after fertilization, and which precursor gives rise to each?', options: [
                { text: 'The embryo develops from the zygote, the endosperm develops from the primary endosperm', outcome: 'The embryo develops from the zygote, the endosperm develops from the primary endosperm nucleus.' },
                { text: 'dormant seeds are dead or inactive', outcome: 'Not quite — Students believe "dormant seeds are dead or inactive" and that "breaking dormancy means activating.', reveals: 'dormant-seeds-are-dead-or' },
                { text: 'breaking dormancy means activating the seed', outcome: 'Not quite — Students believe "dormant seeds are dead or inactive" and that "breaking dormancy means activating.', reveals: 'dormant-seeds-are-dead-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_012', title: 'Fruit Formation: Parthenocarpic Fruits',
          caseStudy: { intro: 'Observe a seedless grape or banana from your kitchen — notice there are no seeds inside despite being a mature fruit.',
            decisions: [{ prompt: 'Define parthenocarpy and give two examples of naturally parthenocarpic fruits.', options: [
                { text: 'Parthenocarpy is fruit development without fertilization, producing seedless fruits', outcome: 'Parthenocarpy is fruit development without fertilization, producing seedless fruits.' },
                { text: 'fruit without seeds', outcome: 'Not quite — Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.', reveals: 'parthenocarpy-and-apomixis-are-the' },
                { text: 'seedless', outcome: 'Not quite — Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.', reveals: 'parthenocarpy-and-apomixis-are-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Sexual Reproduction in Flowering Plants · Part 2/2', spots: [
            { id: 's1', label: 'Agents of Pollination Wind Water Insects', prompt: 'Which idea is this? — Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors.', answer: 'Agents of Pollination Wind Water Insects', options: ['Agents of Pollination Wind Water Insects', 'Outbreeding Devices Preventing Self-Pollination', 'Double Fertilization Syngamy and Triple Fusion', 'Post-fertilization Events Endosperm and Embryo Development'] },
            { id: 's2', label: 'Outbreeding Devices Preventing Self-Pollination', prompt: 'Which idea is this? — Outbreeding devices are structural, temporal, biochemical, or genetic mechanisms.', answer: 'Outbreeding Devices Preventing Self-Pollination', options: ['Outbreeding Devices Preventing Self-Pollination', 'Agents of Pollination Wind Water Insects', 'Double Fertilization Syngamy and Triple Fusion', 'Post-fertilization Events Endosperm and Embryo Development'] },
            { id: 's3', label: 'Double Fertilization Syngamy and Triple Fusion', prompt: 'Which idea is this? — Double fertilization is a unique process in flowering plants (angiosperms) where two male.', answer: 'Double Fertilization Syngamy and Triple Fusion', options: ['Double Fertilization Syngamy and Triple Fusion', 'Agents of Pollination Wind Water Insects', 'Outbreeding Devices Preventing Self-Pollination', 'Post-fertilization Events Endosperm and Embryo Development'] },
            { id: 's4', label: 'Post-fertilization Events Endosperm and Embryo Development', prompt: 'Which idea is this? — Post-fertilization events in flowering plants encompass the development of endosperm from.', answer: 'Post-fertilization Events Endosperm and Embryo Development', options: ['Post-fertilization Events Endosperm and Embryo Development', 'Agents of Pollination Wind Water Insects', 'Outbreeding Devices Preventing Self-Pollination', 'Double Fertilization Syngamy and Triple Fusion'] },
            { id: 's5', label: 'Seed Development and Dormancy', prompt: 'Which idea is this? — Seed development is the process by which a fertilized ovule matures into a seed.', answer: 'Seed Development and Dormancy', options: ['Seed Development and Dormancy', 'Agents of Pollination Wind Water Insects', 'Outbreeding Devices Preventing Self-Pollination', 'Double Fertilization Syngamy and Triple Fusion'] },
            { id: 's6', label: 'Fruit Formation Parthenocarpic Fruits', prompt: 'Which idea is this? — Parthenocarpy is the development of fruit without fertilization of ovules, resulting.', answer: 'Fruit Formation Parthenocarpic Fruits', options: ['Fruit Formation Parthenocarpic Fruits', 'Agents of Pollination Wind Water Insects', 'Outbreeding Devices Preventing Self-Pollination', 'Double Fertilization Syngamy and Triple Fusion'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a herbarium field project, a student presses a small greenish flower that has no petals at all but does carry both stamens and carpels. She labels the sheet \'incomplete flower, therefore unisexual\'.',
            decisions: [{ prompt: 'Did she classify it correctly?', options: [
                { text: 'Half right — missing a whorl makes it incomplete, but both androecium and gynoecium are present, so it\'s still bisexual; completeness counts whorls, sexuality counts reproductive organs.', outcome: 'The two terms operate at different levels — a flower can be incomplete yet bisexual, and that distinction decides pollination questions.' },
                { text: 'Correct — a flower missing a whorl is unisexual because \'incomplete\' and \'unisexual\' describe the same thing.', outcome: 'That conflates whorl count with sex condition; the flower has functional male and female organs, so it is bisexual.', reveals: 'incomplete-equals-unisexual' },
                { text: 'It can\'t be bisexual — without petals there\'s no corolla, and bisexual flowers need all four whorls.', outcome: 'Bisexuality needs only both reproductive whorls; petals are for attracting pollinators, not for determining sex.', reveals: 'bisexual-needs-four-whorls' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You now see a flower as a reproductive machine, not decoration. Floral whorls and anther anatomy are board-diagram gold — and the foundation of every crop-breeding programme.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_007', difficulty: 'standard',
          question: 'Agents of pollination are biotic (insects, birds, bats) and abiotic (wind.',
          hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination.',
          misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are.',
          parts: [
                { id: 'a', prompt: 'Name the three major agents of pollination covered in the NCERT Class 12 syllabus and give the technical term for each.', answer: 'Wind – anemophily',
                  options: ['Wind – anemophily', 'hydrophily means pollen floats on water like a boat', 'birds or bats', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination types are.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' },
                { id: 'b', prompt: 'Why are anemophilous flowers typically small, inconspicuous, and lacking nectar or scent?', answer: 'Wind is a non-directional, non-selective agent',
                  options: ['Wind is a non-directional, non-selective agent', 'wind cannot see colour', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination types are.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' },
                { id: 'c', prompt: 'A student examines a flower with long, sticky stigmas, mucilaginous pollen grains, and no nectar.', answer: 'Water (hydrophily)',
                  options: ['Water (hydrophily)', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination types are.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' }
          ],
            remediations: { 'hydrophily-means-pollen-floats-on': { steps: ['Revisit c12_bio_cbse_02_001 (Flower Structure) to recall basic floral parts.', 'Watch a 5-minute video of Vallisneria male flower detachment and Zostera underwater pollen release (search “hydrophily.', 'Make a two-column table: “Epihydrophily vs. Hypohydrophily” with columns for pollen shape, stigma position, and example.', 'Re-attempt Diagnostic Question 3 and 5; if still incorrect, ask teacher for a fresh flower of Vallisneria or Hydrilla.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are.',
          parts: [
                { id: 'a', prompt: 'Design a simple field observation to distinguish whether a common roadside weed (e.g., Parthenium) is wind- or insect-pollinated.', answer: 'Steps: (1) Watch the plant for 15 min during peak flowering',
                  options: ['Steps: (1) Watch the plant for 15 min during peak flowering', 'hydrophily means pollen floats on water like a boat', 'all water-pollinated flowers are surface-floating (epihydrophily)'],
                  hint: 'If floral parts are unclear, review c12_bio_cbse_02_001 and c9_bio_ch3_5; if pollination types are.',
                  misconception: 'Students often think “hydrophily means pollen floats on water like a boat” and assume all water-pollinated flowers are surface-floating.' }
          ],
            remediations: { 'hydrophily-means-pollen-floats-on': { steps: ['Revisit c12_bio_cbse_02_001 (Flower Structure) to recall basic floral parts.', 'Watch a 5-minute video of Vallisneria male flower detachment and Zostera underwater pollen release (search “hydrophily.', 'Make a two-column table: “Epihydrophily vs. Hypohydrophily” with columns for pollen shape, stigma position, and example.', 'Re-attempt Diagnostic Question 3 and 5; if still incorrect, ask teacher for a fresh flower of Vallisneria or Hydrilla.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_008', difficulty: 'standard',
          question: 'Outbreeding devices are structural, temporal, biochemical, or genetic.',
          hint: 'If stuck, review c12_bio_cbse_02_006 (Pollination Types) and c12_bio_cbse_02_001 (Flower.',
          misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A plant breeder working with Brassica napus (rapeseed) finds that self-pollination fails to set seeds even though pollen is viable and stigma is receptive.', answer: 'The device is sporophytic self-incompatibility (SSI)',
                  options: ['The device is sporophytic self-incompatibility (SSI)', 'outbreeding devices', 'pollination agents', '"outbreeding devices" and "pollination agents" are the same thing'],
                  hint: 'If stuck, review c12_bio_cbse_02_006 (Pollination Types) and c12_bio_cbse_02_001 (Flower Structure).',
                  misconception: 'Students often think "outbreeding devices" and "pollination agents" are the same thing.' }
          ],
            remediations: { 'outbreeding-devices-and-pollination-agents': { steps: ['If a student confuses outbreeding devices with pollination agents, have them revisit c12_bio_cbse_02_007 (Agents.', 'For self-incompatibility confusion, review the S-locus genetics in c11_biotech_cbse_06_006 (Multiple Alleles: ABO Blood.', 'Then re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_009', difficulty: 'standard',
          question: 'Double fertilization is a unique process in flowering plants (angiosperms).',
          hint: 'Review megasporogenesis (c12_bio_cbse_02_005) for embryo sac structure and.',
          misconception: 'Students often think the two male gametes are identical and either can fuse with the egg or polar nuclei randomly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Double fertilization is a unique process in flowering plants (angiosperms) where two male',
                  options: ['Double fertilization is a unique process in flowering plants (angiosperms) where two male', 'A flower is the specialized reproductive shoot of an angiosperm, composed of four', 'The stamen is the male reproductive organ of a flowering plant, consisting of a', 'Microsporogenesis is the process in flowering plants where diploid microspore mother'],
                  hint: 'Review megasporogenesis (c12_bio_cbse_02_005) for embryo sac structure and microsporogenesis.',
                  misconception: 'Students often think the two male gametes are identical and either can fuse with the egg or polar nuclei randomly.' }
          ],
            remediations: { 'the-two-male-gametes-are': { steps: ['If the student holds this misconception: (1) Revisit c12_bio_cbse_02_005 (embryo sac structure) and identify the egg.', '(2) Watch an animation of pollen tube discharge and gamete migration (e.g., from NCERT e-content).', '(3) Draw a labeled diagram showing the two male gametes with arrows to their specific targets, writing the molecular.', '(4) Re-attempt Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_010', difficulty: 'standard',
          question: 'Post-fertilization events in flowering plants encompass the development.',
          hint: 'If stuck, review the animation of double fertilization in c12_bio_cbse_02_009 and the.',
          misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Post-fertilization events in flowering plants encompass the development of endosperm from',
                  options: ['Post-fertilization events in flowering plants encompass the development of endosperm from', 'A flower is the specialized reproductive shoot of an angiosperm, composed of four', 'The stamen is the male reproductive organ of a flowering plant, consisting of a', 'Microsporogenesis is the process in flowering plants where diploid microspore mother'],
                  hint: 'If stuck, review the animation of double fertilization in c12_bio_cbse_02_009 and the embryo sac.',
                  misconception: 'Students often think the suspensor becomes part of the mature embryo (e.g., forms the root).' }
          ],
            remediations: { 'the-suspensor-becomes-part-of': { steps: ['Revisit node c12_bio_cbse_02_009 (Double Fertilization) to reinforce the origin of zygote and primary endosperm nucleus.', 'Then review the worked examples below, focusing on the asymmetric first division and the distinct fates of basal vs.', 'Use a prepared slide of Capsella embryo stages to visually confirm the suspensor’s degeneration.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_011', difficulty: 'standard',
          question: 'Seed development is the process by which a fertilized ovule matures into.',
          hint: 'Revisit c12_bio_cbse_02_009 and c12_bio_cbse_02_010 to clarify the fate of fertilization.',
          misconception: 'Students believe "dormant seeds are dead or inactive" and that "breaking dormancy means activating the seed.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Seed development is the process by',
                  options: ['Seed development is the process by', 'A flower is the specialized reproductive shoot of an angiosperm, composed of four', 'The stamen is the male reproductive organ of a flowering plant, consisting of a', 'Microsporogenesis is the process in flowering plants where diploid microspore mother'],
                  hint: 'Revisit c12_bio_cbse_02_009 and c12_bio_cbse_02_010 to clarify the fate of fertilization products.',
                  misconception: 'Students believe "dormant seeds are dead or inactive" and that "breaking dormancy means activating the seed." In reality, dormant seeds are.' }
          ],
            remediations: { 'dormant-seeds-are-dead-or': { steps: ['If the student confuses dormancy with non-viability: (1) Revisit c11_bio_cbse_13_008 (Seed Dormancy and Germination).', '(2) Perform a tetrazolium test on dormant vs.', 'dead seeds to visualize metabolic activity (red formazan formation).', '(3) Re-attempt Diagnostic Question 2 with the corrected understanding that dormancy is an active, reversible block.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_012', difficulty: 'standard',
          question: 'Parthenocarpy is the development of fruit without fertilization of ovules.',
          hint: 'If stuck, re-read NCERT Class 12 Chapter 2 section "Fruit and Seed Formation" and Class.',
          misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast parthenocarpy and apomixis in terms of: (i) process, (ii) genetic makeup of offspring, (iii) commercial utility.', answer: '(i) Parthenocarpy: fruit without fertilization → no seeds',
                  options: ['(i) Parthenocarpy: fruit without fertilization → no seeds', 'seedless', 'Parthenocarpy is formation of seeds without fertilization', 'parthenocarpy and apomixis are the same'],
                  hint: 'If stuck, re-read NCERT Class 12 Chapter 2 section "Fruit and Seed Formation" and Class 11 Chapter.',
                  misconception: 'Students think parthenocarpy and apomixis are the same because both produce "seedless" outcomes.' }
          ],
            remediations: { 'parthenocarpy-and-apomixis-are-the': { steps: ['Revisit c12_bio_cbse_02_009 (Double Fertilization) — confirm that normal fruit requires zygote+endosperm formation.', 'Review c11_bio_cbse_13_003/13_004 (Auxins, Gibberellins) — list hormone functions in fruit set.', 'Draw a 2-column table: Parthenocarpy vs Apomixis with rows for trigger, product, genetic consequence, examples.', 'Re-attempt Diagnostic Q4 — if still confused, watch NCERT video on "Parthenocarpy and Apomixis" and redo table from.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
