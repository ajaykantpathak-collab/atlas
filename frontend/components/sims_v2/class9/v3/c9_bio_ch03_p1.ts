import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch03_p1: SimDef = {
    id: 'v3_c9_bio_ch03_p1',
    title: 'Reproduction in Living Organisms · Part 1/2',
    subtitle: 'One parent, infinite copies',
    classLevel: 9, subject: 'biology', topic: 'Reproduction in Living Organisms · Part 1/2',
    chapters: ['c9_bio_ch03'],
    nodeIds: ['c9_bio_ch3_1', 'c9_bio_ch3_10', 'c9_bio_ch3_11', 'c9_bio_ch3_12', 'c9_bio_ch3_2', 'c9_bio_ch3_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reproduction-mode classifier', intro: 'No mates, no seeds, no fuss — yet life copies itself everywhere around you. Learn to tell budding from fission from fragmentation, and why clones are both a superpower and a weakness.', goal: 'Understand asexual reproduction — single parent, no gamete fusion, genetically identical offspring — across binary fission, budding, fragmentation, regeneration, spore formation and vegetative propagation.' },
    discovery: {
        question: 'Bread left out in monsoon turns fuzzy green in days — no parent pair, no seeds, no gametes. How did mould multiply all by itself?',
        options: ['Asexual reproduction — one parent\'s DNA copies itself by mitosis, so every offspring is a genetic clone', 'The mould mated with invisible partners', 'It grew from tiny seeds in the air', 'Bread spontaneously generates mould'],
        answer: 'Asexual reproduction — one parent\'s DNA copies itself by mitosis, so every offspring is a genetic clone',
        hook: 'Asexual isn\'t just for bacteria and yeast. Planaria regrow from fragments, Hydra buds off babies, starfish split — and your potato\'s \'eyes\' are cloning the whole plant without a single seed.',
    },
    teaching: [
        { title: 'Asexual Reproduction: Definition and Modes', text: 'Asexual reproduction is a mode of reproduction in which a single parent produces offspring without the formation or fusion of gametes, resulting in genetically identical offspring (clones) through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch3_1', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Sort six ways of making copies: binary fission in Amoeba, budding in yeast, fragmentation in Spirogyra, regeneration in Planaria, spores in mould, and potato eyes — then weigh the speed of cloning against its zero-variety risk.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch3_1', title: 'Asexual Reproduction: Definition and Modes',
          caseStudy: { intro: 'Observe a piece of bread left on the kitchen counter for 3-4 days in humid Indian monsoon weather — fuzzy greenish patches appear and spread rapidly.',
            decisions: [{ prompt: 'Define asexual reproduction in one sentence using the terms \'gamete\', \'fusion\', and \'genetically identical\'.', options: [
                { text: 'Asexual reproduction is the production of offspring by a single parent without the', outcome: 'Asexual reproduction is the production of offspring by a single parent without the formation.' },
                { text: 'reproduction without seeds', outcome: 'Not quite — Students think "asexual reproduction only occurs in unicellular organisms and simple plants".', reveals: 'asexual-reproduction-only-occurs-in' },
                { text: 'reproduction in bacteria only', outcome: 'Not quite — Students think "asexual reproduction only occurs in unicellular organisms and simple plants".', reveals: 'asexual-reproduction-only-occurs-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_10', title: 'Pregnancy and Embryonic Development',
          caseStudy: { intro: 'Imagine a pregnant woman in your neighborhood visiting the clinic for her monthly check-up — the doctor measures her abdomen, listens for a heartbeat, and.',
            decisions: [{ prompt: 'Define the term "blastocyst" and state its significance in human pregnancy.', options: [
                { text: 'A blastocyst is a hollow ball of cells formed around day 5-6 after fertilization,', outcome: 'A blastocyst is a hollow ball of cells formed around day 5-6 after fertilization, consisting of.' },
                { text: 'fertilized egg', outcome: 'Not quite — Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its.', reveals: 'the-embryo-breathes-and-eats' },
                { text: 'morula', outcome: 'Not quite — Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its.', reveals: 'the-embryo-breathes-and-eats' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_11', title: 'Reproductive Health: Contraception Methods',
          caseStudy: { intro: 'Imagine a newly married couple in your neighborhood discussing when to have their first child — they want to finish studies and secure jobs first.',
            decisions: [{ prompt: 'Name any two barrier methods of contraception and state the primary principle behind their action.', options: [
                { text: 'Correct answer: Male condom and female condom (or diaphragm/cervical cap)', outcome: 'Correct answer: Male condom and female condom (or diaphragm/cervical cap); they act by physically.' },
                { text: 'copper-T and oral pills', outcome: 'Not quite — Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility.', reveals: 'hormonal-contraceptives-pills' },
                { text: 'damage the uterus', outcome: 'Not quite — Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility.', reveals: 'hormonal-contraceptives-pills' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_12', title: 'Sexually Transmitted Infections: Prevention and Awareness',
          caseStudy: { intro: 'Begin by asking students to recall the Class 8 lesson on infectious disease transmission (c8_bio_ch2_5) where they learned about direct and indirect contact.',
            decisions: [{ prompt: 'Name any two bacterial STIs and two viral STIs, and state the specific causative organism for each.', options: [
                { text: 'Bacterial: Gonorrhea (Neisseria gonorrhoeae), Syphilis (Treponema pallidum)', outcome: 'Bacterial: Gonorrhea (Neisseria gonorrhoeae), Syphilis (Treponema pallidum).' },
                { text: 'STIs only happen to people who have many sexual partners', outcome: 'Not quite — Students believe that "STIs only happen to people who have many sexual partners" and that "if.', reveals: 'stis-only-happen-to-people' },
                { text: 'if I have only one partner, I don\'t need protection', outcome: 'Not quite — Students believe that "STIs only happen to people who have many sexual partners" and that "if.', reveals: 'stis-only-happen-to-people' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_2', title: 'Vegetative Propagation in Plants: Natural and Artificial',
          caseStudy: { intro: 'Observe a potato left in your kitchen for a week — small buds (eyes) sprout and grow into leafy shoots.',
            decisions: [{ prompt: 'Define vegetative propagation and state one fundamental way it differs from sexual reproduction in plants at the cellular level.', options: [
                { text: 'Vegetative propagation is asexual reproduction where new plants arise from vegetative', outcome: 'Vegetative propagation is asexual reproduction where new plants arise from vegetative parts (root.' },
                { text: 'vegetative propagation uses seeds', outcome: 'Not quite — Students believe **any plant part can be used for vegetative propagation** — e.g., "a piece.', reveals: 'any-plant-part-can-be' },
                { text: 'both involve fertilization', outcome: 'Not quite — Students believe **any plant part can be used for vegetative propagation** — e.g., "a piece.', reveals: 'any-plant-part-can-be' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_3', title: 'Sexual Reproduction: Need and Significance',
          caseStudy: { intro: 'Begin by showing students two pots of marigold plants: one grown from seeds (sexual) and another from cuttings (asexual).',
            decisions: [{ prompt: 'Define sexual reproduction and state the immediate product of gamete fusion.', options: [
                { text: 'Sexual reproduction involves the fusion of male and female gametes to form a zygote', outcome: 'Sexual reproduction involves the fusion of male and female gametes to form a zygote.' },
                { text: 'offspring are produced from a single parent', outcome: 'Not quite — Students often think sexual reproduction is "better" because it produces more offspring or because.', reveals: 'sexual-reproduction-is-better-because' },
                { text: 'fusion produces a seed directly', outcome: 'Not quite — Students often think sexual reproduction is "better" because it produces more offspring or because.', reveals: 'sexual-reproduction-is-better-because' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch3_10', title: 'Identify each idea',
          dissect: { specimen: 'Reproduction in Living Organisms · Part 1/2', spots: [
            { id: 's1', label: 'Asexual Reproduction Definition and Modes', prompt: 'Which idea is this? — Asexual reproduction is a mode of reproduction in which a single parent produces.', answer: 'Asexual Reproduction Definition and Modes', options: ['Asexual Reproduction Definition and Modes', 'Pregnancy and Embryonic Development', 'Reproductive Health Contraception Methods', 'Sexually Transmitted Infections Prevention and Awareness'] },
            { id: 's2', label: 'Pregnancy and Embryonic Development', prompt: 'Which idea is this? — Pregnancy is the physiological state in a female mammal beginning from the implantation.', answer: 'Pregnancy and Embryonic Development', options: ['Pregnancy and Embryonic Development', 'Asexual Reproduction Definition and Modes', 'Reproductive Health Contraception Methods', 'Sexually Transmitted Infections Prevention and Awareness'] },
            { id: 's3', label: 'Reproductive Health Contraception Methods', prompt: 'Which idea is this? — Contraception refers to the deliberate use of artificial or natural methods to prevent.', answer: 'Reproductive Health Contraception Methods', options: ['Reproductive Health Contraception Methods', 'Asexual Reproduction Definition and Modes', 'Pregnancy and Embryonic Development', 'Sexually Transmitted Infections Prevention and Awareness'] },
            { id: 's4', label: 'Sexually Transmitted Infections Prevention and Awareness', prompt: 'Which idea is this? — Sexually Transmitted Infections (STIs) are infectious diseases caused by bacteria.', answer: 'Sexually Transmitted Infections Prevention and Awareness', options: ['Sexually Transmitted Infections Prevention and Awareness', 'Asexual Reproduction Definition and Modes', 'Pregnancy and Embryonic Development', 'Reproductive Health Contraception Methods'] },
            { id: 's5', label: 'Vegetative Propagation in Plants Natural and Artificial', prompt: 'Which idea is this? — Vegetative propagation is a mode of asexual reproduction in plants where new individuals.', answer: 'Vegetative Propagation in Plants Natural and Artificial', options: ['Vegetative Propagation in Plants Natural and Artificial', 'Asexual Reproduction Definition and Modes', 'Pregnancy and Embryonic Development', 'Reproductive Health Contraception Methods'] },
            { id: 's6', label: 'Sexual Reproduction Need and Significance', prompt: 'Which idea is this? — Sexual reproduction is a biological process where two compatible gametes (male and.', answer: 'Sexual Reproduction Need and Significance', options: ['Sexual Reproduction Need and Significance', 'Asexual Reproduction Definition and Modes', 'Pregnancy and Embryonic Development', 'Reproductive Health Contraception Methods'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching mould bloom over forgotten monsoon-season bread, a student says, \'Each fuzzy patch must have come from two parent moulds mating — complex organisms always need two parents, so this can\'t be asexual.\'',
            decisions: [{ prompt: 'What does asexual reproduction actually require?', options: [
                { text: 'Just one parent and mitosis — no gametes, no fusion. Spores landing on bread divide into identical clones. And it is not limited to microbes: Hydra buds, Planaria regenerates, and a flowering potato plant still propagates asexually through its tubers.', outcome: 'This keys on the defining mechanism — single parent, mitotic division, genetically identical offspring — rather than the organism\'s complexity.' },
                { text: 'The student is right — anything beyond bacteria and yeast must reproduce sexually, so mould needed two parents.', outcome: 'That boundary does not exist; moulds spread by spores, and even starfish and flowering plants reproduce asexually alongside their other modes.', reveals: 'asexual-is-microbes-only' },
                { text: 'It is asexual, but only because the patches look identical — clones are defined by appearance.', outcome: 'Clones are defined by identical DNA from mitotic copying, not by looking alike — appearance can mislead where genotype does not.', reveals: 'clones-look-alike' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_3', title: 'The bigger picture',
          caseStudy: { intro: 'One parent + mitosis + zero gametes = an army of clones. Brilliant for fast multiplication in a stable world — risky when the environment changes and everyone\'s wearing the same genes.',
            decisions: [{ prompt: 'What comes next? Reproduction in Living Organisms · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reproduction in Living Organisms · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch3_1', difficulty: 'standard',
          question: 'Asexual reproduction is a mode of reproduction in which a single parent.',
          hint: 'If stuck, revisit c8_bio_ch1_3 (cell division basics) and c8_bio_ch1_4 (nucleus function).',
          misconception: 'Students think "asexual reproduction only occurs in unicellular organisms and simple plants" because textbooks often.',
          parts: [
                { id: 'a', prompt: 'Why are offspring produced by asexual reproduction called clones? Explain at the DNA level.', answer: 'Offspring are clones',
                  options: ['Offspring are clones', 'because they look alike', 'because only one parent is involved', 'asexual reproduction only occurs in unicellular organisms and simple plants'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (cell division basics) and c8_bio_ch1_4 (nucleus function) to recall.',
                  misconception: 'Students think "asexual reproduction only occurs in unicellular organisms and simple plants" because textbooks often highlight bacteria.' }
          ],
            remediations: { 'asexual-reproduction-only-occurs-in': { steps: ['Show live/video of Hydra budding (multicellular animal) and starfish arm regeneration — ask "where are the gametes?"', 'Use onion bulb or potato tuber — ask "did this come from a seed?"', 'Map each example to the mode (budding, fragmentation, vegetative propagation) on a chart.', 'Revisit definition — highlight "single parent, no gamete fusion" applies to ALL, regardless of complexity.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "asexual reproduction only occurs in unicellular organisms and simple plants" because textbooks often.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Asexual reproduction is disadvantageous for a species because it produces no genetic variation." Is this always true?', answer: 'Not always true',
                  options: ['Not always true', 'always bad because no evolution', 'asexual reproduction only occurs in unicellular organisms and simple plants'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (cell division basics) and c8_bio_ch1_4 (nucleus function) to recall.',
                  misconception: 'Students think "asexual reproduction only occurs in unicellular organisms and simple plants" because textbooks often highlight bacteria.' },
                { id: 'b', prompt: 'Design a simple experiment using potato tubers to demonstrate vegetative propagation (asexual) and explain how you would prove the new plant is genetically.', answer: 'Cut a potato tuber into pieces, each with at least one "eye" (bud)',
                  options: ['Cut a potato tuber into pieces, each with at least one "eye" (bud)', 'asexual reproduction only occurs in unicellular organisms and simple plants'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (cell division basics) and c8_bio_ch1_4 (nucleus function) to recall.',
                  misconception: 'Students think "asexual reproduction only occurs in unicellular organisms and simple plants" because textbooks often highlight bacteria.' }
          ],
            remediations: { 'asexual-reproduction-only-occurs-in': { steps: ['Show live/video of Hydra budding (multicellular animal) and starfish arm regeneration — ask "where are the gametes?"', 'Use onion bulb or potato tuber — ask "did this come from a seed?"', 'Map each example to the mode (budding, fragmentation, vegetative propagation) on a chart.', 'Revisit definition — highlight "single parent, no gamete fusion" applies to ALL, regardless of complexity.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_10', difficulty: 'standard',
          question: 'Pregnancy is the physiological state in a female mammal beginning from the.',
          hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System) for uterine structure and.',
          misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pregnancy is the physiological state in a female mammal beginning from the implantation',
                  options: ['Pregnancy is the physiological state in a female mammal beginning from the implantation', 'Asexual reproduction is a mode of reproduction in', 'Contraception refers to the deliberate use of artificial or natural methods to prevent', 'Sexually Transmitted Infections (STIs) are infectious diseases caused by bacteria,'],
                  hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System) for uterine structure and c9_bio_ch3_4.',
                  misconception: 'Students believe the embryo "breathes" and "eats" like a newborn — i.e., that the fetus uses its lungs for gas exchange and its gut for.' }
          ],
            remediations: { 'the-embryo-breathes-and-eats': { steps: ['Show a diagram of fetal circulation highlighting the foramen ovale, ductus arteriosus, and umbilical vessels — ask.', 'Trace the path: umbilical vein → ductus venosus → IVC → right atrium → foramen ovale → left atrium → left ventricle →.', 'Contrast with adult circulation.', 'Have the student explain in their own words why the placenta, not the lungs, is the respiratory organ during pregnancy.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_11', difficulty: 'standard',
          question: 'Contraception refers to the deliberate use of artificial or natural methods.',
          hint: 'Revisit c9_bio_ch3_9 (reproductive system structure) and c9_bio_ch3_10 (fertilization and.',
          misconception: 'Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility or "damage the.',
          parts: [
                { id: 'a', prompt: 'Name any two barrier methods of contraception and state the primary principle behind their action.', answer: 'Correct answer: Male condom and female condom (or diaphragm/cervical cap)',
                  options: ['Correct answer: Male condom and female condom (or diaphragm/cervical cap)', 'copper-T and oral pills', 'damage the uterus'],
                  hint: 'Revisit c9_bio_ch3_9 (reproductive system structure) and c9_bio_ch3_10 (fertilization and.',
                  misconception: 'Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility or "damage the uterus," leading to fear.' },
                { id: 'b', prompt: 'A 28-year-old woman wants a long-term, reversible contraceptive that does not require daily action and has minimal hormonal side effects.', answer: 'Correct answer: Copper-T (Cu-T) intrauterine device',
                  options: ['Correct answer: Copper-T (Cu-T) intrauterine device', 'oral pills', 'condom', 'damage the uterus'],
                  hint: 'Revisit c9_bio_ch3_9 (reproductive system structure) and c9_bio_ch3_10 (fertilization and.',
                  misconception: 'Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility or "damage the uterus," leading to fear.' },
                { id: 'c', prompt: 'Compare vasectomy and tubectomy in terms of procedure, reversibility, and physiological impact on hormone production.', answer: 'Correct answer: Vasectomy cuts/ties vas deferens in males',
                  options: ['Correct answer: Vasectomy cuts/ties vas deferens in males', 'vasectomy stops testosterone production', 'tubectomy causes menopause', 'damage the uterus'],
                  hint: 'Revisit c9_bio_ch3_9 (reproductive system structure) and c9_bio_ch3_10 (fertilization and.',
                  misconception: 'Students often believe that hormonal contraceptives (pills, implants) cause permanent infertility or "damage the uterus," leading to fear.' }
          ],
            remediations: { 'hormonal-contraceptives-pills': { steps: ['Show a simple flowchart: Hormonal pill → inhibits FSH/LH → no ovulation → stop pill → FSH/LH rise → ovulation resumes.', 'Use analogy: "Putting a car in park doesn\'t break the engine; releasing the brake lets it drive again."', 'Cite WHO data: 80% of pill users conceive within 1 year of stopping.', 'Have student explain in own words why "temporary pause ≠ permanent stop."'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_12', difficulty: 'standard',
          question: 'Sexually Transmitted Infections (STIs) are infectious diseases caused.',
          hint: 'If stuck, revisit c8_bio_ch2_5 (Transmission of Diseases) and c9_bio_ch3_9 (Human.',
          misconception: 'Students believe that "STIs only happen to people who have many sexual partners" and that "if I have only one partner.',
          parts: [
                { id: 'a', prompt: 'Name any two bacterial STIs and two viral STIs, and state the specific causative organism for each.', answer: 'Bacterial: Gonorrhea (Neisseria gonorrhoeae), Syphilis (Treponema pallidum)',
                  options: ['Bacterial: Gonorrhea (Neisseria gonorrhoeae), Syphilis (Treponema pallidum)', 'STIs only happen to people who have many sexual partners', 'if I have only one partner, I don\'t need protection', 'HIV as bacterial or Candida as a primary STI'],
                  hint: 'If stuck, revisit c8_bio_ch2_5 (Transmission of Diseases) and c9_bio_ch3_9 (Human Reproductive.',
                  misconception: 'Students believe that "STIs only happen to people who have many sexual partners" and that "if I have only one partner, I don\'t need.' }
          ],
            remediations: { 'stis-only-happen-to-people': { steps: ['Ask the student to draw a transmission chain diagram for HIV starting from an infected person A to person.', 'Have them label each link: pathogen in fluid -> mucosal entry -> infection.', 'Ask: "Which link does \'having one partner\' break?" (None – the chain remains intact if partner is infected).', 'Show NACO data: significant % of new HIV cases in India occur in monogamous women infected by husbands.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_2', difficulty: 'standard',
          question: 'Vegetative propagation is a mode of asexual reproduction in plants where new.',
          hint: 'Revisit c8_bio_ch1_3 (cell structure) and c9_bio_ch3_1 (asexual reproduction definition).',
          misconception: 'Students believe **any plant part can be used for vegetative propagation** — e.g., "a piece of root, any stem segment.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since vegetative propagation produces clones, all cells in the new plant must have exactly the same DNA as the parent plant\'s leaf cells.".', answer: 'The statement is largely correct but not absolute',
                  options: ['The statement is largely correct but not absolute', 'yes, absolutely identical', 'clonal', 'mutation-free'],
                  hint: 'Revisit c8_bio_ch1_3 (cell structure) and c9_bio_ch3_1 (asexual reproduction definition) — focus.',
                  misconception: 'Students believe **any plant part can be used for vegetative propagation** — e.g., "a piece of root, any stem segment, or any leaf will.' }
          ],
            remediations: { 'any-plant-part-can-be': { steps: ['**Step 1**: Show a potato tuber and a carrot root side by side.', 'Ask: "Which can grow a new plant?" Student predicts both.', '**Step 2**: Plant both in moist soil.', 'After 2 weeks, potato sprouts from eyes; carrot rots or only grows leafy top (no new storage root).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_3', difficulty: 'standard',
          question: 'Sexual reproduction is a biological process where two compatible gametes (male.',
          hint: 'If stuck, revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and.',
          misconception: 'Students often think sexual reproduction is "better" because it produces more offspring or because it involves two.',
          parts: [
                { id: 'a', prompt: 'Why is genetic variation considered the most significant outcome of sexual reproduction for a species\' long-term survival?', answer: 'Genetic variation provides the raw material for natural selection',
                  options: ['Genetic variation provides the raw material for natural selection', 'producing more offspring', 'repairing DNA', 'better'],
                  hint: 'If stuck, revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c9_bio_ch3_2.',
                  misconception: 'Students often think sexual reproduction is "better" because it produces more offspring or because it involves two parents, which they.' },
                { id: 'b', prompt: 'A farmer grows a banana plantation using suckers (vegetative propagation). After three years, a fungal disease wipes out the entire crop.', answer: 'Vegetative propagation produces genetically identical clones',
                  options: ['Vegetative propagation produces genetically identical clones', 'weak plants', 'bad soil', 'better'],
                  hint: 'If stuck, revisit c9_bio_ch3_1 (Asexual Reproduction: Definition and Modes) and c9_bio_ch3_2.',
                  misconception: 'Students often think sexual reproduction is "better" because it produces more offspring or because it involves two parents, which they.' }
          ],
            remediations: { 'sexual-reproduction-is-better-because': { steps: ['Have the student list three organisms that reproduce sexually but provide zero parental care (e.g., coral, frog, oak.', 'Ask them to compare the number of offspring in one reproductive event for asexual (binary fission in amoeba) vs sexual.', 'Guide them to realise that the advantage of sexual reproduction is not offspring number or care, but the genetic.', 'Use a deck of cards analogy: asexual = photocopying the same hand; sexual = shuffling two decks and dealing new hands.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
