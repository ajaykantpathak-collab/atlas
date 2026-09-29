import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch03_p2: SimDef = {
    id: 'v3_c10_bio_ch03_p2',
    title: 'How Do Organisms Reproduce',
    subtitle: 'From cell division to fertilisation — how life copies itself, and why it never copies perfectly.',
    classLevel: 10, subject: 'biology', topic: 'How Do Organisms Reproduce',
    chapters: ['c10_bio_ch03'],
    nodeIds: ['c10_bio_cbse_03_007', 'c10_bio_cbse_03_008', 'c10_bio_cbse_03_009', 'c10_bio_cbse_03_010', 'c10_bio_cbse_03_011', 'c10_bio_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant breeder developing a new variety', intro: 'You have a rose that flowers brilliantly but never sets seed. Your job: decide whether to propagate it asexually or cross it — and what each choice does to variation.', goal: 'Compare asexual and sexual reproduction — and explain why variation is survival\'s insurance policy.' },
    discovery: {
        question: 'A single bacterium becomes a billion identical copies overnight — yet a species of bacteria can still out-evolve antibiotics. Where does the variation come from?',
        options: ['Mutation during copying — imperfect division creates differences', 'They reproduce sexually too', 'The antibiotic creates the variation', 'Variation only happens in animals'],
        answer: 'Mutation during copying — imperfect division creates differences',
        hook: 'Most students think asexual copies are always identical. Copying billions of times means billions of chances to be slightly different.',
    },
    teaching: [
        { title: 'Fertilisation in Plants: Double Fertilisation and Seed Formation', text: 'Double fertilisation is the unique process in flowering plants where one male gamete fuses with the egg cell to form the diploid zygote (syngamy), while the second male gamete fuses with the two.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_03_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'On the reproduction lab: run one asexual cycle and one sexual cycle — count how much variation each produces.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_007', title: 'Fertilisation in Plants: Double Fertilisation and Seed Formation',
          caseStudy: { intro: 'Imagine you cut open a ripe mango and find a large seed with a thick coat — that seed began as a tiny ovule inside the flower\'s ovary.',
            decisions: [{ prompt: 'Name the two fusion events that constitute double fertilisation and state the ploidy of each product formed.', options: [
                { text: 'The two fusion events are: (1) Syngamy', outcome: 'The two fusion events are: (1) Syngamy — fusion of one male gamete (n) with egg cell (n) forming.' },
                { text: 'both gametes fuse with egg cell', outcome: 'Not quite — Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with.', reveals: 'double-fertilisation-means-two-sperm' },
                { text: 'two sperm fuse with one egg', outcome: 'Not quite — Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with.', reveals: 'double-fertilisation-means-two-sperm' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_008', title: 'Male Reproductive System in Humans: Structure and Function',
          caseStudy: { intro: 'Begin by asking students to recall the physical changes they observed in boys during adolescence (deepening voice, facial hair, growth spurt) from Class 6/7.',
            decisions: [{ prompt: 'Name the primary male sex organ and state the two main functions it performs from puberty onwards.', options: [
                { text: 'The primary male sex organ is the testis (plural: testes)', outcome: 'The primary male sex organ is the testis (plural: testes). Its two main functions from puberty are.' },
                { text: 'the penis or prostate as the primary organ', outcome: 'Not quite — Students believe the prostate gland produces the majority of semen volume and that its secretion.', reveals: 'the-prostate-gland-produces-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_009', title: 'Female Reproductive System in Humans: Structure and Function',
          caseStudy: { intro: 'Begin by asking students to recall the adolescent changes they studied in Class 6 (c6_biology_ch06_003) — specifically the onset of menstruation as a sign.',
            decisions: [{ prompt: 'Name the two female gonads and state the two main functions they perform in the human female reproductive system.', options: [
                { text: 'The two female gonads are the ovaries', outcome: 'The two female gonads are the ovaries. Their two main functions are: (1) production of female.' },
                { text: 'uterus or fallopian tubes as gonads, or stating ovaries produce sperm', outcome: 'Not quite — Students often think the ovary is directly connected to the fallopian tube (like a pipe), so the.', reveals: 'the-ovary-is-directly-connected' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_010', title: 'Fertilisation, Implantation and Placenta in Humans',
          caseStudy: { intro: 'Imagine a pregnant woman in your neighbourhood going for her first ultrasound at 6 weeks — the doctor points to a tiny flickering heartbeat and says, "The baby.',
            decisions: [{ prompt: 'Where exactly does fertilisation occur in the human female reproductive tract, and why is this site biologically suitable?', options: [
                { text: 'Correct answer: Fertilisation occurs in the ampulla of the fallopian tube (uterine tube)', outcome: 'Correct answer: Fertilisation occurs in the ampulla of the fallopian tube (uterine tube).' },
                { text: 'uterus', outcome: 'Not quite — Students believe that fertilisation occurs in the uterus because "that\'s where the baby grows," and.', reveals: 'fertilisation-occurs-in-the-uterus' },
                { text: 'vagina', outcome: 'Not quite — Students believe that fertilisation occurs in the uterus because "that\'s where the baby grows," and.', reveals: 'fertilisation-occurs-in-the-uterus' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_011', title: 'Reproductive Health: Contraception Methods and Their Importance',
          caseStudy: { intro: 'Imagine seeing a government poster in your neighbourhood clinic showing a small family with the message "Hum Do, Hamare Do" — this reflects India\'s family.',
            decisions: [{ prompt: 'Name any four contraceptive methods and state the category (barrier, chemical, surgical, natural) each belongs to.', options: [
                { text: 'Correct answer: Condom (barrier), Oral contraceptive pills (chemical), Vasectomy', outcome: 'Correct answer: Condom (barrier), Oral contraceptive pills (chemical), Vasectomy (surgical), Rhythm.' },
                { text: 'copper-T', outcome: 'Not quite — Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing.', reveals: 'all-hormonal-contraceptives-pills' },
                { text: 'killing the egg', outcome: 'Not quite — Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing.', reveals: 'all-hormonal-contraceptives-pills' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_012', title: 'Sexually Transmitted Diseases: Causes and Prevention',
          caseStudy: { intro: 'Imagine a Class 10 student reading a newspaper article about rising HIV cases among young adults in India and wondering how a virus spreads differently from.',
            decisions: [{ prompt: 'Name the causative agent of syphilis and state whether it is a bacterium, virus, or protozoan.', options: [
                { text: 'Treponema pallidum', outcome: 'Treponema pallidum — a spirochete bacterium. A wrong answer (e.g., "virus" or "fungus") reveals the.' },
                { text: 'fungus', outcome: 'Not quite — Students believe that "once treated for an STD, you are immune and cannot get it again." This.', reveals: 'once-treated-for-an-std' },
                { text: 'once treated for an STD, you are immune and cannot get it again', outcome: 'Not quite — Students believe that "once treated for an STD, you are immune and cannot get it again." This.', reveals: 'once-treated-for-an-std' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'How Do Organisms Reproduce · Part 2/2', spots: [
            { id: 's1', label: 'Male Reproductive System in Humans Structure and Function', prompt: 'Which idea is this? — The male reproductive system in humans is a coordinated set of organs (testes.', answer: 'Male Reproductive System in Humans Structure and Function', options: ['Male Reproductive System in Humans Structure and Function', 'Female Reproductive System in Humans Structure and Function', 'Fertilisation Implantation and Placenta in Humans', 'Sexually Transmitted Diseases Causes and Prevention'] },
            { id: 's2', label: 'Female Reproductive System in Humans Structure and Function', prompt: 'Which idea is this? — The female reproductive system in humans is a coordinated set of organs (ovaries.', answer: 'Female Reproductive System in Humans Structure and Function', options: ['Female Reproductive System in Humans Structure and Function', 'Male Reproductive System in Humans Structure and Function', 'Fertilisation Implantation and Placenta in Humans', 'Sexually Transmitted Diseases Causes and Prevention'] },
            { id: 's3', label: 'Fertilisation Implantation and Placenta in Humans', prompt: 'Which idea is this? — Fertilisation in humans is the fusion of a haploid sperm nucleus with a haploid ovum.', answer: 'Fertilisation Implantation and Placenta in Humans', options: ['Fertilisation Implantation and Placenta in Humans', 'Male Reproductive System in Humans Structure and Function', 'Female Reproductive System in Humans Structure and Function', 'Sexually Transmitted Diseases Causes and Prevention'] },
            { id: 's4', label: 'Sexually Transmitted Diseases Causes and Prevention', prompt: 'Which idea is this? — Sexually Transmitted Diseases (STDs) are infections caused by pathogenic microorganisms.', answer: 'Sexually Transmitted Diseases Causes and Prevention', options: ['Sexually Transmitted Diseases Causes and Prevention', 'Male Reproductive System in Humans Structure and Function', 'Female Reproductive System in Humans Structure and Function', 'Fertilisation Implantation and Placenta in Humans'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'A clinic offers genetic testing that can predict a baby\'s risk of a serious inherited disorder before birth. Some families welcome it; others worry about what happens when we start choosing which lives are \'worth\' having.',
            decisions: [{ prompt: 'Where should the line be drawn on using this technology?', options: [
                { text: 'Offer it freely — information empowers families', outcome: 'This choice maximizes autonomy and can prevent suffering, but risks quietly pressuring families toward \'acceptable\' children.' },
                { text: 'Allow it only for serious disorders', outcome: 'This tries to balance prevention with ethics, but someone must define \'serious\' — and that definition will always be contested.' },
                { text: 'Restrict it heavily until society agrees on rules', outcome: 'This protects against misuse but delays help for families who could act on it now.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Reema\'s grandmother fills the whole balcony with pots of money plant grown from cuttings of one parent. When a mealybug attack hits, every single plant suffers equally. She asks why the pests didn\'t spare at least a few.',
            decisions: [{ prompt: 'What explains why the whole collection was hit equally hard?', options: [
                { text: 'Cuttings are asexual reproduction — every plant is genetically identical to the parent, so whatever made one plant vulnerable made all of them vulnerable. Plants grown from seeds carry mixed genes and usually vary in resistance.', outcome: 'This is exactly the trade-off of asexual reproduction: fast and faithful copies, but no variation — so one disease or pest can wipe out an entire clone population.' },
                { text: 'Cloned plants are actually stronger, so the attack must have been caused by over-watering rather than the mealybugs.', outcome: 'Cloning copies genes exactly — it cannot add resistance the parent did not have. The bugs spread easily precisely because no plant had a different genetic defence.', reveals: 'cloning-adds-resistance' },
                { text: 'The pests attacked all plants equally because insects always spread uniformly through any group of pots.', outcome: 'Spread explains exposure, not equal damage — in a genetically varied population some individuals typically resist. Uniform collapse signals uniform genes.', reveals: 'spread-equals-damage' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'Reproduction is life\'s way of saying: copy yourself, but not perfectly — the imperfections are how species survive what they can\'t predict.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_007', difficulty: 'standard',
          question: 'Double fertilisation is the unique process in flowering plants where one male.',
          hint: 'Revisit c9_bio_ch3_5 (embryo sac structure) and c10_bio_cbse_03_006 (pollen tube growth).',
          misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple.',
          parts: [
                { id: 'a', prompt: 'Name the two fusion events that constitute double fertilisation and state the ploidy of each product formed.', answer: 'The two fusion events are: (1) Syngamy',
                  options: ['The two fusion events are: (1) Syngamy', 'both gametes fuse with egg cell', 'two sperm fuse with one egg'],
                  hint: 'Revisit c9_bio_ch3_5 (embryo sac structure) and c10_bio_cbse_03_006 (pollen tube growth).',
                  misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple sperm entering one.' },
                { id: 'b', prompt: 'Compare the fate of the following floral parts after fertilisation: (a) ovule, (b) ovary, (c) sepals, (d) petals, (e) stamens, (f) style.', answer: 'ovule, (',
                  options: ['ovule, (', 'seed coat forms from ovary wall', 'two sperm fuse with one egg'],
                  hint: 'Revisit c9_bio_ch3_5 (embryo sac structure) and c10_bio_cbse_03_006 (pollen tube growth).',
                  misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple sperm entering one.' }
          ],
            remediations: { 'double-fertilisation-means-two-sperm': { steps: ['Revisit the 7-celled, 8-nucleate embryo sac structure from Class 9 (c9_bio_ch3_5) — identify egg cell, two synergids.', 'Draw the pollen tube entering through micropyle, releasing two male gametes.', 'Trace Gamete 1 → egg cell (syngamy, 2n zygote).', 'Trace Gamete 2 → central cell (triple fusion, 3n PEN).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Double fertilisation is an energy-wasteful process because the plant produces two male gametes but only one forms the embryo; the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'endosperm feeds embryo', 'two sperm fuse with one egg'],
                  hint: 'Revisit c9_bio_ch3_5 (embryo sac structure) and c10_bio_cbse_03_006 (pollen tube growth).',
                  misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple sperm entering one.' },
                { id: 'b', prompt: 'Design a simple investigation using locally available seeds (e.g., maize, bean, groundnut, coconut) to classify them as albuminous or exalbuminous.', answer: 'Procedure: Soak seeds overnight',
                  options: ['Procedure: Soak seeds overnight', 'two sperm fuse with one egg'],
                  hint: 'Revisit c9_bio_ch3_5 (embryo sac structure) and c10_bio_cbse_03_006 (pollen tube growth).',
                  misconception: 'Students believe double fertilisation means "two sperm fuse with one egg" — they confuse it with polyspermy (multiple sperm entering one.' }
          ],
            remediations: { 'double-fertilisation-means-two-sperm': { steps: ['Revisit the 7-celled, 8-nucleate embryo sac structure from Class 9 (c9_bio_ch3_5) — identify egg cell, two synergids.', 'Draw the pollen tube entering through micropyle, releasing two male gametes.', 'Trace Gamete 1 → egg cell (syngamy, 2n zygote).', 'Trace Gamete 2 → central cell (triple fusion, 3n PEN).'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_008', difficulty: 'standard',
          question: 'The male reproductive system in humans is a coordinated set of organs (testes.',
          hint: 'Revisit c9_bio_ch3_9 (Human Reproductive System) and c6_biology_ch06_006 (Hormones Behind.',
          misconception: 'Students believe the prostate gland produces the majority of semen volume and that its secretion is the main energy.',
          parts: [
                { id: 'a', prompt: 'Name the primary male sex organ and state the two main functions it performs from puberty onwards.', answer: 'The primary male sex organ is the testis (plural: testes)',
                  options: ['The primary male sex organ is the testis (plural: testes)', 'the penis or prostate as the primary organ'],
                  hint: 'Revisit c9_bio_ch3_9 (Human Reproductive System) and c6_biology_ch06_006 (Hormones Behind Changes).',
                  misconception: 'Students believe the prostate gland produces the majority of semen volume and that its secretion is the main energy source for sperm.' },
                { id: 'b', prompt: 'Explain why the testes are located outside the abdominal cavity in the scrotum, and predict what would happen to sperm production if they remained inside the.', answer: 'The testes are in the scrotum',
                  options: ['The testes are in the scrotum', 'for protection', 'to make space'],
                  hint: 'Revisit c9_bio_ch3_9 (Human Reproductive System) and c6_biology_ch06_006 (Hormones Behind Changes).',
                  misconception: 'Students believe the prostate gland produces the majority of semen volume and that its secretion is the main energy source for sperm.' }
          ],
            remediations: { 'the-prostate-gland-produces-the': { steps: ['Draw a three-column table: Gland | % Volume | Key Secretion | Function. Fill from NCERT Fig 8.3 description.', 'Memorise the mnemonic "Fructose From Vesicles, Activation From Prostate, Lubrication From Bulbourethral."', 'Practice a past board question: "Name the gland that provides energy for sperm motility" — answer must be seminal.', 'Explain aloud why prostate secretion is alkaline (neutralise vaginal acidity) while seminal vesicle fluid is also.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_009', difficulty: 'standard',
          question: 'The female reproductive system in humans is a coordinated set of organs.',
          hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System: Structure and Function) and.',
          misconception: 'Students often think the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically.',
          parts: [
                { id: 'a', prompt: 'Name the two female gonads and state the two main functions they perform in the human female reproductive system.', answer: 'The two female gonads are the ovaries',
                  options: ['The two female gonads are the ovaries', 'uterus or fallopian tubes as gonads, or stating ovaries produce sperm'],
                  hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System: Structure and Function) and.',
                  misconception: 'Students often think the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' },
                { id: 'b', prompt: 'Explain why the fallopian tube (oviduct) is the usual site of fertilisation in humans, and describe the structural features that enable this function.', answer: 'The fallopian tube is the usual site of fertilisation',
                  options: ['The fallopian tube is the usual site of fertilisation', 'fertilisation occurs in the uterus or vagina'],
                  hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System: Structure and Function) and.',
                  misconception: 'Students often think the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' },
                { id: 'c', prompt: 'A woman has blocked fallopian tubes on both sides. Predict whether she can ovulate, whether fertilisation can occur naturally, and whether she can menstruate.', answer: 'Step 1: Ovulation — YES, she can ovulate',
                  options: ['Step 1: Ovulation — YES, she can ovulate', 'she cannot ovulate or menstruate'],
                  hint: 'If stuck, revisit c9_bio_ch3_9 (Human Reproductive System: Structure and Function) and.',
                  misconception: 'Students often think the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' }
          ],
            remediations: { 'the-ovary-is-directly-connected': { steps: ['Use a 3D model or animation (e.g., from NCERT\'s e-pathshala) to show the fimbriae sweeping over the ovary surface — not.', 'Have students draw the peritoneal cavity as a space and place the ovary and fimbriae in it; trace the ovum\'s path with.', 'Contrast with male system where vas deferens is directly connected to epididymis.', 'Practice a board-style diagram question: "Label the site of fertilisation and explain why it is not in the uterus.".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_010', difficulty: 'standard',
          question: 'Fertilisation in humans is the fusion of a haploid sperm nucleus with a haploid.',
          hint: 'If stuck, revisit c10_bio_cbse_03_009 (Female Reproductive System) for tract anatomy and.',
          misconception: 'Students believe that fertilisation occurs in the uterus because "that\'s where the baby grows," and they think the.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The placenta allows the mother\'s blood and the foetus\'s blood to mix so that nutrients can pass directly." Is this statement correct?', answer: 'Correct answer: The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'yes, they mix', 'explain the structure-function relationship', 'that\'s where the baby grows'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_009 (Female Reproductive System) for tract anatomy and.',
                  misconception: 'Students believe that fertilisation occurs in the uterus because "that\'s where the baby grows," and they think the placenta is a single.' }
          ],
            remediations: { 'fertilisation-occurs-in-the-uterus': { steps: ['Draw the female reproductive tract on paper (vagina → cervix → uterus → fallopian tubes → ovaries).', 'Watch a 2-minute animation of blastocyst implantation (search "blastocyst implantation animation NCERT") — pause at day.', 'Build a physical model: use a kitchen sponge (maternal endometrium with holes as lacunae) and insert pipe cleaners.', 'Write one sentence each for the four placental functions using CBSE keywords: "nutrition — glucose/amino acids diffuse.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_011', difficulty: 'standard',
          question: 'Contraception refers to the deliberate use of artificial methods, devices,.',
          hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilisation and implantation) and.',
          misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing.',
          parts: [
                { id: 'a', prompt: 'Name any four contraceptive methods and state the category (barrier, chemical, surgical, natural) each belongs to.', answer: 'Correct answer: Condom (barrier), Oral contraceptive pills (chemical), Vasectomy',
                  options: ['Correct answer: Condom (barrier), Oral contraceptive pills (chemical), Vasectomy', 'copper-T', 'killing the egg'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilisation and implantation) and c10_bio_cbse_03_008/009.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' },
                { id: 'b', prompt: 'A newly married couple wants to delay their first child by two years but plans to have children later.', answer: 'Correct answer: Copper-T (intrauterine device) is ideal',
                  options: ['Correct answer: Copper-T (intrauterine device) is ideal', 'no daily action', 'minimal hormonal side effects', 'killing the egg'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilisation and implantation) and c10_bio_cbse_03_008/009.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' },
                { id: 'c', prompt: 'Compare the effectiveness of surgical methods (vasectomy/tubectomy) versus natural methods (rhythm/withdrawal) in preventing pregnancy.', answer: 'Correct answer: Surgical methods are nearly 100% effective',
                  options: ['Correct answer: Surgical methods are nearly 100% effective', 'surgical is better', 'killing the egg'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilisation and implantation) and c10_bio_cbse_03_008/009.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' }
          ],
            remediations: { 'all-hormonal-contraceptives-pills': { steps: ['Revisit c10_bio_cbse_03_010 fertilisation and implantation steps — draw a timeline: ovulation → fertilisation.', 'Map each contraceptive method to its intervention point on this timeline (e.g., pills at ovulation, condom.', 'Explicitly contrast with medical termination of pregnancy (MTP) which occurs after implantation — not covered in Class.', 'Practice writing one-line mechanisms for each method using verbs: "suppresses ovulation", "blocks sperm entry".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_012', difficulty: 'standard',
          question: 'Sexually Transmitted Diseases (STDs) are infections caused by pathogenic.',
          hint: 'If stuck, revisit c10_bio_cbse_03_008 and c10_bio_cbse_03_009 for reproductive anatomy.',
          misconception: 'Students believe that "once treated for an STD, you are immune and cannot get it again." This is false for bacterial.',
          parts: [
                { id: 'a', prompt: 'Name the causative agent of syphilis and state whether it is a bacterium, virus, or protozoan.', answer: 'Treponema pallidum',
                  options: ['Treponema pallidum', 'fungus', 'once treated for an STD, you are immune and cannot get it again', '"once treated for an STD, you are immune and cannot get it again'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_008 and c10_bio_cbse_03_009 for reproductive anatomy, and.',
                  misconception: 'Students believe that "once treated for an STD, you are immune and cannot get it again." This is false for bacterial STDs (syphilis.' },
                { id: 'b', prompt: 'A 17-year-old boy has a painless ulcer on his penis that appeared 3 weeks after unprotected sex. He ignores it because it is not painful.', answer: 'Primary syphilis (chancre) caused by Treponema pallidum',
                  options: ['Primary syphilis (chancre) caused by Treponema pallidum', 'herpes', 'gonorrhoea', 'once treated for an STD, you are immune and cannot get it again'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_008 and c10_bio_cbse_03_009 for reproductive anatomy, and.',
                  misconception: 'Students believe that "once treated for an STD, you are immune and cannot get it again." This is false for bacterial STDs (syphilis.' }
          ],
            remediations: { 'once-treated-for-an-std': { steps: ['Revisit Class 8 node c8_bio_ch2_8 (Immunity: Body\'s Defence Against Diseases) — distinguish between active immunity.', 'Review Class 9 node c9_bio_ch3_12 (Sexually Transmitted Infections: Prevention and Awareness) — note that "treatment ≠.', 'Complete a comparison table: Disease | Causative Agent | Treatment | Immunity after cure?', 'Explain ping-pong transmission to a peer using the analogy: "Antibiotics are like cleaning a wound; they don\'t give you.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
