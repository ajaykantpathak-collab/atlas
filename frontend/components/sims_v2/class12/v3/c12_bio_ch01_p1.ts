import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch01_p1: SimDef = {
    id: 'v3_c12_bio_ch01_p1',
    title: 'Reproduction in Organisms · Part 1/2',
    subtitle: 'A potato eye and a mango flower perform the same miracle by opposite logic.',
    classLevel: 12, subject: 'biology', topic: 'Reproduction in Organisms · Part 1/2',
    chapters: ['c12_bio_ch01'],
    nodeIds: ['c12_bio_cbse_01_001', 'c12_bio_cbse_01_002', 'c12_bio_cbse_01_003', 'c12_bio_cbse_01_004', 'c12_bio_cbse_01_005', 'c12_bio_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field biologist cataloguing reproduction strategies', intro: 'Life has exactly two ways to copy itself — and the difference decides whether a species survives change.', goal: 'Distinguish asexual from sexual reproduction by mechanism and evaluate the significance of each.' },
    discovery: {
        question: 'A potato sprouts a new plant from an \'eye\' while a mango needs flowers, pollen and seeds. What single feature truly separates these two modes of reproduction?',
        options: ['Whether gametes fuse — the potato clones itself through mitosis; the mango requires fertilisation between gametes', 'Whether a seed forms — everything producing seeds is sexual, everything else asexual', 'Whether two parents exist — sexual reproduction always needs two separate individuals', 'Whether the offspring looks different — identical offspring always mean asexual reproduction'],
        answer: 'Whether gametes fuse — the potato clones itself through mitosis; the mango requires fertilisation between gametes',
        hook: 'Students count parents or look for seeds — the real boundary is gamete fusion, which is why a single organism can still reproduce sexually and identical-looking offspring can come from either mode.',
    },
    teaching: [
        { title: 'Reproduction: Types - Asexual and Sexual', text: 'Reproduction is the biological process by which living organisms produce new individuals of the same species, ensuring continuity of life.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_01_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Sort a field of organisms — Amoeba, yeast in idli batter, Spirogyra, flowering plants — into their reproductive modes, then defend why variation matters more than speed for a species\' future.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_001', title: 'Reproduction: Types - Asexual and Sexual',
          caseStudy: { intro: 'Start by observing a potato sprouting from an \'eye\' and a mango tree flowering in spring — both produce new individuals but through radically different.',
            decisions: [{ prompt: 'Define asexual reproduction and name one organism that reproduces exclusively by this mode.', options: [
                { text: 'Asexual reproduction is a mode where a single parent produces offspring without the', outcome: 'Asexual reproduction is a mode where a single parent produces offspring without the formation and.' },
                { text: 'sexual reproduction involves one parent', outcome: 'Not quite — Students often think that asexual reproduction occurs only in \'lower\' organisms (bacteria, fungi).', reveals: 'asexual-reproduction-occurs-only-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_002', title: 'Asexual Reproduction: Binary Fission, Budding, Fragmentation',
          caseStudy: { intro: 'Start by asking students to recall the yeast bubbles they see in fermenting idli/dosa batter or the green filamentous algae (*Spirogyra*) in stagnant ponds.',
            decisions: [{ prompt: 'Define binary fission and name two organisms in which it occurs.', options: [
                { text: 'Binary fission is a type of asexual reproduction where a single parent cell divides into', outcome: 'Binary fission is a type of asexual reproduction where a single parent cell divides into two nearly.' },
                { text: 'binary fission produces four daughter cells', outcome: 'Not quite — Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are.', reveals: 'binary-fission-in-amoeba-and' },
                { text: 'binary fission', outcome: 'Not quite — Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are.', reveals: 'binary-fission-in-amoeba-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_003', title: 'Vegetative Propagation in Plants: Natural and Artificial',
          caseStudy: { intro: 'Observe a potato tuber sprouting in your kitchen — each "eye" is a node with a dormant bud capable of growing into a complete plant.',
            decisions: [{ prompt: 'Name the type of vegetative propagule in each: (a) Offset of water hyacinth, (b) Bulbil of Dioscorea, (c) Runner of strawberry, (d) Tuber.', options: [
                { text: '(a) Offset — short lateral stem branch with rosette of leaves and adventitious roots', outcome: '(a) Offset — short lateral stem branch with rosette of leaves and adventitious roots; stem.' },
                { text: 'vegetative propagation produces exact genetic clones with zero variation', outcome: 'Not quite — Students believe "vegetative propagation produces exact genetic clones with zero variation" and.', reveals: 'vegetative-propagation-produces-exact-genetic' },
                { text: 'tissue culture always yields true-to-type plants', outcome: 'Not quite — Students believe "vegetative propagation produces exact genetic clones with zero variation" and.', reveals: 'vegetative-propagation-produces-exact-genetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_004', title: 'Sexual Reproduction: Phases - Pre-fertilization, Fertilization, Post-fertilization',
          caseStudy: { intro: 'Observe a mango tree in your neighbourhood during flowering season — you see thousands of flowers, but only a few become fruits. Why?',
            decisions: [{ prompt: 'Name the three sequential phases of sexual reproduction and state the defining event of each phase.', options: [
                { text: 'The three phases are: (1) Pre-fertilization', outcome: 'The three phases are: (1) Pre-fertilization — defining event is gametogenesis (meiotic formation.' },
                { text: 'pollination, fertilization, seed formation', outcome: 'Not quite — Students often believe that "pre-fertilization" only means pollination in plants and mating.', reveals: 'pre-fertilization-only-means-pollination' },
                { text: 'meiosis', outcome: 'Not quite — Students often believe that "pre-fertilization" only means pollination in plants and mating.', reveals: 'pre-fertilization-only-means-pollination' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_005', title: 'Gametogenesis: Spermatogenesis and Oogenesis',
          caseStudy: { intro: 'Observe a teenager\'s voice deepening and facial hair appearing — these visible changes signal that spermatogenesis has been active for months, driven.',
            decisions: [{ prompt: 'A Class 12 student states: "Spermatogenesis and oogenesis both involve meiosis, so they both produce four haploid gametes from one diploid.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect because it ignores cytokinesis asymmetry in oogenesis.' },
                { text: 'meiosis produces four cells', outcome: 'Not quite — Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic.', reveals: 'oogenesis-produces-one-egg-and' },
                { text: 'why only one ovum is formed', outcome: 'Not quite — Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic.', reveals: 'oogenesis-produces-one-egg-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_006', title: 'Fertilization: Events and Significance',
          caseStudy: { intro: 'Begin by showing a student a time-lapse video of a pollen tube growing down a style and entering an ovule — a real process captured in labs studying crops like.',
            decisions: [{ prompt: 'Name the two distinct fusion events that constitute double fertilization in angiosperms and state the ploidy of the product formed in each.', options: [
                { text: 'The two fusion events are: (1) Syngamy', outcome: 'The two fusion events are: (1) Syngamy — fusion of one male gamete (n) with the egg cell (n).' },
                { text: 'both fusions produce diploid cells, or confusing polar nuclei with synergids', outcome: 'Not quite — Students often think the two male gametes are identical and interchangeable, so it doesn\'t matter.', reveals: 'the-two-male-gametes-are' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Reproduction in Organisms · Part 1/2', spots: [
            { id: 's1', label: 'Reproduction Types - Asexual and Sexual', prompt: 'Which idea is this? — Reproduction is the biological process by which living organisms produce new individuals.', answer: 'Reproduction Types - Asexual and Sexual', options: ['Reproduction Types - Asexual and Sexual', 'Asexual Reproduction Binary Fission Budding Fragmentation', 'Vegetative Propagation in Plants Natural and Artificial', 'Gametogenesis Spermatogenesis and Oogenesis'] },
            { id: 's2', label: 'Asexual Reproduction Binary Fission Budding Fragmentation', prompt: 'Which idea is this? — Asexual reproduction is a mode of reproduction in which a single parent produces.', answer: 'Asexual Reproduction Binary Fission Budding Fragmentation', options: ['Asexual Reproduction Binary Fission Budding Fragmentation', 'Reproduction Types - Asexual and Sexual', 'Vegetative Propagation in Plants Natural and Artificial', 'Gametogenesis Spermatogenesis and Oogenesis'] },
            { id: 's3', label: 'Vegetative Propagation in Plants Natural and Artificial', prompt: 'Which idea is this? — Vegetative propagation is a mode of asexual reproduction in plants where new individuals.', answer: 'Vegetative Propagation in Plants Natural and Artificial', options: ['Vegetative Propagation in Plants Natural and Artificial', 'Reproduction Types - Asexual and Sexual', 'Asexual Reproduction Binary Fission Budding Fragmentation', 'Gametogenesis Spermatogenesis and Oogenesis'] },
            { id: 's4', label: 'Gametogenesis Spermatogenesis and Oogenesis', prompt: 'Which idea is this? — Gametogenesis is the process of formation of haploid male and female gametes (sperm and.', answer: 'Gametogenesis Spermatogenesis and Oogenesis', options: ['Gametogenesis Spermatogenesis and Oogenesis', 'Reproduction Types - Asexual and Sexual', 'Asexual Reproduction Binary Fission Budding Fragmentation', 'Vegetative Propagation in Plants Natural and Artificial'] },
            { id: 's5', label: 'Fertilization Events and Significance', prompt: 'Which idea is this? — Fertilization in flowering plants is the process of double fertilization where one male.', answer: 'Fertilization Events and Significance', options: ['Fertilization Events and Significance', 'Reproduction Types - Asexual and Sexual', 'Asexual Reproduction Binary Fission Budding Fragmentation', 'Vegetative Propagation in Plants Natural and Artificial'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A banana grower\'s entire plantation — all raised from suckers of one parent plant — gets wiped out by a new fungus, while a nearby patch grown from seeds shows mixed survival. He asks the agri-student intern why his field had zero resistant plants.',
            decisions: [{ prompt: 'What explains the wipe-out?', options: [
                { text: 'Suckers are asexual clones — genetically identical, so no variation in resistance existed; the seed-grown patch came through meiosis and fertilisation, so some plants carried resistance combinations.', outcome: 'Clonal propagation is fast and uniform, but uniformity means one pathogen can fell the whole field; variation is the insurance sexual reproduction buys.' },
                { text: 'The fungus was simply too strong — the mode of reproduction makes no difference to whether plants resist disease.', outcome: 'Resistance is genetic; with identical genomes every plant shares the same susceptibility, so reproduction mode is exactly what decided the outcome.', reveals: 'reproduction-mode-irrelevant' },
                { text: 'Asexual reproduction is a primitive, failed strategy — the farmer should never have used suckers at all.', outcome: 'In stable conditions cloning is cheap and rapid — it\'s the standard for uniform crops; the real cost is losing variation for new threats, not that the mode is \'primitive\'.', reveals: 'asexual-always-inferior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now classify any reproduction you meet by its mechanism, not its looks. Asexual vs sexual anchoring is core board content — and the opening question of all evolutionary biology.',
            decisions: [{ prompt: 'What comes next? Reproduction in Organisms · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reproduction in Organisms · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_001', difficulty: 'standard',
          question: 'Reproduction is the biological process by which living organisms produce new.',
          hint: 'Review Class 11 nodes c11_bio_cbse_10_006, c11_bio_cbse_10_007, c11_bio_cbse_10_008.',
          misconception: 'Students often think that asexual reproduction occurs only in \'lower\' organisms (bacteria, fungi) and sexual.',
          parts: [
                { id: 'a', prompt: 'A student observes that a yeast culture produces buds, while a nearby hydra also shows budding. Are both processes considered asexual reproduction? Justify.', answer: 'Yes, both are asexual reproduction',
                  options: ['Yes, both are asexual reproduction', 'yeast is a fungus so it\'s different'],
                  hint: 'Review Class 11 nodes c11_bio_cbse_10_006, c11_bio_cbse_10_007, c11_bio_cbse_10_008 on meiosis and.',
                  misconception: 'Students often think that asexual reproduction occurs only in \'lower\' organisms (bacteria, fungi) and sexual reproduction only in \'higher\'.' },
                { id: 'b', prompt: 'Compare the cellular basis of asexual and sexual reproduction in terms of chromosome number and type of cell division.', answer: 'Asexual reproduction typically involves mitotic divisions, maintaining the same',
                  options: ['Asexual reproduction typically involves mitotic divisions, maintaining the same', 'both use mitosis'],
                  hint: 'Review Class 11 nodes c11_bio_cbse_10_006, c11_bio_cbse_10_007, c11_bio_cbse_10_008 on meiosis and.',
                  misconception: 'Students often think that asexual reproduction occurs only in \'lower\' organisms (bacteria, fungi) and sexual reproduction only in \'higher\'.' }
          ],
            remediations: { 'asexual-reproduction-occurs-only-in': { steps: ['If the student holds this misconception, have them list five plants and five animals they know, then research each.', 'Use NCERT Class 12 Chapter 1 examples: potato (vegetative), strawberry (runner), honeybee (sexual), amoeba (asexual).', 'Revisit Class 10 node c10_bio_cbse_03_001 (Reproduction: Importance and Modes) and c10_bio_cbse_03_002.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_002', difficulty: 'standard',
          question: 'Asexual reproduction is a mode of reproduction in which a single parent.',
          hint: 'If stuck, revisit **c11_bio_cbse_10_003** (Mitosis stages) and **c11_bio_cbse_10_001**.',
          misconception: 'Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are "binary fission".',
          parts: [
                { id: 'a', prompt: 'Why is binary fission in *Amoeba* described as "irregular" while in *Paramecium* it is "transverse"?', answer: 'In *Amoeba*, the plane of division is not fixed and can occur along any plane',
                  options: ['In *Amoeba*, the plane of division is not fixed and can occur along any plane', 'both divide transversely', 'both are irregular', 'binary fission'],
                  hint: 'If stuck, revisit **c11_bio_cbse_10_003** (Mitosis stages) and **c11_bio_cbse_10_001** (Cell cycle.',
                  misconception: 'Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are "binary fission".' },
                { id: 'b', prompt: 'A student observes a unicellular fungus forming a small protrusion that enlarges, receives a nucleus, and eventually separates.', answer: 'The organism is **yeast** (a unicellular fungus) and the mode is **budding**',
                  options: ['The organism is **yeast** (a unicellular fungus) and the mode is **budding**', 'both are identical', 'yeast forms a multicellular bud', 'binary fission'],
                  hint: 'If stuck, revisit **c11_bio_cbse_10_003** (Mitosis stages) and **c11_bio_cbse_10_001** (Cell cycle.',
                  misconception: 'Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are "binary fission".' }
          ],
            remediations: { 'binary-fission-in-amoeba-and': { steps: ['Re‑watch the mitosis animation in **c11_bio_cbse_10_003** (Mitosis: Prophase, Metaphase, Anaphase, Telophase) to recall.', 'Re‑read **c9_bio_ch3_1** (Asexual Reproduction: Definition and Modes) and **c10_bio_cbse_03_002/03_003/03_004** for.', 'Draw side‑by‑side diagrams of *Amoeba* (irregular) vs.', '*Paramecium* (transverse) fission, labelling nucleus, pellicle, cleavage furrow.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are "binary fission".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Fragmentation and regeneration are the same process." Provide a biological argument with examples.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'differentiate', 'binary fission'],
                  hint: 'If stuck, revisit **c11_bio_cbse_10_003** (Mitosis stages) and **c11_bio_cbse_10_001** (Cell cycle.',
                  misconception: 'Students often think **binary fission in *Amoeba* and *Paramecium* are identical** because both are "binary fission".' }
          ],
            remediations: { 'binary-fission-in-amoeba-and': { steps: ['Re‑watch the mitosis animation in **c11_bio_cbse_10_003** (Mitosis: Prophase, Metaphase, Anaphase, Telophase) to recall.', 'Re‑read **c9_bio_ch3_1** (Asexual Reproduction: Definition and Modes) and **c10_bio_cbse_03_002/03_003/03_004** for.', 'Draw side‑by‑side diagrams of *Amoeba* (irregular) vs.', '*Paramecium* (transverse) fission, labelling nucleus, pellicle, cleavage furrow.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_003', difficulty: 'standard',
          question: 'Vegetative propagation is a mode of asexual reproduction in plants where new.',
          hint: 'If stuck on why cuttings root: revisit c11_bio_cbse_13_003 (auxin transport and root.',
          misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always.',
          parts: [
                { id: 'a', prompt: 'Name the type of vegetative propagule in each: (a) Offset of water hyacinth, (b) Bulbil of Dioscorea, (c) Runner of strawberry, (d) Tuber of potato.', answer: 'Offset of water hyacinth, (',
                  options: ['Offset of water hyacinth, (', 'vegetative propagation produces exact genetic clones with zero variation', 'tissue culture always yields true-to-type plants'],
                  hint: 'If stuck on why cuttings root: revisit c11_bio_cbse_13_003 (auxin transport and root initiation).',
                  misconception: 'Students believe "vegetative propagation produces exact genetic clones with zero variation" and "tissue culture always yields true-to-type.' }
          ],
            remediations: { 'vegetative-propagation-produces-exact-genetic': { steps: ['If the student confuses stem vs root tubers: revisit c11_bio_cbse_05_001 (Root: Types and Modifications) and.', 'If auxin role is unclear: review c11_bio_cbse_13_003 (Plant Growth Regulators: Auxins) — perform the classic oat.', 'Re-diagnostic: take a potato and sweet potato, slice longitudinally, draw and label nodes/internodes — which has them?'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_004', difficulty: 'standard',
          question: 'Sexual reproduction is a biological process involving the formation and fusion.',
          hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_008 (Significance.',
          misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that.',
          parts: [
                { id: 'a', prompt: 'Name the three sequential phases of sexual reproduction and state the defining event of each phase.', answer: 'The three phases are: (1) Pre-fertilization',
                  options: ['The three phases are: (1) Pre-fertilization', 'pollination, fertilization, seed formation', 'meiosis', 'pre-fertilization'],
                  hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_008 (Significance of Meiosis).',
                  misconception: 'Students often believe that "pre-fertilization" only means pollination in plants and mating in animals, forgetting that gametogenesis.' }
          ],
            remediations: { 'pre-fertilization-only-means-pollination': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to recall that meiosis produces haploid.', 'Review c11_bio_cbse_05_006 (Androecium and Gynoecium) to connect flower parts to gamete-producing structures.', 'Draw a flowchart: Diploid sporophyte → (meiosis) → Haploid spores → (mitosis) → Gametophytes → Gametes →.', 'Self-test: "In which phase does meiosis occur? What is the ploidy of cells entering meiosis?'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_005', difficulty: 'standard',
          question: 'Gametogenesis is the process of formation of haploid male and female gametes.',
          hint: 'If confused about chromosome vs chromatid counting, revisit c11_bio_cbse_10_006 (Meiosis.',
          misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they.',
          parts: [
                { id: 'a', prompt: 'A Class 12 student states: "Spermatogenesis and oogenesis both involve meiosis, so they both produce four haploid gametes from one diploid germ cell." Identify.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'meiosis produces four cells', 'why only one ovum is formed'],
                  hint: 'If confused about chromosome vs chromatid counting, revisit c11_bio_cbse_10_006 (Meiosis I) and.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' },
                { id: 'b', prompt: 'Compare the role of Sertoli cells in spermatogenesis with granulosa cells in oogenesis.', answer: 'Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight',
                  options: ['Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight', 'nourishment', 'why only one ovum is formed'],
                  hint: 'If confused about chromosome vs chromatid counting, revisit c11_bio_cbse_10_006 (Meiosis I) and.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' }
          ],
            remediations: { 'oogenesis-produces-one-egg-and': { steps: ['Revisit Class 11 meiosis node c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus.', 'Watch a time-lapse video of mouse oocyte meiosis I (available on YouTube: "oocyte asymmetric division") to visualise.', 'Draw side-by-side comparison: spermatocyte (central spindle, equal cytokinesis) vs oocyte (cortical spindle, asymmetric.', 'Re-attempt Diagnostic Question 1 and 2. If still stuck, review c11_bio_cbse_19_005 (Gonad hormones) for hormonal.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_006', difficulty: 'standard',
          question: 'Fertilization in flowering plants is the process of double fertilization where.',
          hint: 'If stuck, review the development of the embryo sac from the functional megaspore.',
          misconception: 'Students often think the two male gametes are identical and interchangeable, so it doesn\'t matter which fuses with the.',
          parts: [
                { id: 'a', prompt: 'Name the two distinct fusion events that constitute double fertilization in angiosperms and state the ploidy of the product formed in each.', answer: 'The two fusion events are: (1) Syngamy',
                  options: ['The two fusion events are: (1) Syngamy', 'both fusions produce diploid cells, or confusing polar nuclei with synergids'],
                  hint: 'If stuck, review the development of the embryo sac from the functional megaspore (monosporic.',
                  misconception: 'Students often think the two male gametes are identical and interchangeable, so it doesn\'t matter which fuses with the egg and which with.' },
                { id: 'b', prompt: 'Why does the zygote remain dormant for some time after fertilization while the primary endosperm nucleus divides rapidly?', answer: 'The zygote remains dormant until sufficient endosperm has formed',
                  options: ['The zygote remains dormant until sufficient endosperm has formed', 'zygote waits for hormones', 'endosperm divides slowly'],
                  hint: 'If stuck, review the development of the embryo sac from the functional megaspore (monosporic.',
                  misconception: 'Students often think the two male gametes are identical and interchangeable, so it doesn\'t matter which fuses with the egg and which with.' }
          ],
            remediations: { 'the-two-male-gametes-are': { steps: ['If a student holds this misconception: (1) Revisit the structure of the mature pollen grain (2-celled vs 3-celled.', '(2) Watch an animation of pollen tube discharge showing the two sperm cells moving to different targets — the egg and.', '(3) Read the NCERT description of filiform apparatus guiding the pollen tube to the synergid and the subsequent.', '(4) Do a targeted diagnostic: "If the two male gametes were interchangeable, what would prevent both from fusing with.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
