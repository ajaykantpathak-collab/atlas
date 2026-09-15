import type { SimDef } from '../../engine/types';
import C12_BiologyMicrosporogenesisPollenGrainSim from '../../../simulations/c6_12/C12_BiologyMicrosporogenesisPollenGrainSim';

/** v3 wrapped master — C12_BiologyMicrosporogenesisPollenGrainSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologymicrosporogenesispollengrainsim: SimDef = {
    id: 'v3w_c12_biologymicrosporogenesispollengrainsim',
    title: 'Microsporogenesis Pollen Grain',
    subtitle: 'Covers the morphology and function of the four floral whorls (calyx, corolla, androecium,.',
    classLevel: 12, subject: 'biology', topic: 'Flower: Structure and Function',
    chapters: [],
    nodeIds: ['c12_bio_cbse_02_001', 'c12_bio_cbse_02_002', 'c12_bio_cbse_02_003', 'c12_bio_cbse_02_006', 'c12_bio_cbse_02_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a hibiscus flower in your garden or a mustard flower in a field — notice how the green sepals protect.', goal: 'Master Microsporogenesis Pollen Grain.' },
    discovery: {
        question: 'Name the four whorls of a typical angiosperm flower in correct acropetal order (from base to apex) and state the primary function of each whorl in one phrase.',
        options: ['Correct answer: Calyx (sepals) – protection of bud', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower'],
        answer: 'Correct answer: Calyx (sepals) – protection of bud',
        hook: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
    },
    teaching: [
        { title: 'A flower is the specialized reproductive.', text: 'A flower is the specialized reproductive shoot of an angiosperm, composed of four distinct whorls (calyx, corolla, androecium, gynoecium) arranged on a thalamus, where the androecium produces male.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_001', title: 'A flower is the specialized.',
          scaffold: { problem: 'A student observes a flower with 5 sepals (free), 5 petals (free), 10 stamens (diadelphous, 9+1), and a single carpel with a superior.',
            steps: [
            { text: 'Identify symmetry — flower can be divided into two equal halves in one vertical plane only → zygomorphic (↑).' },
            { text: 'Identify sexuality — both stamens and carpel present → bisexual (♂♀).' },
            { text: 'Record whorls: K5 (5 free sepals), C5 (5 free petals), A(9)+1 (diadelphous stamens), G1 (monocarpellary, superior.' },
            { text: 'Write formula: ↑ ♂♀ K5 C5 A(9)+1 G1.' },
            { text: 'Match to family — Fabaceae (Papilionoideae). Diadelphous stamens form a keel that encloses reproductive parts; when a.', faded: true, blankAnswer: 'Floral formula: ↑ ♂♀ K5 C5 A(9)+1 G1. Family: Fabaceae..' }
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
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_003', title: 'Microsporogenesis is the process in.',
          scaffold: { problem: 'In a flowering plant with 2n=24 chromosomes, a single microspore mother cell undergoes microsporogenesis.',
            steps: [
            { text: 'Identify starting cell: 1 microspore mother cell (2n=24 chromosomes).' },
            { text: 'Meiosis I (reductional): homologous chromosomes separate → 2 secondary microspores, each with n=12 chromosomes (each.' },
            { text: 'Meiosis II (equational): sister chromatids separate → 4 microspores, each with n=12 chromosomes (each chromosome now.' },
            { text: 'Count products: 4 microspores produced per mother cell.' },
            { text: 'Total chromosomes in all microspores = 4 microspores × 12 chromosomes = 48 chromosomes.' },
            { text: 'Verify ploidy: mother cell 2n → microspores n (haploid).', faded: true, blankAnswer: '4 microspores produced; each has n=12 chromosomes; total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_006', title: 'Pollination is the transfer of pollen.',
          scaffold: { problem: 'In a garden, you observe two plants: Plant A has small, inconspicuous flowers with anthers and stigma enclosed within the same petal tube.',
            steps: [
            { text: 'Identify the relative position of anther and stigma in Plant A — they are enclosed and close together.' },
            { text: 'Recognize that this spatial proximity facilitates pollen falling directly onto the stigma of the same flower → autogamy.' },
            { text: 'Examine Plant B — exerted anthers and stigma projecting beyond petals suggest separation in space (herkogamy).' },
            { text: 'Note that such separation reduces self-deposition and favors pollen transfer to other flowers, likely on different.' },
            { text: 'Conclude: Plant A = predominantly autogamous; Plant B = predominantly xenogamous.', faded: true, blankAnswer: 'Plant A shows autogamy due to enclosed anthers and stigma;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_02_007', title: 'Agents of pollination are biotic.',
          scaffold: { problem: 'A botanist finds a new grass species in the Western Ghats. Its flowers have no perianth, versatile anthers dangling on long filaments,.',
            steps: [
            { text: 'List all observed floral traits – absent perianth, versatile anthers, long filaments, feathery stigma, huge pollen.' },
            { text: 'Recall the anemophily syndrome from NCERT: flowers are small, inconspicuous, lack nectar/scent, have exposed stamens.' },
            { text: 'Match each trait: absent perianth = no investment in attraction; versatile anthers + long filaments = pollen released.' },
            { text: 'Conclude the agent is wind (anemophily) because every trait aligns with wind-pollination adaptations and N/A matches.' },
            { text: 'Verify by checking that no trait contradicts anemophily (e.g., sticky pollen would contradict).', faded: true, blankAnswer: 'The species is anemophilous (wind-pollinated). The.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Microsporogenesis Pollen Grain', spots: [
            { id: 's1', label: 'A flower is the specialized', prompt: 'Which idea is this? — A flower is the specialized reproductive shoot of an angiosperm, composed of four.', answer: 'A flower is the specialized', options: ['A flower is the specialized', 'The stamen is the male', 'Microsporogenesis is the process in', 'Pollination is the transfer of'] },
            { id: 's2', label: 'The stamen is the male', prompt: 'Which idea is this? — The stamen is the male reproductive organ of a flowering plant, consisting of a.', answer: 'The stamen is the male', options: ['The stamen is the male', 'A flower is the specialized', 'Microsporogenesis is the process in', 'Pollination is the transfer of'] },
            { id: 's3', label: 'Microsporogenesis is the process in', prompt: 'Which idea is this? — Microsporogenesis is the process in flowering plants where diploid microspore mother.', answer: 'Microsporogenesis is the process in', options: ['Microsporogenesis is the process in', 'A flower is the specialized', 'The stamen is the male', 'Pollination is the transfer of'] },
            { id: 's4', label: 'Pollination is the transfer of', prompt: 'Which idea is this? — Pollination is the transfer of pollen grains from the anther (male part) to the stigma.', answer: 'Pollination is the transfer of', options: ['Pollination is the transfer of', 'A flower is the specialized', 'The stamen is the male', 'Microsporogenesis is the process in'] },
            { id: 's5', label: 'Agents of pollination are biotic', prompt: 'Which idea is this? — Agents of pollination are biotic (insects, birds, bats) and abiotic (wind, water) vectors.', answer: 'Agents of pollination are biotic', options: ['Agents of pollination are biotic', 'A flower is the specialized', 'The stamen is the male', 'Microsporogenesis is the process in'] }
          ] } }
    ],
    explore: { component: C12_BiologyMicrosporogenesisPollenGrainSim, prompt: 'Explore the interactive — Microsporogenesis Pollen Grain' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_001', difficulty: 'standard',
          question: 'A flower is the specialized reproductive shoot of an angiosperm, composed of.',
          hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
          misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
          parts: [
                { id: 'a', prompt: 'Name the four whorls of a typical angiosperm flower in correct acropetal order (from base to apex) and state the primary function of each whorl in one phrase.', answer: 'Correct answer: Calyx (sepals) – protection of bud',
                  options: ['Correct answer: Calyx (sepals) – protection of bud', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'In a longitudinal section of a flower, you observe that the thalamus is cup-shaped and the ovary sits at the bottom of the cup with sepals, petals, and stamens.', answer: 'Correct answer: The ovary is inferior (epigynous flower)',
                  options: ['Correct answer: The ovary is inferior (epigynous flower)', 'superior ovary', 'fruit type unchanged'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'c', prompt: 'Compare the floral formulae of Brassicaceae (⊕ ♂♀ K4 C4 A2+4 G(2)) and Fabaceae (↑ ♂♀ K(5) C1+2+(2) A(9)+1 G1).', answer: 'Correct answer: Brassicaceae has tetradynamous stamens (2+4) and a syncarpous',
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
                { id: 'a', prompt: 'Evaluate this statement: "In a zygomorphic flower, the calyx is always bilabiate and the corolla is always papilionaceous." Is it correct?', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'Design a simple field observation to distinguish between a hypogynous, perigynous, and epigynous flower using only a hand lens and a scalpel.', answer: 'Expected answer: Step 1: Pick a fresh flower',
                  options: ['Expected answer: Step 1: Pick a fresh flower', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' }
          ],
            remediations: { 'complete-flower-bisexual-flower-and': { steps: ['Revisit Class 11 node c11_bio_cbse_05_005 (Flower: Structure and Parts) and c11_bio_cbse_05_006 (Androecium and.', 'Draw four flowers: (a) complete bisexual, (b) incomplete bisexual, (c) complete unisexual (impossible — explain why),.', 'Write floral formulae for each.', 'Re-attempt Diagnostic Question 2. If still wrong, watch a 5-min video on "floral morphology terms" and redo step 2 with.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_002', difficulty: 'standard',
          question: 'The stamen is the male reproductive organ of a flowering plant, consisting of a.',
          hint: 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) — focus on anther types,.',
          misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stamen is the male reproductive organ of a flowering plant, consisting of a',
                  options: ['The stamen is the male reproductive organ of a flowering plant, consisting of a', 'A flower is the specialized reproductive shoot of an angiosperm, composed of four', 'Microsporogenesis is the process in flowering plants where diploid microspore mother', 'Pollination is the transfer of pollen grains from the anther (male part) to the stigma'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.' }
          ],
            remediations: { 'the-tapetum-is-haploid-because': { steps: ['Revisit c11_bio_cbse_05_006 (Androecium and Gynoecium) to re-learn stamen parts and anther types (dithecous vs.', 'Watch a video of anther transverse section (search "anther TS tapetum") to visualise the four wall layers in 3D.', 'Make a table comparing each wall layer: position, ploidy, key feature, fate, function.', 'Re-attempt Diagnostic Questions 2 and 5 — they test the exact tapetum misconceptions.', 'If still stuck, ask your teacher to show a permanent slide of young vs mature anther TS under the microscope.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The tapetum is the only anther wall layer that contributes directly to the pollen wall (exine)." Is this true or false?', answer: 'Correct answer: TRUE',
                  options: ['Correct answer: TRUE', 'False, endothecium also contributes', 'inside'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.' }
          ],
            remediations: { 'the-tapetum-is-haploid-because': { steps: ['Revisit c11_bio_cbse_05_006 (Androecium and Gynoecium) to re-learn stamen parts and anther types (dithecous vs.', 'Watch a video of anther transverse section (search "anther TS tapetum") to visualise the four wall layers in 3D.', 'Make a table comparing each wall layer: position, ploidy, key feature, fate, function.', 'Re-attempt Diagnostic Questions 2 and 5 — they test the exact tapetum misconceptions.', 'If still stuck, ask your teacher to show a permanent slide of young vs mature anther TS under the microscope.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_003', difficulty: 'standard',
          question: 'Microsporogenesis is the process in flowering plants where diploid microspore.',
          hint: 'Revisit c11_bio_cbse_10_006 and c11_bio_cbse_10_007 for meiosis mechanics; revisit.',
          misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.',
          parts: [
                { id: 'a', prompt: 'What is the ploidy of a microspore mother cell, a microspore, and the vegetative cell of a mature pollen grain in a typical flowering plant?', answer: 'Microspore mother cell: diploid (2n)',
                  options: ['Microspore mother cell: diploid (2n)', 'describe microsporogenesis', 'microsporogenesis and microgametogenesis are the same process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.' },
                { id: 'b', prompt: 'A student observes a transverse section of an anther and sees groups of four microspores arranged in a tetrahedral tetrad inside a microsporangium.', answer: 'Meiosis II has just been completed (producing four haploid microspores)',
                  options: ['Meiosis II has just been completed (producing four haploid microspores)', 'meiosis I just finished', 'describe microsporogenesis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.' }
          ],
            remediations: { 'microsporogenesis-and-microgametogenesis-are-the': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to reinforce that meiosis produces 4.', 'Draw a flowchart: Microspore mother cell (2n) → Meiosis I → Dyad → Meiosis II → Tetrad (4 microspores, n) → **End of.', 'Then show Microgametogenesis: Microspore (n) → Mitosis I (pollen mitosis) → 2-celled pollen (vegetative + generative) →.', 'Self-test: "Which process involves meiosis? Which involves mitosis?" Repeat until distinction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.',
          parts: [
                { id: 'a', prompt: 'In a species where pollen is shed at the 2-celled stage, the generative cell divides during pollen tube growth.', answer: 'a wind-pollinated plant with long pollen tube growth distance, and (',
                  options: ['a wind-pollinated plant with long pollen tube growth distance, and (', '3-celled is always better', 'describe microsporogenesis', 'microsporogenesis and microgametogenesis are the same process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.' }
          ],
            remediations: { 'microsporogenesis-and-microgametogenesis-are-the': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to reinforce that meiosis produces 4.', 'Draw a flowchart: Microspore mother cell (2n) → Meiosis I → Dyad → Meiosis II → Tetrad (4 microspores, n) → **End of.', 'Then show Microgametogenesis: Microspore (n) → Mitosis I (pollen mitosis) → 2-celled pollen (vegetative + generative) →.', 'Self-test: "Which process involves meiosis? Which involves mitosis?" Repeat until distinction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_006', difficulty: 'standard',
          question: 'Pollination is the transfer of pollen grains from the anther (male part) to the.',
          hint: 'If stuck, review the labeled diagram of a typical flower (c12_bio_cbse_02_001) and the.',
          misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.',
          parts: [
                { id: 'a', prompt: 'Define autogamy and give one example of a plant that commonly exhibits it.', answer: 'Autogamy is the transfer of pollen from anther to stigma within the same flower',
                  options: ['Autogamy is the transfer of pollen from anther to stigma within the same flower', 'transfer between different flowers of the same plant', 'same plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' },
                { id: 'b', prompt: 'Why is geitonogamy considered genetically equivalent to autogamy even though it requires a pollinating agent?', answer: 'Geitonogamy involves pollen transfer between different flowers of the same plant',
                  options: ['Geitonogamy involves pollen transfer between different flowers of the same plant', 'because it uses wind', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' },
                { id: 'c', prompt: 'A farmer grows a pure line of tomato (self-pollinated) and a hybrid maize (cross-pollinated) in adjacent fields.', answer: 'Maize will show greater variation',
                  options: ['Maize will show greater variation', 'tomato because it has more flowers', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' }
          ],
            remediations: { 'any-pollen-transfer-between-different': { steps: ['Revisit c12_bio_cbse_02_001 (Flower structure) to relocate anther and stigma positions.', 'Review c9_bio_ch3_6 (Class 9 pollination basics) for the definitions of self vs.', 'Draw three flowers of the same plant: label anthers and stigmas, then trace pollen paths for autogamy (same flower),.', 'Re-attempt Diagnostic Question 2 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Geitonogamy is ecologically cross-pollination but genetically self-pollination." Is it correct? Justify.', answer: 'Correct',
                  options: ['Correct', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' },
                { id: 'b', prompt: 'Design a simple field experiment to determine whether a newly discovered flowering plant is predominantly autogamous or xenogamous.', answer: 'Steps: (1) Bag several buds before anthesis to exclude pollinators',
                  options: ['Steps: (1) Bag several buds before anthesis to exclude pollinators', 'observe insects visiting', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' }
          ],
            remediations: { 'any-pollen-transfer-between-different': { steps: ['Revisit c12_bio_cbse_02_001 (Flower structure) to relocate anther and stigma positions.', 'Review c9_bio_ch3_6 (Class 9 pollination basics) for the definitions of self vs.', 'Draw three flowers of the same plant: label anthers and stigmas, then trace pollen paths for autogamy (same flower),.', 'Re-attempt Diagnostic Question 2 and 5.'] } } },
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
            remediations: { 'hydrophily-means-pollen-floats-on': { steps: ['Revisit c12_bio_cbse_02_001 (Flower Structure) to recall basic floral parts.', 'Watch a 5-minute video of Vallisneria male flower detachment and Zostera underwater pollen release (search “hydrophily.', 'Make a two-column table: “Epihydrophily vs. Hypohydrophily” with columns for pollen shape, stigma position, and example.', 'Re-attempt Diagnostic Question 3 and 5; if still incorrect, ask teacher for a fresh flower of Vallisneria or Hydrilla.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
