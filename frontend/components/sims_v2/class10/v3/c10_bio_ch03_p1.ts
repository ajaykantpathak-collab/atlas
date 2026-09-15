import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch03_p1: SimDef = {
    id: 'v3_c10_bio_ch03_p1',
    title: 'How Do Organisms Reproduce',
    subtitle: 'From cell division to fertilisation — how life copies itself, and why it never copies perfectly.',
    classLevel: 10, subject: 'biology', topic: 'How Do Organisms Reproduce · Part 1/2',
    chapters: ['c10_bio_ch03'],
    nodeIds: ['c10_bio_cbse_03_001', 'c10_bio_cbse_03_002', 'c10_bio_cbse_03_003', 'c10_bio_cbse_03_004', 'c10_bio_cbse_03_005', 'c10_bio_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant breeder developing a new variety', intro: 'You have a rose that flowers brilliantly but never sets seed. Your job: decide whether to propagate it asexually or cross it — and what each choice does to variation.', goal: 'Compare asexual and sexual reproduction — and explain why variation is survival\'s insurance policy.' },
    discovery: {
        question: 'A single bacterium becomes a billion identical copies overnight — yet a species of bacteria can still out-evolve antibiotics. Where does the variation come from?',
        options: ['Mutation during copying — imperfect division creates differences', 'They reproduce sexually too', 'The antibiotic creates the variation', 'Variation only happens in animals'],
        answer: 'Mutation during copying — imperfect division creates differences',
        hook: 'Most students think asexual copies are always identical. Copying billions of times means billions of chances to be slightly different.',
    },
    teaching: [
        { title: 'Reproduction: Importance and Modes (Sexual vs Asexual)', text: 'Reproduction is the biological process by which living organisms produce new individuals of the same species, ensuring the continuity of life and transmission of genetic information from one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_03_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'On the reproduction lab: run one asexual cycle and one sexual cycle — count how much variation each produces.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_001', title: 'Reproduction: Importance and Modes (Sexual vs Asexual)',
          caseStudy: { intro: 'Look at a mango tree in your neighbourhood — every year it produces mangoes with seeds, and new mango saplings sprout from fallen seeds.',
            decisions: [{ prompt: 'Define reproduction in biological terms and state why it is considered a characteristic of life, but not essential for the survival of.', options: [
                { text: 'Reproduction is the biological process by', outcome: 'Reproduction is the biological process by which organisms produce new individuals of their own.' },
                { text: 'reproduction keeps the organism alive', outcome: 'Not quite — Students believe that "reproduction is necessary for the survival of the organism" and write.', reveals: 'reproduction-is-necessary-for-the' },
                { text: 'reproduction provides energy', outcome: 'Not quite — Students believe that "reproduction is necessary for the survival of the organism" and write.', reveals: 'reproduction-is-necessary-for-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_002', title: 'Asexual Reproduction: Fission (Binary and Multiple)',
          caseStudy: { intro: 'Observe a drop of pond water under a microscope — you see tiny Amoeba constantly changing shape and Paramecium swimming rapidly; notice some Amoeba appear.',
            decisions: [{ prompt: 'Define binary fission and name two organisms that reproduce by this method. State the type of nuclear division involved.', options: [
                { text: 'Binary fission is asexual reproduction where a parent cell divides into two genetically', outcome: 'Binary fission is asexual reproduction where a parent cell divides into two genetically identical.' },
                { text: 'meiosis', outcome: 'Not quite — Students think multiple fission only occurs in unfavorable conditions (like encystment in Amoeba).', reveals: 'multiple-fission-only-occurs-in' },
                { text: 'meiosis or sexual reproduction organisms like yeast', outcome: 'Not quite — Students think multiple fission only occurs in unfavorable conditions (like encystment in Amoeba).', reveals: 'multiple-fission-only-occurs-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_003', title: 'Asexual Reproduction: Fragmentation and Regeneration',
          caseStudy: { intro: 'Imagine finding a green slimy layer in a stagnant pond near your home — when you touch it, it breaks into tiny threads, yet each thread grows into a new green.',
            decisions: [{ prompt: 'Define fragmentation as a mode of asexual reproduction and name one organism that reproduces by this method.', options: [
                { text: 'Fragmentation is a mode of asexual reproduction in', outcome: 'Fragmentation is a mode of asexual reproduction in which the parent body breaks into two or more.' },
                { text: 'fragmentation is when an organism regrows lost parts', outcome: 'Not quite — Students often believe that fragmentation and regeneration are the same process because both result.', reveals: 'fragmentation-and-regeneration-are-the' },
                { text: 'regeneration', outcome: 'Not quite — Students often believe that fragmentation and regeneration are the same process because both result.', reveals: 'fragmentation-and-regeneration-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_004', title: 'Asexual Reproduction: Budding and Spore Formation',
          caseStudy: { intro: 'Imagine opening a container of idli batter left overnight in a warm Indian kitchen — it has risen and smells slightly sour.',
            decisions: [{ prompt: 'Define budding. Name two organisms that reproduce by budding and state whether they are unicellular or multicellular.', options: [
                { text: 'Budding is asexual reproduction where a new individual develops from an outgrowth (bud)', outcome: 'Budding is asexual reproduction where a new individual develops from an outgrowth (bud) on the.' },
                { text: 'the parent cell dividing into two unequal parts', outcome: 'Not quite — Students think budding is simply "the parent cell dividing into two unequal parts" and draw the bud.', reveals: 'budding-is-simply-the-parent' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_005', title: 'Sexual Reproduction in Flowering Plants: Flower Structure',
          caseStudy: { intro: 'Begin by asking the student to pluck a hibiscus (china rose) or mustard flower from a nearby garden — a familiar sight in Indian homes and fields.',
            decisions: [{ prompt: 'Name the four whorls of a typical angiosperm flower in order from outermost to innermost, and state which two are called essential whorls.', options: [
                { text: 'The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), gynoecium', outcome: 'The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), gynoecium (carpels).' },
                { text: 'a complete flower must have all four whorls', outcome: 'Not quite — Students believe that "a complete flower must have all four whorls" and therefore label any flower.', reveals: 'a-complete-flower-must-have' },
                { text: 'calyx and corolla as essential', outcome: 'Not quite — Students believe that "a complete flower must have all four whorls" and therefore label any flower.', reveals: 'a-complete-flower-must-have' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_006', title: 'Pollination: Self and Cross-Pollination, Agents of Pollination',
          caseStudy: { intro: 'Observe a hibiscus flower in your garden — notice how its stigma is positioned higher than the anthers, and how bees buzz around it collecting nectar.',
            decisions: [{ prompt: 'Define cross-pollination and name any two agents that bring it about.', options: [
                { text: 'Cross-pollination is the transfer of pollen grains from the anther of a flower to the', outcome: 'Cross-pollination is the transfer of pollen grains from the anther of a flower to the stigma of.' },
                { text: 'transfer within same flower', outcome: 'Not quite — Students think "cross-pollination always requires a different plant" and "self-pollination always.', reveals: 'cross-pollination-always-requires-a' },
                { text: 'cross-pollination always requires a different plant', outcome: 'Not quite — Students think "cross-pollination always requires a different plant" and "self-pollination always.', reveals: 'cross-pollination-always-requires-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'How Do Organisms Reproduce · Part 1/2', spots: [
            { id: 's1', label: 'Reproduction Importance and Modes Sexual vs Asexual', prompt: 'Which idea is this? — Reproduction is the biological process by which living organisms produce new individuals.', answer: 'Reproduction Importance and Modes Sexual vs Asexual', options: ['Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fission Binary and Multiple', 'Asexual Reproduction Fragmentation and Regeneration', 'Asexual Reproduction Budding and Spore Formation'] },
            { id: 's2', label: 'Asexual Reproduction Fission Binary and Multiple', prompt: 'Which idea is this? — Fission is a mode of asexual reproduction in which a single parent cell divides into two.', answer: 'Asexual Reproduction Fission Binary and Multiple', options: ['Asexual Reproduction Fission Binary and Multiple', 'Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fragmentation and Regeneration', 'Asexual Reproduction Budding and Spore Formation'] },
            { id: 's3', label: 'Asexual Reproduction Fragmentation and Regeneration', prompt: 'Which idea is this? — Fragmentation is a mode of asexual reproduction where the parent organism breaks into two.', answer: 'Asexual Reproduction Fragmentation and Regeneration', options: ['Asexual Reproduction Fragmentation and Regeneration', 'Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fission Binary and Multiple', 'Asexual Reproduction Budding and Spore Formation'] },
            { id: 's4', label: 'Asexual Reproduction Budding and Spore Formation', prompt: 'Which idea is this? — Budding is a mode of asexual reproduction where a new organism develops as a small.', answer: 'Asexual Reproduction Budding and Spore Formation', options: ['Asexual Reproduction Budding and Spore Formation', 'Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fission Binary and Multiple', 'Asexual Reproduction Fragmentation and Regeneration'] },
            { id: 's5', label: 'Sexual Reproduction in Flowering Plants Flower Structure', prompt: 'Which idea is this? — A flower is the reproductive shoot of an angiosperm, composed of four whorls of modified.', answer: 'Sexual Reproduction in Flowering Plants Flower Structure', options: ['Sexual Reproduction in Flowering Plants Flower Structure', 'Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fission Binary and Multiple', 'Asexual Reproduction Fragmentation and Regeneration'] },
            { id: 's6', label: 'Pollination Self and Cross-Pollination Agents of Pollination', prompt: 'Which idea is this? — Pollination is the transfer of pollen grains from the anther (male part) of a flower.', answer: 'Pollination Self and Cross-Pollination Agents of Pollination', options: ['Pollination Self and Cross-Pollination Agents of Pollination', 'Reproduction Importance and Modes Sexual vs Asexual', 'Asexual Reproduction Fission Binary and Multiple', 'Asexual Reproduction Fragmentation and Regeneration'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'A clinic offers genetic testing that can predict a baby\'s risk of a serious inherited disorder before birth. Some families welcome it; others worry about what happens when we start choosing which lives are \'worth\' having.',
            decisions: [{ prompt: 'Where should the line be drawn on using this technology?', options: [
                { text: 'Offer it freely — information empowers families', outcome: 'This choice maximizes autonomy and can prevent suffering, but risks quietly pressuring families toward \'acceptable\' children.' },
                { text: 'Allow it only for serious disorders', outcome: 'This tries to balance prevention with ethics, but someone must define \'serious\' — and that definition will always be contested.' },
                { text: 'Restrict it heavily until society agrees on rules', outcome: 'This protects against misuse but delays help for families who could act on it now.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Reema\'s grandmother fills the whole balcony with pots of money plant grown from cuttings of one parent. When a mealybug attack hits, every single plant suffers equally. She asks why the pests didn\'t spare at least a few.',
            decisions: [{ prompt: 'What explains why the whole collection was hit equally hard?', options: [
                { text: 'Cuttings are asexual reproduction — every plant is genetically identical to the parent, so whatever made one plant vulnerable made all of them vulnerable. Plants grown from seeds carry mixed genes and usually vary in resistance.', outcome: 'This is exactly the trade-off of asexual reproduction: fast and faithful copies, but no variation — so one disease or pest can wipe out an entire clone population.' },
                { text: 'Cloned plants are actually stronger, so the attack must have been caused by over-watering rather than the mealybugs.', outcome: 'Cloning copies genes exactly — it cannot add resistance the parent did not have. The bugs spread easily precisely because no plant had a different genetic defence.', reveals: 'cloning-adds-resistance' },
                { text: 'The pests attacked all plants equally because insects always spread uniformly through any group of pots.', outcome: 'Spread explains exposure, not equal damage — in a genetically varied population some individuals typically resist. Uniform collapse signals uniform genes.', reveals: 'spread-equals-damage' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Reproduction is life\'s way of saying: copy yourself, but not perfectly — the imperfections are how species survive what they can\'t predict.',
            decisions: [{ prompt: 'What comes next? How Do Organisms Reproduce · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — How Do Organisms Reproduce · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_001', difficulty: 'standard',
          question: 'Reproduction is the biological process by which living organisms produce new.',
          hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
          misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction.',
          parts: [
                { id: 'a', prompt: 'Define reproduction in biological terms and state why it is considered a characteristic of life, but not essential for the survival of an individual organism.', answer: 'Reproduction is the biological process by',
                  options: ['Reproduction is the biological process by', 'reproduction keeps the organism alive', 'reproduction provides energy', 'reproduction is necessary for the survival of the organism'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy.' },
                { id: 'b', prompt: 'A student says: "Asexual reproduction is better because it produces many offspring quickly without needing a partner." Explain why this statement is incomplete.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'asexual is faster', 'sexual needs two parents', 'reproduction is necessary for the survival of the organism'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy.' },
                { id: 'c', prompt: 'A bacterium divides by binary fission every 20 minutes under ideal conditions.', answer: 'The flowering plant population will show far greater genetic diversity',
                  options: ['The flowering plant population will show far greater genetic diversity', 'reproduction is necessary for the survival of the organism', 'reproduction provides energy to the body', 'without reproduction the organism will die'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy.' },
                { id: 'd', prompt: 'Compare the following two scenarios and identify which represents asexual reproduction and which represents sexual reproduction.', answer: 'Scenario A is asexual reproduction (vegetative propagation via runners)',
                  options: ['Scenario A is asexual reproduction (vegetative propagation via runners)', 'reproduction', 'reproduction is necessary for the survival of the organism', 'reproduction provides energy to the body'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy.' }
          ],
            remediations: { 'reproduction-is-necessary-for-the': { steps: ['Ask the student to list what an individual organism needs to stay alive for one day (food, water, oxygen, waste.', 'Ask what happens if that organism never reproduces — it lives and dies normally, but its genetic line ends.', 'Show a diagram of a mule (sterile hybrid) — it eats, breathes, grows, but cannot reproduce.', 'Contrast with a bacterial colony — each division is reproduction, but the "individual" is the cell line.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since asexual reproduction produces offspring faster and with less energy, it is the superior mode of reproduction and sexual.', answer: 'The claim is false',
                  options: ['The claim is false', 'sexual reproduction is better', 'one mode is better', 'reproduction is necessary for the survival of the organism'],
                  hint: 'If stuck, revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) for the mechanism.',
                  misconception: 'Students believe that "reproduction is necessary for the survival of the organism" and write answers like "reproduction provides energy.' }
          ],
            remediations: { 'reproduction-is-necessary-for-the': { steps: ['Ask the student to list what an individual organism needs to stay alive for one day (food, water, oxygen, waste.', 'Ask what happens if that organism never reproduces — it lives and dies normally, but its genetic line ends.', 'Show a diagram of a mule (sterile hybrid) — it eats, breathes, grows, but cannot reproduce.', 'Contrast with a bacterial colony — each division is reproduction, but the "individual" is the cell line.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_002', difficulty: 'standard',
          question: 'Fission is a mode of asexual reproduction in which a single parent cell divides.',
          hint: 'If stuck, review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on mitosis.',
          misconception: 'Students think multiple fission only occurs in unfavorable conditions (like encystment in Amoeba) and forget that.',
          parts: [
                { id: 'a', prompt: 'Explain why binary fission in Amoeba is called "irregular" while in Paramecium it is "transverse". What determines the plane of division?', answer: 'Amoeba has no fixed shape, so division plane is irregular (any plane)',
                  options: ['Amoeba has no fixed shape, so division plane is irregular (any plane)', 'Amoeba divides transversely'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on mitosis stages and.',
                  misconception: 'Students think multiple fission only occurs in unfavorable conditions (like encystment in Amoeba) and forget that Plasmodium undergoes.' },
                { id: 'b', prompt: 'A student observes a prepared slide of Plasmodium in a red blood cell showing many small nuclei in a common cytoplasm.', answer: 'Process: multiple fission (schizogony)',
                  options: ['Process: multiple fission (schizogony)', 'binary fission', 'budding'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on mitosis stages and.',
                  misconception: 'Students think multiple fission only occurs in unfavorable conditions (like encystment in Amoeba) and forget that Plasmodium undergoes.' }
          ],
            remediations: { 'multiple-fission-only-occurs-in': { steps: ['Revisit c9_bio_ch1_12 (mitosis stages) — draw prophase, metaphase, anaphase, telophase and label spindle fibers.', 'Watch a 2-minute video of Amoeba binary fission (search "Amoeba binary fission microscopy") — pause at each stage.', 'Compare with Plasmodium schizogony diagram in NCERT Fig. 8.5 — note multiple nuclei in one cytoplasm before cytokinesis.', 'Make a 2-column table: Binary vs Multiple fission with rows for nuclear divisions, cytokinesis timing, conditions.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_003', difficulty: 'standard',
          question: 'Fragmentation is a mode of asexual reproduction where the parent organism.',
          hint: 'If stuck, revisit c9_bio_ch3_1 (asexual reproduction modes overview) and c9_bio_ch1_12.',
          misconception: 'Students often believe that fragmentation and regeneration are the same process because both result in new individuals.',
          parts: [
                { id: 'a', prompt: 'Define fragmentation as a mode of asexual reproduction and name one organism that reproduces by this method.', answer: 'Fragmentation is a mode of asexual reproduction in',
                  options: ['Fragmentation is a mode of asexual reproduction in', 'fragmentation is when an organism regrows lost parts', 'regeneration', 'distinguish between'],
                  hint: 'If stuck, revisit c9_bio_ch3_1 (asexual reproduction modes overview) and c9_bio_ch1_12 (mitosis).',
                  misconception: 'Students often believe that fragmentation and regeneration are the same process because both result in new individuals from body pieces.' },
                { id: 'b', prompt: 'A student observes a green filamentous alga in a pond. After a few days, the filaments break into smaller pieces, and each piece grows into a new filament.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'regeneration', 'distinguish between'],
                  hint: 'If stuck, revisit c9_bio_ch3_1 (asexual reproduction modes overview) and c9_bio_ch1_12 (mitosis).',
                  misconception: 'Students often believe that fragmentation and regeneration are the same process because both result in new individuals from body pieces.' }
          ],
            remediations: { 'fragmentation-and-regeneration-are-the': { steps: ['Show the student a side-by-side video or diagram sequence — one of Spirogyra filament breaking naturally at septa over.', 'Have them complete a comparison table with columns: Organism, Trigger (Natural breakage / Injury), Cells involved.', 'Give them a CBSE-style "Distinguish between fragmentation and regeneration in three points" question and mark it using.', 'If confusion persists, revisit Class 9 meristematic tissue concept (c9_bio_ch2_2) — connect how plant meristems are.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_004', difficulty: 'standard',
          question: 'Budding is a mode of asexual reproduction where a new organism develops as.',
          hint: 'Revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c10_bio_cbse_03_002.',
          misconception: 'Students think budding is simply "the parent cell dividing into two unequal parts" and draw the bud as a miniature.',
          parts: [
                { id: 'a', prompt: 'Why is spore formation considered an asexual mode of reproduction? Explain the role of the sporangium in Rhizopus.', answer: 'Spore formation is asexual',
                  options: ['Spore formation is asexual', 'the parent cell dividing into two unequal parts'],
                  hint: 'Revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c10_bio_cbse_03_002 (Fission).',
                  misconception: 'Students think budding is simply "the parent cell dividing into two unequal parts" and draw the bud as a miniature version of the parent.' },
                { id: 'b', prompt: 'A student observes a moist piece of leather kept in a dark cupboard during rainy season.', answer: 'Organism: Rhizopus (bread mold)',
                  options: ['Organism: Rhizopus (bread mold)', 'the parent cell dividing into two unequal parts'],
                  hint: 'Revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c10_bio_cbse_03_002 (Fission).',
                  misconception: 'Students think budding is simply "the parent cell dividing into two unequal parts" and draw the bud as a miniature version of the parent.' },
                { id: 'c', prompt: 'Compare budding in yeast and Hydra on the basis of: (a) cellularity of parent organism, (b) fate of the bud after maturation, (c) nuclear division and.', answer: 'cellularity of parent organism, (',
                  options: ['cellularity of parent organism, (', 'the parent cell dividing into two unequal parts'],
                  hint: 'Revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c10_bio_cbse_03_002 (Fission).',
                  misconception: 'Students think budding is simply "the parent cell dividing into two unequal parts" and draw the bud as a miniature version of the parent.' }
          ],
            remediations: { 'budding-is-simply-the-parent': { steps: ['Show a time-lapse video of yeast budding (e.g., from NCERT or YouTube) — pause at 0, 20, 40, 60 min to trace nucleus.', 'Contrast side-by-side: binary fission (Amoeba) diagram vs budding (yeast) diagram — highlight "equal division,.', 'For Rhizopus, use a prepared slide or diagram — ask student to count nuclei in sporangium vs bud.', 'Have student re-draw budding stages with arrows showing nucleus position at each stage; verify with teacher.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_005', difficulty: 'standard',
          question: 'A flower is the reproductive shoot of an angiosperm, composed of four whorls.',
          hint: 'If stuck, revisit Class 9 node c9_bio_ch3_5 (Parts of a Flower) and practice drawing and.',
          misconception: 'Students believe that "a complete flower must have all four whorls" and therefore label any flower missing sepals.',
          parts: [
                { id: 'a', prompt: 'A student observes a flower where the sepals are brightly coloured and petal-like, while the petals are absent.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'a complete flower must have all four whorls'],
                  hint: 'If stuck, revisit Class 9 node c9_bio_ch3_5 (Parts of a Flower) and practice drawing and labeling.',
                  misconception: 'Students believe that "a complete flower must have all four whorls" and therefore label any flower missing sepals or petals as \'incomplete\'.' },
                { id: 'b', prompt: 'In a longitudinal section of a mustard flower ovary, you observe ovules attached to the inner wall of the ovary along a swollen ridge.', answer: 'The placentation is parietal',
                  options: ['The placentation is parietal', 'a complete flower must have all four whorls'],
                  hint: 'If stuck, revisit Class 9 node c9_bio_ch3_5 (Parts of a Flower) and practice drawing and labeling.',
                  misconception: 'Students believe that "a complete flower must have all four whorls" and therefore label any flower missing sepals or petals as \'incomplete\'.' },
                { id: 'c', prompt: 'Compare the structural adaptations of a wind-pollinated flower (e.g., maize) and an insect-pollinated flower (e.g., mustard) with respect to: (a) perianth, (b).', answer: '| Feature | Wind-pollinated (Maize) | Insect-pollinated (Mustard) |',
                  options: ['| Feature | Wind-pollinated (Maize) | Insect-pollinated (Mustard) |', 'a complete flower must have all four whorls', 'wind-pollinated flowers have coloured petals'],
                  hint: 'If stuck, revisit Class 9 node c9_bio_ch3_5 (Parts of a Flower) and practice drawing and labeling.',
                  misconception: 'Students believe that "a complete flower must have all four whorls" and therefore label any flower missing sepals or petals as \'incomplete\'.' }
          ],
            remediations: { 'a-complete-flower-must-have': { steps: ['Have the student collect three flowers — one with all four whorls (mustard), one unisexual male (pumpkin staminate).', 'For each, tick a checklist: [ ] Calyx [ ] Corolla [ ] Androecium [ ] Gynoecium.', 'Ask: "Which flowers are \'complete\'? Which are \'perfect\'?"', 'Guide them to write: "Complete = all four whorls present (morphology).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_006', difficulty: 'standard',
          question: 'Pollination is the transfer of pollen grains from the anther (male part) of.',
          hint: 'Revise Class 9 node c9_bio_ch3_5 (flower parts) and c9_bio_ch3_6 (pollination basics).',
          misconception: 'Students think "cross-pollination always requires a different plant" and "self-pollination always occurs within the.',
          parts: [
                { id: 'a', prompt: 'A maize plant produces large amounts of light, smooth pollen grains, and its stigma is feathery and exposed.', answer: 'Maize is wind-pollinated (anemophily)',
                  options: ['Maize is wind-pollinated (anemophily)', 'insect-pollinated', 'cross-pollination always requires a different plant', 'self-pollination always occurs within the same flower'],
                  hint: 'Revise Class 9 node c9_bio_ch3_5 (flower parts) and c9_bio_ch3_6 (pollination basics) — focus.',
                  misconception: 'Students think "cross-pollination always requires a different plant" and "self-pollination always occurs within the same flower." The exact.' },
                { id: 'b', prompt: 'A farmer grows a pure line of wheat (self-pollinated) and a variety of maize (cross-pollinated) in adjacent fields.', answer: 'Maize will show more variation',
                  options: ['Maize will show more variation', 'both show same variation', 'cross-pollination always requires a different plant', 'self-pollination always occurs within the same flower'],
                  hint: 'Revise Class 9 node c9_bio_ch3_5 (flower parts) and c9_bio_ch3_6 (pollination basics) — focus.',
                  misconception: 'Students think "cross-pollination always requires a different plant" and "self-pollination always occurs within the same flower." The exact.' },
                { id: 'c', prompt: 'Compare the floral adaptations of a water-pollinated flower (e.g., Vallisneria) and an insect-pollinated flower (e.g., sunflower) in a table with three rows.', answer: 'Vallisneria: pollen long, ribbon-like, unwettable',
                  options: ['Vallisneria: pollen long, ribbon-like, unwettable', 'analyse', 'cross-pollination always requires a different plant', 'self-pollination always occurs within the same flower'],
                  hint: 'Revise Class 9 node c9_bio_ch3_5 (flower parts) and c9_bio_ch3_6 (pollination basics) — focus.',
                  misconception: 'Students think "cross-pollination always requires a different plant" and "self-pollination always occurs within the same flower." The exact.' }
          ],
            remediations: { 'cross-pollination-always-requires-a': { steps: ['Draw three flowers on one plant. Label anther and stigma.', 'Trace pollen path for (a) same flower (autogamy), (b) different flower same plant (geitonogamy), (c) different plant.', 'Write genetic outcome for each — autogamy and geitonogamy both produce homozygous offspring; only xenogamy produces.', 'Memorise the rule: "Geitonogamy is functionally cross-pollination but genetically self-pollination." Practice with.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
