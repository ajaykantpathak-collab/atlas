import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch02_p1: SimDef = {
    id: 'v3_c12_bio_ch02_p1',
    title: 'Sexual Reproduction in Flowering Plants · Part 1/2',
    subtitle: 'Inside a hibiscus: four whorls, four pollen sacs, one precise machine.',
    classLevel: 12, subject: 'biology', topic: 'Sexual Reproduction in Flowering Plants · Part 1/2',
    chapters: ['c12_bio_ch02'],
    nodeIds: ['c12_bio_cbse_02_001', 'c12_bio_cbse_02_002', 'c12_bio_cbse_02_003', 'c12_bio_cbse_02_004', 'c12_bio_cbse_02_005', 'c12_bio_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant anatomist mapping a flower', intro: 'Every fruit you eat began as a flower executing a sequence older than humans — here\'s its blueprint.', goal: 'Identify floral whorls and trace microsporogenesis in the anther.' },
    discovery: {
        question: 'Tap a hibiscus anther over dark paper and yellow dust falls — pollen. Inside that anther, what actually produced each grain?',
        options: ['Microspore mother cells in the pollen sacs underwent meiosis to form haploid microspores', 'The stigma secreted pollen onto the anther during pollination', 'Petals shed cells that matured into pollen grains on the anther surface', 'Pollen mother cells divided by mitosis, keeping the diploid number'],
        answer: 'Microspore mother cells in the pollen sacs underwent meiosis to form haploid microspores',
        hook: 'Pollen feels like powder, not biology — but each grain is a meiotic product carrying half the genome, made inside the anther\'s microsporangia long before any pollinator arrives.',
    },
    teaching: [
        { title: 'Flower: Structure and Function', text: 'A flower is the specialized reproductive shoot of an angiosperm, composed of four distinct whorls (calyx, corolla, androecium, gynoecium) arranged on a thalamus, where the androecium produces male.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_02_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Dissect a flower layer by layer: identify all four whorls on the thalamus, slice a young anther to expose its four microsporangia, and trace pollen from meiosis to the stigma.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_001', title: 'Flower: Structure and Function',
          caseStudy: { intro: 'Observe a hibiscus flower in your garden or a mustard flower in a field — notice how the green sepals protect the bud, colorful petals attract bees, the.',
            decisions: [{ prompt: 'Name the four whorls of a typical angiosperm flower in correct acropetal order (from base to apex) and state the primary function of each.', options: [
                { text: 'Correct answer: Calyx (sepals) – protection of bud', outcome: 'Correct answer: Calyx (sepals) – protection of bud; Corolla (petals) – attraction of pollinators.' },
                { text: 'complete flower = bisexual flower', outcome: 'Not quite — Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual.', reveals: 'complete-flower-bisexual-flower-and' },
                { text: 'incomplete flower = unisexual flower', outcome: 'Not quite — Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual.', reveals: 'complete-flower-bisexual-flower-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_002', title: 'Stamen: Anther and Microsporangium',
          caseStudy: { intro: 'Observe a hibiscus or mustard flower in your garden — gently tap the anther onto a dark paper and you will see a fine yellow powder (pollen).',
            decisions: [{ prompt: 'Name the four wall layers of a mature microsporangium (anther wall) in correct order from outermost to innermost, and state the ploidy.', options: [
                { text: 'Correct answer: Epidermis (diploid, 2n) → Endothecium (diploid, 2n) → Middle layers (1–3', outcome: 'Correct answer: Epidermis (diploid, 2n) → Endothecium (diploid, 2n) → Middle layers (1–3 layers.' },
                { text: 'tapetum is haploid', outcome: 'Not quite — Students often think the **tapetum is haploid** because it is "inside" the anther and associated.', reveals: 'the-tapetum-is-haploid-because' },
                { text: 'inside', outcome: 'Not quite — Students often think the **tapetum is haploid** because it is "inside" the anther and associated.', reveals: 'the-tapetum-is-haploid-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_003', title: 'Microsporogenesis: Formation of Pollen Grains',
          caseStudy: { intro: 'Observe a hibiscus or mustard flower in your garden — the yellow powder on your fingers when you touch the anther is pollen.',
            decisions: [{ prompt: 'What is the ploidy of a microspore mother cell, a microspore, and the vegetative cell of a mature pollen grain in a typical flowering plant?', options: [
                { text: 'Microspore mother cell: diploid (2n)', outcome: 'Microspore mother cell: diploid (2n); microspore: haploid (n); vegetative cell: haploid (n).' },
                { text: 'describe microsporogenesis', outcome: 'Not quite — Students often think microsporogenesis and microgametogenesis are the same process.', reveals: 'microsporogenesis-and-microgametogenesis-are-the' },
                { text: 'microspore is diploid', outcome: 'Not quite — Students often think microsporogenesis and microgametogenesis are the same process.', reveals: 'microsporogenesis-and-microgametogenesis-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_004', title: 'Pistil: Structure of Ovary and Ovule',
          caseStudy: { intro: 'Begin by slicing open a ripe tomato or a pea pod — what you see are ovules attached to the inner wall of the ovary.',
            decisions: [{ prompt: 'Name the three main parts of a pistil and state the function of the stigma.', options: [
                { text: 'The three main parts are stigma, style, and ovary', outcome: 'The three main parts are stigma, style, and ovary. The stigma is the receptive surface for pollen.' },
                { text: 'stigma produces ovules', outcome: 'Not quite — Students often think the ovule is the same as the embryo sac (female gametophyte).', reveals: 'the-ovule-is-the-same' },
                { text: 'style receives pollen', outcome: 'Not quite — Students often think the ovule is the same as the embryo sac (female gametophyte).', reveals: 'the-ovule-is-the-same' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_005', title: 'Megasporogenesis: Formation of Embryo Sac',
          caseStudy: { intro: 'Start by recalling the ovule structure from the previous node (c12_bio_cbse_02_004): locate the micropyle, nucellus, and the single large megaspore mother cell.',
            decisions: [{ prompt: 'Name the cell that undergoes meiosis to initiate megasporogenesis and state its ploidy. Where is this cell located within the ovule?', options: [
                { text: 'The megaspore mother cell (MMC) or megasporocyte', outcome: 'The megaspore mother cell (MMC) or megasporocyte, which is diploid (2n), undergoes meiosis.' },
                { text: 'functional megaspore', outcome: 'Not quite — Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the.', reveals: 'the-functional-megaspore-is-the' },
                { text: 'nucellar cell', outcome: 'Not quite — Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the.', reveals: 'the-functional-megaspore-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_006', title: 'Pollination: Types - Self and Cross Pollination',
          caseStudy: { intro: 'Observe a hibiscus flower in your garden: its anthers and stigma are close together, making self-pollination likely.',
            decisions: [{ prompt: 'Define autogamy and give one example of a plant that commonly exhibits it.', options: [
                { text: 'Autogamy is the transfer of pollen from anther to stigma within the same flower', outcome: 'Autogamy is the transfer of pollen from anther to stigma within the same flower.' },
                { text: 'transfer between different flowers of the same plant', outcome: 'Not quite — Students often believe that any pollen transfer between different flowers is cross-pollination.', reveals: 'any-pollen-transfer-between-different' },
                { text: 'same plant', outcome: 'Not quite — Students often believe that any pollen transfer between different flowers is cross-pollination.', reveals: 'any-pollen-transfer-between-different' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Sexual Reproduction in Flowering Plants · Part 1/2', spots: [
            { id: 's1', label: 'Flower Structure and Function', prompt: 'Which idea is this? — A flower is the specialized reproductive shoot of an angiosperm, composed of four.', answer: 'Flower Structure and Function', options: ['Flower Structure and Function', 'Stamen Anther and Microsporangium', 'Microsporogenesis Formation of Pollen Grains', 'Pistil Structure of Ovary and Ovule'] },
            { id: 's2', label: 'Stamen Anther and Microsporangium', prompt: 'Which idea is this? — The stamen is the male reproductive organ of a flowering plant, consisting of.', answer: 'Stamen Anther and Microsporangium', options: ['Stamen Anther and Microsporangium', 'Flower Structure and Function', 'Microsporogenesis Formation of Pollen Grains', 'Pistil Structure of Ovary and Ovule'] },
            { id: 's3', label: 'Microsporogenesis Formation of Pollen Grains', prompt: 'Which idea is this? — Microsporogenesis is the process in flowering plants where diploid microspore mother.', answer: 'Microsporogenesis Formation of Pollen Grains', options: ['Microsporogenesis Formation of Pollen Grains', 'Flower Structure and Function', 'Stamen Anther and Microsporangium', 'Pistil Structure of Ovary and Ovule'] },
            { id: 's4', label: 'Pistil Structure of Ovary and Ovule', prompt: 'Which idea is this? — The pistil is the female reproductive organ of a flowering plant, typically composed.', answer: 'Pistil Structure of Ovary and Ovule', options: ['Pistil Structure of Ovary and Ovule', 'Flower Structure and Function', 'Stamen Anther and Microsporangium', 'Microsporogenesis Formation of Pollen Grains'] },
            { id: 's5', label: 'Megasporogenesis Formation of Embryo Sac', prompt: 'Which idea is this? — Megasporogenesis is the process of formation of haploid megaspores from a diploid.', answer: 'Megasporogenesis Formation of Embryo Sac', options: ['Megasporogenesis Formation of Embryo Sac', 'Flower Structure and Function', 'Stamen Anther and Microsporangium', 'Microsporogenesis Formation of Pollen Grains'] },
            { id: 's6', label: 'Pollination Types - Self and Cross Pollination', prompt: 'Which idea is this? — Pollination is the transfer of pollen grains from the anther (male part) to the stigma.', answer: 'Pollination Types - Self and Cross Pollination', options: ['Pollination Types - Self and Cross Pollination', 'Flower Structure and Function', 'Stamen Anther and Microsporangium', 'Microsporogenesis Formation of Pollen Grains'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a herbarium field project, a student presses a small greenish flower that has no petals at all but does carry both stamens and carpels. She labels the sheet \'incomplete flower, therefore unisexual\'.',
            decisions: [{ prompt: 'Did she classify it correctly?', options: [
                { text: 'Half right — missing a whorl makes it incomplete, but both androecium and gynoecium are present, so it\'s still bisexual; completeness counts whorls, sexuality counts reproductive organs.', outcome: 'The two terms operate at different levels — a flower can be incomplete yet bisexual, and that distinction decides pollination questions.' },
                { text: 'Correct — a flower missing a whorl is unisexual because \'incomplete\' and \'unisexual\' describe the same thing.', outcome: 'That conflates whorl count with sex condition; the flower has functional male and female organs, so it is bisexual.', reveals: 'incomplete-equals-unisexual' },
                { text: 'It can\'t be bisexual — without petals there\'s no corolla, and bisexual flowers need all four whorls.', outcome: 'Bisexuality needs only both reproductive whorls; petals are for attracting pollinators, not for determining sex.', reveals: 'bisexual-needs-four-whorls' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see a flower as a reproductive machine, not decoration. Floral whorls and anther anatomy are board-diagram gold — and the foundation of every crop-breeding programme.',
            decisions: [{ prompt: 'What comes next? Sexual Reproduction in Flowering Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sexual Reproduction in Flowering Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_001', difficulty: 'standard',
          question: 'A flower is the specialized reproductive shoot of an angiosperm, composed.',
          hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
          misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
          parts: [
                { id: 'a', prompt: 'Name the four whorls of a typical angiosperm flower in correct acropetal order (from base to apex) and state the primary function of each whorl in one phrase.', answer: 'Correct answer: Calyx (sepals) – protection of bud',
                  options: ['Correct answer: Calyx (sepals) – protection of bud', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'In a longitudinal section of a flower, you observe that the thalamus is cup-shaped and the ovary sits at the bottom of the cup with sepals, petals, and stamens.', answer: 'Correct answer: The ovary is inferior (epigynous flower)',
                  options: ['Correct answer: The ovary is inferior (epigynous flower)', 'superior ovary', 'fruit type unchanged', 'complete flower = bisexual flower'],
                  hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'c', prompt: 'Compare the floral formulae of Brassicaceae (⊕ ♂♀ K4 C4 A2+4 G(2)) and Fabaceae (↑ ♂♀ K(5) C1+2+(2) A(9)+1 G1).', answer: 'Correct answer: Brassicaceae has tetradynamous stamens (2+4) and a syncarpous',
                  options: ['Correct answer: Brassicaceae has tetradynamous stamens (2+4) and a syncarpous', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' }
          ],
            remediations: { 'complete-flower-bisexual-flower-and': { steps: ['Revisit Class 11 node c11_bio_cbse_05_005 (Flower: Structure and Parts) and c11_bio_cbse_05_006 (Androecium and.', 'Draw four flowers: (a) complete bisexual, (b) incomplete bisexual, (c) complete unisexual (impossible — explain why).', 'Write floral formulae for each.', 'Re-attempt Diagnostic Question 2. If still wrong, watch a 5-min video on "floral morphology terms" and redo step 2 with.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In a zygomorphic flower, the calyx is always bilabiate and the corolla is always papilionaceous." Is it correct?', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' },
                { id: 'b', prompt: 'Design a simple field observation to distinguish between a hypogynous, perigynous, and epigynous flower using only a hand lens and a scalpel.', answer: 'Expected answer: Step 1: Pick a fresh flower',
                  options: ['Expected answer: Step 1: Pick a fresh flower', 'complete flower = bisexual flower', 'incomplete flower = unisexual flower', '"complete flower = bisexual flower" and "incomplete flower = unisexual flower'],
                  hint: 'If stuck on whorl identification or sexuality terms, review c11_bio_cbse_05_005 and.',
                  misconception: 'Students often think "complete flower = bisexual flower" and "incomplete flower = unisexual flower." They memorize the definitions but fail.' }
          ],
            remediations: { 'complete-flower-bisexual-flower-and': { steps: ['Revisit Class 11 node c11_bio_cbse_05_005 (Flower: Structure and Parts) and c11_bio_cbse_05_006 (Androecium and.', 'Draw four flowers: (a) complete bisexual, (b) incomplete bisexual, (c) complete unisexual (impossible — explain why).', 'Write floral formulae for each.', 'Re-attempt Diagnostic Question 2. If still wrong, watch a 5-min video on "floral morphology terms" and redo step 2 with.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_002', difficulty: 'standard',
          question: 'The stamen is the male reproductive organ of a flowering plant, consisting of.',
          hint: 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) — focus on anther types.',
          misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stamen is the male reproductive organ of a flowering plant, consisting of a',
                  options: ['The stamen is the male reproductive organ of a flowering plant, consisting of a', 'A flower is the specialized reproductive shoot of an angiosperm, composed of four', 'Microsporogenesis is the process in flowering plants where diploid microspore mother', 'The pistil is the female reproductive organ of a flowering plant, typically composed of'],
                  hint: 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) — focus on anther types, attachment, and the.',
                  misconception: 'Students often think the **tapetum is haploid** because it is "inside" the anther and associated with pollen formation.' }
          ],
            remediations: { 'the-tapetum-is-haploid-because': { steps: ['Revisit c11_bio_cbse_05_006 (Androecium and Gynoecium) to re-learn stamen parts and anther types (dithecous.', 'Watch a video of anther transverse section (search "anther TS tapetum") to visualise the four wall layers in 3D.', 'Make a table comparing each wall layer: position, ploidy, key feature, fate, function.', 'Re-attempt Diagnostic Questions 2 and 5 — they test the exact tapetum misconceptions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_003', difficulty: 'standard',
          question: 'Microsporogenesis is the process in flowering plants where diploid microspore.',
          hint: 'Revisit c11_bio_cbse_10_006 and c11_bio_cbse_10_007 for meiosis mechanics; revisit.',
          misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.',
          parts: [
                { id: 'a', prompt: 'What is the ploidy of a microspore mother cell, a microspore, and the vegetative cell of a mature pollen grain in a typical flowering plant?', answer: 'Microspore mother cell: diploid (2n)',
                  options: ['Microspore mother cell: diploid (2n)', 'describe microsporogenesis', 'microspore is diploid', 'microsporogenesis and microgametogenesis are the same process'],
                  hint: 'Revisit c11_bio_cbse_10_006 and c11_bio_cbse_10_007 for meiosis mechanics; revisit.',
                  misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.' },
                { id: 'b', prompt: 'A student observes a transverse section of an anther and sees groups of four microspores arranged in a tetrahedral tetrad inside a microsporangium.', answer: 'Meiosis II has just been completed (producing four haploid microspores)',
                  options: ['Meiosis II has just been completed (producing four haploid microspores)', 'meiosis I just finished', 'describe microsporogenesis', 'microsporogenesis and microgametogenesis are the same process'],
                  hint: 'Revisit c11_bio_cbse_10_006 and c11_bio_cbse_10_007 for meiosis mechanics; revisit.',
                  misconception: 'Students often think microsporogenesis and microgametogenesis are the same process.' }
          ],
            remediations: { 'microsporogenesis-and-microgametogenesis-are-the': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to reinforce that meiosis produces 4.', 'Draw a flowchart: Microspore mother cell (2n) → Meiosis I → Dyad → Meiosis II → Tetrad (4 microspores, n) → **End.', 'Then show Microgametogenesis: Microspore (n) → Mitosis I (pollen mitosis) → 2-celled pollen (vegetative + generative) →.', 'Self-test: "Which process involves meiosis? Which involves mitosis?" Repeat until distinction is automatic.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_004', difficulty: 'standard',
          question: 'The pistil is the female reproductive organ of a flowering plant, typically.',
          hint: 'Revisit c12_bio_cbse_02_001 (Flower: Structure and Function) and practice labeling pistil.',
          misconception: 'Students often think the ovule is the same as the embryo sac (female gametophyte).',
          parts: [
                { id: 'a', prompt: 'Name the three main parts of a pistil and state the function of the stigma.', answer: 'The three main parts are stigma, style, and ovary',
                  options: ['The three main parts are stigma, style, and ovary', 'stigma produces ovules', 'style receives pollen', 'the ovule undergoes meiosis to form the egg'],
                  hint: 'Revisit c12_bio_cbse_02_001 (Flower: Structure and Function) and practice labeling pistil parts.',
                  misconception: 'Students often think the ovule is the same as the embryo sac (female gametophyte).' },
                { id: 'b', prompt: 'A flowering plant has an ovary with ovules attached to a central column formed by the fusion of carpel margins.', answer: 'This is axile placentation, found in plants like tomato, lemon, and china rose',
                  options: ['This is axile placentation, found in plants like tomato, lemon, and china rose', 'parietal placentation', 'free central placentation', 'the ovule undergoes meiosis to form the egg'],
                  hint: 'Revisit c12_bio_cbse_02_001 (Flower: Structure and Function) and practice labeling pistil parts.',
                  misconception: 'Students often think the ovule is the same as the embryo sac (female gametophyte).' }
          ],
            remediations: { 'the-ovule-is-the-same': { steps: ['If the student confuses ovule with embryo sac, have them: (1) Revisit c12_bio_cbse_02_001 to recall that the pistil.', '(2) Study a labeled diagram of a mature anatropous ovule (NCERT Fig.', '2.7b) and explicitly list: sporophytic parts (integuments, nucellus, funiculus) vs.', 'gametophytic part (embryo sac).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_005', difficulty: 'standard',
          question: 'Megasporogenesis is the process of formation of haploid megaspores from.',
          hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus.',
          misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms.',
          parts: [
                { id: 'a', prompt: 'Name the cell that undergoes meiosis to initiate megasporogenesis and state its ploidy. Where is this cell located within the ovule?', answer: 'The megaspore mother cell (MMC) or megasporocyte',
                  options: ['The megaspore mother cell (MMC) or megasporocyte', 'functional megaspore', 'nucellar cell'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus on chromosome.',
                  misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms *directly* from it.' },
                { id: 'b', prompt: 'A functional megaspore undergoes three successive mitotic divisions.', answer: 'With cytokinesis after each mitosis: 1 → 2 → 4 → 8 cells (8 cells total)',
                  options: ['With cytokinesis after each mitosis: 1 → 2 → 4 → 8 cells (8 cells total)', '8 cells form directly', 'functional megaspore'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus on chromosome.',
                  misconception: 'Students often think the "functional megaspore" is the *first* cell of the embryo sac and that the embryo sac forms *directly* from it.' }
          ],
            remediations: { 'the-functional-megaspore-is-the': { steps: ['If the student draws cellular divisions at each mitotic step: (1) Revisit c11_bio_cbse_10_006 (Meiosis I) and.', '(2) Watch an animation of *Polygonum*-type embryo sac development showing free nuclear migration.', '(3) Re-draw the stages labeling "nuclei" not "cells" until the final cellularization step.', '(4) Self-test: "At the 4-nucleate stage, how many cells exist?" Answer: 1 cell with 4 nuclei.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_02_006', difficulty: 'standard',
          question: 'Pollination is the transfer of pollen grains from the anther (male part) to the.',
          hint: 'If stuck, review the labeled diagram of a typical flower (c12_bio_cbse_02_001) and the.',
          misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.',
          parts: [
                { id: 'a', prompt: 'Define autogamy and give one example of a plant that commonly exhibits it.', answer: 'Autogamy is the transfer of pollen from anther to stigma within the same flower',
                  options: ['Autogamy is the transfer of pollen from anther to stigma within the same flower', 'transfer between different flowers of the same plant', 'same plant', 'same flower'],
                  hint: 'If stuck, review the labeled diagram of a typical flower (c12_bio_cbse_02_001) and the.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' },
                { id: 'b', prompt: 'Why is geitonogamy considered genetically equivalent to autogamy even though it requires a pollinating agent?', answer: 'Geitonogamy involves pollen transfer between different flowers of the same plant',
                  options: ['Geitonogamy involves pollen transfer between different flowers of the same plant', 'because it uses wind', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'If stuck, review the labeled diagram of a typical flower (c12_bio_cbse_02_001) and the.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' },
                { id: 'c', prompt: 'A farmer grows a pure line of tomato (self-pollinated) and a hybrid maize (cross-pollinated) in adjacent fields.', answer: 'Maize will show greater variation',
                  options: ['Maize will show greater variation', 'tomato because it has more flowers', 'any pollen transfer between different flowers is cross-pollination'],
                  hint: 'If stuck, review the labeled diagram of a typical flower (c12_bio_cbse_02_001) and the.',
                  misconception: 'Students often believe that any pollen transfer between different flowers is cross-pollination.' }
          ],
            remediations: { 'any-pollen-transfer-between-different': { steps: ['Revisit c12_bio_cbse_02_001 (Flower structure) to relocate anther and stigma positions.', 'Review c9_bio_ch3_6 (Class 9 pollination basics) for the definitions of self vs.', 'Draw three flowers of the same plant: label anthers and stigmas, then trace pollen paths for autogamy (same flower).', 'Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
